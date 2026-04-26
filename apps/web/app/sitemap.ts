import type { MetadataRoute } from 'next';

const GUIDES = [
  'calcul-carte-grise-2026',
  'malus-co2-2026',
  'malus-poids-2026',
  'taxe-regionale-cheval-fiscal',
  'carte-grise-vehicule-electrique',
  'carte-grise-import-ue',
  'carte-grise-import-hors-ue',
  'carte-grise-occasion-france',
  'documents-carte-grise',
  'cheval-fiscal-explication',
];

const CARTES_GRISES = [
  // Régions
  'ile-de-france',
  'auvergne-rhone-alpes',
  'provence-alpes-cote-d-azur',
  'nouvelle-aquitaine',
  'occitanie',
  'hauts-de-france',
  'bretagne',
  'pays-de-la-loire',
  'grand-est',
  // Modèles
  'tesla-model-y',
  'renault-clio',
  'peugeot-208',
  'dacia-sandero',
  'citroen-c3',
  'renault-captur',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    // Index pages (nouvelles, priorité 0.9 — pages hub)
    { url: `${base}/guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/carte-grise`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Guides (priorité 0,8 — contenu pilier SEO)
    ...GUIDES.map((slug) => ({
      url: `${base}/guide/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Pages carte-grise par région / modèle (priorité 0,7)
    ...CARTES_GRISES.map((slug) => ({
      url: `${base}/carte-grise/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Outils et pages transversales
    { url: `${base}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${base}/prix-carte-grise-2026`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/lexique`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Référentiels
    { url: `${base}/referentiels`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${base}/referentiels/regions`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${base}/referentiels/malus-co2`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${base}/referentiels/malus-poids`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${base}/referentiels/decote`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${base}/referentiels/catalogue`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Secondaires
    { url: `${base}/documents`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    {
      url: `${base}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
