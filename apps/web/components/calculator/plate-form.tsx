'use client';

import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { t } from '@/lib/i18n';

export interface PlateLookupResult {
  plate: string;
  genre: string;
  energy: string;
  fiscalHorsepower: number;
  firstRegistrationDate: string;
  co2WltpGPerKm: number;
  massInRunningOrderKg: number;
  make?: string;
  model?: string;
}

interface Props {
  onFound: (vehicle: PlateLookupResult) => void;
  onFallback: () => void;
}

export function PlateForm({ onFound, onFallback }: Props) {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/vehicle/${encodeURIComponent(plate.trim())}`);
      const body = await res.json();
      if (!res.ok) {
        if (res.status === 404) setError(`Plaque introuvable : ${plate}.`);
        else if (res.status === 503) setError('Service SIV indisponible.');
        else setError(body.error ?? `Erreur ${res.status}`);
        return;
      }
      onFound(body.payload as PlateLookupResult);
    } catch {
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plate">{t('form.plate.label')}</Label>
        <Input
          id="plate"
          autoComplete="off"
          placeholder={t('form.plate.placeholder')}
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          className="font-mono tracking-wider"
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading || plate.length < 7}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {t('form.plate.fetch')}
        </Button>
        <Button type="button" variant="outline" onClick={onFallback}>
          {t('form.mode.manual')}
        </Button>
      </div>
      {error && (
        <Alert variant="warn">
          <AlertDescription>
            {error} {t('form.plate.fallback')}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
