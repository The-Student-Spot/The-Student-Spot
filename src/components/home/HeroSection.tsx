import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Zap, Globe, Play } from "lucide-react";
import tssLogo from "@/assets/tss-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />

              Students → Founder Ecosystem


            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >

              From Students
              <br />
              <span className="text-gradient">To Founder</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0"
            >

              We transform ambitious students into confident builders and future founders through skills, mentorship, exposure, and real opportunities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8 space-y-1 text-center lg:text-left"
            >
              <p className="text-sm lg:text-base text-muted-foreground font-medium">
                Start as a student.
              </p>
              <p className="text-sm lg:text-base text-muted-foreground font-medium">
                Build with purpose.
              </p>
              <p className="text-sm lg:text-base font-semibold text-primary">
                Lead as a founder.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col gap-2 mb-8 text-foreground font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Start as a student.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Build with purpose.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span>Lead as a founder.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" className="group min-w-[200px]" asChild>
                <Link to="/auth">
                  Login / Signup
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="outline" size="xl" className="min-w-[200px]" asChild>
                <Link to="/contact">
                  Partner With Us
                </Link>

              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                20,000+ Students
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                50+ Colleges
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                Pan-India Network
              </div>
            </motion.div>
          </div>

          {/* Right content - Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  Career Clarity
                </h3>
                <p className="text-sm text-muted-foreground">
                  Know exactly what path to take
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border mt-8"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  Real Skills
                </h3>
                <p className="text-sm text-muted-foreground">
                  Industry-ready training
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  Network
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with industry
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 shadow-glow mt-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-primary-foreground mb-2">
                  Opportunities
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  Jobs & internships
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
