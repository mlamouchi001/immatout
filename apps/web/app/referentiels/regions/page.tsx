import type { Metadata } from 'next';

import { getRegionsScale, type RegionScaleEntry } from '@immatout/data';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Tarifs régionaux du cheval fiscal',
  description:
    'Tarif du cheval fiscal par région française pour 2026, coefficients énergie (essence, diesel, hybride, électrique, GPL, E85), et surcharge IDFM en Île-de-France.',
};

const ALL_ENERGIES = [
  'ESSENCE',
  'DIESEL',
  'ELECTRIC',
  'HYDROGEN',
  'HYBRID',
  'PHEV',
  'GPL',
  'GNV',
  'E85',
] as const;

function formatCoef(regionRow: RegionScaleEntry, energy: string): string {
  const c = regionRow.energyCoefficients[energy];
  if (c === undefined) return '1.00';
  if (c === 0) return '0';
  return c.toFixed(2);
}

export default function RegionsRef() {
  const scale = getRegionsScale(2026);
  const sorted = [...scale.regions].sort((a: RegionScaleEntry, b: RegionScaleEntry) =>
    a.regionName.localeCompare(b.regionName, 'fr'),
  );
  const min = sorted.reduce(
    (acc, r) => (r.perCvRateEuros < acc.perCvRateEuros ? r : acc),
    sorted[0]!,
  );
  const max = sorted.reduce(
    (acc, r) => (r.perCvRateEuros > acc.perCvRateEuros ? r : acc),
    sorted[0]!,
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Tarifs régionaux 2026</h2>
        <p className="text-sm text-muted-foreground">
          Référence : arrêtés des conseils régionaux 2026 et service-public.gouv.fr. Plafond légal
          60 €/CV (CIBS L.421-48). Tarifs applicables au{' '}
          <time dateTime={scale.publishedAt}>1ᵉʳ janvier 2026</time>.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Moins cher" value={`${min.perCvRateEuros} €/CV`} sub={`${min.regionName}`} />
        <Stat label="Plus cher" value={`${max.perCvRateEuros} €/CV`} sub={`${max.regionName}`} />
        <Stat
          label="Surcharge IDFM"
          value={`${scale.idfmSurchargeEurosPerCv} €/CV`}
          sub={`depuis ${new Date(scale.idfmSurchargeStartsAt).toLocaleDateString('fr-FR')}`}
        />
      </div>

      <Alert variant="info">
        <AlertDescription>
          Les coefficients d&apos;énergie multiplient le tarif régional. Un coefficient de 0 vaut
          exonération totale (EV / hydrogène partout, plus certaines énergies propres selon les
          régions). Un coefficient 0,5 vaut demi-tarif (hybride, GPL, E85 dans plusieurs régions).
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">
                    Région
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    €/CV
                  </th>
                  {ALL_ENERGIES.map((e) => (
                    <th key={e} scope="col" className="px-3 py-3 text-right">
                      {e.charAt(0) + e.slice(1).toLowerCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((r: RegionScaleEntry) => {
                  const isIdf = r.regionCode === 'IDF';
                  return (
                    <tr
                      key={r.regionCode}
                      className="border-t border-border/60 transition-colors hover:bg-muted/20"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{r.regionName}</div>
                        <div className="text-xs text-muted-foreground">{r.regionCode}</div>
                      </td>
                      <td className="num px-4 py-3 text-right font-semibold">
                        {r.perCvRateEuros} €
                        {isIdf && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            + {scale.idfmSurchargeEurosPerCv} €
                          </span>
                        )}
                      </td>
                      {ALL_ENERGIES.map((e) => {
                        const raw = r.energyCoefficients[e];
                        const value = formatCoef(r, e);
                        const muted = raw === 0;
                        return (
                          <td
                            key={e}
                            className={
                              muted
                                ? 'num px-3 py-3 text-right text-muted-foreground/80'
                                : 'num px-3 py-3 text-right'
                            }
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <footer className="text-xs text-muted-foreground">
        Source :{' '}
        <a
          href="https://www.service-public.gouv.fr/particuliers/actualites/A18021"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          service-public.gouv.fr — Coût carte grise 2026
        </a>
        . Le tarif par cheval fiscal est voté annuellement par chaque conseil régional (L.421-49
        CIBS).
      </footer>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="num mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}
