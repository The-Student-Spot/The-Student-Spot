import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap, Target, Briefcase, Award, Users, Zap,
  ArrowRight, CheckCircle, BookOpen, Rocket, LineChart, BadgeCheck, Lightbulb, Compass, MonitorPlay
} from "lucide-react";

const Students = () => {
  const whatYouGet = [
    { icon: Compass, title: "1. Career Clarity", description: "Stop guessing your path.", points: ["What suits you", "What industries demand", "What skills to build", "How to plan 6–12 months ahead"] },
    { icon: Briefcase, title: "2. Real Opportunities", description: "You don’t just learn. You apply.", points: ["Internships", "Full-time roles", "Startup positions", "Freelance projects", "Campus ambassador programs"] },
    { icon: Zap, title: "3. Skills That Matter", description: "Beyond textbooks. Focused on outcomes.", points: ["Communication", "Digital skills", "Tech & business basics", "Interview & resume mastery", "Execution mindset"] },
    { icon: BadgeCheck, title: "4. Proof of Work", description: "Your resume becomes proof, not claims.", points: ["Certificates", "Live project experience", "Portfolio development", "Recommendations", "Internship records"] },
    { icon: LineChart, title: "5. Freelance & Earning", description: "Build income and confidence.", points: ["Digital marketing", "Content creation", "Design", "Web development", "Research & Operations"] },
  ];

  const steps = [
    { step: "01", title: "Join the Ecosystem", description: "Tell us your goals for your career or founder path." },
    { step: "02", title: "Choose Your Direction", description: "Career track, freelance track, or startup track." },
    { step: "03", title: "Learn & Execute", description: "Attend workshops. Work on projects. Build real skills." },
    { step: "04", title: "Build Your Proof", description: "Create your portfolio and credibility." },
    { step: "05", title: "Unlock Opportunities", description: "Apply for internships, freelance gigs, jobs, or startup collaborations." },
  ];

  const whoCanJoin = [
    { icon: GraduationCap, title: "College Students", desc: "Any year, any stream" },
    { icon: Award, title: "Fresh Graduates", desc: "Just starting their journey" },
    { icon: Briefcase, title: "Career Switchers", desc: "Looking for new paths" },
    { icon: Rocket, title: "Future Founders", desc: "Ready to build startups" },
    { icon: MonitorPlay, title: "Freelancers", desc: "In-the-making" },
  ];

  const startupSupport = [
    { title: "Startup Awareness", desc: "Founder talks, bootcamps, and idea validation workshops." },
    { title: "Incubation Support", desc: "Business model guidance, MVP development direction, Market research support, Feedback loops, Pitch deck creation." },
    { title: "Real Corporate Projects", desc: "Companies in our ecosystem may assign pilot tasks to student startups, giving you real validation." },
    { title: "Access to Mentors", desc: "Learn directly from founders, consultants, and industry leaders." },
    { title: "Investor & Corporate Exposure", desc: "Opportunities to connect with strategic partners, potential clients, and ecosystem supporters." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <GraduationCap className="w-4 h-4" />
                For Students
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                Confused About Your Career?<br />
                <span className="text-muted-foreground text-3xl lg:text-4xl">Or Thinking About Starting<br />Something of Your Own?</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 space-y-4"
              >
                <p className="font-semibold text-foreground">You don’t have to figure it out alone.</p>
                <p>
                  The Student Spot is a Student-to-Founder Ecosystem designed to help you gain clarity,
                  build skills, access real opportunities, and even launch your own startup while still in
                  college.
                </p>
                <p className="text-xl font-medium text-primary border-l-4 border-primary pl-4 py-1">
                  Your future doesn’t start after graduation. It starts now.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="lg" className="h-14 px-8 text-lg shadow-lg shadow-primary/25" asChild>
                  <Link to="/auth">
                    Join as a Student <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:block"
            >
              <div className="bg-card rounded-3xl p-8 shadow-2xl border border-border/50 relative overflow-hidden group">
                {/* Decorative sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="text-center mb-8 relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                    <LineChart className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground tracking-tight">Your Growth Dashboard</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1 bg-muted/50 inline-block px-3 py-1 rounded-full">Everything you need. One ecosystem.</p>
                </div>

                <div className="space-y-4">
                  {[
                    "100+ Active Opportunities",
                    "8+ Monthly Workshops",
                    "100+ Industry Mentors",
                    "Startup & Incubation Support",
                    "Freelance & Project Access"
                  ].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    No confusion. No random steps. Structured growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              What You <span className="text-gradient">Get</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stop guessing your path. Get structured guidance to understand where to go and how to get there.
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
                className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-base font-medium text-primary mb-6">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 shrink-0"></div>
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup & Founder Support */}
      <section className="py-20 lg:py-32 bg-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Startup & <span className="text-gradient">Founder Support</span>
              </h2>
              <p className="text-xl text-foreground font-medium mb-4">
                Want to build something of your own?
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We don’t just talk about startups.<br />
                <span className="font-bold text-primary text-xl">We help you start.</span>
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-2xl border border-border shadow-sm mb-8">
                <Lightbulb className="w-6 h-6 text-warning" />
                <span className="font-heading font-bold text-lg">Idea to Execution Pathway</span>
              </div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Journey</p>
              <div className="flex items-center gap-2 text-lg font-bold text-foreground">
                <span className="text-primary hover:text-primary/80 transition-colors">idea</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <span className="text-secondary hover:text-secondary/80 transition-colors">prototype</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <span className="text-success hover:text-success/80 transition-colors">traction</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="space-y-6">
                {startupSupport.map((item, index) => (
                  <div key={item.title} className="bg-background rounded-2xl p-6 shadow-sm border border-border hover:border-primary/20 transition-colors flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary font-heading">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-4 border-primary/20 pl-8 ml-4 md:ml-0 space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[54px] top-0 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center font-heading font-bold text-primary shadow-lg">
                    {step.step}
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-20 lg:py-32 bg-accent/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Who Can <span className="text-gradient">Join?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {whoCanJoin.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-background rounded-3xl border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bigger Difference */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/20 relative overflow-hidden">
        {/* Dynamic Background Blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm">
              The Bigger Difference
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold mb-8 text-foreground">
              Most students wait.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">TSS students build.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-lg lg:text-xl font-bold mb-10">
              {['Skills', 'Income', 'Networks', 'Startups', 'Your Future'].map((item) => (
                <span key={item} className="flex items-center gap-2 bg-card px-6 py-3 rounded-xl border border-border shadow-sm">
                  <span className="text-primary">Build</span> <span className="text-foreground">{item}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-10 lg:p-20 text-center relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[50px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[50px]"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Don’t Wait for Opportunities.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white">Prepare for them. Create them.</span>
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Join a Pan-India ecosystem focused on growth, skills, and execution.
              </p>
              <Button variant="hero" size="xl" className="h-16 px-10 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
                <Link to="/auth">
                  Join as a Student <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Students;