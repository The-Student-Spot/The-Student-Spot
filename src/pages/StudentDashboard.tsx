import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Code,
  Compass,
  FileText,
  GraduationCap,
  Home,
  LifeBuoy,
  Lightbulb,
  LogOut,
  History,
  Rocket,
  Search,
  Settings,
  Star,
  User,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

type SectionKey = "home" | "opportunities" | "freelance" | "learning" | "startupHub" | "events" | "mentorship" | "profile";
type CareerTrack = "Career" | "Startup" | "Freelance" | "Government";
type OpportunityType = "Internship" | "Full-Time" | "Startup Role" | "Government Alert";
type AppStatus = "Applied" | "Interview" | "Selected" | "Rejected";

type Opportunity = {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  location: string;
  mode: "Remote" | "Onsite";
  domain: string;
  description: string;
  applyLink: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  skillsRequired: string;
  postedBy: "Startup" | "Company";
  budget?: string;
  remote: boolean;
};

type AppItem = {
  id: string;
  userId: string;
  jobId: string;
  title: string;
  company: string;
  status: AppStatus;
};

type FreelanceApp = {
  id: string;
  userId: string;
  projectId: string;
  projectTitle: string;
  status: "Applied" | "Active" | "Completed";
};

type Mentor = {
  id: string;
  name: string;
  domain: "Career" | "Startup" | "Tech" | "Government";
  experience: string;
};

type MentorRequest = {
  id: string;
  userId: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  message: string;
  status: "Requested";
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  type: "Workshop" | "Hackathon" | "Webinar";
  mode: "Online" | "Offline";
};

type StartupIdea = {
  id: string;
  userId: string;
  problem: string;
  solution: string;
  targetAudience: string;
  stage: "Idea" | "Validation" | "MVP";
  skillsNeeded: string;
};

const opportunities: Opportunity[] = [
  {
    id: "job-1",
    title: "Frontend Intern",
    company: "TechNova",
    type: "Internship",
    location: "Bengaluru",
    mode: "Remote",
    domain: "Web",
    description: "Build and optimize reusable React components.",
    applyLink: "https://example.com/jobs/frontend-intern",
  },
  {
    id: "job-2",
    title: "Associate Backend Engineer",
    company: "CodeBridge",
    type: "Full-Time",
    location: "Hyderabad",
    mode: "Onsite",
    domain: "Backend",
    description: "Develop APIs and service integrations.",
    applyLink: "https://example.com/jobs/backend-engineer",
  },
  {
    id: "job-3",
    title: "Founding Engineer",
    company: "LaunchPad",
    type: "Startup Role",
    location: "Remote",
    mode: "Remote",
    domain: "Full Stack",
    description: "Work directly with founders to ship MVP quickly.",
    applyLink: "https://example.com/jobs/founding-engineer",
  },
  {
    id: "job-4",
    title: "Innovation Fellowship",
    company: "Gov Skills Board",
    type: "Government Alert",
    location: "Delhi",
    mode: "Onsite",
    domain: "Public Policy",
    description: "Government-backed innovation and policy fellowship.",
    applyLink: "https://example.com/jobs/innovation-fellowship",
  },
];

const freelanceProjects: Project[] = [
  {
    id: "proj-1",
    title: "Marketing Research",
    description: "Perform competitor and customer research for a startup launch.",
    skillsRequired: "Research, Sheets",
    postedBy: "Startup",
    budget: "INR 15,000",
    remote: true,
  },
  {
    id: "proj-2",
    title: "UI Landing Page",
    description: "Create responsive landing page and components for campaign.",
    skillsRequired: "Figma, React, CSS",
    postedBy: "Company",
    budget: "INR 25,000",
    remote: true,
  },
  {
    id: "proj-3",
    title: "Content Pack",
    description: "Write social and blog content for product awareness.",
    skillsRequired: "Content writing",
    postedBy: "Startup",
    remote: false,
  },
];

const events: EventItem[] = [
  { id: "ev-1", title: "Career Prep Workshop", date: "2026-04-20", type: "Workshop", mode: "Online" },
  { id: "ev-2", title: "BuildSprint Hackathon", date: "2026-06-02", type: "Hackathon", mode: "Offline" },
  { id: "ev-3", title: "Startup Webinar", date: "2026-03-12", type: "Webinar", mode: "Online" },
];

