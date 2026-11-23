import { getProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-medium text-accent">
                Premium Organic
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
                Pure Goodness. Naturally Yours.
              </h1>
              <p className="mt-4 text-lg opacity-90">
                Discover hand-picked organic groceries delivered fresh to your door in Bangladesh.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="primary" className="bg-accent text-primary hover:bg-accent/90">
                  Shop Now
                </Button>
                <Button size="lg" variant="secondary" className="border border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Categories
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-primary">Featured Products</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}