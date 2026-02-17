import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 20000, suffix: "+", label: "Students Onboarded" },
  { value: 500, suffix: "+", label: "Internships Completed" },
  { value: 200, suffix: "+", label: "Students Placed" },
  { value: 50, suffix: "+", label: "Colleges Partnered" },
  { value: 100, suffix: "+", label: "Events Conducted" },
  { value: 30, suffix: "+", label: "Companies Engaged" },
];

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real numbers. Real outcomes. Real transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter end={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
