import type { Metadata } from 'next';

import { getDecoteGrid } from '@immatout/data';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Décote import — grille 12 tiers',
  description:
    'Grille unifiée des coefficients de décote appliqués au malus CO₂ (Y3) et au malus au poids (Y6) pour les véhicules d’occasion importés en France.',
};

function fmtMonths(m: number): string {
  if (m === 0) return '0 mois';
  if (m === 1) return '1 mois';
  if (m < 12) return `${m} mois`;
  const y = Math.floor(m / 12);
  const rem = m % 12;
  if (rem === 0) return `${y} an${y > 1 ? 's' : ''}`;
  return `${y} an${y > 1 ? 's' : ''} ${rem} mois`;
}

export default function DecoteRef() {
  const grid = getDecoteGrid();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Décote import</h2>
        <p className="text-sm text-muted-foreground">
          Grille unifiée Y3 (malus CO₂) et Y6 (malus au poids) pour véhicules d&apos;occasion
          importés ou requalifiés depuis le 1ᵉʳ mars 2025. Le coefficient s&apos;applique en
          abattement : <code>montant final = barème × (1 − coefficient)</code>.
        </p>
      </header>

      <Alert variant="info">
        <AlertDescription>
          Exonération totale dès {fmtMonths(grid.fullExonerationAtMonths)} (soit{' '}
          {Math.round(grid.fullExonerationAtMonths / 12)} ans).
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Tranche</th>
                  <th className="px-4 py-3 text-right">Âge minimum</th>
                  <th className="px-4 py-3 text-right">Âge max</th>
                  <th className="px-4 py-3 text-right">Coefficient</th>
                  <th className="px-4 py-3 text-left">Part abattue</th>
                </tr>
              </thead>
              <tbody>
                {grid.tiers.map((tier, i) => {
                  const pct = tier.coefficient * 100;
                  const full = tier.coefficient >= 1;
                  return (
                    <tr
                      key={i}
                      className="border-t border-border/60 transition-colors hover:bg-muted/20"
                    >
                      <td className="px-4 py-3 font-medium">T{i + 1}</td>
                      <td className="num px-4 py-3 text-right">{fmtMonths(tier.fromMonths)}</td>
                      <td className="num px-4 py-3 text-right">
                        {tier.toMonths === null ? '—' : fmtMonths(tier.toMonths - 1)}
                      </td>
                      <td
                        className={
                          full
                            ? 'num px-4 py-3 text-right font-semibold text-success'
                            : 'num px-4 py-3 text-right font-medium'
                        }
                      >
                        {tier.coefficient.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-muted"
                            aria-hidden
                          >
                            <div
                              className={
                                full
                                  ? 'h-full bg-success'
                                  : 'h-full bg-gradient-to-r from-accent/50 to-accent'
                              }
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="num w-10 text-right text-xs text-muted-foreground">
                            {pct.toFixed(0)} %
                          </span>
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

      <footer className="text-xs text-muted-foreground">Source : {grid.source}</footer>
    </div>
  );
}
