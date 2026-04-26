import type { Metadata } from 'next';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, faqJsonLd, articleJsonLd } from '@/lib/seo';

const PATH = '/faq';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'FAQ carte grise 2026 : toutes les réponses aux questions fréquentes sur le prix, les taxes, le malus CO₂ et poids, les exonérations, l’import UE et hors UE.';

const FAQ = [
  {
    question: 'Qu’est-ce qu’une carte grise exactement ?',
    answer:
      'La carte grise (officiellement « certificat d’immatriculation ») est le document administratif qui prouve qu’un véhicule est immatriculé en France. Elle contient notamment la puissance fiscale (case P.6), le propriétaire (case C.1), les émissions CO₂ (case V.7) et la masse (case G).',
  },
  {
    question: 'Qui doit payer la carte grise en 2026 ?',
    answer:
      'Le nouveau propriétaire (particulier ou personne morale) paye le coût d’immatriculation. Pour un véhicule neuf acheté en concession, le vendeur peut effectuer la démarche et facturer la taxe globalement.',
  },
  {
    question: 'Quel est le prix minimal d’une carte grise ?',
    answer:
      '13,76 € pour un véhicule 100 % électrique ou à hydrogène (Y4 + Y5 uniquement). Pour une essence, le minimum théorique est autour de 150-200 € pour une 4 CV avec CO₂ sous 108 g/km en région à 43 €/CV (ARA).',
  },
  {
    question: 'Y a-t-il une différence de prix entre Paris et Lyon ?',
    answer:
      'Oui, significative. Paris applique 54,95 €/CV + 14 €/CV de surcharge IDFM depuis mars 2026, soit 68,95 €/CV effectif. Lyon (ARA) applique 43 €/CV. Sur une 7 CV essence, c’est 253 € d’écart rien que sur Y1.',
  },
  {
    question: 'Pourquoi mon voisin paie-t-il moins pour la même voiture ?',
    answer:
      'Plusieurs raisons possibles : il vit dans une autre région (tarif CV différent), son véhicule est électrique ou hybride (coefficient 0 ou 0,5), il a une CMI-invalidité (exonération totale), il est entreprise, il est âgé de plus de 10 ans (décote Y1 50 %), ou il a un abattement famille 200 kg par enfant.',
  },
  {
    question: 'Le malus CO₂ se paie-t-il chaque année ?',
    answer:
      'Non, c’est une taxe « une fois » payée à la première immatriculation d’un véhicule en France. À la revente, l’acheteur français n’a plus à le payer. En revanche, la carte grise elle-même (Y1) se paie à chaque changement de propriétaire.',
  },
  {
    question: 'Puis-je être exonéré si je suis en situation de handicap ?',
    answer:
      'Oui. Le titulaire d’une carte mobilité inclusion (CMI) mention invalidité bénéficie d’une exonération totale de Y1 (taxe régionale), Y3 (malus CO₂) et Y6 (malus au poids). Seuls les 13,76 € de forfait Y4 + Y5 restent dus.',
  },
  {
    question: 'Comment faire sa carte grise après un déménagement ?',
    answer:
      'Vous devez faire un changement d’adresse sur votre carte grise sous 30 jours. La démarche est gratuite pour les 3 premiers changements (seule une étiquette autocollante vous est envoyée). Au 4ᵉ changement d’adresse sur la même carte grise, un nouveau certificat est édité et il faut payer la redevance Y5 (2,76 €).',
  },
  {
    question: 'Combien de temps pour recevoir sa carte grise ?',
    answer:
      'Certificat provisoire d’immatriculation (CPI) par mail sous 24-48 h, valable 1 mois. Carte grise définitive par courrier recommandé en 7 à 10 jours ouvrés, délivrée par l’Imprimerie Nationale.',
  },
  {
    question: 'Que faire si ma carte grise est perdue ou volée ?',
    answer:
      'Déclarer la perte ou le vol en préfecture ou gendarmerie. Faire ensuite une demande de duplicata en ligne sur immatriculation.ants.gouv.fr. Prix : environ 13,76 € (Y4 + Y5). En cas de vol, fournir le récépissé de déclaration.',
  },
  {
    question: 'La carte grise est-elle transférable lors d’une succession ?',
    answer:
      'Oui, les héritiers doivent faire immatriculer le véhicule à leur nom dans les 3 mois suivant le décès. Exonération totale de Y1, Y3, Y6 : seuls Y4 + Y5 (13,76 €) sont dus pour un transfert successoral.',
  },
  {
    question: 'Le véhicule doit-il être assuré pour faire la carte grise ?',
    answer:
      'Non pour obtenir la carte grise en elle-même, mais oui dès que vous prenez la route. L’assurance au tiers est obligatoire depuis 1958 (loi du 27 février 1958).',
  },
  {
    question: 'Les motos sont-elles soumises au malus ?',
    answer:
      'Non, les deux-roues (MOTO) ne sont soumis ni au malus CO₂ (Y3), ni au malus au poids (Y6). Ils paient uniquement Y1 (taxe régionale, calculée sur les CV fiscaux) et les forfaits Y4 + Y5. Exemple : une moto 4 CV à Paris coûte 289,56 € de carte grise.',
  },
  {
    question: 'Peut-on payer la carte grise en plusieurs fois ?',
    answer:
      'Non, le paiement se fait en une seule fois par carte bancaire lors de la demande en ligne sur l’ANTS. Certains concessionnaires proposent de l’inclure dans le crédit du véhicule neuf.',
  },
  {
    question: 'Le véhicule d’occasion importé d’Allemagne est-il toujours rentable ?',
    answer:
      'Dépend de l’âge et du CO₂. Pour une voiture récente (< 5 ans), le malus CO₂ au plein barème de son année d’origine peut être très élevé. Pour une voiture de 7-10 ans, la décote (48-58 %) rend l’import attractif. Pour un véhicule électrique, l’import est toujours rentable car exonéré.',
  },
  {
    question: 'Quel est le plafond global du malus en 2026 ?',
    answer:
      '80 000 € sur le cumul Y3 + Y6 en 2026. Le plafond passera à 90 000 € en 2027 et 100 000 € en 2028. Les autres taxes (Y1, Y4, Y5) s’ajoutent en dehors de ce plafond.',
  },
  {
    question: 'Les voitures de collection paient-elles plein tarif ?',
    answer:
      'Non, plusieurs dispositions s’appliquent : tarif forfaitaire Y1 dans certaines régions (Corse à 30 €), exonération possible de Y3 et Y6 si le véhicule a plus de 15 ans (décote import 100 %), TVA réduite à 5,5 % pour les véhicules classés collection FFVE importés hors UE.',
  },
  {
    question: 'Le covoiturage ou VTC change-t-il la carte grise ?',
    answer:
      'Non pour un usage personnel occasionnel (BlaBlaCar). Pour un VTC ou un taxi, une mention spéciale « VTC » ou « taxi » est portée sur la carte grise après agrément préfectoral. La tarification Y1-Y6 reste identique.',
  },
  {
    question: 'La carte grise d’un véhicule à la casse peut-elle être remboursée ?',
    answer:
      'Non, la taxe est non remboursable une fois payée. En revanche, lors de la mise à la casse (destruction par un centre VHU agréé), le propriétaire reçoit un certificat de destruction qui marque la fin de l’immatriculation sans frais additionnels.',
  },
  {
    question: 'Qu’est-ce que la surcharge IDFM exactement ?',
    answer:
      'La surcharge IDFM (Île-de-France Mobilités) est une taxe additionnelle de 14 €/CV appliquée en Île-de-France depuis le 1ᵉʳ mars 2026 pour financer les transports en commun d’Île-de-France (RATP, Transilien, réseau de bus). Elle passe à 12 €/CV en 2027.',
  },
  {
    question: 'Les véhicules d’entreprise (personne morale) paient-ils plus ?',
    answer:
      'En principe le même prix, mais l’abattement 8+ places passe à 600 kg (contre 500 kg pour un particulier). Pas d’abattement famille possible. Les entreprises peuvent récupérer la TVA sur les véhicules utilitaires (VU, CTTE) mais pas sur les VP.',
  },
  {
    question: 'Peut-on immatriculer une voiture au nom de son enfant mineur ?',
    answer:
      'Non, la carte grise doit être à un majeur. On peut cependant l’immatriculer au nom d’un parent avec mention « conducteur principal autre que le titulaire » dans le dossier d’assurance.',
  },
  {
    question: 'Les cyclomoteurs (50 cm³) ont-ils une carte grise ?',
    answer:
      'Oui depuis le 1ᵉʳ avril 2004 : tous les cyclomoteurs (scooters jusqu’à 50 cm³) doivent être immatriculés. Pour un cyclomoteur neuf, le coût est autour de 14-15 € (Y4 + Y5).',
  },
  {
    question: 'Quelle est la durée de validité d’une carte grise ?',
    answer:
      'Illimitée, tant que le titulaire et les caractéristiques du véhicule ne changent pas. Elle doit être mise à jour lors d’un changement d’adresse, d’un changement de propriétaire ou d’une modification du véhicule (motorisation, conversion GPL…).',
  },
  {
    question: 'Dois-je repasser le contrôle technique avant de faire la carte grise ?',
    answer:
      'Uniquement pour une voiture d’occasion de plus de 4 ans : un contrôle technique favorable de moins de 6 mois est exigé. Pour un véhicule neuf ou de moins de 4 ans, aucun CT n’est nécessaire.',
  },
];

export const metadata: Metadata = {
  title: 'FAQ carte grise 2026 : 25 questions/réponses',
  description:
    'FAQ carte grise 2026 : prix, taxes, malus CO₂ et poids, exonérations, import UE/hors UE. Toutes les réponses aux 25 questions les plus fréquentes.',
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'FAQ carte grise 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'FAQ carte grise 2026',
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'FAQ', path: PATH }]),
          faqJsonLd(FAQ),
        ]}
      />
      <ArticleShell
        breadcrumbs={[{ name: 'FAQ', path: PATH }]}
        title="FAQ carte grise 2026"
        lede="Les 25 questions les plus fréquentes sur le calcul, les taxes, les exonérations et les démarches liées à la carte grise en France pour 2026. Mis à jour après la Loi de Finances 2026."
        lastUpdated={UPDATED}
      >
        {FAQ.map((entry) => (
          <div key={entry.question} className="mb-6">
            <h2>{entry.question}</h2>
            <p>{entry.answer}</p>
          </div>
        ))}
      </ArticleShell>
    </>
  );
}
