import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users, Award, BookOpen, ArrowRight,
  CheckCircle, Mic, GraduationCap, Target, Heart, Lightbulb, TrendingUp, Handshake, MessageSquare, Briefcase
} from "lucide-react";

const GetInvolved = () => {
  const whyGetInvolved = [
    "Build real leadership & execution experience",
    "Access a nationwide student & professional network",
    "Improve career visibility & industry exposure",
    "Mentor and guide future talent",
    "Speak at colleges & national events",
    "Strengthen your personal brand",
    "Gain certificates, LORs & recognition",
    "Contribute to India’s Student-to-Founder ecosystem"
  ];

  const opportunities = [
    {
      id: "campus-team",
      icon: Users,
      title: "1. Campus Team (College Chapters)",
      subtitle: "Lead and grow The Student Spot chapter in your college.",
      sections: [
        {
          heading: "Who Can Apply",
          items: [
            "Undergraduate & postgraduate students",
            "Passionate about leadership & community building",
            "Ready to take ownership and work in a structured team"
          ]
        },
        {
          heading: "Campus Roles",
          tags: ["Campus Lead", "Co-Lead", "Social Media Manager", "Content Creator", "Event Coordinator", "Creative & Design", "PR & Community", "Outreach & Operations"]
        },
        {
          heading: "What You Gain",
          items: [
            "Leadership Certificate & LOR",
            "Hands-on event & project experience",
            "Priority access to internships & jobs",
            "Growth to District, State & National roles"
          ]
        }
      ],
      link: "https://forms.gle/GGGKNDZYFXBgqsqw8",
      linkText: "Apply for Campus Team"
    },
    {
      id: "core-team",
      icon: Target,
      title: "2. TSS Core Team",
      subtitle: "Build. Lead. Scale. Drive national strategy, partnerships, and ecosystem expansion.",
      sections: [
        {
          heading: "Who Can Apply",
          items: [
            "Highly driven students or young professionals",
            "Former Campus Leads (preferred)",
            "Strong ownership & execution mindset"
          ]
        },
        {
          heading: "What You’ll Do",
          items: [
            "Lead national initiatives",
            "Build corporate & startup partnerships",
            "Manage state & campus growth",
            "Create scalable systems"
          ]
        },
        {
          heading: "What You Gain",
          items: [
            "National leadership exposure",
            "Direct access to founders & corporates",
            "Strong LOR & credibility",
            "Fast-track growth opportunities"
          ]
        }
      ],
      link: "https://forms.gle/DyfMSzGJdQMVBbqRA",
      linkText: "Apply for Core Team"
    },
    {
      id: "mentors",
      icon: BookOpen,
      title: "3. Mentors & Industry Experts",
      subtitle: "Guide students with real-world insights and experience.",
      sections: [
        {
          heading: "Who Can Apply",
          items: [
            "Working professionals (2+ years preferred)",
            "Startup founders & entrepreneurs",
            "Domain experts (Tech, Marketing, Finance, HR, AI, Design, etc.)"
          ]
        },
        {
          heading: "Responsibilities",
          items: [
            "Conduct webinars/workshops",
            "Guide student leaders & interns",
            "Share career journeys",
            "Support placement readiness"
          ]
        },
        {
          heading: "Benefits",
          items: [
            "Nationwide visibility",
            "Personal brand building",
            "Recognition & certificates",
            "Access to high-potential talent"
          ]
        }
      ],
      link: "https://forms.gle/buTfbTq9pE1mAGTo9",
      linkText: "Apply as a Mentor"
    },
    {
      id: "speakers",
      icon: Mic,
      title: "4. Speakers & Trainers",
      subtitle: "Inspire and educate students through impactful sessions.",
      sections: [
        {
          heading: "Opportunities",
          items: [
            "College workshops",
            "Career talks",
            "Skill masterclasses",
            "Panel discussions",
            "State & national-level events"
          ]
        },
        {
          heading: "Benefits",
          items: [
            "Speaking opportunities across India",
            "Brand visibility with campuses",
            "Professional recognition",
            "Paid & unpaid options depending on event type"
          ]
        }
      ],
      link: "https://forms.gle/buTfbTq9pE1mAGTo9",
      linkText: "Apply as a Speaker"
    },
    {
      id: "volunteers",
      icon: Heart,
      title: "5. Event Volunteers",
      subtitle: "Support on-ground & virtual events, workshops, and large-scale initiatives.",
      sections: [
        {
          heading: "Who Can Apply",
          items: [
            "Students interested in event management",
            "Individuals who want exposure to real execution",
            "Beginners looking for hands-on experience"
          ]
        },
        {
          heading: "What You Gain",
          items: [
            "Event experience",
            "Certificates",
            "Networking access",
            "Leadership growth opportunities"
          ]
        }
      ],
      link: "https://forms.gle/BQThbSQ9NGzLHJ9i8",
      linkText: "Register as a Volunteer"
    },
    {
      id: "collaborations",
      icon: Handshake,
      title: "6. Collaborations & Promotions",
      subtitle: "Colleges, companies, startups, incubators, and institutes can collaborate for:",
      sections: [
        {
          heading: "Opportunities",
          items: [
            "Workshops & campus events",
            "Hiring drives",
            "Startup programs",
            "Promotions & campaigns",
            "Co-branded initiatives"
          ]
        }
      ],
      link: "https://forms.gle/ZjNXgeujjKk46D72A",
      linkText: "Collaboration Form"
    },
    {
      id: "feedback",
      icon: MessageSquare,
      title: "7. Community Feedback & Suggestions",
      subtitle: "Help us improve and build better opportunities for everyone in The Student Spot ecosystem.",
      sections: [
        {
          heading: "Why Feedback Matters",
          items: [
            "Your suggestions, ideas, and honest feedback help us grow stronger and serve you better.",
            "Takes just 2 minutes."
          ]
        }
      ],
      link: "https://forms.gle/z68HmXkPvHGvTaQb6",
      linkText: "Submit Feedback"
    }
  ];

  const structureLevels = [
    {
      level: "1. College Level",
      description: "Campus teams execute events and drive local growth.",
    },
    {
      level: "2. District Level",
      description: "District Directors manage multiple colleges.",
    },
    {
      level: "3. State Level",
      description: "State Leads coordinate partnerships and expansion.",
    },
    {
      level: "4. National Level",
      description: "The core team handles strategy, technology, revenue, and ecosystem building.",
    },
  ];

  const whoShouldJoin = [
    { icon: GraduationCap, text: "Students who want more than classroom learning" },
    { icon: Users, text: "Leaders who want to build communities" },
    { icon: Briefcase, text: "Professionals who want to give back" },
    { icon: Mic, text: "Speakers who want real student impact" },
    { icon: Lightbulb, text: "Mentors shaping future founders" },
    { icon: Heart, text: "Volunteers who want hands-on exposure" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
        {/* Dynamic Background Blurs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 xl:col-span-8 mx-auto xl:mx-0 text-center xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm mx-auto xl:mx-0"
              >
                <TrendingUp className="w-4 h-4" />
                Get Involved
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight"
              >
                Get Involved with <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">The Student Spot</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-foreground mb-6"
              >
                Build. Lead. Mentor. Speak. Volunteer. Grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto xl:mx-0 space-y-4"
              >
                <p>
                  The Student Spot is one of India’s fastest-growing student-led ecosystems connecting
                  students, professionals, startups, colleges, incubators, and organizations nationwide.
                </p>
                <p className="font-semibold text-foreground">
                  Whether you are a student leader, mentor, speaker, volunteer, or industry professional,
                  there is a place for you to create real impact.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center xl:justify-start"
              >
                <Button variant="hero" size="xl" className="h-16 px-10 text-lg shadow-xl shadow-primary/25 rounded-full hover:scale-105 transition-transform" onClick={() => document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Involved Today <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Get Involved */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                Why Get <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Involved?</span>
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mb-8"></div>
              <p className="text-xl text-white/80 font-medium">
                We offer a platform for growth, networking, and leadership across India.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
            >
              {whyGetInvolved.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities-section" className="py-24 lg:py-32 bg-accent/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Opportunities to <span className="text-gradient">Get Involved</span>
            </h2>
          </motion.div>

          <div className="grid gap-10 max-w-5xl mx-auto">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-[2rem] p-8 lg:p-10 border border-border shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 relative z-10 border-b border-border/50 pb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                    <opp.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-2">{opp.title}</h3>
                    <p className="text-lg text-muted-foreground font-medium">{opp.subtitle}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 relative z-10">
                  {opp.sections.map((section, idx) => (
                    <div key={idx} className={opp.sections.length === 1 ? "md:col-span-2 lg:col-span-3" : ""}>
                      <h4 className="font-bold text-foreground mb-4 text-lg border-l-4 border-primary pl-3">{section.heading}</h4>

                      {section.items && (
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.tags && (
                        <div className="flex flex-wrap gap-2">
                          {section.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 bg-secondary/10 text-secondary text-sm font-medium rounded-full border border-secondary/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="relative z-10">
                  <Button variant="default" size="lg" className="rounded-full px-8 shadow-md hover:scale-105 transition-transform" asChild>
                    <a href={opp.link} target="_blank" rel="noopener noreferrer">
                      {opp.linkText} <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How The Student Spot Works */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How The Student Spot <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Structured leadership ensures clarity, accountability, and fast execution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {structureLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-sm text-center relative overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{level.level}</h3>
                <p className="text-muted-foreground text-lg">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-20 lg:py-28 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Who Should <span className="text-gradient">Join?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whoShouldJoin.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border flex items-center gap-5 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-primary/20 max-w-6xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                Ready to Make an Impact?
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {["Build leadership.", "Mentor talent.", "Inspire students.", "Create opportunities."].map((text, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium text-lg">
                    {text}
                  </div>
                ))}
              </div>

              <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-3xl mx-auto">
                Be part of India’s growing Student-to-Founder movement.
              </p>

              <Button variant="hero" size="xl" className="h-16 px-12 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform bg-white text-primary hover:bg-white/90" onClick={() => document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Involved Today <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
