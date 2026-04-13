export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  userId: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: string;
  spent: number;
  createdAt: string;
  userId: string;
}

export type ExpenseFormData = Pick<Expense, "amount" | "category" | "description" | "date">;

export type BudgetFormData = Pick<Budget, "category" | "limit" | "period">;