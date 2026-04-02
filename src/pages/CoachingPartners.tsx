import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight,
  Building2,
  Briefcase,
  Rocket,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const calendlyLink = "https://calendly.com/rajkamalpanthagani/30min";

const stakeholders = [
  "Students",
  "Colleges",
  "Companies",
  "Recruiters",
  "Startups",
  "Incubators",
  "Coaching Institutes",
  "CSR",
  "NGOs",
  "Skill Centers",
];

const problemPoints = [
  "Opportunities are scattered",
  "Students lack direction",
  "Colleges lack industry integration",
  "Companies struggle with job-ready talent",
  "Startups lack execution teams",
  "Training programs lack real outcomes",
];

const whatWeDoPoints = [
  "Students get opportunities",
  "Colleges get outcomes",
  "Companies get talent",
  "Startups get execution",
  "Incubators get founders",
  "CSR gets impact",
];

const partnerSegments = [
  {
    icon: Building2,
    title: "For Colleges",
    subtitle: "Transform Your Campus Into a Career & Startup Hub",
    intro: "A college should not just produce graduates. It should produce professionals, builders, and founders.",
    listTitle: "What We Enable",
    list: [
      "Placement acceleration systems",
      "Internship & hiring pipelines",
      "Campus chapters & student leadership",
      "Startup bootcamps & incubation pathways",
      "Industry workshops & recruiter sessions",
      "Corporate project collaboration",
      "National-level exposure",
    ],
    outcomeTitle: "Outcome",
    outcome: ["Higher placements", "Stronger reputation", "Active startup culture"],
    ctaLine: "Build a future-ready campus.",
    ctaPrimary: { label: "Become a Partner", to: "/contact" },
    ctaSecondary: { label: "Schedule a Meeting", href: calendlyLink },
  },
  {
    icon: Briefcase,
    title: "For Companies & Recruiters",
    subtitle: "Hire Better. Execute Faster. Scale Smarter.",
    intro: "We do not send resumes. We deliver execution-ready talent.",
    listTitle: "What You Get",
    list: [
      "Pre-screened, project-ready candidates",
      "Internship-to-hire pipeline",
      "Freelance & on-demand teams",
      "Corporate project outsourcing",
      "Campus branding & engagement",
      "Early access to top student talent",
    ],
    extraTitle: "Beyond Hiring",
    extra: [
      "Innovation pilots with student startups",
      "Campus research & testing",
      "Talent pipeline building",
    ],
    outcomeTitle: "Outcome",
    outcome: ["Faster hiring", "Lower costs", "Better talent quality"],
    ctaLine: "Build your workforce with precision.",
    ctaPrimary: { label: "Hire Talent", to: "/auth" },
  },
  {
    icon: Rocket,
    title: "For Startups",
    subtitle: "Build Faster. Execute Smarter. Grow Stronger.",
    intro: "Startups do not fail due to a lack of ideas. They fail due to a lack of execution.",
    listTitle: "What You Get",
    list: [
      "Interns, freelancers & early team members",
      "Campus ambassadors & growth teams",
      "Access to companies for pilot projects",
      "Beta testing through student communities",
      "Early traction & validation",
    ],
    extraTitle: "Growth Support",
    extra: [
      "Mentors & strategic advisors",
      "Corporate collaborations",
      "Visibility across campuses",
    ],
    outcomeTitle: "Outcome",
    outcome: ["Faster execution", "Lower burn", "Early revenue opportunities"],
    ctaLine: "Turn ideas into traction.",
    ctaPrimary: { label: "Become a Partner", to: "/contact" },
    ctaSecondary: { label: "Schedule a Meeting", href: calendlyLink },
  },
  {
    icon: GraduationCap,
    title: "For Coaching Institutes",
    subtitle: "Do Not Just Run Courses. Build a National Brand.",
    intro: "Students do not trust ads. They trust ecosystems.",
    listTitle: "What You Get",
    list: [
      "Access to 20,000+ students",
      "High-intent lead generation",
      "Campus activation & ambassadors",
      "Co-branded workshops & programs",
      "Placement-linked training models",
      "Digital distribution across communities",
    ],
    extraTitle: "Growth Engine",
    extra: [
      "Certification collaborations",
      "Bootcamps & scholarship campaigns",
      "Career-focused programs",
    ],
    outcomeTitle: "Outcome",
    outcome: ["More enrollments", "Higher trust", "Stronger brand authority"],
    ctaLine: "Grow with structure. Scale with credibility.",
    ctaPrimary: { label: "Become a Partner", to: "/contact" },
    ctaSecondary: { label: "Schedule a Meeting", href: calendlyLink },
  },
  {
    icon: HeartHandshake,
    title: "For CSR / NGOs / Skill Centers",
    subtitle: "Turn Training Into Real Impact",
    intro: "Training alone does not create change. Outcomes do.",
    transformLine: "We convert: Training -> Employability -> Income -> Entrepreneurship",
    listTitle: "What We Enable",
    list: [
      "Placement & internship pipelines",
      "Resume, interview & portfolio systems",
      "Corporate integration & hiring linkage",
      "Freelance & income opportunities",
      "Micro-entrepreneurship pathways",
      "Startup awareness & incubation readiness",
    ],
    extraTitle: "Impact Tracking",
    extra: ["Employment outcomes", "Income generation", "Startup creation", "Long-term progress"],
    outcomeTitle: "Outcome",
    outcome: ["Measurable impact", "Sustainable livelihoods", "Scalable programs"],
    ctaLine: "Move from activity -> to transformation.",
    ctaPrimary: { label: "Become a Partner", to: "/contact" },
    ctaSecondary: { label: "Schedule a Meeting", href: calendlyLink },
  },
  {
    icon: Lightbulb,
    title: "For Incubators, Accelerators & Innovation Cells",
    subtitle: "Discover the Next Generation of Founders",
    intro: "The next founders are already in classrooms. They just need access and structure.",
    listTitle: "What We Enable",
    list: [
      "Campus startup discovery pipelines",
      "Hackathons, bootcamps & pitch events",
      "Pre-incubation & founder readiness",
      "MVP validation & market testing",
      "Corporate-startup collaboration",
      "Access to student execution teams",
    ],
    extraTitle: "Ecosystem Advantage",
    extra: [
      "Demo days & investor connects",
      "Campus-based user testing",
      "Early traction & validation",
      "Mentor & advisory networks",
    ],
    outcomeTitle: "Outcome",
    outcome: ["Stronger deal flow", "Better founders", "Faster validation"],
    ctaLine: "Build a consistent startup pipeline.",
    ctaPrimary: { label: "Become a Partner", to: "/contact" },
    ctaSecondary: { label: "Schedule a Meeting", href: calendlyLink },
  },
];

