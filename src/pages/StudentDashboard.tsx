
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Bell,
  Bookmark,
  Briefcase,
  Building,
  Code,
  Compass,
  FileText,
  GraduationCap,
  Home,
  LifeBuoy,
  Lightbulb,
  LogOut,
  Mail,
  Menu,
  Mic,
  MessageSquare,
  Rocket,
  School,
  Settings,
  Star,
  Users,
  X,
  ChevronRight,
  Calendar,
  Handshake,
  BadgeIndianRupee,
  Video,
  ArrowLeft,
  Edit2,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { loadUserBookmarks, type SavedNetworkItem } from "@/lib/networkBookmarks";

export const dashboardSections = [
  {
    id: "home",
    title: "Home",
    description: "A quick view of your dashboard and next actions.",
    icon: <Home className="h-4 w-4" />,
    items: [
      { icon: <GraduationCap />, title: "Welcome Back", description: "Start where you left off and pick up your next step." },
      { icon: <Bell />, title: "Alerts", description: "Check new updates, reminders, and activity." },
      { icon: <Star />, title: "Highlights", description: "Track the most important opportunities for you." },
    ],
  },
  {
    id: "opportunities",
    title: "Opportunities",
    description: "Jobs, internships, and programs to apply for.",
    icon: <Briefcase className="h-4 w-4" />,
    items: [
      { icon: <Briefcase />, title: "Private Jobs", description: "Find jobs in top companies." },
      { icon: <Building />, title: "Government Jobs", description: "Explore public sector careers." },
      { icon: <Bookmark />, title: "Application Tracker", description: "Manage your job applications." },
      { icon: <Rocket />, title: "Startup Jobs", description: "Join innovative startups." },
    ],
  },
  {
    id: "freelance",
    title: "Freelance",
    description: "Build income and experience with project work.",
    icon: <BadgeIndianRupee className="h-4 w-4" />,
    items: [
      { icon: <Code />, title: "Project Gigs", description: "Pick up part-time work aligned to your skills." },
      { icon: <FileText />, title: "Portfolio Builder", description: "Showcase your work to clients and recruiters." },
      { icon: <Settings />, title: "Freelance Tools", description: "Use templates and checklists to deliver faster." },
    ],
  },
  {
    id: "learning",
    title: "Learning",
    description: "Build skills, prepare for tests, and practice interviews.",
    icon: <Code className="h-4 w-4" />,
    items: [
      { icon: <Code />, title: "Coding Practice", description: "Sharpen your skills with challenges." },
      { icon: <Mic />, title: "AI Mock Interviews", description: "Practice interviews with AI feedback." },
      { icon: <FileText />, title: "Notes & Books", description: "Access a library of resources." },
      { icon: <Compass />, title: "Exam Prep", description: "Prepare for your exams effectively." },
      { icon: <Star />, title: "Skill Courses", description: "Upskill with expert-led courses." },
    ],
  },
  {
    id: "startupHub",
    title: "Startup Hub",
    description: "Launch support, founder stories, and templates.",
    icon: <Rocket className="h-4 w-4" />,
    items: [
      { icon: <Rocket />, title: "Startup Launchpad", description: "Tools to launch your venture." },
      { icon: <Lightbulb />, title: "Founder Stories", description: "Learn from successful founders." },
      { icon: <FileText />, title: "Tools & Templates", description: "Get resources for your startup." },
    ],
  },
  {
    id: "events",
    title: "Events",
    description: "Webinars, workshops, and announcements.",
    icon: <Calendar className="h-4 w-4" />,
    items: [
      { icon: <Calendar />, title: "Events & Webinars", description: "Join events and webinars." },
      { icon: <Video />, title: "Workshops", description: "Attend live sessions and expert talks." },
      { icon: <Mail />, title: "Announcements", description: "Stay updated on key dates and notices." },
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship",
    description: "Guidance from mentors and support when you need it.",
    icon: <Users className="h-4 w-4" />,
    items: [
      { icon: <Users />, title: "Mentorship Zone", description: "Connect with experienced mentors." },
      { icon: <MessageSquare />, title: "1:1 Guidance", description: "Book time with mentors and coaches." },
      { icon: <LifeBuoy />, title: "Support", description: "Get help when you need it." },
    ],
  },
  {
    id: "networks",
    title: "Networks",
    description: "Connect with peers, collaborators, and resources.",
    icon: <Handshake className="h-4 w-4" />,
    items: [
      { icon: <Users />, title: "Peer Network", description: "Connect with other students and creators." },
      { icon: <Handshake />, title: "Collaborations", description: "Find teammates for projects and ideas." },
      { icon: <Settings />, title: "Resources & Tools", description: "Find helpful resources and tools." },
    ],
  },
  {
    id: "csrImpact",
    title: "CSR / Impact",
    description: "Volunteer work, impact initiatives, and social projects.",
    icon: <School className="h-4 w-4" />,
    items: [
      { icon: <School />, title: "CSR Projects", description: "Join social impact and community initiatives." },
      { icon: <LifeBuoy />, title: "Volunteering", description: "Contribute to programs that make a difference." },
      { icon: <Users />, title: "Impact Stories", description: "See how students are creating change." },
    ],
  },
  {
    id: "profile",
    title: "Profile",
    description: "Review account details and sign out when needed.",
    icon: <GraduationCap className="h-4 w-4" />,
    items: [
      { icon: <GraduationCap />, title: "My Profile", description: "Review your details and dashboard role." },
      { icon: <Bell />, title: "Notifications", description: "Check messages and recent updates." },
      { icon: <LogOut />, title: "Sign Out", description: "Log out when you are done." },
    ],
  },
];

export const dashboardNavItems = [
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

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};


const DashboardCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
    className="bg-card rounded-xl p-5 flex flex-col items-start gap-4 border border-transparent hover:border-yellow-400 transition-all group h-full"
  >
    <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-md text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
    <div className="text-sm font-medium text-yellow-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      View More <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedNetworks, setSavedNetworks] = useState<SavedNetworkItem[]>([]);
  const [savedLoading, setSavedLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setSavedLoading(true);
    void (async () => {
      const items = await loadUserBookmarks();
      if (active) {
        setSavedNetworks(items);
        setSavedLoading(false);
      }
    })();
    return () => { active = false; };
  // Re-run once Firebase auth resolves (user.uid becomes available)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getSectionIndex = (sectionId?: string) => {
    if (!sectionId) return -1;
    const navItem = dashboardNavItems.find(item => item.id === sectionId);
    if (!navItem) return -1;
    return dashboardNavItems.indexOf(navItem);
  };

  const sectionIndex = getSectionIndex(section);
  const isSingleSection = section && sectionIndex !== -1;
  const currentSection = isSingleSection ? dashboardSections[sectionIndex] : null;

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-slate-50">
      <aside className="hidden border-r bg-card lg:block sticky top-0 h-screen">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-20 items-center border-b px-6">
            <div className="flex items-center gap-2 font-bold text-lg text-yellow-500">
              <GraduationCap className="h-6 w-6" />
              <div className="flex flex-col leading-tight">
                <span>The Student Spot</span>
                <span className="text-[11px] font-medium text-muted-foreground">Student Dashboard</span>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium space-y-1">
            {dashboardNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "profile") {
                    navigate("/student-profile");
                  } else if (item.id === "csrImpact") {
                    navigate("/dashboard/csr-impact");
                  } else {
                    navigate(`/student-module/${item.id}`);
                  }
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50 text-left"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-yellow-500">{user.email?.[0].toUpperCase()}</div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{user.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-500 hover:text-yellow-500 flex-shrink-0">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Login</Button>
            )}
          </div>
        </div>
      </aside>
      <main className="flex flex-col flex-1 gap-0 p-4 lg:p-8 scroll-smooth">
        <header className="relative mb-6 rounded-xl border border-slate-200 bg-card px-4 lg:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {isSingleSection && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/student-dashboard")}
                className="text-slate-600 hover:bg-slate-100 flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-yellow-500" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-slate-800">The Student Spot</span>
                <span className="text-xs text-muted-foreground">Student Dashboard</span>
              </div>
            </div>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetContent side="left" className="w-[320px] p-0 bg-card">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="h-5 w-5 text-yellow-500" />
                    The Student Spot
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 py-4 space-y-2 overflow-y-auto h-full">
                  {dashboardNavItems.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-left"
                        onClick={() => {
                          if (item.id === "profile") {
                            navigate("/student-profile");
                          } else if (item.id === "csrImpact") {
                            navigate("/dashboard/csr-impact");
                          } else {
                            navigate(`/student-module/${item.id}`);
                          }
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden rounded-full border-slate-200 bg-white"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold text-slate-800 truncate">Welcome, {user?.displayName || "Student"}!</h1>
          </div>
          <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200 hover:bg-slate-100 shrink-0">
            <Bell className="h-5 w-5 text-slate-500" />
          </Button>
        </header>
        <div className="flex-1 space-y-10 pt-4">
          {isSingleSection && currentSection ? (
            // Single Section View
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentSection.title}</h2>
                <p className="text-muted-foreground">{currentSection.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {currentSection.items?.map((item) => (
                  <DashboardCard key={item.title} {...item} />
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              <section id="home" className="scroll-mt-24">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-700">Home</h2>
                    <p className="text-sm text-muted-foreground">Your dashboard overview and next steps.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {dashboardSections[0].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="opportunities" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Opportunities</h2>
                <p className="text-sm text-muted-foreground mb-4">Jobs, internships, and application tracking.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {dashboardSections[1].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="freelance" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Freelance</h2>
                <p className="text-sm text-muted-foreground mb-4">Project work, portfolios, and earning on the side.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[2].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="learning" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Learning</h2>
                <p className="text-sm text-muted-foreground mb-4">Build skills, prepare for tests, and practice interviews.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {dashboardSections[3].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="startupHub" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Startup Hub</h2>
                <p className="text-sm text-muted-foreground mb-4">Launch support, founder stories, and templates.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[4].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="events" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Events</h2>
                <p className="text-sm text-muted-foreground mb-4">Webinars, workshops, and announcements.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[5].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="mentorship" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Mentorship</h2>
                <p className="text-sm text-muted-foreground mb-4">Guidance from mentors and support when you need it.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[6].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="networks" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">Networks</h2>
                <p className="text-sm text-muted-foreground mb-4">Connect with peers, collaborators, and resources.</p>

                {/* Saved Networks Panel */}
                {savedLoading ? (
                  <div className="bg-card rounded-xl p-5 border border-slate-200 mb-5 animate-pulse h-28" />
                ) : savedNetworks.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-5 mb-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Handshake className="h-5 w-5 text-yellow-600" />
                        <span className="font-semibold text-slate-800">Saved Networks</span>
                        <Badge className="bg-yellow-400 text-yellow-900 font-bold">{savedNetworks.length}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/student-module/networks")}
                        className="text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100 text-xs gap-1"
                      >
                        View All <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {savedNetworks.slice(0, 6).map((item) => (
                        <div
                          key={item.item_id}
                          onClick={() => navigate("/student-module/networks")}
                          className="cursor-pointer rounded-lg bg-white border border-yellow-200 px-3 py-2 hover:border-yellow-400 hover:shadow-sm transition-all"
                        >
                          <p className="text-xs font-semibold text-slate-800 truncate max-w-[160px]">{item.item_title ?? item.item_id}</p>
                          <p className="text-[10px] text-yellow-700 font-medium mt-0.5">{item.item_type}</p>
                        </div>
                      ))}
                      {savedNetworks.length > 6 && (
                        <div
                          onClick={() => navigate("/student-module/networks")}
                          className="cursor-pointer rounded-lg bg-yellow-100 border border-yellow-300 px-3 py-2 flex items-center justify-center hover:bg-yellow-200 transition-all"
                        >
                          <span className="text-xs font-semibold text-yellow-800">+{savedNetworks.length - 6} more</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-card rounded-xl border border-dashed border-slate-200 p-4 mb-5 text-center">
                    <Handshake className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">No saved networks yet. <button onClick={() => navigate("/student-module/networks")} className="text-yellow-600 font-semibold hover:underline">Browse Networks →</button></p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[7].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="csrImpact" className="scroll-mt-24">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">CSR / Impact</h2>
                <p className="text-sm text-muted-foreground mb-4">Volunteer work, impact initiatives, and social projects.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {dashboardSections[8].items.map((item) => <DashboardCard key={item.title} {...item} />)}
                </div>
              </section>

              <section id="profile" className="scroll-mt-24 pb-6">
                <h2 className="text-lg font-semibold mb-1 text-slate-700">10. PROFILE</h2>
                <p className="text-sm text-muted-foreground mb-4">Sections, completion, and supporting profile areas.</p>
                <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5">
                  <div className="bg-card rounded-xl p-5 border border-slate-200 space-y-5">
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-3">Sections</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        {[
                          "Basic info",
                          "Education",
                          "Skills",
                          "Career interest",
                          "Resume",
                          "Portfolio",
                          "Startup interest",
                          "Proof of Work",
                          "Certificates & Achievements",
                          "Impact Work",
                        ].map((section) => (
                          <div key={section} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 hover:shadow-sm transition-shadow flex items-center justify-between">
                            <span>{section}</span>
                            <Badge className="bg-transparent text-yellow-600">•</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-3">Profile Completion</h3>
                      <div className="space-y-3">
                        {[
                          { label: "Basic info", value: "20%" },
                          { label: "Skills", value: "20%" },
                          { label: "Resume", value: "20%" },
                          { label: "Career track", value: "20%" },
                          { label: "Links & interests", value: "20%" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between rounded-lg bg-yellow-50 px-4 py-3 border border-yellow-100">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <span className="text-sm font-semibold text-yellow-700">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="bg-card rounded-xl p-5 border border-slate-200 micro-fade-up">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 profile-avatar bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold text-xl">
                          {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-semibold text-slate-800 truncate">{user?.displayName || "Student"}</div>
                          <div className="text-sm text-muted-foreground">Your public profile & completion</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-xl p-5 border border-slate-200 micro-fade-up">
                      <h3 className="font-semibold text-slate-800 mb-3">Basic Info</h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-medium text-slate-700">Name:</span> {user?.displayName || "Student"}</p>
                        <p><span className="font-medium text-slate-700">Email:</span> {user?.email}</p>
                        <p><span className="font-medium text-slate-700">Role:</span> Student</p>
                      </div>
                      <Button
                        onClick={() => navigate("/student-profile")}
                        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>

                    <div className="bg-card rounded-xl p-5 border border-slate-200">
                      <h3 className="font-semibold text-slate-800 mb-3">Career Interest</h3>
                      <p className="text-sm text-slate-600">Add your preferred domain, job track, and future goals here.</p>
                    </div>

                    <div className="bg-card rounded-xl p-5 border border-slate-200">
                      <h3 className="font-semibold text-slate-800 mb-3">Account Actions</h3>
                      <p className="text-sm text-muted-foreground mb-4">Use this to end your session safely.</p>
                      <Button onClick={handleLogout} variant="outline" className="w-full">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
