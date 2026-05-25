import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prism Audio Labs — Professional Audio Plugins",
    template: "%s | Prism Audio Labs",
  },
  description: "74 instruments and effects forged at the intersection of analog circuitry, spectral synthesis, and world musical heritage. 14 collections. Coming 2026.",
  metadataBase: new URL("https://prismaudiolabs.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prismaudiolabs.co",
    siteName: "Prism Audio Labs",
    title: "Prism Audio Labs — Professional Audio Plugins",
    description: "74 instruments and effects forged at the intersection of analog circuitry, spectral synthesis, and world musical heritage. 14 collections. Coming 2026.",
    images: [
      {
        url: "/plugins/Dragonbreath_Pedal.png",
        width: 1200,
        height: 630,
        alt: "Prism Audio Labs — Dragonbreath Plugin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism Audio Labs — Professional Audio Plugins",
    description: "74 instruments and effects at the intersection of analog circuitry, spectral synthesis, and world musical heritage. Coming 2026.",
    images: ["/plugins/Dragonbreath_Pedal.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "audio plugins",
    "VST3",
    "AU",
    "synthesizer",
    "effects",
    "world instruments",
    "physical modeling",
    "macOS",
    "music production",
    "Prism Audio Labs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased grain`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
