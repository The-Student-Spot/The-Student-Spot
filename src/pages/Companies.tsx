import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Briefcase, Users, Award, TrendingUp, Target,
  ArrowRight, CheckCircle, Building, Zap
} from "lucide-react";

const Companies = () => {
  const benefits = [
    {
      icon: Users,
      title: "Pre-Screened, Project-Ready Talent",
      description: "Candidates were trained through workshops, live projects, and real execution challenges.",
    },
    {
      icon: Briefcase,
      title: "Freelance & On-Demand Talent",
      description: "Access students and professionals for: digital marketing campaigns, web & app development, UI/UX design, content & branding, research & data tasks, sales & operations support. Perfect for short-term, high-impact work without long-term hiring commitments.",
    },
    {
      icon: Target,
      title: "Corporate Project Outsourcing",
      description: "Assign pilot projects, MVP builds, marketing experiments, research studies, and operational tasks to vetted student teams or startups within TSS. Lower cost. Faster execution. High energy.",
    },
    {
      icon: Award,
      title: "Employer Branding & Campus Authority",
      description: "Position your company as a preferred employer through workshops, hackathons, mentorship sessions, and campus branding drives.",
    },
    {
      icon: TrendingUp,
      title: "Future Talent Pipeline",
      description: "Identify high-potential candidates early and nurture them for long-term roles.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Briefcase className="w-4 h-4" />
                For Companies, Recruiters & Startups
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Hire Talent. Execute Faster.
                <br />
                <span className="text-gradient">Grow Smarter</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8"
              >
                We don’t send random resumes.
                We build execution ecosystems. The Student Spot connects you with trained, tested,
                project-ready students and professionals while also enabling startup collaborations,
                freelance execution, corporate partnerships, and investor access.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Hire Through TSS <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">Post Opportunities</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">Why Organisations Choose TSS</h3>
                <div className="space-y-4">
                  {[
                    "20,000+ skilled students & early professionals",
                    "Active presence across 100+ campuses",
                    "Students complete real projects before applying",
                    "Built-in proof-of-work system",
                    "50% faster time-to-hire",
                    "Access to startup founders & freelance teams",
                    "Corporate–startup collaboration pipeline",
                    "We don’t just help you hire.",
                    "We help you build capacity.",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What You <span className="text-gradient">Get</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              More than a job portal, a structured growth pipeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Options */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Hiring <span className="text-gradient">Options</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Internships", desc: "Short-term projects with enthusiastic learners", icon: Users },
              { title: "Full-time Hires", desc: "Job-ready graduates for permanent positions", icon: Briefcase },
              { title: "Campus Events", desc: "Hackathons, workshops, and branding sessions", icon: Award },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl p-8 lg:p-16 text-center border border-border mt-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Find talent that is actually ready to work.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Start Hiring <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/auth">Post a Job</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Companies;