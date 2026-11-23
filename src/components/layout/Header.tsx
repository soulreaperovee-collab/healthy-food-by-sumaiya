import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-bold text-primary">
            Healthy Food
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-secondary transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-secondary transition-colors">
              Categories
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-secondary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              Cart
            </Button>
            <Button variant="primary" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}