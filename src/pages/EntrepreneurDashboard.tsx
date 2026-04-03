import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Briefcase,
  Building,
  Calendar,
  Clock,
  ChevronRight,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  LifeBuoy,
  Lightbulb,
  LogOut,
  Rocket,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

type SectionKey =
  | "home"
  | "launchpad"
  | "hireTalent"
  | "projects"
  | "funding"
  | "mentorship"
  | "events"
  | "community"
  | "resources"
  | "profile";

type StartupStage = "Idea" | "Validation" | "MVP" | "Early Revenue" | "Scaling";
type TrackerStage = "Idea" | "Validation" | "MVP" | "Traction" | "Funding";
type ProjectStatus = "Posted" | "Applications" | "Active" | "Completed";
type TalentAction = "Invite" | "Shortlist" | "Save";
type MentorDomain = "Startup" | "Product" | "Marketing" | "Fundraising";
type EventType = "Pitch Competition" | "Startup Bootcamp" | "Founder Talk" | "Demo Day" | "Hackathon";

type Student = {
  id: string;
  name: string;
  skills: string;
  portfolio: string;
  college: string;
  experience: string;
};

type TalentPost = {
  id: string;
  title: string;
  roleType: "Internship" | "Job" | "Freelancer";
  location: string;
  description: string;
  skillsRequired: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  skillsRequired: string;
  duration: string;
  budget?: string;
  status: ProjectStatus;
};

type Mentor = {
  id: string;
  name: string;
  domain: MentorDomain;
  experience: string;
};

type MentorRequest = {
  id: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  message: string;
  status: "Requested";
};

type EventItem = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  mode: "Online" | "Offline";
};

type CommunityPost = {
  id: string;
  title: string;
  category: "Founder Discussion" | "Collaboration" | "Advice" | "Co-Founder";
  details: string;
};

type ActivityItem = {
  id: string;
  label: string;
  detail: string;
  tone: "success" | "info" | "neutral";
};

type StartupProfile = {
  startupName: string;
  founderInfo: string;
  teamMembers: string;
  stage: StartupStage;
  website: string;
  pitchDeck: string;
  traction: string;
  revenue: string;
  investorInterest: string;
};

const routeToSection: Record<string, SectionKey> = {
  home: "home",
  launchpad: "launchpad",
  "hire-talent": "hireTalent",
  projects: "projects",
  funding: "funding",
  mentorship: "mentorship",
  events: "events",
  community: "community",
  resources: "resources",
  profile: "profile",
};

const sectionToRoute: Record<SectionKey, string> = {
  home: "home",
  launchpad: "launchpad",
  hireTalent: "hire-talent",
  projects: "projects",
  funding: "funding",
  mentorship: "mentorship",
  events: "events",
  community: "community",
  resources: "resources",
  profile: "profile",
};

const students: Student[] = [
  { id: "s1", name: "Aarav Sharma", skills: "React, TypeScript, UI", portfolio: "portfolio-aarav.dev", college: "IIT Delhi", experience: "Intermediate" },
  { id: "s2", name: "Priya Nair", skills: "Design, Figma, Branding", portfolio: "portfolio-priya.dev", college: "NIT Trichy", experience: "Beginner" },
  { id: "s3", name: "Kabir Mehta", skills: "Node.js, APIs, PostgreSQL", portfolio: "portfolio-kabir.dev", college: "BITS Pilani", experience: "Advanced" },
];

const mentors: Mentor[] = [
  { id: "m1", name: "Riya Menon", domain: "Startup", experience: "Founder and mentor with 8 years experience" },
  { id: "m2", name: "Arjun Patel", domain: "Product", experience: "Product leader and startup advisor" },
  { id: "m3", name: "Megha Jain", domain: "Marketing", experience: "Growth and brand strategist" },
  { id: "m4", name: "Nikhil Rao", domain: "Fundraising", experience: "Investor network and fundraising coach" },
];

const events: EventItem[] = [
  { id: "e1", title: "Founder Talk: From Idea to MVP", type: "Founder Talk", date: "2026-04-18", mode: "Online" },
  { id: "e2", title: "Startup Bootcamp Weekend", type: "Startup Bootcamp", date: "2026-05-05", mode: "Offline" },
  { id: "e3", title: "Pitch Competition Finals", type: "Pitch Competition", date: "2026-06-11", mode: "Offline" },
];

const communityPosts: CommunityPost[] = [
  { id: "c1", title: "Looking for a co-founder with frontend depth", category: "Co-Founder", details: "Need React + design sense for an early B2B product." },
  { id: "c2", title: "Advice on first 10 customers", category: "Advice", details: "Share practical acquisition tips and outreach patterns." },
  { id: "c3", title: "Founder discussion on pricing", category: "Founder Discussion", details: "How do you price early MVP services?" },
];

const startupResources = [
  "Pitch Deck Templates",
  "Business Model Canvas",
  "Founder Agreements",
  "Legal Basics",
  "Planning Templates",
  "Execution Checklists",
  "Growth Frameworks",
];

