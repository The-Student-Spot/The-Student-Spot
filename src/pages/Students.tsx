import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap, Target, Briefcase, Award, Users, Zap,
  ArrowRight, CheckCircle, BookOpen, Calendar
} from "lucide-react";

const Students = () => {
  const benefits = [
    { icon: Target, title: "Career Clarity", description: "No more confusion about what to do next. We help you find your path." },
    { icon: Briefcase, title: "Real Opportunities", description: "Internships, jobs, and projects that actually help you grow." },
    { icon: BookOpen, title: "Skills Training", description: "Learn what companies actually want - not just textbook stuff." },
    { icon: Award, title: "Proof & Certificates", description: "Build a portfolio that makes recruiters take notice." },
    { icon: Users, title: "Strong Network", description: "Connect with mentors, founders, and professionals who genuinely want to help." },
    { icon: Calendar, title: "Events & Workshops", description: "Regular sessions to keep you learning and motivated." },
  ];

  const steps = [
    { step: "01", title: "Join Our Community", description: "Sign up and tell us about yourself" },
    { step: "02", title: "Choose Your Path", description: "Pick what interests you and where you want to go" },
    { step: "03", title: "Learn & Do", description: "Attend workshops, work on projects, build real skills" },
    { step: "04", title: "Build Your Proof", description: "Get certificates, create your portfolio, earn recommendations" },
    { step: "05", title: "Grab Opportunities", description: "Apply for internships, jobs, and startup roles" },
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
                <GraduationCap className="w-4 h-4" />
                For Students
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Confused About Career?<br />
                <span className="text-gradient">We Have Got You.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Your career journey does not have to wait till after graduation. Join thousands of
                students who are already building skills, gaining experience, and landing real
                opportunities right now.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="lg" asChild>
                  <a href="https://forms.gle/HJn2GQDYa64gmvnYA" target="_blank" rel="noopener noreferrer">
                    Join as a Student <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://chat.whatsapp.com/LxA5xaAdlKp3nvZmIGxLcp" target="_blank" rel="noopener noreferrer">Contact Us</a>
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
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Your Career Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Everything you need in one place</p>
                </div>
                <div className="space-y-3">
                  {["Active opportunities: 50+", "Workshops this month: 8", "Mentors available: 25"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-foreground">{item}</span>
                    </div>
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
              Everything you need to go from confused to career-ready.
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

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-heading font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Who Can <span className="text-gradient">Join</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: GraduationCap, title: "College Students", desc: "Any year, any stream" },
              { icon: Award, title: "Fresh Graduates", desc: "Just starting your career" },
              { icon: Zap, title: "Career Changers", desc: "Looking for new paths" },
              { icon: Users, title: "Future Founders", desc: "Building something new" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
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
            className="gradient-hero rounded-3xl p-8 lg:p-16 text-center"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
              Do not wait for opportunities.<br />Start preparing for them today.
            </h2>
            <Button variant="hero" size="xl" asChild>
              <a href="https://forms.gle/HJn2GQDYa64gmvnYA" target="_blank" rel="noopener noreferrer">
                Join as a Student <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Students;