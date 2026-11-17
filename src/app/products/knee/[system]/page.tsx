import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageView from "@/components/products/ProductPageView";
import { kneeSystems, productMetadata } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return kneeSystems.map((s) => ({ system: s.slug }));
}

function find(slug: string) {
  return kneeSystems.find((s) => s.slug === slug);
}

export async function generateMetadata(props: PageProps<"/products/knee/[system]">): Promise<Metadata> {
  const { system } = await props.params;
  const s = find(system);
  return s ? productMetadata(s.page, `/products/knee/${s.slug}`) : {};
}

export default async function KneeSystemPage(props: PageProps<"/products/knee/[system]">) {
  const { system } = await props.params;
  const s = find(system);
  if (!s) notFound();

  return (
    <ProductPageView
      page={s.page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Knee", href: "/products/knee" },
        { label: s.page.crumb },
      ]}
      systems={kneeSystems.map((k) => ({ label: k.label, href: `/products/knee/${k.slug}`, current: k.slug === s.slug }))}
    />
  );
}
