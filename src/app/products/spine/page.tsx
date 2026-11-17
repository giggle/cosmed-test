import ProductPageView from "@/components/products/ProductPageView";
import { spinePage, productMetadata } from "@/lib/products";

export const metadata = productMetadata(spinePage, "/products/spine");

export default function SpinePage() {
  return (
    <ProductPageView
      page={spinePage}
      crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: spinePage.crumb }]}
    />
  );
}
