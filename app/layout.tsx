import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import LayoutContent from "@/components/layout-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bon Natural",
  description: "Discover our curated selection of organic, sustainable, and locally-sourced natural foods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider> {/* ⬅️ outer */}
            <AuthProvider> {/* ⬅️ now safe to call useCart() here */}
              <LayoutContent>{children}</LayoutContent>
              <Toaster />
            </AuthProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
