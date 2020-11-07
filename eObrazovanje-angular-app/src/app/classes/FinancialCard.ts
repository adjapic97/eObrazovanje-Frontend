import { Transaction } from './Transaction';
export class FinancialCard{
  id: number;
  balance: number;
  cardNumber: string;
  cardType: string;
  transactionDTO?: Transaction[];
}
