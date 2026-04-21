'use client';

import { Info, FileDown, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

import type { CalculationContext, RegistrationCostBreakdown } from '@immatout/calc';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Y1: '#3b82f6',
  Y2: '#a855f7',
  Y3: '#ef4444',
  Y4: '#10b981',
  Y5: '#f59e0b',
  Y6: '#f97316',
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
    .filter((r) => r.amountCents > 0)
    .map((r) => ({ name: r.label, value: r.amountCents, fill: r.color }));

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardDescription>{t('result.total')}</CardDescription>
          <CardTitle className="text-4xl font-bold">
            {formatCentsPrecise(result.totalCents)}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          <div className="flex items-center justify-center">
            {chartData.length > 0 ? (
              <PieChart width={240} height={240}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune taxe à afficher.</p>
            )}
          </div>
          <div>
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
          </div>
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

      <div className="flex flex-wrap gap-3">
        <Button onClick={downloadPdf} disabled={downloading}>
          <FileDown className="h-4 w-4" />
          {downloading ? 'Génération…' : t('result.download_pdf')}
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCcw className="h-4 w-4" />
          Nouveau calcul
        </Button>
      </div>
    </div>
  );
}

function TaxTable({ rows, expert }: { rows: TaxRow[]; expert: boolean }) {
  return (
    <table className="mt-4 w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
          <th className="py-2">Taxe</th>
          {expert && <th className="py-2">Base légale</th>}
          <th className="py-2 text-right">Montant</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.code} className="border-b border-border/60 last:border-0">
            <td className="py-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2 text-left hover:underline">
                    <span
                      aria-hidden
                      className="inline-block h-3 w-3 rounded-sm"
                      style={{ backgroundColor: r.color }}
                    />
                    <span>{r.label}</span>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p>{r.detail}</p>
                    <p className="text-[10px] opacity-70">{r.legalRef}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </td>
            {expert && (
              <td className="py-2 font-mono text-xs text-muted-foreground">{r.legalRef}</td>
            )}
            <td className="py-2 text-right tabular-nums">{formatCentsPrecise(r.amountCents)}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
