# Álbum Copa do Mundo 2026

Site single-page standalone para acompanhar a coleção do álbum de figurinhas Panini da Copa do Mundo 2026.

🌐 **Acesso:** https://album-copa-2026.netlify.app (atualize com o domínio do seu deploy)

---

## Funcionalidades

### Página principal (Álbum)
- **48 seleções** organizadas pelos 12 grupos oficiais (A → L), 4 seleções por grupo
- **Headers de grupo** com barra de progresso por grupo
- **5 KPIs principais** com barras de progresso animadas:
  - Total colado / 980
  - % Completude do álbum
  - Brilhantes (FWC 00 → 19) — dourado
  - Logos (#1 de cada seleção) — dourado
  - Fotos do time (#13 de cada seleção) — violeta
- **Top 5 mais e menos completas** (clicáveis, abrem o modal da seleção)
- **Barra de progressão gamificada no header** com níveis: Iniciante → Em Progresso → Avançado → Quase Lá → Campeão
- **Card especial dos FWC** com grid 00→19, destaque dourado pulsante na capa (FWC 00)
- **Acesso rápido por bandeiras** (48 chips no topo com código FIFA + % colorido por status)
- **Filtros**: todas / quase completas (≥75%) / iniciantes (<25%) / não iniciadas
- **Ordenação**: ordem do álbum / alfabética / mais ou menos completas
- **Busca** por nome ou código FIFA (sem acentos, case-insensitive)
- **Modal detalhado** por seleção com bandeira grande, lista de coladas/faltando e os 20 cromos em estilo figurinha (com destaque especial #1 dourado e #13 violeta)

### Aba Estatísticas
- **Você**: pacotes comprados, investimento, custo/colada, velocidade, eficiência
- **Você vs Mercado**: comparação com cenário mediano sem-troca e típico com-troca
- **Raridades**: metalizadas, extra stickers, estreantes mais disputadas (Iraque, Cabo Verde, Curaçao, Uzbequistão)
- **Canais não usados**: McDonald's (#13 exclusivas), Coca-Cola Zero (Time dos Sonhos), Panini avulso (julho)

### Outros
- **Tema claro/escuro** (persistido em `localStorage`)
- **Totalmente responsivo** — desktop, tablet, mobile (down to 320px)
- **Acessível**: aria-labels, role="button" nos cards, navegação por teclado (Enter/Space abrem o modal)
- **Animações suaves**: shimmer nas barras, pulse no FWC 00, fade-in stagger nos cards, lift no hover

---

## Stack

- **HTML + CSS + JS** puro — sem React, Vue, build step ou bundler
- **Google Fonts** (Inter) via CDN
- **Bandeiras** de [flagcdn.com](https://flagcdn.com) com fallback pro emoji nativo se a CDN falhar

Um único arquivo `index.html` (~140KB) com tudo embutido.

---

## Como atualizar dados manualmente

Edite o `index.html`, na seção `<script>` no final do arquivo. As variáveis principais:

### `ALBUM` — estado da coleção
```javascript
ALBUM.meta.totalColado       // total colados (referência manual; o site recalcula)
ALBUM.meta.pacotesAbertos    // total de pacotes abertos até hoje
ALBUM.meta.ultimaAtualizacao // ISO date (YYYY-MM-DD)

ALBUM.selecoes[i].coladas    // array com os números (1..20) já colados de cada seleção
ALBUM.especiais.fwcTimes.coladas  // array com os FWC já colados (0..19, onde 0 é a capa)
```

### `STATS` — métricas pessoais
Edite manualmente se quiser refletir mudanças de pacotes/eficiência na aba Estatísticas (o site não recalcula automaticamente os campos derivados).

---

## Hospedagem

Site é 100% estático. Opções:

| Hosting | Comando / Setup |
|---|---|
| **Netlify** (recomendado) | Conectar este repo via dashboard. Auto-deploy a cada push. |
| **GitHub Pages** | Settings → Pages → Source: main / root |
| **Cloudflare Pages** | Conectar via dashboard, build command vazio, output dir `.` |
| **Vercel** | `vercel deploy` ou conectar via dashboard |

O arquivo `netlify.toml` já está configurado pra publicar a raiz do repo.

---

## Supabase (sync entre dispositivos)

O app está integrado com Supabase pra sincronizar o estado entre celular, desktop e tablet em tempo real (via websocket).

**Setup inicial** (rodar 1x só, depois de criar o projeto Supabase):

1. Abre o painel do Supabase → SQL Editor → New query
2. Cola o conteúdo de `supabase/setup.sql`
3. Run

O script é idempotente (`ON CONFLICT DO NOTHING`), então pode rodar de novo sem perigo.

**Modificando as credentials** (caso troque de projeto Supabase):
No início da tag `<script>` do `index.html`, atualiza:
```javascript
const SUPABASE_URL = 'https://SEU_REF.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```

**Regerar o seed** depois de editar manualmente as `coladas` no `index.html`:
```bash
python supabase/_generate_seed.py > supabase/seed.sql
```

## Roadmap

- [x] ~~**Supabase**: tabela SQL pra sincronizar entre dispositivos~~ ✅
- [x] ~~**UI clicável**: tocar numa figurinha alterna entre colada/faltando~~ ✅
- [x] ~~**Real-time sync**: mudança no celular aparece no desktop sem F5~~ ✅
- [ ] **Histórico temporal**: gráfico de progresso ao longo dos dias (usando `colado_em`)
- [ ] **Modo trade**: marcar repetidas pra trocar com amigos
- [ ] **Auth multi-usuário**: cada amigo com seu próprio álbum (Supabase Auth + RLS por uid)

---

## Licença

Projeto pessoal. Sinta-se livre pra forkar e adaptar pro seu próprio álbum.
