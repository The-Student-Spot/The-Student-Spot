import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I had no industry exposure and no confidence. Through TSS workshops and live projects, I built my portfolio. Within 6 months, I secured two internships and a full-time offer.",
    name: "Prathima",
    role: "Outcome",
    company: "+300% skill growth | First corporate role secured",
  },
  {
    quote:
      "TSS helped me understand what skills the industry actually wants. Once I focused on proof of work, interviews became easier.",
    name: "Vinay",
    role: "Outcome",
    company: "Structured roadmap -> Career clarity -> Placement",
  },
  {
    quote:
      "Networking inside TSS changed everything. I met my hiring manager at a workshop.",
    name: "Ramesh",
    role: "Outcome",
    company: "Network-driven opportunity",
  },
  {
    quote:
      "Instead of just learning, I started building. That changed how recruiters saw me.",
    name: "Prudhvi",
    role: "Outcome",
    company: "Portfolio -> Internship in 90 days",
  },
  {
    quote:
      "Through TSS, I started freelance marketing projects. I now support my own expenses.",
    name: "Rajireddy",
    role: "Outcome",
    company: "INR 0 -> INR 25K/month side income",
  },
  {
    quote:
      "Leadership roles in TSS gave me confidence I never had before.",
    name: "Sreeja",
    role: "Outcome",
    company: "Personality transformation",
  },
  {
    quote:
      "After improving my resume and building proof, recruiters started responding.",
    name: "Priya",
    role: "Outcome",
    company: "0 -> 3 interviews",
  },
  {
    quote:
      "TSS helped me validate my idea and find a co-founder.",
    name: "Vaishnavi",
    role: "Outcome",
    company: "Idea -> MVP in 120 days",
  },
  {
    quote:
      "TSS workshops and hiring partnerships improved our outcomes significantly.",
    name: "Greeshma",
    role: "Placement Head",
    company: "72% placement rate (+17% growth)",
  },
  {
    quote:
      "Our campus became more innovation-driven after partnering with TSS.",
    name: "Laxmi",
    role: "Training & Placement Coordinator",
    company: "3 student startups incubated",
  },
  {
    quote:
      "Students gained exposure we couldn't provide earlier.",
    name: "Akshay",
    role: "College Administrator",
    company: "8 corporate workshops conducted",
  },
  {
    quote:
      "TSS candidates were pre-screened and project-ready.",
    name: "Harish",
    role: "HR Manager, Startup",
    company: "15-day hiring cycle (50% faster)",
  },
  {
    quote:
      "The quality and execution mindset stood out.",
    name: "Charan",
    role: "Founder, SaaS Startup",
    company: "5 interns hired | 2 converted full-time",
  },
  {
    quote:
      "We received relevant, skilled candidates.",
    name: "Harshitha",
    role: "Recruitment Lead",
    company: "90% interview-to-selection ratio",
  },
  {
    quote:
      "TSS brought targeted students who were serious about learning.",
    name: "Naveen",
    role: "Co-Founder, Hashinclude",
    company: "85 monthly enrollments (+112%)",
  },
  {
    quote:
      "Campus ambassador campaigns increased our conversions.",
    name: "Sandeep",
    role: "UI/UX Trainer, HashInclude",
    company: "Pan-India visibility",
  },
  {
    quote:
      "TSS brought us better-prepared founders.",
    name: "Akshara",
    role: "Incubation Manager",
    company: "28 validated applications (+180%)",
  },
  {
    quote:
      "Student startups came with traction, not just ideas.",
    name: "Deepak",
    role: "Innovation Lead",
    company: "4 corporate pilot projects launched",
  },
  {
    quote:
      "The ecosystem allowed me to guide serious builders.",
    name: "Sandesh",
    role: "Startup Mentor",
    company: "1,500+ students impacted",
  },
  {
    quote:
      "TSS helped me build visibility across campuses.",
    name: "Lavanya",
    role: "Industry Speaker",
    company: "6 campus masterclasses",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Success <span className="text-secondary">Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real builders. Real outcomes. Real growth.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:shadow-card-hover transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-secondary/40 mb-4" />

              {/* Quote Text */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                “{testimonial.quote}”
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary font-heading font-bold flex items-center justify-center">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;