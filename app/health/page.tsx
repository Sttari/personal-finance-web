"use client";

import { use, useEffect, useState } from "react";
import { config } from "@/lib/config";

// This page is used to check if the API is reachable and healthy. It can be used for monitoring or debugging purposes.
export default function HealthPage() {
    const [status, setStatus] = useState<string>("Checking...");

    useEffect(() => {
        fetch(`${config.apiBaseUrl}/health`)
            .then((res) => res.json())
            .then((data) => setStatus(data.status))
            .catch(() => setStatus("error"));   
    }, []);

    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">API Health</h1>
          <p className="mt-4 text-lg">Status: {status}</p>
        </div>
      </main>
  );
}