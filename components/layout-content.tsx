"use client";

import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // or your loading spinner
  }

  if (!user) {
    return <main>{children}</main>; // Login page without Header/Footer
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
