import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export default async function ProductTestPage() {
  const products = await getAllProducts();
  const p = products[0];

  return (
    <div className="p-6">
      <div className="max-w-xl">
        <ProductCard product={p} />
      </div>
    </div>
  );
}
