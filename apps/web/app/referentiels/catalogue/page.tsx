import type { Metadata } from 'next';

import { CatalogueBrowser } from '@/components/referentials/catalogue-browser';

export const metadata: Metadata = {
  title: 'Catalogue véhicules',
  description:
    'Parcourez le catalogue véhicules Immatout : 3250+ motorisations issues d’ADEME Car Labelling et EEA CO₂ Monitoring, avec CV fiscaux, CO₂ WLTP et masse.',
};

export default function CataloguePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Catalogue véhicules</h2>
        <p className="text-sm text-muted-foreground">
          ADEME Car Labelling (autorité pour les CV fiscaux français) + EEA CO₂ Monitoring (ouvre le
          spectre à l&apos;ensemble des immatriculations 2023). Les lignes marquées{' '}
          <span className="num text-xs">~</span> ont un CV estimé depuis CO₂ + puissance — à
          vérifier sur votre certificat.
        </p>
      </header>
      <CatalogueBrowser />
    </div>
  );
}
