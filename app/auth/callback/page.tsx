"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const [error, setError] = useState("");

  useEffect(() => {
    const completeConfirmation = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        setError("El enlace de confirmaci\u00f3n no es v\u00e1lido o ya fue utilizado.");
        return;
      }

      const { error: exchangeError } = await getSupabase().auth.exchangeCodeForSession(code);
      if (exchangeError) {
        setError("No pudimos completar la confirmaci\u00f3n. El enlace puede haber vencido o ya fue utilizado.");
        return;
      }

      window.location.replace("/beta?cuenta=confirmada");
    };

    void completeConfirmation();
  }, []);

  if (error) {
    return (
      <main className="beta-shell beta-loading">
        <div>
          <h1>No pudimos confirmar el acceso</h1>
          <p>{error}</p>
          <Link href="/beta">Volver e ingresar</Link>
        </div>
      </main>
    );
  }

  return <main className="beta-shell beta-loading">Confirmando tu cuenta y preparando tu billetera segura...</main>;
}
