import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GoCanopy Intelligence Playground | AI-Powered Real Estate Analysis",
  description: "Experience compounding institutional intelligence. Upload real estate documents and watch AI extract, analyze, and generate actionable insights in real-time.",
  keywords: ["real estate", "AI", "institutional investing", "data analysis", "GoCanopy"],
  authors: [{ name: "GoCanopy" }],
  openGraph: {
    title: "GoCanopy Intelligence Playground",
    description: "Transform scattered real estate data into institutional intelligence with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}