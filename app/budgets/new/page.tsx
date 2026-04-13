"use client";

import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetFormData } from "@/lib/types";

export default function NewBudgetPage() {
  const router = useRouter();

  const handleSubmit = async (data: BudgetFormData) => {
    try {
      await api("/api/budgets", { method: "POST", body: data });
      router.push("/budgets");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        throw new Error("A budget for this category already exists");
      }
      throw err;
    }
  };

  return (
    <div>
      <h1 className="mx-auto mt-6 max-w-md px-4 text-2xl font-bold">
        New budget
      </h1>
      <BudgetForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}