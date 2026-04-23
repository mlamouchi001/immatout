-- CreateTable
CREATE TABLE "CatalogMake" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sources" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogMake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogModel" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogTrim" (
    "id" SERIAL NOT NULL,
    "modelId" INTEGER NOT NULL,
    "naturalKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "fiscalCv" INTEGER NOT NULL,
    "fiscalCvApprox" BOOLEAN NOT NULL DEFAULT false,
    "co2GPerKm" INTEGER,
    "weightKg" INTEGER,
    "powerKw" DOUBLE PRECISION,
    "displacementCc" INTEGER,
    "bodyType" TEXT,
    "marketYear" INTEGER,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogTrim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogSeedState" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "lastSeededAt" TIMESTAMP(3) NOT NULL,
    "rowCount" INTEGER NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "CatalogSeedState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogMake_name_key" ON "CatalogMake"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogMake_slug_key" ON "CatalogMake"("slug");

-- CreateIndex
CREATE INDEX "CatalogMake_name_idx" ON "CatalogMake"("name");

-- CreateIndex
CREATE INDEX "CatalogModel_name_idx" ON "CatalogModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogModel_makeId_name_key" ON "CatalogModel"("makeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogTrim_naturalKey_key" ON "CatalogTrim"("naturalKey");

-- CreateIndex
CREATE INDEX "CatalogTrim_modelId_idx" ON "CatalogTrim"("modelId");

-- CreateIndex
CREATE INDEX "CatalogTrim_energy_fiscalCv_idx" ON "CatalogTrim"("energy", "fiscalCv");

-- CreateIndex
CREATE INDEX "CatalogTrim_marketYear_idx" ON "CatalogTrim"("marketYear");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogSeedState_source_key" ON "CatalogSeedState"("source");

-- AddForeignKey
ALTER TABLE "CatalogModel" ADD CONSTRAINT "CatalogModel_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "CatalogMake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogTrim" ADD CONSTRAINT "CatalogTrim_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CatalogModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
