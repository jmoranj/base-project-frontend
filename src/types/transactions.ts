export type Transaction = {
  type: string;
  id: string;
  value: number;
  description: string;
  date: Date;
  category: string;
};