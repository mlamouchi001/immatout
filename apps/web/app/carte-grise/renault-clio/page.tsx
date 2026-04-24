import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'renault-clio',
  make: 'RENAULT',
  model: 'CLIO',
  niceName: 'Renault Clio',
  intro:
    'Meilleure vente en France depuis 2024, la Renault Clio V existe en essence (TCe 65, 91, 101 ch), hybride E-Tech, GPL et a historiquement connu une version diesel. Le calcul du coût de la carte grise dépend donc fortement de la motorisation choisie et de votre région.',
};

export const metadata = makeModelMetadata(CONTENT);

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
