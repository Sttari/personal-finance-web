export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  userId: string;
}

export type ExpenseFormData = Pick<
  Expense,
  "amount" | "category" | "description" | "date"
>;