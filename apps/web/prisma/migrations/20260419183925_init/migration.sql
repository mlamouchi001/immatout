-- CreateTable
CREATE TABLE "RegionScale" (
    "id" SERIAL NOT NULL,
    "scaleYear" INTEGER NOT NULL,
    "regionCode" VARCHAR(3) NOT NULL,
    "regionName" TEXT NOT NULL,
    "perCvRateCents" INTEGER NOT NULL,
    "energyCoefficients" JSONB NOT NULL,
    "idfmSurchargeCents" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "RegionScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Co2MalusScale" (
    "id" SERIAL NOT NULL,
    "scaleYear" INTEGER NOT NULL,
    "globalMalusCapCents" BIGINT NOT NULL,
    "grid" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Co2MalusScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightMalusScale" (
    "id" SERIAL NOT NULL,
    "scaleYear" INTEGER NOT NULL,
    "triggerKg" INTEGER NOT NULL,
    "tranches" JSONB NOT NULL,
    "abatements" JSONB NOT NULL,
    "evApplicable" BOOLEAN NOT NULL,
    "source" TEXT NOT NULL,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeightMalusScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" SERIAL NOT NULL,
    "cnit" TEXT,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT,
    "year" INTEGER NOT NULL,
    "energy" TEXT NOT NULL,
    "fiscalHorsepower" INTEGER NOT NULL,
    "co2WltpGPerKm" INTEGER,
    "massInRunningOrderKg" INTEGER,
    "cylinderCapacityCm3" INTEGER,
    "enginePowerKw" INTEGER,
    "source" TEXT NOT NULL,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SivLookupCache" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SivLookupCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculationLog" (
    "id" TEXT NOT NULL,
    "engineVersion" TEXT NOT NULL,
    "scaleVersion" TEXT NOT NULL,
    "vehicleCase" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RegionScale_scaleYear_idx" ON "RegionScale"("scaleYear");

-- CreateIndex
CREATE UNIQUE INDEX "RegionScale_scaleYear_regionCode_key" ON "RegionScale"("scaleYear", "regionCode");

-- CreateIndex
CREATE UNIQUE INDEX "Co2MalusScale_scaleYear_key" ON "Co2MalusScale"("scaleYear");

-- CreateIndex
CREATE UNIQUE INDEX "WeightMalusScale_scaleYear_key" ON "WeightMalusScale"("scaleYear");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_cnit_key" ON "VehicleModel"("cnit");

-- CreateIndex
CREATE INDEX "VehicleModel_make_model_year_idx" ON "VehicleModel"("make", "model", "year");

-- CreateIndex
CREATE UNIQUE INDEX "SivLookupCache_plate_key" ON "SivLookupCache"("plate");

-- CreateIndex
CREATE INDEX "SivLookupCache_expiresAt_idx" ON "SivLookupCache"("expiresAt");

-- CreateIndex
CREATE INDEX "CalculationLog_createdAt_idx" ON "CalculationLog"("createdAt");

-- CreateIndex
CREATE INDEX "CalculationLog_regionCode_vehicleCase_idx" ON "CalculationLog"("regionCode", "vehicleCase");
