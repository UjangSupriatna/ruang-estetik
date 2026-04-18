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
  title: "Ruangan Elegan - Jasa Desain Interior & Bangunan Profesional",
  description:
    "Jasa desain interior dan bangunan profesional. Kami mengubah ruangan impian Anda menjadi kenyataan dengan desain yang elegan dan fungsional.",
  keywords: [
    "desain interior",
    "jasa bangunan",
    "renovasi rumah",
    "arsitek",
    "interior design",
    "konstruksi",
    "konsultasi desain",
  ],
  authors: [{ name: "Ruangan Elegan" }],
  openGraph: {
    title: "Ruangan Elegan - Jasa Desain Interior & Bangunan",
    description:
      "Mengubah ruangan impian Anda menjadi kenyataan dengan desain yang elegan dan fungsional.",
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
