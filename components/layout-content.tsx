"use client";

import { useAuth } from "@/contexts/auth-context";
import { useSyncCartWithUser } from "@/hooks/use-sync-cart-with-user"
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  useSyncCartWithUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
