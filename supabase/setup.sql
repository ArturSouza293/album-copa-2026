-- ============================================================
-- ÁLBUM COPA 2026 — SETUP COMPLETO DO BANCO
-- ============================================================
-- Cole TODO esse arquivo no SQL Editor do Supabase e clique em Run.
-- É idempotente: pode rodar várias vezes sem problema.
-- ============================================================

-- 1) Tabela principal: uma linha por cromo colado
-- ============================================================
CREATE TABLE IF NOT EXISTS public.stickers (
  selecao_codigo TEXT    NOT NULL,
  numero         INTEGER NOT NULL,
  colado_em      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (selecao_codigo, numero)
);

CREATE INDEX IF NOT EXISTS stickers_codigo_idx ON public.stickers (selecao_codigo);
CREATE INDEX IF NOT EXISTS stickers_colado_em_idx ON public.stickers (colado_em DESC);

-- 2) Row Level Security — modo single-user (sem auth)
-- ============================================================
-- Como o álbum é pessoal e a anon key fica no front-end público,
-- permitimos SELECT/INSERT/DELETE pra role anon. Pra modo
-- multi-usuário no futuro, troque por policies com auth.uid().
-- ============================================================
ALTER TABLE public.stickers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read"   ON public.stickers;
DROP POLICY IF EXISTS "anon_insert" ON public.stickers;
DROP POLICY IF EXISTS "anon_delete" ON public.stickers;

CREATE POLICY "anon_read"
  ON public.stickers FOR SELECT
  TO anon USING (true);

CREATE POLICY "anon_insert"
  ON public.stickers FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "anon_delete"
  ON public.stickers FOR DELETE
  TO anon USING (true);

-- 3) Realtime — pra sincronizar entre dispositivos
-- ============================================================
-- Adiciona a tabela à publicação supabase_realtime (se ainda não estiver).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'stickers'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.stickers;
  END IF;
END $$;

-- ============================================================
-- Seed inicial do �lbum Copa 2026
-- 525 cromos colados em 48 categorias
-- Gerado automaticamente a partir do index.html
-- ============================================================

-- Limpa qualquer dado existente (idempotente)
TRUNCATE TABLE public.stickers;

