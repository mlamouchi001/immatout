'use client';

import { Loader2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { CatalogSearchRow } from '@/app/api/catalog/search/route';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ENERGIES: Array<{ value: string; label: string }> = [
  { value: '', label: 'Toutes énergies' },
  { value: 'ES', label: 'Essence' },
  { value: 'GO', label: 'Diesel' },
  { value: 'EE', label: 'Électrique' },
  { value: 'EH', label: 'Hybride essence' },
  { value: 'GH', label: 'Hybride diesel' },
  { value: 'GL', label: 'GPL' },
  { value: 'GN', label: 'GNV' },
  { value: 'H2', label: 'Hydrogène' },
];

const SOURCES: Array<{ value: string; label: string }> = [
  { value: '', label: 'ADEME + EEA' },
  { value: 'ademe', label: 'ADEME uniquement' },
  { value: 'eea', label: 'EEA uniquement' },
];

interface SearchResponse {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  rows: CatalogSearchRow[];
}

export function CatalogueBrowser() {
  const [makes, setMakes] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const [make, setMake] = useState('');
  const [energy, setEnergy] = useState('');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset page when filters change.
  useEffect(() => {
    setPage(0);
  }, [q, make, energy, source]);

  // Load makes once.
  useEffect(() => {
    let active = true;
    fetch('/api/catalog/makes')
      .then((r) => r.json())
      .then((d: { makes: string[] }) => {
        if (active) setMakes(d.makes);
      })
      .catch(() => void 0);
    return () => {
      active = false;
    };
  }, []);

  // Fetch results whenever filters or page change, debounced for q.
  useEffect(() => {
    let active = true;
    const handle = setTimeout(() => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (make) params.set('make', make);
      if (energy) params.set('energy', energy);
      if (source) params.set('source', source);
      params.set('page', String(page));
      fetch(`/api/catalog/search?${params.toString()}`)
        .then((r) => r.json())
        .then((d: SearchResponse) => {
          if (active) setData(d);
        })
        .catch((e) => active && setError(String(e)))
        .finally(() => active && setLoading(false));
    }, 200);
    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [q, make, energy, source, page]);

  const totalLabel = data ? `${data.total.toLocaleString('fr-FR')} motorisations` : '—';

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cat-q">Recherche</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="cat-q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ex. Clio, Tesla, i3, Tucson..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-make">Marque</Label>
            <Select value={make} onValueChange={(v) => setMake(v === '__all' ? '' : v)}>
              <SelectTrigger id="cat-make">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all">Toutes</SelectItem>
                {makes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-energy">Énergie</Label>
            <Select value={energy} onValueChange={(v) => setEnergy(v === '__all' ? '' : v)}>
              <SelectTrigger id="cat-energy">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                {ENERGIES.map((e) => (
                  <SelectItem key={e.value || '__all'} value={e.value || '__all'}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-4">
            <Label>Source</Label>
            <div className="flex flex-wrap gap-2">
              {SOURCES.map((s) => {
                const active = source === s.value;
                return (
                  <button
                    key={s.value || 'all'}
                    type="button"
                    onClick={() => setSource(s.value)}
                    className={
                      active
                        ? 'rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs font-medium text-accent'
                        : 'rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent/40 hover:text-foreground'
                    }
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Chargement…
            </span>
          ) : (
            <span>{totalLabel}</span>
          )}
        </p>
        {data && data.pageCount > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0 || loading}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Précédent
            </Button>
            <span className="num text-xs text-muted-foreground">
              {page + 1} / {data.pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!data || page + 1 >= data.pageCount || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Marque</th>
                  <th className="px-4 py-3 text-left">Modèle</th>
                  <th className="px-4 py-3 text-left">Motorisation</th>
                  <th className="px-3 py-3 text-right">Énergie</th>
                  <th className="px-3 py-3 text-right">CV</th>
                  <th className="px-3 py-3 text-right">CO₂</th>
                  <th className="px-3 py-3 text-right">Masse</th>
                  <th className="px-3 py-3 text-right">Source</th>
                </tr>
              </thead>
              <tbody>
                {data?.rows.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Aucun résultat pour ces filtres.
                    </td>
                  </tr>
                )}
                {data?.rows.map((r: CatalogSearchRow) => (
                  <tr
                    key={r.id}
                    className="border-t border-border/60 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 font-medium">{r.make}</td>
                    <td className="px-4 py-3">{r.model}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.label}</td>
                    <td className="num px-3 py-3 text-right text-xs">{r.energy}</td>
                    <td className="num px-3 py-3 text-right font-semibold">
                      {r.fiscalCv}
                      {r.fiscalCvApprox && <span className="ml-0.5 text-muted-foreground">~</span>}
                    </td>
                    <td className="num px-3 py-3 text-right">
                      {r.co2GPerKm === null ? '—' : `${r.co2GPerKm} g/km`}
                    </td>
                    <td className="num px-3 py-3 text-right">
                      {r.weightKg === null ? '—' : `${r.weightKg} kg`}
                    </td>
                    <td className="px-3 py-3 text-right text-xs">
                      <span
                        className={
                          r.source === 'ademe'
                            ? 'inline-block rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-accent'
                            : 'inline-block rounded-full border border-border px-2 py-0.5 text-muted-foreground'
                        }
                      >
                        {r.source.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
