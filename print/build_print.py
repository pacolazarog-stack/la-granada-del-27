from __future__ import annotations

import json
import math
import os
import re
import subprocess
from pathlib import Path

from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm
from reportlab.lib.colors import Color, HexColor, white
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "dist"
OUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_PDF = OUT_DIR / "_integral_tmp.pdf"
OUT_PDF = OUT_DIR / "La_Granada_del_27_Edicion_Integral_A5_Imprenta.pdf"
REPORT = OUT_DIR / "preflight.json"

BLEED = 3 * mm
TRIM_W, TRIM_H = 148 * mm, 210 * mm
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
TRIM_X, TRIM_Y = BLEED, BLEED
MARGIN_X = 17 * mm
CONTENT_LEFT = TRIM_X + MARGIN_X
CONTENT_RIGHT = TRIM_X + TRIM_W - MARGIN_X
CONTENT_W = CONTENT_RIGHT - CONTENT_LEFT
INK = HexColor("#171512")
MUTED = HexColor("#68615a")
PAPER = HexColor("#fbfaf7")


def find_font(candidates):
    for p in candidates:
        if Path(p).exists():
            return p
    raise FileNotFoundError("No se encontró una fuente TrueType utilizable")


SERIF = find_font(["/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf"])
SERIF_BOLD = find_font(["/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf"])
SANS = find_font(["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"])
SANS_BOLD = find_font(["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"])
pdfmetrics.registerFont(TTFont("BookSerif", SERIF))
pdfmetrics.registerFont(TTFont("BookSerifBold", SERIF_BOLD))
pdfmetrics.registerFont(TTFont("BookSans", SANS))
pdfmetrics.registerFont(TTFont("BookSansBold", SANS_BOLD))


def load_corpus():
    js = r'''
const fs=require('fs'), path=require('path'), vm=require('vm');
const root=process.argv[1];
const sandbox={console}; sandbox.window=sandbox; sandbox.global=sandbox; sandbox.self=sandbox;
vm.createContext(sandbox);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
for(const rel of scripts){
  if(['site.js','app.js','reading-structure.js','diagonal-reader.js','radial-heart.js','chance.js','book-cover.js'].includes(rel)) break;
  const fp=path.join(root,rel);
  if(!fs.existsSync(fp)) throw new Error('Falta '+rel);
  vm.runInContext(fs.readFileSync(fp,'utf8'),sandbox,{filename:rel});
}
const rows=(sandbox.GRANADA_STONE_ROWS||sandbox.GRANADA_ROWS||[]).map((r,i)=>({number:i+1,title:(sandbox.GRANADA_H_TITLES||[])[i]||r.title||`H${String(i+1).padStart(2,'0')}`,verses:[...(r.verses||[])]}));
const surface=(sandbox.GRANADA_SURFACE_POEMS||[]).map(p=>({number:p.number,title:p.title,verses:[...p.verses]}));
const core=sandbox.GRANADA_LAB_BAJO_LA_CAL||{};
const out={titles:sandbox.GRANADA_TITLES||[],hTitles:sandbox.GRANADA_H_TITLES||[],surface,stone:rows,radial:{buried:[...((core.radial&&core.radial.buried&&core.radial.buried.verses)||[])],open:[...((core.radial&&core.radial.open&&core.radial.open.verses)||[])]},pal:(sandbox.GRANADA_LAB_PALINDROMO&&sandbox.GRANADA_LAB_PALINDROMO.text)||'Granada sucede — sucede Granada.'};
process.stdout.write(JSON.stringify(out));
'''
    res = subprocess.run(["node", "-e", js, str(ROOT)], check=True, capture_output=True, text=True)
    data = json.loads(res.stdout)
    if len(data["surface"]) != 27 or len(data["stone"]) != 27:
        raise RuntimeError(f"Corpus incompleto: superficie={len(data['surface'])}, piedra={len(data['stone'])}")
    center = data["surface"][13]["verses"][13]
    if center != "Late bajo la cal la acequia hundida.":
        raise RuntimeError(f"Centro canónico alterado: {center!r}")
    return data


