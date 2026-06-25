import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-twin-portfolio-weld-nu.vercel.app"),
  title: "Jesus M. De Leon | Analytics Engineer and BI Leader",
  description:
    "Analytics Engineer and BI leader with 17+ years of experience building production data pipelines, SQL optimization, and executive dashboards for multi-billion dollar programs.",
  openGraph: {
    title: "Jesus M. De Leon | Analytics Engineer and BI Leader",
    description:
      "Building production data systems for capital planning, executive BI, and operational decision support.",
    type: "website",
    images: [
      {
        url: "/profile.jpeg",
        width: 1024,
        height: 1024,
        alt: "Jesus M. De Leon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus M. De Leon | Analytics Engineer and BI Leader",
    description:
      "Building production data systems for capital planning, executive BI, and operational decision support.",
    images: [
      {
        url: "/profile.jpeg",
        width: 1024,
        height: 1024,
        alt: "Jesus M. De Leon",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesus M. De Leon",
  jobTitle: "Analytics Engineer and BI Leader",
  url: "https://digital-twin-portfolio-weld-nu.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/jesus-m-de-leon-7a019b1b",
    "https://github.com/ChuLion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#0b0d10] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
