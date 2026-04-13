"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/lib/token";

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!tokenStorage.get());
  }, [pathname]);

  const handleLogout = () => {
    tokenStorage.clear();
    setHasToken(false);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-lg font-bold">
        Personal Finance
      </Link>
      <div className="flex gap-4">
        {hasToken ? (
          <button onClick={handleLogout} className="text-sm">
            Log out
          </button>
        ) : (
          <>
            <Link href="/login" className="text-sm">
              Log in
            </Link>
            <Link href="/register" className="text-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}