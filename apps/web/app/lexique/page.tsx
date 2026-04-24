import type { Metadata } from 'next';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';

const PATH = '/lexique';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Lexique carte grise 2026 : CIBS, CV fiscaux, WLTP, TMOM, IDFM, Cerfa, quitus fiscal, TVV… Toutes les définitions officielles en clair.';

const TERMS: Array<{ term: string; definition: string }> = [
  {
    term: 'ANTS',
    definition:
      'Agence nationale des titres sécurisés. Opère le portail immatriculation.ants.gouv.fr, seul canal officiel pour demander une carte grise en France depuis 2017.',
  },
  {
    term: 'B (case B sur la carte grise)',
    definition:
      'Date de première mise en circulation du véhicule, utilisée pour la décote 10 ans (Y1) et la décote d’import (Y3, Y6).',
  },
  {
    term: 'C.1 / C.4 / C.4a (cases sur la carte grise)',
    definition:
      'C.1 : nom et adresse du titulaire principal. C.4 : le titulaire est bien le propriétaire (case cochée). C.4a : nom des co-titulaires.',
  },
  {
    term: 'Cerfa 13750',
    definition:
      'Formulaire officiel de demande de certificat d’immatriculation (ancienne « carte grise »). Requis pour toute nouvelle immatriculation en France.',
  },
  {
    term: 'Cerfa 15776',
    definition:
      'Formulaire officiel de déclaration de cession d’un véhicule d’occasion. Rempli conjointement par le vendeur et l’acheteur.',
  },
  {
    term: 'CIBS',
    definition:
      'Code des impositions sur les biens et services. Créé en 2022, il regroupe les anciennes taxes carte grise (articles L.421-29 à L.421-92).',
  },
  {
    term: 'CMI-invalidité',
    definition:
      'Carte mobilité inclusion mention « invalidité ». Donne droit à l’exonération totale de Y1, Y3 et Y6 sur la carte grise.',
  },
  {
    term: 'COC',
    definition:
      'Certificat de conformité européen (Certificate of Conformity). Document délivré par le constructeur qui prouve que le véhicule respecte les normes européennes d’homologation.',
  },
  {
    term: 'CPI',
    definition:
      'Certificat provisoire d’immatriculation. Document électronique envoyé par mail après paiement, valable 1 mois et autorisant la circulation avant réception de la carte grise définitive.',
  },
  {
    term: 'CSA',
    definition:
      'Certificat de situation administrative (ex « non-gage »). Atteste l’absence d’opposition à la vente (gage, procédure judiciaire). À demander sur histovec.interieur.gouv.fr.',
  },
  {
    term: 'CV fiscaux',
    definition:
      'Puissance administrative en « chevaux fiscaux », affichée à la case P.6. Utilisée pour calculer la taxe régionale Y1. Formule 2020+ : CV = CO₂/45 + 1,6×(kW/40)^1,6.',
  },
  {
    term: 'DREAL',
    definition:
      'Direction régionale de l’environnement, de l’aménagement et du logement. Délivre la Réception à Titre Isolé (RTI) pour les véhicules importés sans COC.',
  },
  {
    term: 'FFVE',
    definition:
      'Fédération française des véhicules d’époque. Délivre les attestations pour classer un véhicule de plus de 30 ans en « véhicule de collection ».',
  },
  {
    term: 'G (case G)',
    definition:
      'Masse en charge maximale admissible (MMA) du véhicule. À ne pas confondre avec G.1 qui est la masse en ordre de marche (MOM) utilisée pour calculer Y6.',
  },
  {
    term: 'IDFM',
    definition:
      'Île-de-France Mobilités. Régisseur des transports en commun d’Île-de-France. Bénéficiaire de la surcharge 14 €/CV appliquée aux cartes grises franciliennes depuis mars 2026.',
  },
  {
    term: 'MOM / MORM',
    definition:
      'Masse en ordre de marche / masse ordinaire de roulage minimale. C’est la masse à vide du véhicule avec conducteur standard 75 kg, réservoir 90 % plein. Sert de base au malus poids Y6.',
  },
  {
    term: 'P.6',
    definition:
      'Case de la carte grise où figure la puissance fiscale (CV). C’est la valeur clé pour le calcul de Y1.',
  },
  {
    term: 'PTAC',
    definition:
      'Poids total autorisé en charge. Pour les utilitaires (VU, CTTE, CAM), il détermine le montant de Y2 (formation professionnelle).',
  },
  {
    term: 'Quitus fiscal',
    definition:
      'Certificat fiscal (Cerfa 1993-VT) délivré par le centre des impôts français prouvant que la TVA est en règle pour un véhicule importé d’un autre pays UE.',
  },
  {
    term: 'RTI',
    definition:
      'Réception à Titre Isolé. Homologation française individuelle pour un véhicule importé sans COC (typique des imports US, japonais, britanniques post-Brexit).',
  },
  {
    term: 'TMOM',
    definition:
      'Taxe sur la masse en ordre de marche. Nom officiel du malus au poids (Y6), instauré en 2022 et durci par la Loi de Finances 2026 (seuil 1500 kg).',
  },
  {
    term: 'TVV',
    definition:
      'Type Variante Version. Code unique identifiant une motorisation précise dans les bases constructeurs et ADEME (case D.2 de la carte grise).',
  },
  {
    term: 'VHU',
    definition:
      'Véhicule hors d’usage. Statut juridique d’un véhicule destiné à la casse. Le propriétaire reçoit un certificat de destruction qui clôture la carte grise.',
  },
  {
    term: 'V.7 (case V.7)',
    definition: 'Émissions CO₂ WLTP en g/km. C’est la valeur utilisée pour calculer le malus Y3.',
  },
  {
    term: 'WLTP',
    definition:
      'Worldwide Harmonized Light Vehicles Test Procedure. Nouveau cycle d’homologation européen pour mesurer la consommation et les émissions CO₂, entré en vigueur en 2017 et généralisé en 2020.',
  },
  {
    term: 'Y1, Y2, Y3, Y4, Y5, Y6',
    definition:
      'Les 6 taxes qui composent une carte grise en France, codifiées dans le CIBS. Y1 régionale, Y2 formation pro, Y3 malus CO₂, Y4 gestion, Y5 acheminement, Y6 malus poids.',
  },
];

export const metadata: Metadata = {
  title: 'Lexique carte grise 2026 : CIBS, CV fiscal, WLTP, TMOM, IDFM',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Lexique carte grise 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'Lexique carte grise 2026',
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'Lexique', path: PATH }]),
        ]}
      />
      <ArticleShell
        breadcrumbs={[{ name: 'Lexique', path: PATH }]}
        title="Lexique carte grise"
        lede="Tous les termes techniques, administratifs et législatifs de la carte grise française, expliqués simplement et référencés aux articles officiels."
        lastUpdated={UPDATED}
      >
        <dl className="space-y-5">
          {TERMS.map((t) => (
            <div key={t.term}>
              <dt className="font-semibold">{t.term}</dt>
              <dd className="text-sm text-muted-foreground">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </ArticleShell>
    </>
  );
}