INSERT INTO public.stickers (selecao_codigo, numero) VALUES
  ('MEX', 2), ('MEX', 3), ('MEX', 5), ('MEX', 6), ('MEX', 7), ('MEX', 8), ('MEX', 9), ('MEX', 10), ('MEX', 11), ('MEX', 12), ('MEX', 14), ('MEX', 15), ('MEX', 16), ('MEX', 19), ('MEX', 20),  -- MEX (15)
  ('RSA', 1), ('RSA', 2), ('RSA', 4), ('RSA', 5), ('RSA', 6), ('RSA', 7), ('RSA', 8), ('RSA', 9), ('RSA', 10), ('RSA', 11), ('RSA', 14), ('RSA', 16), ('RSA', 18), ('RSA', 20),  -- RSA (14)
  ('KOR', 3), ('KOR', 5), ('KOR', 9), ('KOR', 10), ('KOR', 11), ('KOR', 12), ('KOR', 13), ('KOR', 14), ('KOR', 15), ('KOR', 18), ('KOR', 19),  -- KOR (11)
  ('CZE', 1), ('CZE', 2), ('CZE', 3), ('CZE', 4), ('CZE', 5), ('CZE', 7), ('CZE', 8), ('CZE', 9), ('CZE', 11), ('CZE', 12), ('CZE', 14), ('CZE', 15),  -- CZE (12)
  ('CAN', 2), ('CAN', 3), ('CAN', 5), ('CAN', 6), ('CAN', 7), ('CAN', 8), ('CAN', 9), ('CAN', 11), ('CAN', 13), ('CAN', 14), ('CAN', 18),  -- CAN (11)
  ('BIH', 2), ('BIH', 5), ('BIH', 8), ('BIH', 10), ('BIH', 11), ('BIH', 12), ('BIH', 15), ('BIH', 16), ('BIH', 17),  -- BIH (9)
  ('QAT', 1), ('QAT', 2), ('QAT', 4), ('QAT', 6), ('QAT', 8), ('QAT', 9), ('QAT', 11), ('QAT', 12), ('QAT', 14), ('QAT', 17), ('QAT', 18),  -- QAT (11)
  ('SUI', 1), ('SUI', 2), ('SUI', 3), ('SUI', 4), ('SUI', 5), ('SUI', 6), ('SUI', 9), ('SUI', 12), ('SUI', 13), ('SUI', 14), ('SUI', 15), ('SUI', 18),  -- SUI (12)
  ('BRA', 1), ('BRA', 2), ('BRA', 3), ('BRA', 5), ('BRA', 6), ('BRA', 9), ('BRA', 10), ('BRA', 12), ('BRA', 14), ('BRA', 15), ('BRA', 17), ('BRA', 18), ('BRA', 19), ('BRA', 20),  -- BRA (14)
  ('MAR', 1), ('MAR', 4), ('MAR', 11), ('MAR', 12), ('MAR', 14), ('MAR', 15), ('MAR', 16), ('MAR', 17), ('MAR', 18), ('MAR', 20),  -- MAR (10)
  ('HAI', 1), ('HAI', 2), ('HAI', 3), ('HAI', 5), ('HAI', 6), ('HAI', 9), ('HAI', 10), ('HAI', 15), ('HAI', 18), ('HAI', 19), ('HAI', 20),  -- HAI (11)
  ('SCO', 2), ('SCO', 3), ('SCO', 6), ('SCO', 7), ('SCO', 10), ('SCO', 11), ('SCO', 12), ('SCO', 13), ('SCO', 14), ('SCO', 15), ('SCO', 19), ('SCO', 20),  -- SCO (12)
  ('USA', 1), ('USA', 4), ('USA', 6), ('USA', 8), ('USA', 10), ('USA', 13), ('USA', 17), ('USA', 19),  -- USA (8)
  ('PAR', 3), ('PAR', 4), ('PAR', 8), ('PAR', 13), ('PAR', 15), ('PAR', 16), ('PAR', 17), ('PAR', 18),  -- PAR (8)
  ('AUS', 2), ('AUS', 3), ('AUS', 5), ('AUS', 6), ('AUS', 8), ('AUS', 9), ('AUS', 11), ('AUS', 12), ('AUS', 13), ('AUS', 14), ('AUS', 15), ('AUS', 16), ('AUS', 17), ('AUS', 18), ('AUS', 20),  -- AUS (15)
  ('TUR', 1), ('TUR', 4), ('TUR', 6), ('TUR', 7), ('TUR', 10), ('TUR', 14), ('TUR', 15), ('TUR', 16), ('TUR', 18), ('TUR', 20),  -- TUR (10)
  ('GER', 4), ('GER', 5), ('GER', 9), ('GER', 12), ('GER', 14), ('GER', 15), ('GER', 17), ('GER', 18), ('GER', 19),  -- GER (9)
  ('CUW', 1), ('CUW', 2), ('CUW', 4), ('CUW', 7), ('CUW', 8), ('CUW', 12), ('CUW', 14), ('CUW', 17), ('CUW', 18),  -- CUW (9)
  ('CIV', 1), ('CIV', 3), ('CIV', 5), ('CIV', 7), ('CIV', 8), ('CIV', 9), ('CIV', 11), ('CIV', 13), ('CIV', 16), ('CIV', 17), ('CIV', 18), ('CIV', 19), ('CIV', 20),  -- CIV (13)
  ('ECU', 2), ('ECU', 3), ('ECU', 6), ('ECU', 8), ('ECU', 9), ('ECU', 10), ('ECU', 11), ('ECU', 12), ('ECU', 16), ('ECU', 17), ('ECU', 20),  -- ECU (11)
  ('NED', 1), ('NED', 2), ('NED', 5), ('NED', 6), ('NED', 8), ('NED', 9), ('NED', 14), ('NED', 18), ('NED', 19), ('NED', 20),  -- NED (10)
  ('JPN', 1), ('JPN', 2), ('JPN', 4), ('JPN', 6), ('JPN', 7), ('JPN', 10), ('JPN', 11), ('JPN', 12), ('JPN', 15), ('JPN', 16), ('JPN', 20),  -- JPN (11)
  ('SWE', 2), ('SWE', 6), ('SWE', 17), ('SWE', 19),  -- SWE (4)
  ('TUN', 3), ('TUN', 5), ('TUN', 7), ('TUN', 11), ('TUN', 14), ('TUN', 16), ('TUN', 18), ('TUN', 20),  -- TUN (8)
  ('BEL', 4), ('BEL', 5), ('BEL', 7), ('BEL', 9), ('BEL', 11), ('BEL', 12), ('BEL', 13), ('BEL', 15), ('BEL', 17), ('BEL', 20),  -- BEL (10)
  ('EGY', 2), ('EGY', 3), ('EGY', 5), ('EGY', 6), ('EGY', 7), ('EGY', 9), ('EGY', 10), ('EGY', 11), ('EGY', 13), ('EGY', 14), ('EGY', 15), ('EGY', 16),  -- EGY (12)
  ('IRN', 1), ('IRN', 2), ('IRN', 3), ('IRN', 4), ('IRN', 7), ('IRN', 8), ('IRN', 11), ('IRN', 12), ('IRN', 15), ('IRN', 16), ('IRN', 17), ('IRN', 19), ('IRN', 20),  -- IRN (13)
  ('NZL', 4), ('NZL', 7), ('NZL', 9), ('NZL', 10), ('NZL', 11), ('NZL', 15), ('NZL', 16), ('NZL', 19), ('NZL', 20),  -- NZL (9)
  ('ESP', 2), ('ESP', 3), ('ESP', 5), ('ESP', 6), ('ESP', 7), ('ESP', 9), ('ESP', 11), ('ESP', 14), ('ESP', 16), ('ESP', 17), ('ESP', 18), ('ESP', 19), ('ESP', 20),  -- ESP (13)
  ('CPV', 2), ('CPV', 6), ('CPV', 7), ('CPV', 8), ('CPV', 10), ('CPV', 12), ('CPV', 15), ('CPV', 16), ('CPV', 19), ('CPV', 20),  -- CPV (10)
  ('KSA', 1), ('KSA', 3), ('KSA', 7), ('KSA', 11), ('KSA', 13), ('KSA', 14), ('KSA', 16), ('KSA', 20),  -- KSA (8)
  ('URU', 1), ('URU', 5), ('URU', 9), ('URU', 13), ('URU', 14), ('URU', 15), ('URU', 16), ('URU', 18), ('URU', 19),  -- URU (9)
  ('FRA', 1), ('FRA', 2), ('FRA', 4), ('FRA', 7), ('FRA', 8), ('FRA', 9), ('FRA', 14), ('FRA', 15), ('FRA', 19),  -- FRA (9)
  ('SEN', 1), ('SEN', 2), ('SEN', 3), ('SEN', 7), ('SEN', 9), ('SEN', 10), ('SEN', 11), ('SEN', 16), ('SEN', 17), ('SEN', 18), ('SEN', 19), ('SEN', 20),  -- SEN (12)
  ('NOR', 1), ('NOR', 3), ('NOR', 5), ('NOR', 7), ('NOR', 8), ('NOR', 9), ('NOR', 10), ('NOR', 11), ('NOR', 12), ('NOR', 13), ('NOR', 14), ('NOR', 15), ('NOR', 16), ('NOR', 18), ('NOR', 19),  -- NOR (15)
  ('ARG', 1), ('ARG', 2), ('ARG', 4), ('ARG', 7), ('ARG', 8), ('ARG', 11), ('ARG', 12), ('ARG', 13), ('ARG', 14), ('ARG', 16), ('ARG', 17), ('ARG', 20),  -- ARG (12)
  ('ALG', 2), ('ALG', 4), ('ALG', 6), ('ALG', 8), ('ALG', 11), ('ALG', 12), ('ALG', 13), ('ALG', 17), ('ALG', 20),  -- ALG (9)
  ('AUT', 1), ('AUT', 2), ('AUT', 3), ('AUT', 5), ('AUT', 6), ('AUT', 7), ('AUT', 10), ('AUT', 11), ('AUT', 12), ('AUT', 15), ('AUT', 16), ('AUT', 19), ('AUT', 20),  -- AUT (13)
  ('JOR', 1), ('JOR', 2), ('JOR', 3), ('JOR', 6), ('JOR', 10), ('JOR', 12), ('JOR', 15), ('JOR', 18), ('JOR', 19),  -- JOR (9)
  ('POR', 1), ('POR', 2), ('POR', 3), ('POR', 5), ('POR', 6), ('POR', 7), ('POR', 8), ('POR', 10), ('POR', 11), ('POR', 12), ('POR', 14), ('POR', 15), ('POR', 16), ('POR', 18), ('POR', 19),  -- POR (15)
  ('COL', 2), ('COL', 3), ('COL', 7), ('COL', 8), ('COL', 9), ('COL', 11), ('COL', 12), ('COL', 13), ('COL', 14), ('COL', 15), ('COL', 16), ('COL', 17), ('COL', 18), ('COL', 19),  -- COL (14)
  ('COD', 5), ('COD', 6), ('COD', 7), ('COD', 8), ('COD', 14), ('COD', 18), ('COD', 19),  -- COD (7)
  ('UZB', 5), ('UZB', 7), ('UZB', 9), ('UZB', 13), ('UZB', 14), ('UZB', 15), ('UZB', 16), ('UZB', 17), ('UZB', 19),  -- UZB (9)
  ('ENG', 1), ('ENG', 3), ('ENG', 4), ('ENG', 5), ('ENG', 7), ('ENG', 8), ('ENG', 9), ('ENG', 12), ('ENG', 13), ('ENG', 14), ('ENG', 15), ('ENG', 16), ('ENG', 17), ('ENG', 20),  -- ENG (14)
  ('CRO', 3), ('CRO', 4), ('CRO', 5), ('CRO', 7), ('CRO', 8), ('CRO', 11), ('CRO', 13), ('CRO', 14), ('CRO', 16), ('CRO', 18), ('CRO', 20),  -- CRO (11)
  ('GHA', 3), ('GHA', 4), ('GHA', 7), ('GHA', 8), ('GHA', 11), ('GHA', 12), ('GHA', 14), ('GHA', 16), ('GHA', 17), ('GHA', 18), ('GHA', 20),  -- GHA (11)
  ('PAN', 1), ('PAN', 2), ('PAN', 3), ('PAN', 5), ('PAN', 8), ('PAN', 9), ('PAN', 10), ('PAN', 13), ('PAN', 14), ('PAN', 15), ('PAN', 18), ('PAN', 19), ('PAN', 20),  -- PAN (13)
  ('FWC', 0), ('FWC', 2), ('FWC', 3), ('FWC', 4), ('FWC', 9), ('FWC', 11), ('FWC', 13), ('FWC', 16), ('FWC', 17), ('FWC', 19);  -- FWC (10)

-- Verifica��o: deve mostrar 525 linhas
-- SELECT COUNT(*) FROM public.stickers;