const whatMakesDifferent = [
  "Not just a community",
  "Not just a job portal",
  "Not just events",
  "Not just courses",
];

const ecosystemOutcomes = [
  "Students build",
  "Companies hire",
  "Startups grow",
  "Colleges evolve",
  "CSR creates impact",
  "Incubators scale founders",
];

const effectItems = ["Skills", "Network", "Proof of Work", "Opportunity"];

const buildTogether = ["Careers", "Startups", "Opportunities", "Innovation", "Impact"];

const sectionFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const CoachingPartners = () => {
  useEffect(() => {
    document.title = "Ecosystem Partnerships | The Student Spot";
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-6 w-96 h-96 rounded-full bg-secondary/15 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-5">
              <Sparkles className="w-4 h-4" />
              Ecosystem Partnerships
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Ecosystem Partnerships
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-3">
              Build With The Student Spot
            </p>
            <p className="text-lg md:text-xl text-foreground font-medium mb-8">
              India&apos;s Students to Founders Ecosystem
            </p>
            <p className="text-muted-foreground text-lg mb-2">One platform.</p>
            <p className="text-muted-foreground text-lg mb-2">Multiple stakeholders.</p>
            <p className="text-muted-foreground text-lg mb-8">Real outcomes.</p>
            <p className="text-foreground font-medium mb-6">We connect:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {stakeholders.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-lg text-muted-foreground">
              To build careers, startups, income, and impact at scale.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href={calendlyLink} target="_blank" rel="noreferrer">
                  Start the Partnership Conversation <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/auth">Join The Student Spot</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            {...sectionFade}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="group relative overflow-hidden bg-card/95 backdrop-blur-sm border border-primary/15 rounded-3xl p-7 sm:p-8 shadow-card hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 top-0 h-1 gradient-hero" />
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground">Why The Student Spot Exists</h2>
            </div>
            <p className="text-muted-foreground mb-2">India does not lack talent.</p>
            <p className="text-muted-foreground mb-2">Campuses do not lack potential.</p>
            <p className="text-foreground font-medium mt-4 mb-3">But:</p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2 mb-6"
            >
              {problemPoints.map((point) => (
                <motion.li variants={staggerItem} key={point} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
            <p className="text-lg font-semibold text-primary">The gap is not talent.</p>
            <p className="text-lg font-semibold text-primary">It&apos;s the ecosystem.</p>
          </motion.div>

          <motion.div
            {...sectionFade}
            transition={{ duration: 0.55, delay: 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden bg-gradient-to-br from-primary/5 via-card to-secondary/5 border border-primary/15 rounded-3xl p-7 sm:p-8 shadow-card hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 top-0 h-1 gradient-hero" />
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground">What We Do</h2>
            </div>
            <p className="text-muted-foreground mb-4">We build a connected execution ecosystem where:</p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2 mb-6"
            >
              {whatWeDoPoints.map((point) => (
                <motion.li variants={staggerItem} key={point} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
            <p className="text-muted-foreground">Everything works together, not separately.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-7 lg:gap-8">
            {partnerSegments.map((segment, index) => (
              <motion.article
                key={segment.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -5 }}
                className="bg-card border border-border/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <segment.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">{segment.title}</h3>
                </div>

                <p className="text-xl font-semibold text-foreground mb-3">{segment.subtitle}</p>
                <p className="text-muted-foreground mb-5">{segment.intro}</p>

                {segment.transformLine && (
                  <p className="text-foreground font-medium mb-5">{segment.transformLine}</p>
                )}

                <p className="font-semibold text-foreground mb-3">{segment.listTitle}</p>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5"
                >
                  {segment.list.map((item) => (
                    <motion.li variants={staggerItem} key={item} className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {segment.extraTitle && segment.extra && (
                  <>
                    <p className="font-semibold text-foreground mb-3">{segment.extraTitle}</p>
                    <motion.ul
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5"
                    >
                      {segment.extra.map((item) => (
                        <motion.li variants={staggerItem} key={item} className="flex items-start gap-2 text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </>
                )}

                <p className="font-semibold text-foreground mb-3">{segment.outcomeTitle}</p>
                <ul className="flex flex-wrap gap-3 mb-5">
                  {segment.outcome.map((item) => (
                    <li key={item} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="text-foreground font-medium mb-6">{segment.ctaLine}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" asChild>
                    <Link to={segment.ctaPrimary.to}>
                      {segment.ctaPrimary.label} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  {segment.ctaSecondary && (
                    <Button variant="outline" asChild>
                      <a href={segment.ctaSecondary.href} target="_blank" rel="noreferrer">
                        {segment.ctaSecondary.label}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            {...sectionFade}
            className="bg-card border border-border rounded-3xl p-8 lg:p-12 mb-8 shadow-card"
            whileHover={{ y: -5 }}
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">What Makes TSS Different</h2>
            <ul className="grid sm:grid-cols-2 gap-2 mb-6">
              {whatMakesDifferent.map((item) => (
                <li key={item} className="text-foreground rounded-xl border border-border px-4 py-3 bg-accent/30 transition-colors hover:bg-accent/60">{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-4">We combine everything into one execution ecosystem where:</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {ecosystemOutcomes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...sectionFade}
            transition={{ duration: 0.6, delay: 0.08 }}
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden gradient-hero rounded-3xl p-8 lg:p-14 text-center text-primary-foreground shadow-glow"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-4">The TSS Effect</h3>
            <p className="mb-4">{effectItems.join(" + ")}</p>
            <p className="text-xl font-semibold mb-8">= Careers + Startups + Income + Impact</p>

            <h4 className="font-heading text-2xl font-bold mb-4">Let&apos;s Build Together</h4>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {buildTogether.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-full bg-white/20 border border-white/20 text-sm">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" asChild>
                <a href={calendlyLink} target="_blank" rel="noreferrer">
                  Start the Partnership Conversation <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/auth">Join The Student Spot</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CoachingPartners;
