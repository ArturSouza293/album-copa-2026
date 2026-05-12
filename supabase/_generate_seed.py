"""
Extrai os colados atuais do index.html e gera um script SQL idempotente
de seed pro Supabase. Rode uma vez e cole a saída no SQL Editor.

Uso: python supabase/_generate_seed.py > supabase/seed.sql
"""
import re
from pathlib import Path

HTML = (Path(__file__).parent.parent / "index.html").read_text(encoding="utf-8")

# Bloco selecoes: [ ... ]
m = re.search(r"selecoes:\s*\[(.*?)\n\s*\],", HTML, re.DOTALL)
if not m:
    raise SystemExit("Não achei o array selecoes no index.html")
selecoes_block = m.group(1)

# Linhas: { nome: "...", codigo: "XXX", grupo: "A", bandeira: "...", coladas: [n,n,n] }
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

# FWC (especiais)
fwc_m = re.search(r"fwcTimes:\s*\{\s*coladas:\s*\[([\d,\s]*)\]", HTML)
if fwc_m and fwc_m.group(1).strip():
    for n in [int(x.strip()) for x in fwc_m.group(1).split(",") if x.strip()]:
        inserts.append(("FWC", n))

total = len(inserts)

# Gera valores em chunks de 6 por linha, agrupados por código
print("-- ============================================================")
print("-- Seed inicial do Álbum Copa 2026")
print(f"-- {total} cromos colados em {len({c for c,_ in inserts})} categorias")
print("-- Gerado automaticamente a partir do index.html")
print("-- ============================================================")
print()
print("-- Limpa qualquer dado existente (idempotente)")
print("TRUNCATE TABLE public.stickers;")
print()
print("INSERT INTO public.stickers (selecao_codigo, numero) VALUES")

# Agrupa por código pra ficar legível
by_code = {}
for c, n in inserts:
    by_code.setdefault(c, []).append(n)

codes = list(by_code.keys())
for i, code in enumerate(codes):
    nums_sorted = sorted(set(by_code[code]))
    row = ", ".join(f"('{code}', {n})" for n in nums_sorted)
    # Importante: separador (, ou ;) ANTES do comentário SQL.
    # Senão o "--" consome a vírgula e o INSERT quebra.
    sep = ";" if i == len(codes) - 1 else ","
    print(f"  {row}{sep}  -- {code} ({len(nums_sorted)})")
print()
print(f"-- Verificação: deve mostrar {total} linhas")
print("-- SELECT COUNT(*) FROM public.stickers;")
