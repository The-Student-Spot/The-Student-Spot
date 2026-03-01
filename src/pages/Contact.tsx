import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail, Phone, MapPin, Linkedin, Instagram,
  Send, MessageCircle, ArrowRight, Twitter, Youtube, User, Globe
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    subject: "",
    message: "",
  });

  const roles = [
    "Student", "College", "Company", "Startup",
    "Mentor", "Recruiter", "Incubator", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", role: "Student", subject: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact.thestudentspot@gmail.com", href: "mailto:contact.thestudentspot@gmail.com" },
    { icon: Phone, label: "Phone / WhatsApp", value: "+91 9581929676", href: "tel:+919581929676" },
    { icon: MapPin, label: "Location", value: "Hyderabad, India", href: null },
    { icon: MessageCircle, label: "Direct WhatsApp for Collaboration", value: "Chat with us", href: "https://wa.me/919581929676?text=Hello+TheStudentSpot%21" },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Vb6ft6072WTxJ5eMKA2I" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/the_studentspot" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/thestudentspot/" },
    { icon: Twitter, label: "X (Twitter)", href: "https://x.com/the_studentspot" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@thestudentspot" },
    { icon: Send, label: "Telegram", href: "https://t.me/thestudentspot" },
  ];

  const founderLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rajkamalprls" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/rajkamalpanthagani" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
        {/* Dynamic Background Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-primary/20 shadow-sm"
          >
            <Globe className="w-4 h-4" />
            Contact Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight"
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Connect.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-foreground mb-4 max-w-3xl mx-auto"
          >
            Have questions? Want to collaborate? Looking to hire, mentor, speak, or partner with The Student Spot?
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-card rounded-[2rem] p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <h2 className="font-heading text-3xl font-bold text-foreground mb-8 relative z-10">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-background border-border h-12 rounded-xl focus-visible:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-background border-border h-12 rounded-xl focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">I am a:</label>
                    <div className="relative">
                      <select
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      className="bg-background border-border h-12 rounded-xl focus-visible:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="bg-background border-border rounded-xl focus-visible:ring-primary resize-none p-4"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full h-14 rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-12"
            >
              {/* Direct Touch */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full"></span>
                  Get in Touch Directly
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-foreground font-bold hover:text-primary transition-colors text-lg" target="_blank" rel="noopener noreferrer">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-bold text-lg">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder Section */}
              <div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-accent border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-2xl bg-white/50 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs uppercase tracking-widest text-primary font-bold mb-1">Founder Contact</h4>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-1">Rajkamal Panthagani</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-4">Founder, The Student Spot</p>

                      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                        {founderLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary hover:text-primary transition-colors text-sm font-medium shadow-sm"
                          >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Follow & Connect</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-primary/5 hover:border-primary/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <social.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-center font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 relative overflow-hidden bg-primary/5 border-t border-primary/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight text-foreground/90">
              Whether you’re a student looking for direction,<br />
              a company looking for talent,<br />
              a mentor ready to guide,<br />
              or an incubator building innovation—
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full my-8 shadow-sm"></div>
            <p className="font-heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary pb-2">
              We’re ready to build with you.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
