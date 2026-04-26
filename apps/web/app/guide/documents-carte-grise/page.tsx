import type { Metadata } from 'next';
import Link from 'next/link';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/documents-carte-grise';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Documents carte grise 2026 : liste complète des Cerfa (13750, 15776), non-gage, contrôle technique, justificatif de domicile, quitus, pour chaque cas d’immatriculation.';

const FAQ = [
  {
    question: 'Qu’est-ce que le Cerfa 13750 ?',
    answer:
      'Le Cerfa n°13750 est la demande de certificat d’immatriculation d’un véhicule (ancienne carte grise). Il est obligatoire pour toute nouvelle immatriculation, qu’il s’agisse d’un véhicule neuf, importé ou d’occasion. Il se remplit en ligne sur immatriculation.ants.gouv.fr ou en version PDF.',
  },
  {
    question: 'Quelle est la différence entre le Cerfa 13750 et le Cerfa 15776 ?',
    answer:
      'Le Cerfa 13750 est la demande d’immatriculation faite par l’acquéreur. Le Cerfa 15776 est la déclaration de cession remplie conjointement par le vendeur et l’acheteur. Ils sont complémentaires et tous deux requis pour un changement de titulaire.',
  },
  {
    question: 'Le contrôle technique est-il obligatoire ?',
    answer:
      'Oui, pour tout véhicule de plus de 4 ans : un contrôle technique favorable de moins de 6 mois est exigé. Pour un véhicule de moins de 4 ans, aucun contrôle n’est nécessaire. Pour un véhicule importé, un contrôle technique français récent est toujours demandé.',
  },
  {
    question: 'Le certificat de non-gage est-il encore nécessaire ?',
    answer:
      'Oui, le certificat de situation administrative (CSA, anciennement non-gage) est indispensable. Délivré gratuitement sur histovec.interieur.gouv.fr, il doit dater de moins de 15 jours au moment de la demande. Il prouve l’absence d’opposition (gage, procédure judiciaire) sur le véhicule.',
  },
];

export const metadata: Metadata = {
  title: 'Documents carte grise 2026 : Cerfa, non-gage',
  description:
    'Liste complète des documents carte grise 2026 : Cerfa 13750, 15776, non-gage, contrôle technique, justificatif domicile, quitus, par cas d’immatriculation.',
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Documents carte grise 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Documents carte grise : liste complète par cas en 2026"
      lede="La liste des pièces à fournir dépend de votre situation — neuf, occasion, import UE ou hors UE. Voici les documents obligatoires pour chaque cas, avec les liens officiels vers les formulaires Cerfa."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Documents', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Les documents universels</h2>
      <ul>
        <li>
          <strong>Cerfa n°13750</strong> — demande de certificat d’immatriculation. Téléchargeable
          sur{' '}
          <a
            href="https://www.service-public.gouv.fr/particuliers/vosdroits/R13567"
            target="_blank"
            rel="noopener noreferrer"
          >
            service-public.gouv.fr
          </a>{' '}
          ou directement en ligne sur l’ANTS.
        </li>
        <li>
          <strong>Pièce d’identité</strong> (carte nationale d’identité, passeport, titre de séjour)
          en cours de validité.
        </li>
        <li>
          <strong>Justificatif de domicile</strong> de moins de 6 mois : facture
          électricité/gaz/eau, avis d’imposition, quittance de loyer, attestation d’hébergement.
        </li>
      </ul>

      <h2>Véhicule neuf acheté en France</h2>
      <ul>
        <li>Facture d’achat du concessionnaire.</li>
        <li>
          <strong>Certificat de conformité européen (COC)</strong> fourni par le concessionnaire.
        </li>
        <li>Mandat d’immatriculation si le concessionnaire s’occupe de la démarche.</li>
      </ul>

      <h2>Véhicule d’occasion acheté en France</h2>
      <ul>
        <li>
          <strong>Cerfa n°15776</strong> — déclaration de cession signée par vendeur et acheteur.
        </li>
        <li>
          <strong>Ancienne carte grise</strong> barrée avec la mention « Vendu le JJ/MM/AAAA à HH:MM
          » + signature du vendeur.
        </li>
        <li>
          <strong>Certificat de situation administrative</strong> (CSA, ex non-gage) de moins de 15
          jours. Gratuit sur{' '}
          <a href="https://histovec.interieur.gouv.fr/" target="_blank" rel="noopener noreferrer">
            histovec.interieur.gouv.fr
          </a>
          .
        </li>
        <li>
          <strong>Contrôle technique favorable</strong> de moins de 6 mois (uniquement si véhicule
          &gt; 4 ans).
        </li>
      </ul>

      <h2>Import UE (neuf ou occasion)</h2>
      <ul>
        <li>
          <strong>Certificat d’immatriculation étranger</strong> (Zulassungsbescheinigung, V5C,
          libretto, etc.) original.
        </li>
        <li>
          <strong>Quitus fiscal</strong> (Cerfa 1993-VT) délivré par le centre des impôts français.
        </li>
        <li>
          <strong>Certificat de conformité européen (COC)</strong> à demander au constructeur si non
          fourni avec le véhicule.
        </li>
        <li>Facture d’achat.</li>
        <li>
          <strong>Contrôle technique français</strong> de moins de 6 mois (même pour un véhicule qui
          vient de passer un Hauptuntersuchung allemand).
        </li>
      </ul>

      <h2>Import hors UE</h2>
      <ul>
        <li>Tous les documents UE ci-dessus.</li>
        <li>
          <strong>Attestation 846A</strong> délivrée par la douane au dédouanement.
        </li>
        <li>Quittance de paiement des droits de douane et TVA.</li>
        <li>
          <strong>Réception à titre isolé (RTI)</strong> délivrée par la DREAL si le véhicule n’a
          pas de COC.
        </li>
      </ul>

      <h2>Cas particuliers</h2>
      <h3>CMI-invalidité</h3>
      <p>
        Joindre une copie de la carte mobilité inclusion mention invalidité du titulaire ou de la
        personne à charge pour obtenir l’exonération Y1/Y3/Y6.
      </p>
      <h3>3 enfants à charge ou plus</h3>
      <p>
        Livret de famille + attestation CAF ou équivalent pour bénéficier de l’abattement de 200 kg
        par enfant sur le malus au poids.
      </p>
      <h3>Personne morale</h3>
      <p>Kbis de moins de 3 mois, pouvoir du représentant légal, pièce d’identité du signataire.</p>
      <h3>Véhicule de collection</h3>
      <p>
        Attestation FFVE (Fédération française des véhicules d’époque) + justificatif de plus de 30
        ans.
      </p>

      <h2>Résumé par cas</h2>
      <p>
        Une vue tableau complète est disponible sur la page{' '}
        <Link href="/documents">Documents par cas d’immatriculation</Link>.
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/carte-grise-occasion-france',
            label: 'Occasion France',
            desc: 'Démarches en 6 étapes',
          },
          {
            href: '/guide/carte-grise-import-ue',
            label: 'Import UE',
            desc: 'Quitus fiscal et COC',
          },
          {
            href: '/guide/carte-grise-import-hors-ue',
            label: 'Import hors UE',
            desc: 'Douane et RTI',
          },
          {
            href: '/documents',
            label: 'Liste officielle par cas',
            desc: 'Tableau synthétique',
          },
        ]}
      />
    </GuidePage>
  );
}
