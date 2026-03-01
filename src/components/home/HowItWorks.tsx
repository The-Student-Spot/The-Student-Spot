import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Lightbulb,
  Rocket,
  ArrowRight,
} from "lucide-react";

type ButtonVariant = "default" | "secondary";

interface Audience {
  icon: any;
  title: string;
  description: string;
  features: string[];
  cta: string;
  path: string;
  variant: ButtonVariant;
  dotColor: string;
  iconBg: string;
}

const audiences: Audience[] = [
  // ROW 1
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Move from confusion to confidence. Build your career or startup while in college.",
    features: [
      "Career clarity",
      "Internships & jobs",
      "Freelance opportunities",
      "Skill development",
      "Portfolio building",
      "Startup & incubation support",
      "Mentor access",
    ],
    cta: "Join as a Student",
    path: "/auth",
    variant: "default",
    dotColor: "bg-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Building2,
    title: "For Colleges",
    description: "Turn your campus into a career & startup hub.",
    features: [
      "Campus chapters",
      "Placement acceleration",
      "Industry workshops",
      "Startup bootcamps",
      "Incubation ecosystem integration",
      "Corporate project collaboration",
    ],
    cta: "Become a Partner",
    path: "/colleges",
    variant: "secondary",
    dotColor: "bg-secondary",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    icon: Briefcase,
    title: "For Companies & Startups",
    description: "Hire smart. Execute faster. Grow stronger.",
    features: [
      "Pre-screened candidates",
      "Freelance & project-ready teams",
      "Internship & job listings",
      "Campus branding",
      "Talent pipeline building",
    ],
    cta: "Hire Talent",
    path: "/companies",
    variant: "default",
    dotColor: "bg-primary",
    iconBg: "bg-primary/10 text-primary",
  },

  // ROW 2 (🔥 Your Custom Color Rule Applied)
  {
    icon: Users,
    title: "For Coaching Institutes",
    description: "Scale admissions with structure.",
    features: [
      "20,000+ student reach",
      "Lead generation",
      "Campus activation",
      "Co-branded workshops",
      "Placement-linked programs",
      "National visibility",
    ],
    cta: "Become a Partner",
    path: "/coaching",
    variant: "secondary", // 🔴 LEFT RED
    dotColor: "bg-secondary",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    icon: Lightbulb,
    title: "For Incubators & Innovation Cells",
    description: "Fuel innovation from campuses.",
    features: [
      "Access student founders",
      "Startup challenges",
      "Idea validation",
      "Demo days",
      "Corporate collaboration access",
    ],
    cta: "Become a Partner",
    path: "/incubators",
    variant: "default", // 🟡 MIDDLE YELLOW
    dotColor: "bg-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Rocket,
    title: "For Mentors & Speakers",
    description: "Make an impact. Build influence.",
    features: [
      "Guide student builders",
      "Workshops & webinars",
      "Mentor founders",
      "Share insights",
      "National student visibility",
    ],
    cta: "Become a Mentor/Speaker",
    path: "/mentors",
    variant: "secondary", // 🔴 RIGHT RED
    dotColor: "bg-secondary",
    iconBg: "bg-secondary/10 text-secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Who We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            One ecosystem connecting everyone shaping student and startup futures.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:shadow-card-hover transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${audience.iconBg}`}
              >
                <audience.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">
                {audience.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {audience.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {audience.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${audience.dotColor}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button variant={audience.variant} asChild className="group/btn">
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