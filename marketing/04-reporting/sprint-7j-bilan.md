# Bilan du sprint 7 jours — 19 au 26 avril 2026

> Récap de tout ce qui a été produit sur les 7 jours de sprint Growth.
> Document d'archive à conserver pour comparaison aux sprints futurs.

## Phase 1 — Audit (Jour 0, 19 avril)

| Doc                   | État | Lien                                       |
| --------------------- | ---- | ------------------------------------------ |
| brief.md              | ✅   | `marketing/00-context/brief.md`            |
| seo-technique.md      | ✅   | `marketing/01-audit/seo-technique.md`      |
| seo-onpage.md         | ✅   | `marketing/01-audit/seo-onpage.md`         |
| seo-offpage.md        | ✅   | `marketing/01-audit/seo-offpage.md`        |
| concurrence.md        | ✅   | `marketing/01-audit/concurrence.md`        |
| mots-cles.md          | ✅   | `marketing/01-audit/mots-cles.md`          |
| social-actuel.md      | ✅   | `marketing/01-audit/social-actuel.md`      |
| synthese-executive.md | ✅   | `marketing/01-audit/synthese-executive.md` |

## Phase 2 — Stratégie (Jour 3, 23 avril)

| Doc                     | État | Lien                                             |
| ----------------------- | ---- | ------------------------------------------------ |
| personas.md             | ✅   | `marketing/02-strategie/personas.md`             |
| strategie.md            | ✅   | `marketing/02-strategie/strategie.md`            |
| roadmap-90j.md          | ✅   | `marketing/02-strategie/roadmap-90j.md`          |
| calendrier-editorial.md | ✅   | `marketing/02-strategie/calendrier-editorial.md` |
| architecture-contenu.md | ✅   | `marketing/02-strategie/architecture-contenu.md` |

## Phase 3 — Production (Jours 1-7)

### Code site (mis en prod)

| Item                                       | Commit                 | État                  |
| ------------------------------------------ | ---------------------- | --------------------- |
| Compression gzip via Traefik               | (déjà actif)           | ✅ vérifié 49KB→9.7KB |
| Security headers (HSTS, X-Frame, etc.)     | feat: security headers | ✅ live               |
| JSON-LD schemas (Article, FAQ, Breadcrumb) | (déjà existant)        | ✅                    |
| Sitemap.xml (42 URLs)                      | sitemap update         | ✅ submitted GSC      |
| Titles ≤ 60 chars (toutes pages)           | seo: shorten titles    | ✅ vérifié            |
| Hubs `/guide` et `/carte-grise`            | seo: add index hubs    | ✅ live               |
| Page Tesla Model Y étendue à 1000+ mots    | seo: Jour 5            | ✅ live               |
| Page Renault Clio étendue à 1000+ mots     | seo: Jour 5            | ✅ live               |
| Page Île-de-France étendue à 1200+ mots    | seo: Jour 5            | ✅ live               |
| Plausible analytics self-hosted            | (déjà actif)           | ✅ live               |
| GSC + sitemap submitted                    | manuel                 | ✅                    |
| Bing Webmaster Tools                       | manuel                 | ✅                    |

### Brouillons social (à publier après création comptes)

| Doc                       | État                              | Action                                 |
| ------------------------- | --------------------------------- | -------------------------------------- |
| visuels-specs.md          | ✅ rédigé                         | utilisateur produit les visuels        |
| posts-semaine-1.md        | ✅ rédigé (LinkedIn + X + Reddit) | utilisateur publie après comptes créés |
| guide-creation-comptes.md | ✅ rédigé                         | utilisateur crée les 3 comptes         |

### Brouillons off-page (à activer)

| Doc             | État                                   | Action                                      |
| --------------- | -------------------------------------- | ------------------------------------------- |
| show-hn.md      | ✅ rédigé                              | utilisateur poste mardi/mercredi 15h        |
| product-hunt.md | ✅ rédigé                              | après visuels prêts (peut attendre 1-2 sem) |
| annuaires-fr.md | ✅ rédigé (10 annuaires identifiés)    | utilisateur soumet à étaler 1 sem           |
| digital-pr.md   | ✅ rédigé (12 journalistes identifiés) | utilisateur envoie 4-5 pitches/sem          |

