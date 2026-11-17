import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about COSMED Surgicals — Nigeria's bridge to world-class medical devices. Specialist distribution of orthopaedic implants, surgical instruments, and theatre support across Abuja, Lagos, Kano, Jos, and Enugu.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About COSMED Surgicals",
    description:
      "Nigeria's specialist medical device distributor connecting international manufacturers with hospitals, surgeons, and clinics.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
