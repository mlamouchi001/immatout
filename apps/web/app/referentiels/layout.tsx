import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ReferentialsNav } from '@/components/referentials/nav';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: {
    default: 'Référentiels',
    template: '%s · Référentiels · Immatout',
  },
  description:
    'Barèmes officiels utilisés par le calcul Immatout : tarifs régionaux du cheval fiscal, malus CO₂, malus au poids, décote import, catalogue véhicules ADEME + EEA.',
};

export default function ReferentialsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow="Barèmes officiels 2026"
        title="Référentiels"
        description="Toutes les données qui alimentent le calcul — tarifs, seuils, grilles — traçables à leurs sources Légifrance / service-public.gouv.fr / ADEME."
      />
      <section className="container grid gap-10 py-10 sm:py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReferentialsNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </section>
    </>
  );
}
