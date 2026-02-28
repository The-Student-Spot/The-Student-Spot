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
  ArrowRight,
} from "lucide-react";
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
      { name: "For Mentors & Speakers", path: "/mentors" },
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
    { icon: MessageCircle, href: "https://whatsapp.com/channel/0029Vb6ft6072WTxJ5eMKA2I", label: "WhatsApp Channel" },
    { icon: Send, href: "https://t.me/thestudentspot", label: "Telegram" },
  ];

  return (
    <footer className="relative bg-[#061026] text-slate-300 py-16 overflow-hidden border-t border-slate-800/50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container relative mx-auto px-4 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col pr-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="group flex flex-col gap-3 mb-6 inline-block w-fit"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <img src={tssLogo} alt="The Student Spot" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                    The Student Spot
                  </span>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-0.5">
                    One National Ecosystem
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm font-medium text-slate-300 mb-2">
              From Student to Founder: One National Ecosystem
            </p>
            <p className="text-sm text-slate-400/80 leading-relaxed mb-8 max-w-sm">
              Connecting students, colleges, companies, startups, recruiters,
              and incubators to create real career and startup outcomes across India.
            </p>

            <div className="mt-auto">
              <h4 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Get in Touch
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <a href="mailto:contact.thestudentspot@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                      <Mail className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    contact.thestudentspot@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919581929676" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                      <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    +91 9581929676
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <div className="w-9 h-9 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  Hyderabad, India
                </li>
              </ul>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 pt-2">
            
            {/* Platform */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                Platform
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors flex items-center group w-fit"
                    >
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                Ecosystem
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-indigo-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.ecosystem.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center group w-fit"
                    >
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Socials */}
            <div className="flex flex-col">
              <h4 className="font-heading text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-teal-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4 mb-10">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors flex items-center group w-fit"
                    >
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-teal-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800/40 hover:bg-white/10 border border-slate-700/50 hover:border-slate-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 text-slate-400 hover:text-white"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
            © {currentYear} The Student Spot. All Rights Reserved.
          </p>

          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-semibold text-center md:text-right tracking-wide">
            Building India’s Largest Student-to-Founder Ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;