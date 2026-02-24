import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, TrendingUp, Target, Award,
  CheckCircle, ArrowRight, Building2, Megaphone,
  BarChart3, Handshake
} from "lucide-react";

const CoachingPartners = () => {
  const benefits = [
    { icon: Users, title: "Reach 10,000+ Students", description: "Connect with motivated students who are actively looking for career guidance" },
    { icon: Megaphone, title: "Brand Visibility", description: "Get featured on our platform and at campus events across India" },
    { icon: TrendingUp, title: "Lead Generation", description: "Connect with students who are genuinely interested in your programmes" },
    { icon: Handshake, title: "Joint Programmes", description: "Launch co-branded workshops and certification programmes together" },
    { icon: BarChart3, title: "Track Results", description: "See exactly how students are engaging with your content and offers" },
    { icon: Award, title: "Verified Partner Badge", description: "Build trust with students through our verified partner programme" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Building2 className="w-4 h-4" />
                For Coaching Institutes
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Grow Your Institute <span className="text-gradient">With Us</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Connect your coaching institute with thousands of motivated students across India.
                Whether you prepare students for government jobs, IT careers, or competitive exams -
                we help you reach the right audience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Become a Partner <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-involved">Learn More</Link>
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
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">Why Institutes Choose Us</h3>
                <div className="space-y-4">
                  {[
                    "10,000+ students in our network",
                    "50+ college campuses across India",
                    "Co-branded marketing campaigns",
                    "Direct student enquiries",
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
              More than just a listing - a complete growth partnership for your institute.
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

      {/* Partner Types */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Who Can <span className="text-gradient">Partner</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Government Job Prep", desc: "UPSC, SSC, Banking, Railways", icon: GraduationCap },
              { title: "IT & Tech Training", desc: "Coding, Data Science, Cloud", icon: Target },
              { title: "Competitive Exams", desc: "CAT, GATE, GRE, GMAT", icon: Building2 },
              { title: "Skill Development", desc: "Soft skills, Communication", icon: Award },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
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
              Grow your institute with The Student Spot.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Apply for Partnership <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/get-involved">Explore Options</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CoachingPartners;