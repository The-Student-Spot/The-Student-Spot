import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users, Award, BookOpen, ArrowRight,
  CheckCircle, Mic, GraduationCap, Target, Heart, Lightbulb, TrendingUp
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const whyGetInvolved = [
  "Build real leadership and execution experience",
  "Access a nationwide student and professional network",
  "Improve placement readiness and industry exposure",
  "Mentor and guide future talent",
  "Speak at colleges and events across India",
  "Grow your personal brand and professional visibility",
];

const campusRoles = [
  "Campus Lead",
  "Co-Lead",
  "Social Media Manager",
  "Content Creator",
  "Event Coordinator",
  "Creative & Design",
  "PR & Community",
  "Outreach & Operations",
];

const campusGains = [
  "Leadership certificate and LOR",
  "Hands-on event and project experience",
  "Priority access to internships and jobs",
  "Growth to District, State, and National leadership roles",
];

const mentorResponsibilities = [
  "Conduct webinars or workshops",
  "Guide student leaders and interns",
  "Share career journeys and industry insights",
  "Support placement and skill readiness",
];

const mentorBenefits = [
  "Visibility across colleges nationwide",
  "Personal brand building",
  "Recognition and certificates",
  "Access to high-potential student talent",
];

const speakerOpportunities = [
  "College workshops",
  "Career talks",
  "Skill masterclasses",
  "Panel discussions",
  "National and state-level events",
];

const speakerBenefits = [
  "Speaking opportunities across India",
  "Professional recognition",
  "Brand visibility with students and institutions",
  "Paid and unpaid speaking options based on events",
];

const structureLevels = [
  {
    level: "College Level",
    description: "Campus Leads and teams execute events, build communities, and drive engagement.",
  },
  {
    level: "District Level",
    description: "District Directors manage multiple colleges and support growth.",
  },
  {
    level: "State Level",
    description: "State Leads coordinate expansion, partnerships, and performance.",
  },
  {
    level: "National Level",
    description: "National Team handles strategy, partnerships, revenue, technology, and growth.",
  },
];

const whoShouldJoin = [
  { icon: GraduationCap, text: "Students who want more than classroom learning" },
  { icon: Users, text: "Leaders who want to build communities" },
  { icon: Heart, text: "Professionals who want to give back" },
  { icon: Mic, text: "Speakers who want real student impact" },
  { icon: Lightbulb, text: "Mentors who want to shape future talent" },
];

const faqs = [
  {
    question: "What is The Student Spot?",
    answer: "The Student Spot is a nationwide student and professional ecosystem focused on leadership, placements, skills, and opportunities.",
  },
  {
    question: "Is this paid or unpaid?",
    answer: "Campus roles start as leadership and learning roles. Performance-based monetization and paid opportunities are available at higher levels.",
  },
  {
    question: "How much time commitment is required?",
    answer: "Average commitment is 8–10 hours per week, flexible around academics or work.",
  },
  {
    question: "Can first-year students apply?",
    answer: "Yes. Passion and commitment matter more than year of study.",
  },
  {
    question: "Do mentors and speakers get paid?",
    answer: "Some sessions are paid depending on event type and partnerships. All mentors and speakers receive recognition and certificates.",
  },
  {
    question: "How does growth work?",
    answer: "Performance-based promotions from Campus → District → State → National levels.",
  },
  {
    question: "Will I get a certificate or LOR?",
    answer: "Yes, based on performance and contribution.",
  },
];

const FORM_URL = "https://forms.gle/HJn2GQDYa64gmvnYA";

const GetInvolved = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <TrendingUp className="w-4 h-4" />
              Get Involved
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Get Involved with <span className="text-gradient">The Student Spot</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-foreground mb-4"
            >
              Build. Lead. Mentor. Speak. Grow.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8"
            >
              The Student Spot is building India's fastest-growing student-led ecosystem connecting students, professionals, mentors, and organizations across colleges nationwide.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Whether you are a student leader, mentor, industry professional, or speaker, there is a place for you to create impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="hero" size="xl" asChild>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                  Get Involved Today <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Get Involved */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Get Involved with <span className="text-gradient">The Student Spot</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyGetInvolved.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Opportunities to <span className="text-gradient">Get Involved</span>
            </h2>
          </motion.div>

          {/* 1. Campus Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Campus Team (College Chapters)</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">Lead and grow The Student Spot chapter in your college.</p>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Who can apply</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Undergraduate and postgraduate students
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Passionate about leadership, community building, and careers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Ready to take ownership and work with a structured team
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Available Campus Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {campusRoles.map((role) => (
                    <span key={role} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">What you gain</h4>
                <ul className="space-y-2">
                  {campusGains.map((gain) => (
                    <li key={gain} className="flex items-start gap-2 text-muted-foreground">
                      <Award className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      {gain}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button variant="default" size="lg" asChild>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                Apply for Campus Team <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* 2. Mentors & Industry Experts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Mentors & Industry Experts</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">Guide students with real-world insights and experience.</p>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Who can apply</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Working professionals (2+ years preferred)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Startup founders, entrepreneurs, consultants
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Domain experts in tech, marketing, finance, HR, design, AI, etc.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Mentor Responsibilities</h4>
                <ul className="space-y-2">
                  {mentorResponsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2 text-muted-foreground">
                      <Target className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Benefits for Mentors</h4>
                <ul className="space-y-2">
                  {mentorBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-muted-foreground">
                      <Award className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button variant="success" size="lg" asChild>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                Become a Mentor <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* 3. Speakers & Trainers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Mic className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Speakers & Trainers</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">Inspire students through talks, sessions, and masterclasses.</p>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Who can apply</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Industry leaders
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Startup founders
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Career coaches
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    Trainers and educators
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Speaker Opportunities</h4>
                <ul className="space-y-2">
                  {speakerOpportunities.map((opp) => (
                    <li key={opp} className="flex items-start gap-2 text-muted-foreground">
                      <Mic className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
                <ul className="space-y-2">
                  {speakerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-muted-foreground">
                      <Award className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button variant="secondary" size="lg" asChild>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                Become a Speaker <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How The Student Spot Works (Structure) */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How The Student Spot <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This structure ensures clear communication, accountability, and fast execution.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {structureLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-heading font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{level.level}</h3>
                    <p className="text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Who Should <span className="text-gradient">Join</span> The Student Spot
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {whoShouldJoin.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-card rounded-xl border border-border px-6">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-background text-foreground border-t border-border mt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-bold mb-4"
          >
            Ready to Make an Impact?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-2"
          >
            Build leadership. Mentor talent. Inspire students.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Be part of India's fastest-growing student-led movement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="secondary" size="xl" asChild>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
                Get Involved Today <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
