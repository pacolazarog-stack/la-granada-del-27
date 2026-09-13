from pathlib import Path
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream, NameObject

path = Path(sys.argv[1])
reader = PdfReader(str(path))
writer = PdfWriter()
standard = {NameObject('/F1'), NameObject('/F2')}

for page_no, page in enumerate(reader.pages, 1):
    stream = ContentStream(page.get_contents(), reader)
    current = None
    visible_standard = []
    operations = []
    for operands, operator in stream.operations:
        if operator == b'Tf':
            current = operands[0]
            if current in standard:
                continue
        if operator in {b'Tj', b'TJ', b"'", b'"'} and current in standard:
            visible_standard.append((operator, operands))
        operations.append((operands, operator))
    if visible_standard:
        raise RuntimeError(f'Página {page_no}: fuente estándar visible; no se elimina')
    stream.operations = operations
    page.replace_contents(stream)
    resources = page.get('/Resources')
    if resources:
        resources = resources.get_object()
        fonts = resources.get('/Font')
        if fonts:
            fonts = fonts.get_object()
            for key in standard:
                if key in fonts:
                    del fonts[key]
    writer.add_page(page)

writer.add_metadata(reader.metadata or {})
tmp = path.with_suffix('.clean.pdf')
with tmp.open('wb') as handle:
    writer.write(handle)
tmp.replace(path)
