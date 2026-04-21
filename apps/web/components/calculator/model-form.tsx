'use client';

import { Car, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { EnergyType, VehicleInput } from '@immatout/calc';
import type { EnergyCode, Trim } from '@immatout/vehicle-catalog';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { t } from '@/lib/i18n';

export interface ModelLookupResult {
  make: string;
  model: string;
  trim: Trim;
  prefill: Partial<VehicleInput>;
}

interface Props {
  onFound: (v: ModelLookupResult) => void;
  onFallback: () => void;
}

/**
 * ADEME "Energie" codes map to the calc package's EnergyType. Everything that
 * cannot be mapped precisely falls back to 'OTHER' so the user can refine
 * manually in the next step.
 */
function mapEnergy(code: EnergyCode): EnergyType {
  switch (code) {
    case 'ES':
      return 'ESSENCE';
    case 'GO':
      return 'DIESEL';
    case 'EE':
    case 'EL':
      return 'ELECTRIC';
    case 'EH':
    case 'GH':
      return 'HYBRID';
    case 'GL':
      return 'GPL';
    case 'GN':
      return 'GNV';
    case 'H2':
      return 'HYDROGEN';
    default:
      return 'OTHER';
  }
}

export function ModelForm({ onFound, onFallback }: Props) {
  const [makes, setMakes] = useState<string[]>([]);
  const [make, setMake] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState<string>('');
  const [trims, setTrims] = useState<Trim[]>([]);
  const [trimId, setTrimId] = useState<string>('');
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingTrims, setLoadingTrims] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoadingMakes(true);
    fetch('/api/catalog/makes')
      .then((r) => r.json())
      .then((data: { makes: string[] }) => {
        if (active) setMakes(data.makes);
      })
      .catch((err) => active && setError(String(err)))
      .finally(() => active && setLoadingMakes(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!make) {
      setModels([]);
      setModel('');
      return;
    }
    let active = true;
    setLoadingModels(true);
    setError(null);
    fetch(`/api/catalog/models?make=${encodeURIComponent(make)}`)
      .then((r) => r.json())
      .then((data: { models: string[] }) => {
        if (active) {
          setModels(data.models);
          setModel('');
          setTrims([]);
          setTrimId('');
        }
      })
      .catch((err) => active && setError(String(err)))
      .finally(() => active && setLoadingModels(false));
    return () => {
      active = false;
    };
  }, [make]);

  useEffect(() => {
    if (!make || !model) {
      setTrims([]);
      setTrimId('');
      return;
    }
    let active = true;
    setLoadingTrims(true);
    fetch(`/api/catalog/trims?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`)
      .then((r) => r.json())
      .then((data: { trims: Trim[] }) => {
        if (active) {
          setTrims(data.trims);
          setTrimId(data.trims[0]?.id ?? '');
        }
      })
      .catch((err) => active && setError(String(err)))
      .finally(() => active && setLoadingTrims(false));
    return () => {
      active = false;
    };
  }, [make, model]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trim = trims.find((tr: Trim) => tr.id === trimId);
    if (!trim) return;
    const prefill: Partial<VehicleInput> = {
      genre: 'VP',
      energy: mapEnergy(trim.energy),
      fiscalHorsepower: trim.fiscalCv,
    };
    if (trim.co2GPerKm !== null) prefill.co2WltpGPerKm = trim.co2GPerKm;
    if (trim.weightKg !== null) prefill.massInRunningOrderKg = trim.weightKg;
    onFound({ make, model, trim, prefill });
  }

  const noDataForMake = make && !loadingModels && models.length === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="model-make">{t('form.model.make')}</Label>
          <Select value={make} onValueChange={setMake} disabled={loadingMakes}>
            <SelectTrigger id="model-make" aria-label={t('form.model.make')}>
              <SelectValue placeholder={loadingMakes ? '…' : t('form.model.makePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model-model">{t('form.model.model')}</Label>
          <Select
            value={model}
            onValueChange={setModel}
            disabled={!make || loadingModels || models.length === 0}
          >
            <SelectTrigger id="model-model" aria-label={t('form.model.model')}>
              <SelectValue
                placeholder={loadingModels ? '…' : make ? t('form.model.modelPlaceholder') : '—'}
              />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model-trim">{t('form.model.trim')}</Label>
          <Select
            value={trimId}
            onValueChange={setTrimId}
            disabled={!model || loadingTrims || trims.length === 0}
          >
            <SelectTrigger id="model-trim" aria-label={t('form.model.trim')}>
              <SelectValue
                placeholder={loadingTrims ? '…' : model ? t('form.model.trimPlaceholder') : '—'}
              />
            </SelectTrigger>
            <SelectContent>
              {trims.map((tr: Trim) => (
                <SelectItem key={tr.id} value={tr.id}>
                  {tr.label} — {tr.fiscalCv} CV
                  {tr.co2GPerKm !== null ? ` · ${tr.co2GPerKm} g/km` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {noDataForMake && (
        <Alert variant="warn">
          <AlertDescription>{t('form.model.noData')}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={!trimId}>
          {loadingTrims ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Car className="h-4 w-4" />
          )}
          {t('form.model.submit')}
        </Button>
        <Button type="button" variant="outline" onClick={onFallback}>
          {t('form.mode.manual')}
        </Button>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
