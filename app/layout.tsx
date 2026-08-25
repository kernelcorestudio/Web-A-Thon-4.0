import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "NIRVAN '26 | Annual College Technical Fest | GEHU Campus",
  description:
    "NIRVAN '26 — Where Ideas Become Innovations. The flagship Annual College Technical Fest at Graphic Era Hill University (GEHU Campus). 48-Hour Hackathon, ₹5 Lakh+ Prize Pool, Tech Competitions.",
  keywords: [
    "NIRVAN 26",
    "GEHU",
    "Graphic Era Hill University",
    "College Fest",
    "Technical Fest",
    "Hackathon",
    "Developers",
    "Designers",
    "Technology",
    "Innovation",
    "Dehradun",
  ],
  openGraph: {
    title: "NIRVAN '26 — Where Ideas Become Innovations",
    description:
      'Annual College Technical Fest at Graphic Era Hill University (GEHU Campus). Join 3,000+ developers, designers, and innovators.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
