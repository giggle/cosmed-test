import ProductPageView from "@/components/products/ProductPageView";
import { hipPage, productMetadata } from "@/lib/products";

export const metadata = productMetadata(hipPage, "/products/hip");

export default function HipPage() {
  return (
    <ProductPageView
      page={hipPage}
      crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: hipPage.crumb }]}
    />
  );
}
