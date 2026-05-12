"""
Extrai os colados atuais do index.html e gera o INSERT SQL.
Sem nenhum comentário inline pra evitar qualquer ambiguidade de parser.

Uso: python supabase/_generate_seed.py > supabase/seed.sql
"""
import re
from pathlib import Path

HTML = (Path(__file__).parent.parent / "index.html").read_text(encoding="utf-8")

m = re.search(r"selecoes:\s*\[(.*?)\n\s*\],", HTML, re.DOTALL)
if not m:
    raise SystemExit("Nao achei o array selecoes no index.html")
selecoes_block = m.group(1)

line_re = re.compile(
    r'codigo:\s*"(?P<cod>\w+)".*?coladas:\s*\[(?P<list>[\d,\s]*)\]'
)

inserts = []
for m in line_re.finditer(selecoes_block):
    codigo = m.group("cod")
    nums_str = m.group("list").strip()
    if not nums_str:
        continue
    for n in [int(x.strip()) for x in nums_str.split(",") if x.strip()]:
        inserts.append((codigo, n))

fwc_m = re.search(r"fwcTimes:\s*\{\s*coladas:\s*\[([\d,\s]*)\]", HTML)
if fwc_m and fwc_m.group(1).strip():
    for n in [int(x.strip()) for x in fwc_m.group(1).split(",") if x.strip()]:
        inserts.append(("FWC", n))

by_code = {}
for c, n in inserts:
    by_code.setdefault(c, []).append(n)

print("INSERT INTO public.stickers (selecao_codigo, numero) VALUES")
codes = list(by_code.keys())
lines = []
for code in codes:
    nums_sorted = sorted(set(by_code[code]))
    row = ", ".join(f"('{code}', {n})" for n in nums_sorted)
    lines.append(f"  {row}")
print(",\n".join(lines))
print("ON CONFLICT (selecao_codigo, numero) DO NOTHING;")
