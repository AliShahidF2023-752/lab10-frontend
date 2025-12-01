import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Simple BMI Calculator built with Next.js and Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        {children}
      </body>
    </html>
  );
}