const mentors: Mentor[] = [
  { id: "m-1", name: "Riya Menon", domain: "Career", experience: "8 years hiring and mentoring" },
  { id: "m-2", name: "Arjun Patel", domain: "Startup", experience: "Founder and product builder" },
  { id: "m-3", name: "Nikhil Rao", domain: "Tech", experience: "Senior backend engineer" },
  { id: "m-4", name: "Megha Jain", domain: "Government", experience: "Civil services mentor" },
];

const trackRoadmaps: Record<CareerTrack, string[]> = {
  Career: ["Step 1: Learn", "Step 2: Build", "Step 3: Apply", "Step 4: Earn"],
  Startup: ["Step 1: Learn", "Step 2: Build", "Step 3: Apply", "Step 4: Earn"],
  Freelance: ["Step 1: Learn", "Step 2: Build", "Step 3: Apply", "Step 4: Earn"],
  Government: ["Step 1: Learn", "Step 2: Build", "Step 3: Apply", "Step 4: Earn"],
};

const routeToSection: Record<string, SectionKey> = {
  home: "home",
  opportunities: "opportunities",
  freelance: "freelance",
  learning: "learning",
  "startup-hub": "startupHub",
  events: "events",
  mentorship: "mentorship",
  profile: "profile",
};

const sectionToRoute: Record<SectionKey, string> = {
  home: "home",
  opportunities: "opportunities",
  freelance: "freelance",
  learning: "learning",
  startupHub: "startup-hub",
  events: "events",
  mentorship: "mentorship",
  profile: "profile",
};

const sectionLabels: Record<SectionKey, string> = {
  home: "Home",
  opportunities: "Opportunities",
  freelance: "Freelance",
  learning: "Learning",
  startupHub: "Startup Hub",
  events: "Events",
  mentorship: "Mentorship",
  profile: "Profile",
};

