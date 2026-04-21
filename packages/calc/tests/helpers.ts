import type { CalculationContext, VehicleInput, HouseholdContext } from '../src/types';

export const defaultHousehold: HouseholdContext = {
  dependentChildren: 0,
  hasDisabilityCard: false,
  isLegalEntity: false,
};

export function buildCtx(
  overrides: Partial<{
    vehicle: Partial<VehicleInput>;
    vehicleCase: CalculationContext['vehicleCase'];
    region: CalculationContext['region'];
    registrationDate: string;
    household: Partial<HouseholdContext>;
  }> = {},
): CalculationContext {
  const vehicle: VehicleInput = {
    genre: 'VP',
    energy: 'ESSENCE',
    fiscalHorsepower: 7,
    firstRegistrationDate: '2024-01-01',
    co2WltpGPerKm: 130,
    massInRunningOrderKg: 1400,
    ...overrides.vehicle,
  };
  return {
    vehicle,
    vehicleCase: overrides.vehicleCase ?? 'FR_NEW',
    region: overrides.region ?? 'IDF',
    registrationDate: overrides.registrationDate ?? '2026-04-19',
    household: { ...defaultHousehold, ...overrides.household },
  };
}
