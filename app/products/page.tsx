import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Products • Three Eagles Forge Studio",
  description: "Tools, guides, and APIs from 3EF.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  const ordered = [...products].sort((a, b) => {
    // available first, then alpha by title
    if (a.status !== b.status) return a.status === "available" ? -1 : 1;
    return a.title.localeCompare(b.title);
  });

  if (!ordered.length) {
    return (
      <div className="py-12 px-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-muted-foreground mt-2">
          Nothing here yet—check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="text-muted-foreground max-w-2xl">
          A growing collection of utilities, guides, and APIs. External checkout via Payhip or RapidAPI.
        </p>
      </header>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
