"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseFormData } from "@/lib/types";

export default function NewExpensePage() {
  const router = useRouter();

  const handleSubmit = async (data: ExpenseFormData) => {
    await api("/api/expenses", { method: "POST", body: data });
    router.push("/expenses");
  };

  return (
    <div>
      <h1 className="mx-auto mt-6 max-w-md px-4 text-2xl font-bold">
        New expense
      </h1>
      <ExpenseForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}