def parse_site_text():
    text = (ROOT / "site.js").read_text(encoding="utf-8")
    def block(name):
        m = re.search(rf"const\s+{name}=`(.*?)`;", text, re.S)
        if not m:
            raise RuntimeError(f"No se encontró {name} en site.js")
        return m.group(1).splitlines()
    def arr(name):
        m = re.search(rf"const\s+{name}=\[(.*?)\];", text, re.S)
        if not m:
            raise RuntimeError(f"No se encontró {name} en site.js")
        return [s.replace("\\'", "'") for s in re.findall(r"'((?:\\.|[^'])*)'", m.group(1))]
    return block("PRO"), block("EPI"), arr("LOA_I"), arr("LOA_II")


def draw_page_base(c, page_no=None, dark=False):
    c.setFillColor(INK if dark else PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    if page_no and 1 < page_no < 84:
        c.setFillColor(MUTED if not dark else HexColor("#d7d0c5"))
        c.setFont("BookSans", 7.2)
        c.drawCentredString(TRIM_X + TRIM_W / 2, TRIM_Y + 6.5 * mm, str(page_no))


def draw_rule(c, y):
    c.setStrokeColor(HexColor("#aaa096")); c.setLineWidth(0.35); c.line(CONTENT_LEFT, y, CONTENT_RIGHT, y)


def draw_title(c, eyebrow, title, subtitle="", page_no=None):
    draw_page_base(c, page_no)
    top = TRIM_Y + TRIM_H - 20 * mm
    c.setFillColor(MUTED); c.setFont("BookSansBold", 7.4); c.drawString(CONTENT_LEFT, top, eyebrow.upper())
    y = top - 11 * mm
    c.setFillColor(INK); size = 19
    while pdfmetrics.stringWidth(title, "BookSerifBold", size) > CONTENT_W and size > 13:
        size -= 0.5
    c.setFont("BookSerifBold", size); c.drawString(CONTENT_LEFT, y, title)
    if subtitle:
        c.setFillColor(MUTED); c.setFont("BookSerif", 9.5); c.drawString(CONTENT_LEFT, y - 7 * mm, subtitle)
    draw_rule(c, y - 13 * mm)
    return y - 20 * mm


def draw_section(c, title, subtitle="", kicker="", page_no=None):
    draw_page_base(c, page_no)
    cx = TRIM_X + TRIM_W / 2; y = TRIM_Y + TRIM_H * 0.58
    if kicker:
        c.setFillColor(MUTED); c.setFont("BookSansBold", 7.5); c.drawCentredString(cx, y + 24 * mm, kicker.upper())
    c.setFillColor(INK); size = 22
    while pdfmetrics.stringWidth(title, "BookSerifBold", size) > TRIM_W - 30 * mm and size > 14:
        size -= 0.5
    c.setFont("BookSerifBold", size); c.drawCentredString(cx, y, title)
    if subtitle:
        c.setFillColor(MUTED); c.setFont("BookSerif", 10); c.drawCentredString(cx, y - 10 * mm, subtitle)


def split_even(lines, parts):
    n = len(lines); out = []; start = 0
    for p in range(parts):
        remain = n - start; take = math.ceil(remain / (parts - p)); out.append(lines[start:start + take]); start += take
    return out


def fit_poem_font(lines, width, height, max_size=10.6, min_size=7.4):
    nonempty = [x for x in lines if x]
    if not nonempty: return max_size, max_size * 1.35
    widest = max(pdfmetrics.stringWidth(x, "BookSerif", 1) for x in nonempty)
    by_width = (width / max(widest, 1)) * 0.98
    by_height = height / (max(len(lines), 1) * 1.34)
    size = max(min_size, min(max_size, by_width, by_height))
    return size, size * 1.34


def draw_poem(c, poem, part_lines, part, parts, page_no):
    eyebrow = f"{poem['number']:02d} · POEMA" + (f" · {part}/{parts}" if parts > 1 else "")
    title = poem["title"] + (" · continuación" if part > 1 else "")
    start_y = draw_title(c, eyebrow, title, page_no=page_no)
    bottom = TRIM_Y + 18 * mm
    fs, leading = fit_poem_font(part_lines, CONTENT_W, start_y - bottom)
    y = start_y; c.setFont("BookSerif", fs); c.setFillColor(INK)
    for line in part_lines:
        if line: c.drawString(CONTENT_LEFT, y, line)
        y -= leading


def draw_text_lines(c, eyebrow, title, lines, part, parts, page_no):
    label = eyebrow + (f" · {part}/{parts}" if parts > 1 else "")
    shown = title if part == 1 else title + " · continuación"
    start_y = draw_title(c, label, shown, page_no=page_no)
    fs, leading = fit_poem_font(lines, CONTENT_W, start_y - (TRIM_Y + 18 * mm), max_size=10.4, min_size=8.2)
    c.setFont("BookSerif", fs); c.setFillColor(INK); y = start_y
    for line in lines:
        if line: c.drawString(CONTENT_LEFT, y, line)
        y -= leading


def choose_justify_font(lines, width, max_size=8.3, min_size=6.6):
    factors = []
    for line in lines:
        words = line.strip().split()
        if words: factors.append(sum(pdfmetrics.stringWidth(w, "BookSerif", 1) for w in words))
    max_factor = max(factors or [1])
    return max(min_size, min(max_size, width / max_factor * 0.985))


def draw_justified_line(c, line, x, y, width, font, size):
    words = line.strip().split()
    if not words: return
    c.setFont(font, size); c.setFillColor(INK)
    if len(words) == 1:
        c.drawString(x, y, words[0]); return
    widths = [pdfmetrics.stringWidth(w, font, size) for w in words]
    gap = (width - sum(widths)) / (len(words) - 1)
    if gap < 0:
        c.drawString(x, y, line); return
    xx = x
    for i, (w, ww) in enumerate(zip(words, widths)):
        c.drawString(xx, y, w); xx += ww + (gap if i < len(words) - 1 else 0)


def draw_horizontal(c, item, page_no):
    start_y = draw_title(c, f"H{item['number']:02d} · HORIZONTAL · MATRIZ PROFUNDA", item['title'], page_no=page_no)
    lines = item['verses']; fs = choose_justify_font(lines, CONTENT_W)
    bottom = TRIM_Y + 17 * mm; leading = min(11.0, (start_y - bottom) / max(27, len(lines))); y = start_y
    for line in lines:
        draw_justified_line(c, line, CONTENT_LEFT, y, CONTENT_W, "BookSerif", fs); y -= leading


def draw_structural(c, eyebrow, title, lines, page_no):
    start_y = draw_title(c, eyebrow, title, page_no=page_no)
    fs, leading = fit_poem_font(lines, CONTENT_W, start_y - (TRIM_Y + 18 * mm), max_size=10.2, min_size=8.0)
    c.setFont("BookSerif", fs); c.setFillColor(INK); y = start_y
    for line in lines:
        if line: c.drawString(CONTENT_LEFT, y, line)
        y -= leading


def draw_contract_note(c, page_no):
    draw_page_base(c, page_no)
    c.setFillColor(MUTED); c.setFont("BookSansBold", 7.5); c.drawString(CONTENT_LEFT, TRIM_Y + TRIM_H - 24 * mm, "NOTA DE LECTURA")
    text = ("Los veintisiete poemas que abren el volumen constituyen una obra autónoma. Bajo ellos permanece una matriz anterior de 729 posiciones, conservada como estrato y segunda lectura. Salvo LA VEGA y la celda común 14×14, ningún poema de superficie ha sido corregido para obedecer horizontales, diagonales, acrósticos, telésticos o mesósticos.")
    style = ParagraphStyle('note', fontName='BookSerif', fontSize=12.2, leading=18, textColor=INK, alignment=TA_LEFT)
    p = Paragraph(text, style); w, h = p.wrap(CONTENT_W, 110 * mm); p.drawOn(c, CONTENT_LEFT, TRIM_Y + TRIM_H * 0.52 - h / 2)


def draw_colophon(c, page_no, sha):
    y = draw_title(c, "EDICIÓN INTEGRAL PARA IMPRENTA", "LA GRANADA DEL 27 · UN SIGLO DESPUÉS", page_no=page_no)
    lines = ["Formato de corte: A5 · 148 × 210 mm", "Sangrado: 3 mm perimetral", "Salida: PDF continuo · texto vectorial · fuentes incrustadas", "Jerarquía: superficie / Cuaderno de piedra / apéndice de lecturas", f"Fuente canónica: repositorio · {sha[:12] if sha else 'main'}", "Corpus poético: sin modificaciones editoriales de versos."]
    c.setFillColor(INK); c.setFont("BookSerif", 9.5)
    for line in lines:
        c.drawString(CONTENT_LEFT, y, line); y -= 6 * mm


def draw_loas(c, loa1, loa2, page_no):
    draw_page_base(c, page_no); top = TRIM_Y + TRIM_H - 22 * mm
    c.setFillColor(MUTED); c.setFont("BookSansBold", 7.4); c.drawString(CONTENT_LEFT, top, "CODA · DOS DIRECCIONES")
    c.setFillColor(INK); c.setFont("BookSerifBold", 20); c.drawString(CONTENT_LEFT, top - 10 * mm, "LAS DOS LOAS"); draw_rule(c, top - 16 * mm)
    col_gap = 10 * mm; col_w = (CONTENT_W - col_gap) / 2; y0 = top - 29 * mm
    for x, label, lines in [(CONTENT_LEFT, "LOA I · HACIA FUERA", loa1), (CONTENT_LEFT + col_w + col_gap, "LOA II · HACIA DENTRO", loa2)]:
        c.setFillColor(MUTED); c.setFont("BookSansBold", 7.0); c.drawString(x, y0, label)
        y = y0 - 8 * mm; c.setFillColor(INK); c.setFont("BookSerif", 9.2)
        for line in lines:
            if pdfmetrics.stringWidth(line, "BookSerif", 9.2) <= col_w:
                c.drawString(x, y, line); y -= 5.2 * mm
            else:
                words = line.split(); cur = ""
                for word in words:
                    test = (cur + " " + word).strip()
                    if cur and pdfmetrics.stringWidth(test, "BookSerif", 9.2) > col_w:
                        c.drawString(x, y, cur); y -= 5.2 * mm; cur = word
                    else: cur = test
                if cur: c.drawString(x, y, cur); y -= 5.2 * mm


def draw_reveal(c, page_no):
    draw_page_base(c, page_no); cx = TRIM_X + TRIM_W / 2; y = TRIM_Y + TRIM_H * 0.61
    c.setFillColor(MUTED); c.setFont("BookSansBold", 7.5); c.drawCentredString(cx, y + 22 * mm, "REVELACIÓN")
    c.setFillColor(INK); c.setFont("BookSerifBold", 21); c.drawCentredString(cx, y, "LA GRANADA DEL DOS SIETE")
    c.setFont("BookSerif", 13); c.drawCentredString(cx, y - 10 * mm, "LA GRANADA DEL 27")
    style = ParagraphStyle('reveal', fontName='BookSerif', fontSize=10.5, leading=15, textColor=INK, alignment=TA_CENTER)
    p = Paragraph("La superficie, la piedra y los dos sonetos se articulan en un mismo centro estructural.", style); w, h = p.wrap(CONTENT_W, 35 * mm); p.drawOn(c, CONTENT_LEFT, y - 38 * mm - h / 2)


def draw_guide(c, page_no):
    y = draw_title(c, "GUÍA FINAL", "OTRA MANERA DE LEER", page_no=page_no)
    text = ("Arriba, los 27 poemas se miran por parejas alrededor de LA VEGA. Debajo permanece una matriz de 729 posiciones: 27 horizontales, dos diagonales, dos Loas y 54 voces mesósticas. Ambas construcciones se encuentran exactamente en 14 × 14.")
    style = ParagraphStyle('guide', fontName='BookSerif', fontSize=11.2, leading=17, textColor=INK, alignment=TA_LEFT)
    p = Paragraph(text, style); w, h = p.wrap(CONTENT_W, 90 * mm); p.drawOn(c, CONTENT_LEFT, y - h)


def draw_cover_art(c):
    try:
        from svglib.svglib import svg2rlg
        from reportlab.graphics import renderPDF
        drawing = svg2rlg(str(ROOT / "cover-art.svg"))
        if drawing:
            scale = max(PAGE_W / drawing.width, PAGE_H / drawing.height); x = (PAGE_W - drawing.width * scale) / 2; y = (PAGE_H - drawing.height * scale) / 2
            c.saveState(); c.translate(x, y); c.scale(scale, scale); renderPDF.draw(drawing, c, 0, 0); c.restoreState(); return True
    except Exception:
        pass
    c.setFillColor(HexColor("#171713")); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0); return False


