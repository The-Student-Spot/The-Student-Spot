import { FormEvent, ReactNode, useMemo, useState } from "react";
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
  FlaskConical,
  Handshake,
  Home,
  Lightbulb,
  LineChart,
  LogOut,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

type SectionKey =
  | "home"
  | "pipeline"
  | "programs"
  | "challenges"
  | "mentorship"
  | "partnerships"
  | "investor"
  | "talent"
  | "insights"
  | "profile";

type StartupStage = "Idea" | "Validation" | "MVP" | "Traction";
type ApplicationStatus = "Pending" | "Shortlisted" | "Accepted" | "Rejected" | "Saved";
type ProgramType = "Pre-incubation" | "Incubation" | "Acceleration" | "Bootcamp";
type MentorDomain = "Business" | "Product" | "Marketing" | "Fundraising" | "Legal";
type ChallengeType = "Startup Challenge" | "Hackathon" | "Innovation Drive" | "Pitch Competition";
type PartnerUseCase = "Pilot Project" | "Innovation Testing" | "Research Collaboration" | "Vendor Partnership";

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  tone: "info" | "success" | "neutral";
};

type StartupApplication = {
  id: string;
  startupName: string;
  founder: string;
  problemSolution: string;
  stage: StartupStage;
  teamMembers: string;
  pitchDeck: string;
  status: ApplicationStatus;
};

type IncubationProgram = {
  id: string;
  name: string;
  type: ProgramType;
  cohort: string;
  milestones: number;
  mentorSessions: number;
  deliverables: number;
  assignedStartups: string[];
};

type ChallengeEvent = {
  id: string;
  title: string;
  type: ChallengeType;
  statement: string;
  participants: number;
  date: string;
};

type Mentor = {
  id: string;
  name: string;
  domain: MentorDomain;
};

type MentorAssignment = {
  id: string;
  startupName: string;
  mentorId: string;
  mentorName: string;
  sessionDate: string;
  requestStatus: "Requested" | "Scheduled";
};

type CorporatePartnership = {
  id: string;
  companyName: string;
  useCase: PartnerUseCase;
  startupAssigned: string;
  outcome: string;
};

type InvestorShowcase = {
  id: string;
  startupName: string;
  eventType: "Demo Day" | "Pitch Event" | "Startup Showcase";
  investorInterest: number;
  status: "Submitted" | "Selected";
};

type TalentOpportunity = {
  id: string;
  startupName: string;
  role: string;
  skills: string;
  type: "Internship" | "Freelance" | "Part-time";
};

type StudentTalent = {
  id: string;
  name: string;
  skills: string;
  college: string;
  experience: string;
};

type IncubatorProfile = {
  incubatorName: string;
  organizationType: string;
  location: string;
  website: string;
  focusAreas: string;
  portfolioStartups: string;
  successStories: string;
  fundingStats: string;
};

const routeToSection: Record<string, SectionKey> = {
  home: "home",
  pipeline: "pipeline",
  programs: "programs",
  challenges: "challenges",
  mentorship: "mentorship",
  partnerships: "partnerships",
  investor: "investor",
  talent: "talent",
  insights: "insights",
  profile: "profile",
};

const sectionToRoute: Record<SectionKey, string> = {
  home: "home",
  pipeline: "pipeline",
  programs: "programs",
  challenges: "challenges",
  mentorship: "mentorship",
  partnerships: "partnerships",
  investor: "investor",
  talent: "talent",
  insights: "insights",
  profile: "profile",
};

const sectionMeta: Record<SectionKey, { title: string; subtitle: string }> = {
  home: { title: "Incubator Command Center", subtitle: "Startup Discovery + Validation + Acceleration System" },
  pipeline: { title: "Startup Pipeline", subtitle: "Manage startup discovery and onboarding" },
  programs: { title: "Programs & Incubation", subtitle: "Run structured incubation and acceleration programs" },
  challenges: { title: "Challenges & Hackathons", subtitle: "Discover talent and ideas at scale" },
  mentorship: { title: "Mentorship", subtitle: "Provide expert guidance to startups" },
  partnerships: { title: "Corporate Partnerships", subtitle: "Enable corporate-startup collaboration" },
  investor: { title: "Investor Connect", subtitle: "Support startup funding exposure in non-transactional MVP mode" },
  talent: { title: "Talent Access", subtitle: "Help startups hire from the student ecosystem" },
  insights: { title: "Insights & Reports", subtitle: "Track performance and impact metrics" },
  profile: { title: "Profile", subtitle: "Manage incubator details and focus areas" },
};

const mentors: Mentor[] = [
  { id: "m1", name: "Aditi Menon", domain: "Business" },
  { id: "m2", name: "Karan Shah", domain: "Product" },
  { id: "m3", name: "Sana Qureshi", domain: "Marketing" },
  { id: "m4", name: "Raghav Iyer", domain: "Fundraising" },
  { id: "m5", name: "Meera Kulkarni", domain: "Legal" },
];

