import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Building2, Users, Award, Calendar, TrendingUp,
  ArrowRight, CheckCircle, Globe, Briefcase, Zap, Rocket, LineChart, Target, MonitorPlay, ShieldCheck
} from "lucide-react";

const Colleges = () => {
  const whyPartner = [
    { metric: "40%+", label: "Improvement in placement outcomes" },
    { metric: "2x", label: "Increase in industry exposure" },
    { metric: "100+", label: "Partner campuses across India" },
  ];

  const partnerFeatures = [
    "Structured startup & incubation pathways",
    "Corporate & consulting partnerships",
    "National ecosystem visibility"
  ];

  const whatWeBring = [
    {
      icon: Target,
      title: "1. Placement Acceleration System",
      subtitle: "We focus on employability, not just eligibility.",
      points: [
        "Direct hiring connections with companies & startups",
        "Internship pipelines across industries",
        "Pre-screened candidate preparation",
        "Resume & interview readiness programs",
        "On-campus hiring drives"
      ]
    },
    {
      icon: Users,
      title: "2. Campus Chapters & Leadership",
      subtitle: "Students don’t just attend events; they run ecosystems.",
      points: [
        "Official TSS Campus Chapter",
        "Trained student leaders",
        "Structured monthly activities",
        "Event execution & management exposure",
        "Leadership & communication growth"
      ]
    },
    {
      icon: Rocket,
      title: "3. Startup & Incubation Support",
      subtitle: "Transform your campus into an innovation hub.",
      points: [
        "Startup Awareness: Founder talks, bootcamps, and idea validation",
        "Incubation Support: Business model and MVP guidance",
        "Corporate Projects: Pilot tasks for real-world validation",
        "Mentors: Direct access to industry leaders and founders",
        "Investor Access: Connect with strategic partners and clients"
      ]
    },
    {
      icon: Briefcase,
      title: "4. Industry & Founder Integration",
      subtitle: "Bridge the academic-industry gap with structured exposure.",
      points: [
        "Regular industry workshops",
        "HR & recruiter sessions",
        "Consulting-based problem solving",
        "Real-time case challenges",
        "Hackathons & innovation drives"
      ]
    },
    {
      icon: Award,
      title: "5. Skill Certification & Proof of Work",
      subtitle: "Students graduate with experience, not just marksheets.",
      points: [
        "Co-branded certifications",
        "Live project execution",
        "Portfolio development",
        "Internship completion proofs",
        "Startup participation credentials"
      ]
    },
    {
      icon: Globe,
      title: "6. Pan-India Exposure",
      subtitle: "Your students compete and collaborate beyond regional limits.",
      points: [
        "National competitions",
        "Inter-college collaborations",
        "Cross-campus innovation networks",
        "Access to broader hiring ecosystem"
      ]
    }
  ];

  const partnershipProcess = [
    { step: "01", title: "Connect", description: "Understand your campus goals, placement data, and startup vision." },
    { step: "02", title: "Customise", description: "Design a structured ecosystem model tailored to your institution." },
    { step: "03", title: "Activate", description: "Launch the TSS Campus Chapter and rollout placement + startup programs." },
    { step: "04", title: "Scale", description: "Introduce incubation pathways, corporate tie-ups, and advanced collaborations." },
  ];

  const longTermImpact = [
    "Higher placement rates",
    "Stronger campus reputation",
    "Active startup culture",
    "Industry-integrated curriculum support",
    "Increased student satisfaction",
    "Improved admission attractiveness"
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold mb-8 tracking-wide uppercase border border-secondary/20 shadow-sm"
          >
            <Building2 className="w-4 h-4" />
            For Colleges & Institutions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight max-w-5xl mx-auto"
          >
            Transform Your Campus Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Career & Startup Hub</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto space-y-2"
          >
            <p className="font-semibold text-foreground">A college is not just a place for degrees.</p>
            <p>It’s a launchpad for careers, founders, and industry leaders.</p>
            <p className="pt-4 text-base opacity-90">
              The Student Spot partners with institutions to build a Student-to-Founder Ecosystem
              inside campuses—combining placements, skill development, startup incubation, and real
              industry integration.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="secondary" size="lg" className="h-14 px-8 text-lg shadow-lg shadow-secondary/20" asChild>
              <Link to="/contact">
                Partner With Us <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-secondary/50 hover:bg-secondary/10" asChild>
              <a href="mailto:contact.thestudentspot@gmail.com">Schedule a Strategy Call</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Leading Colleges <span className="text-secondary">Partner With TSS</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 pb-6 border-b border-border">
                We don’t just conduct events.<br />
                <span className="font-bold text-foreground">We build systems that create measurable outcomes.</span>
              </p>

              <div className="space-y-4">
                {partnerFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-lg font-medium text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {whyPartner.map((item, index) => (
                <div key={item.label} className={`bg-card rounded-3xl p-8 border border-border shadow-xl hover:-translate-y-1 transition-transform ${index === 2 ? 'sm:col-span-2' : ''}`}>
                  <div className={`font-heading text-5xl font-extrabold mb-4 ${index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-success'}`}>
                    {item.metric}
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Bring */}
      <section className="py-20 lg:py-32 bg-accent/50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              What We Bring to <span className="text-gradient">Your Campus</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive ecosystem designed to elevate your institution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeBring.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border shadow-md hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary transition-all duration-300">
                  <item.icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-secondary font-medium mb-6 italic">{item.subtitle}</p>
                <ul className="space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary/70 shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
              How the Partnership <span className="text-secondary">Works</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-border rounded-full z-0">
              <div className="h-full bg-gradient-to-r from-secondary/50 to-primary/50 w-full rounded-full opacity-50"></div>
            </div>

            {partnershipProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 text-center flex flex-col items-center group"
              >
                <div className="w-24 h-24 rounded-full bg-background border-4 border-card shadow-xl flex items-center justify-center font-heading font-extrabold text-3xl text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed px-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Term Impact */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-6">
                The Long-Term Impact
              </h2>
              <p className="text-xl text-muted-foreground font-medium mb-10 pl-6 border-l-4 border-secondary/50">
                Colleges known for outcomes attract better students.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {longTermImpact.map((impact) => (
                  <div key={impact} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-foreground">{impact}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card shadow-xl rounded-3xl p-10 border border-border text-center lg:text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 space-y-3 relative z-10">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <CheckCircle className="w-8 h-8 text-primary" /> Build Professionals.
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <CheckCircle className="w-8 h-8 text-secondary" /> Build Founders.
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <CheckCircle className="w-8 h-8 text-success" /> Build Innovation.
                </div>
              </h3>
              <p className="text-xl text-muted-foreground italic max-w-sm mx-auto lg:mx-0 relative z-10">
                "Build More Than Graduates."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-secondary to-blue-900 rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Decorative circles */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-[50px]"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[50px]"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
                Let’s prepare students for careers, startups, and leadership, not just exams.
              </h2>
              <Button variant="outline" size="xl" className="h-16 px-10 text-xl rounded-full shadow-xl bg-white text-secondary hover:bg-gray-100 hover:text-secondary border-none hover:scale-105 transition-transform mt-8" asChild>
                <Link to="/contact">
                  Start the Partnership Conversation <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Colleges;