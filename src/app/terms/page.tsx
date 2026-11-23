export default function TermsOfService() {
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
                <h2 className="text-xl font-heading">Terms of Service</h2>
                <p className="text-sm text-muted-foreground">Healthy Food by Sumaiya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-heading text-primary mb-6">Terms of Service</h2>
          <p className="text-sm text-muted-foreground italic mb-6">Last updated: November 2025</p>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-medium text-primary mb-3">1. Agreement to Terms</h3>
              <p className="text-sm text-muted-foreground">
                By accessing or using Healthy Food by Sumaiya&rsquo;s website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">2. Use License</h3>
              <p className="text-sm text-muted-foreground">
                Permission is granted to temporarily use the website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">3. Product Information</h3>
              <p className="text-sm text-muted-foreground">
                We strive to provide accurate product descriptions, prices, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Images are for representation only.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">4. Order Acceptance</h3>
              <p className="text-sm text-muted-foreground">
                Your order is an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including availability, errors in pricing, or suspected fraud.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">5. Pricing and Payment</h3>
              <p className="text-sm text-muted-foreground">
                All prices are listed in Bangladeshi Taka (BDT) and include applicable taxes. Payment must be made at the time of delivery or via bKash/Nagad as selected at checkout.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">6. Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Delivery times are estimates and not guarantees. We are not responsible for delays due to weather, traffic, or other circumstances beyond our control.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">7. Returns and Refunds</h3>
              <p className="text-sm text-muted-foreground">
                If you receive damaged or incorrect items, please contact us within 24 hours of delivery. We will arrange a replacement or refund as appropriate.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">8. Intellectual Property</h3>
              <p className="text-sm text-muted-foreground">
                All content on this website, including text, images, logos, and design, is the property of Healthy Food by Sumaiya and is protected by copyright laws.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">9. Limitation of Liability</h3>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">10. Governing Law</h3>
              <p className="text-sm text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of Bangladesh.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-3">11. Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                For questions about these Terms, contact us at: info@healthyfood.com
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