const studentTalentPool: StudentTalent[] = [
  { id: "t1", name: "Arnav", skills: "React, UI, Figma", college: "IIT Bombay", experience: "Intermediate" },
  { id: "t2", name: "Nisha", skills: "Python, Data, APIs", college: "BITS Pilani", experience: "Advanced" },
  { id: "t3", name: "Rahul", skills: "Growth, SEO, Content", college: "NIT Surathkal", experience: "Intermediate" },
];

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="mb-5">
    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">{title}</span>
    </h2>
    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
  </motion.div>
);

const CardShell = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-violet-50/20 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
  >
    {children}
  </motion.div>
);

const IncubatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();

  const activeSection: SectionKey = routeToSection[section || "home"] || "home";

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activityHistoryOpen, setActivityHistoryOpen] = useState(false);

  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([
    { id: "a0", title: "Dashboard loaded", detail: "Incubator workspace is ready.", tone: "info" },
  ]);

  const [applications, setApplications] = useState<StartupApplication[]>([
    {
      id: "sa1",
      startupName: "AgriSense",
      founder: "Vikram",
      problemSolution: "IoT monitoring for small farms",
      stage: "MVP",
      teamMembers: "4",
      pitchDeck: "agrisense-deck.pdf",
      status: "Pending",
    },
    {
      id: "sa2",
      startupName: "HireLoop",
      founder: "Ria",
      problemSolution: "Campus hiring workflow automation",
      stage: "Validation",
      teamMembers: "3",
      pitchDeck: "hireloop-deck.pdf",
      status: "Shortlisted",
    },
  ]);

  const [applicationForm, setApplicationForm] = useState({
    startupName: "",
    founder: "",
    problemSolution: "",
    stage: "Idea" as StartupStage,
    teamMembers: "",
    pitchDeck: "",
  });

  const [programs, setPrograms] = useState<IncubationProgram[]>([
    {
      id: "pr1",
      name: "LaunchPad Cohort",
      type: "Pre-incubation",
      cohort: "Spring 2026",
      milestones: 4,
      mentorSessions: 8,
      deliverables: 3,
      assignedStartups: ["AgriSense"],
    },
  ]);

  const [programForm, setProgramForm] = useState({
    name: "",
    type: "Incubation" as ProgramType,
    cohort: "",
    milestones: "",
    mentorSessions: "",
    deliverables: "",
    assignedStartup: "",
  });

  const [challenges, setChallenges] = useState<ChallengeEvent[]>([
    {
      id: "ch1",
      title: "Campus Commerce Challenge",
      type: "Startup Challenge",
      statement: "Improve student-led commerce trust signals.",
      participants: 52,
      date: "2026-04-20",
    },
  ]);

  const [challengeForm, setChallengeForm] = useState({
    title: "",
    type: "Hackathon" as ChallengeType,
    statement: "",
    date: "",
  });

  const [mentorAssignments, setMentorAssignments] = useState<MentorAssignment[]>([
    {
      id: "ma1",
      startupName: "AgriSense",
      mentorId: "m2",
      mentorName: "Karan Shah",
      sessionDate: "2026-04-15",
      requestStatus: "Scheduled",
    },
  ]);

  const [mentorshipForm, setMentorshipForm] = useState({
    startupName: "",
    mentorId: "",
    sessionDate: "",
  });

  const [corporateLinks, setCorporateLinks] = useState<CorporatePartnership[]>([
    {
      id: "cp1",
      companyName: "NovaLabs",
      useCase: "Pilot Project",
      startupAssigned: "HireLoop",
      outcome: "Pilot initiated",
    },
  ]);

  const [corporateForm, setCorporateForm] = useState({
    companyName: "",
    useCase: "Innovation Testing" as PartnerUseCase,
    startupAssigned: "",
    outcome: "",
  });

  const [investorShowcases, setInvestorShowcases] = useState<InvestorShowcase[]>([
    {
      id: "iv1",
      startupName: "AgriSense",
      eventType: "Demo Day",
      investorInterest: 3,
      status: "Submitted",
    },
  ]);

  const [investorForm, setInvestorForm] = useState({
    startupName: "",
    eventType: "Demo Day" as InvestorShowcase["eventType"],
  });

  const [talentOpportunities, setTalentOpportunities] = useState<TalentOpportunity[]>([
    {
      id: "to1",
      startupName: "HireLoop",
      role: "Frontend Intern",
      skills: "React, TS",
      type: "Internship",
    },
  ]);

  const [talentForm, setTalentForm] = useState({
    startupName: "",
    role: "",
    skills: "",
    type: "Internship" as TalentOpportunity["type"],
  });

  const [profile, setProfile] = useState<IncubatorProfile>({
    incubatorName: "",
    organizationType: "",
    location: "",
    website: "",
    focusAreas: "",
    portfolioStartups: "",
    successStories: "",
    fundingStats: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const currentSectionMeta = sectionMeta[activeSection];

  const addActivity = (title: string, detail: string, tone: ActivityItem["tone"] = "success") => {
    setActivityFeed((prev) => [{ id: `a-${Date.now()}`, title, detail, tone }, ...prev].slice(0, 10));
  };

  const goToSection = (next: SectionKey) => {
    navigate(`/incubator-dashboard/${sectionToRoute[next]}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    addActivity("Application updated", `Startup application moved to ${status}.`, "info");
  };

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplications((prev) => [
      {
        id: `sa-${Date.now()}`,
        ...applicationForm,
        status: "Pending",
      },
      ...prev,
    ]);
    addActivity("Startup application added", `${applicationForm.startupName} added to pipeline.`);
    setApplicationForm({ startupName: "", founder: "", problemSolution: "", stage: "Idea", teamMembers: "", pitchDeck: "" });
  };

  const submitProgram = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrograms((prev) => [
      {
        id: `pr-${Date.now()}`,
        name: programForm.name,
        type: programForm.type,
        cohort: programForm.cohort,
        milestones: Number(programForm.milestones || 0),
        mentorSessions: Number(programForm.mentorSessions || 0),
        deliverables: Number(programForm.deliverables || 0),
        assignedStartups: programForm.assignedStartup ? [programForm.assignedStartup] : [],
      },
      ...prev,
    ]);
    addActivity("Program created", `${programForm.name} program launched.`);
    setProgramForm({ name: "", type: "Incubation", cohort: "", milestones: "", mentorSessions: "", deliverables: "", assignedStartup: "" });
  };

  const submitChallenge = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChallenges((prev) => [
      {
        id: `ch-${Date.now()}`,
        title: challengeForm.title,
        type: challengeForm.type,
        statement: challengeForm.statement,
        date: challengeForm.date,
        participants: 0,
      },
      ...prev,
    ]);
    addActivity("Challenge created", `${challengeForm.title} published.`);
    setChallengeForm({ title: "", type: "Hackathon", statement: "", date: "" });
  };

  const bumpChallengeParticipants = (id: string) => {
    setChallenges((prev) => prev.map((item) => (item.id === id ? { ...item, participants: item.participants + 1 } : item)));
    addActivity("Participant tracked", "Challenge participation count increased.", "info");
  };

  const submitMentorship = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mentor = mentors.find((item) => item.id === mentorshipForm.mentorId);
    if (!mentor) {
      addActivity("Select mentor", "Please choose a mentor before assigning.", "neutral");
      return;
    }
    setMentorAssignments((prev) => [
      {
        id: `ma-${Date.now()}`,
        startupName: mentorshipForm.startupName,
        mentorId: mentor.id,
        mentorName: mentor.name,
        sessionDate: mentorshipForm.sessionDate,
        requestStatus: "Requested",
      },
      ...prev,
    ]);
    addActivity("Mentor assigned", `${mentor.name} assigned to ${mentorshipForm.startupName}.`);
    setMentorshipForm({ startupName: "", mentorId: "", sessionDate: "" });
  };

  const setMentorshipStatus = (id: string, status: MentorAssignment["requestStatus"]) => {
    setMentorAssignments((prev) => prev.map((item) => (item.id === id ? { ...item, requestStatus: status } : item)));
    addActivity("Mentorship status updated", `Mentorship moved to ${status}.`, "info");
  };

  const submitCorporate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCorporateLinks((prev) => [
      {
        id: `cp-${Date.now()}`,
        ...corporateForm,
      },
      ...prev,
    ]);
    addActivity("Corporate collaboration added", `${corporateForm.companyName} linked with startup.`);
    setCorporateForm({ companyName: "", useCase: "Innovation Testing", startupAssigned: "", outcome: "" });
  };

  const submitInvestor = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvestorShowcases((prev) => [
      {
        id: `iv-${Date.now()}`,
        startupName: investorForm.startupName,
        eventType: investorForm.eventType,
        investorInterest: 0,
        status: "Submitted",
      },
      ...prev,
    ]);
    addActivity("Startup submitted", `${investorForm.startupName} submitted for ${investorForm.eventType}.`);
    setInvestorForm({ startupName: "", eventType: "Demo Day" });
  };

  const bumpInvestorInterest = (id: string) => {
    setInvestorShowcases((prev) => prev.map((item) => (item.id === id ? { ...item, investorInterest: item.investorInterest + 1 } : item)));
    addActivity("Investor interest tracked", "Interest count updated for one startup.", "info");
  };

  const submitTalentOpportunity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTalentOpportunities((prev) => [{ id: `to-${Date.now()}`, ...talentForm }, ...prev]);
    addActivity("Talent opportunity shared", `${talentForm.role} posted for ${talentForm.startupName}.`);
    setTalentForm({ startupName: "", role: "", skills: "", type: "Internship" });
  };

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaved(true);
    addActivity("Profile updated", "Incubator profile information saved.");
  };

  const filteredApplications = useMemo(() => {
    if (!search.trim()) {
      return applications;
    }
    const key = search.toLowerCase();
    return applications.filter((app) => `${app.startupName} ${app.founder} ${app.problemSolution}`.toLowerCase().includes(key));
  }, [applications, search]);

  const filteredPrograms = useMemo(() => {
    if (!search.trim()) {
      return programs;
    }
    const key = search.toLowerCase();
    return programs.filter((program) => `${program.name} ${program.type} ${program.cohort} ${program.assignedStartups.join(" ")}`.toLowerCase().includes(key));
  }, [programs, search]);

  const filteredChallenges = useMemo(() => {
    if (!search.trim()) {
      return challenges;
    }
    const key = search.toLowerCase();
    return challenges.filter((challenge) => `${challenge.title} ${challenge.type} ${challenge.statement} ${challenge.date}`.toLowerCase().includes(key));
  }, [challenges, search]);

  const filteredMentorAssignments = useMemo(() => {
    if (!search.trim()) {
      return mentorAssignments;
    }
    const key = search.toLowerCase();
    return mentorAssignments.filter((assignment) => `${assignment.startupName} ${assignment.mentorName} ${assignment.sessionDate} ${assignment.requestStatus}`.toLowerCase().includes(key));
  }, [mentorAssignments, search]);

  const filteredCorporateLinks = useMemo(() => {
    if (!search.trim()) {
      return corporateLinks;
    }
    const key = search.toLowerCase();
    return corporateLinks.filter((link) => `${link.companyName} ${link.useCase} ${link.startupAssigned} ${link.outcome}`.toLowerCase().includes(key));
  }, [corporateLinks, search]);

  const filteredInvestorShowcases = useMemo(() => {
    if (!search.trim()) {
      return investorShowcases;
    }
    const key = search.toLowerCase();
    return investorShowcases.filter((item) => `${item.startupName} ${item.eventType} ${item.status}`.toLowerCase().includes(key));
  }, [investorShowcases, search]);

  const filteredTalentOpportunities = useMemo(() => {
    if (!search.trim()) {
      return talentOpportunities;
    }
    const key = search.toLowerCase();
    return talentOpportunities.filter((item) => `${item.startupName} ${item.role} ${item.skills} ${item.type}`.toLowerCase().includes(key));
  }, [talentOpportunities, search]);

  const filteredStudentTalentPool = useMemo(() => {
    if (!search.trim()) {
      return studentTalentPool;
    }
    const key = search.toLowerCase();
    return studentTalentPool.filter((student) => `${student.name} ${student.skills} ${student.college} ${student.experience}`.toLowerCase().includes(key));
  }, [search]);

  const metrics = useMemo(() => {
    return {
      startupsOnboarded: applications.filter((a) => a.status === "Accepted").length,
      activeStartups: applications.filter((a) => ["Accepted", "Shortlisted"].includes(a.status)).length,
      programsRunning: programs.length,
      mentorsEngaged: new Set(mentorAssignments.map((item) => item.mentorId)).size,
      upcomingEvents: challenges.filter((event) => new Date(event.date) >= new Date("2026-04-03")).length,
      progressingStartups: applications.filter((a) => ["MVP", "Traction"].includes(a.stage)).length,
      programsCompleted: programs.filter((p) => p.milestones > 0 && p.deliverables > 0).length,
      mentorEngagement: mentorAssignments.length,
      eventParticipation: challenges.reduce((sum, item) => sum + item.participants, 0),
    };
  }, [applications, challenges, mentorAssignments, programs]);

  const navigationButton = (sectionKey: SectionKey) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
      activeSection === sectionKey
        ? "bg-gradient-to-r from-violet-100 to-fuchsia-50 text-violet-700 shadow-sm"
        : "text-muted-foreground hover:bg-violet-50 hover:text-violet-600"
    }`;

  return (
    <div className="incubator-dashboard relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/20 to-white">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-200/20 blur-3xl" />

      <aside className="hidden fixed left-0 top-0 h-screen w-[290px] border-r border-slate-200 bg-gradient-to-b from-white to-violet-50/30 lg:flex lg:flex-col">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          <div className="flex h-20 items-center border-b border-slate-200 px-6">
            <Link to="/" className="flex items-center gap-3 font-bold text-lg text-violet-600">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                <Rocket className="h-5 w-5" />
              </span>
              <span>The Student Spot</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto px-4 py-4 text-sm font-medium space-y-1">
            <button type="button" className={navigationButton("home")} onClick={() => goToSection("home")}><Home className="h-4 w-4" />Home</button>
            <button type="button" className={navigationButton("pipeline")} onClick={() => goToSection("pipeline")}><Briefcase className="h-4 w-4" />Startup Pipeline</button>
            <button type="button" className={navigationButton("programs")} onClick={() => goToSection("programs")}><FlaskConical className="h-4 w-4" />Programs & Incubation</button>
            <button type="button" className={navigationButton("challenges")} onClick={() => goToSection("challenges")}><Calendar className="h-4 w-4" />Challenges & Hackathons</button>
            <button type="button" className={navigationButton("mentorship")} onClick={() => goToSection("mentorship")}><Users className="h-4 w-4" />Mentorship</button>
            <button type="button" className={navigationButton("partnerships")} onClick={() => goToSection("partnerships")}><Handshake className="h-4 w-4" />Corporate Partnerships</button>
            <button type="button" className={navigationButton("investor")} onClick={() => goToSection("investor")}><Building2 className="h-4 w-4" />Investor Connect</button>
            <button type="button" className={navigationButton("talent")} onClick={() => goToSection("talent")}><Sparkles className="h-4 w-4" />Talent Access</button>
            <button type="button" className={navigationButton("insights")} onClick={() => goToSection("insights")}><LineChart className="h-4 w-4" />Insights & Reports</button>
            <button type="button" className={navigationButton("profile")} onClick={() => goToSection("profile")}><ShieldCheck className="h-4 w-4" />Profile</button>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-muted-foreground transition-all hover:bg-violet-50 hover:text-violet-600"
                onClick={() => setActivityHistoryOpen((prev) => !prev)}
              >
                <Clock className="h-4 w-4" />
                Activity History
              </button>
              {activityHistoryOpen && (
                <div className="mt-3 space-y-2 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent activity</p>
                  <div className="space-y-2 max-h-56 overflow-auto pr-1">
                    {activityFeed.map((activity) => (
                      <div key={activity.id} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                        <p className={`text-sm font-medium ${activity.tone === "success" ? "text-violet-600" : activity.tone === "info" ? "text-violet-600" : "text-slate-700"}`}>{activity.title}</p>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold">{user.displayName || user.email}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0 text-slate-500 hover:bg-violet-50 hover:text-violet-600" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Login</Button>
            )}
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-8 bg-gradient-to-br from-white via-violet-50/10 to-slate-50/40 p-4 lg:ml-[290px] lg:p-10">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="flex flex-col gap-8">
          <header className="rounded-2xl border border-slate-200/90 bg-white/85 p-5 shadow-sm backdrop-blur-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {activeSection === "home" ? (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome, <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">Incubator Partner</span>!
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">Startup Discovery + Validation + Acceleration System</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">{currentSectionMeta.title}</span>
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">{currentSectionMeta.subtitle}</p>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search across startups, programs, mentors, events"
                  className="w-80 rounded-lg border-slate-300 bg-white pl-10 transition-all focus-visible:border-violet-400 focus-visible:ring-violet-200"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-lg border-slate-300 text-slate-600 transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm" onClick={() => setNotificationsOpen((prev) => !prev)}>
                <Bell className="h-5 w-5" />
              </Button>
              <Button className="gap-2 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md" onClick={() => goToSection("profile")}>
                <BookOpen className="h-4 w-4" />
                Profile
              </Button>
            </div>
            </div>
          </header>

          {notificationsOpen && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-violet-100 bg-gradient-to-r from-white to-violet-50/40 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="rounded-md bg-slate-50 p-2">Two new startup applications are pending review.</li>
                <li className="rounded-md bg-slate-50 p-2">Upcoming demo day requires investor slot confirmation.</li>
                <li className="rounded-md bg-slate-50 p-2">Mentorship request waiting for schedule finalization.</li>
              </ul>
            </motion.div>
          )}

          {activeSection === "home" && (
            <section className="space-y-6">
              <SectionHeader title="Home" subtitle="Overview of incubator performance and ecosystem flow" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
                <CardShell><p className="text-sm text-muted-foreground">Startups Onboarded</p><p className="mt-2 text-3xl font-bold text-slate-900">{metrics.startupsOnboarded}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Active Startups</p><p className="mt-2 text-3xl font-bold text-slate-900">{metrics.activeStartups}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Programs Running</p><p className="mt-2 text-3xl font-bold text-slate-900">{metrics.programsRunning}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Mentors Engaged</p><p className="mt-2 text-3xl font-bold text-slate-900">{metrics.mentorsEngaged}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Upcoming Events</p><p className="mt-2 text-3xl font-bold text-slate-900">{metrics.upcomingEvents}</p></CardShell>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md" onClick={() => goToSection("pipeline")}>Add Startup</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => goToSection("programs")}>Launch Program</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => goToSection("challenges")}>Host Challenge</Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => goToSection("mentorship")}>Schedule Mentorship</Button>
                  </div>
                </CardShell>
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li>New startup applications: {applications.filter((a) => a.status === "Pending").length}</li>
                    <li>Ongoing programs: {programs.length}</li>
                    <li>Upcoming demo days/challenges: {metrics.upcomingEvents}</li>
                  </ul>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "pipeline" && (
            <section className="space-y-5">
              <SectionHeader title="Startup Pipeline" subtitle="Startup applications and profile-based onboarding decisions" />
              <form onSubmit={submitApplication} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Startup name" value={applicationForm.startupName} onChange={(event) => setApplicationForm((prev) => ({ ...prev, startupName: event.target.value }))} />
                  <Input required placeholder="Founder details" value={applicationForm.founder} onChange={(event) => setApplicationForm((prev) => ({ ...prev, founder: event.target.value }))} />
                  <select value={applicationForm.stage} onChange={(event) => setApplicationForm((prev) => ({ ...prev, stage: event.target.value as StartupStage }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Idea">Idea</option>
                    <option value="Validation">Validation</option>
                    <option value="MVP">MVP</option>
                    <option value="Traction">Traction</option>
                  </select>
                  <Input required placeholder="Team members count" value={applicationForm.teamMembers} onChange={(event) => setApplicationForm((prev) => ({ ...prev, teamMembers: event.target.value }))} />
                  <Input required placeholder="Pitch deck filename" value={applicationForm.pitchDeck} onChange={(event) => setApplicationForm((prev) => ({ ...prev, pitchDeck: event.target.value }))} />
                </div>
                <Textarea required className="mt-3" placeholder="Problem and solution summary" value={applicationForm.problemSolution} onChange={(event) => setApplicationForm((prev) => ({ ...prev, problemSolution: event.target.value }))} />
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Add Startup Application</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredApplications.map((app) => (
                  <CardShell key={app.id}>
                    <p className="font-semibold text-slate-900">{app.startupName}</p>
                    <p className="text-sm text-muted-foreground">Founder: {app.founder} • Stage: {app.stage}</p>
                    <p className="mt-2 text-sm text-slate-700">{app.problemSolution}</p>
                    <p className="mt-2 text-xs text-slate-600">Team: {app.teamMembers} • Deck: {app.pitchDeck}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => updateApplicationStatus(app.id, "Shortlisted")}>Shortlist</Button>
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => updateApplicationStatus(app.id, "Accepted")}>Accept</Button>
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => updateApplicationStatus(app.id, "Rejected")}>Reject</Button>
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => updateApplicationStatus(app.id, "Saved")}>Save</Button>
                    </div>
                    <p className="mt-2 text-xs font-medium text-violet-700">Status: {app.status}</p>
                  </CardShell>
                ))}
              </div>
            </section>
          )}

          {activeSection === "programs" && (
            <section className="space-y-5">
              <SectionHeader title="Programs & Incubation" subtitle="Pre-incubation, incubation, acceleration and bootcamp operations" />
              <form onSubmit={submitProgram} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <Input required placeholder="Program name" value={programForm.name} onChange={(event) => setProgramForm((prev) => ({ ...prev, name: event.target.value }))} />
                  <select value={programForm.type} onChange={(event) => setProgramForm((prev) => ({ ...prev, type: event.target.value as ProgramType }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Pre-incubation">Pre-incubation</option>
                    <option value="Incubation">Incubation</option>
                    <option value="Acceleration">Acceleration</option>
                    <option value="Bootcamp">Bootcamp</option>
                  </select>
                  <Input required placeholder="Cohort" value={programForm.cohort} onChange={(event) => setProgramForm((prev) => ({ ...prev, cohort: event.target.value }))} />
                  <Input placeholder="Assign startup" value={programForm.assignedStartup} onChange={(event) => setProgramForm((prev) => ({ ...prev, assignedStartup: event.target.value }))} />
                  <Input type="number" min="0" placeholder="Milestones" value={programForm.milestones} onChange={(event) => setProgramForm((prev) => ({ ...prev, milestones: event.target.value }))} />
                  <Input type="number" min="0" placeholder="Mentor sessions" value={programForm.mentorSessions} onChange={(event) => setProgramForm((prev) => ({ ...prev, mentorSessions: event.target.value }))} />
                  <Input type="number" min="0" placeholder="Deliverables" value={programForm.deliverables} onChange={(event) => setProgramForm((prev) => ({ ...prev, deliverables: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Create Program</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredPrograms.map((program) => (
                  <CardShell key={program.id}>
                    <p className="font-semibold text-slate-900">{program.name}</p>
                    <p className="text-sm text-muted-foreground">{program.type} • {program.cohort}</p>
                    <p className="mt-2 text-sm text-slate-700">Milestones: {program.milestones} • Mentor sessions: {program.mentorSessions} • Deliverables: {program.deliverables}</p>
                    <p className="mt-1 text-xs text-slate-600">Assigned startups: {program.assignedStartups.join(", ") || "None"}</p>
                  </CardShell>
                ))}
                {filteredPrograms.length === 0 && <p className="text-sm text-muted-foreground">No programs match your search.</p>}
              </div>
            </section>
          )}

          {activeSection === "challenges" && (
            <section className="space-y-5">
              <SectionHeader title="Challenges & Hackathons" subtitle="Problem statements, applications, and participant tracking" />
              <form onSubmit={submitChallenge} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Challenge title" value={challengeForm.title} onChange={(event) => setChallengeForm((prev) => ({ ...prev, title: event.target.value }))} />
                  <select value={challengeForm.type} onChange={(event) => setChallengeForm((prev) => ({ ...prev, type: event.target.value as ChallengeType }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Startup Challenge">Startup challenge</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Innovation Drive">Innovation drive</option>
                    <option value="Pitch Competition">Pitch competition</option>
                  </select>
                  <Input required type="date" value={challengeForm.date} onChange={(event) => setChallengeForm((prev) => ({ ...prev, date: event.target.value }))} />
                </div>
                <Textarea required className="mt-3" placeholder="Problem statement" value={challengeForm.statement} onChange={(event) => setChallengeForm((prev) => ({ ...prev, statement: event.target.value }))} />
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Create Challenge</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredChallenges.map((eventItem) => (
                  <CardShell key={eventItem.id}>
                    <p className="font-semibold text-slate-900">{eventItem.title}</p>
                    <p className="text-sm text-muted-foreground">{eventItem.type} • {eventItem.date}</p>
                    <p className="mt-2 text-sm text-slate-700">{eventItem.statement}</p>
                    <p className="mt-2 text-sm text-slate-700">Participants: {eventItem.participants}</p>
                    <Button className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md" onClick={() => bumpChallengeParticipants(eventItem.id)}>Track Participant +1</Button>
                  </CardShell>
                ))}
                {filteredChallenges.length === 0 && <p className="text-sm text-muted-foreground">No challenges match your search.</p>}
              </div>
            </section>
          )}

          {activeSection === "mentorship" && (
            <section className="space-y-5">
              <SectionHeader title="Mentorship" subtitle="Assign mentors and schedule startup guidance sessions" />
              <form onSubmit={submitMentorship} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input required placeholder="Startup name" value={mentorshipForm.startupName} onChange={(event) => setMentorshipForm((prev) => ({ ...prev, startupName: event.target.value }))} />
                  <select required value={mentorshipForm.mentorId} onChange={(event) => setMentorshipForm((prev) => ({ ...prev, mentorId: event.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select mentor</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>{mentor.name} ({mentor.domain})</option>
                    ))}
                  </select>
                  <Input required type="date" value={mentorshipForm.sessionDate} onChange={(event) => setMentorshipForm((prev) => ({ ...prev, sessionDate: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Assign Mentor</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredMentorAssignments.map((assignment) => (
                  <CardShell key={assignment.id}>
                    <p className="font-semibold text-slate-900">{assignment.startupName}</p>
                    <p className="text-sm text-muted-foreground">Mentor: {assignment.mentorName}</p>
                    <p className="text-sm text-slate-700">Session date: {assignment.sessionDate}</p>
                    <p className="mt-2 text-xs font-medium text-violet-700">Status: {assignment.requestStatus}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => setMentorshipStatus(assignment.id, "Requested")}>Requested</Button>
                      <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => setMentorshipStatus(assignment.id, "Scheduled")}>Scheduled</Button>
                    </div>
                  </CardShell>
                ))}
                {filteredMentorAssignments.length === 0 && <p className="text-sm text-muted-foreground">No mentorship assignments match your search.</p>}
              </div>
            </section>
          )}

          {activeSection === "partnerships" && (
            <section className="space-y-5">
              <SectionHeader title="Corporate Partnerships" subtitle="Corporate-startup collaboration use cases and outcomes" />
              <form onSubmit={submitCorporate} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <Input required placeholder="Company name" value={corporateForm.companyName} onChange={(event) => setCorporateForm((prev) => ({ ...prev, companyName: event.target.value }))} />
                  <select value={corporateForm.useCase} onChange={(event) => setCorporateForm((prev) => ({ ...prev, useCase: event.target.value as PartnerUseCase }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Pilot Project">Pilot project</option>
                    <option value="Innovation Testing">Innovation testing</option>
                    <option value="Research Collaboration">Research collaboration</option>
                    <option value="Vendor Partnership">Vendor partnership</option>
                  </select>
                  <Input required placeholder="Startup assigned" value={corporateForm.startupAssigned} onChange={(event) => setCorporateForm((prev) => ({ ...prev, startupAssigned: event.target.value }))} />
                  <Input required placeholder="Outcome" value={corporateForm.outcome} onChange={(event) => setCorporateForm((prev) => ({ ...prev, outcome: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Add Partnership</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredCorporateLinks.map((link) => (
                  <CardShell key={link.id}>
                    <p className="font-semibold text-slate-900">{link.companyName}</p>
                    <p className="text-sm text-muted-foreground">{link.useCase}</p>
                    <p className="mt-2 text-sm text-slate-700">Startup: {link.startupAssigned}</p>
                    <p className="text-sm text-slate-700">Outcome: {link.outcome}</p>
                  </CardShell>
                ))}
                {filteredCorporateLinks.length === 0 && <p className="text-sm text-muted-foreground">No partnership records match your search.</p>}
              </div>
            </section>
          )}

          {activeSection === "investor" && (
            <section className="space-y-5">
              <SectionHeader title="Investor Connect" subtitle="Demo days, pitch events, investor listings, and startup showcase" />
              <form onSubmit={submitInvestor} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Startup name" value={investorForm.startupName} onChange={(event) => setInvestorForm((prev) => ({ ...prev, startupName: event.target.value }))} />
                  <select value={investorForm.eventType} onChange={(event) => setInvestorForm((prev) => ({ ...prev, eventType: event.target.value as InvestorShowcase["eventType"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Demo Day">Demo day</option>
                    <option value="Pitch Event">Pitch event</option>
                    <option value="Startup Showcase">Startup showcase</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">No investment handling in MVP. This section supports exposure and basic tracking only.</p>
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Submit for Investor Event</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredInvestorShowcases.map((item) => (
                  <CardShell key={item.id}>
                    <p className="font-semibold text-slate-900">{item.startupName}</p>
                    <p className="text-sm text-muted-foreground">{item.eventType}</p>
                    <p className="mt-2 text-sm text-slate-700">Status: {item.status}</p>
                    <p className="text-sm text-slate-700">Investor interest: {item.investorInterest}</p>
                    <Button variant="outline" className="mt-3 border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-md" onClick={() => bumpInvestorInterest(item.id)}>Track Interest +1</Button>
                  </CardShell>
                ))}
                {filteredInvestorShowcases.length === 0 && <p className="text-sm text-muted-foreground">No investor showcases match your search.</p>}
              </div>
            </section>
          )}

          {activeSection === "talent" && (
            <section className="space-y-5">
              <SectionHeader title="Talent Access" subtitle="Browse talent and share hiring opportunities with startups" />
              <form onSubmit={submitTalentOpportunity} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <Input required placeholder="Startup name" value={talentForm.startupName} onChange={(event) => setTalentForm((prev) => ({ ...prev, startupName: event.target.value }))} />
                  <Input required placeholder="Role" value={talentForm.role} onChange={(event) => setTalentForm((prev) => ({ ...prev, role: event.target.value }))} />
                  <Input required placeholder="Skills" value={talentForm.skills} onChange={(event) => setTalentForm((prev) => ({ ...prev, skills: event.target.value }))} />
                  <select value={talentForm.type} onChange={(event) => setTalentForm((prev) => ({ ...prev, type: event.target.value as TalentOpportunity["type"] }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <Button type="submit" className="mt-3 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Share Hiring Opportunity</Button>
              </form>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Opportunities Shared</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {filteredTalentOpportunities.map((item) => (
                      <div key={item.id} className="rounded-md bg-slate-50 p-2">
                        {item.startupName} • {item.role} • {item.type}
                      </div>
                    ))}
                    {filteredTalentOpportunities.length === 0 && <p className="text-sm text-muted-foreground">No opportunities match your search.</p>}
                  </div>
                </CardShell>

                <CardShell>
                  <h3 className="text-lg font-semibold text-slate-900">Student Talent Pool</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {filteredStudentTalentPool.map((student) => (
                      <div key={student.id} className="rounded-md border border-slate-200 p-2">
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p>{student.skills}</p>
                        <p className="text-xs text-muted-foreground">{student.college} • {student.experience}</p>
                      </div>
                    ))}
                    {filteredStudentTalentPool.length === 0 && <p className="text-sm text-muted-foreground">No student profiles match your search.</p>}
                  </div>
                </CardShell>
              </div>
            </section>
          )}

          {activeSection === "insights" && (
            <section className="space-y-5">
              <SectionHeader title="Insights & Reports" subtitle="Performance metrics for reporting and internal tracking" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <CardShell><p className="text-sm text-muted-foreground">Startups Onboarded</p><p className="mt-2 text-3xl font-bold">{metrics.startupsOnboarded}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Progressing Stages</p><p className="mt-2 text-3xl font-bold">{metrics.progressingStartups}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Programs Completed</p><p className="mt-2 text-3xl font-bold">{metrics.programsCompleted}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Mentor Engagement</p><p className="mt-2 text-3xl font-bold">{metrics.mentorEngagement}</p></CardShell>
                <CardShell><p className="text-sm text-muted-foreground">Event Participation</p><p className="mt-2 text-3xl font-bold">{metrics.eventParticipation}</p></CardShell>
              </div>
            </section>
          )}

          {activeSection === "profile" && (
            <section className="space-y-5">
              <SectionHeader title="Profile" subtitle="Incubator details and strategic focus configuration" />
              <form onSubmit={saveProfile} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input required placeholder="Incubator Name" value={profile.incubatorName} onChange={(event) => setProfile((prev) => ({ ...prev, incubatorName: event.target.value }))} />
                  <Input required placeholder="Organization Type" value={profile.organizationType} onChange={(event) => setProfile((prev) => ({ ...prev, organizationType: event.target.value }))} />
                  <Input required placeholder="Location" value={profile.location} onChange={(event) => setProfile((prev) => ({ ...prev, location: event.target.value }))} />
                  <Input required placeholder="Website" value={profile.website} onChange={(event) => setProfile((prev) => ({ ...prev, website: event.target.value }))} />
                  <Input required placeholder="Focus Areas (Tech, AI, FinTech...)" value={profile.focusAreas} onChange={(event) => setProfile((prev) => ({ ...prev, focusAreas: event.target.value }))} />
                  <Input placeholder="Portfolio startups (optional future)" value={profile.portfolioStartups} onChange={(event) => setProfile((prev) => ({ ...prev, portfolioStartups: event.target.value }))} />
                  <Input placeholder="Success stories (optional future)" value={profile.successStories} onChange={(event) => setProfile((prev) => ({ ...prev, successStories: event.target.value }))} />
                  <Input placeholder="Funding stats (optional future)" value={profile.fundingStats} onChange={(event) => setProfile((prev) => ({ ...prev, fundingStats: event.target.value }))} />
                </div>
                <Button type="submit" className="mt-4 bg-violet-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-600 hover:shadow-md">Save Profile</Button>
                <p className="mt-3 text-sm text-muted-foreground">{profileSaved ? "Profile saved successfully." : "Save profile to complete incubator information."}</p>
              </form>
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default IncubatorDashboard;
