import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, ArrowRight, Quote, Linkedin, Instagram } from "lucide-react";
import founderImage from "@/assets/founder.png";

const About = () => {
  const values = [
    { icon: Target, title: "Results First", description: "We measure success by real internships, jobs, startups, and growth — not just engagement." },
    { icon: Eye, title: "Equal Access", description: "Opportunity should not depend on background, location, or connections." },
    { icon: Heart, title: "Community Power", description: "We grow together. Every win strengthens the ecosystem." },
    { icon: Award, title: "Excellence", description: "We aim beyond average. We build for impact." },
  ];

  const founderLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/rajkamalprls", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/rajkamalpanthagani", label: "Instagram" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              About Us
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Building India’s Largest <span className="text-gradient">Student-to-Founder Ecosystem</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              The Student Spot is a Pan-India ecosystem built on one truth:<br /><br />
              Students don’t fail because they lack talent. They fail because they lack access, direction, and the right ecosystem.<br /><br />
              <span className="text-foreground font-semibold">We are building that missing system.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To give every student clarity, skills, confidence, and real opportunities through structured pathways and hands-on execution.
                </p>
                <div className="space-y-1 font-medium text-foreground">
                  <p>• We don’t just inspire.</p>
                  <p>• We build the roadmap.</p>
                  <p>• We connect the dots.</p>
                  <p>• We create outcomes.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-4">Our Vision</h2>
              <div className="space-y-4 text-primary-foreground/90">
                <p>
                  To build India’s largest student infrastructure connecting education, startups, and industry into one powerful ecosystem.
                </p>
                <p>
                  A future where every student — regardless of background — has equal access to networks, mentorship, proof of work, and opportunity.
                </p>
                <div className="pt-2 font-bold border-t border-primary-foreground/20 italic">
                  From student to career. <br /> From student to founder.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Our <span className="text-gradient">Founder</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 lg:p-12 border border-border relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto lg:w-full lg:h-auto aspect-square rounded-2xl overflow-hidden border-4 border-primary/20">
                      <img
                        src={founderImage}
                        alt="Rajkamal Panthagani - Founder of The Student Spot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {founderLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-secondary flex items-center justify-center transition-colors shadow-lg"
                          aria-label={link.label}
                          title={link.label}
                        >
                          <link.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <p className="font-heading font-bold text-xl text-foreground">Rajkamal Panthagani</p>
                    <p className="text-muted-foreground">Founder, The Student Spot</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    The Student Spot was founded by <strong>Rajkamal Panthagani</strong>, an MBA graduate
                    who personally experienced job rejections, introversion, and the absence of structured guidance during his student journey.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Instead of waiting for change, he built what he wished
                    existed during his college days — a platform where students don’t struggle alone,
                    don’t guess their path, and don’t miss opportunities due to lack of access.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Today, The Student Spot empowers thousands of students across India with real exposure, structured growth, and outcome-driven opportunities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
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
            className="font-heading text-3xl lg:text-4xl font-bold mb-6 text-foreground"
          >
            Ready to Be Part of the Ecosystem?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
          >
            Join India’s fast-growing Student-to-Founder movement.<br /><br />
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-medium text-foreground">
              <span>• Build skills.</span>
              <span>• Build networks.</span>
              <span>• Build proof.</span>
              <span>• Build your future.</span>
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="secondary" size="lg" asChild>
              <a href="https://forms.gle/HJn2GQDYa64gmvnYA" target="_blank" rel="noopener noreferrer">
                Join Now <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;