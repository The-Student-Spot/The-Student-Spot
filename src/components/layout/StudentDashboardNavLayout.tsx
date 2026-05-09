import React, { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Bell,
  Briefcase,
  BadgeIndianRupee,
  Calendar,
  Code,
  GraduationCap,
  Home,
  Handshake,
  LogOut,
  Menu,
  Rocket,
  School,
  Users,
  X,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase className="h-4 w-4" /> },
  { id: "freelance", label: "Freelance", icon: <BadgeIndianRupee className="h-4 w-4" /> },
  { id: "learning", label: "Learning", icon: <Code className="h-4 w-4" /> },
  { id: "startupHub", label: "Startup Hub", icon: <Rocket className="h-4 w-4" /> },
  { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
  { id: "mentorship", label: "Mentorship", icon: <Users className="h-4 w-4" /> },
  { id: "networks", label: "Networks", icon: <Handshake className="h-4 w-4" /> },
  { id: "csrImpact", label: "CSR / Impact", icon: <School className="h-4 w-4" /> },
  { id: "profile", label: "Profile", icon: <GraduationCap className="h-4 w-4" /> },
];

interface StudentDashboardNavLayoutProps {
  children: ReactNode;
  activeSection?: string;
  headerTitle?: string;
  headerDescription?: string;
}

const StudentDashboardNavLayout = ({
  children,
  activeSection,
  headerTitle = "Student Dashboard",
  headerDescription,
}: StudentDashboardNavLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getActiveNavItem = () => {
    if (activeSection === "profile") return "profile";
    if (activeSection?.startsWith("module:")) {
      const moduleId = activeSection.split(":")[1];
      return moduleId;
    }
    return activeSection || "home";
  };

  const activeNavId = getActiveNavItem();

  const handleNavigation = (itemId: string) => {
    if (itemId === "profile") {
      navigate("/student-profile");
    } else if (itemId === "csrImpact") {
      navigate("/dashboard/csr-impact");
    } else if (itemId === "networks") {
      navigate("/dashboard/networks");
    } else {
      navigate(`/student-module/${itemId}`);
    }
    setMenuOpen(false);
  };

  const isNavItemActive = (itemId: string) => {
    return activeNavId === itemId;
  };

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50">
      {/* FIXED TOP NAVBAR - Static Branding with Hamburger */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 h-20 flex items-center px-4 lg:px-8">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Left: Hamburger + Branding */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                try {
                  if (window.innerWidth >= 1024) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setMenuOpen(true);
                  }
                } catch (e) {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="text-slate-600 p-2 rounded-md hover:shadow-sm hover:bg-yellow-50 transition-transform active:scale-95"
              aria-label="Toggle navigation"
              title="Toggle navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <GraduationCap className="h-6 w-6 text-yellow-500 flex-shrink-0" />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-bold text-slate-800 text-sm">The Student Spot</span>
              <span className="text-[11px] font-medium text-muted-foreground">Student Dashboard</span>
            </div>
          </div>

          {/* Center: Page Title (Desktop) */}
          <h1 className="hidden lg:block text-xl font-semibold text-slate-800 truncate flex-1 ml-8">
            {headerTitle}
          </h1>

          {/* Right: Actions (Sheet content exists to be opened by hamburger on mobile) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetContent side="left" className="w-[280px] p-0 bg-white">
                <SheetHeader className="border-b px-6 py-5 text-left sticky top-0 bg-white">
                  <SheetTitle className="flex items-center gap-2 text-base">
                    <GraduationCap className="h-5 w-5 text-yellow-500" />
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-slate-800">Navigation</span>
                      <span className="text-xs font-medium text-muted-foreground">Modules</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Menu */}
                <div className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-left font-medium ${
                          isNavItemActive(item.id)
                            ? "bg-yellow-50 text-yellow-600 border-l-4 border-yellow-500"
                            : "text-slate-600 hover:text-yellow-600 hover:bg-yellow-50"
                        }`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile: User Profile Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-3">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600 flex-shrink-0">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{user.displayName || user.email}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-slate-500 hover:text-red-500 flex-shrink-0 h-8 w-8"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => navigate("/auth")}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-sm"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Notifications Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* CONTENT AREA - Adjusted for fixed navbar */}
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Desktop Sidebar - Collapsible (icons visible when collapsed) */}
        <aside
          className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out sticky top-20 h-[calc(100vh-80px)] ${
            sidebarOpen ? "w-[280px]" : "w-20"
          }`}
        >
          <>
            {/* Desktop Navigation Menu */}
            <nav className="flex-1 py-4 px-1 text-sm font-medium space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2 transition-all text-left group ${
                    isNavItemActive(item.id)
                      ? "bg-yellow-50 text-yellow-600 border-l-4 border-yellow-500 pl-2"
                      : "text-slate-600 hover:text-yellow-600 hover:bg-yellow-50"
                  } ${sidebarOpen ? "justify-start" : "justify-center"}`}
                >
                  <div
                    className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 ${
                      isNavItemActive(item.id)
                        ? "bg-yellow-50 text-yellow-600 shadow-md ring-1 ring-yellow-100"
                        : "text-slate-600 bg-white hover:bg-yellow-50 hover:shadow-sm"
                    }`}
                  >
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(item.icon as any, { className: "h-5 w-5" })
                      : item.icon}
                  </div>
                  <span className={`ml-2 transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Desktop: User Profile Footer */}
            <div className="border-t border-slate-200 p-3">
              {user ? (
                <div className={`flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600 flex-shrink-0">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div className={`${sidebarOpen ? "flex-1 min-w-0" : "sr-only"}`}>
                    <p className="text-xs font-semibold truncate">{user.displayName || user.email}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className={`text-slate-500 hover:text-red-500 flex-shrink-0 h-8 w-8 ${sidebarOpen ? "" : "ml-0"}`}
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/auth")}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-xs"
                >
                  Login
                </Button>
              )}
            </div>
          </>
        </aside>
        {/* Note: sidebar is toggled via top-left hamburger; removed right-edge toggle */}

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {/* Page Header */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 lg:hidden">{headerTitle}</h2>
              {headerDescription && (
                <p className="text-sm text-slate-600 mt-1">{headerDescription}</p>
              )}
            </div>

            {/* Page Content */}
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardNavLayout;
