# Visuels — specs et briefs

> 3 visuels prioritaires pour démarrer la présence sociale Immatout.
> Specs prêtes à donner à un designer ou à un générateur IA (ChatGPT image / Midjourney / Figma AI).
> Charte : couleurs sobres, typographie Inter, esthétique "outil pro suisse" (Vercel / Linear).

## Charte de marque rapide

| Élément                      | Valeur                                                                    |
| ---------------------------- | ------------------------------------------------------------------------- |
| **Nom**                      | Immatout                                                                  |
| **Tagline**                  | Calculateur officiel du coût de la carte grise — Loi de Finances 2026     |
| **Couleur primaire**         | `#0F172A` (slate-900, presque noir)                                       |
| **Couleur accent**           | `#3B82F6` (blue-500) — pour CTA et highlights                             |
| **Couleur fond**             | `#FFFFFF` blanc pur — ou `#F8FAFC` (slate-50) pour sections               |
| **Couleur texte secondaire** | `#64748B` (slate-500)                                                     |
| **Typo**                     | Inter (Google Fonts), poids 400/600/700                                   |
| **Style**                    | Plat, pas de drop shadow, pas de gradients complexes. Clean & informatif. |
| **Tone**                     | Sérieux, neutre, fiable. Pas de "fun", pas d'émojis dans le logo.         |

---

## Visuel 1 — Logo

### Brief

Logo wordmark simple. Pas d'icône à part — l'idée est que le nom est court et reconnaissable. Si on veut une icône secondaire (favicon, app icon), on la dérive après.

### Specs

- **Format** : SVG (vecteur, scalable infini)
- **Versions à produire** :
  - `logo-primary.svg` : "Immatout" en `#0F172A` sur fond blanc
  - `logo-inverse.svg` : "Immatout" en blanc sur fond `#0F172A`
  - `logo-monochrome.svg` : noir pur (pour impressions / favicons)
- **Typo** : Inter Bold (700), tracking légèrement serré (-0.02em)
- **Hauteur de référence** : 32px (taille header)
- **Padding minimum autour** : 1× la hauteur du "I" majuscule

### Variante "icon"

Pour le favicon (16×16, 32×32, 192×192) et l'icône iOS/Android :

- Lettre "i" stylisée dans un carré arrondi `#0F172A`
- "i" en blanc, point du i remplacé par un petit rectangle accent `#3B82F6` (rappel "barre de progression / calcul")

### Prompt IA (si utilisation Midjourney / DALL-E)

```
A minimalist wordmark logo for "Immatout", a French car registration cost
calculator. Black bold sans-serif (Inter font), white background, no icon,
no decoration, single line. Style: Vercel, Linear, Stripe. 4K vector ready.
```

---

## Visuel 2 — Bannière LinkedIn / Twitter (X)

### Brief

Bannière utilisée pour la page LinkedIn entreprise + le profil X. Doit montrer immédiatement de quoi parle Immatout sans qu'on ait à cliquer.

### Specs

- **Dimensions LinkedIn page entreprise** : 1128 × 191 px (ratio ~5.9:1)
- **Dimensions X (Twitter) header** : 1500 × 500 px (ratio 3:1)
- **À produire en 2 versions** (une par ratio)
- **Format** : PNG ou JPG (pas de SVG pour ces réseaux)

### Composition (LinkedIn)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   Immatout                                                           │
│   ────────                                                           │
│   Calcul officiel carte grise 2026                                   │
│                                                                      │
│   18 régions · 6 taxes · Loi de Finances 2026 · Gratuit, sans pub   │
│                                                                      │
│   immatcalc.fr ──────►                                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Fond : dégradé subtil `#F8FAFC` → `#FFFFFF` (gauche → droite)
- Logo en haut à gauche, texte aligné à gauche
- Petite illustration plate à droite : carte de France stylisée avec 18 points (un par région), points en `#3B82F6`
- URL en bas à gauche en petit (`#64748B`)

### Composition (X — plus haute, ratio 3:1)

Version verticale du même message, avec plus d'espace blanc au-dessus et en-dessous. Le texte central reste identique.

### Prompt IA

```
LinkedIn banner, 1128x191px, professional minimalist design.
Left side: bold black text "Immatout — Calcul officiel carte grise 2026",
subtitle "18 régions · 6 taxes · Loi de Finances 2026".
Right side: stylized minimalist map of France with 18 small blue dots
(one per region). Background: subtle gradient white to light slate.
Inter font, lots of whitespace. Style: Vercel, Linear.
```

---

## Visuel 3 — Card OpenGraph "post LinkedIn / X"

### Brief

Image générique réutilisable comme aperçu OpenGraph quand un post LinkedIn ou X est partagé sans image spécifique. Et qu'on peut aussi attacher en illustration de nos premiers posts pour donner du poids.

### Specs

- **Dimensions** : 1200 × 630 px (standard OpenGraph + LinkedIn + X large card)
- **Format** : JPG (poids < 200 KB)
- **À produire en 2 variantes** :
  - **V1 — Punchline produit** : "Calcule ton coût de carte grise 2026"
  - **V2 — Punchline data** : "18 régions, 6 taxes, 1 calculateur"

### Composition V1

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   Immatout                                       │
│                                                  │
│   Calcule le coût exact                          │
│   de ta carte grise 2026                         │
│                                                  │
│   ✓ Loi de Finances 2026                         │
│   ✓ 18 régions couvertes                         │
│   ✓ Détail des 6 taxes                           │
│                                                  │
│   immatcalc.fr  ──►                              │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Fond `#0F172A` (slate-900)
- Texte principal en blanc, très gros (~ 80px)
- Coches en `#3B82F6`
- URL en bas en gris clair

### Prompt IA

```
1200x630 OpenGraph card. Dark background #0F172A. Large white bold
heading "Calcule le coût exact de ta carte grise 2026". Below, three
checkmarks in blue (#3B82F6) with text: "Loi de Finances 2026",
"18 régions couvertes", "Détail des 6 taxes". URL "immatcalc.fr"
in light grey at bottom. Inter font. Style: Vercel, Linear,
minimalist, lots of whitespace.
```

---

## Livraison

Une fois les visuels produits, les ranger dans `marketing/03-production/social/assets/` :

```
marketing/03-production/social/assets/
├── logo-primary.svg
├── logo-inverse.svg
├── logo-monochrome.svg
├── favicon-32.png
├── favicon-192.png
├── linkedin-banner.png
├── x-header.png
├── og-card-v1.jpg
└── og-card-v2.jpg
```

> Note : on a déjà un favicon dans `apps/web/public/`. Vérifier qu'il est cohérent avec la nouvelle direction logo, sinon le remplacer.
