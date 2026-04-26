import type { Metadata } from 'next';
import Link from 'next/link';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { RelatedGuides } from '@/components/seo/related-guides';
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, ORG_DESCRIPTION } from '@/lib/seo';

const PATH = '/a-propos';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';

export const metadata: Metadata = {
  title: 'À propos — Immatout, simulateur carte grise',
  description:
    'Immatout : simulateur indépendant et gratuit du coût de la carte grise en France, open-source, conforme à la Loi de Finances 2026, sans publicité.',
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'À propos d’Immatout', description: ORG_DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'À propos — Immatout',
            description: ORG_DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'À propos', path: PATH }]),
          organizationJsonLd(),
        ]}
      />
      <ArticleShell
        breadcrumbs={[{ name: 'À propos', path: PATH }]}
        title="À propos d’Immatout"
        lede="Immatout est un simulateur indépendant du coût de la carte grise en France, lancé en avril 2026 et conforme à la Loi de Finances 2026."
        lastUpdated={UPDATED}
      >
        <h2>Notre mission</h2>
        <p>
          Le coût d’une carte grise en France est calculable précisément à partir de barèmes
          officiels publics : le Code des impositions sur les biens et services (CIBS), les arrêtés
          des conseils régionaux, la grille malus CO₂ de la Loi de Finances, et les tarifs ADEME Car
          Labelling. Pourtant, de nombreux simulateurs en ligne sont soit payants, soit opaques,
          soit obsolètes. Immatout vise à être l’alternative simple : gratuit, sans inscription,
          sans publicité, avec la traçabilité complète des barèmes utilisés.
        </p>

        <h2>Qui nous sommes</h2>
        <p>
          Immatout est édité par une petite équipe technique indépendante. Le site est open-source
          et le moteur de calcul est auditable ligne par ligne sur le{' '}
          <a
            href="https://github.com/mlamouchi001/immatout"
            target="_blank"
            rel="noopener noreferrer"
          >
            dépôt public GitHub
          </a>
          . Nous ne commercialisons pas nos données et ne proposons pas d’intermédiation pour la
          réalisation de la carte grise — la démarche officielle passe exclusivement par{' '}
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>
          .
        </p>

        <h2>Comment nous finançons le service</h2>
        <p>
          Immatout est auto-financé par l’équipe qui l’opère. Aucune publicité n’est affichée,
          aucune donnée personnelle n’est revendue. Le site utilise Plausible Analytics, un outil
          d’analyse sans cookies et conforme RGPD.
        </p>

        <h2>Qualité des données</h2>
        <p>
          Nos barèmes sont mis à jour à chaque modification législative majeure et vérifiés contre
          les publications officielles :
        </p>
        <ul>
          <li>
            <a
              href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044595989/LEGISCTA000044599003/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Légifrance — CIBS L.421-29 à L.421-92
            </a>
            , base légale des 6 taxes.
          </li>
          <li>
            <a
              href="https://www.service-public.gouv.fr/particuliers/vosdroits/F36199"
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.gouv.fr
            </a>
            , pour les explications officielles.
          </li>
          <li>
            <a
              href="https://data.ademe.fr/datasets/ademe-car-labelling"
              target="_blank"
              rel="noopener noreferrer"
            >
              ADEME Car Labelling
            </a>
            , pour les émissions CO₂ WLTP et les puissances fiscales.
          </li>
          <li>
            <a
              href="https://www.eea.europa.eu/en/datahub/datahubitem-view/fa8b1229-3db6-495d-b18e-9c9b3267c02b"
              target="_blank"
              rel="noopener noreferrer"
            >
              EEA CO₂ Monitoring
            </a>
            , pour l’enrichissement du catalogue véhicules.
          </li>
        </ul>
        <p>
          Un <Link href="/changelog">journal des modifications</Link> détaille publiquement chaque
          mise à jour de barème.
        </p>

        <h2>Validation des calculs</h2>
        <p>
          Un jeu de <strong>100 cas de test</strong> stratifiés couvrant toutes les combinaisons
          origine × énergie × région × situation familiale est rejoué à chaque mise à jour du
          moteur. Tous les résultats sont comparés à une implémentation de référence indépendante.
          Taux de concordance actuel : <strong>100 %</strong>.
        </p>

        <h2>Limites connues</h2>
        <p>
          Immatout fournit une estimation indicative. Le montant exact de votre carte grise sera
          confirmé uniquement par l’ANTS lors de votre demande officielle. Les cas particuliers
          (requalifications N1→M1, véhicules de collection, véhicules spéciaux handicap importés…)
          peuvent nécessiter une instruction spécifique.
        </p>

        <h2>Contact</h2>
        <p>
          Suggestions, signalement d’erreurs, propositions de contribution : ouvrir une issue sur
          GitHub ou écrire à <a href="mailto:contact@immatcalc.fr">contact@immatcalc.fr</a>. Nous
          répondons sous 48 h ouvrées.
        </p>

        <RelatedGuides
          links={[
            {
              href: '/mentions-legales',
              label: 'Mentions légales',
              desc: 'Licences, RGPD, limitations',
            },
            {
              href: '/changelog',
              label: 'Changelog',
              desc: 'Historique des mises à jour',
            },
            {
              href: '/',
              label: 'Calculateur',
              desc: 'Essayer le simulateur',
            },
            {
              href: '/faq',
              label: 'FAQ',
              desc: '25 questions fréquentes',
            },
          ]}
        />
      </ArticleShell>
    </>
  );
}
