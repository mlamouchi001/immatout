import type { Metadata } from 'next';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const PATH = '/changelog';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Journal des mises à jour d’Immatout : barèmes carte grise, grilles CO₂, malus poids, correctifs moteur et nouvelles fonctionnalités.';

const ENTRIES: Array<{ date: string; title: string; items: string[] }> = [
  {
    date: '2026-04-24',
    title: 'Vues référentiels publiques',
    items: [
      'Ajout des 5 pages référentiels : régions, malus CO₂, malus poids, décote import, catalogue véhicules.',
      'Ajout des 30 pages éditoriales SEO (guides, régions, modèles, FAQ).',
    ],
  },
  {
    date: '2026-04-23',
    title: 'Catalogue véhicules migration en base',
    items: [
      'Catalogue véhicules (3250+ motorisations) migré du JSON statique vers Postgres/Prisma.',
      'Nouvelle route API /api/catalog/search avec recherche full-text, pagination et filtres.',
      'Formule officielle CV fiscaux (2020+) appliquée aux motorisations EEA.',
    ],
  },
  {
    date: '2026-04-22',
    title: 'Validation 100 cas',
    items: [
      'Jeu de 100 cas de test stratifiés (FR neuf/occasion, import UE/hors UE, EV, cas particuliers).',
      'Taux de concordance 100 % avec un moteur de référence indépendant.',
    ],
  },
  {
    date: '2026-04-21',
    title: 'Recherche par modèle',
    items: [
      'Nouveau mode "Par modèle" dans le calculateur (marque → modèle → motorisation).',
      'Données ADEME Car Labelling + EEA CO₂ Monitoring intégrées (54 marques, 178 modèles).',
      'Mode "Par plaque" masqué par défaut (retour possible via SEARCH_MODE=plate).',
    ],
  },
  {
    date: '2026-04-19',
    title: 'Déploiement initial',
    items: [
      'Mise en ligne publique sur https://immatcalc.fr.',
      'Barèmes Loi de Finances 2026 : seuil Y6 abaissé à 1500 kg, plafond Y3+Y6 à 80 000 €.',
      'Surcharge IDFM 14 €/CV intégrée pour l’Île-de-France.',
      'Décote import 12 tiers conforme au F35950 service-public.gouv.fr.',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Changelog Immatout — Journal des mises à jour',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Changelog Immatout', description: DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'Changelog Immatout',
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'Changelog', path: PATH }]),
        ]}
      />
      <ArticleShell
        breadcrumbs={[{ name: 'Changelog', path: PATH }]}
        title="Journal des mises à jour"
        lede="Toutes les évolutions significatives du moteur, des barèmes et du contenu. Transparence totale sur ce qui est ajouté, modifié, corrigé."
        lastUpdated={UPDATED}
      >
        {ENTRIES.map((e) => (
          <section key={e.date} className="border-l-2 border-accent/40 pl-4">
            <h2 className="text-base font-semibold">
              {e.title}{' '}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                <time dateTime={e.date}>
                  {new Date(e.date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </span>
            </h2>
            <ul>
              {e.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </ArticleShell>
    </>
  );
}
