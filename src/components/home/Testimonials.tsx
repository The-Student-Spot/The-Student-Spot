import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "TSS helped me land my first internship when I had zero industry connections. The mentorship and exposure changed everything.",
    name: "Charan",
    role: "Software Developer",
    company: "Tech Startup",
  },
  {
    quote:
      "Partnering with TSS improved our placement outcomes and exposed students to startup opportunities we couldn’t provide alone.",
    name: "Varshitha",
    role: "Placement Director",
    company: "Engineering College",
  },
  {
    quote:
      "We hired highly motivated interns through TSS. The difference in quality and readiness was clear.",
    name: "Harish",
    role: "HR Manager",
    company: "Startup",
  },
  {
    quote:
      "The networking events organized by TSS introduced me to my co-founder. We went from an idea to a funded startup in six months.",
    name: "Rahul",
    role: "Startup Founder",
    company: "FinTech Pro",
  },
  {
    quote:
      "I was struggling to find the right direction. The mentorship program connected me with an industry veteran whose guidance helped me secure a top-tier tech job.",
    name: "Ananya",
    role: "Frontend Engineer",
    company: "Global Innovations",
  },
  {
    quote:
      "TSS provided us with a steady pipeline of project-ready talent. It significantly reduced our hiring time and onboarding costs.",
    name: "Vikram",
    role: "CEO",
    company: "NextGen Solutions",
  },
  {
    quote:
      "Being a campus lead gave me hands-on leadership experience that no classroom could teach. It was the highlight of my resume.",
    name: "Priya",
    role: "Product Manager",
    company: "EduTech Core",
  },
  {
    quote:
      "We hosted a successful hackathon in collaboration with TSS. The sheer talent and innovation from the participating students were mind-blowing.",
    name: "Siddharth",
    role: "Developer Advocate",
    company: "Cloud Systems",
  },
  {
    quote:
      "Thanks to the freelance network at TSS, I started taking up real-world branding projects while still in my second year of college.",
    name: "Neha",
    role: "UI/UX Designer",
    company: "Freelance",
  },
  {
    quote:
      "As a speaker, I love the energy and curiosity of the students here. TSS is building a truly impactful community.",
    name: "Arjun",
    role: "Industry Expert",
    company: "Consulting Firm",
  },
  {
    quote:
      "Our incubator partnered with TSS to discover promising student startups, and we've already incubated three amazing teams from their ecosystem.",
    name: "Kavya",
    role: "Incubator Director",
    company: "Venture Hub",
  },
  {
    quote:
      "The practical workshops bridged the gap between academic knowledge and industry expectations. I felt completely prepared for my first job.",
    name: "Rohit",
    role: "Data Analyst",
    company: "Quantico Data",
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