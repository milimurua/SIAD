export interface Sinister {
  id: string;
  date: Date;
  description: string;
  amount: number;
  insuranceId?: string;
  insuredId?: string;
}
