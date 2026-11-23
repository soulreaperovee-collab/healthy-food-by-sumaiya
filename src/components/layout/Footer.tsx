import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold">Healthy Food</h3>
            <p className="mt-2 text-sm opacity-80">
              Pure Goodness. Naturally Yours.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Shop</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/products" className="hover:underline">All Products</Link></li>
              <li><Link href="/categories" className="hover:underline">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Support</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/shipping" className="hover:underline">Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}