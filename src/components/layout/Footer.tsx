import { Link } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Send,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import tssLogo from "@/assets/tss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, behavior: "auto" });
  };

  const footerLinks = {
    platform: [
      { name: "For Students", path: "/students" },
      { name: "For Colleges", path: "/colleges" },
      { name: "For Companies, Recruiters & Startups", path: "/companies" },
      { name: "For Coaching Institutes", path: "/coaching-partners" },
      { name: "For Incubators", path: "/incubators" },
      { name: "For Mentors & Speakers", path: "/mentors" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      href: "https://whatsapp.com/channel/0029Vb6ft6072WTxJ5eMKA2I",
      label: "WhatsApp Channel",
    },
    { icon: Instagram, href: "https://www.instagram.com/the_studentspot", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/thestudentspot/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/the_studentspot", label: "X (Twitter)" },
    { icon: Youtube, href: "https://youtube.com/@the.studentspot", label: "YouTube" },
    { icon: Send, href: "https://t.me/thestudentspot", label: "Telegram" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={tssLogo} alt="The Student Spot" className="w-8 h-8" />
              </div>
              <span className="font-heading text-xl font-bold">
                The Student Spot
              </span>
            </Link>

            <p className="font-semibold mb-2">
              From Student to Founder: One National Ecosystem
            </p>

            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-sm">
              Connecting students, colleges, companies, startups, recruiters,
              and incubators to create real career and startup outcomes across India.
            </p>

            {/* Social */}
            <div>
              <h4 className="font-heading font-semibold mb-3 text-sm">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-primary-foreground/80 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact.thestudentspot@gmail.com">
                  contact.thestudentspot@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+919581929676">+91 9581929676</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
          <p>
            © {currentYear} The Student Spot. All Rights Reserved.
          </p>

          <p className="text-center md:text-right">
            Building India’s Largest Student-to-Founder Ecosystem.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;