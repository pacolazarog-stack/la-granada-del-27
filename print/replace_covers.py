from pathlib import Path
import sys

import cairosvg
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm
from reportlab.lib.colors import white

ROOT = Path(__file__).resolve().parents[1]
path = Path(sys.argv[1])
work = path.parent

BLEED = 3 * mm
TRIM_W, TRIM_H = 148 * mm, 210 * mm
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
pdfmetrics.registerFont(TTFont("CoverSerif", SERIF))
pdfmetrics.registerFont(TTFont("CoverSerifBold", SERIF_BOLD))
pdfmetrics.registerFont(TTFont("CoverSans", SANS))

# 353 ppp sobre la altura completa con sangrado (216 mm).
target_h = round((216 / 25.4) * 353)
target_w = round(target_h * 900 / 1200)
png = work / "_cover_353ppi.png"
cairosvg.svg2png(url=str(ROOT / "cover-art.svg"), write_to=str(png), output_width=target_w, output_height=target_h)


def add_art(c):
    # Mantener la proporción 900:1200 y recortar lateralmente al formato 154:216.
    art_w = PAGE_H * (900 / 1200)
    x = (PAGE_W - art_w) / 2
    c.drawImage(str(png), x, 0, width=art_w, height=PAGE_H, preserveAspectRatio=True, mask='auto')


def shade(c, alpha):
    c.saveState()
    if hasattr(c, "setFillAlpha"):
        c.setFillAlpha(alpha)
    c.setFillColorRGB(0, 0, 0)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.restoreState()


def make_cover(out, back=False, center=""):
    c = canvas.Canvas(str(out), pagesize=(PAGE_W, PAGE_H), pageCompression=1, initialFontName="CoverSerif")
    add_art(c)
    shade(c, 0.28 if not back else 0.58)
    if not back:
        x = BLEED + 17 * mm
        y = BLEED + TRIM_H - 35 * mm
        c.setFillColor(white)
        c.setFont("CoverSerifBold", 25)
        c.drawString(x, y, "LA GRANADA DEL 27")
        c.setFont("CoverSerif", 13)
        c.drawString(x, y - 10 * mm, "UN SIGLO DESPUÉS")
        c.setFont("CoverSans", 7.6)
        c.drawString(x, BLEED + 18 * mm, "EDICIÓN INTEGRAL")
    else:
        cx = BLEED + TRIM_W / 2
        c.setFillColor(white)
        c.setFont("CoverSerif", 13)
        c.drawCentredString(cx, BLEED + TRIM_H * 0.54, center)
        c.setFont("CoverSans", 7.0)
        c.drawCentredString(cx, BLEED + 17 * mm, "LA GRANADA DEL 27 · UN SIGLO DESPUÉS")
    c.showPage(); c.save()


reader = PdfReader(str(path))
center = "Late bajo la cal la acequia hundida."
front_pdf = work / "_front.pdf"
back_pdf = work / "_back.pdf"
make_cover(front_pdf, False)
make_cover(back_pdf, True, center)
front = PdfReader(str(front_pdf)).pages[0]
back = PdfReader(str(back_pdf)).pages[0]

media = RectangleObject([0, 0, PAGE_W, PAGE_H])
trim = RectangleObject([BLEED, BLEED, BLEED + TRIM_W, BLEED + TRIM_H])
for p in (front, back):
    p.mediabox = media; p.cropbox = media; p.bleedbox = media; p.trimbox = trim

writer = PdfWriter()
writer.add_page(front)
for p in reader.pages[1:-1]:
    writer.add_page(p)
writer.add_page(back)
writer.add_metadata(reader.metadata or {})

tmp = path.with_suffix('.covers.pdf')
with tmp.open('wb') as handle:
    writer.write(handle)
tmp.replace(path)

for p in (png, front_pdf, back_pdf):
    p.unlink(missing_ok=True)
