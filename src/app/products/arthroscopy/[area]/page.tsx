import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageView from "@/components/products/ProductPageView";
import { arthroscopyAreas, productMetadata } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return arthroscopyAreas.map((a) => ({ area: a.slug }));
}

function find(slug: string) {
  return arthroscopyAreas.find((a) => a.slug === slug);
}

export async function generateMetadata(props: PageProps<"/products/arthroscopy/[area]">): Promise<Metadata> {
  const { area } = await props.params;
  const a = find(area);
  return a ? productMetadata(a.page, `/products/arthroscopy/${a.slug}`) : {};
}

export default async function ArthroscopyAreaPage(props: PageProps<"/products/arthroscopy/[area]">) {
  const { area } = await props.params;
  const a = find(area);
  if (!a) notFound();

  return (
    <ProductPageView
      page={a.page}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Arthroscopy", href: "/products/arthroscopy" },
        { label: a.page.crumb },
      ]}
      systems={arthroscopyAreas.map((x) => ({ label: x.label, href: `/products/arthroscopy/${x.slug}`, current: x.slug === a.slug }))}
      systemsLabel="Arthroscopy"
    />
  );
}
