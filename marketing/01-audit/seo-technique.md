# Audit SEO technique — immatcalc.fr

> Date : 2026-04-26 · Méthodo : `curl`, inspection manuelle, pas de Lighthouse (à ajouter si Node dispo).

## 1. Indexation

| Élément                       | État                                                    | Verdict       |
| ----------------------------- | ------------------------------------------------------- | ------------- |
| `robots.txt`                  | présent, autorise tous bots search, bloque LLM crawlers | ✅ OK         |
| `sitemap.xml`                 | 40 URLs, priorités 0.3 à 1, lastmod dynamiques          | ✅ OK         |
| Référence sitemap dans robots | `Sitemap: https://immatcalc.fr/sitemap.xml`             | ✅ OK         |
| `Host:` directive dans robots | présente (déprécié mais inoffensif)                     | 🟡 cosmétique |
| Pages 404 propres             | non testées                                             | À vérifier    |

## 2. Performance & Core Web Vitals

Mesures `curl` depuis Paris (réseau résidentiel) :

| Page                             | TTFB   | Total  | Taille HTML brute |
| -------------------------------- | ------ | ------ | ----------------- |
| `/` (home)                       | 0.12 s | 0.18 s | 49 KB             |
| `/guide/calcul-carte-grise-2026` | 0.13 s | 0.19 s | 60 KB             |

TTFB excellent (Coolify + Next.js prerender HIT). Mais HTML brut ~50 KB **non compressé** alors que gzip diviserait par 5-7.

### ✅ Compression OK (correction audit 2026-04-26)

Vérifié par GET réel : `content-encoding: gzip` est bien servi par Traefik/Coolify.

```
HTML home : 49 291 B brut → 9 757 B compressé (80,2 % réduction)
```

⚠️ **Piège du test initial** : `curl -I` (HEAD) **ne montre pas** l'`Content-Encoding`. Il faut un GET (`curl -sv` ou `curl --compressed`) pour le voir.

À noter : labels `caddy_0.encode=zstd gzip` apparaissent aussi (Coolify supporte Caddy en plus de Traefik) → double-couche sans conflit.

**Pas d'action requise.** Issue précédemment classée P0 → archivée.

## 3. Sécurité (headers)

| Header                      | Valeur     | Verdict |
| --------------------------- | ---------- | ------- |
| `Strict-Transport-Security` | **absent** | 🚨 P1   |
| `Content-Security-Policy`   | **absent** | 🟡 P2   |
| `X-Frame-Options`           | **absent** | 🟡 P2   |
| `X-Content-Type-Options`    | **absent** | 🟡 P2   |
| `Referrer-Policy`           | **absent** | 🟡 P2   |
| HTTPS + Let's Encrypt       | ✅ valide  | ✅      |
| `alt-svc: h3` (HTTP/3)      | ✅         | ✅      |

### Issue P1 — pas de HSTS

Sans `Strict-Transport-Security`, le premier hit HTTP peut être détourné. Google Search Console signale parfois "Sécurité réduite".

**Fix** : ajouter dans `next.config.mjs > async headers()` ou via Traefik :

```js
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
}
```

**Effort** : 15 min. **Impact** : moyen (signal positif Google + bonne pratique).

## 4. Données structurées (JSON-LD)

Vérifié sur 3 pages :

| Page                             | Nb scripts JSON-LD | Types attendus                          | Verdict |
| -------------------------------- | ------------------ | --------------------------------------- | ------- |
| `/` (home)                       | 3                  | Organization + WebApplication + FAQPage | ✅      |
| `/guide/calcul-carte-grise-2026` | 3                  | Article + BreadcrumbList + FAQPage      | ✅      |
| `/carte-grise/ile-de-france`     | 3                  | Article + BreadcrumbList + FAQPage      | ✅      |

**À tester** : passer les pages dans https://search.google.com/test/rich-results → on s'attend à des **résultats enrichis FAQ** sur les pages guides (question/réponse Google direct dans la SERP).

## 5. Open Graph & Twitter Cards

✅ Toutes en place (titre, desc, og:image dynamique via `/opengraph-image`, locale fr_FR, summary_large_image).

## 6. Maillage interne

Estimation depuis la structure :

- Home → 5 sections (calcul, comparateur, références, documents, mentions)
- Chaque guide → bloc "RelatedGuides" (4-6 liens vers guides/référentiels) + "PageHeader" → home + breadcrumb
- Pages régions/modèles → liens vers le calculateur + référentiels
- **Profondeur max** : 2-3 clics depuis la home (excellent)

### 🟡 Issue P2 — pas de page index `/guide/`

`/guide/calcul-carte-grise-2026` existe mais pas `/guide/` qui listerait les 10 guides. Idem pour `/carte-grise/`. Ça oblige Google à découvrir les pages via le sitemap uniquement, alors qu'une page index avec liens internes booste le crawl.

**Fix** : créer `/guide/page.tsx` et `/carte-grise/page.tsx` qui listent leurs sous-pages avec un teaser.

**Effort** : 2 h. **Impact** : moyen (meilleure découverte + page potentielle à classer sur "guide carte grise" / "carte grise par modèle").

## 7. Mobile-first

Pas testé sur viewport mobile dans cet audit. Pages responsive (Tailwind), mais à confirmer via :

```bash
curl -sH "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)..." https://immatcalc.fr/ | wc -c
```

Toutes les pages utilisent le viewport meta + breakpoints Tailwind sm/md/lg → présomption favorable.

## 8. Accessibilité (signaux SEO)

Non-testé en détail. Quelques éléments observables dans le code :

- Lang fr ✅
- alt text images : à auditer (probablement absent ou vide sur les icônes Lucide — pas critique)
- ARIA landmarks : présents (`<header>`, `<main>`, `<footer>`, `<nav>`)

## Résumé priorisé

| #   | Issue                                          | Impact                   | Effort   | Priorité |
| --- | ---------------------------------------------- | ------------------------ | -------- | -------- |
| 1   | Pas de compression gzip/brotli                 | 🔥 LCP / mobile / data   | 1 h      | **P0**   |
| 2   | Pas de HSTS                                    | Signal sécurité Google   | 15 min   | **P1**   |
| 3   | Pas de page index `/guide/` ni `/carte-grise/` | Crawl + nouvelle landing | 2 h      | **P1**   |
| 4   | Pas de CSP / X-Frame / X-Content-Type          | Bonne pratique           | 30 min   | **P2**   |
| 5   | Pas de Lighthouse run automatisé               | Mesure CWV               | 1 h (CI) | **P2**   |
| 6   | Pas de test rich-results Google sur pages FAQ  | Validation               | 30 min   | **P2**   |
| 7   | `Host:` directive deprecated dans robots.txt   | Cosmétique               | 5 min    | **P3**   |

**Temps total P0+P1** : ~3 h 30. À planifier en priorité avant la croissance trafic.