const fundingSources = [
  "Government Grants",
  "Angel Networks",
  "CSR Programs",
  "Startup Competitions",
  "University Incubators",
  "Startup Accelerators",
];

const progressStages: TrackerStage[] = ["Idea", "Validation", "MVP", "Traction", "Funding"];

const trackerGuidance: Record<TrackerStage, { focus: string; action: string; route: SectionKey }> = {
  Idea: {
    focus: "Define the problem clearly and confirm the startup is worth building.",
    action: "Open the launchpad and write the problem, solution, and target market.",
    route: "launchpad",
  },
  Validation: {
    focus: "Check whether the idea has real demand through conversations and signals.",
    action: "Use hiring and mentorship sections to validate assumptions with people.",
    route: "hireTalent",
  },
  MVP: {
    focus: "Build the first working version and ship a small, testable result.",
    action: "Post a project or freelance task to move the MVP forward.",
    route: "projects",
  },
  Traction: {
    focus: "Show usage, engagement, or early revenue so the startup has proof.",
    action: "Use community, events, and profile metrics to surface traction signals.",
    route: "community",
  },
  Funding: {
    focus: "Prepare a strong pitch and discover the right ecosystem support.",
    action: "Open funding resources and incubators to prepare for investor conversations.",
    route: "funding",
  },
};

const sectionMeta: Record<SectionKey, { title: string; subtitle: string; nextStep: string }> = {
  home: {
    title: "Execution Dashboard",
    subtitle: "Track execution momentum, key numbers, and immediate next actions.",
    nextStep: "Use this page to understand what is live, what is pending, and where to act next.",
  },
  launchpad: {
    title: "Startup Launchpad",
    subtitle: "Define the problem, solution, market, and startup stage.",
    nextStep: "Lock the problem statement, then move into team building and progress tracking.",
  },
  hireTalent: {
    title: "Hire Talent",
    subtitle: "Build your startup team using the student ecosystem.",
    nextStep: "Post a role, refine filters, and shortlist students for execution work.",
  },
  projects: {
    title: "Projects & Freelance",
    subtitle: "Break work into small deliverables and keep execution moving.",
    nextStep: "Post one focused task, then move it through applications, active work, and completion.",
  },
  funding: {
    title: "Funding & Incubators",
    subtitle: "Discover grants, accelerators, incubators, and pitch support.",
    nextStep: "Open a resource, then use the rest of the dashboard to make the startup fundable.",
  },
  mentorship: {
    title: "Mentorship",
    subtitle: "Browse mentors and request sessions with manual coordination for MVP.",
    nextStep: "Choose a mentor, submit a request, and keep the request visible in your queue.",
  },
  events: {
    title: "Events & Challenges",
    subtitle: "Register for pitch competitions, bootcamps, talks, demo days, and hackathons.",
    nextStep: "Register for one event now so the participation tracker immediately reflects the action.",
  },
  community: {
    title: "Community",
    subtitle: "Share founder posts, ask for advice, and find collaborators.",
    nextStep: "Publish a post and use it to discover co-founders or early collaborators.",
  },
  resources: {
    title: "Resources & Tools",
    subtitle: "Access templates, checklists, legal basics, and growth frameworks.",
    nextStep: "Open the resource list as your build checklist while you execute the startup.",
  },
  profile: {
    title: "Profile",
    subtitle: "Keep startup information, traction, and investor readiness current.",
    nextStep: "Save the profile to expose a clean founder snapshot across the dashboard.",
  },
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="mb-5">
    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">{title}</span>
    </h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </motion.div>
);

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.01 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg"
  >
    {children}
  </motion.div>
);

const SectionFrame = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="space-y-6"
  >
    {children}
  </motion.div>
);

const EntrepreneurDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();

  const activeSection: SectionKey = routeToSection[section || "home"] || "home";

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activityHistoryOpen, setActivityHistoryOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready");
  const [startupStage, setStartupStage] = useState<StartupStage>("Idea");
  const [trackerStage, setTrackerStage] = useState<TrackerStage>("Idea");
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([
    {
      id: "seed-1",
      label: "Dashboard loaded",
      detail: "Startup Execution System is ready for the current founder session.",
      tone: "info",
    },
  ]);

  const [startupProfile, setStartupProfile] = useState<StartupProfile>({
    startupName: "",
    founderInfo: user?.displayName || "",
    teamMembers: "",
    stage: "Idea",
    website: "",
    pitchDeck: "",
    traction: "",
    revenue: "",
    investorInterest: "",
  });

  const [startupDetails, setStartupDetails] = useState({ problem: "", solution: "", targetMarket: "", stage: "Idea" as StartupStage });
  const [startupProgress, setStartupProgress] = useState<string[]>([]);
  const [coFounderRequests, setCoFounderRequests] = useState(0);

  const [talentFilters, setTalentFilters] = useState({ skill: "", college: "", experience: "", domain: "" });
  const [talentActionMap, setTalentActionMap] = useState<Record<string, TalentAction[]>>({});
  const [talentPosts, setTalentPosts] = useState<TalentPost[]>([]);
  const [talentForm, setTalentForm] = useState({
    title: "",
    roleType: "Internship" as TalentPost["roleType"],
    location: "",
    description: "",
    skillsRequired: "",
  });

  const [projectPosts, setProjectPosts] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", skillsRequired: "", duration: "", budget: "" });

  const [mentorDomain, setMentorDomain] = useState<"" | MentorDomain>("");
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>([]);
  const [mentorForm, setMentorForm] = useState({ mentorId: "", topic: "", message: "" });

  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [communityPostsState, setCommunityPostsState] = useState<CommunityPost[]>(communityPosts);
  const [communityForm, setCommunityForm] = useState({ title: "", category: "Founder Discussion" as CommunityPost["category"], details: "" });

  const [startupProfileSaved, setStartupProfileSaved] = useState(false);

  const userId = user?.uid || "startup-user";

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const bySkill = talentFilters.skill ? student.skills.toLowerCase().includes(talentFilters.skill.toLowerCase()) : true;
      const byCollege = talentFilters.college ? student.college.toLowerCase().includes(talentFilters.college.toLowerCase()) : true;
      const byExperience = talentFilters.experience ? student.experience.toLowerCase().includes(talentFilters.experience.toLowerCase()) : true;
      const byDomain = talentFilters.domain ? student.skills.toLowerCase().includes(talentFilters.domain.toLowerCase()) : true;
      const bySearch = search ? `${student.name} ${student.skills} ${student.college}`.toLowerCase().includes(search.toLowerCase()) : true;
      return bySkill && byCollege && byExperience && byDomain && bySearch;
    });
  }, [talentFilters, search]);

  const filteredMentors = useMemo(() => mentors.filter((mentor) => (mentorDomain ? mentor.domain === mentorDomain : true)), [mentorDomain]);

  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date("2026-04-03"));
  const registeredEventItems = events.filter((event) => registeredEvents.includes(event.id));

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const recordActivity = (label: string, detail: string, tone: ActivityItem["tone"] = "success") => {
    setActivityFeed((prev) => [{ id: `activity-${Date.now()}`, label, detail, tone }, ...prev].slice(0, 5));
    setAction(label);
  };

  const goToSection = (next: SectionKey) => {
    navigate(`/entrepreneur-dashboard/${sectionToRoute[next]}`);
  };

  const updateTrackerStage = (stage: TrackerStage) => {
    setTrackerStage(stage);
    setStartupProgress((prev) => [...new Set([...prev, stage])]);
    recordActivity(`Tracker moved to ${stage}`, trackerGuidance[stage].action, "info");
  };

  const setAction = (message: string) => setStatusMessage(message);

  const submitStartupDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mappedTrackerStage: TrackerStage =
      startupStage === "Early Revenue"
        ? "Traction"
        : startupStage === "Scaling"
          ? "Funding"
          : startupStage;
    setStartupProgress((prev) => [...new Set([...prev, startupStage])]);
    setStartupDetails((prev) => ({ ...prev, stage: startupStage }));
    setTrackerStage(mappedTrackerStage);
    recordActivity("Startup details saved", `${startupStage} stage recorded with problem, solution, and target market.`);
  };

  const saveStartupProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStartupProfileSaved(true);
    recordActivity("Startup profile saved", "Startup profile snapshot is now updated and ready to share.");
  };

  const handleTalentAction = (studentId: string, action: TalentAction) => {
    setTalentActionMap((prev) => ({
      ...prev,
      [studentId]: prev[studentId]?.includes(action) ? prev[studentId].filter((item) => item !== action) : [...(prev[studentId] || []), action],
    }));
    recordActivity(`${action} updated`, `Student ${studentId} was ${action.toLowerCase()}d for follow-up.`);
  };

  const handlePostTalent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTalentPosts((prev) => [{ id: `t-${Date.now()}`, ...talentForm }, ...prev]);
    setTalentForm({ title: "", roleType: "Internship", location: "", description: "", skillsRequired: "" });
    recordActivity("Talent post created", `${talentForm.roleType} role "${talentForm.title}" is now visible to students.`);
  };

  const handlePostProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjectPosts((prev) => [
      {
        id: `p-${Date.now()}`,
        title: projectForm.title,
        description: projectForm.description,
        skillsRequired: projectForm.skillsRequired,
        duration: projectForm.duration,
        budget: projectForm.budget,
        status: "Posted",
      },
      ...prev,
    ]);
    setProjectForm({ title: "", description: "", skillsRequired: "", duration: "", budget: "" });
    recordActivity("Project posted", `Project "${projectForm.title}" is now open for applications.`);
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    setProjectPosts((prev) => prev.map((project) => (project.id === id ? { ...project, status } : project)));
    recordActivity(`Project moved to ${status}`, "Project status has been updated in the execution flow.");
  };

  const submitMentorRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mentor = mentors.find((item) => item.id === mentorForm.mentorId);
    if (!mentor) {
      recordActivity("Select a mentor", "Pick a mentor before sending a request.", "neutral");
      return;
    }
    setMentorRequests((prev) => [
      {
        id: `mr-${Date.now()}`,
        mentorId: mentor.id,
        mentorName: mentor.name,
        topic: mentorForm.topic,
        message: mentorForm.message,
        status: "Requested",
      },
      ...prev,
    ]);
    setMentorForm({ mentorId: "", topic: "", message: "" });
    recordActivity("Mentorship request sent", `Request sent to ${mentor.name} with topic "${mentorForm.topic}".`);
  };

  const registerEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      recordActivity("Already registered", "That event is already in your participation tracker.", "neutral");
      return;
    }
    setRegisteredEvents((prev) => [...prev, eventId]);
    recordActivity("Event registration saved", "Participation has been added to the event tracker.");
  };

  const submitCommunityPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCommunityPostsState((prev) => [{ id: `c-${Date.now()}`, ...communityForm }, ...prev]);
    setCommunityForm({ title: "", category: "Founder Discussion", details: "" });
    recordActivity("Community post published", `Post "${communityForm.title}" is now live for collaboration.`);
  };

  const startupName = startupProfile.startupName || "Your Startup";
  const metrics = {
    teamMembers: startupProfile.teamMembers ? startupProfile.teamMembers.split(",").filter(Boolean).length : 0,
    activeProjects: projectPosts.filter((project) => project.status === "Active").length,
    contributors: talentPosts.length,
    mentorSessions: mentorRequests.length,
  };

  const navigationButton = (sectionKey: SectionKey) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
      activeSection === sectionKey
        ? "bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-50 text-emerald-700 shadow-sm"
        : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600"
    }`;

  const currentSectionMeta = sectionMeta[activeSection];

  return (
    <div className="startup-dashboard relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-white">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-200/20 blur-3xl" />

      <aside className="hidden fixed left-0 top-0 h-screen w-[280px] border-r border-slate-200 bg-gradient-to-b from-white to-emerald-50/30 lg:flex lg:flex-col">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          <div className="flex h-20 items-center border-b border-slate-200 px-6">
            <Link to="/" className="flex items-center gap-3 font-bold text-lg text-emerald-600">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
                <Rocket className="h-5 w-5" />
              </span>
              <span>The Student Spot</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto px-4 py-4 text-sm font-medium space-y-1">
            <button type="button" className={navigationButton("home")} onClick={() => goToSection("home")}><Home className="h-4 w-4" />Home</button>
            <button type="button" className={navigationButton("launchpad")} onClick={() => goToSection("launchpad")}><Lightbulb className="h-4 w-4" />Startup Launchpad</button>
            <button type="button" className={navigationButton("hireTalent")} onClick={() => goToSection("hireTalent")}><Users className="h-4 w-4" />Hire Talent</button>
            <button type="button" className={navigationButton("projects")} onClick={() => goToSection("projects")}><Briefcase className="h-4 w-4" />Projects & Freelance</button>
            <button type="button" className={navigationButton("funding")} onClick={() => goToSection("funding")}><Building className="h-4 w-4" />Funding & Incubators</button>
            <button type="button" className={navigationButton("mentorship")} onClick={() => goToSection("mentorship")}><Handshake className="h-4 w-4" />Mentorship</button>
            <button type="button" className={navigationButton("events")} onClick={() => goToSection("events")}><Calendar className="h-4 w-4" />Events & Challenges</button>
            <button type="button" className={navigationButton("community")} onClick={() => goToSection("community")}><Users className="h-4 w-4" />Community</button>
            <button type="button" className={navigationButton("resources")} onClick={() => goToSection("resources")}><FileText className="h-4 w-4" />Resources & Tools</button>
            <button type="button" className={navigationButton("profile")} onClick={() => goToSection("profile")}><Settings className="h-4 w-4" />Profile</button>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-muted-foreground transition-all hover:bg-emerald-50 hover:text-emerald-600" onClick={() => recordActivity("Support opened", "Help panel opened from the sidebar.", "info")}>
                <LifeBuoy className="h-4 w-4" />
                Support
              </button>
              <button type="button" className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-muted-foreground transition-all hover:bg-emerald-50 hover:text-emerald-600" onClick={() => setActivityHistoryOpen((prev) => !prev)}>
                <Clock className="h-4 w-4" />
                Activity History
              </button>
              {activityHistoryOpen && (
                <div className="mt-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent activity</p>
                  <div className="space-y-2 max-h-56 overflow-auto pr-1">
                    {activityFeed.map((activity) => (
                      <div key={activity.id} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                        <p className={`text-sm font-medium ${activity.tone === "success" ? "text-emerald-600" : activity.tone === "info" ? "text-emerald-600" : "text-slate-700"}`}>{activity.label}</p>
                        <p className="text-xs text-slate-600">{activity.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="mt-auto border-t border-slate-200 p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold">{user.displayName || user.email}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Login</Button>
            )}
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-8 bg-gradient-to-br from-white via-emerald-50/10 to-slate-50/50 p-4 lg:ml-[280px] lg:p-10">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="flex flex-col gap-8">
          <header className="rounded-2xl border border-slate-200/90 bg-white/85 p-5 shadow-sm backdrop-blur-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {activeSection === "home" ? (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome, <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">{startupName}</span>!
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">Startup execution system: build, test, and grow inside the ecosystem</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">{currentSectionMeta.title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{currentSectionMeta.subtitle}</p>
                </>
              )}
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">Stage {trackerStage}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search talent, mentors, projects" className="w-72 rounded-lg border-slate-300 bg-white pl-10 transition-all focus-visible:border-emerald-400 focus-visible:ring-emerald-200" />
              </div>

              <Button variant="outline" size="icon" className="rounded-lg border-slate-300 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm" onClick={() => setNotificationsOpen((prev) => !prev)}>
                <Bell className="h-5 w-5" />
              </Button>

              <Button className="gap-2 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-sm" onClick={() => goToSection("profile")}>
                <GraduationCap className="h-4 w-4" />
                Profile
              </Button>
            </div>
            </div>
          </header>

          {notificationsOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-100 bg-gradient-to-r from-white to-emerald-50/40 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="rounded-md bg-slate-50 p-2">2 new students matched your hiring filters.</li>
                <li className="rounded-md bg-slate-50 p-2">Mentor session is pending confirmation.</li>
                <li className="rounded-md bg-slate-50 p-2">Upcoming pitch competition registration is open.</li>
              </ul>
            </motion.div>
          )}

          <SectionFrame>
          {activeSection === "home" && (
            <section className="space-y-6">
              <SectionHeader title="Execution Dashboard" subtitle="A clear view of progress, tasks, and next actions" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <CardShell>
                  <p className="text-sm text-muted-foreground">Startup Stage</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{startupStage}</p>
                  <p className="mt-1 text-xs text-emerald-600">Current execution phase</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.teamMembers}</p>
                  <p className="mt-1 text-xs text-emerald-600">From profile setup</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.activeProjects}</p>
                  <p className="mt-1 text-xs text-emerald-600">Built through Projects & Freelance</p>
                </CardShell>
                <CardShell>
                  <p className="text-sm text-muted-foreground">Mentor Sessions</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{metrics.mentorSessions}</p>
                  <p className="mt-1 text-xs text-emerald-600">Requests in progress</p>
                </CardShell>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Startup Summary</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p><span className="font-medium">Startup Name:</span> {startupProfile.startupName || "Not set"}</p>
                    <p><span className="font-medium">Stage:</span> {startupProfile.stage}</p>
                    <p><span className="font-medium">Founder Info:</span> {startupProfile.founderInfo || "Not set"}</p>
                    <p><span className="font-medium">Website:</span> {startupProfile.website || "Not added"}</p>
                    <p><span className="font-medium">Problem:</span> {startupDetails.problem || "Not defined"}</p>
                    <p><span className="font-medium">Solution:</span> {startupDetails.solution || "Not defined"}</p>
                    <p><span className="font-medium">Target Market:</span> {startupDetails.targetMarket || "Not defined"}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button className="bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md" onClick={() => goToSection("launchpad")}>Open Launchpad</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => goToSection("launchpad")}>Find Co-Founder</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => goToSection("profile")}>Submit Pitch</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => goToSection("hireTalent")}>Browse Talent</Button>
                  </div>
                </CardShell>

                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Progress Tracker</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {progressStages.map((stage) => (
                      <button
                        type="button"
                        key={stage}
                        onClick={() => updateTrackerStage(stage)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${trackerStage === stage ? "bg-emerald-500 text-white shadow-sm" : startupProgress.includes(stage) || stage === startupStage ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
                    <p className="text-sm font-semibold text-emerald-700">Current stage: {trackerStage}</p>
                    <p className="mt-1 text-sm text-slate-700">{trackerGuidance[trackerStage].focus}</p>
                    <p className="mt-2 text-sm text-slate-600">Next action: {trackerGuidance[trackerStage].action}</p>
                    <Button type="button" variant="outline" className="mt-3 border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => goToSection(trackerGuidance[trackerStage].route)}>
                      Open related section
                    </Button>
                  </div>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "launchpad" && (
            <section className="space-y-5">
              <SectionHeader title="Startup Setup" subtitle="Define the startup, build the team, and track execution" />
              <form onSubmit={submitStartupDetails} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Problem" value={startupDetails.problem} onChange={(event) => setStartupDetails((prev) => ({ ...prev, problem: event.target.value }))} />
                  <Input required placeholder="Solution" value={startupDetails.solution} onChange={(event) => setStartupDetails((prev) => ({ ...prev, solution: event.target.value }))} />
                  <Input required placeholder="Target Market" value={startupDetails.targetMarket} onChange={(event) => setStartupDetails((prev) => ({ ...prev, targetMarket: event.target.value }))} />
                  <select value={startupStage} onChange={(event) => setStartupStage(event.target.value as StartupStage)} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Idea">Idea</option>
                    <option value="Validation">Validation</option>
                    <option value="MVP">MVP</option>
                    <option value="Early Revenue">Early Revenue</option>
                    <option value="Scaling">Scaling</option>
                  </select>
                </div>
                <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Save Startup Details</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Team Builder</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Co-Founder", "Developers", "Designers", "Marketers", "Operations"].map((label) => (
                      <Button
                        key={label}
                        variant="outline"
                        className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md"
                        onClick={() => {
                          setTalentFilters((prev) => ({ ...prev, domain: label }));
                          goToSection("hireTalent");
                          recordActivity(`${label} search opened`, `Filters updated for ${label.toLowerCase()} talent.`, "info");
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <Button
                    className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md"
                    onClick={() => {
                      setCoFounderRequests((prev) => prev + 1);
                      recordActivity("Co-founder search started", "Talent search has been prepared for co-founder discovery.");
                    }}
                  >
                    Find Co-Founder
                  </Button>
                </CardShell>

                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Startup Progress Tracker</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    {progressStages.map((stage) => (
                      <div key={stage} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                        <span>{stage}</span>
                        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => updateTrackerStage(stage)}>
                          Mark
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "hireTalent" && (
            <section className="space-y-5">
              <SectionHeader title="Talent Pipeline" subtitle="Build your startup team using the student ecosystem" />
              <Tabs defaultValue="browse" className="w-full">
                <TabsList className="bg-emerald-50 text-emerald-700">
                  <TabsTrigger value="postInternship">Post Internship</TabsTrigger>
                  <TabsTrigger value="postJob">Post Job</TabsTrigger>
                  <TabsTrigger value="freelancers">Hire Freelancers</TabsTrigger>
                  <TabsTrigger value="browse">Browse Students</TabsTrigger>
                </TabsList>

                <TabsContent value="postInternship">
                  <form onSubmit={handlePostTalent} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Input required placeholder="Title" value={talentForm.title} onChange={(event) => setTalentForm((prev) => ({ ...prev, title: event.target.value }))} />
                      <select value={talentForm.roleType} onChange={(event) => setTalentForm((prev) => ({ ...prev, roleType: event.target.value as TalentPost["roleType"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="Internship">Internship</option>
                        <option value="Job">Job</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                      <Input required placeholder="Location" value={talentForm.location} onChange={(event) => setTalentForm((prev) => ({ ...prev, location: event.target.value }))} />
                      <Input required placeholder="Skills Required" value={talentForm.skillsRequired} onChange={(event) => setTalentForm((prev) => ({ ...prev, skillsRequired: event.target.value }))} />
                    </div>
                    <Textarea required className="mt-3" placeholder="Description" value={talentForm.description} onChange={(event) => setTalentForm((prev) => ({ ...prev, description: event.target.value }))} />
                    <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Post Internship</Button>
                  </form>
                </TabsContent>

                <TabsContent value="postJob">
                  <form onSubmit={handlePostTalent} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Input required placeholder="Title" value={talentForm.title} onChange={(event) => setTalentForm((prev) => ({ ...prev, title: event.target.value }))} />
                      <select value={talentForm.roleType} onChange={(event) => setTalentForm((prev) => ({ ...prev, roleType: event.target.value as TalentPost["roleType"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="Job">Job</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                      <Input required placeholder="Location" value={talentForm.location} onChange={(event) => setTalentForm((prev) => ({ ...prev, location: event.target.value }))} />
                      <Input required placeholder="Skills Required" value={talentForm.skillsRequired} onChange={(event) => setTalentForm((prev) => ({ ...prev, skillsRequired: event.target.value }))} />
                    </div>
                    <Textarea required className="mt-3" placeholder="Description" value={talentForm.description} onChange={(event) => setTalentForm((prev) => ({ ...prev, description: event.target.value }))} />
                    <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Post Job</Button>
                  </form>
                </TabsContent>

                <TabsContent value="freelancers">
                  <CardShell>
                    <h3 className="text-lg font-semibold text-slate-900">Hire Freelancers</h3>
                    <p className="mt-2 text-sm text-slate-700">Use Browse Students below to shortlist and invite contributors for smaller execution tasks.</p>
                  </CardShell>
                </TabsContent>

                <TabsContent value="browse">
                  <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
                    <Input placeholder="Skill" value={talentFilters.skill} onChange={(event) => setTalentFilters((prev) => ({ ...prev, skill: event.target.value }))} />
                    <Input placeholder="College" value={talentFilters.college} onChange={(event) => setTalentFilters((prev) => ({ ...prev, college: event.target.value }))} />
                    <Input placeholder="Experience" value={talentFilters.experience} onChange={(event) => setTalentFilters((prev) => ({ ...prev, experience: event.target.value }))} />
                    <Input placeholder="Domain" value={talentFilters.domain} onChange={(event) => setTalentFilters((prev) => ({ ...prev, domain: event.target.value }))} />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredStudents.map((student) => (
                      <CardShell key={student.id}>
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.college} • {student.experience}</p>
                        <p className="mt-2 text-sm text-slate-700">Skills: {student.skills}</p>
                        <p className="text-sm text-slate-700">Portfolio: {student.portfolio}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(["Invite", "Shortlist", "Save"] as TalentAction[]).map((action) => (
                            <Button key={action} variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => handleTalentAction(student.id, action)}>
                              {action}
                            </Button>
                          ))}
                        </div>
                      </CardShell>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          )}

          {activeSection === "projects" && (
            <section className="space-y-5">
              <SectionHeader title="Execution Board" subtitle="Execute small tasks quickly using student teams" />
              <form onSubmit={handlePostProject} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Title" value={projectForm.title} onChange={(event) => setProjectForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <Input required placeholder="Duration" value={projectForm.duration} onChange={(event) => setProjectForm((prev) => ({ ...prev, duration: event.target.value }))} />
                  <Input required placeholder="Skills Required" value={projectForm.skillsRequired} onChange={(event) => setProjectForm((prev) => ({ ...prev, skillsRequired: event.target.value }))} />
                  <Input placeholder="Budget (optional)" value={projectForm.budget} onChange={(event) => setProjectForm((prev) => ({ ...prev, budget: event.target.value }))} />
                </div>
                <Textarea required className="mt-3" placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Post Project</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projectPosts.map((project) => (
                  <CardShell key={project.id}>
                    <p className="font-semibold text-slate-900">{project.title}</p>
                    <p className="text-sm text-muted-foreground">Status: {project.status}</p>
                    <p className="mt-2 text-sm text-slate-700">{project.description}</p>
                    <p className="text-sm text-emerald-600">Skills: {project.skillsRequired}</p>
                    <p className="text-sm text-slate-700">Duration: {project.duration}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => updateProjectStatus(project.id, "Applications")}>Applications</Button>
                      <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => updateProjectStatus(project.id, "Active")}>Active</Button>
                      <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => updateProjectStatus(project.id, "Completed")}>Completed</Button>
                    </div>
                  </CardShell>
                ))}
                {projectPosts.length === 0 && <p className="text-sm text-muted-foreground">No projects posted yet.</p>}
              </div>
            </section>
          )}

          {activeSection === "funding" && (
            <section className="space-y-5">
              <SectionHeader title="Funding Discovery" subtitle="Discover funding sources, incubators, and pitch resources. No direct funding system in MVP." />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Funding Sources</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {fundingSources.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </CardShell>
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Pitch Resources</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>Pitch Deck Templates</li>
                    <li>Investor Guide</li>
                    <li>Startup Legal Basics</li>
                  </ul>
                </CardShell>
              </div>
              <CardShell>
                <h3 className="text-lg font-semibold text-slate-900">Incubators</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    "University Incubators",
                    "Startup Accelerators",
                    "Government Programs",
                  ].map((item) => <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{item}</div>)}
                </div>
              </CardShell>
            </section>
          )}

          {activeSection === "mentorship" && (
            <section className="space-y-5">
              <SectionHeader title="Mentor Network" subtitle="Browse mentors and request sessions via form-based coordination" />
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <label className="text-sm font-medium text-slate-700">Filter mentors</label>
                <select value={mentorDomain} onChange={(event) => setMentorDomain(event.target.value as "" | MentorDomain)} className="mt-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">All</option>
                  <option value="Startup">Startup</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Fundraising">Fundraising</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Mentor Listing</h3>
                  <div className="mt-3 space-y-3">
                    {filteredMentors.map((mentor) => (
                      <div key={mentor.id} className="rounded-lg border border-slate-200 p-3">
                        <p className="font-medium text-slate-900">{mentor.name}</p>
                        <p className="text-sm text-muted-foreground">{mentor.domain}</p>
                        <p className="text-sm text-slate-700">{mentor.experience}</p>
                        <Button variant="outline" className="mt-2 border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md" onClick={() => setMentorForm((prev) => ({ ...prev, mentorId: mentor.id }))}>
                          Request session
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={submitMentorRequest} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Request Form</h3>
                  <div className="mt-3 space-y-3">
                    <Input readOnly value={userId} placeholder="User ID" />
                    <select required value={mentorForm.mentorId} onChange={(event) => setMentorForm((prev) => ({ ...prev, mentorId: event.target.value }))} className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select mentor</option>
                      {mentors.map((mentor) => <option key={mentor.id} value={mentor.id}>{mentor.name}</option>)}
                    </select>
                    <Input required placeholder="Topic" value={mentorForm.topic} onChange={(event) => setMentorForm((prev) => ({ ...prev, topic: event.target.value }))} />
                    <Textarea required placeholder="Message" value={mentorForm.message} onChange={(event) => setMentorForm((prev) => ({ ...prev, message: event.target.value }))} />
                    <Button type="submit" className="bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Send Request</Button>
                  </div>
                </form>
              </div>
              <CardShell>
                <h3 className="text-lg font-semibold text-slate-900">My Requests</h3>
                <div className="mt-3 space-y-3">
                  {mentorRequests.map((request) => (
                    <div key={request.id} className="rounded-lg border border-slate-200 p-3">
                      <p className="font-medium text-slate-900">{request.mentorName}</p>
                      <p className="text-sm text-muted-foreground">{request.topic}</p>
                      <p className="text-sm text-slate-700">{request.message}</p>
                    </div>
                  ))}
                  {mentorRequests.length === 0 && <p className="text-sm text-muted-foreground">No mentor requests yet.</p>}
                </div>
              </CardShell>
            </section>
          )}

          {activeSection === "events" && (
            <section className="space-y-5">
              <SectionHeader title="Event Pipeline" subtitle="Register for pitch competitions, bootcamps, founder talks, demo days, and hackathons." />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {upcomingEvents.map((eventItem) => (
                  <CardShell key={eventItem.id}>
                    <p className="font-semibold text-slate-900">{eventItem.title}</p>
                    <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date} • {eventItem.mode}</p>
                    <Button className="mt-3 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md" onClick={() => registerEvent(eventItem.id)}>Register</Button>
                  </CardShell>
                ))}
              </div>
              <CardShell>
                <h3 className="text-lg font-semibold text-slate-900">Participation Tracking</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {registeredEventItems.map((eventItem) => (
                    <div key={eventItem.id} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{eventItem.title}</div>
                  ))}
                  {registeredEventItems.length === 0 && <p className="text-sm text-muted-foreground">No registrations yet.</p>}
                </div>
              </CardShell>
            </section>
          )}

          {activeSection === "community" && (
            <section className="space-y-5">
              <SectionHeader title="Founder Community" subtitle="Enable collaboration, founder interaction, and advice exchange" />
              <form onSubmit={submitCommunityPost} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Title" value={communityForm.title} onChange={(event) => setCommunityForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <select value={communityForm.category} onChange={(event) => setCommunityForm((prev) => ({ ...prev, category: event.target.value as CommunityPost["category"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Founder Discussion">Founder Discussion</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Advice">Advice</option>
                    <option value="Co-Founder">Co-Founder</option>
                  </select>
                </div>
                <Textarea required className="mt-3" placeholder="Details" value={communityForm.details} onChange={(event) => setCommunityForm((prev) => ({ ...prev, details: event.target.value }))} />
                <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Post to Community</Button>
              </form>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {communityPostsState.map((post) => (
                  <CardShell key={post.id}>
                    <p className="font-semibold text-slate-900">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.category}</p>
                    <p className="mt-2 text-sm text-slate-700">{post.details}</p>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "resources" && (
            <section className="space-y-5">
              <SectionHeader title="Build Toolkit" subtitle="Access documents, templates, checklists, and growth frameworks" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Documents</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {startupResources.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </CardShell>
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Tools</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {startupResources.slice(4).map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "profile" && (
            <section className="space-y-5">
              <SectionHeader title="Startup Profile" subtitle="Manage startup profile, traction, and investor readiness" />
              <form onSubmit={saveStartupProfile} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Startup Name" value={startupProfile.startupName} onChange={(event) => setStartupProfile((prev) => ({ ...prev, startupName: event.target.value }))} />
                  <Input required placeholder="Founder Information" value={startupProfile.founderInfo} onChange={(event) => setStartupProfile((prev) => ({ ...prev, founderInfo: event.target.value }))} />
                  <Input required placeholder="Team Members (comma separated)" value={startupProfile.teamMembers} onChange={(event) => setStartupProfile((prev) => ({ ...prev, teamMembers: event.target.value }))} />
                  <select value={startupProfile.stage} onChange={(event) => setStartupProfile((prev) => ({ ...prev, stage: event.target.value as StartupStage }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {progressStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
                  <Input placeholder="Website" value={startupProfile.website} onChange={(event) => setStartupProfile((prev) => ({ ...prev, website: event.target.value }))} />
                  <Input placeholder="Pitch Deck Upload (optional future)" value={startupProfile.pitchDeck} onChange={(event) => setStartupProfile((prev) => ({ ...prev, pitchDeck: event.target.value }))} />
                  <Input placeholder="Traction Metrics" value={startupProfile.traction} onChange={(event) => setStartupProfile((prev) => ({ ...prev, traction: event.target.value }))} />
                  <Input placeholder="Revenue Tracking" value={startupProfile.revenue} onChange={(event) => setStartupProfile((prev) => ({ ...prev, revenue: event.target.value }))} />
                  <Input placeholder="Investor Interest" value={startupProfile.investorInterest} onChange={(event) => setStartupProfile((prev) => ({ ...prev, investorInterest: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-4 bg-emerald-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-md">Save Profile</Button>
              </form>
              <CardShell>
                <h3 className="text-lg font-semibold text-slate-900">Startup Profile Snapshot</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                  <p><span className="font-medium">Startup Name:</span> {startupProfile.startupName || "Not set"}</p>
                  <p><span className="font-medium">Stage:</span> {startupProfile.stage}</p>
                  <p><span className="font-medium">Team Members:</span> {startupProfile.teamMembers || "Not set"}</p>
                  <p><span className="font-medium">Website:</span> {startupProfile.website || "Not added"}</p>
                  <p><span className="font-medium">Traction:</span> {startupProfile.traction || "Not added"}</p>
                  <p><span className="font-medium">Revenue:</span> {startupProfile.revenue || "Not added"}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{startupProfileSaved ? "Profile saved successfully." : "Save startup profile to complete the founder view."}</p>
              </CardShell>
            </section>
          )}
          </SectionFrame>
        </motion.div>
      </main>
    </div>
  );
};

export default EntrepreneurDashboard;
