import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { ProviderSession } from "@/components/ProviderSession";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.senthales.com"),
  title: {
    default: "Senthales - Supermarché en ligne au Sénégal",
    template: "%s | Senthales",
  },
  description: "Faites vos courses en ligne au Sénégal avec Senthales. Large choix de produits alimentaires, boissons, produits locaux et plus encore. Livraison rapide et service de qualité.",
  keywords: [
    "supermarché en ligne Sénégal",
    "courses en ligne Dakar",
    "épicerie en ligne",
    "produits alimentaires Sénégal",
    "riz sénégalais",
    "huile végétale",
    "boissons",
    "pâtes alimentaires",
    "fruits et légumes",
    "viandes",
    "produits locaux",
    "épicerie sucrée",
    "épicerie salée",
    "produits bébé",
    "biscuits",
    "confiserie",
    "livraison courses",
    "supermarché Dakar",
    "alimentation en ligne",
    "produits sénégalais"
  ],
  authors: [{ name: "Senthales" }],
  creator: "Senthales",
  publisher: "Senthales",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.senthales.com",
    siteName: "Senthales",
    title: "Senthales - Votre supermarché en ligne au Sénégal",
    description: "Faites vos courses en ligne au Sénégal avec Senthales. Large choix de produits alimentaires, boissons, produits locaux et plus encore. Livraison rapide et service de qualité.",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Senthales - Supermarché en ligne au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senthales - Votre supermarché en ligne au Sénégal",
    description: "Faites vos courses en ligne au Sénégal avec Senthales. Large choix de produits alimentaires, boissons, produits locaux et plus encore.",
    images: ["/favicon.png"],
    creator: "@senthales",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google",
    yandex: "votre-code-verification-yandex",
    yahoo: "votre-code-verification-yahoo",
  },
  alternates: {
    canonical: "https://www.senthales.com",
    languages: {
      "fr-FR": "https://www.senthales.com",
    },
  },
  category: "shopping",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.png",
    },
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFCD00" },
    { media: "(prefers-color-scheme: dark)", color: "#142A4E" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ProviderSession>
          <Toaster />
          <div>
            <Header />
            <Hero />
            <Navbar />
          </div>
          {children}
          <Footer />
        </ProviderSession>
      </body>
    </html>
  );
}
