/**
 * Prisma seed — mirrors every reference grid from @immatout/data into Postgres.
 *
 * Idempotent: uses `upsert` on natural keys (scaleYear + regionCode, scaleYear)
 * so a second run leaves the DB identical instead of duplicating rows.
 *
 * Phase 3: scales only. Vehicle-identification data (ADEME/EEA) stays out for
 * now and will be populated by the Python ingestion scripts in a later phase.
 */

import { PrismaClient, Prisma } from '@prisma/client';
import {
  getRegionsScale,
  getCo2MalusScale,
  getWeightMalusScale,
  SUPPORTED_SCALE_YEARS,
} from '@immatout/data';

const prisma = new PrismaClient();

const CO2_SCALE_YEARS = [2024, 2025, 2026];
const WEIGHT_SCALE_YEARS = [2026];

async function seedRegionScales(): Promise<number> {
  let upserted = 0;
  for (const year of SUPPORTED_SCALE_YEARS) {
    const scale = getRegionsScale(year);
    for (const region of scale.regions) {
      // For IDF, store the surcharge on the row so the DB copy is self-contained.
      const idfmSurchargeCents =
        region.regionCode === 'IDF' ? Math.round(scale.idfmSurchargeEurosPerCv * 100) : 0;

      await prisma.regionScale.upsert({
        where: {
          scaleYear_regionCode: { scaleYear: scale.scaleYear, regionCode: region.regionCode },
        },
        update: {
          regionName: region.regionName,
          perCvRateCents: Math.round(region.perCvRateEuros * 100),
          energyCoefficients: region.energyCoefficients as Prisma.InputJsonValue,
          idfmSurchargeCents,
          publishedAt: new Date(scale.publishedAt),
          source: scale.source,
        },
        create: {
          scaleYear: scale.scaleYear,
          regionCode: region.regionCode,
          regionName: region.regionName,
          perCvRateCents: Math.round(region.perCvRateEuros * 100),
          energyCoefficients: region.energyCoefficients as Prisma.InputJsonValue,
          idfmSurchargeCents,
          publishedAt: new Date(scale.publishedAt),
          source: scale.source,
        },
      });
      upserted += 1;
    }
  }
  return upserted;
}

async function seedCo2MalusScales(): Promise<number> {
  let upserted = 0;
  for (const year of CO2_SCALE_YEARS) {
    const scale = getCo2MalusScale(year);
    await prisma.co2MalusScale.upsert({
      where: { scaleYear: scale.scaleYear },
      update: {
        globalMalusCapCents: BigInt(scale.globalMalusCapEuros) * BigInt(100),
        grid: scale.grid as unknown as Prisma.InputJsonValue,
        source: scale.source,
      },
      create: {
        scaleYear: scale.scaleYear,
        globalMalusCapCents: BigInt(scale.globalMalusCapEuros) * BigInt(100),
        grid: scale.grid as unknown as Prisma.InputJsonValue,
        source: scale.source,
      },
    });
    upserted += 1;
  }
  return upserted;
}

async function seedWeightMalusScales(): Promise<number> {
  let upserted = 0;
  for (const year of WEIGHT_SCALE_YEARS) {
    const scale = getWeightMalusScale(year);
    await prisma.weightMalusScale.upsert({
      where: { scaleYear: scale.scaleYear },
      update: {
        triggerKg: scale.triggerKg,
        tranches: scale.tranches as unknown as Prisma.InputJsonValue,
        abatements: scale.abatements as unknown as Prisma.InputJsonValue,
        evApplicable: scale.evApplicable,
        source: scale.source,
      },
      create: {
        scaleYear: scale.scaleYear,
        triggerKg: scale.triggerKg,
        tranches: scale.tranches as unknown as Prisma.InputJsonValue,
        abatements: scale.abatements as unknown as Prisma.InputJsonValue,
        evApplicable: scale.evApplicable,
        source: scale.source,
      },
    });
    upserted += 1;
  }
  return upserted;
}

async function main(): Promise<void> {
  console.log('[seed] starting — DATABASE_URL=%s', process.env.DATABASE_URL?.split('@')[1]);
  const regions = await seedRegionScales();
  const co2 = await seedCo2MalusScales();
  const weight = await seedWeightMalusScales();
  console.log(
    '[seed] done · %d regional rows · %d CO2 scales · %d weight scales',
    regions,
    co2,
    weight,
  );
}

main()
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
