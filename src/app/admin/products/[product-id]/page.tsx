'use client';

export default function AdminProductDetail() {
  const product = {
    id: "1",
    name: "Organic Basmati Rice",
    slug: "organic-basmati-rice",
    category: "Grains & Pulses",
    price: 45000, // in paisa
    compare_at_price: 55000, // in paisa
    stock: 50,
    is_active: true,
    is_organic: true,
    is_featured: true,
    sku: "RB-001",
    description: "Premium quality organic basmati rice from Bangladesh.",
    short_description: "Organic Basmati Rice - 5kg pack, premium quality.",
    images: [
      "/images/product-1.jpg",
      "/images/product-3.jpg",
      "/images/product-4.jpg",
    ],
  };

  const categories = [
    { value: "grains-pulses", label: "Grains & Pulses" },
    { value: "honey-sweeteners", label: "Honey & Sweeteners" },
    { value: "spices", label: "Spices" },
    { value: "teas-beverages", label: "Teas & Beverages" },
  ];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          <h3 className="text-lg font-medium text-primary">Product Details</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Name:</p>
              <input type="text" defaultValue={product.name} className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SKU:</p>
              <p className="text-lg font-medium text-primary">{product.sku}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category:</p>
              <select className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} defaultValue={product.category === cat.value ? cat.value : ''}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price:</p>
              <input type="number" defaultValue={(product.price / 100).toString()} className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Compare At:</p>
              <input type="number" defaultValue={(product.compare_at_price / 100).toString()} className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock:</p>
              <input type="number" defaultValue={product.stock.toString()} className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Is Organic:</p>
              <input type="radio" name="is_organic" defaultChecked={product.is_organic} className="rounded" />
              <span className="text-sm text-green-600">Yes</span>
              <input type="radio" name="is_organic" className="rounded" />
              <span className="text-sm text-red-600">No</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Is Active:</p>
              <input type="radio" name="is_active" defaultChecked={product.is_active} className="rounded" />
              <span className="text-sm text-primary">Yes</span>
              <input type="radio" name="is_active" className="rounded" />
              <span className="text-sm text-red-600">No</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Is Featured:</p>
              <input type="radio" name="is_featured" defaultChecked={product.is_featured} className="rounded" />
              <span className="text-sm text-yellow-600">Yes</span>
              <input type="radio" name="is_featured" className="rounded" />
              <span className="text-sm text-red-600">No</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}