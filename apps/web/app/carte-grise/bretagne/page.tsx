import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'bretagne',
  regionCode: 'BRE',
  niceName: 'Bretagne',
  departments: 'Côtes-d’Armor (22), Finistère (29), Ille-et-Vilaine (35), Morbihan (56)',
  intro:
    'La Bretagne applique le plafond 60 €/CV, mais se distingue par une politique particulièrement favorable aux énergies alternatives : coefficient 0,5 pour les hybrides HEV/PHEV, le GPL et l’E85. Une Renault Clio hybride 5 CV ne paie que 150 € de taxe régionale contre 300 € pour sa version essence.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
