import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'ile-de-france',
  regionCode: 'IDF',
  niceName: 'Île-de-France',
  departments:
    'Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d’Oise (95)',
  intro:
    'L’Île-de-France applique un tarif de 54,95 €/CV auquel s’ajoute depuis le 1ᵉʳ mars 2026 la surcharge IDFM de 14 €/CV pour financer les transports franciliens. C’est la seule région en France à appliquer une surcharge additionnelle, ce qui la place parmi les plus chères du territoire pour la carte grise.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
