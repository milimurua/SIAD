-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "insurance";

-- CreateTable
CREATE TABLE "insurance"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance"."insurance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance"."producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance"."insured" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "email" TEXT,
    "insuranceId" TEXT,

    CONSTRAINT "insured_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance"."sinister" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "insuranceId" TEXT,
    "insuredId" TEXT,

    CONSTRAINT "sinister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "insurance"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "producer_dni_key" ON "insurance"."producer"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "insured_dni_key" ON "insurance"."insured"("dni");

-- AddForeignKey
ALTER TABLE "insurance"."insured" ADD CONSTRAINT "insured_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance"."insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance"."sinister" ADD CONSTRAINT "sinister_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance"."insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance"."sinister" ADD CONSTRAINT "sinister_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "insurance"."insured"("id") ON DELETE SET NULL ON UPDATE CASCADE;
