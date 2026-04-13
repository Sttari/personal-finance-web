"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Expense, ExpenseFormData } from "@/lib/types";

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Expense>(`/api/expenses/${params.id}`)
      .then((data) => setExpense(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (data: ExpenseFormData) => {
    await api(`/api/expenses/${params.id}`, {
      method: "PUT",
      body: data,
    });
    router.push("/expenses");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!expense) return <p className="p-6">Expense not found</p>;

  return (
    <div>
      <h1 className="mx-auto mt-6 max-w-md px-4 text-2xl font-bold">
        Edit expense
      </h1>
      <ExpenseForm
        initial={expense}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}