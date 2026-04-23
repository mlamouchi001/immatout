'use client';

import { Info, FileDown, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import type { CalculationContext, RegistrationCostBreakdown } from '@immatout/calc';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCentsPrecise, formatCentsWhole } from '@/lib/format';
import { t } from '@/lib/i18n';

type TaxRow = {
  code: 'Y1' | 'Y2' | 'Y3' | 'Y4' | 'Y5' | 'Y6';
  label: string;
  detail: string;
  legalRef: string;
  amountCents: number;
  color: string;
};

const COLORS: Record<TaxRow['code'], string> = {
  Y1: '#2563eb', // blue-600
  Y2: '#7c3aed', // violet-600
  Y3: '#dc2626', // red-600
  Y4: '#059669', // emerald-600
  Y5: '#d97706', // amber-600
  Y6: '#ea580c', // orange-600
};

interface Props {
  result: RegistrationCostBreakdown;
  input: CalculationContext;
  onReset: () => void;
}

export function ResultView({ result, input, onReset }: Props) {
  const [view, setView] = useState<'summary' | 'expert'>('summary');
  const [downloading, setDownloading] = useState(false);

  const rows: TaxRow[] = [
    row('Y1', t('result.tax.Y1'), result.taxes.Y1_regionale),
    row('Y2', t('result.tax.Y2'), result.taxes.Y2_formation),
    row('Y3', t('result.tax.Y3'), result.taxes.Y3_malusCO2),
    row('Y4', t('result.tax.Y4'), result.taxes.Y4_gestion),
    row('Y5', t('result.tax.Y5'), result.taxes.Y5_acheminement),
    row('Y6', t('result.tax.Y6'), result.taxes.Y6_malusPoids),
  ];

  const chartData = rows
    .filter((r: TaxRow) => r.amountCents > 0)
    .map((r: TaxRow) => ({ name: r.label, value: r.amountCents, fill: r.color }));

  async function downloadPdf() {
    setDownloading(true);
    try {
      const res = await fetch('/api/calculate/pdf', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `immatout-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="border-b border-border p-8 md:border-b-0 md:border-r">
            <p className="section-eyebrow">{t('result.total')}</p>
            <p className="num mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              {formatCentsPrecise(result.totalCents)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Dont {rows.filter((r) => r.amountCents > 0).length} taxes applicables · barème{' '}
              {result.metadata.scaleVersion}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={downloadPdf} disabled={downloading} variant="accent">
                <FileDown className="h-4 w-4" />
                {downloading ? 'Génération…' : t('result.download_pdf')}
              </Button>
              <Button variant="outline" onClick={onReset}>
                <RefreshCcw className="h-4 w-4" />
                Nouveau calcul
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-muted/20 p-8">
            {chartData.length > 0 ? (
              <div className="relative h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={2}
                      stroke="hsl(var(--card))"
                      strokeWidth={2}
                      isAnimationActive={false}
                    >
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Répartition
                  </p>
                  <p className="num mt-0.5 text-xs text-muted-foreground">
                    {chartData.length} postes
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune taxe à afficher.</p>
            )}
          </div>
        </div>

        <CardContent className="border-t border-border pt-6">
          <Tabs value={view} onValueChange={(v) => setView(v as 'summary' | 'expert')}>
            <TabsList>
              <TabsTrigger value="summary">{t('result.view.summary')}</TabsTrigger>
              <TabsTrigger value="expert">{t('result.view.expert')}</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <TaxTable rows={rows} expert={false} />
            </TabsContent>
            <TabsContent value="expert">
              <TaxTable rows={rows} expert />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {result.applied.malusGlobalCapReached && (
        <Alert variant="warn">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Plafond global de {formatCentsWhole(result.applied.malusGlobalCapCents)} atteint (Y3 +
            Y6 combinés).
          </AlertDescription>
        </Alert>
      )}

      {result.applied.exonerations.length > 0 && (
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Exonérations appliquées : {result.applied.exonerations.join(', ')}.
          </AlertDescription>
        </Alert>
      )}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Modifier le véhicule ou la situation
      </button>
    </div>
  );
}

function TaxTable({ rows, expert }: { rows: TaxRow[]; expert: boolean }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/30">
          <tr className="text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-2.5">Taxe</th>
            {expert && <th className="px-4 py-2.5">Base légale</th>}
            <th className="px-4 py-2.5 text-right">Montant</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const inactive = r.amountCents === 0;
            return (
              <tr
                key={r.code}
                className={
                  i < rows.length - 1
                    ? 'border-b border-border/60 transition-colors hover:bg-muted/20'
                    : 'transition-colors hover:bg-muted/20'
                }
              >
                <td className="px-4 py-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-2.5 text-left"
                        aria-label={`Détails de ${r.label}`}
                      >
                        <span
                          aria-hidden
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: inactive ? 'hsl(var(--muted))' : r.color }}
                        />
                        <span className={inactive ? 'text-muted-foreground' : ''}>{r.label}</span>
                        <Info className="h-3 w-3 text-muted-foreground/60" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <div className="space-y-1">
                        <p className="text-xs">{r.detail}</p>
                        <p className="text-[10px] opacity-70">{r.legalRef}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </td>
                {expert && (
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                    {r.legalRef}
                  </td>
                )}
                <td
                  className={
                    inactive
                      ? 'num px-4 py-3 text-right text-muted-foreground'
                      : 'num px-4 py-3 text-right font-medium'
                  }
                >
                  {formatCentsPrecise(r.amountCents)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function row(
  code: TaxRow['code'],
  label: string,
  tax: { amountCents: number; detail: string; legalRef: string },
): TaxRow {
  return {
    code,
    label,
    detail: tax.detail,
    legalRef: tax.legalRef,
    amountCents: tax.amountCents,
    color: COLORS[code],
  };
}
