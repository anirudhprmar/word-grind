import "~/styles/globals.css";

import { type Metadata } from "next";
import {Playfair_Display,Open_Sans,Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

// two different fonts

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: 'WordGrind - Unlock Your Ultimate Vocabulary ',
    template: '%s | WordGrind'
  },
  description: "Master English vocabulary with WordGrind—AI-powered, personalized learning for fluency, confidence, and smarter language skills.",
   keywords: [
    'vocabulary app','vocabulary builder','English vocabulary','AI tutor','language learning app','learn new words','English fluency',
    'English learning','personalized learning','smart vocabulary practice','AI language coach','word mastery','grow your vocabulary','interactive learning','education app','English quiz','practice English conversation','advanced vocabulary','effective language learning','AI-powered education','English speaking app','AI learning platform'
  ],
  metadataBase: new URL('https://wordgrind.top/'),
  alternates: {
    canonical: '/',
  },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wordgrind.top/',
    title: 'WordGrind - Unlock Your Ultimate Vocabulary',
    description: 'Tired of fumbling for the right words? WordGrind turns every page into a vocabulary victory with smart, personalized AI-powered learning. Master English fluency and boost your confidence.',
    siteName: 'WordGrind',
    images: [
      {
        url: '/wordgrindLogo.png',
        width: 1200,
        height: 630,
        alt: 'wordgrind logo, a cartoon with pencil in one hand and surrounded by a letter A',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google:"RhnCnxHUunw9s6ILoA43GjIy2yesLXm6ScL79s3-c4A",
  },
};


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

   const jsonLd = 
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wordgrind",
  "url": "https://wordgrind.top",
  "description": "Master English vocabulary with WordGrind—AI-powered, personalized learning for fluency, confidence, and smarter language skills.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "softwareVersion": "1.0.0",
  "offers": {
    "@type": "Offer",
    "price": "9.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "AI-powered vocabulary learning",
    "Personalized quizzes and word collections",
    "Unlimited AI conversations",
    "Learn and grow with the community",
    "Track progress with detailed insights"
  ],
}


  return (
    <html lang="en" className={`${playfair.className} ${openSans.className} ${lora.className}`} suppressHydrationWarning>
      <body>
          <Providers>
        <TRPCReactProvider>
            {children}
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          <Analytics />
        </TRPCReactProvider>
          </Providers>
      </body>
    </html>
  );
}
