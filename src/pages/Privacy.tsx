import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

const Privacy = () => {
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
              Privacy & Protection
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-orange-500 to-secondary bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Effective Date: 1 May 2026
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              The Student Spot ("TSS", "we", "our", or "us") respects your privacy and is committed to protecting your personal information.
            </p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform, website, communities, programs, and services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                title: "1. Information We Collect",
                children: (
                  <>
                    <p className="mb-3 font-medium text-foreground">a. Personal Information</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>College or organization details</li>
                      <li>Resume or portfolio information</li>
                      <li>Social media profiles</li>
                    </ul>

                    <p className="mb-3 mt-6 font-medium text-foreground">b. Professional Information</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Career interests</li>
                      <li>Skills and qualifications</li>
                      <li>Startup ideas (if submitted)</li>
                      <li>Participation in programs, internships, or events</li>
                    </ul>

                    <p className="mb-3 mt-6 font-medium text-foreground">c. Technical Information</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>IP address</li>
                      <li>Device information</li>
                      <li>Browser type</li>
                      <li>Website usage data (analytics)</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "2. How We Use Your Information",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">We use your information to:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Provide internships, jobs, and freelance opportunities</li>
                      <li>Connect users with companies, startups, mentors, and incubators</li>
                      <li>Enable collaborations across the ecosystem</li>
                      <li>Improve platform features, services, and programs</li>
                      <li>Send updates about events, opportunities, and announcements</li>
                      <li>Process registrations, applications, and participation</li>
                      <li>Track outcomes and impact for CSR, institutional, and ecosystem partnerships</li>
                    </ul>
                    <p className="mt-4 font-semibold text-foreground">We do not sell your personal data.</p>
                  </>
                ),
              },
              {
                title: "3. Information Sharing",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">We may share relevant information with:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Hiring companies and recruiters (for job or internship applications)</li>
                      <li>Startup founders and teams (for collaboration opportunities)</li>
                      <li>Colleges and institutional partners</li>
                      <li>CSR organizations and government bodies (for reporting and impact tracking)</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      We only share necessary and relevant information to enable opportunities and collaborations.
                    </p>
                  </>
                ),
              },
              {
                title: "4. Data Security",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      We implement reasonable technical and organizational measures to protect your data from unauthorized access, misuse, or loss.
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      However, no digital platform can guarantee complete security. By using our platform, you acknowledge this risk.
                    </p>
                  </>
                ),
              },
              {
                title: "5. Your Rights",
                children: (
                  <>
                    <p className="mb-4 text-muted-foreground">You have the right to:</p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Access the data we hold about you</li>
                      <li>Request correction of inaccurate or incomplete information</li>
                      <li>Request deletion of your account and data</li>
                      <li>Opt out of non-essential communications</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      To make any request, contact us at: contact.thestudentspot@gmail.com
                    </p>
                  </>
                ),
              },
              {
                title: "6. Third-Party Links",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      Our platform may include links to third-party websites, tools, or partners.
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      We are not responsible for the privacy practices or policies of these external platforms.
                    </p>
                  </>
                ),
              },
              {
                title: "7. Updates to This Policy",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      We may update this Privacy Policy from time to time.
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Any changes will be reflected by updating the Effective Date at the top of this page.
                    </p>
                  </>
                ),
              },
              {
                title: "8. Contact Us",
                children: (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      For any privacy-related questions or concerns:
                    </p>
                    <div className="mt-4 space-y-2 text-muted-foreground">
                      <p>Email: contact.thestudentspot@gmail.com</p>
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

export default Privacy;