import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'provence-alpes-cote-d-azur',
  regionCode: 'PAC',
  niceName: 'Provence-Alpes-Côte d’Azur',
  shortName: 'PACA',
  departments:
    'Alpes-de-Haute-Provence (04), Hautes-Alpes (05), Alpes-Maritimes (06), Bouches-du-Rhône (13), Var (83), Vaucluse (84)',
  intro:
    'La région PACA applique le plafond légal de 60 €/CV en 2026, comme la majorité des régions françaises. Les grandes villes comme Marseille, Nice, Toulon et Aix-en-Provence sont toutes soumises au même tarif.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