def draw_front_cover(c, page_no=1):
    draw_cover_art(c); c.setFillColor(Color(0, 0, 0, alpha=0.26)); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    x = TRIM_X + 17 * mm; y = TRIM_Y + TRIM_H - 35 * mm
    c.setFillColor(white); c.setFont("BookSerifBold", 25); c.drawString(x, y, "LA GRANADA DEL 27")
    c.setFont("BookSerif", 13); c.drawString(x, y - 10 * mm, "UN SIGLO DESPUÉS")
    c.setFont("BookSans", 7.6); c.drawString(x, TRIM_Y + 18 * mm, "EDICIÓN INTEGRAL")


def draw_half_title(c, page_no):
    draw_page_base(c, page_no); c.setFillColor(INK); c.setFont("BookSerifBold", 17); c.drawCentredString(TRIM_X + TRIM_W / 2, TRIM_Y + TRIM_H * 0.56, "LA GRANADA DEL 27")


def draw_title_page(c, page_no):
    draw_page_base(c, page_no); cx = TRIM_X + TRIM_W / 2; y = TRIM_Y + TRIM_H * 0.63
    c.setFillColor(INK); c.setFont("BookSerifBold", 24); c.drawCentredString(cx, y, "LA GRANADA DEL 27")
    c.setFont("BookSerif", 14); c.drawCentredString(cx, y - 12 * mm, "UN SIGLO DESPUÉS")
    c.setFillColor(MUTED); c.setFont("BookSans", 7.4); c.drawCentredString(cx, TRIM_Y + 25 * mm, "EDICIÓN INTEGRAL PARA IMPRENTA")


