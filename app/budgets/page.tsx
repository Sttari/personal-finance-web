"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import { tokenStorage } from "@/lib/token";
import { Budget } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { ProgressBar } from "@/components/ProgressBar";

export default function BudgetsPage() {
  const router = useRouter();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenStorage.get()) {
      router.push("/login");
      return;
    }

    api<Budget[]>("/api/budgets")
      .then((data) => setBudgets(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          tokenStorage.clear();
          router.push("/login");
        } else {
          setError("Failed to load budgets");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this budget?")) return;
    try {
      await api(`/api/budgets/${id}`, { method: "DELETE" });
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budgets</h1>
        <Link
          href="/budgets/new"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          New budget
        </Link>
      </div>

      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets yet.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="rounded border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h2 className="font-medium">{budget.category}</h2>
                  <p className="text-sm text-blue-500">{budget.period}</p>
                </div>
                <button
                  onClick={() => handleDelete(budget.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
              <ProgressBar value={budget.spent} max={budget.limit} />
              <p className="mt-2 text-sm text-gray-600">
                {formatMoney(budget.spent)} of {formatMoney(budget.limit)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}