## Phase 4 — Mesure (Jour 7, 26 avril)

| Doc                | État                            | Lien                                        |
| ------------------ | ------------------------------- | ------------------------------------------- |
| kpis.md            | ✅ rédigé (baselines à mesurer) | `marketing/04-reporting/kpis.md`            |
| sprint-7j-bilan.md | ✅ ce fichier                   | `marketing/04-reporting/sprint-7j-bilan.md` |

## Bonus — R&D parallèle

| Item                                                           | État                  |
| -------------------------------------------------------------- | --------------------- |
| Scraper auto-data.net (R&D local)                              | 🔄 en cours, ETA ~16h |
| Stockage isolé : `~/Documents/Projects/immatout-rnd-scraping/` | ✅                    |
| Note légale claire : usage privé / pas de republication        | ✅                    |

## Ce qui reste à faire (par l'utilisateur)

| Tâche                                              | Effort                           | Priorité           |
| -------------------------------------------------- | -------------------------------- | ------------------ |
| Créer page LinkedIn Immatout                       | 15 min                           | P0                 |
| Créer compte X @immatout                           | 10 min                           | P0                 |
| Créer compte Reddit (laisser maturer 7j)           | 5 min                            | P0                 |
| Produire les 3 visuels (logo + bannière + OG card) | 30 min (avec IA) à 2h (designer) | P0                 |
| Publier le post LinkedIn d'intro                   | 5 min                            | P0 — J+1           |
| Publier le thread X                                | 5 min                            | P0 — J+2           |
| Lancer Show HN (mardi ou mercredi 15h-18h)         | 30 min                           | P1                 |
| Soumettre 6 annuaires français (top 6)             | 1h30                             | P1                 |
| Pitcher 5 journalistes (3 tech + 2 auto)           | 2h                               | P1                 |
| Soumettre Product Hunt                             | 1h                               | P2 (après visuels) |
| Mesurer baseline Plausible / GSC dans 24h          | 15 min                           | P2                 |

## Métriques produites pendant le sprint

- **Documents stratégiques** : 8 (audit) + 5 (stratégie) = 13 docs
- **Documents production** : 3 social + 4 outreach = 7 docs
- **Documents reporting** : 2
- **Total docs marketing** : 22 fichiers, ~16 000 mots de stratégie/contenu écrit
- **Code commits** : 6 commits Jour 1-5 (titles, security, hubs, slots extraContent, content)
- **Lignes prod modifiées/ajoutées** : ~1 500 lignes TSX

## Apprentissages clés

1. **La compression gzip était déjà active** mais l'audit initial l'avait flaggée P0 par erreur (HEAD ne montre pas content-encoding). Toujours tester avec verbose GET avant de paniquer.

2. **Coolify SERVICE_FQDN_PLAUSIBLE** était overwrite → solution finale = Traefik labels explicites dans docker-compose.

3. **Service-public.gouv.fr ne fait pas le calcul** — c'est précisément ce qui nous donne notre angle de différenciation. Tout le contenu éditorial et le pitch presse repose là-dessus.

4. **Slots `extraContent`** sur les composants partagés (ModelPage, RegionPage) permet d'enrichir 1 page sans dupliquer toute la logique. Pattern à réutiliser pour les 24 autres pages modèles à venir.

5. **Auto-data.net robots.txt autorise techniquement** mais le scraping de leur DB de spec auto reste juridiquement risqué (droit sui generis des bases). On scrape en R&D locale uniquement, pas pour publication.

## Décisions différées

- **Backlinks payants** : on ne paie aucun backlink ce trimestre (signal négatif Google + budget). Réévaluer M+6.
- **YouTube / Instagram / TikTok** : pas adapté à l'audience. Pas de prod vidéo avant M+3 minimum.
- **Réécrire complet du calculateur en TS pur (sans Prisma seed)** : non, le seed marche, on garde.
- **Acheter une licence auto-data.net** : on attend de voir la qualité réelle des données extraites en R&D avant de décider.
