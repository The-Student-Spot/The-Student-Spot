import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  Lightbulb,
  LogOut,
  School,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

type SectionKey =
  | "home"
  | "placement"
  | "industry"
  | "startup"
  | "events"
  | "partnerships"
  | "insights"
  | "resources"
  | "profile";

type PlacementType = "Campus Job" | "Internship";
type PartnerType = "Company" | "Mentor" | "Founder" | "Recruiter";
type ProgramType = "Workshop" | "Guest Lecture" | "Industry Session" | "Career Talk";
type StartupStage = "Idea" | "Validation" | "MVP" | "Traction" | "Incubation";
type EventType = "Hackathon" | "Innovation Challenge" | "Career Workshop" | "Startup Event";
type PartnershipCategory = "Hiring Partner" | "Workshop Partner" | "Startup Sponsor";

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  tone: "info" | "success" | "neutral";
};

type PlacementOpportunity = {
  id: string;
  title: string;
  company: string;
  type: PlacementType;
  studentsApplied: number;
  studentsShortlisted: number;
  studentsPlaced: number;
};

type CollaborationProgram = {
  id: string;
  partnerName: string;
  partnerType: PartnerType;
  programType: ProgramType;
  status: "Requested" | "Ongoing" | "Completed";
};

type StartupIdea = {
  id: string;
  title: string;
  founder: string;
  stage: StartupStage;
};

type CollegeEvent = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  registrations: number;
};

type CompanyPartnership = {
  id: string;
  companyName: string;
  type: PartnershipCategory;
  history: string;
};

type ResourceItem = {
  id: string;
  title: string;
  category: "Career Guide" | "Startup Resource" | "Workshop Material" | "Training Content";
};

type CollegeProfile = {
  collegeName: string;
  location: string;
  departments: string;
  placementOfficer: string;
  contact: string;
  highlights: string;
};

const routeToSection: Record<string, SectionKey> = {
  home: "home",
  placement: "placement",
  industry: "industry",
  startup: "startup",
  events: "events",
  partnerships: "partnerships",
  insights: "insights",
  resources: "resources",
  profile: "profile",
};

const sectionToRoute: Record<SectionKey, string> = {
  home: "home",
  placement: "placement",
  industry: "industry",
  startup: "startup",
  events: "events",
  partnerships: "partnerships",
  insights: "insights",
  resources: "resources",
  profile: "profile",
};

const sectionMeta: Record<SectionKey, { title: string; subtitle: string; nextStep: string }> = {
  home: {
    title: "College Overview",
    subtitle: "Campus Career + Startup Ecosystem System",
    nextStep: "Use quick actions to launch workshops, invite companies, and post events.",
  },
  placement: {
    title: "Placement Support",
    subtitle: "Improve student employability and placement outcomes",
    nextStep: "Share opportunities and monitor applied, shortlisted, and placed students.",
  },
  industry: {
    title: "Industry Collaborations",
    subtitle: "Connect colleges with real industry exposure",
    nextStep: "Send collaboration requests and track ongoing programs.",
  },
  startup: {
    title: "Startup Ecosystem",
    subtitle: "Support student founders from idea to execution",
    nextStep: "Track startup ideas, connect incubation support, and run pitch events.",
  },
  events: {
    title: "Events & Hackathons",
    subtitle: "Run campus engagement and innovation programs",
    nextStep: "Create events and monitor registrations with partner support.",
  },
  partnerships: {
    title: "Company Partnerships",
    subtitle: "Manage and grow company relationships",
    nextStep: "Maintain engagement history and partnership category visibility.",
  },
  insights: {
    title: "Student Insights",
    subtitle: "Basic data for placement and ecosystem decisions",
    nextStep: "Use metrics to guide reporting and performance tracking.",
  },
  resources: {
    title: "Resources",
    subtitle: "Structured support materials for students and faculty",
    nextStep: "Keep resources updated for career, startup, and training tracks.",
  },
  profile: {
    title: "College Profile",
    subtitle: "Manage college details and placement leadership info",
    nextStep: "Save profile updates to keep partner and student information accurate.",
  },
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="mb-5">
    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">{title}</span>
    </h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </motion.div>
);

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
  >
    {children}
  </motion.div>
);

const CollegeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();

  const activeSection: SectionKey = routeToSection[section || "home"] || "home";

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activityHistoryOpen, setActivityHistoryOpen] = useState(false);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([
    {
      id: "a-seed",
      title: "Dashboard loaded",
      detail: "College ecosystem dashboard is active.",
      tone: "info",
    },
  ]);

  const [placementItems, setPlacementItems] = useState<PlacementOpportunity[]>([
    {
      id: "p1",
      title: "Frontend Developer Internship",
      company: "NovaTech",
      type: "Internship",
      studentsApplied: 24,
      studentsShortlisted: 8,
      studentsPlaced: 2,
    },
    {
      id: "p2",
      title: "Graduate Analyst",
      company: "Aster Corp",
      type: "Campus Job",
      studentsApplied: 40,
      studentsShortlisted: 12,
      studentsPlaced: 4,
    },
  ]);
  const [placementForm, setPlacementForm] = useState({ title: "", company: "", type: "Campus Job" as PlacementType });

  const [collaborations, setCollaborations] = useState<CollaborationProgram[]>([
    { id: "c1", partnerName: "InnoWorks", partnerType: "Company", programType: "Workshop", status: "Ongoing" },
  ]);
  const [collabForm, setCollabForm] = useState({ partnerName: "", partnerType: "Company" as PartnerType, programType: "Workshop" as ProgramType });

  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>([
    { id: "s1", title: "Smart Campus Queue", founder: "Ananya", stage: "Validation" },
    { id: "s2", title: "Green Logistics Club", founder: "Rohit", stage: "Idea" },
  ]);
  const [startupIdeaForm, setStartupIdeaForm] = useState({ title: "", founder: "", stage: "Idea" as StartupStage });

  const [collegeEvents, setCollegeEvents] = useState<CollegeEvent[]>([
    { id: "e1", title: "Campus HackSprint", type: "Hackathon", date: "2026-04-18", registrations: 120 },
    { id: "e2", title: "Career Acceleration Workshop", type: "Career Workshop", date: "2026-04-28", registrations: 80 },
  ]);
  const [eventForm, setEventForm] = useState({ title: "", type: "Hackathon" as EventType, date: "" });

  const [companyPartnerships, setCompanyPartnerships] = useState<CompanyPartnership[]>([
    { id: "cp1", companyName: "BrightHire", type: "Hiring Partner", history: "Campus drive Q1 2026" },
  ]);
  const [partnershipForm, setPartnershipForm] = useState({ companyName: "", type: "Hiring Partner" as PartnershipCategory, history: "" });

  const [resources, setResources] = useState<ResourceItem[]>([
    { id: "r1", title: "Placement Interview Guide", category: "Career Guide" },
    { id: "r2", title: "Startup Pitch Deck Basics", category: "Startup Resource" },
  ]);
  const [resourceForm, setResourceForm] = useState({ title: "", category: "Career Guide" as ResourceItem["category"] });

  const [profile, setProfile] = useState<CollegeProfile>({
    collegeName: "",
    location: "",
    departments: "",
    placementOfficer: "",
    contact: "",
    highlights: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const currentSectionMeta = sectionMeta[activeSection];

  const addActivity = (title: string, detail: string, tone: ActivityItem["tone"] = "success") => {
    setActivityFeed((prev) => [{ id: `a-${Date.now()}`, title, detail, tone }, ...prev].slice(0, 8));
  };

  const goToSection = (next: SectionKey) => {
    navigate(`/college-dashboard/${sectionToRoute[next]}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handlePlacementSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlacementItems((prev) => [
      {
        id: `p-${Date.now()}`,
        title: placementForm.title,
        company: placementForm.company,
        type: placementForm.type,
        studentsApplied: 0,
        studentsShortlisted: 0,
        studentsPlaced: 0,
      },
      ...prev,
    ]);
    addActivity("Opportunity shared", `${placementForm.type} posted for students: ${placementForm.title}.`);
    setPlacementForm({ title: "", company: "", type: "Campus Job" });
  };

  const bumpPlacementMetric = (id: string, field: "studentsApplied" | "studentsShortlisted" | "studentsPlaced") => {
    setPlacementItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: item[field] + 1 } : item)));
    addActivity("Placement metric updated", `${field} increased for one opportunity.`, "info");
  };

  const handleCollabSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCollaborations((prev) => [
      {
        id: `c-${Date.now()}`,
        partnerName: collabForm.partnerName,
        partnerType: collabForm.partnerType,
        programType: collabForm.programType,
        status: "Requested",
      },
      ...prev,
    ]);
    addActivity("Collaboration requested", `${collabForm.partnerName} added to collaboration pipeline.`);
    setCollabForm({ partnerName: "", partnerType: "Company", programType: "Workshop" });
  };

  const setCollabStatus = (id: string, status: CollaborationProgram["status"]) => {
    setCollaborations((prev) => prev.map((program) => (program.id === id ? { ...program, status } : program)));
    addActivity("Program status updated", `Collaboration moved to ${status}.`, "info");
  };

  const handleStartupIdeaSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStartupIdeas((prev) => [
      {
        id: `s-${Date.now()}`,
        title: startupIdeaForm.title,
        founder: startupIdeaForm.founder,
        stage: startupIdeaForm.stage,
      },
      ...prev,
    ]);
    addActivity("Startup idea submitted", `${startupIdeaForm.title} added to founder pipeline.`);
    setStartupIdeaForm({ title: "", founder: "", stage: "Idea" });
  };

  const promoteStartupStage = (id: string) => {
    const stageOrder: StartupStage[] = ["Idea", "Validation", "MVP", "Traction", "Incubation"];
    setStartupIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== id) {
          return idea;
        }
        const index = stageOrder.indexOf(idea.stage);
        const nextStage = stageOrder[Math.min(index + 1, stageOrder.length - 1)];
        return { ...idea, stage: nextStage };
      }),
    );
    addActivity("Startup stage advanced", "A startup idea moved to the next execution stage.", "info");
  };

  const handleEventSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCollegeEvents((prev) => [
      {
        id: `e-${Date.now()}`,
        title: eventForm.title,
        type: eventForm.type,
        date: eventForm.date,
        registrations: 0,
      },
      ...prev,
    ]);
    addActivity("Event created", `${eventForm.title} added to campus event calendar.`);
    setEventForm({ title: "", type: "Hackathon", date: "" });
  };

  const registerEvent = (id: string) => {
    setCollegeEvents((prev) => prev.map((item) => (item.id === id ? { ...item, registrations: item.registrations + 1 } : item)));
    addActivity("Registration updated", "Event registration count increased.", "info");
  };

  const handlePartnershipSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompanyPartnerships((prev) => [
      {
        id: `cp-${Date.now()}`,
        companyName: partnershipForm.companyName,
        type: partnershipForm.type,
        history: partnershipForm.history,
      },
      ...prev,
    ]);
    addActivity("Partnership added", `${partnershipForm.companyName} added as ${partnershipForm.type}.`);
    setPartnershipForm({ companyName: "", type: "Hiring Partner", history: "" });
  };

  const handleResourceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResources((prev) => [{ id: `r-${Date.now()}`, ...resourceForm }, ...prev]);
    addActivity("Resource published", `${resourceForm.title} is now available for users.`);
    setResourceForm({ title: "", category: "Career Guide" });
  };

  const handleProfileSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaved(true);
    addActivity("Profile updated", "College profile details were saved successfully.");
  };

  const metrics = useMemo(() => {
    const studentsRegistered = 1200;
    const companiesPartnered = companyPartnerships.length;
    const eventsConducted = collegeEvents.length;
    const placementsSupported = placementItems.reduce((sum, item) => sum + item.studentsPlaced, 0);

    return {
      studentsRegistered,
      companiesPartnered,
      eventsConducted,
      placementsSupported,
      internshipApplications: placementItems
        .filter((item) => item.type === "Internship")
        .reduce((sum, item) => sum + item.studentsApplied, 0),
      placementParticipation: placementItems.reduce((sum, item) => sum + item.studentsApplied, 0),
      startupsCreated: startupIdeas.length,
    };
  }, [companyPartnerships.length, collegeEvents.length, placementItems, startupIdeas.length]);

  const filteredPlacementItems = useMemo(() => {
    if (!search.trim()) {
      return placementItems;
    }
    const key = search.toLowerCase();
    return placementItems.filter((item) => `${item.title} ${item.company} ${item.type}`.toLowerCase().includes(key));
  }, [placementItems, search]);

  const navigationButton = (sectionKey: SectionKey) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
      activeSection === sectionKey
        ? "bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 text-amber-700 shadow-sm"
        : "text-muted-foreground hover:bg-amber-50 hover:text-amber-600"
    }`;

  return (
    <div className="college-dashboard relative flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-amber-50/20 to-white">
      <div className="pointer-events-none absolute inset-0 border-2 border-amber-200/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 border-l-2 border-t-2 border-amber-300/60 bg-gradient-to-br from-amber-300/20 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 border-r-2 border-t-2 border-amber-300/60 bg-gradient-to-bl from-amber-300/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 border-b-2 border-l-2 border-amber-300/60 bg-gradient-to-tr from-amber-300/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-2 border-r-2 border-amber-300/60 bg-gradient-to-tl from-amber-300/20 to-transparent" />

      <aside className="hidden fixed left-0 top-0 h-screen w-[280px] border-r border-amber-100 bg-gradient-to-b from-white to-amber-50/30 lg:flex lg:flex-col">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          <div className="flex h-20 items-center border-b border-amber-100 px-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-amber-600">
              <School className="h-6 w-6" />
              <span>The Student Spot</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto px-4 py-4 text-sm font-medium space-y-1">
            <button type="button" className={navigationButton("home")} onClick={() => goToSection("home")}><Home className="h-4 w-4" />Home</button>
            <button type="button" className={navigationButton("placement")} onClick={() => goToSection("placement")}><Briefcase className="h-4 w-4" />Placement Support</button>
            <button type="button" className={navigationButton("industry")} onClick={() => goToSection("industry")}><Handshake className="h-4 w-4" />Industry Collaborations</button>
            <button type="button" className={navigationButton("startup")} onClick={() => goToSection("startup")}><Lightbulb className="h-4 w-4" />Startup Ecosystem</button>
            <button type="button" className={navigationButton("events")} onClick={() => goToSection("events")}><Calendar className="h-4 w-4" />Events & Hackathons</button>
            <button type="button" className={navigationButton("partnerships")} onClick={() => goToSection("partnerships")}><Building2 className="h-4 w-4" />Company Partnerships</button>
            <button type="button" className={navigationButton("insights")} onClick={() => goToSection("insights")}><Sparkles className="h-4 w-4" />Student Insights</button>
            <button type="button" className={navigationButton("resources")} onClick={() => goToSection("resources")}><BookOpen className="h-4 w-4" />Resources</button>
            <button type="button" className={navigationButton("profile")} onClick={() => goToSection("profile")}><GraduationCap className="h-4 w-4" />Profile</button>

            <div className="pt-3 mt-3 border-t border-amber-100">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-muted-foreground transition-all hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setActivityHistoryOpen((prev) => !prev)}
              >
                <Clock className="h-4 w-4" />
                Activity History
              </button>
              {activityHistoryOpen && (
                <div className="mt-3 space-y-2 rounded-xl border border-amber-100 bg-amber-50/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent activity</p>
                  <div className="space-y-2 max-h-56 overflow-auto pr-1">
                    {activityFeed.map((activity) => (
                      <div key={activity.id} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                        <p className={`text-sm font-medium ${activity.tone === "success" ? "text-emerald-600" : activity.tone === "info" ? "text-amber-600" : "text-slate-700"}`}>{activity.title}</p>
                        <p className="text-xs text-slate-600">{activity.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="mt-auto border-t border-amber-100 p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold">{user.displayName || user.email}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0 text-slate-500 hover:bg-amber-50 hover:text-amber-600" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-amber-500 text-white hover:bg-amber-600">Login</Button>
            )}
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-8 bg-gradient-to-br from-white via-amber-50/10 to-slate-50/40 p-4 lg:ml-[280px] lg:p-10">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {activeSection === "home" ? (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome, <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">College Partner</span>!
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">Campus Career + Startup Ecosystem System</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    <span className="bg-gradient-to-r from-amber-700 via-orange-500 to-amber-500 bg-clip-text text-transparent">{currentSectionMeta.title}</span>
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">{currentSectionMeta.subtitle}</p>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search opportunities, companies, events" className="w-80 rounded-lg border-amber-200 bg-white pl-10 transition-all focus-visible:border-amber-400 focus-visible:ring-amber-200" />
              </div>
              <Button variant="outline" size="icon" className="rounded-lg border-amber-200 text-amber-600 transition-all hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-sm" onClick={() => setNotificationsOpen((prev) => !prev)}>
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="gap-2 border-amber-200 text-amber-700 transition-all hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-sm" onClick={() => goToSection("profile")}>
                <FileText className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </header>

          {notificationsOpen && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-amber-100 bg-gradient-to-r from-white to-amber-50/40 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="rounded-md bg-slate-50 p-2">Upcoming career workshop needs mentor confirmation.</li>
                <li className="rounded-md bg-slate-50 p-2">Two company partnership requests are pending review.</li>
                <li className="rounded-md bg-slate-50 p-2">New startup idea submitted by a student founder.</li>
              </ul>
            </motion.div>
          )}

          {activeSection === "home" && (
            <section className="space-y-6">
              <SectionHeader title="Home" subtitle="Overview of college placement and startup ecosystem outcomes" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <CardShell>
                  <p className="text-sm text-muted-foreground">Students Registered</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.studentsRegistered}</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Companies Partnered</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.companiesPartnered}</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Events Conducted</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.eventsConducted}</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Placements Supported</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.placementsSupported}</p>
                </CardShell>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="bg-amber-500 text-white hover:bg-amber-600" onClick={() => goToSection("industry")}>Host Workshop</Button>
                    <Button variant="outline" onClick={() => goToSection("partnerships")}>Invite Company</Button>
                    <Button variant="outline" onClick={() => goToSection("events")}>Post Event</Button>
                  </div>
                </CardShell>
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>Latest event: {collegeEvents[0]?.title || "No events yet"}</li>
                    <li>New company partnership: {companyPartnerships[0]?.companyName || "None yet"}</li>
                    <li>Active opportunities: {placementItems.length}</li>
                  </ul>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "placement" && (
            <section className="space-y-5">
              <SectionHeader title="Placement Support" subtitle="Campus jobs, internships, and placement reports" />
              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="bg-amber-50 text-amber-700">
                  <TabsTrigger value="jobs">Campus Jobs</TabsTrigger>
                  <TabsTrigger value="internships">Internships</TabsTrigger>
                  <TabsTrigger value="reports">Placement Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs" className="space-y-4">
                  <form onSubmit={handlePlacementSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Input required placeholder="Job title" value={placementForm.title} onChange={(event) => setPlacementForm((prev) => ({ ...prev, title: event.target.value }))} />
                      <Input required placeholder="Company name" value={placementForm.company} onChange={(event) => setPlacementForm((prev) => ({ ...prev, company: event.target.value }))} />
                      <select value={placementForm.type} onChange={(event) => setPlacementForm((prev) => ({ ...prev, type: event.target.value as PlacementType }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                        <option value="Campus Job">Campus Job</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Share Opportunity to Students</Button>
                  </form>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredPlacementItems.filter((item) => item.type === "Campus Job").map((item) => (
                      <CardShell key={item.id}>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                        <p className="mt-2 text-sm text-slate-700">Applied: {item.studentsApplied} | Shortlisted: {item.studentsShortlisted} | Placed: {item.studentsPlaced}</p>
                      </CardShell>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="internships" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredPlacementItems.filter((item) => item.type === "Internship").map((item) => (
                      <CardShell key={item.id}>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                        <p className="mt-2 text-sm text-slate-700">Applied: {item.studentsApplied} | Shortlisted: {item.studentsShortlisted} | Placed: {item.studentsPlaced}</p>
                      </CardShell>
                    ))}
                    {filteredPlacementItems.filter((item) => item.type === "Internship").length === 0 && <p className="text-sm text-muted-foreground">No internships listed yet.</p>}
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <CardShell>
                    <h3 className="text-lg font-semibold text-slate-900">Placement Engagement Tracker</h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="rounded-lg bg-slate-50 p-3 text-sm">Students Applied: {placementItems.reduce((sum, item) => sum + item.studentsApplied, 0)}</div>
                      <div className="rounded-lg bg-slate-50 p-3 text-sm">Students Shortlisted: {placementItems.reduce((sum, item) => sum + item.studentsShortlisted, 0)}</div>
                      <div className="rounded-lg bg-slate-50 p-3 text-sm">Students Placed: {placementItems.reduce((sum, item) => sum + item.studentsPlaced, 0)}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {placementItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => bumpPlacementMetric(item.id, "studentsApplied")}>+ Applied</Button>
                          <Button variant="outline" size="sm" onClick={() => bumpPlacementMetric(item.id, "studentsShortlisted")}>+ Shortlisted</Button>
                          <Button variant="outline" size="sm" onClick={() => bumpPlacementMetric(item.id, "studentsPlaced")}>+ Placed</Button>
                        </div>
                      ))}
                    </div>
                  </CardShell>
                </TabsContent>
              </Tabs>
            </section>
          )}

          {activeSection === "industry" && (
            <section className="space-y-5">
              <SectionHeader title="Industry Collaborations" subtitle="Programs with companies, mentors, founders, and recruiters" />
              <form onSubmit={handleCollabSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Partner name" value={collabForm.partnerName} onChange={(event) => setCollabForm((prev) => ({ ...prev, partnerName: event.target.value }))} />
                  <select value={collabForm.partnerType} onChange={(event) => setCollabForm((prev) => ({ ...prev, partnerType: event.target.value as PartnerType }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Company">Company</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Founder">Startup founder</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                  <select value={collabForm.programType} onChange={(event) => setCollabForm((prev) => ({ ...prev, programType: event.target.value as ProgramType }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Workshop">Workshop</option>
                    <option value="Guest Lecture">Guest lecture</option>
                    <option value="Industry Session">Industry session</option>
                    <option value="Career Talk">Career talk</option>
                  </select>
                </div>
                <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Send Collaboration Request</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {collaborations.map((program) => (
                  <CardShell key={program.id}>
                    <p className="font-semibold text-slate-900">{program.partnerName}</p>
                    <p className="text-sm text-muted-foreground">{program.partnerType} • {program.programType}</p>
                    <p className="mt-2 text-sm text-slate-700">Status: {program.status}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCollabStatus(program.id, "Ongoing")}>Set Ongoing</Button>
                      <Button variant="outline" size="sm" onClick={() => setCollabStatus(program.id, "Completed")}>Set Completed</Button>
                    </div>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "startup" && (
            <section className="space-y-5">
              <SectionHeader title="Startup Ecosystem" subtitle="Startup ideas, incubation support, bootcamps, and pitch events" />
              <form onSubmit={handleStartupIdeaSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Startup idea title" value={startupIdeaForm.title} onChange={(event) => setStartupIdeaForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <Input required placeholder="Founder name" value={startupIdeaForm.founder} onChange={(event) => setStartupIdeaForm((prev) => ({ ...prev, founder: event.target.value }))} />
                  <select value={startupIdeaForm.stage} onChange={(event) => setStartupIdeaForm((prev) => ({ ...prev, stage: event.target.value as StartupStage }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Idea">Idea</option>
                    <option value="Validation">Validation</option>
                    <option value="MVP">MVP</option>
                    <option value="Traction">Traction</option>
                    <option value="Incubation">Incubation</option>
                  </select>
                </div>
                <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Add Startup Idea</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {startupIdeas.map((idea) => (
                  <CardShell key={idea.id}>
                    <p className="font-semibold text-slate-900">{idea.title}</p>
                    <p className="text-sm text-muted-foreground">Founder: {idea.founder}</p>
                    <p className="mt-2 text-sm text-slate-700">Stage: {idea.stage}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => promoteStartupStage(idea.id)}>Move to Next Stage</Button>
                    </div>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "events" && (
            <section className="space-y-5">
              <SectionHeader title="Events & Hackathons" subtitle="Create and manage campus innovation events" />
              <form onSubmit={handleEventSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Event title" value={eventForm.title} onChange={(event) => setEventForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <select value={eventForm.type} onChange={(event) => setEventForm((prev) => ({ ...prev, type: event.target.value as EventType }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Hackathon">Coding hackathon</option>
                    <option value="Innovation Challenge">Innovation challenge</option>
                    <option value="Career Workshop">Career workshop</option>
                    <option value="Startup Event">Startup event</option>
                  </select>
                  <Input required type="date" value={eventForm.date} onChange={(event) => setEventForm((prev) => ({ ...prev, date: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Create Event</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {collegeEvents.map((eventItem) => (
                  <CardShell key={eventItem.id}>
                    <p className="font-semibold text-slate-900">{eventItem.title}</p>
                    <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date}</p>
                    <p className="mt-2 text-sm text-slate-700">Registrations: {eventItem.registrations}</p>
                    <Button className="mt-3 bg-amber-500 text-white hover:bg-amber-600" onClick={() => registerEvent(eventItem.id)}>Track Registration +1</Button>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "partnerships" && (
            <section className="space-y-5">
              <SectionHeader title="Company Partnerships" subtitle="Hiring partners, workshop partners, and startup sponsors" />
              <form onSubmit={handlePartnershipSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Company name" value={partnershipForm.companyName} onChange={(event) => setPartnershipForm((prev) => ({ ...prev, companyName: event.target.value }))} />
                  <select value={partnershipForm.type} onChange={(event) => setPartnershipForm((prev) => ({ ...prev, type: event.target.value as PartnershipCategory }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Hiring Partner">Hiring Partner</option>
                    <option value="Workshop Partner">Workshop Partner</option>
                    <option value="Startup Sponsor">Startup Sponsor</option>
                  </select>
                  <Input required placeholder="Engagement history note" value={partnershipForm.history} onChange={(event) => setPartnershipForm((prev) => ({ ...prev, history: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Add Partnership</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {companyPartnerships.map((partnership) => (
                  <CardShell key={partnership.id}>
                    <p className="font-semibold text-slate-900">{partnership.companyName}</p>
                    <p className="text-sm text-muted-foreground">{partnership.type}</p>
                    <p className="mt-2 text-sm text-slate-700">History: {partnership.history}</p>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "insights" && (
            <section className="space-y-5">
              <SectionHeader title="Student Insights" subtitle="Basic metrics for placement reporting and ecosystem tracking" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <CardShell><p className="text-sm text-muted-foreground">Total Students</p><p className="mt-2 text-3xl font-bold">{metrics.studentsRegistered}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Internship Applications</p><p className="mt-2 text-3xl font-bold">{metrics.internshipApplications}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Placement Participation</p><p className="mt-2 text-3xl font-bold">{metrics.placementParticipation}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Startups Created</p><p className="mt-2 text-3xl font-bold">{metrics.startupsCreated}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Events Conducted</p><p className="mt-2 text-3xl font-bold">{metrics.eventsConducted}</p></CardShell>
              </div>
            </section>
          )}

          {activeSection === "resources" && (
            <section className="space-y-5">
              <SectionHeader title="Resources" subtitle="Career guides, startup resources, and training materials" />
              <form onSubmit={handleResourceSubmit} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Resource title" value={resourceForm.title} onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <select value={resourceForm.category} onChange={(event) => setResourceForm((prev) => ({ ...prev, category: event.target.value as ResourceItem["category"] }))} className="h-10 rounded-md border border-amber-100 bg-background px-3 py-2 text-sm">
                    <option value="Career Guide">Career guide</option>
                    <option value="Startup Resource">Startup resource</option>
                    <option value="Workshop Material">Workshop material</option>
                    <option value="Training Content">Training content</option>
                  </select>
                </div>
                <Button type="submit" className="mt-3 bg-amber-500 text-white hover:bg-amber-600">Publish Resource</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {resources.map((resource) => (
                  <CardShell key={resource.id}>
                    <p className="font-semibold text-slate-900">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.category}</p>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "profile" && (
            <section className="space-y-5">
              <SectionHeader title="Profile" subtitle="College details and placement officer information" />
              <form onSubmit={handleProfileSave} className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="College Name" value={profile.collegeName} onChange={(event) => setProfile((prev) => ({ ...prev, collegeName: event.target.value }))} />
                  <Input required placeholder="Location" value={profile.location} onChange={(event) => setProfile((prev) => ({ ...prev, location: event.target.value }))} />
                  <Input required placeholder="Departments (comma separated)" value={profile.departments} onChange={(event) => setProfile((prev) => ({ ...prev, departments: event.target.value }))} />
                  <Input required placeholder="Placement Officer" value={profile.placementOfficer} onChange={(event) => setProfile((prev) => ({ ...prev, placementOfficer: event.target.value }))} />
                  <Input required placeholder="Contact Information" value={profile.contact} onChange={(event) => setProfile((prev) => ({ ...prev, contact: event.target.value }))} />
                </div>
                <Textarea className="mt-3" placeholder="Campus highlights (optional future)" value={profile.highlights} onChange={(event) => setProfile((prev) => ({ ...prev, highlights: event.target.value }))} />
                <Button type="submit" className="mt-4 bg-amber-500 text-white hover:bg-amber-600">Save Profile</Button>
                <p className="mt-3 text-sm text-muted-foreground">{profileSaved ? "Profile saved successfully." : "Save to keep college details updated."}</p>
              </form>
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default CollegeDashboard;
