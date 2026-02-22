import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "TSS helped me land my first internship when I had zero industry connections. The mentorship and exposure changed everything.",
    name: "Charan",
    role: "Software Developer",
    company: "Tech Startup",
    image: null,
  },
  {
    quote: "Partnering with TSS improved our placement outcomes and exposed students to startup opportunities we couldn’t provide alone.",
    name: "Varshitha",
    role: "Placement Director",
    company: "Engineering College",
    image: null,
  },
  {
    quote: "We hired highly motivated interns through TSS. The difference in quality and readiness was clear.",
    name: "Harish",
    role: "HR Manager",
    company: "Startup",
    image: null,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            Success <span className="text-secondary">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real builders. Real outcomes. Real growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:shadow-lg transition-all"
            >
              <Quote className="w-10 h-10 text-secondary/50 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-heading font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
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
