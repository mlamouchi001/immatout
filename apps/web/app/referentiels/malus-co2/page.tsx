import type { Metadata } from 'next';

import { getCo2MalusScale, type Co2MalusFile } from '@immatout/data';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Malus écologique CO₂',
  description:
    'Grilles officielles du malus CO₂ WLTP en France pour 2024, 2025 et 2026, incluant le déclencheur, le plafond global et chaque palier de CO₂ à l’euro près.',
};

type Row = { co2GPerKm: number; amountEuros: number };

function describe(scale: Co2MalusFile): {
  triggerCo2: number;
  triggerAmount: number;
  maxCo2: number;
  maxAmount: number;
  capped: Row[];
  rows: Row[];
} {
  const grid = scale.grid;
  const triggerRow = grid[0]!;
  const maxRow = grid[grid.length - 1]!;
  const capped = grid.filter((t) => t.amountEuros >= scale.globalMalusCapEuros);
  return {
    triggerCo2: triggerRow.co2GPerKm,
    triggerAmount: triggerRow.amountEuros,
    maxCo2: maxRow.co2GPerKm,
    maxAmount: maxRow.amountEuros,
    capped,
    rows: grid,
  };
}

export default function MalusCo2Ref() {
  const years = [2024, 2025, 2026] as const;
  const scales = years.map((y) => ({ year: y, scale: getCo2MalusScale(y) }));

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Malus écologique CO₂</h2>
        <p className="text-sm text-muted-foreground">
          Base légale : <code>CIBS L.421-58 à L.421-70</code>. Grille WLTP en g/km, appliquée en
          France à la 1ʳᵉ immatriculation. Les cases rouges atteignent le plafond global.
        </p>
      </header>

      <Tabs defaultValue="2026">
        <TabsList>
          {years.map((y) => (
            <TabsTrigger key={y} value={String(y)}>
              {y}
            </TabsTrigger>
          ))}
        </TabsList>
        {scales.map(({ year, scale }) => {
          const d = describe(scale);
          return (
            <TabsContent key={year} value={String(year)} className="space-y-6 pt-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <Stat
                  label="Déclencheur"
                  value={`${d.triggerCo2} g/km`}
                  sub={`= ${d.triggerAmount} €`}
                />
                <Stat
                  label="Palier max"
                  value={`${d.maxCo2} g/km`}
                  sub={`= ${d.maxAmount.toLocaleString('fr-FR')} €`}
                />
                <Stat
                  label="Plafond global Y3+Y6"
                  value={`${scale.globalMalusCapEuros.toLocaleString('fr-FR')} €`}
                />
                <Stat label="Points dans la grille" value={String(d.rows.length)} />
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="max-h-[32rem] overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card/95 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
                        <tr className="border-b border-border/60">
                          <th className="px-4 py-3 text-left">CO₂ (g/km)</th>
                          <th className="px-4 py-3 text-right">Montant</th>
                          <th className="px-4 py-3 text-left">Barre de progression</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.rows.map((row: Row) => {
                          const pct = Math.min(
                            100,
                            (row.amountEuros / scale.globalMalusCapEuros) * 100,
                          );
                          const capped = row.amountEuros >= scale.globalMalusCapEuros;
                          return (
                            <tr
                              key={row.co2GPerKm}
                              className="border-b border-border/40 last:border-0 hover:bg-muted/20"
                            >
                              <td className="num px-4 py-2 font-medium">{row.co2GPerKm}</td>
                              <td
                                className={
                                  capped
                                    ? 'num px-4 py-2 text-right font-semibold text-destructive'
                                    : 'num px-4 py-2 text-right'
                                }
                              >
                                {row.amountEuros.toLocaleString('fr-FR')} €
                              </td>
                              <td className="px-4 py-2">
                                <div
                                  className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                                  aria-hidden
                                >
                                  <div
                                    className={
                                      capped
                                        ? 'h-full bg-destructive/70'
                                        : 'h-full bg-gradient-to-r from-accent/60 to-accent'
                                    }
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <footer className="text-xs text-muted-foreground">
                Source : <span>{scale.source}</span>
              </footer>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="num mt-1 text-xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}
