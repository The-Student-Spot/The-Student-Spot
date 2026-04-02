import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 18, 2024</p>

          <div className="space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using this platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="leading-relaxed">
                Our platform provides educational and career development services connecting students, colleges, companies, and coaching institutes. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="leading-relaxed mb-4">When you create an account with us, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the service</li>
                <li>Attempt to gain unauthorized access to any systems</li>
                <li>Upload viruses or malicious code</li>
                <li>Collect user information without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="leading-relaxed">
                The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
              <p className="leading-relaxed">
                You retain ownership of any content you submit to the platform. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                The service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold us harmless from any claims, damages, losses, liabilities, and expenses arising out of your use of the service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;