import { motion } from "framer-motion";
import { X } from "lucide-react";

const WhatMakesDifferent = () => {
  const points = [
    "Not just a community.",
    "Not just a job portal.",
    "Not just events.",
    "Not just courses.",
  ];

  return (
    <section className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Why <span className="text-gradient">TSS</span> is Different
            </h2>

            {/* Not Points */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {points.map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-card px-5 py-3 rounded-xl border border-border shadow-sm"
                >
                  <X className="w-4 h-4 text-destructive" />
                  <span className="text-foreground font-medium">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Main Explanation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              We combine everything into one structured ecosystem focused on measurable outcomes.
            </motion.p>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;