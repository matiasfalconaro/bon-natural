"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { JSX } from "react";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (isLoading || !user) return null;

    return <Component {...props} />;
  };
}

/**
withAuth HOC
This is currently unused in the MVP architecture.
All authentication and route protection are centrally managed inside `LayoutContent`.
- This HOC can be used in the future to provide fine-grained access control
- on a per-page/component basis without relying on shared layout logic.
 */