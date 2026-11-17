import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse COSMED Surgicals' catalog of knee, hip, spine, and trauma implants, surgical instruments, capital equipment (CAPEX), and consumables for Nigerian hospitals and surgeons.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Medical Devices & Implants Catalog",
    description:
      "Knee, hip, spine, and trauma implants plus surgical instruments, operating tables, and consumables — supplied across Nigeria.",
    url: "/products",
  },
};

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
