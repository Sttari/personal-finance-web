"use client";

import { useState } from "react";
import { ExpenseFormData } from "@/lib/types";

interface ExpenseFormProps {
  initial?: ExpenseFormData;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  submitLabel: string;
}

const today = () => new Date().toISOString().slice(0, 10);

export function ExpenseForm({ initial, onSubmit, submitLabel }: ExpenseFormProps) {
  const [amount, setAmount] = useState(initial?.amount.toString() ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await onSubmit({
        amount: Number(amount),
        category,
        description,
        date,
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
        <label className="mb-1 block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
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
        <label className="mb-1 block text-sm font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={200}
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
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