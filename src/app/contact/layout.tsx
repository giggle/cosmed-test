import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact COSMED Surgicals for medical device quotes, distributor partnerships, and institutional supply contracts. Offices in Lagos, Abuja, Jos, Kano, and Enugu.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact COSMED Surgicals",
    description:
      "Reach a COSMED territory representative for implant quotes, demos, and supply enquiries. Response within one business day.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
