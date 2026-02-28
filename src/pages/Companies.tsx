import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Briefcase, Users, Award, TrendingUp, Target,
  ArrowRight, CheckCircle, Building, Zap, Rocket, LineChart, ShieldCheck, Globe
} from "lucide-react";

const Companies = () => {
  const whyChooseTss = [
    "20,000+ skilled students & early professionals",
    "Active presence across 100+ campuses",
    "Students complete real projects before applying",
    "Built-in proof-of-work system",
    "50% faster time-to-hire",
    "Access to startup founders & freelance teams",
    "Corporate–startup collaboration pipeline",
  ];

  const whatYouGet = [
    {
      icon: ShieldCheck,
      title: "Pre-Screened, Project-Ready Talent",
      description: "Candidates were trained through workshops, live projects, and real execution challenges.",
      points: []
    },
    {
      icon: Zap,
      title: "Freelance & On-Demand Talent",
      description: "Access students and professionals for:",
      points: [
        "Digital marketing campaigns",
        "Web & app development",
        "UI/UX design",
        "Content & branding",
        "Research & data tasks",
        "Sales & operations support"
      ],
      footer: "Perfect for short-term, high-impact work without long-term hiring commitments."
    },
    {
      icon: Target,
      title: "Corporate Project Outsourcing",
      description: "Companies can assign pilot projects, MVP builds, marketing experiments, research studies, and operational tasks to vetted student teams or startups within TSS.",
      footer: "Lower cost. Faster execution. High energy."
    },
    {
      icon: Award,
      title: "Employer Branding & Campus Authority",
      description: "Position your company as a preferred employer through workshops, hackathons, mentorship sessions, and campus branding drives.",
      points: []
    },
    {
      icon: TrendingUp,
      title: "Future Talent Pipeline",
      description: "Identify high-potential candidates early and nurture them for long-term roles.",
      points: []
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
        {/* Dynamic Background Blurs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm mx-auto lg:mx-0"
              >
                <Briefcase className="w-4 h-4" />
                For Companies, Recruiters & Startups
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-[1.1]"
              >
                Hire Talent.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Execute Faster.</span><br />
                Grow Smarter.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 space-y-3"
              >
                <p className="font-bold text-foreground text-xl">We don’t send random resumes.</p>
                <p className="text-primary font-semibold text-2xl">We build execution ecosystems.</p>
                <p className="pt-2">
                  The Student Spot connects you with trained, tested, project-ready students and
                  professionals while also enabling startup collaborations, freelance execution, corporate
                  partnerships, and investor access.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button variant="hero" size="xl" className="h-16 px-10 text-lg shadow-xl shadow-primary/25 rounded-full hover:scale-105 transition-transform" asChild>
                  <Link to="/contact">
                    Hire Through TSS <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="h-16 px-10 text-lg rounded-full border-primary/30 hover:bg-primary/5" asChild>
                  <Link to="/opportunities">Post Opportunities</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] transform rotate-3 scale-105 blur-sm opacity-50"></div>
                <div className="bg-card rounded-[2.5rem] p-10 shadow-2xl border border-border/50 relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg">
                    <Rocket className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Build Capacity.</h3>
                  <p className="text-muted-foreground mb-8 text-lg font-medium">Faster time-to-hire. Verified skills.</p>

                  <div className="space-y-4">
                    {whyChooseTss.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-muted/30 p-3 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Organisations Choose TSS (Full List) */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/10 uppercase tracking-widest">
                <Building className="w-4 h-4" />
                The TSS Advantage
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                Why Organisations <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Choose TSS</span>
              </h2>
              <p className="text-xl text-white/80 font-medium mb-8">
                We don’t just help you hire.<br />
                <span className="text-white font-bold text-2xl">We help you build capacity.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
            >
              {whyChooseTss.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 lg:py-32 bg-accent/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What You <span className="text-gradient">Get</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium px-6 py-3 bg-card rounded-full inline-block border border-border shadow-sm">
              More than a job portal, a structured growth pipeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatYouGet.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-[2rem] p-8 border border-border shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-sm relative z-10">
                  <benefit.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                <h3 className="font-heading font-bold text-2xl text-foreground mb-4 relative z-10 leading-snug">{benefit.title}</h3>

                <p className="text-muted-foreground mb-6 relative z-10 text-lg">{benefit.description}</p>

                {benefit.points && benefit.points.length > 0 && (
                  <ul className="space-y-3 mb-6 relative z-10 flex-grow">
                    {benefit.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                        <span className="text-foreground font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {benefit.footer && (
                  <div className="mt-auto pt-6 border-t border-border/60 relative z-10">
                    <p className="text-primary font-bold">{benefit.footer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-primary/20"
          >
            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">Lower cost. Faster execution. High energy.</span>
                <br className="hidden md:block" /> Start Building Today.
              </h2>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Button variant="hero" size="xl" className="h-16 px-10 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
                  <Link to="/contact">
                    Hire Talent <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="h-16 px-10 text-xl rounded-full border-white/50 text-white hover:bg-white hover:text-primary transition-colors" asChild>
                  <Link to="/opportunities">Post a Project</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Companies;