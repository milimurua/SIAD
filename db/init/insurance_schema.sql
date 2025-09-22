CREATE DATABASE IF NOT EXISTS insurance_db;

-- Tabla Asegurandora (Insurance)
CREATE TABLE IF NOT EXISTS insurance_db.insurance (
    cuit CHAR(11) PRIMARY KEY,
    id_insurance DEFAULT gen_random_uuid(),
    name_insurance TEXT NOT NULL,
    company_name TEXT NOT NULL,
    direction TEXT NOT NULL,
    phone VARCHAR(25),
    email VARCHAR(100)
)

-- Tabla Sucursales (Branches)
CREATE TABLE IF NOT EXISTS insurance_db.branches (
    id_branch PRIMARY KEY,
    id_insurance FOREING KEY REFERENCES insurance_db.insurance(cuit),
    name_branch TEXT NOT NULL,
    direction TEXT NOT NULL,
    phone VARCHAR(25),
    email VARCHAR(100)
)

-- Tabla Productor_Seguro (Safe Producer)
CREATE TABLE IF NOT EXISTS insurance_db.safe_producer (
    tuition VARCHAR(10) PRIMARY KEY,
    country VARCHAR(50) NOT NULL,
    emitter_entity VARCHAR(50) NOT NULL,
    ADD CONSTRAINT uq_prod_tuition UNIQUE (country, emitter_entity, tuition),
    name_producer TEXT NOT NULL,
    DNI VARCHAR(10) UNIQUE NOT NULL,
    phone VARCHAR(25),
    email VARCHAR(100)
)

-- Tabla Asegurados (User)
CREATE TABLE IF NOT EXISTS insurance_db.user (
    
)
