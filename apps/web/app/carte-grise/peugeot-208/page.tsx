import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'peugeot-208',
  make: 'PEUGEOT',
  model: '208',
  niceName: 'Peugeot 208',
  intro:
    'La Peugeot 208 est l’une des citadines les plus vendues de l’histoire française. Deuxième génération existe en essence, diesel, hybride léger et 100 % électrique (e-208). La carte grise de l’e-208 coûte 13,76 € ; les versions thermiques 4-5 CV démarrent autour de 250 € hors IDFM.',
};

export const metadata = makeModelMetadata(CONTENT);

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
