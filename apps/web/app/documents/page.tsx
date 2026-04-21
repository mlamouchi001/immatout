import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

import type { VehicleCase } from '@immatout/calc';
import { getRequiredDocuments } from '@immatout/data';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Documents à fournir',
  description:
    "Pièces officielles à fournir pour chaque cas d'immatriculation (FR neuf/occasion, import UE ou hors UE).",
};

const CASE_LABELS: Record<VehicleCase, string> = {
  FR_NEW: 'Véhicule neuf acheté en France',
  FR_USED: 'Véhicule d\u2019occasion acheté en France',
  IMPORT_EU_NEW: 'Véhicule neuf importé de l\u2019UE',
  IMPORT_EU_USED: 'Véhicule d\u2019occasion importé de l\u2019UE',
  IMPORT_NON_EU_NEW: 'Véhicule neuf importé hors UE',
  IMPORT_NON_EU_USED: 'Véhicule d\u2019occasion importé hors UE',
};

export default function DocumentsPage() {
  const docs = getRequiredDocuments();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          Dossier d&apos;immatriculation
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pièces à fournir</h1>
        <p className="text-lg text-muted-foreground">
          Source : service-public.gouv.fr (formulaires Cerfa 13750, 15776, quitus fiscal…).
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {(Object.keys(docs) as VehicleCase[]).map((key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                {CASE_LABELS[key]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {docs[key]?.map((d) => (
                  <li key={d.id} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{d.label}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
