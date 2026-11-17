import ProductPageView from "@/components/products/ProductPageView";
import { consumablesPage, productMetadata } from "@/lib/products";

export const metadata = productMetadata(consumablesPage, "/products/consumables");

export default function ConsumablesPage() {
  return (
    <ProductPageView
      page={consumablesPage}
      crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: consumablesPage.crumb }]}
    />
  );
}
