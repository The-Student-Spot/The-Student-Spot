import { Link } from "react-router-dom";
import { Linkedin, Instagram, Send, MessageCircle, Mail, MapPin, Phone, Twitter, Youtube, ExternalLink } from "lucide-react";
import tssLogo from "@/assets/tss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const footerLinks = {
    platform: [
      { name: "For Students", path: "/students" },
      { name: "For Colleges", path: "/colleges" },
      { name: "For Companies", path: "/companies" },
      { name: "For Coaching Institutes", path: "/coaching-partners" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: MessageCircle, href: "https://wa.me/919581929676?text=Hello+TheStudentSpot%21", label: "WhatsApp" },
    { icon: Send, href: "https://t.me/thestudentspot", label: "Telegram" },
    { icon: Instagram, href: "https://www.instagram.com/the_studentspot", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/the_studentspot?s=09", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/thestudentspot", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@the.studentspot", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
                <img src={tssLogo} alt="The Student Spot" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-heading font-bold text-xl">The Student Spot</span>
            </Link>
            <p className="text-primary-foreground/90 font-medium mb-2">From Student to Founder</p>
            <p className="text-primary-foreground/80 mb-6 max-w-sm text-sm">
              India’s growing Student-to-Founder ecosystem — connecting ambition with execution across campuses, startups, and companies.
            </p>

            {/* Social Links */}
            <div>
              <h4 className="font-heading font-semibold mb-3 text-sm">Connect With Us</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Get in Touch */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact.thestudentspot@gmail.com" className="hover:text-primary-foreground transition-colors text-sm">
                  contact.thestudentspot@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919581929676" className="hover:text-primary-foreground transition-colors">
                  +91 9581929676
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">© {currentYear} The Student Spot. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-primary-foreground/70">
            <Link to="/privacy" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" onClick={scrollToTop} className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;