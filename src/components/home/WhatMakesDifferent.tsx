import { motion } from "framer-motion";
import { Zap, Users, Building, Award, X } from "lucide-react";

const WhatMakesDifferent = () => {
  const notFeatures = [
    { icon: Users, text: "Not just a community" },
    { icon: Building, text: "Not just a job portal" },
    { icon: Award, text: "Not just courses" },
    { icon: Zap, text: "Not just events" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              What Makes TSS Different
            </div>

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">
              TSS is an <span className="text-gradient">Outcome Engine</span>
            </h2>

            {/* Not features */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {notFeatures.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border"
                >
                  <X className="w-4 h-4 text-destructive" />
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Outcome equation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-card"
            >
              <p className="text-muted-foreground mb-6 text-lg">
                Traditional platforms offer fragments. TSS delivers the full ecosystem.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                {[
                  { label: "Skills", color: "bg-primary/10 text-primary" },
                  { label: "Network", color: "bg-secondary/10 text-secondary" },
                  { label: "Proof", color: "bg-success/10 text-success" },
                  { label: "Opportunity", color: "bg-primary/10 text-primary" },
                ].map((item, index) => (
                  <span key={item.label} className="flex items-center gap-2 lg:gap-3">
                    <span className={`${item.color} px-4 py-2 rounded-xl font-heading font-semibold`}>
                      {item.label}
                    </span>
                    {index < 3 && (
                      <span className="text-2xl text-muted-foreground">+</span>
                    )}
                  </span>
                ))}
                <span className="text-2xl text-muted-foreground">=</span>
                <span className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-2 rounded-xl font-heading font-bold text-lg shadow-glow">
                  Careers & Founders
                </span>
              </div>

              <div className="mt-12 flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-medium text-muted-foreground bg-accent/50 p-6 rounded-2xl border border-border">
                <span>From clarity</span>
                <span className="text-primary">→</span>
                <span>to capability</span>
                <span className="text-primary">→</span>
                <span>to credibility</span>
                <span className="text-primary">→</span>
                <span className="text-foreground font-bold">to opportunity.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
