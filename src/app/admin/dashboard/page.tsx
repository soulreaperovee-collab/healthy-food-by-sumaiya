'use client';

import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const orders = [
    { id: "1", customer_name: "Rahim Ahmed", phone: "01700123456", district: "Dhaka", total: 1250, status: "delivered", created_at: "2025-11-15", payment_method: "cod" },
    { id: "2", customer_name: "Karim Hossain", phone: "01800654321", district: "Chittagong", total: 890, status: "shipped", created_at: "2025-11-18", payment_method: "bkash" },
    { id: "3", customer_name: "Sultana Begum", phone: "01900987654", district: "Dhaka", total: 450, status: "preparing", created_at: "2025-11-20", payment_method: "nagad" },
  ];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Stats */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Order Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">12</p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">৳{formatPrice(1890)}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground mb-3">Recent Orders</p>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-md border-border hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h2a2 2 0 002 2v6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9v2m0 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}