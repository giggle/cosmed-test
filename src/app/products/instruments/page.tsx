import ProductPageView from "@/components/products/ProductPageView";
import { instrumentsPage, productMetadata } from "@/lib/products";

export const metadata = productMetadata(instrumentsPage, "/products/instruments");

export default function InstrumentsPage() {
  return (
    <ProductPageView
      page={instrumentsPage}
      crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: instrumentsPage.crumb }]}
    />
  );
}
