import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'hauts-de-france',
  regionCode: 'HDF',
  niceName: 'Hauts-de-France',
  departments: 'Aisne (02), Nord (59), Oise (60), Pas-de-Calais (62), Somme (80)',
  intro:
    'Les Hauts-de-France ont l’un des tarifs les plus bas de France métropolitaine avec 42 €/CV en 2026. La région applique aussi des coefficients d’énergie à 0,5 pour les hybrides (HEV, PHEV) et le GPL — un bonus écologique local significatif.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
