import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ruangan Elegan - Jasa Desain Interior & Bangunan | Bandung",
  description:
    "Jasa desain interior dan bangunan profesional di Bandung. Wujudkan ruangan impian Anda dengan desain yang elegan dan fungsional. Konsultasi gratis!",
  keywords: [
    "desain interior",
    "jasa bangunan",
    "renovasi rumah",
    "arsitek",
    "interior design",
    "konstruksi",
    "konsultasi desain",
    "Bandung",
    "Jawa Barat",
  ],
  authors: [{ name: "Ruangan Elegan" }],
  openGraph: {
    title: "Ruangan Elegan - Jasa Desain Interior & Bangunan | Bandung",
    description:
      "Wujudkan ruangan impian Anda dengan desain yang elegan dan fungsional. Berdiri sejak 2020.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
