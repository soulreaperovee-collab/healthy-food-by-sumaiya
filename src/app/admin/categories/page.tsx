'use client';

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AdminCategories() {
  const categories = [
    { id: "1", name: "Grains & Pulses", slug: "grains-pulses", sort_order: 1, products_count: 12 },
    { id: "2", name: "Honey & Sweeteners", slug: "honey-sweeteners", sort_order: 2, products_count: 8 },
    { id: "3", name: "Spices", slug: "spices", sort_order: 3, products_count: 15 },
    { id: "4", name: "Teas & Beverages", slug: "teas-beverages", sort_order: 4, products_count: 6 },
  ];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Sort Order</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Products</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-primary">{category.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{category.slug}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{category.sort_order}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{category.products_count}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/categories/${category.id}`} className="text-xs text-primary hover:underline">Edit</Link>
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