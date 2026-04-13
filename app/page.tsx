"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/lib/token";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!tokenStorage.get());
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold">Personal Finance</h1>
      {loggedIn ? (
        <div className="mt-8 space-y-2">
          <Link href="/expenses" className="block text-blue-600">
            View expenses
          </Link>
          <Link href="/budgets" className="block text-blue-600">
            View budgets
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-2">
          <Link href="/login" className="block text-blue-600">
            Log in
          </Link>
          <Link href="/register" className="block text-blue-600">
            Register
          </Link>
        </div>
      )}
    </main>
  );
}