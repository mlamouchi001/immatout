# Posts sociaux — semaine 1

> 3 premiers posts à publier dans les 48 h après création des comptes.
> Objectif : annoncer le lancement, capter les premiers visiteurs, valider le tone of voice.

---

## Post 1 — LinkedIn (intro / lancement)

### Plateforme : page LinkedIn Immatout

### Date suggérée : J+1 (après création de la page)

### Format : texte + image OG card V1

### Texte (FR, 1100 caractères env.)

```
Aujourd'hui je lance Immatout — un petit outil que j'ai construit
parce que calculer le coût d'une carte grise en France est, encore en 2026,
inutilement compliqué.

→ 18 régions, chacune avec son propre tarif au cheval fiscal
→ 6 taxes différentes (Y1 à Y6) à empiler
→ Un malus CO₂ qui plafonne à 70 000 € en 2026
→ Un malus au poids qui démarre à 1500 kg
→ Des coefficients différents pour électrique, hybride, hydrogène, E85...

Les concédés en ligne (carte-grise.com et autres) facturent 30 à 50 €
juste pour faire ce calcul. Service-public.gouv.fr ne le fait pas du tout.

J'ai donc construit Immatout :
✓ Calcul exact basé sur la Loi de Finances 2026
✓ Détail transparent des 6 taxes
✓ Comparateur des 18 régions
✓ 100 % gratuit, pas de pub, pas d'inscription

Le code est public, les barèmes sont sourcés sur Légifrance et l'ADEME.
J'ai testé 100 cas stratifiés contre le simulateur officiel — les écarts
sont < 0,5 % (essentiellement des arrondis).

C'est en ligne ici : https://immatcalc.fr

Si vous testez et que vous trouvez un cas qui ne marche pas, je prends
les retours. Ça aide à fiabiliser l'outil.

#cartegrise #LoideFinances2026 #automobile #opensource #France
```

### Notes

- Premier post LinkedIn = **intro personnelle**. C'est le créateur qui parle.
- Pas trop "marketing", on raconte le pourquoi.
- Hashtags modérés (5 max) pour rester pro.
- Image attachée : `og-card-v1.jpg`

---

## Post 2 — X (Twitter) thread

### Plateforme : @immatout (à créer)

### Date suggérée : J+2

### Format : thread de 6 tweets

### Tweet 1 (accroche)

```
Coût d'une carte grise en France en 2026 : 6 taxes + 18 tarifs régionaux
+ malus CO₂ + malus poids.

Personne (à part les concédés payants) ne le calcule correctement
en ligne.

J'ai construit un outil gratuit qui le fait. 🧵
```

### Tweet 2

```
Le truc fou : service-public.gouv.fr renvoie vers ANTS pour la démarche
mais ne calcule pas le prix.

Cartegrise.com / cartegriseminute.fr le calculent... mais facturent 30 à 50 €
de "frais de dossier" pour te montrer un chiffre que tu peux obtenir
gratuitement avec la formule officielle.
```

### Tweet 3

```
La formule, en simplifié :

Total = Y1 (taxe régionale) + Y2 (formation pro) + Y3 (CO₂)
      + Y4 (gestion 11€) + Y5 (acheminement 2,76€) + Y6 (poids)

Y1 = puissance fiscale × tarif région × coefficient énergie

Y3 (malus CO₂) : grille à 16 paliers, plafonné à 70 000 € en 2026.
```

### Tweet 4

```
Tarif au CV par région en 2026 (extrait) :

🔝 Île-de-France : 60 € + 4,50 € (surcharge IDFM) = 64,50 €
🟦 PACA, Occitanie, Bretagne... : 60 €
🟢 Corse : 27 € (le moins cher)

Différence entre IDF et Corse pour une 8 CV diesel : ~310 €.
```

### Tweet 5

```
Ce qu'on a fait avec Immatout :

✓ Calcul exact des 6 taxes
✓ Comparateur 18 régions instantané
✓ Détail des coefs énergie (essence, diesel, EV, hybride, E85, GPL...)
✓ Export PDF
✓ 100 % gratuit, pas de pub, pas d'email

Code et barèmes auditables.
```

