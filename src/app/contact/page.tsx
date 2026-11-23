import Link from "next/link";

export default function Contact() {
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
                <h2 className="text-xl font-heading">Contact Us</h2>
                <p className="text-sm text-muted-foreground">Healthy Food by Sumaiya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-heading text-primary mb-6">Get in Touch</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary">Full Name</label>
                  <input type="text" required className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary">Email</label>
                  <input type="email" required className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary">Phone</label>
                  <input type="tel" className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary">Subject</label>
                  <input type="text" required className="w-full rounded-md border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary">Message</label>
                  <textarea rows={4} required className="w-full rounded-md border-border px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                </div>
                <button type="submit" className="w-full py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Phone: +880 1XXXXXXXX</p>
                    <p className="text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6M9 17h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Email: info@healthyfood.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6M9 17h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Address: House 123, Road 4, Block D, Dhaka-1212, Bangladesh</p>
                  </div>
                </div>
              </div>
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