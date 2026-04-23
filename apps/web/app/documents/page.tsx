import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

import type { VehicleCase } from '@immatout/calc';
import { getRequiredDocuments, type RequiredDocumentsFile } from '@immatout/data';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RequiredDocument = NonNullable<RequiredDocumentsFile[string]>[number];

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Documents à fournir',
  description:
    "Pièces officielles à fournir pour chaque cas d'immatriculation (FR neuf/occasion, import UE ou hors UE).",
};

const CASE_LABELS: Record<VehicleCase, string> = {
  FR_NEW: 'Véhicule neuf acheté en France',
  FR_USED: 'Véhicule d’occasion acheté en France',
  IMPORT_EU_NEW: 'Véhicule neuf importé de l’UE',
  IMPORT_EU_USED: 'Véhicule d’occasion importé de l’UE',
  IMPORT_NON_EU_NEW: 'Véhicule neuf importé hors UE',
  IMPORT_NON_EU_USED: 'Véhicule d’occasion importé hors UE',
};

export default function DocumentsPage() {
  const docs = getRequiredDocuments();

  return (
    <>
      <PageHeader
        eyebrow="Dossier d'immatriculation"
        title="Pièces à fournir"
        description="Source : service-public.gouv.fr (formulaires Cerfa 13750, 15776, quitus fiscal…)."
      />
      <section className="container py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {(Object.keys(docs) as VehicleCase[]).map((key) => (
            <Card
              key={key}
              className="overflow-hidden border-border/70 transition-all hover:border-accent/40 hover:shadow-pop"
            >
              <CardHeader className="border-b border-border/60 bg-muted/30">
                <CardTitle className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <FileText className="h-4 w-4" />
                  </span>
                  {CASE_LABELS[key]}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2.5 text-sm">
                  {docs[key]?.map((d: RequiredDocument) => (
                    <li key={d.id} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-foreground/90">{d.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
