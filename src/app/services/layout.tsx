import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "COSMED Assist in-theatre support, COSMED Academy clinical training, direct field sales, and a managed distributor network for medical devices across Nigeria.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Medical Device Services — COSMED Assist & Academy",
    description:
      "In-theatre clinical support, surgical education, direct hospital supply, and distributor partnerships across Nigeria.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
