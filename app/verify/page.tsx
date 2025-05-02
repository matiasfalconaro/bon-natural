"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`http://localhost:5100/api/auth/verify?token=${token}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then(async (res) => {
        const text = await res.text();
        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          console.error("Verify failed:", res.status, text);
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("Verify request failed:", err);
        setStatus("error");
      });
  }, [token, router]);

  return (
    <div style={{ padding: "2rem", textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      {status === "verifying" && (
        <>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Verifying your email...</h1>
          <p>Please wait while we confirm your account.</p>
          <div className="spinner" style={{ marginTop: "1.5rem" }} />
        </>
      )}

      {status === "success" && (
        <>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>✅ Email Verified!</h1>
          <p>You'll be redirected to the login page shortly.</p>
          <Button onClick={() => router.push("/login")} className="mt-4">Go to Login</Button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>❌ Verification Failed</h1>
          <p>This link may have expired or is invalid.</p>
          <Button onClick={() => router.push("/register")} className="mt-4">Back to Register</Button>
        </>
      )}
    </div>
  );
}
