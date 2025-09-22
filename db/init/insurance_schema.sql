-- Ejecutar esto dentro de tu base (p.ej. `seguros`): psql -U app_user -d seguros
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- gen_random_UUID()
CREATE EXTENSION IF NOT EXISTS CITEXT;    -- email case-insensitive

-- Esquema
CREATE SCHEMA IF NOT EXISTS insurance_db;

-- Tabla Aseguradora 
CREATE TABLE IF NOT EXISTS insurance_db.insurance (
  id_insurance UUID PRIMARY KEY DEFAULT gen_random_UUID(),
  cuit char(11) UNIQUE NOT NULL,      
  name_insurance TEXT NOT NULL,                  
  company_name TEXT NOT NULL,                 
  address TEXT NOT NULL,
  phone VARCHAR(25),
  email CITEXT,
  CONSTRAINT email_insurance_chk CHECK (email IS NULL OR position('@' in email) > 1)
);

-- Tabla Sucursales
CREATE TABLE IF NOT EXISTS insurance_db.branches (
  id_branch UUID PRIMARY KEY DEFAULT gen_random_UUID(),
  insurance_id UUID NOT NULL REFERENCES insurance_db.insurance(id_insurance) ON DELETE CASCADE,
  name_branch TEXT NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(25),
  email CITEXT,
  CONSTRAINT email_branch_chk CHECK (email IS NULL OR position('@' in email) > 1)
);

-- Productor de seguros 
CREATE TABLE IF NOT EXISTS insurance_db.safe_producer (
  id_producer UUID PRIMARY KEY DEFAULT gen_random_UUID(),
  tuition VARCHAR(10) NOT NULL,       
  emitter_entity TEXT NOT NULL,            
  name_producer TEXT NOT NULL,
  dni VARCHAR(10) UNIQUE NOT NULL,
  phone VARCHAR(25),
  email CITEXT,
  CONSTRAINT uq_prod_tuition UNIQUE (country, emitter_entity, tuition),
  CONSTRAINT email_prod_chk CHECK (email IS NULL OR position('@' in email) > 1)
);

-- Tabla Asegurados 
CREATE TABLE IF NOT EXISTS insurance_db.insured (
  dni              VARCHAR(10) PRIMARY KEY,
  name_insured     TEXT NOT NULL,
  surname_insured  TEXT NOT NULL,
  phone            VARCHAR(25),
  email            CITEXT,
  address          TEXT NOT NULL,
  branch_id        UUID REFERENCES insurance_db.branches(id_branch) ON DELETE SET NULL,
  insurance_id     UUID REFERENCES insurance_db.insurance(id_insurance) ON DELETE SET NULL,
  CONSTRAINT email_insured_chk CHECK (email IS NULL OR position('@' in email) > 1)
);

-- Tabla Siniestros 
CREATE TABLE IF NOT EXISTS insurance_db.sinister (
  id_sinister          UUID PRIMARY KEY DEFAULT gen_random_UUID(),
  insured_dni          VARCHAR(10) REFERENCES insurance_db.insured(dni) ON DELETE SET NULL,
  insurance_id         UUID REFERENCES insurance_db.insurance(id_insurance) ON DELETE SET NULL,
  branch_id            UUID REFERENCES insurance_db.branches(id_branch) ON DELETE SET NULL,
  date_sinister        date NOT NULL,
  description_sinister TEXT NOT NULL,
  amount_sinister      numeric(12,2) NOT NULL,
  stay_sinister        boolean NOT NULL DEFAULT false
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_branches_insurance_id ON insurance_db.branches(insurance_id);
CREATE INDEX IF NOT EXISTS idx_insured_insurance_id  ON insurance_db.insured(insurance_id);
CREATE INDEX IF NOT EXISTS idx_insured_branch_id     ON insurance_db.insured(branch_id);
CREATE INDEX IF NOT EXISTS idx_sinister_insured_dni  ON insurance_db.sinister(insured_dni);
CREATE INDEX IF NOT EXISTS idx_sinister_insurance_id ON insurance_db.sinister(insurance_id);
CREATE INDEX IF NOT EXISTS idx_sinister_branch_id    ON insurance_db.sinister(branch_id);
