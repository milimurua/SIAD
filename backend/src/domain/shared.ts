// Tipos compartidos para operaciones de base de datos
export interface InsuredData {
  name: string;
  surname: string;
  dni: string;
  email?: string;
  insuranceId?: string;
}

export interface SinisterData {
  description: string;
  amount: number;
  insuranceId?: string;
  insuredId?: string;
}

export interface InsuranceData{
  id: string;
  name: String;
  email: String
  insureds: InsuredData[];
  sinisters: SinisterData[];
}

export interface ProducerData {
  name: string;
  number: string;
  dni: string;
  phone?: string;
  email?: string;
}

export interface UserData {
  id: string;
  email: string;
  password: string;
  type: "insurance" | "producer";
}
