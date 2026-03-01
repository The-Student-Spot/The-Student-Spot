import { Link } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Send,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import tssLogo from "@/assets/tss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    platform: [
      { name: "For Students", path: "/students" },
      { name: "For Colleges", path: "/colleges" },
      { name: "For Companies, Recruiters & Startups", path: "/companies" },
      { name: "For Coaching Institutes", path: "/coaching-partners" },
      { name: "For Incubators", path: "/incubators" },
      { name: "For Startups", path: "/startups" },
    ],
    ecosystem: [
      { name: "Opportunities", path: "/opportunities" },
      { name: "Internships & Jobs", path: "/jobs" },
      { name: "Freelance Projects", path: "/freelance" },
      { name: "Startup & Incubation Support", path: "/incubation" },
      { name: "Workshops & Events", path: "/events" },
      { name: "Campus Chapters", path: "/chapters" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/the_studentspot", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/thestudentspot/", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@the.studentspot", label: "YouTube" },
    { icon: FaWhatsapp, href: "https://whatsapp.com/channel/0029Vb6ft6072WTxJ5eMKA2I", label: "WhatsApp Channel" },
    { icon: Send, href: "https://t.me/thestudentspot", label: "Telegram" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-white text-orange-950/80 py-20 overflow-hidden border-t border-orange-200/50">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,247,237,0.4),transparent_50%)]"></div>

      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>

      <div className="container relative mx-auto px-4 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col pr-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="group flex flex-col gap-3 mb-8 inline-block w-fit"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-orange-200/50 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-orange-50/50 group-hover:border-orange-400/40 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                  <img src={tssLogo} alt="The Student Spot" className="w-9 h-9 object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-heading text-2xl font-bold text-orange-950 tracking-tight">
                    The Student Spot
                  </span>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-[0.2em] mt-1">
                    One National Ecosystem
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-base text-orange-900/80 leading-relaxed mb-8 max-w-sm font-medium">
              Connecting students, colleges, companies, startups, recruiters,
              and incubators to create real career and startup outcomes across India.
            </p>

            <div className="mt-auto">
              <h4 className="font-heading text-xs font-bold text-orange-950/50 mb-5 uppercase tracking-[0.2em]">
                Get in Touch
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <a href="mailto:contact.thestudentspot@gmail.com" className="flex items-center gap-3 text-orange-900/70 hover:text-orange-950 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white border border-orange-200/50 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-300 transition-all duration-300">
                      <Mail className="w-4 h-4 text-orange-600 group-hover:text-orange-700" />
                    </div>
                    contact.thestudentspot@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919581929676" className="flex items-center gap-3 text-orange-900/70 hover:text-orange-950 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white border border-orange-200/50 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-300 transition-all duration-300">
                      <Phone className="w-4 h-4 text-orange-600 group-hover:text-orange-700" />
                    </div>
                    +91 9581929676
                  </a>
                </li>
                <li className="flex items-center gap-3 text-orange-900/70">
                  <div className="w-10 h-10 rounded-full bg-white border border-orange-200/50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  3rd Floor, eternal corporate services, Hash include, Durgam Cheruvu Rd, D Block, Kavuri Hills, Madhapur, Hyderabad, Telangana 500081
                </li>
              </ul>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-10 pt-2">

            {/* Platform */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-orange-950 mb-6 uppercase tracking-[0.15em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Platform
              </h4>
              <ul className="space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-[15px] font-medium text-orange-800/80 hover:text-orange-950 hover:translate-x-1 hover:font-bold transition-all duration-300 flex items-center w-fit"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-orange-950 mb-6 uppercase tracking-[0.15em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                Ecosystem
              </h4>
              <ul className="space-y-4">
                {footerLinks.ecosystem.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-[15px] font-medium text-orange-800/80 hover:text-orange-950 hover:translate-x-1 hover:font-bold transition-all duration-300 flex items-center w-fit"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Socials */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-orange-950 mb-6 uppercase tracking-[0.15em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-300"></span>
                Company
              </h4>
              <ul className="space-y-4 mb-12">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-[15px] font-medium text-orange-800/80 hover:text-orange-950 hover:translate-x-1 hover:font-bold transition-all duration-300 flex items-center w-fit"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white border border-orange-200/60 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-700 text-orange-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.15)]"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-orange-200/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[15px] font-medium text-orange-900/60 flex items-center gap-2">
            © {currentYear} The Student Spot. All Rights Reserved.
          </p>

          <p className="text-[15px] text-orange-950 font-bold tracking-wide">
            Building India’s Largest Student-to-Founder Ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;