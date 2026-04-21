'use client';

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { EnergyType, VehicleGenre, VehicleInput, HouseholdContext } from '@immatout/calc';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { t } from '@/lib/i18n';

const GENRES: Array<{ value: VehicleGenre; label: string }> = [
  { value: 'VP', label: 'VP — Voiture particulière' },
  { value: 'VU', label: 'VU — Véhicule utilitaire' },
  { value: 'CTTE', label: 'CTTE — Camionnette' },
  { value: 'MOTO', label: 'MOTO — Motocyclette' },
  { value: 'CAM', label: 'CAM — Camion' },
  { value: 'TRR', label: 'TRR — Tracteur routier' },
];

const ENERGIES: Array<{ value: EnergyType; label: string }> = [
  { value: 'ESSENCE', label: 'Essence' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'ELECTRIC', label: 'Électrique' },
  { value: 'HYDROGEN', label: 'Hydrogène' },
  { value: 'HYBRID', label: 'Hybride (HEV/MHEV)' },
  { value: 'PHEV', label: 'Hybride rechargeable (PHEV)' },
  { value: 'GPL', label: 'GPL' },
  { value: 'GNV', label: 'GNV' },
  { value: 'E85', label: 'E85 / Superéthanol' },
  { value: 'OTHER', label: 'Autre' },
];

export interface ManualFormValue {
  vehicle: VehicleInput;
  household: HouseholdContext;
}

interface Props {
  initial?: Partial<VehicleInput>;
  onSubmit: (value: ManualFormValue) => void;
  submitting: boolean;
}

export function ManualForm({ initial, onSubmit, submitting }: Props) {
  const [genre, setGenre] = useState<VehicleGenre>(initial?.genre ?? 'VP');
  const [energy, setEnergy] = useState<EnergyType>(initial?.energy ?? 'ESSENCE');
  const [cv, setCv] = useState<string>(String(initial?.fiscalHorsepower ?? 7));
  const [firstReg, setFirstReg] = useState<string>(
    initial?.firstRegistrationDate?.slice(0, 10) ?? '2026-01-01',
  );
  const [co2, setCo2] = useState<string>(String(initial?.co2WltpGPerKm ?? 130));
  const [mass, setMass] = useState<string>(String(initial?.massInRunningOrderKg ?? 1400));
  const [ptac, setPtac] = useState<string>(
    initial?.totalAuthorizedLadenMassKg !== undefined
      ? String(initial.totalAuthorizedLadenMassKg)
      : '',
  );
  const [seats, setSeats] = useState<string>(
    initial?.seats !== undefined ? String(initial.seats) : '',
  );
  const [children, setChildren] = useState<string>('0');
  const [cmi, setCmi] = useState(false);
  const [legalEntity, setLegalEntity] = useState(false);

  const requiresPtac = genre === 'VU' || genre === 'CTTE' || genre === 'CAM' || genre === 'TRR';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const vehicle: VehicleInput = {
      genre,
      energy,
      fiscalHorsepower: Number(cv),
      firstRegistrationDate: firstReg,
      co2WltpGPerKm: Number(co2),
      massInRunningOrderKg: Number(mass),
    };
    if (ptac) vehicle.totalAuthorizedLadenMassKg = Number(ptac);
    if (seats) vehicle.seats = Number(seats);

    const household: HouseholdContext = {
      dependentChildren: Number(children) || 0,
      hasDisabilityCard: cmi,
      isLegalEntity: legalEntity,
    };
    onSubmit({ vehicle, household });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Genre du véhicule">
          <Select value={genre} onValueChange={(v) => setGenre(v as VehicleGenre)}>
            <SelectTrigger aria-label="Genre du véhicule" data-testid="genre-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Énergie">
          <Select value={energy} onValueChange={(v) => setEnergy(v as EnergyType)}>
            <SelectTrigger aria-label="Énergie" data-testid="energy-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENERGIES.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Puissance fiscale (CV)">
          <Input
            type="number"
            min={1}
            max={99}
            required
            value={cv}
            onChange={(e) => setCv(e.target.value)}
          />
        </Field>
        <Field label="Date de 1ère immatriculation">
          <Input
            type="date"
            required
            value={firstReg}
            onChange={(e) => setFirstReg(e.target.value)}
          />
        </Field>
        <Field label="Émissions CO₂ WLTP (g/km)">
          <Input
            type="number"
            min={0}
            max={1000}
            required
            value={co2}
            onChange={(e) => setCo2(e.target.value)}
          />
        </Field>
        <Field label="Masse en ordre de marche (kg)">
          <Input
            type="number"
            min={1}
            max={50000}
            required
            value={mass}
            onChange={(e) => setMass(e.target.value)}
          />
        </Field>
        {requiresPtac && (
          <Field label="PTAC (kg)">
            <Input
              type="number"
              min={1}
              required={requiresPtac}
              value={ptac}
              onChange={(e) => setPtac(e.target.value)}
            />
          </Field>
        )}
        <Field label="Places (facultatif)">
          <Input
            type="number"
            min={1}
            max={60}
            value={seats}
            placeholder="5"
            onChange={(e) => setSeats(e.target.value)}
          />
        </Field>
      </div>

      <fieldset className="rounded-lg border border-border p-4">
        <legend className="px-2 text-sm font-medium">Situation du titulaire</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="Enfants à charge">
            <Input
              type="number"
              min={0}
              max={20}
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={cmi}
              onChange={(e) => setCmi(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            Titulaire CMI-invalidité
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={legalEntity}
              onChange={(e) => setLegalEntity(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            Personne morale
          </label>
        </div>
      </fieldset>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Calcul…' : t('form.submit')}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const wrapped =
    isValidElement(children) &&
    typeof (children as ReactElement<{ id?: string }>).props.id === 'undefined'
      ? cloneElement(children as ReactElement<{ id?: string }>, { id })
      : children;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {wrapped}
    </div>
  );
}