def draw_joint(c, text, page_no):
    draw_page_base(c, page_no); c.setFillColor(INK); c.setFont("BookSerif", 15); c.drawCentredString(TRIM_X + TRIM_W / 2, TRIM_Y + TRIM_H / 2, text)


def draw_back_cover(c, center_verse, page_no=84):
    draw_cover_art(c); c.setFillColor(Color(0, 0, 0, alpha=0.55)); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    cx = TRIM_X + TRIM_W / 2; c.setFillColor(white); c.setFont("BookSerif", 13); c.drawCentredString(cx, TRIM_Y + TRIM_H * 0.54, center_verse)
    c.setFont("BookSans", 7.0); c.drawCentredString(cx, TRIM_Y + 17 * mm, "LA GRANADA DEL 27 · UN SIGLO DESPUÉS")


def build_pdf():
    data = load_corpus(); pro, epi, loa1, loa2 = parse_site_text(); sha = os.environ.get("GITHUB_SHA", "")
    longest = sorted(data['surface'], key=lambda p: len(p['verses']), reverse=True)[:7]; split_ids = {p['number'] for p in longest}
    c = canvas.Canvas(str(TMP_PDF), pagesize=(PAGE_W, PAGE_H), pageCompression=1); c.setTitle("La Granada del 27 · Un siglo después · Edición integral A5")
    page = 1
    draw_front_cover(c, page); c.showPage(); page += 1
    draw_half_title(c, page); c.showPage(); page += 1
    draw_title_page(c, page); c.showPage(); page += 1
    draw_colophon(c, page, sha); c.showPage(); page += 1
    draw_contract_note(c, page); c.showPage(); page += 1
    for idx, chunk in enumerate(split_even(pro, 3), 1):
        draw_text_lines(c, "PRÓLOGO", "ANTES DE CONTAR", chunk, idx, 3, page); c.showPage(); page += 1
    draw_section(c, "LIBRO I · LA GRANADA DEL 27", "27 poemas", page_no=page); c.showPage(); page += 1
    for poem in data['surface']:
        parts = split_even(poem['verses'], 2) if poem['number'] in split_ids else [poem['verses']]
        for idx, chunk in enumerate(parts, 1):
            draw_poem(c, poem, chunk, idx, len(parts), page); c.showPage(); page += 1
        if poem['number'] in (9, 18):
            draw_joint(c, data['pal'], page); c.showPage(); page += 1
    draw_loas(c, loa1, loa2, page); c.showPage(); page += 1
    draw_section(c, "CUADERNO DE PIEDRA", "27 poemas horizontales · matriz profunda", page_no=page); c.showPage(); page += 1
    for item in data['stone']:
        draw_horizontal(c, item, page); c.showPage(); page += 1
    draw_section(c, "EL CENTRO SECRETO · APÉNDICE DE LECTURAS", "Diagonales y radiales", page_no=page); c.showPage(); page += 1
    stone = data['stone']; diag_down = [stone[i]['verses'][i] for i in range(27)]; diag_up = [stone[i]['verses'][26 - i] for i in range(27)]
    draw_structural(c, "I · DIAGONAL CENTRAL ↘", "DIAGONAL ↘", diag_down, page); c.showPage(); page += 1
    draw_structural(c, "II · DIAGONAL CENTRAL ↗", "DIAGONAL ↗", diag_up, page); c.showPage(); page += 1
    draw_structural(c, "III · RADIAL", "HACIA LO ENTERRADO", data['radial']['buried'], page); c.showPage(); page += 1
    draw_structural(c, "IV · RADIAL", "HACIA LO ABIERTO", data['radial']['open'], page); c.showPage(); page += 1
    draw_reveal(c, page); c.showPage(); page += 1
    for idx, chunk in enumerate(split_even(epi, 2), 1):
        draw_text_lines(c, "EPÍLOGO", "GRANADA QUEDA", chunk, idx, 2, page); c.showPage(); page += 1
    draw_guide(c, page); c.showPage(); page += 1
    center = data['surface'][13]['verses'][13]; draw_back_cover(c, center, page); c.showPage(); page += 1
    c.save()
    actual = page - 1
    if actual != 84: raise RuntimeError(f"Paginación inesperada: {actual} páginas (se esperaban 84)")
    reader = PdfReader(str(TMP_PDF)); writer = PdfWriter(); trim = RectangleObject([BLEED, BLEED, BLEED + TRIM_W, BLEED + TRIM_H]); media = RectangleObject([0, 0, PAGE_W, PAGE_H])
    for p in reader.pages:
        p.mediabox = media; p.cropbox = media; p.bleedbox = media; p.trimbox = trim; writer.add_page(p)
    writer.add_metadata({"/Title": "La Granada del 27 · Un siglo después", "/Subject": "Edición integral A5 para imprenta · 3 mm de sangrado", "/Creator": "Constructor reproducible desde corpus canónico GitHub"})
    with OUT_PDF.open("wb") as fh: writer.write(fh)
    TMP_PDF.unlink(missing_ok=True)
    check = PdfReader(str(OUT_PDF))
    if len(check.pages) != 84: raise RuntimeError("El PDF final no tiene 84 páginas")
    center_count = sum(1 for p in check.pages if center in (p.extract_text() or ""))
    report = {"pages": len(check.pages), "trim_mm": [148, 210], "bleed_mm": 3, "media_mm": [154, 216], "surface_poems": len(data['surface']), "stone_horizontals": len(data['stone']), "split_surface_poems": sorted(split_ids), "prologue_pages": 3, "epilogue_pages": 2, "center_verse_text_occurrences_in_pdf": center_count, "reader_contract_inserted": True, "revelation_center_verse_removed": True, "final_guide_center_verse_removed": True, "diagonal_radial_center_special_emphasis": False, "horizontal_alignment": "full justify with last word anchored to common right edge", "surface_alignment": "left / natural spacing", "source_sha": sha, "output": OUT_PDF.name}
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"); print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    build_pdf()
