import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* PROBLEM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              The Problem
            </div>

            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-6 leading-snug">
              Students don’t fail because they lack talent.
              <br />
              <span className="text-muted-foreground">
                They fail because they lack clarity, access, and structured direction.
              </span>
            </h3>

            <ul className="space-y-4 mb-8">
              {[
                "Opportunities are scattered",
                "Colleges lack deep industry integration",
                "Companies struggle to find job-ready talent",
                "Startups lack execution support",
                "Student founders lack incubation & exposure",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="text-foreground font-semibold text-lg">
              The gap is not talent.
              <br />
              <span className="text-destructive">It’s the ecosystem.</span>
            </p>
          </motion.div>

          {/* SOLUTION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-10 border border-primary/10"
          >
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              The Solution
            </div>

            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-snug">
              The Student Spot
              <br />
              <span className="text-primary">
                One Ecosystem. Real Outcomes.
              </span>
            </h3>

            <p className="text-muted-foreground mb-6">
              We bridge the gap between:
            </p>

            <p className="font-medium text-foreground mb-6">
              Students ↔ Colleges ↔ Companies ↔ Startups ↔ Incubators ↔ Mentors
            </p>

            <p className="text-muted-foreground mb-6">
              We focus on execution, not just activity.
            </p>

            {/* FORMULA */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="font-heading font-semibold text-foreground mb-4">
                The TSS Formula
              </p>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {["Skills", "Network", "Proof of Work", "Opportunity"].map(
                  (item, index) => (
                    <span key={item} className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium">
                        {item}
                      </span>
                      {index < 3 && (
                        <span className="text-muted-foreground">+</span>
                      )}
                    </span>
                  )
                )}

                <span className="text-muted-foreground">=</span>

                <span className="bg-success/10 text-success px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Careers & Founders
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;