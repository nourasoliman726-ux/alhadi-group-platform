import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: "الهادي جروب - خدمات الصيانة والمقاولات",
  description: "شركة الهادي جروب للصيانة الفنية والمقاولات وخدمات التوظيف",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-arabic antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}