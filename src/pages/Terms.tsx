import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 16, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="container relative mx-auto max-w-5xl px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Legal Terms & Trust
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-orange-500 to-secondary bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Effective Date: 1 May 2026
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              By accessing or using The Student Spot (“TSS”, “we”, “our”, or “us”) platform, website, communities, or services, you agree to comply with and be bound by these Terms of Service.
            </p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              If you do not agree with these terms, please do not use our services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                title: "1. Use of Services",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">The Student Spot provides access to:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Internship and job opportunities</li>
                      <li>Freelance project connections</li>
                      <li>Workshops, events, and bootcamps</li>
                      <li>Startup support and incubation exposure</li>
                      <li>Mentorship and networking opportunities</li>
                      <li>CSR, institutional, and ecosystem collaborations</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      We act as a facilitator and ecosystem enabler, not a service provider guaranteeing outcomes.
                    </p>
                  </>
                ),
              },
              {
                title: "2. User Responsibilities",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">By using our platform, you agree to:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Provide accurate and truthful information</li>
                      <li>Use the platform for lawful and intended purposes only</li>
                      <li>Not misuse, exploit, or attempt to manipulate opportunities</li>
                      <li>Avoid spamming, unauthorized promotions, or harmful activities</li>
                      <li>Respect other users, partners, and community guidelines</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      Violation of these terms may result in account suspension or removal.
                    </p>
                  </>
                ),
              },
              {
                title: "3. No Guarantee of Outcomes",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      The Student Spot connects users with opportunities but does not guarantee outcomes.
                    </p>
                    <p className="mt-4 mb-4 text-muted-foreground">We do not guarantee:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Job or internship placement</li>
                      <li>Selection in programs or events</li>
                      <li>Startup funding or investment</li>
                      <li>Business success or revenue generation</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      All final decisions are made by companies, recruiters, investors, or partners.
                    </p>
                  </>
                ),
              },
              {
                title: "4. Fees & Refund Policy",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">Certain programs, events, or services may be paid.</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Refund eligibility will be specified for each program or offering</li>
                      <li>No refunds will be issued after access has been granted, unless clearly stated</li>
                      <li>Administrative or processing fees may be non-refundable</li>
                      <li>Refund requests must be submitted via email</li>
                    </ul>
                    <p className="mt-4 font-semibold text-foreground">contact.thestudentspot@gmail.com</p>
                    <p className="mt-4 text-muted-foreground">
                      Each program may have separate refund terms, which will override general conditions.
                    </p>
                  </>
                ),
              },
              {
                title: "5. Funding & Investment Disclaimer",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">The Student Spot may enable:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Startup pitch sessions</li>
                      <li>Founder exposure opportunities</li>
                      <li>Community-based funding participation</li>
                    </ul>
                    <p className="mt-4 mb-4 text-muted-foreground">However:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>We are not a registered investment advisory firm</li>
                      <li>We do not provide financial, legal, or investment advice</li>
                      <li>Any funding or investment participation is voluntary and independent</li>
                      <li>All investment decisions are made at the user’s own discretion</li>
                      <li>Startup investments involve risk, including potential loss of capital</li>
                      <li>Users are strongly advised to consult licensed financial advisors before making investment decisions.</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "6. Intellectual Property",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      All content, branding, logos, materials, and systems associated with The Student Spot are protected intellectual property.
                    </p>
                    <p className="mt-4 mb-4 text-muted-foreground">You may not:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Copy, reproduce, or distribute content</li>
                      <li>Use branding without permission</li>
                      <li>Modify or exploit platform materials</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">Without prior written consent.</p>
                  </>
                ),
              },
              {
                title: "7. Limitation of Liability",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">The Student Spot is not liable for:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Loss of job or internship opportunities</li>
                      <li>Startup or business losses</li>
                      <li>Investment losses</li>
                      <li>Third-party actions or decisions</li>
                      <li>Indirect or consequential damages</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">All participation is voluntary and at your own risk.</p>
                  </>
                ),
              },
              {
                title: "8. Modifications to Services & Terms",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">We reserve the right to:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Modify services, programs, or features</li>
                      <li>Update policies or terms</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      Continued use of the platform after updates indicates acceptance of revised terms.
                    </p>
                  </>
                ),
              },
              {
                title: "9. Governing Law",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      These Terms of Service are governed by the laws of India.
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      Any disputes will be subject to the jurisdiction of courts in Hyderabad, India.
                    </p>
                  </>
                ),
              },
              {
                title: "10. Contact Us",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">For legal, policy, or service-related queries:</p>
                    <div className="space-y-2 text-muted-foreground">
                      <p>contact.thestudentspot@gmail.com</p>
                      <p>Location: Hyderabad, India</p>
                    </div>
                  </>
                ),
              },
            ].map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8"
              >
                <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    {section.title}
                  </span>
                </h2>
                <div className="space-y-4 text-base leading-relaxed md:text-lg">
                  {section.children}
                </div>
              </motion.section>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  The Student Spot
                </div>
                <p className="text-xl font-semibold text-foreground md:text-2xl">
                  Building India&apos;s Students to Founders Ecosystem
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;