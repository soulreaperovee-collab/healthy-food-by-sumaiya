'use client';

import { useState } from "react";

import Link from "next/link";
import { useRouter } from 'next/navigation';

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "M3 3a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V3z" },
  { href: "/admin/products", label: "Products", icon: "M21 8l-9-5-9 5v8l9 5 9-5V8z" },
  { href: "/admin/categories", label: "Categories", icon: "M7 7h10l4 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2z" },
  { href: "/admin/orders", label: "Orders", icon: "M21 8L9 4l5 5L21 8z" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-heading text-2xl font-bold">
              Healthy Food
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm opacity-90">Admin Panel</span>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Administrator</p>
                  <p className="text-xs opacity-80">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary/20 hover:bg-primary/30 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-card border-r border-border ${sidebarOpen ? 'w-64' : 'w-16'} transition-all`}>
          <nav className="flex flex-col h-full">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border-r-4 ${sidebarOpen ? 'border-transparent text-muted-foreground' : 'border-primary text-primary'}`}
                onMouseEnter={() => setSidebarOpen(true)}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className={sidebarOpen ? 'truncate' : 'sr-only'}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}