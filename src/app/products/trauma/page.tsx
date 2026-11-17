import ProductPageView from "@/components/products/ProductPageView";
import { traumaPage, productMetadata } from "@/lib/products";

export const metadata = productMetadata(traumaPage, "/products/trauma");

export default function TraumaPage() {
  return (
    <ProductPageView
      page={traumaPage}
      crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: traumaPage.crumb }]}
    />
  );
}
