-- Consolidate make duplicates created by EEA/ADEME naming variance.
--
-- Strategy:
--   1. For each (alias, canonical) pair, ensure the canonical CatalogMake exists.
--   2. Move every CatalogModel under the canonical make. Where a model with
--      the same (canonical_makeId, name) already exists, move that model's
--      trims under the existing canonical model and delete the duplicate.
--   3. Drop the now-empty alias makes.
--
-- Run inside a transaction. Idempotent: re-running has no effect once
-- canonical names are already in place.
--
-- USAGE:
--   PGPASSWORD=… psql -h … -U … -d … -f script.sql

BEGIN;

-- Helper: canonical alias → name table (matches MAKE_ALIASES in seed-catalog.ts)
CREATE TEMP TABLE _aliases (alias TEXT PRIMARY KEY, canonical TEXT NOT NULL) ON COMMIT DROP;
INSERT INTO _aliases (alias, canonical) VALUES
  ('MERCEDES BENZ',                  'MERCEDES'),
  ('MERCEDES-BENZ',                  'MERCEDES'),
  ('MERCEDES AMG',                   'MERCEDES'),
  ('MERCEDES BENZ AG',               'MERCEDES'),
  ('B M W',                          'BMW'),
  ('B.M.W.',                         'BMW'),
  ('BMW I',                          'BMW'),
  ('M.G.',                           'MG'),
  ('MC LAREN',                       'MCLAREN'),
  ('LAMBORGHIN',                     'LAMBORGHINI'),
  ('ROLLS ROYC',                     'ROLLS ROYCE'),
  ('MITSUBISHI MOTORS CORPORATION',  'MITSUBISHI'),
  ('MITSUBISHI MOTORS THAILAND',     'MITSUBISHI'),
  ('CITROËN',                        'CITROEN'),
  ('VAUXHALL',                       'OPEL');

-- For each alias that exists in CatalogMake, create or find the canonical
-- make and reassign all its models.
DO $$
DECLARE
  rec RECORD;
  alias_id INTEGER;
  canonical_id INTEGER;
  model_rec RECORD;
  existing_canonical_model_id INTEGER;
BEGIN
  FOR rec IN SELECT alias, canonical FROM _aliases LOOP
    SELECT id INTO alias_id FROM "CatalogMake" WHERE name = rec.alias;
    IF alias_id IS NULL THEN
      RAISE NOTICE 'alias % not present, skipping', rec.alias;
      CONTINUE;
    END IF;

    -- Ensure canonical make exists. If not, rename the alias in place.
    SELECT id INTO canonical_id FROM "CatalogMake" WHERE name = rec.canonical;

    IF canonical_id IS NULL THEN
      -- No canonical exists yet → rename alias to canonical.
      UPDATE "CatalogMake"
         SET name = rec.canonical,
             slug = lower(regexp_replace(rec.canonical, '[^a-zA-Z0-9]+', '-', 'g'))
       WHERE id = alias_id;
      RAISE NOTICE 'renamed % → % (id=%)', rec.alias, rec.canonical, alias_id;
      CONTINUE;
    END IF;

    -- Both exist: move models, deduplicating where (canonical_makeId, name) collides.
    FOR model_rec IN
      SELECT id, name FROM "CatalogModel" WHERE "makeId" = alias_id
    LOOP
      SELECT id INTO existing_canonical_model_id
      FROM "CatalogModel"
      WHERE "makeId" = canonical_id AND name = model_rec.name;

      IF existing_canonical_model_id IS NOT NULL THEN
        -- Same model exists under canonical: move trims, delete dup model.
        UPDATE "CatalogTrim" SET "modelId" = existing_canonical_model_id
         WHERE "modelId" = model_rec.id;
        DELETE FROM "CatalogModel" WHERE id = model_rec.id;
      ELSE
        -- No collision: just reparent.
        UPDATE "CatalogModel" SET "makeId" = canonical_id WHERE id = model_rec.id;
      END IF;
    END LOOP;

    -- Merge sources arrays then drop alias make.
    UPDATE "CatalogMake" canonical
       SET sources = (
         SELECT ARRAY(
           SELECT DISTINCT unnest(canonical.sources || alias.sources)
           FROM "CatalogMake" alias
           WHERE alias.id = alias_id
         )
       )
     WHERE canonical.id = canonical_id;

    DELETE FROM "CatalogMake" WHERE id = alias_id;
    RAISE NOTICE 'merged % → % (alias deleted)', rec.alias, rec.canonical;
  END LOOP;
END $$;

-- Sanity report
SELECT name, (SELECT COUNT(*) FROM "CatalogTrim" t
              JOIN "CatalogModel" mo ON mo.id = t."modelId"
              WHERE mo."makeId" = m.id) AS trims
FROM "CatalogMake" m
WHERE name IN ('MERCEDES','BMW','MG','MCLAREN','LAMBORGHINI','ROLLS ROYCE','MITSUBISHI','CITROEN','OPEL')
ORDER BY name;

COMMIT;
