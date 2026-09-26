import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { getSiteSettings } from "@/lib/api";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  const title = settings?.seo_title || "Century Imagery | Cinematic Digital Media & Creative Direction";
  const description = settings?.seo_description || "A Nigerian creative digital media and cinematography brand focused on commercial videography, brand campaign films, fashion visuals, music visualizers, and visual storytelling.";
  const keywords = settings?.site_description || "Century Imagery, Cinematography Nigeria, Commercial Videography, Creative Direction Lagos, Brand Campaign Films, Editorial Visuals, Music Visualizers, Nigerian Media Production";
  
  return {
    metadataBase: new URL("https://centuryimagery.com"),
    title,
    description,
    keywords,
    authors: [{ name: settings?.site_name || "Century Imagery" }],
    creator: settings?.site_name || "Century Imagery",
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: "https://centuryimagery.com",
      title,
      description,
      siteName: settings?.site_name || "Century Imagery",
      images: settings?.seo_image_url ? [{ url: settings.seo_image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: settings?.seo_image_url ? [{ url: settings.seo_image_url }] : [],
    },
    icons: {
      icon: settings?.favicon_url || "/favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${figtree.className} bg-brand-black text-brand-cream font-sans antialiased selection:bg-brand-gold selection:text-brand-black min-h-screen`}
      >
        <NextTopLoader color="#dcb450" showSpinner={true} shadow="0 0 10px #dcb450,0 0 5px #dcb450" />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#f8f8f2',
              border: '1px solid rgba(220, 180, 80, 0.4)',
              fontFamily: 'var(--font-figtree)',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#dcb450',
                secondary: '#0a0a0a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0a0a0a',
              }
            }
          }} 
        />
        {children}
      </body>
    </html>
  );
}
