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

export const metadata: Metadata = {
  metadataBase: new URL("https://centuryimagery.com"),
  title: "Century Imagery | Cinematic Digital Media & Creative Direction",
  description:
    "A Nigerian creative digital media and cinematography brand focused on commercial videography, brand campaign films, fashion visuals, music visualizers, and visual storytelling.",
  keywords: [
    "Century Imagery",
    "Cinematography Nigeria",
    "Commercial Videography",
    "Creative Direction Lagos",
    "Brand Campaign Films",
    "Editorial Visuals",
    "Music Visualizers",
    "Nigerian Media Production",
  ],
  authors: [{ name: "Century Imagery" }],
  creator: "Century Imagery",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://centuryimagery.com",
    title: "Century Imagery | Cinematic Digital Media & Creative Direction",
    description:
      "Cinematic storytelling for brands, artists & culture. Commercial videography, campaign films, editorial visuals.",
    siteName: "Century Imagery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Century Imagery | Cinematic Storytelling",
    description: "Cinematic storytelling for brands, artists & culture.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

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
        {children}
      </body>
    </html>
  );
}
