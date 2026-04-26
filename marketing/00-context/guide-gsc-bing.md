# Activation Google Search Console + Bing Webmaster Tools

> Action **côté propriétaire DNS** — temps estimé total : 30-45 min.
> Levier #1 du plan. Sans GSC, l'indexation Google traîne 4-8 semaines au lieu de 1-2.

## Étape 1 — Google Search Console (15 min)

### A. Création de la propriété

1. Aller sur https://search.google.com/search-console (login Google).
2. Cliquer **"Ajouter une propriété"**.
3. Choisir le type **"Domaine"** (recommandé : couvre `https://`, `http://`, sous-domaines, www/non-www d'un coup).
4. Saisir : `immatcalc.fr` (sans `https://`, sans `www.`).
5. Cliquer **"Continuer"**.

### B. Validation par DNS

Google va proposer un enregistrement TXT à ajouter chez ton registrar. Quelque chose comme :

```
Nom :   @ (ou immatcalc.fr selon registrar)
Type :  TXT
Valeur: google-site-verification=AbCd1234EfGh5678... (chaîne unique fournie)
TTL :   3600 (ou défaut)
```

**Où l'ajouter** : panneau DNS de ton registrar (ex. OVH > Zone DNS, Gandi > Domaines > Records, Cloudflare > DNS > Records). Le même endroit où tu as déjà ajouté `plausible` en type A.

⚠️ **Ne pas remplacer** un enregistrement TXT existant (ex. `v=spf1 ...` pour les emails). Ajouter un **nouveau** record TXT à côté.

### C. Vérification

1. Attendre 2-5 min (parfois jusqu'à 1 h en propagation DNS).
2. Retour sur GSC, cliquer **"Vérifier"**.
3. Si KO : retenter dans 30 min.

### D. Soumission du sitemap

1. Une fois vérifié, dans la sidebar gauche, cliquer **"Sitemaps"**.
2. Saisir : `sitemap.xml` (Google ajoute automatiquement le préfixe https://immatcalc.fr/).
3. Cliquer **"Envoyer"**.
4. Statut attendu sous quelques minutes : "Réussite · 40 URL découvertes".

### E. Demande d'indexation rapide (optionnel mais recommandé)

Pour les 5 pages les plus importantes :

1. Coller dans la barre du haut une URL comme `https://immatcalc.fr/`.
2. Si "URL non sur Google" → cliquer **"Demander une indexation"**.
3. Répéter pour `/guide/calcul-carte-grise-2026`, `/prix-carte-grise-2026`, `/faq`, `/carte-grise/tesla-model-y`.

Quota : ~10 demandes/jour. Inutile au-delà (Google crawle tout seul ensuite).

## Étape 2 — Bing Webmaster Tools (10 min)

Bing alimente aussi **DuckDuckGo, ChatGPT Search, Yahoo** — non négligeable.

1. Aller sur https://www.bing.com/webmasters (login Microsoft).
2. **Bonus** : si tu as déjà GSC, cliquer **"Importer depuis Google Search Console"** → tout s'auto-configure en 30 secondes.
3. Sinon, parcours similaire à GSC : ajouter `immatcalc.fr`, valider via DNS (TXT séparé) ou meta tag.
4. Soumettre `https://immatcalc.fr/sitemap.xml` dans **"Plans Sitemap"**.

## Étape 3 — Vérifications finales (5 min)

Reviens dire **"GSC fait"** quand c'est fini, je vérifie :

```bash
# La propriété est validée si GSC est listée comme owner du DNS TXT
dig +short TXT immatcalc.fr | grep google
# La sitemap est crawlable
curl -sL https://immatcalc.fr/sitemap.xml | grep -c '<loc>'
# Les pages renvoient 200
for url in / /guide/calcul-carte-grise-2026 /faq; do
  curl -sIo /dev/null -w "$url: %{http_code}\n" "https://immatcalc.fr$url"
done
```

## Ce qui se passera ensuite (timeline)

| Délai           | Événement                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------- |
| **J+0**         | TXT validé, sitemap soumis.                                                               |
| **J+1 à J+3**   | Googlebot vient crawler les premières pages. Statut "URL connue" dans GSC.                |
| **J+7 à J+14**  | Premières pages indexées, premières impressions dans GSC > Performances.                  |
| **J+14 à J+30** | Indexation complète des 40 URLs (parfois plus si pages à faible signal).                  |
| **J+30 à J+90** | Premier classement pour les requêtes ciblées. Nous serons rarement top 10 sans backlinks. |

## Pourquoi pas Google Analytics 4 ?

Tu as déjà **Plausible self-hosté** (https://plausible.immatcalc.fr) qui couvre les besoins analytics sans cookie. GA4 ajouterait un bandeau RGPD, ralentirait le site, et nourrirait Google.

GSC ≠ GA4 :

- **GSC** → mesure ce que Google **affiche** (impressions, clics, position SERP, requêtes)
- **GA4 / Plausible** → mesure ce qui se passe **sur le site** (visiteurs, pages vues, sources)

Les deux sont **complémentaires**. On a déjà Plausible ; il manque GSC.

## Action immédiate côté agent (moi)

Pendant que tu fais GSC + Bing, je continue le Jour 1 : tester les pages dans **Rich Results Test** de Google et corriger si besoin. Je n'ai pas besoin de tes accès pour ça.
