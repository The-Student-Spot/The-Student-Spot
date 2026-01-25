
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import tssLogo from "@/assets/tss-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "For You",
    children: [
      { name: "For Students", path: "/students" },
      { name: "For Colleges", path: "/colleges" },
      { name: "For Companies", path: "/companies" },
      { name: "For Coaching Institutes", path: "/coaching-partners" },
    ]
  },
  { name: "Get Involved", path: "/get-involved" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={tssLogo} alt="The Student Spot" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
              The Student Spot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-card rounded-xl shadow-card border border-border overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block px-4 py-3 text-sm hover:bg-accent transition-colors ${
                                isActive(child.path) ? "text-primary bg-accent" : "text-foreground"
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
                <Link to="/auth">Login / Signup</Link>
            </Button>
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="py-2">
                      <span className="text-sm font-medium text-muted-foreground">{link.name}</span>
                      <div className="ml-4 mt-2 space-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block py-2 text-sm ${
                              isActive(child.path) ? "text-primary" : "text-foreground"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-3 text-sm font-medium ${
                        isActive(link.path) ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Button variant="outline" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>Login / Signup</Link>
                </Button>
                <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Partner With Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
