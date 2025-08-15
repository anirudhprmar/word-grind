import "~/styles/globals.css";

import { type Metadata } from "next";
import {Playfair_Display } from "next/font/google";

// two different fonts

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: {
    default: 'WordGrind - Unlock Your Ultimate Vocabulary ',
    template: '%s | WordGrind'
  },
  description: "Tired of fumbling for the right words? WordGrind turns every page into a vocabulary victory with smart, personalized AI-powered learning. Master English fluency and boost your confidence.",
   keywords: [
    'vocabulary app','vocabulary builder','English vocabulary','AI tutor','language learning app','learn new words','English fluency',
    'English learning','personalized learning','smart vocabulary practice','AI language coach','word mastery','grow your vocabulary','interactive learning','education app','English quiz','practice English conversation','advanced vocabulary','effective language learning','AI-powered education','English speaking app','AI learning platform'
  ],
  metadataBase: new URL('https://wordgrind.top/'),
  alternates: {
    canonical: '/',
  },
  //   icons: {
    //   icon: '/favicon.ico',
    //   shortcut: '/favicon-16x16.png',
    //   apple: '/apple-touch-icon.png',
    // },
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wordgrind.top/',
    title: 'WordGrind - Unlock Your Ultimate Vocabulary',
    description: 'Tired of fumbling for the right words? WordGrind turns every page into a vocabulary victory with smart, personalized AI-powered learning. Master English fluency and boost your confidence.',
    siteName: 'WordGrind',
    // images: [
    //   {
    //     url: '/images/careerLogo.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Careerspring Solutions HR Services',
    //   },
    // ],
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
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
