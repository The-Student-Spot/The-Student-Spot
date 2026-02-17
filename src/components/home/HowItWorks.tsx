import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Briefcase, Users, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Get clarity, skills, and real opportunities. Build your career while still in college.",
    features: ["Career guidance", "Internships & jobs", "Skills training", "Certificates & proof"],
    cta: "Start Your Journey",
    path: "/students",
    color: "primary",
  },
  {
    icon: Building2,
    title: "For Colleges",
    description: "Transform campus placement outcomes. Connect students with real industry opportunities.",
    features: ["Campus chapters", "Placement support", "Industry workshops", "National exposure"],
    cta: "Partner With Us",
    path: "/colleges",
    color: "secondary",
  },
  {
    icon: Briefcase,
    title: "For Companies",
    description: "Hire trained, motivated talent ready to contribute from day one.",
    features: ["Pre-screened candidates", "Campus branding", "Bulk hiring", "Employer visibility"],
    cta: "Hire Talent",
    path: "/companies",
    color: "primary",
  },
  {
    icon: Users,
    title: "For Mentors/Speakers/Trainers",
    description: "Guide the next generation. Share your experience and make a lasting impact.",
    features: ["Mentor sessions", "Industry exposure", "Community access", "Recognition"],
    cta: "Become a Mentor",
    path: "/get-involved",
    color: "secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Who Is <span className="text-gradient">TSS</span> For?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            One ecosystem connecting everyone who shapes student futures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                audience.color === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
              }`}>
                <audience.icon className="w-7 h-7" />
              </div>
              
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">
                {audience.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {audience.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {audience.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={audience.color === "primary" ? "default" : "secondary"} 
                className="group/btn"
                asChild
              >
                <Link to={audience.path}>
                  {audience.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
