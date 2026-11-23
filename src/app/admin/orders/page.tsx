'use client';

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AdminOrders() {
  const orders = [
    { id: "1", customer_name: "Rahim Ahmed", phone: "01700123456", district: "Dhaka", total: 1250, status: "delivered", created_at: "2025-11-15", payment_method: "cod" },
    { id: "2", customer_name: "Karim Hossain", phone: "01800654321", district: "Chittagong", total: 890, status: "shipped", created_at: "2025-11-18", payment_method: "bkash" },
    { id: "3", customer_name: "Sultana Begum", phone: "01900987654", district: "Dhaka", total: 450, status: "preparing", created_at: "2025-11-20", payment_method: "nagad" },
    { id: "4", customer_name: "Tariq Rahman", phone: "01900112233", district: "Dhaka", total: 670, status: "pending", created_at: "2025-11-22", payment_method: "cod" },
  ];

  const statuses = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">District</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Payment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Created</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customer_name}</td>
                  <td className="px-6 py-4">{order.district}</td>
                  <td className="px-6 py-4 text-lg font-medium text-primary">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statuses.indexOf(order.status) * 10} bg-gray-100 text-gray-700`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/orders/${order.id}`} className="text-xs text-primary hover:underline">View</Link>
                      <Button size="sm" variant="ghost" className="text-xs">Update</Button>
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