### Tweet 6 (CTA)

```
👉 https://immatcalc.fr

Si tu testes et que tu trouves un calcul qui ne colle pas avec ton
exemplaire de carte grise réel, je prends les retours.

L'objectif est de fiabiliser l'outil, pas de te vendre un truc.
```

### Notes

- Thread = format X qui fonctionne le mieux pour expliquer un produit.
- Tweet 1 = accroche claire. Numéros + chiffres = engagement.
- Pas de hashtag spam — un ou deux max si besoin.

---

## Post 3 — Reddit r/france (réponse / soft promo)

### Plateforme : Reddit, subreddit r/france ou r/AskFrance

### Date suggérée : J+3 ou J+5 (attendre une question pertinente)

### Format : commentaire en réponse à un post existant

### Stratégie

**Ne pas créer de post promotionnel direct.** Reddit déteste ça.

À la place : monitorer r/france, r/AskFrance, r/voitures, r/conseiljuridique
pour trouver une question du type :

- "Combien va me coûter ma carte grise ?"
- "Quelqu'un a un bon calculateur de carte grise ?"
- "Pourquoi cartegrise.com fait payer ?"
- "Différence de prix entre régions ?"

Y répondre **utilement** d'abord, puis mentionner Immatout en fin
de réponse.

### Template de réponse

```
Pour ton cas (XX CV, motorisation YY, région ZZ), tu peux faire le calcul
toi-même :

Total = (XX × tarif_région × coef_énergie) + 13,76 € (frais fixes Y4+Y5)
      + éventuel malus CO₂ + éventuel malus poids.

Le tarif région 2026 est ici sur Légifrance : [lien]

Pour ton exemple :
- XX × tarif × coef = ~ZZZ €
- Frais fixes : 13,76 €
- Malus CO₂ (si > 108 g/km) : voir grille
- Malus poids (si > 1500 kg) : voir grille

Total approximatif : ~AAA €.

Si tu veux pas faire ça à la main, j'ai mis en ligne un outil gratuit
qui fait le calcul exact pour les 18 régions et inclut les malus 2026 :
immatcalc.fr — c'est open source, pas de pub, pas d'email demandé.
Mais service-public.gouv.fr ne fait pas le calcul, donc soit tu le fais
à la main, soit tu utilises un outil.

PS : évite cartegrise.com et cartegriseminute.fr qui facturent 30-50 €
juste pour te montrer le résultat. C'est légal mais pas indispensable.
```

### Notes

- **Effort réel** : montrer qu'on a lu la question, donner une vraie réponse.
- Mentionner Immatout en _complément_, pas en _appel à l'action_.
- Si le post n'est pas ouvert à la promo (règles du sub), s'abstenir.
- Vérifier le compte a > 7 jours et > 50 karma avant de poster (sinon shadow-ban automatique).

---

## Calendrier de publication semaine 1

| Jour  | Post                                                      | Plateforme | Heure                    |
| ----- | --------------------------------------------------------- | ---------- | ------------------------ |
| J+1   | Post 1 (intro)                                            | LinkedIn   | 8h-10h (heure de bureau) |
| J+2   | Post 2 (thread)                                           | X          | 12h-14h (lunch break)    |
| J+3-5 | Post 3 (Reddit)                                           | r/france   | quand opportunité        |
| J+6   | Republier le thread X en français LinkedIn (texte adapté) | LinkedIn   | 8h                       |
| J+7   | Bilan : voir analytics, ajuster                           |

---

## Mesure

- **LinkedIn** : impressions, réactions, partages, clics vers `immatcalc.fr` (UTM)
- **X** : impressions du thread (au moins le 1er tweet), retweets, clics
- **Reddit** : upvotes, réponses, clics (via UTM si possible)

UTM à utiliser pour tracer dans Plausible :

- `?utm_source=linkedin&utm_medium=social&utm_campaign=lancement`
- `?utm_source=x&utm_medium=social&utm_campaign=lancement`
- `?utm_source=reddit&utm_medium=social&utm_campaign=lancement`
