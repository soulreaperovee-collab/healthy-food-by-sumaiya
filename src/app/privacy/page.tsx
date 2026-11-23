export default function PrivacyPolicy() {
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
                <h2 className="text-xl font-heading">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground">Healthy Food by Sumaiya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-heading text-primary mb-6">Privacy Policy</h2>
          <p className="text-sm text-muted-foreground italic mb-6">Last updated: November 2025</p>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-medium text-primary mb-3">1. Introduction</h3>
              <p className="text-sm text-muted-foreground">
                Healthy Food by Sumaiya (&ldquo;we&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or place orders.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">2. Information We Collect</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Name, phone number, and delivery address</li>
                <li>Order history and payment records</li>
                <li>Communications with customer support</li>
                <li>Website usage data (cookies and analytics)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">3. How We Use Your Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Process and fulfill your orders</li>
                <li>Coordinate delivery with our logistics partners</li>
                <li>Respond to customer inquiries</li>
                <li>Send order updates and promotional offers (with consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">4. Data Security</h3>
              <p className="text-sm text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction. All data is stored securely using Supabase infrastructure.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">5. Sharing Your Information</h3>
              <p className="text-sm text-muted-foreground">
                We do not sell, rent, or share your personal information with third parties except:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside mt-2">
                <li>Delivery partners to fulfill your orders</li>
                <li>Service providers who assist our operations (with confidentiality agreements)</li>
                <li>When required by law</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">6. Your Rights</h3>
              <p className="text-sm text-muted-foreground">
                You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@healthyfood.com.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">7. Cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, though this may affect some website functionality.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">8. Changes to This Policy</h3>
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">9. Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                For questions about this Privacy Policy, contact us at: info@healthyfood.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        © 2025 Healthy Food by Sumaiya. All rights reserved.
      </footer>
    </div>
  );
}