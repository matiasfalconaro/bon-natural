import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import LayoutContent from "@/components/layout-content";
import type { Metadata } from "next";

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
          <AuthProvider>
            <CartProvider>
              <LayoutContent>{children}</LayoutContent>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
