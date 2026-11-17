import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PdfMode from "@/components/PdfMode";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { basePath } from "@/lib/image-loader";

const isTestDeploy = basePath !== "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Medical Devices & Implants in Nigeria`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Medical Devices",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Medical Devices & Implants in Nigeria`,
    description:
      "Specialist distributor of knee, hip, spine, trauma implants, surgical instruments, and consumables for hospitals and surgeons across Nigeria.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — medical device and implant distributor`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Medical Devices & Implants in Nigeria`,
    description:
      "Specialist distributor of knee, hip, spine, trauma implants, and surgical consumables in Nigeria.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  robots: {
    // The GitHub Pages copy is a test deploy — keep it out of search results.
    index: !isTestDeploy,
    follow: !isTestDeploy,
    googleBot: {
      index: !isTestDeploy,
      follow: !isTestDeploy,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>
        <JsonLd />
        <PdfMode />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
