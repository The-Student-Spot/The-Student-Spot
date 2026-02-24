import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-16 text-center"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">

            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Your Future Starts Now
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground mb-8 max-w-3xl mx-auto"
            >
              Your Future Starts Now
            </motion.h2>

            {/* Lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3 text-primary-foreground/90 text-lg lg:text-xl font-medium mb-8"
            >
              <p>Your career doesn’t begin after graduation.</p>
              <p>Your startup doesn’t begin after funding.</p>
              <p>It begins with the right ecosystem.</p>
              <p className="text-primary-foreground font-semibold">
                Join thousands already building their path.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="hero"
                size="xl"
                className="animate-pulse-glow min-w-[220px]"
                asChild
              >
                <Link to="/students">
                  Join as a Student
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                variant="hero-outline"
                size="xl"
                className="min-w-[220px]"
                asChild
              >
                <Link to="/contact">
                  Become a Partner
                </Link>
              </Button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;