const sectionDescriptions: Record<SectionKey, string> = {
  home: "Snapshot of your progress and next actions",
  opportunities: "Apply and track internships, jobs, startup roles, and government alerts",
  freelance: "Apply to projects and manage application lifecycle",
  learning: "Choose track and follow Learn -> Build -> Apply -> Earn",
  startupHub: "Submit ideas, find co-founders, and use startup resources",
  events: "Upcoming, registered, and past events with certificate actions",
  mentorship: "Browse mentors and request sessions",
  profile: "Manage profile and completion logic",
};

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();
  const activeSection: SectionKey = routeToSection[section || "home"] || "home";
  const activeSectionLabel = sectionLabels[activeSection];

  const [search, setSearch] = useState("");
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready");
  const [activityHistory, setActivityHistory] = useState<string[]>(["Ready"]);
  const [activityOpen, setActivityOpen] = useState(false);

  const [opportunityFilters, setOpportunityFilters] = useState({ type: "", location: "", mode: "", domain: "" });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [applications, setApplications] = useState<AppItem[]>([]);

  const [freelanceFilters, setFreelanceFilters] = useState({ skill: "", budget: "", remote: false });
  const [freelanceApps, setFreelanceApps] = useState<FreelanceApp[]>([]);

  const [track, setTrack] = useState<CareerTrack>("Career");

  const [ideaForm, setIdeaForm] = useState({
    problem: "",
    solution: "",
    targetAudience: "",
    stage: "Idea" as StartupIdea["stage"],
    skillsNeeded: "",
  });
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [coFounderRequests, setCoFounderRequests] = useState(0);

  const [mentorDomainFilter, setMentorDomainFilter] = useState("");
  const [mentorForm, setMentorForm] = useState({ mentorId: "", topic: "", message: "" });
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>([]);

  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<{ eventId: string; fileName: string }[]>([]);

  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    college: "",
    skills: "",
    careerTrack: "Career" as CareerTrack,
    resume: "",
    portfolio: "",
    startupInterest: false,
  });

  const userId = user?.uid || "student-user";

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((job) => {
      const byType = opportunityFilters.type ? job.type === opportunityFilters.type : true;
      const byLocation = opportunityFilters.location ? job.location.toLowerCase().includes(opportunityFilters.location.toLowerCase()) : true;
      const byMode = opportunityFilters.mode ? job.mode === opportunityFilters.mode : true;
      const byDomain = opportunityFilters.domain ? job.domain.toLowerCase().includes(opportunityFilters.domain.toLowerCase()) : true;
      const bySearch = search ? `${job.title} ${job.company} ${job.domain}`.toLowerCase().includes(search.toLowerCase()) : true;
      return byType && byLocation && byMode && byDomain && bySearch;
    });
  }, [opportunityFilters, search]);

  const filteredProjects = useMemo(() => {
    return freelanceProjects.filter((project) => {
      const bySkill = freelanceFilters.skill ? project.skillsRequired.toLowerCase().includes(freelanceFilters.skill.toLowerCase()) : true;
      const byBudget = freelanceFilters.budget ? (project.budget || "").toLowerCase().includes(freelanceFilters.budget.toLowerCase()) : true;
      const byRemote = freelanceFilters.remote ? project.remote : true;
      const bySearch = search ? `${project.title} ${project.description}`.toLowerCase().includes(search.toLowerCase()) : true;
      return bySkill && byBudget && byRemote && bySearch;
    });
  }, [freelanceFilters, search]);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => (mentorDomainFilter ? mentor.domain === mentorDomainFilter : true));
  }, [mentorDomainFilter]);

  const today = new Date("2026-04-03");
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);
  const registeredEventCards = events.filter((event) => registeredEvents.includes(event.id));

  const profileCompletion = useMemo(() => {
    const basicInfo = profile.name && profile.email && profile.college ? 20 : 0;
    const skills = profile.skills.trim() ? 20 : 0;
    const resume = profile.resume.trim() ? 20 : 0;
    const career = profile.careerTrack ? 20 : 0;
    const linksInterests = profile.portfolio.trim() || profile.startupInterest ? 20 : 0;
    return basicInfo + skills + resume + career + linksInterests;
  }, [profile]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const recordActivity = (message: string) => {
    setStatusMessage(message);
    setActivityHistory((prev) => [message, ...prev].slice(0, 5));
  };

  const goToSection = (next: SectionKey) => {
    navigate(`/dashboard/${sectionToRoute[next]}`);
  };

  const toggleSavedJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    recordActivity("Saved jobs updated");
  };

  const applyJob = (job: Opportunity) => {
    const already = applications.some((item) => item.jobId === job.id);
    if (already) {
      recordActivity("Already applied to this job");
      return;
    }
    setApplications((prev) => [
      {
        id: `app-${Date.now()}`,
        userId,
        jobId: job.id,
        title: job.title,
        company: job.company,
        status: "Applied",
      },
      ...prev,
    ]);
    recordActivity(`Applied to ${job.title}`);
  };

  const updateJobStatus = (id: string, status: AppStatus) => {
    setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    recordActivity(`Application status changed to ${status}`);
  };

  const applyProject = (project: Project) => {
    const already = freelanceApps.some((item) => item.projectId === project.id);
    if (already) {
      recordActivity("Already applied to this project");
      return;
    }
    setFreelanceApps((prev) => [
      {
        id: `fapp-${Date.now()}`,
        userId,
        projectId: project.id,
        projectTitle: project.title,
        status: "Applied",
      },
      ...prev,
    ]);
    recordActivity(`Applied to ${project.title}`);
  };

  const updateProjectStatus = (id: string, status: FreelanceApp["status"]) => {
    setFreelanceApps((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    recordActivity(`Freelance status changed to ${status}`);
  };

  const submitIdea = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIdeas((prev) => [{ id: `idea-${Date.now()}`, userId, ...ideaForm }, ...prev]);
    setIdeaForm({ problem: "", solution: "", targetAudience: "", stage: "Idea", skillsNeeded: "" });
    recordActivity("Startup idea submitted");
  };

  const sendCoFounderRequest = () => {
    setCoFounderRequests((prev) => prev + 1);
    recordActivity("Co-founder request sent");
  };

  const registerForEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      recordActivity("Already registered for this event");
      return;
    }
    setRegisteredEvents((prev) => [...prev, eventId]);
    recordActivity("Event registered");
  };

  const uploadCertificate = (eventId: string) => {
    setCertificates((prev) => [...prev, { eventId, fileName: `certificate-${eventId}.pdf` }]);
    recordActivity("Certificate uploaded");
  };

  const submitMentorRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = mentors.find((mentor) => mentor.id === mentorForm.mentorId);
    if (!selected) {
      recordActivity("Select a mentor");
      return;
    }
    setMentorRequests((prev) => [
      {
        id: `mr-${Date.now()}`,
        userId,
        mentorId: selected.id,
        mentorName: selected.name,
        topic: mentorForm.topic,
        message: mentorForm.message,
        status: "Requested",
      },
      ...prev,
    ]);
    setMentorForm({ mentorId: "", topic: "", message: "" });
    recordActivity("Mentor request sent");
  };

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTrack(profile.careerTrack);
    recordActivity("Profile updated");
  };

  const recommendedInternship = opportunities.find((item) => item.type === "Internship");
  const recommendedStartupRole = opportunities.find((item) => item.type === "Startup Role");
  const topFreelanceProject = freelanceProjects[0];
  const latestIdea = ideas[0];

  const sectionHeader =
    activeSection === "home"
      ? {
          title: (
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome, <span className="bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">{user?.displayName || "Student"}</span>!
            </h1>
          ),
          subtitle: "Build your path: Skilled -> Earning -> Builder -> Founder",
        }
      : {
          title: <h1 className="text-3xl font-bold tracking-tight text-slate-900">{activeSectionLabel}</h1>,
          subtitle: sectionDescriptions[activeSection],
        };

  const navButtonClass = (key: SectionKey) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
      activeSection === key
        ? "bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-50 text-sky-700 shadow-sm"
        : "text-muted-foreground hover:bg-sky-50 hover:text-sky-600"
    }`;

  return (
    <div className="student-dashboard relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/25 to-white">
      <div className="pointer-events-none absolute inset-0 border-2 border-sky-200/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 border-l-2 border-t-2 border-sky-300/60 bg-gradient-to-br from-sky-300/20 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 border-r-2 border-t-2 border-sky-300/60 bg-gradient-to-bl from-sky-300/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 border-b-2 border-l-2 border-sky-300/60 bg-gradient-to-tr from-sky-300/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-2 border-r-2 border-sky-300/60 bg-gradient-to-tl from-sky-300/20 to-transparent" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />

      <aside className="hidden fixed left-0 top-0 h-screen w-[280px] border-r border-sky-100 bg-gradient-to-b from-white to-sky-50/30 lg:flex lg:flex-col">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          <div className="flex h-20 items-center border-b border-sky-100 px-6">
            <Link to="/" className="flex items-center gap-3 font-bold text-lg text-sky-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span>The Student Spot</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium space-y-1">
            <button type="button" className={navButtonClass("home")} onClick={() => goToSection("home")}>
              <Home className="h-4 w-4" />
              Home
            </button>
            <button type="button" className={navButtonClass("opportunities")} onClick={() => goToSection("opportunities")}>
              <Briefcase className="h-4 w-4" />
              Opportunities
            </button>
            <button type="button" className={navButtonClass("freelance")} onClick={() => goToSection("freelance")}>
              <Code className="h-4 w-4" />
              Freelance
            </button>
            <button type="button" className={navButtonClass("learning")} onClick={() => goToSection("learning")}>
              <Compass className="h-4 w-4" />
              Learning
            </button>
            <button type="button" className={navButtonClass("startupHub")} onClick={() => goToSection("startupHub")}>
              <Lightbulb className="h-4 w-4" />
              Startup Hub
            </button>
            <button type="button" className={navButtonClass("events")} onClick={() => goToSection("events")}>
              <Calendar className="h-4 w-4" />
              Events
            </button>
            <button type="button" className={navButtonClass("mentorship")} onClick={() => goToSection("mentorship")}>
              <Users className="h-4 w-4" />
              Mentorship
            </button>
            <button type="button" className={navButtonClass("profile")} onClick={() => goToSection("profile")}>
              <Settings className="h-4 w-4" />
              Profile
            </button>

            <div className="pt-3 mt-3 border-t border-sky-100">
              <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-muted-foreground transition-all hover:bg-sky-500 hover:text-white">
                <LifeBuoy className="h-4 w-4" />
                Support
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-sky-200 bg-gradient-to-r from-white to-sky-50/60 px-4 py-3 text-sm font-semibold text-sky-700 shadow-sm transition-all hover:border-sky-300 hover:bg-sky-50"
                onClick={() => setActivityOpen((prev) => !prev)}
              >
                <span className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Activity History
                </span>
                <span className="text-xs font-medium text-sky-500">{activityOpen ? "Hide" : "Show"}</span>
              </button>
              {activityOpen && (
                <div className="mt-3 rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-4 shadow-sm">
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activityHistory.map((item, index) => (
                      <li key={`${item}-${index}`} className="rounded-lg border border-sky-100 bg-white px-3 py-2 shadow-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          <div className="mt-auto border-t border-sky-100 p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{user.displayName || user.email}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-sky-500 hover:text-white" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-sky-500 text-white hover:bg-sky-600">Login</Button>
            )}
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-8 bg-gradient-to-br from-white via-sky-50/10 to-slate-50/50 p-4 lg:ml-[280px] lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
        <header className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur-sm md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {sectionHeader.title}
            <p className="mt-1 text-sm text-muted-foreground">{sectionHeader.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search jobs, projects, mentors"
                className="w-72 rounded-lg border-slate-300 bg-white pl-10 transition-all focus-visible:border-sky-400 focus-visible:ring-sky-200"
              />
            </div>

            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-sky-200 text-sky-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-500 hover:text-white hover:shadow-sm"
                onClick={() => setNotifyOpen((prev) => !prev)}
              >
                <Bell className="h-5 w-5" />
              </Button>
              {notifyOpen && (
                <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-sky-100 bg-gradient-to-r from-white to-sky-50/40 p-3 shadow-lg">
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    <li className="rounded-md bg-slate-50 p-2">New internship matched your skills.</li>
                    <li className="rounded-md bg-slate-50 p-2">Hackathon registration closes in 2 days.</li>
                    <li className="rounded-md bg-slate-50 p-2">Mentor request response pending.</li>
                  </ul>
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-sky-200 text-sky-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-500 hover:text-white hover:shadow-sm">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.displayName || "Student"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => goToSection("profile")}>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => goToSection("opportunities")}>View Opportunities</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
        </header>

        {activeSection === "home" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Home (Overview Dashboard)</h2>
              <p className="text-sm text-muted-foreground">Snapshot of your progress and next actions</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">Profile Completion</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{profileCompletion}%</p>
                <p className="mt-1 text-xs text-sky-600">Track: {profile.careerTrack}</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">Skills Count</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{profile.skills ? profile.skills.split(",").filter(Boolean).length : 0}</p>
                <p className="mt-1 text-xs text-sky-600">Resume: {profile.resume ? "Uploaded" : "Missing"}</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{applications.length}</p>
                <p className="mt-1 text-xs text-sky-600">Freelance: {freelanceApps.length}</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">Events & Certificates</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{registeredEvents.length}</p>
                <p className="mt-1 text-xs text-sky-600">Certificates: {certificates.length}</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Recommended Opportunities</h3>
                <div className="mt-3 space-y-3 text-sm">
                  <p><span className="font-medium">Top Internship:</span> {recommendedInternship?.title || "N/A"}</p>
                  <p><span className="font-medium">Top Startup Role:</span> {recommendedStartupRole?.title || "N/A"}</p>
                  <p><span className="font-medium">Top Freelance Project:</span> {topFreelanceProject?.title || "N/A"}</p>
                </div>
                <Button className="mt-4 bg-sky-500 text-white hover:bg-sky-600" onClick={() => goToSection("opportunities")}> 
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Startup Status</h3>
                {latestIdea ? (
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p><span className="font-medium">Stage:</span> {latestIdea.stage}</p>
                    <p><span className="font-medium">Co-founder Requests:</span> {coFounderRequests}</p>
                    <p><span className="font-medium">Suggested Resource:</span> Pitch deck template</p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">No idea submitted yet.</p>
                )}
                <Button variant="outline" className="mt-4 border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => goToSection("startupHub")}>Go to Startup Hub</Button>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Profile Summary</h3>
                <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => goToSection("profile")}>Edit Profile</Button>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                <p><span className="font-medium">Career Track:</span> {profile.careerTrack}</p>
                <p><span className="font-medium">Startup Interest:</span> {profile.startupInterest ? "Yes" : "No"}</p>
                <p><span className="font-medium">Resume Status:</span> {profile.resume ? "Uploaded" : "Not uploaded"}</p>
                <p><span className="font-medium">Portfolio:</span> {profile.portfolio || "Not added"}</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === "opportunities" && (
          <section className="space-y-5">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-sky-50 text-sky-700">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Internship">Internships</TabsTrigger>
                <TabsTrigger value="Full-Time">Full-Time Jobs</TabsTrigger>
                <TabsTrigger value="Startup Role">Startup Roles</TabsTrigger>
                <TabsTrigger value="Government Alert">Government Alerts</TabsTrigger>
              </TabsList>

              {["all", "Internship", "Full-Time", "Startup Role", "Government Alert"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-sky-100 bg-white p-4 shadow-sm md:grid-cols-4">
                    <Input placeholder="Type" value={opportunityFilters.type} onChange={(event) => setOpportunityFilters((prev) => ({ ...prev, type: event.target.value }))} />
                    <Input placeholder="Location" value={opportunityFilters.location} onChange={(event) => setOpportunityFilters((prev) => ({ ...prev, location: event.target.value }))} />
                    <Input placeholder="Remote / Onsite" value={opportunityFilters.mode} onChange={(event) => setOpportunityFilters((prev) => ({ ...prev, mode: event.target.value }))} />
                    <Input placeholder="Domain" value={opportunityFilters.domain} onChange={(event) => setOpportunityFilters((prev) => ({ ...prev, domain: event.target.value }))} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredOpportunities
                      .filter((item) => (tab === "all" ? true : item.type === tab))
                      .map((item) => (
                        <motion.div key={item.id} whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.company} • {item.type}</p>
                          <p className="mt-1 text-sm text-slate-700">{item.location} • {item.mode}</p>
                          <p className="mt-1 text-sm text-slate-700">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <a href={item.applyLink} target="_blank" rel="noreferrer">
                              <Button className="bg-sky-500 text-white hover:bg-sky-600" onClick={() => applyJob(item)}>Apply</Button>
                            </a>
                            <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => toggleSavedJob(item.id)}>{savedJobs.includes(item.id) ? "Saved" : "Save"}</Button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Application Tracker (Manual)</h3>
              <div className="mt-3 space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="rounded-lg border border-sky-100 p-3">
                    <p className="font-medium text-slate-900">{app.title}</p>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateJobStatus(app.id, "Applied")}>Applied</Button>
                      <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateJobStatus(app.id, "Interview")}>Interview</Button>
                      <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateJobStatus(app.id, "Selected")}>Selected</Button>
                      <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateJobStatus(app.id, "Rejected")}>Rejected</Button>
                      <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{app.status}</span>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && <p className="text-sm text-muted-foreground">No applications yet.</p>}
              </div>
            </div>
          </section>
        )}

        {activeSection === "freelance" && (
          <section className="space-y-5">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="bg-sky-50 text-sky-700">
                <TabsTrigger value="available">Available Projects</TabsTrigger>
                <TabsTrigger value="applications">My Applications</TabsTrigger>
                <TabsTrigger value="active">Active Projects</TabsTrigger>
                <TabsTrigger value="completed">Completed Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="available">
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-sky-100 bg-white p-4 shadow-sm md:grid-cols-3">
                  <Input placeholder="Skill" value={freelanceFilters.skill} onChange={(event) => setFreelanceFilters((prev) => ({ ...prev, skill: event.target.value }))} />
                  <Input placeholder="Budget" value={freelanceFilters.budget} onChange={(event) => setFreelanceFilters((prev) => ({ ...prev, budget: event.target.value }))} />
                  <label className="flex items-center gap-2 rounded-md border border-input px-3 py-2 text-sm">
                    <input type="checkbox" checked={freelanceFilters.remote} onChange={(event) => setFreelanceFilters((prev) => ({ ...prev, remote: event.target.checked }))} />
                    Remote only
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <motion.div key={project.id} whileHover={{ y: -4 }} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                      <p className="font-semibold text-slate-900">{project.title}</p>
                      <p className="text-sm text-muted-foreground">Posted by {project.postedBy}</p>
                      <p className="mt-1 text-sm text-slate-700">{project.description}</p>
                      <p className="mt-1 text-sm text-sky-600">Skills: {project.skillsRequired}</p>
                      <p className="text-sm text-slate-600">Budget: {project.budget || "Optional"}</p>
                      <Button className="mt-3 bg-sky-500 text-white hover:bg-sky-600" onClick={() => applyProject(project)}>Apply</Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applications">
                <div className="mt-4 space-y-3">
                  {freelanceApps.map((app) => (
                    <div key={app.id} className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{app.projectTitle}</p>
                      <span className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{app.status}</span>
                    </div>
                  ))}
                  {freelanceApps.length === 0 && <p className="text-sm text-muted-foreground">No freelance applications yet.</p>}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div className="mt-4 space-y-3">
                  {freelanceApps.filter((item) => item.status === "Active").map((app) => (
                    <div key={app.id} className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{app.projectTitle}</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateProjectStatus(app.id, "Completed")}>Mark Completed</Button>
                      </div>
                    </div>
                  ))}
                  {freelanceApps.filter((item) => item.status === "Active").length === 0 && <p className="text-sm text-muted-foreground">No active projects.</p>}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="mt-4 space-y-3">
                  {freelanceApps.filter((item) => item.status === "Completed").map((app) => (
                    <div key={app.id} className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{app.projectTitle}</p>
                      <span className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">Completed</span>
                    </div>
                  ))}
                  {freelanceApps.filter((item) => item.status === "Completed").length === 0 && <p className="text-sm text-muted-foreground">No completed projects yet.</p>}
                </div>
              </TabsContent>
            </Tabs>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Update Freelance Application Status</h3>
              <div className="mt-3 space-y-2">
                {freelanceApps.map((app) => (
                  <div key={app.id} className="flex flex-wrap items-center gap-2 rounded-md border border-sky-100 p-3">
                    <p className="min-w-[180px] text-sm font-medium text-slate-900">{app.projectTitle}</p>
                    <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateProjectStatus(app.id, "Applied")}>Applied</Button>
                    <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateProjectStatus(app.id, "Active")}>Active</Button>
                    <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => updateProjectStatus(app.id, "Completed")}>Completed</Button>
                  </div>
                ))}
                {freelanceApps.length === 0 && <p className="text-sm text-muted-foreground">No project applications available.</p>}
              </div>
            </div>
          </section>
        )}

        {activeSection === "learning" && (
          <section className="space-y-5">
            <div className="rounded-xl border border-sky-100 bg-white p-5 shadow-sm">
              <label className="text-sm font-medium text-slate-700">Track Selection</label>
              <select
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:w-72"
                value={track}
                onChange={(event) => setTrack(event.target.value as CareerTrack)}
              >
                <option value="Career">Career Track</option>
                <option value="Startup">Startup Track</option>
                <option value="Freelance">Freelance Track</option>
                <option value="Government">Government Track</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Roadmap</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {trackRoadmaps[track].map((step) => (
                    <li key={step} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500" />{step}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Content</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Recommended roadmap (static content)</li>
                  <li>Free resources</li>
                  <li>Notes and books</li>
                  <li>Skill challenges</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === "startupHub" && (
          <section className="space-y-5">
            <form onSubmit={submitIdea} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Submit Idea</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input required placeholder="Problem" value={ideaForm.problem} onChange={(event) => setIdeaForm((prev) => ({ ...prev, problem: event.target.value }))} />
                <Input required placeholder="Solution" value={ideaForm.solution} onChange={(event) => setIdeaForm((prev) => ({ ...prev, solution: event.target.value }))} />
                <Input required placeholder="Target audience" value={ideaForm.targetAudience} onChange={(event) => setIdeaForm((prev) => ({ ...prev, targetAudience: event.target.value }))} />
                <select value={ideaForm.stage} onChange={(event) => setIdeaForm((prev) => ({ ...prev, stage: event.target.value as StartupIdea["stage"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Idea">Idea</option>
                  <option value="Validation">Validation</option>
                  <option value="MVP">MVP</option>
                </select>
                <Input required placeholder="Skills needed" value={ideaForm.skillsNeeded} onChange={(event) => setIdeaForm((prev) => ({ ...prev, skillsNeeded: event.target.value }))} />
              </div>
              <Button type="submit" className="mt-4 bg-sky-500 text-white hover:bg-sky-600">Submit Idea</Button>
            </form>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Find Co-Founder</h3>
                <div className="mt-3 space-y-3">
                  {ideas.map((idea) => (
                    <div key={idea.id} className="rounded-lg border border-sky-100 p-3">
                      <p className="font-medium text-slate-900">{idea.problem}</p>
                      <p className="text-sm text-muted-foreground">Stage: {idea.stage}</p>
                      <p className="text-sm text-slate-700">Skills required: {idea.skillsNeeded}</p>
                      <Button variant="outline" className="mt-2 border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={sendCoFounderRequest}>Contact</Button>
                    </div>
                  ))}
                  {ideas.length === 0 && <p className="text-sm text-muted-foreground">No startup posts yet.</p>}
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Resources</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Pitch deck template</li>
                  <li>Business model canvas</li>
                  <li>Legal basics guide</li>
                  <li>Incubator list</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === "events" && (
          <section className="space-y-5">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="bg-sky-50 text-sky-700">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="registered">Registered</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {upcomingEvents.map((eventItem) => (
                    <div key={eventItem.id} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                      <p className="font-semibold text-slate-900">{eventItem.title}</p>
                      <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date} • {eventItem.mode}</p>
                      <Button className="mt-3 bg-sky-500 text-white hover:bg-sky-600" onClick={() => registerForEvent(eventItem.id)}>Register</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="registered">
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {registeredEventCards.map((eventItem) => (
                    <div key={eventItem.id} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                      <p className="font-semibold text-slate-900">{eventItem.title}</p>
                      <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date}</p>
                    </div>
                  ))}
                  {registeredEventCards.length === 0 && <p className="text-sm text-muted-foreground">No registered events yet.</p>}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {pastEvents.map((eventItem) => (
                    <div key={eventItem.id} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                      <p className="font-semibold text-slate-900">{eventItem.title}</p>
                      <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => uploadCertificate(eventItem.id)}>Upload Certificate</Button>
                        <Button variant="outline" className="border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white">Download Certificate</Button>
                      </div>
                    </div>
                  ))}
                  {pastEvents.length === 0 && <p className="text-sm text-muted-foreground">No past events yet.</p>}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}

        {activeSection === "mentorship" && (
          <section className="space-y-5">
            <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
              <label className="text-sm font-medium text-slate-700">Filter by domain</label>
              <select value={mentorDomainFilter} onChange={(event) => setMentorDomainFilter(event.target.value)} className="mt-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">All</option>
                <option value="Career">Career</option>
                <option value="Startup">Startup</option>
                <option value="Tech">Tech</option>
                <option value="Government">Government</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Mentor Listing</h3>
                <div className="mt-3 space-y-3">
                  {filteredMentors.map((mentor) => (
                    <div key={mentor.id} className="rounded-lg border border-sky-100 p-3">
                      <p className="font-medium text-slate-900">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.domain}</p>
                      <p className="text-sm text-slate-700">{mentor.experience}</p>
                      <Button variant="outline" className="mt-2 border-sky-200 text-sky-700 transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white" onClick={() => setMentorForm((prev) => ({ ...prev, mentorId: mentor.id }))}>Request session</Button>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={submitMentorRequest} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Request Flow</h3>
                <div className="mt-3 space-y-3">
                  <Input value={userId} readOnly placeholder="User ID" />
                  <select required value={mentorForm.mentorId} onChange={(event) => setMentorForm((prev) => ({ ...prev, mentorId: event.target.value }))} className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select Mentor</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                    ))}
                  </select>
                  <Input required placeholder="Topic" value={mentorForm.topic} onChange={(event) => setMentorForm((prev) => ({ ...prev, topic: event.target.value }))} />
                  <Textarea required placeholder="Message" value={mentorForm.message} onChange={(event) => setMentorForm((prev) => ({ ...prev, message: event.target.value }))} />
                  <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-600">Send Request</Button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Mentor Requests</h3>
              <div className="mt-3 space-y-3">
                {mentorRequests.map((request) => (
                  <div key={request.id} className="rounded-lg border border-sky-100 p-3">
                    <p className="font-medium text-slate-900">{request.mentorName}</p>
                    <p className="text-sm text-muted-foreground">Topic: {request.topic}</p>
                    <p className="text-sm text-slate-700">{request.message}</p>
                    <span className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{request.status}</span>
                  </div>
                ))}
                {mentorRequests.length === 0 && <p className="text-sm text-muted-foreground">No requests yet.</p>}
              </div>
            </div>
          </section>
        )}

        {activeSection === "profile" && (
          <section className="space-y-5">
            <form onSubmit={saveProfile} className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input required placeholder="Basic information - Name" value={profile.name} onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))} />
                <Input required placeholder="Basic information - Email" value={profile.email} onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))} />
                <Input required placeholder="Education / College" value={profile.college} onChange={(event) => setProfile((prev) => ({ ...prev, college: event.target.value }))} />
                <Input required placeholder="Skills" value={profile.skills} onChange={(event) => setProfile((prev) => ({ ...prev, skills: event.target.value }))} />
                <select value={profile.careerTrack} onChange={(event) => setProfile((prev) => ({ ...prev, careerTrack: event.target.value as CareerTrack }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Career">Career interest: Career</option>
                  <option value="Startup">Career interest: Startup</option>
                  <option value="Freelance">Career interest: Freelance</option>
                  <option value="Government">Career interest: Government</option>
                </select>
                <Input placeholder="Resume upload (URL)" value={profile.resume} onChange={(event) => setProfile((prev) => ({ ...prev, resume: event.target.value }))} />
                <Input placeholder="Portfolio link" value={profile.portfolio} onChange={(event) => setProfile((prev) => ({ ...prev, portfolio: event.target.value }))} />
                <label className="flex items-center gap-2 rounded-md border border-input px-3 py-2 text-sm">
                  <input type="checkbox" checked={profile.startupInterest} onChange={(event) => setProfile((prev) => ({ ...prev, startupInterest: event.target.checked }))} />
                  Startup interest toggle
                </label>
              </div>
              <Button type="submit" className="mt-4 bg-sky-500 text-white hover:bg-sky-600">Save Profile</Button>
            </form>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Profile Completion Logic</h3>
              <p className="mt-2 text-4xl font-bold text-sky-600">{profileCompletion}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Basic info = 20%, Skills = 20%, Resume = 20%, Career track = 20%, Links and interests = 20%</p>
            </div>
          </section>
        )}
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
