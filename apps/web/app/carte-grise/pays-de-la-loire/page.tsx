import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'pays-de-la-loire',
  regionCode: 'PDL',
  niceName: 'Pays de la Loire',
  departments: 'Loire-Atlantique (44), Maine-et-Loire (49), Mayenne (53), Sarthe (72), Vendée (85)',
  intro:
    'Les Pays de la Loire, portés par Nantes et Angers, appliquent le plafond de 60 €/CV en 2026. Pas de surcharge additionnelle, pas de coefficient 0,5 pour les hybrides — les tarifs sont strictement linéaires en fonction des CV fiscaux.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
