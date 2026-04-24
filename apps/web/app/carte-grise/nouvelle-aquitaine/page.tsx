import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'nouvelle-aquitaine',
  regionCode: 'NAQ',
  niceName: 'Nouvelle-Aquitaine',
  departments:
    'Charente (16), Charente-Maritime (17), Corrèze (19), Creuse (23), Dordogne (24), Gironde (33), Landes (40), Lot-et-Garonne (47), Pyrénées-Atlantiques (64), Deux-Sèvres (79), Vienne (86), Haute-Vienne (87)',
  intro:
    'La Nouvelle-Aquitaine (la plus grande région métropolitaine par la superficie) applique le plafond légal de 60 €/CV en 2026. Bordeaux, Limoges et Pau obéissent donc au même tarif que Paris sur Y1, mais sans la surcharge IDFM — la carte grise y coûte en moyenne 50 € de moins qu’en Île-de-France pour une 5 CV.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
