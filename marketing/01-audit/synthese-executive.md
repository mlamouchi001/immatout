# Synthèse exécutive — audit marketing Immatout

> Date : 2026-04-26 · État : site lancé J+7, 40 pages indexables, 0 backlink, 0 compte social.

## Constat global

**Bonnes fondations techniques** mais **invisible commercialement**. La phase audit confirme :

- Architecture SEO solide : 40 URLs, JSON-LD partout, sitemap, OG/Twitter, contenus de 1 000-3 000 mots sur les guides piliers.
- Trois fragilités critiques : pas de compression HTTP, pas de HSTS, ni Google Search Console activé.
- Aucun signal off-page (0 backlink, 0 mention sociale) — état attendu pour J+7.
- Concurrence dominée par service-public.gouv.fr (autorité écrasante) et cartegrise.com (DA 60-70, modèle commercial). **L'angle d'attaque viable** = longue traîne + différenciation "open source / sans pub / comparateur unique".

## Top 10 actions priorisées (impact / effort / priorité)

| #   | Action                                                                                               | Impact                                 | Effort                                        | Priorité | Phase    |
| --- | ---------------------------------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------- | -------- | -------- |
| 1   | ~~Activer compression Brotli/gzip~~ — **vérifié OK le 2026-04-26** (gzip actif, 80 % réduction HTML) | —                                      | 0                                             | ~~P0~~   | —        |
| 2   | **Soumettre sitemap à Google Search Console + Bing WMT**                                             | 🔥 indexation = condition sine qua non | 30 min (utilisateur, action propriétaire DNS) | **P0**   | Process  |
| 3   | **Ajouter HSTS + headers de sécurité**                                                               | signal Google + bonne pratique         | 15 min                                        | **P1**   | Tech     |
| 4   | **Raccourcir 5 titles + 3 meta descriptions trop longs**                                             | CTR SERP +10-20 %                      | 45 min                                        | **P1**   | On-page  |
| 5   | **Créer pages index `/guide/` et `/carte-grise/`**                                                   | crawl + nouvelle landing potentielle   | 2 h                                           | **P1**   | On-page  |
| 6   | **Étendre 6 pages modèles à 700-1000 mots + 9 régions à 900-1100 mots**                              | ranking long-tail                      | 10 h                                          | **P1**   | Content  |
| 7   | **Créer comptes LinkedIn + X + Reddit**                                                              | présence de marque + canaux org        | 1 h                                           | **P1**   | Social   |
| 8   | **Inscrire Immatout sur 3 annuaires gratuits (118218, PagesJaunes, Hotfrog)**                        | 3 backlinks dofollow                   | 1 h                                           | **P2**   | Off-page |
| 9   | **Préparer Show HN + post Product Hunt (à publier après corrections P0)**                            | trafic 24-48 h + 2 backlinks           | 3 h                                           | **P2**   | Off-page |
| 10  | **Mettre en place reporting mensuel KPI**                                                            | mesurer = piloter                      | 1 h                                           | **P2**   | Process  |

**Effort total** : ~20 h. À étaler sur 4 semaines à 5 h/semaine.

## Plan d'audit / exécution sur 7 jours (à valider)

### Jour 1 (lundi) — Quick wins techniques (P0)

- [ ] Activer compression côté Traefik/Coolify (1 h) — **moi**, agent technique
- [ ] Ajouter headers HSTS + sécurité dans `next.config.mjs` (15 min) — **moi**
- [ ] Tester rich-results sur 3 pages guides via search.google.com/test/rich-results (15 min) — **moi**
- [ ] **Toi** : créer compte Google Search Console + valider propriété DNS, soumettre sitemap (30 min)

### Jour 2 (mardi) — On-page rapide (P1)

- [ ] Raccourcir titles + descriptions (45 min) — **moi**, push immédiat
- [ ] Créer pages index `/guide/` et `/carte-grise/` (2 h) — **moi**

### Jour 3 (mercredi) — Stratégie

- [ ] Rédiger `marketing/02-strategie/strategie.md` + `roadmap-90j.md` (2 h) — **moi**
- [ ] Calendrier éditorial premier mois (1 h) — **moi**
- [ ] Personas détaillés (1 h) — **moi**

### Jour 4 (jeudi) — Social setup

- [ ] **Toi** : créer profils LinkedIn page, X compte, Reddit compte (1 h)
- [ ] **Moi** : produire 3 visuels (logo carré, bannières) en assets/marketing (30 min, descriptions à transmettre à un designer ou via générateur)
- [ ] **Moi** : produire 3 premiers posts (1 LinkedIn, 1 X thread, 1 Reddit reply prêt à coller) → `marketing/03-production/social/`

### Jour 5 (vendredi) — Production de contenu (premier batch)

- [ ] Étendre 2 pages modèles (Tesla Model Y + Renault Clio) à 800 mots — 2 h
- [ ] Étendre 1 page régionale (Île-de-France) à 1 100 mots — 1,5 h

### Jour 6 (samedi) — Off-page setup

- [ ] **Toi** : inscriptions 118218 + PagesJaunes + Hotfrog (1 h)
- [ ] Préparer brouillon Show HN + Product Hunt (`marketing/03-production/outreach/`) — 1 h

### Jour 7 (dimanche) — Reporting baseline

- [ ] Établir baseline KPI dans `marketing/04-reporting/kpis.md` — 1 h
- [ ] Snapshot Plausible (visiteurs uniques 7 derniers jours)
- [ ] Validation conjointe du plan 90 jours

**Total semaine** : ~20 h pour moi (agent), ~3 h pour toi (action propriétaire / création comptes).

## Points d'attention

1. **Lancement Show HN / Product Hunt à NE PAS faire avant corrections P0** — les premières visites détermineront partiellement le ranking initial.
2. **GSC est le levier #1** : sans soumission sitemap, l'indexation peut prendre 4-8 semaines au lieu de 1-2.
3. **Pas d'outreach par email avant validation explicite** (règle de l'agent).
4. **Pas d'achat de backlinks ni d'outils SEO payants** (contrainte budget brief).

## Livrables produits aujourd'hui

| Fichier                                    | Contenu                                                 |
| ------------------------------------------ | ------------------------------------------------------- |
| `marketing/00-context/brief.md`            | Brief complet site / personas / concurrents / objectifs |
| `marketing/01-audit/seo-technique.md`      | 7 issues priorisées P0/P1/P2                            |
| `marketing/01-audit/seo-onpage.md`         | Audit 7 pages-piliers + 5 actions                       |
| `marketing/01-audit/seo-offpage.md`        | Roadmap backlinks 90 j                                  |
| `marketing/01-audit/concurrence.md`        | 5 concurrents analysés + 5 angles différenciants        |
| `marketing/01-audit/mots-cles.md`          | 110 mots-clés en 5 clusters + quick wins                |
| `marketing/01-audit/social-actuel.md`      | GO/NO-GO sur 8 plateformes                              |
| `marketing/01-audit/synthese-executive.md` | Ce document                                             |

## Prochaines actions à valider (ordre suggéré)

**Tu valides ?**

1. Plan d'audit 7 jours ci-dessus → si OK, j'attaque le Jour 1 immédiatement (compression + HSTS + headers).
2. Sinon, tu me dis quelles actions prioriser / déprioriser.
