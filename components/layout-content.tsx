"use client";

import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSyncCartWithUser } from "@/hooks/use-sync-cart-with-user";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useSyncCartWithUser();

  useEffect(() => {
    if (!isLoading && !user) {
      const publicPaths = ["/login", "/register", "/forgot-password"];
      if (!publicPaths.includes(pathname)) {
        router.push("/login");
      }
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return null;
  }

  const publicPaths = ["/login", "/register", "/forgot-password"];
  const isPublicPage = publicPaths.includes(pathname);

  if (!user && !isPublicPage) {
    return null;
  }

  return (
    <>
      {user && <Header />}
      <main>{children}</main>
      {user && <Footer />}
    </>
  );
}
