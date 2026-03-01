import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, ArrowRight, Quote, Linkedin, Instagram, Globe, BookOpen, Users, Shield, Lightbulb, Hammer } from "lucide-react";
import founderImage from "@/assets/founder.png";

const About = () => {
  const values = [
    { icon: Target, title: "1. Results First", description: "We focus on real outcomes: careers, skills, and startups." },
    { icon: Globe, title: "2. Access for All", description: "Opportunity should never depend on background or connections." },
    { icon: Heart, title: "3. Community Power", description: "We grow together students, founders, mentors, and recruiters." },
    { icon: BookOpen, title: "4. Continuous Learning", description: "Lifelong skill development and curiosity drive success." },
    { icon: Users, title: "5. Collaboration", description: "Shared knowledge creates a bigger impact." },
    { icon: Award, title: "6. Excellence", description: "We aim beyond average and build systems that scale." },
    { icon: Shield, title: "7. Integrity", description: "Transparency, responsibility, and trust guide our work." },
    { icon: Lightbulb, title: "8. Innovation", description: "We encourage new ideas, experimentation, and bold thinking." },
    { icon: Hammer, title: "9. Builder Mindset", description: "Take ownership. Execute. Create opportunities." },
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
              From Student to Founder
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
              The Student Spot is a Pan-India Student-to-Founder Ecosystem built to solve one clear problem:<br /><br />
              Students don’t fail because they lack talent. <br />
              They fail because they lack clarity, access, and structured direction.<br /><br />
              <span className="text-foreground font-semibold">We are building the missing bridge between campuses and real-world outcomes.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 lg:py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8"
            >
              Who We Are
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            >
              <p className="text-lg text-foreground mb-6">
                The Student Spot connects:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Students', 'Colleges', 'Companies', 'Startups', 'Recruiters', 'Incubators', 'Mentors & Speakers'].map((item) => (
                  <span key={item} className="px-5 py-2.5 rounded-full bg-primary/10 text-primary font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-xl font-medium text-foreground mb-4">
                Into one structured ecosystem focused on execution not just engagement.
              </p>
              <div className="space-y-2 text-muted-foreground text-lg">
                <p>We don’t just host events.</p>
                <p>We don’t just share opportunities.</p>
                <p className="font-bold text-primary mt-4">We build pathways.</p>
              </div>
            </motion.div>
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
                <p className="text-lg leading-relaxed">
                  To provide every student with clarity, skills, confidence, and real opportunities through
                  structured guidance, hands-on experience, and ecosystem access.
                </p>
                <div className="pt-4 mt-6 border-t border-border">
                  <p className="font-medium text-foreground text-lg">We don’t just motivate.</p>
                  <p className="font-bold text-primary text-xl mt-1">We enable action.</p>
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
                <p className="text-lg leading-relaxed">
                  To build India’s largest student infrastructure connecting education, industry, and innovation.
                </p>
                <div className="pt-4 mt-6 border-t border-primary-foreground/20">
                  <p className="font-medium mb-3">A future where:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Every student has access to opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Every campus has startup exposure
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Every company finds job-ready talent
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Every founder gets ecosystem support
                    </li>
                  </ul>
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
              className="bg-card rounded-3xl p-8 lg:p-12 border border-border relative overflow-hidden"
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
                <div className="lg:col-span-2 relative z-10">
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    The Student Spot was founded by <strong>Rajkamal Panthagani</strong>, an MBA graduate who
                    personally experienced job rejections, introversion, and the absence of structured
                    guidance during his student journey.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Instead of waiting for change, he built what he wished existed during his college days: a
                    platform where students don’t struggle alone, don’t guess their path, and don’t miss
                    opportunities due to lack of access.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    Today, The Student Spot empowers thousands of students across India with real
                    exposure, structured growth, and outcome-driven opportunities.
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
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg border-b border-border pb-6 inline-block">
              Everything we do is guided by these principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <value.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background border-t border-border mt-8">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-foreground"
          >
            Ready to Be Part of the <span className="text-gradient">Ecosystem?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <p className="text-muted-foreground text-xl mb-6">
              Join India’s fast-growing student-to-founder movement.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-lg font-semibold text-foreground">
              <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Build skills.</span>
              <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Build networks.</span>
              <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Build proof.</span>
              <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-primary" /> Build your future.</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="secondary" size="lg" asChild className="text-lg px-8 py-6 h-auto">
              <a href="https://forms.gle/HJn2GQDYa64gmvnYA" target="_blank" rel="noopener noreferrer">
                Join Now <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 h-auto">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;