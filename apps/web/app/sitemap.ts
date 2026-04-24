import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
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
    { url: `${base}/documents`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    {
      url: `${base}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
