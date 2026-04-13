"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import { tokenStorage } from "@/lib/token";
import { Expense } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";

export default function ExpensesPage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenStorage.get()) {
      router.push("/login");
      return;
    }

    api<Expense[]>("/api/expenses")
      .then((data) => setExpenses(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          tokenStorage.clear();
          router.push("/login");
        } else {
          setError("Failed to load expenses");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await api(`/api/expenses/${id}`, { method: "DELETE" });
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Link
          href="/expenses/new"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          New expense
        </Link>
      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-600">
              <th className="py-2">Date</th>
              <th className="py-2">Category</th>
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="py-2">{formatDate(expense.date)}</td>
                <td className="py-2">{expense.category}</td>
                <td className="py-2">{expense.description}</td>
                <td className="py-2 text-right">{formatMoney(expense.amount)}</td>
                <td className="py-2 text-right">
                  <Link
                    href={`/expenses/${expense.id}/edit`}
                    className="mr-3 text-sm text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}