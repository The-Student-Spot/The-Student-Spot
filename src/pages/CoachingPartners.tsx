import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, TrendingUp, Target, Award,
  CheckCircle, ArrowRight, Building2, Megaphone,
  BarChart3, Handshake, Globe, Rocket, MonitorPlay, Briefcase
} from "lucide-react";

const CoachingPartners = () => {
  const whyPartner = [
    "Access to 20,000+ motivated students",
    "Presence across 100+ campuses",
    "Direct reach into student communities",
    "Campus ambassadors promoting your programs",
    "High-intent student traffic",
    "Measurable ROI campaigns",
    "National-level digital visibility",
  ];

  const whatYouGain = [
    {
      icon: Users,
      title: "Structured Student Acquisition",
      description: "Instead of random marketing, you get:",
      points: [
        "Filtered leads based on interests",
        "Career-focused student segmentation",
        "Targeted promotion campaigns",
        "City-wise and domain-wise visibility"
      ]
    },
    {
      icon: TrendingUp,
      title: "Revenue Expansion Models",
      description: "Multiple avenues to grow top-line revenue:",
      points: [
        "Exclusive Training Partner allocations",
        "Certification Collaboration",
        "Paid Bootcamps",
        "Scholarship Campaigns"
      ]
    },
    {
      icon: Award,
      title: "Campus-Level Brand Authority",
      description: "Position your institute as the go-to skill and official prep partner through:",
      points: [
        "Workshops & Orientation sessions",
        "Career seminars",
        "Placement readiness programs"
      ]
    },
    {
      icon: Globe,
      title: "Digital & Community Distribution",
      description: "Your programs reach students directly, not passively through:",
      points: [
        "WhatsApp & Telegram communities",
        "LinkedIn & Instagram promotions",
        "Email marketing & Campus ambassadors"
      ]
    },
    {
      icon: Briefcase,
      title: "Placement & Industry Linkages",
      description: "For skill-based or job-oriented training institutes:",
      points: [
        "Connect trained students to companies within TSS",
        "Participate in hiring drives",
        "Offer placement-backed programs"
      ],
      footer: "This increases both trust and enrollments."
    },
    {
      icon: Rocket,
      title: "Long-Term Strategic Benefits",
      description: "Scale your institute sustainably:",
      points: [
        "Access to future campus leaders",
        "Data insights on student demand",
        "Continuous engagement pipeline",
        "National scalability without opening new branches"
      ]
    },
  ];

  const whoCanPartner = [
    { title: "Government Exam Preparation", desc: "UPSC, SSC, Banking, Railways, State Exams", icon: Building2 },
    { title: "IT & Emerging Tech", desc: "AI, Data Science, Full Stack, Cloud, Cybersecurity", icon: MonitorPlay },
    { title: "Competitive Exams", desc: "CAT, GATE, GRE, GMAT, IELTS", icon: Target },
    { title: "Professional Skill Training", desc: "Communication, Sales, HR, Marketing, Analytics", icon: Award },
    { title: "Entrepreneurship Training", desc: "Founder programs, business skills, incubation prep", icon: Rocket },
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
                <Building2 className="w-4 h-4" />
                For Coaching Institutes
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-[1.1]"
              >
                Don’t Just Run Courses.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Build National Presence.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 space-y-3"
              >
                <p className="font-bold text-foreground text-xl">The Student Spot is not just a promotion channel.</p>
                <p className="text-primary font-semibold text-2xl">It’s a distribution ecosystem for your institute.</p>
                <p className="pt-2">
                  We connect you with thousands of career-focused students, campus leaders, and early
                  professionals actively seeking guidance, certifications, and structured growth.
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
                    Become a Strategic Partner <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="h-16 px-10 text-lg rounded-full border-primary/30 hover:bg-primary/5" asChild>
                  <Link to="/get-involved">Explore Growth Models</Link>
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
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Strategic Growth.</h3>

                  <div className="space-y-4">
                    {whyPartner.slice(0, 4).map((item, i) => (
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

      {/* Why Forward-Thinking Institutes Partner With TSS */}
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
                <Megaphone className="w-4 h-4" />
                The TSS Advantage
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                Why Forward-Thinking <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Institutes Partner</span>
              </h2>
              <p className="text-xl text-white/80 font-medium mb-8">
                We don’t just increase inquiries.<br />
                <span className="text-white font-bold text-2xl">We help you increase conversions and long-term credibility.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
            >
              {whyPartner.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Actually Gain */}
      <section className="py-24 lg:py-32 bg-accent/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What You Actually <span className="text-gradient">Gain</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatYouGain.map((benefit, index) => (
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

                <ul className="space-y-3 mb-6 relative z-10 flex-grow">
                  {benefit.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-foreground font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

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

      {/* Who Can Partner */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Who Can <span className="text-gradient">Partner</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {whoCanPartner.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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

      {/* The Bigger Opportunity CTA */}
      <section className="py-20 lg:py-24 bg-accent/20">
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
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-white/20 shadow-sm">
                The Bigger Opportunity
              </div>

              <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
                Students trust ecosystems <br className="hidden md:block" /> more than ads.
              </h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-3xl mx-auto">
                When you partner with TSS, you become part of their growth journey, not just another institute promotion.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["Scale your visibility.", "Increase quality admissions.", "Build long-term authority."].map((text, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium text-lg">
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button variant="hero" size="xl" className="h-16 px-10 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
                  <Link to="/contact">
                    Apply for Strategic Partnership <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="h-16 px-10 text-xl rounded-full border-white/50 text-white hover:bg-white hover:text-primary transition-colors" asChild>
                  <Link to="/contact">Schedule a Growth Discussion</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CoachingPartners;