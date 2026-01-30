import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Replix - AI Content Repurposing Platform",
    template: "%s | Replix",
  },
  description:
    "Transform one piece of content into 30+ platform-optimized outputs with AI. Save hours of content creation time.",
  keywords: [
    "content repurposing",
    "AI content",
    "social media automation",
    "content marketing",
    "repurpose content",
  ],
  authors: [{ name: "Replix" }],
  openGraph: {
    title: "Replix - AI Content Repurposing Platform",
    description:
      "Transform one piece of content into 30+ platform-optimized outputs with AI.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Replix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Replix - AI Content Repurposing Platform",
    description:
      "Transform one piece of content into 30+ platform-optimized outputs with AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
