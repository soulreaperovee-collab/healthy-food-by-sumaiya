import Link from "next/link";

export default function ShippingInfo() {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6M9 17h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-heading">Shipping Information</h2>
                <p className="text-sm text-muted-foreground">Healthy Food by Sumaiya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-heading text-primary mb-6">Delivery & Shipping</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Delivery Zones */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Delivery Zones</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Dhaka Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Chittagong Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Rajshahi Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Khulna Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Barisal Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Sylhet Division
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4" />
                  </svg>
                  Rangpur Division
                </li>
              </ul>
            </div>

            {/* Delivery Times */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Delivery Time</h3>
              <p className="text-sm text-muted-foreground">Standard delivery within Dhaka: 1-2 business days</p>
              <p className="text-sm text-muted-foreground">Division delivery: 3-5 business days</p>
              <p className="text-sm text-muted-foreground">Delivery hours: 9:00 AM - 8:00 PM daily</p>
            </div>

            {/* Delivery Charges */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Delivery Charges</h3>
              <p className="text-sm text-primary mb-2">Free delivery on orders above ৳500</p>
              <p className="text-sm text-muted-foreground">Standard delivery: ৳50</p>
              <p className="text-sm text-muted-foreground">Division delivery: ৳100 - ৳200</p>
            </div>

            {/* Payment Options */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Payment Methods</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 21h-6v-2h6v2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 15h3v3h-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9h3v3h-3z" />
                  </svg>
                  Cash on Delivery
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-3L12 23v-2m3.86-5H21M3 10h9M3 14h9M3 18h9" />
                  </svg>
                  bKash
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-3L12 23v-2m3.86-5H21M3 10h9M3 14h9M3 18h9" />
                  </svg>
                  Nagad
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        © 2025 Healthy Food by Sumaiya. All rights reserved.
      </footer>
    </div>
  );
}