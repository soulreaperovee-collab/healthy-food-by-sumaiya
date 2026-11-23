'use client';

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AdminProducts() {
  const products = [
    { id: "1", name: "Organic Basmati Rice", price: 450, stock: 50, is_active: true, is_organic: true, is_featured: true, compare_at_price: 550, sku: "RB-001" },
    { id: "2", name: "Organic Honey", price: 320, stock: 30, is_active: true, is_organic: true, is_featured: false, compare_at_price: undefined, sku: "HB-001" },
    { id: "3", name: "Organic Lentils", price: 180, stock: 20, is_active: true, is_organic: true, is_featured: false, compare_at_price: undefined, sku: "LB-001" },
  ];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Product</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Compare At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-primary">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sku}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Organic Foods</td>
                  <td className="px-6 py-4 text-sm text-primary">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.compare_at_price ? formatPrice(product.compare_at_price) : '-'}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${product.is_active ? 'bg-secondary text-primary-foreground' : 'bg-red-100 text-red-700'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`} className="text-xs text-primary hover:underline">Edit</Link>
                      <Button size="sm" variant="ghost" className="text-xs">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}