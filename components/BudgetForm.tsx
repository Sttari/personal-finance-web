"use client";

import { useState } from "react";
import { BudgetFormData } from "@/lib/types";

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => Promise<void>;
  submitLabel: string;
}

export function BudgetForm({ onSubmit, submitLabel }: BudgetFormProps) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await onSubmit({
        category,
        limit: Number(limit),
        period,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-md space-y-4 px-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          maxLength={50}
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Limit</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Period</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full rounded border bg-white px-3 py-2"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}