import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Building2, Users, Award, Calendar, TrendingUp,
  ArrowRight, CheckCircle, Globe, Briefcase
} from "lucide-react";

const Colleges = () => {
  const benefits = [
    { icon: Users, title: "Campus Chapters", description: "Official TSS chapters with trained student leaders on your campus" },
    { icon: Briefcase, title: "Placement Support", description: "Direct connections to companies and hiring opportunities for your students" },
    { icon: Calendar, title: "Industry Workshops", description: "Regular sessions with working professionals and industry experts" },
    { icon: Award, title: "Student Certifications", description: "Recognised skill certificates that add value to student profiles" },
    { icon: Globe, title: "Pan-India Exposure", description: "Connect your students to opportunities across the country" },
    { icon: TrendingUp, title: "Better Outcomes", description: "Improved placement rates and career readiness for your students" },
  ];

  const outcomes = [
    { metric: "40%", label: "Better placement results" },
    { metric: "2x", label: "Industry exposure" },
    { metric: "50+", label: "Partner colleges" },
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
                className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Building2 className="w-4 h-4" />
                For Colleges
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Make Your Campus <span className="text-gradient">Career-Ready</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Partner with The Student Spot to give your students industry exposure, skill training,
                and real opportunities. Let us prepare students not just for exams, but for life and careers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Partner With Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-3 gap-4">
                {outcomes.map((item, index) => (
                  <div key={item.label} className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                    <div className="font-heading text-3xl font-bold text-primary mb-2">{item.metric}</div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 lg:p-12 border border-border"
            >
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-6">
                A college is not just about infrastructure.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                It is about the doors it opens for students. Every year, lakhs of students complete
                their degrees. But very few walk out with clarity, confidence, and direction.
              </p>
              <p className="text-lg text-foreground font-medium">
                Not because students lack talent. But because most colleges still focus only on
                exams, not on preparing students for the real world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything your institution needs to improve student outcomes.
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
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How We <span className="text-gradient">Partner</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect", description: "Schedule a call with our team to discuss your needs" },
              { step: "02", title: "Customise", description: "We design a programme that works for your college" },
              { step: "03", title: "Launch", description: "Roll out the TSS chapter on your campus" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background text-foreground border-t border-border mt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-bold mb-6"
          >
            Let us prepare students for life, not just exams.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button variant="secondary" size="xl" asChild>
              <Link to="/contact">
                Start Partnership Conversation <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Colleges;