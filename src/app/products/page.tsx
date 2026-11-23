import { getProducts, getCategories } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default async function Products() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col">
      <section className="relative bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-primary">All Products</h1>
          <p className="mt-2 text-lg text-muted-foreground">Explore our premium organic selection</p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="sr-only">Sort by</label>
              <select className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {products.length} products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group cursor-pointer rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center">
                  <span className="text-2xl opacity-60">{product.name.charAt(0)}</span>
                </div>
                <h3 className="mt-3 font-medium text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-medium text-primary hover:underline">View Details</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}