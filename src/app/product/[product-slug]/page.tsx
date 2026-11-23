import Link from "next/link";

import { formatPrice } from "@/lib/utils";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const products = [
    { id: "1", name: "Organic Basmati Rice", slug: "organic-basmati-rice", price: 450, unit: "5 kg", sku: "RB-001", is_organic: true, description: "Premium quality organic basmati rice from Bangladesh." },
    { id: "2", name: "Organic Honey", slug: "organic-honey", price: 320, unit: "500g", sku: "HB-001", is_organic: true, description: "Pure organic honey from natural sources." },
    { id: "3", name: "Organic Lentils", slug: "organic-lentils", price: 180, unit: "1 kg", sku: "LB-001", is_organic: true, description: "Organic red lentils, rich in protein." },
    { id: "4", name: "Organic Tea", slug: "organic-tea", price: 280, unit: "250g", sku: "TB-001", is_organic: true, description: "Organic green tea leaves." },
    { id: "5", name: "Organic Spices", slug: "organic-spices", price: 120, unit: "100g", sku: "SB-001", is_organic: true, description: "Premium organic spice blend." },
    { id: "6", name: "Fresh Vegetables Mix", slug: "fresh-vegetables-mix", price: 350, unit: "1 kg", sku: "VB-001", is_organic: true, description: "Fresh organic vegetables." },
    { id: "7", name: "Organic Flour", slug: "organic-flour", price: 110, unit: "1 kg", sku: "FB-001", is_organic: true, description: "Organic whole wheat flour." },
    { id: "8", name: "Organic Sugar", slug: "organic-sugar", price: 95, unit: "1 kg", sku: "GB-001", is_organic: true, description: "Organic cane sugar." },
  ];

  const product = products.find(p => p.slug === slug);
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-heading">Product Not Found</h1>
        <Link href="/products" className="mt-4 text-primary hover:underline">
          Go Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex-1">
              <div className="aspect-video rounded-lg bg-muted mb-6 flex items-center justify-center">
                <span className="text-4xl opacity-30">{product.name.charAt(0)}</span>
              </div>
              <h1 className="text-4xl font-heading text-foreground">
                {product.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Premium quality {product.name.toLowerCase().replace(/[-_]/g, ' ')}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-accent-foreground">
                  {product.is_organic ? '🌱 Organic' : '🏷️ Conventional'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.unit} • ৳{formatPrice(product.price)}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a href="/cart" className="flex items-center gap-2 bg-accent text-primary-foreground px-4 py-2 rounded-md hover:bg-accent/90">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 21h-6v-2h6v2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 15h3v3h-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9h3v3h-3z" />
                  </svg>
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading text-primary mb-6">Product Details</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
              <p className="text-lg text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <div className="w-full md:w-1/2">
                  <p className="text-lg font-medium">Category:</p>
                  <span className="text-sm text-muted-foreground">
                    Organic Foods
                  </span>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-lg font-medium">SKU:</p>
                  <span className="text-sm text-muted-foreground">
                    {product.sku}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}