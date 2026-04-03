import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Code,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  LifeBuoy,
  LogOut,
  Rocket,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

type SectionKey =
  | "home"
  | "hireTalent"
  | "postJobs"
  | "postProjects"
  | "campusEngagement"
  | "eventsHackathons"
  | "applications"
  | "talentPool"
  | "companyProfile";

type Student = {
  id: string;
  name: string;
  college: string;
  domain: string;
  experienceLevel: string;
  graduationYear: string;
  skills: string[];
  resume: string;
  portfolio: string;
};

type Applicant = {
  id: string;
  name: string;
  skills: string;
  resume: string;
  portfolio: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Rejected" | "Hired";
};

type Job = {
  id: string;
  title: string;
  roleType: "Internship" | "Full-Time" | "Part-Time";
  location: string;
  description: string;
  skillsRequired: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  skills: string;
  budget: string;
};

type Program = {
  id: string;
  title: string;
  type: string;
  date: string;
  details: string;
};

type CompanyProfile = {
  companyName: string;
  industry: string;
  location: string;
  website: string;
  about: string;
};

const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Aarav Sharma",
    college: "IIT Delhi",
    domain: "Frontend",
    experienceLevel: "Intermediate",
    graduationYear: "2026",
    skills: ["React", "TypeScript", "Tailwind"],
    resume: "Resume Available",
    portfolio: "Portfolio Available",
  },
  {
    id: "s2",
    name: "Priya Nair",
    college: "NIT Trichy",
    domain: "Data Science",
    experienceLevel: "Beginner",
    graduationYear: "2027",
    skills: ["Python", "SQL", "Pandas"],
    resume: "Resume Available",
    portfolio: "Portfolio Available",
  },
  {
    id: "s3",
    name: "Kabir Mehta",
    college: "BITS Pilani",
    domain: "Backend",
    experienceLevel: "Advanced",
    graduationYear: "2025",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    resume: "Resume Available",
    portfolio: "Portfolio Available",
  },
];

const initialApplicants: Applicant[] = [
  {
    id: "a1",
    name: "Aarav Sharma",
    skills: "React, TypeScript, Tailwind",
    resume: "Attached",
    portfolio: "https://portfolio-aarav.dev",
    status: "Applied",
  },
  {
    id: "a2",
    name: "Priya Nair",
    skills: "Python, SQL, ML Basics",
    resume: "Attached",
    portfolio: "https://portfolio-priya.dev",
    status: "Shortlisted",
  },
];

const StatCard = ({ title, value, helper }: { title: string; value: string | number; helper: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-lg"
  >
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    <p className="mt-1 text-xs text-orange-600">{helper}</p>
  </motion.div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-5">
    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">{title}</span>
    </h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </motion.div>
);

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const [globalSearch, setGlobalSearch] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState<Omit<Job, "id">>({
    title: "",
    roleType: "Internship",
    location: "",
    description: "",
    skillsRequired: "",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    skills: "",
    budget: "",
  });

  const [engagementPrograms, setEngagementPrograms] = useState<Program[]>([]);
  const [engagementForm, setEngagementForm] = useState<Omit<Program, "id">>({
    title: "",
    type: "Workshop",
    date: "",
    details: "",
  });

  const [events, setEvents] = useState<Program[]>([]);
  const [eventForm, setEventForm] = useState<Omit<Program, "id">>({
    title: "",
    type: "Hackathon",
    date: "",
    details: "",
  });

  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);

  const [savedStudentIds, setSavedStudentIds] = useState<string[]>([]);
  const [shortlistedStudentIds, setShortlistedStudentIds] = useState<string[]>([]);
  const [invitedStudentIds, setInvitedStudentIds] = useState<string[]>([]);

  const [hireFilters, setHireFilters] = useState({
    skill: "",
    college: "",
    experienceLevel: "",
    domain: "",
  });

  const [poolFilters, setPoolFilters] = useState({
    skill: "",
    college: "",
    graduationYear: "",
    domain: "",
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: "",
    industry: "",
    location: "",
    website: "",
    about: "",
  });

  const [lastActionMessage, setLastActionMessage] = useState("Ready");

  const filteredHireTalent = useMemo(() => {
    return initialStudents.filter((student) => {
      const matchesSkill = hireFilters.skill
        ? student.skills.join(" ").toLowerCase().includes(hireFilters.skill.toLowerCase())
        : true;
      const matchesCollege = hireFilters.college
        ? student.college.toLowerCase().includes(hireFilters.college.toLowerCase())
        : true;
      const matchesExperience = hireFilters.experienceLevel
        ? student.experienceLevel.toLowerCase().includes(hireFilters.experienceLevel.toLowerCase())
        : true;
      const matchesDomain = hireFilters.domain
        ? student.domain.toLowerCase().includes(hireFilters.domain.toLowerCase())
        : true;
      return matchesSkill && matchesCollege && matchesExperience && matchesDomain;
    });
  }, [hireFilters]);

  const filteredTalentPool = useMemo(() => {
    return initialStudents.filter((student) => {
      const matchesSkill = poolFilters.skill
        ? student.skills.join(" ").toLowerCase().includes(poolFilters.skill.toLowerCase())
        : true;
      const matchesCollege = poolFilters.college
        ? student.college.toLowerCase().includes(poolFilters.college.toLowerCase())
        : true;
      const matchesYear = poolFilters.graduationYear
        ? student.graduationYear.includes(poolFilters.graduationYear)
        : true;
      const matchesDomain = poolFilters.domain
        ? student.domain.toLowerCase().includes(poolFilters.domain.toLowerCase())
        : true;
      return matchesSkill && matchesCollege && matchesYear && matchesDomain;
    });
  }, [poolFilters]);

  const visibleApplicants = useMemo(() => {
    if (!globalSearch.trim()) {
      return applicants;
    }
    const q = globalSearch.toLowerCase();
    return applicants.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.skills.toLowerCase().includes(q) ||
        app.status.toLowerCase().includes(q),
    );
  }, [applicants, globalSearch]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleCreateJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newJob: Job = { id: `job-${Date.now()}`, ...jobForm };
    setJobs((prev) => [newJob, ...prev]);
    setJobForm({ title: "", roleType: "Internship", location: "", description: "", skillsRequired: "" });
    setLastActionMessage("Job posted successfully");
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProject: Project = { id: `project-${Date.now()}`, ...projectForm };
    setProjects((prev) => [newProject, ...prev]);
    setProjectForm({ title: "", description: "", skills: "", budget: "" });
    setLastActionMessage("Project posted successfully");
  };

  const handleCreateEngagement = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProgram: Program = { id: `engage-${Date.now()}`, ...engagementForm };
    setEngagementPrograms((prev) => [newProgram, ...prev]);
    setEngagementForm({ title: "", type: "Workshop", date: "", details: "" });
    setLastActionMessage("Campus engagement program created");
  };

  const handleCreateEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEvent: Program = { id: `event-${Date.now()}`, ...eventForm };
    setEvents((prev) => [newEvent, ...prev]);
    setEventForm({ title: "", type: "Hackathon", date: "", details: "" });
    setLastActionMessage("Event or hackathon created");
  };

  const updateApplicantStatus = (id: string, status: Applicant["status"]) => {
    setApplicants((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    setLastActionMessage(`Applicant moved to ${status}`);
  };

  const toggleSavedStudent = (id: string) => {
    setSavedStudentIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    setLastActionMessage("Talent pool saved list updated");
  };

  const toggleShortlistedStudent = (id: string) => {
    setShortlistedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
    setLastActionMessage("Shortlist updated");
  };

  const toggleInvitedStudent = (id: string) => {
    setInvitedStudentIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    setLastActionMessage("Invite list updated");
  };

  const handleSaveCompanyProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLastActionMessage("Company profile saved");
  };

  const activeJobs = jobs.length;
  const applicationsReceived = applicants.length;
  const internsHired = applicants.filter((app) => app.status === "Hired").length;
  const projectsRunning = projects.length;

  const sectionButtonClass = (key: SectionKey) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
      activeSection === key
        ? "bg-gradient-to-r from-orange-100 via-amber-50 to-rose-50 text-orange-700 shadow-sm"
        : "text-muted-foreground hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/20 to-white">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />

      <aside className="hidden fixed left-0 top-0 h-screen w-[280px] border-r border-slate-200 bg-gradient-to-b from-white to-orange-50/30 lg:flex lg:flex-col">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          <div className="flex h-20 items-center border-b border-slate-200 px-6">
            <Link to="/" className="flex items-center gap-3 font-bold text-lg text-orange-600">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-sm">
                <Building className="h-5 w-5" />
              </span>
              <span>The Student Spot</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto px-4 py-4 text-sm font-medium space-y-1">
            <button type="button" className={sectionButtonClass("home")} onClick={() => setActiveSection("home")}>
              <Home className="h-4 w-4" />
              Home
            </button>

            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Hiring</h3>
            <button
              type="button"
              className={sectionButtonClass("hireTalent")}
              onClick={() => setActiveSection("hireTalent")}
            >
              <Users className="h-4 w-4" />
              Hire Talent
            </button>
            <button
              type="button"
              className={sectionButtonClass("postJobs")}
              onClick={() => setActiveSection("postJobs")}
            >
              <Briefcase className="h-4 w-4" />
              Post Jobs
            </button>
            <button
              type="button"
              className={sectionButtonClass("postProjects")}
              onClick={() => setActiveSection("postProjects")}
            >
              <Code className="h-4 w-4" />
              Post Projects
            </button>

            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Engagement</h3>
            <button
              type="button"
              className={sectionButtonClass("campusEngagement")}
              onClick={() => setActiveSection("campusEngagement")}
            >
              <Handshake className="h-4 w-4" />
              Campus Engagement
            </button>
            <button
              type="button"
              className={sectionButtonClass("eventsHackathons")}
              onClick={() => setActiveSection("eventsHackathons")}
            >
              <Rocket className="h-4 w-4" />
              Events & Hackathons
            </button>

            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Management</h3>
            <button
              type="button"
              className={sectionButtonClass("applications")}
              onClick={() => setActiveSection("applications")}
            >
              <CheckCircle className="h-4 w-4" />
              Applications
            </button>
            <button
              type="button"
              className={sectionButtonClass("talentPool")}
              onClick={() => setActiveSection("talentPool")}
            >
              <Users className="h-4 w-4" />
              Talent Pool
            </button>

            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Account</h3>
            <button
              type="button"
              className={sectionButtonClass("companyProfile")}
              onClick={() => setActiveSection("companyProfile")}
            >
              <Settings className="h-4 w-4" />
              Company Profile
            </button>
            <button type="button" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-orange-50 hover:text-orange-600">
              <LifeBuoy className="h-4 w-4" />
              Support
            </button>
          </nav>

          <div className="mt-auto border-t border-slate-200 p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold">{user.displayName || user.email}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="flex-shrink-0 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Login
              </Button>
            )}
          </div>
        </div>
      </aside>

      <main className="relative z-10 w-full flex-1 bg-gradient-to-br from-white via-orange-50/10 to-slate-50/50 p-4 lg:ml-[280px] lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <header className="rounded-2xl border border-slate-200/90 bg-white/85 p-5 shadow-sm backdrop-blur-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome, <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">{user?.displayName || "Company"}</span>!
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage hiring, campus engagement, and company branding</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder="Search applicants, skills, status"
                  className="w-64 rounded-lg border-slate-300 bg-white pl-10 transition-all focus-visible:border-orange-400 focus-visible:ring-orange-200"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-lg border-slate-300 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600 hover:shadow-sm">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="rounded-xl border border-orange-100 bg-gradient-to-r from-white to-orange-50/50 p-4 text-sm text-muted-foreground shadow-sm"
          >
            Last action: <span className="font-medium text-orange-600">{lastActionMessage}</span>
          </motion.div>

          {activeSection === "home" && (
            <section>
              <SectionHeader title="Home (Hiring Overview)" subtitle="Track key metrics and take quick hiring actions" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Active Jobs" value={activeJobs} helper="Posted and currently open" />
                <StatCard title="Applications Received" value={applicationsReceived} helper="From all openings" />
                <StatCard title="Interns Hired" value={internsHired} helper="Final hired status" />
                <StatCard title="Projects Running" value={projectsRunning} helper="Freelance projects live" />
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => setActiveSection("postJobs")}>Post Job</Button>
                  <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => {
                    setActiveSection("postJobs");
                    setJobForm((prev) => ({ ...prev, roleType: "Internship" }));
                  }}>
                    Post Internship
                  </Button>
                  <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => setActiveSection("postProjects")}>Post Freelance Project</Button>
                </div>
              </div>
            </section>
          )}

          {activeSection === "hireTalent" && (
            <section>
              <SectionHeader title="Hire Talent" subtitle="Filter student profiles and take hiring actions" />

              <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
                <Input
                  placeholder="Skills"
                  value={hireFilters.skill}
                  onChange={(event) => setHireFilters((prev) => ({ ...prev, skill: event.target.value }))}
                />
                <Input
                  placeholder="College"
                  value={hireFilters.college}
                  onChange={(event) => setHireFilters((prev) => ({ ...prev, college: event.target.value }))}
                />
                <Input
                  placeholder="Experience Level"
                  value={hireFilters.experienceLevel}
                  onChange={(event) => setHireFilters((prev) => ({ ...prev, experienceLevel: event.target.value }))}
                />
                <Input
                  placeholder="Domain"
                  value={hireFilters.domain}
                  onChange={(event) => setHireFilters((prev) => ({ ...prev, domain: event.target.value }))}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredHireTalent.map((student) => (
                  <div key={student.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.college} • {student.domain} • {student.experienceLevel}</p>
                    <p className="mt-2 text-sm text-slate-700">Skills: {student.skills.join(", ")}</p>
                    <p className="text-sm text-slate-700">{student.resume} • {student.portfolio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant={invitedStudentIds.includes(student.id) ? "default" : "outline"}
                        className={invitedStudentIds.includes(student.id) ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        onClick={() => toggleInvitedStudent(student.id)}
                      >
                        {invitedStudentIds.includes(student.id) ? "Invited" : "Invite Student"}
                      </Button>
                      <Button
                        variant={shortlistedStudentIds.includes(student.id) ? "default" : "outline"}
                        className={shortlistedStudentIds.includes(student.id) ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        onClick={() => toggleShortlistedStudent(student.id)}
                      >
                        {shortlistedStudentIds.includes(student.id) ? "Shortlisted" : "Shortlist"}
                      </Button>
                      <Button
                        variant={savedStudentIds.includes(student.id) ? "default" : "outline"}
                        className={savedStudentIds.includes(student.id) ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                        onClick={() => toggleSavedStudent(student.id)}
                      >
                        {savedStudentIds.includes(student.id) ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === "postJobs" && (
            <section>
              <SectionHeader title="Post Jobs" subtitle="Create internship, full-time, and part-time openings" />

              <form onSubmit={handleCreateJob} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    required
                    placeholder="Job Title"
                    value={jobForm.title}
                    onChange={(event) => setJobForm((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <select
                    required
                    value={jobForm.roleType}
                    onChange={(event) => setJobForm((prev) => ({ ...prev, roleType: event.target.value as Job["roleType"] }))}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                  <Input
                    required
                    placeholder="Location"
                    value={jobForm.location}
                    onChange={(event) => setJobForm((prev) => ({ ...prev, location: event.target.value }))}
                  />
                  <Input
                    required
                    placeholder="Skills Required"
                    value={jobForm.skillsRequired}
                    onChange={(event) => setJobForm((prev) => ({ ...prev, skillsRequired: event.target.value }))}
                  />
                </div>
                <Textarea
                  required
                  className="mt-3"
                  placeholder="Description"
                  value={jobForm.description}
                  onChange={(event) => setJobForm((prev) => ({ ...prev, description: event.target.value }))}
                />
                <Button type="submit" className="mt-4 bg-orange-500 text-white hover:bg-orange-600">
                  Publish Job
                </Button>
              </form>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.roleType} • {job.location}</p>
                    <p className="mt-2 text-sm text-slate-700">{job.description}</p>
                    <p className="mt-2 text-sm text-orange-600">Skills: {job.skillsRequired}</p>
                  </div>
                ))}
                {jobs.length === 0 && <p className="text-sm text-muted-foreground">No jobs posted yet.</p>}
              </div>
            </section>
          )}

          {activeSection === "postProjects" && (
            <section>
              <SectionHeader title="Post Projects" subtitle="Outsource real tasks to students" />

              <form onSubmit={handleCreateProject} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    required
                    placeholder="Project Title"
                    value={projectForm.title}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <Input
                    placeholder="Budget (optional)"
                    value={projectForm.budget}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, budget: event.target.value }))}
                  />
                  <Input
                    required
                    placeholder="Skills Required"
                    value={projectForm.skills}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, skills: event.target.value }))}
                  />
                </div>
                <Textarea
                  required
                  className="mt-3"
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))}
                />
                <Button type="submit" className="mt-4 bg-orange-500 text-white hover:bg-orange-600">
                  Publish Project
                </Button>
              </form>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {projects.map((project) => (
                  <div key={project.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{project.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{project.description}</p>
                    <p className="mt-2 text-sm text-orange-600">Skills: {project.skills}</p>
                    <p className="text-sm text-muted-foreground">Budget: {project.budget || "Not specified"}</p>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-sm text-muted-foreground">No projects posted yet.</p>}
              </div>
            </section>
          )}

          {activeSection === "campusEngagement" && (
            <section>
              <SectionHeader title="Campus Engagement" subtitle="Plan workshops, guest lectures, and hiring drives" />

              <form onSubmit={handleCreateEngagement} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    required
                    placeholder="Program Title"
                    value={engagementForm.title}
                    onChange={(event) => setEngagementForm((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <select
                    value={engagementForm.type}
                    onChange={(event) => setEngagementForm((prev) => ({ ...prev, type: event.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Workshop</option>
                    <option>Guest Lecture</option>
                    <option>Hiring Drive</option>
                    <option>Hackathon</option>
                  </select>
                  <Input
                    required
                    type="date"
                    value={engagementForm.date}
                    onChange={(event) => setEngagementForm((prev) => ({ ...prev, date: event.target.value }))}
                  />
                </div>
                <Textarea
                  required
                  className="mt-3"
                  placeholder="Program details"
                  value={engagementForm.details}
                  onChange={(event) => setEngagementForm((prev) => ({ ...prev, details: event.target.value }))}
                />
                <Button type="submit" className="mt-4 bg-orange-500 text-white hover:bg-orange-600">
                  Create Campus Program
                </Button>
              </form>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {engagementPrograms.map((program) => (
                  <div key={program.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{program.title}</p>
                    <p className="text-sm text-muted-foreground">{program.type} • {program.date}</p>
                    <p className="mt-2 text-sm text-slate-700">{program.details}</p>
                  </div>
                ))}
                {engagementPrograms.length === 0 && <p className="text-sm text-muted-foreground">No campus programs yet.</p>}
              </div>
            </section>
          )}

          {activeSection === "eventsHackathons" && (
            <section>
              <SectionHeader title="Events & Hackathons" subtitle="Manage corporate innovation programs" />

              <form onSubmit={handleCreateEvent} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    required
                    placeholder="Event Title"
                    value={eventForm.title}
                    onChange={(event) => setEventForm((prev) => ({ ...prev, title: event.target.value }))}
                  />
                  <select
                    value={eventForm.type}
                    onChange={(event) => setEventForm((prev) => ({ ...prev, type: event.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Hackathon</option>
                    <option>Case Competition</option>
                    <option>Startup Challenge</option>
                  </select>
                  <Input
                    required
                    type="date"
                    value={eventForm.date}
                    onChange={(event) => setEventForm((prev) => ({ ...prev, date: event.target.value }))}
                  />
                </div>
                <Textarea
                  required
                  className="mt-3"
                  placeholder="Event details"
                  value={eventForm.details}
                  onChange={(event) => setEventForm((prev) => ({ ...prev, details: event.target.value }))}
                />
                <Button type="submit" className="mt-4 bg-orange-500 text-white hover:bg-orange-600">
                  Create Event
                </Button>
              </form>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {events.map((event) => (
                  <div key={event.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.type} • {event.date}</p>
                    <p className="mt-2 text-sm text-slate-700">{event.details}</p>
                  </div>
                ))}
                {events.length === 0 && <p className="text-sm text-muted-foreground">No events yet.</p>}
              </div>
            </section>
          )}

          {activeSection === "applications" && (
            <section>
              <SectionHeader title="Applications" subtitle="Review applicants and update hiring stages" />
              <div className="grid grid-cols-1 gap-4">
                {visibleApplicants.map((applicant) => (
                  <div key={applicant.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">Skills: {applicant.skills}</p>
                        <p className="text-sm text-slate-700">Resume: {applicant.resume}</p>
                        <a className="text-sm text-orange-600" href={applicant.portfolio} target="_blank" rel="noreferrer">
                          Portfolio
                        </a>
                      </div>
                      <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        {applicant.status}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => updateApplicantStatus(applicant.id, "Shortlisted")}>Shortlist</Button>
                      <Button variant="outline" onClick={() => updateApplicantStatus(applicant.id, "Interview")}>Interview</Button>
                      <Button variant="outline" onClick={() => updateApplicantStatus(applicant.id, "Rejected")}>Reject</Button>
                      <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => updateApplicantStatus(applicant.id, "Hired")}>Hire</Button>
                    </div>
                  </div>
                ))}
                {visibleApplicants.length === 0 && <p className="text-sm text-muted-foreground">No matching applications found.</p>}
              </div>
            </section>
          )}

          {activeSection === "talentPool" && (
            <section>
              <SectionHeader title="Talent Pool" subtitle="Browse all students with advanced filters" />
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
                <Input
                  placeholder="Skill"
                  value={poolFilters.skill}
                  onChange={(event) => setPoolFilters((prev) => ({ ...prev, skill: event.target.value }))}
                />
                <Input
                  placeholder="College"
                  value={poolFilters.college}
                  onChange={(event) => setPoolFilters((prev) => ({ ...prev, college: event.target.value }))}
                />
                <Input
                  placeholder="Graduation Year"
                  value={poolFilters.graduationYear}
                  onChange={(event) => setPoolFilters((prev) => ({ ...prev, graduationYear: event.target.value }))}
                />
                <Input
                  placeholder="Domain"
                  value={poolFilters.domain}
                  onChange={(event) => setPoolFilters((prev) => ({ ...prev, domain: event.target.value }))}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredTalentPool.map((student) => (
                  <div key={student.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.college} • {student.graduationYear}</p>
                    <p className="mt-2 text-sm text-slate-700">Domain: {student.domain}</p>
                    <p className="text-sm text-slate-700">Skills: {student.skills.join(", ")}</p>
                    <Button
                      variant={savedStudentIds.includes(student.id) ? "default" : "outline"}
                      className={`mt-3 ${savedStudentIds.includes(student.id) ? "bg-orange-500 text-white hover:bg-orange-600" : ""}`}
                      onClick={() => toggleSavedStudent(student.id)}
                    >
                      {savedStudentIds.includes(student.id) ? "Saved" : "Save Profile"}
                    </Button>
                  </div>
                ))}
                {filteredTalentPool.length === 0 && <p className="text-sm text-muted-foreground">No students found with these filters.</p>}
              </div>
            </section>
          )}

          {activeSection === "companyProfile" && (
            <section>
              <SectionHeader title="Company Profile" subtitle="Manage your employer branding page" />

              <form onSubmit={handleSaveCompanyProfile} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    required
                    placeholder="Company Name"
                    value={companyProfile.companyName}
                    onChange={(event) => setCompanyProfile((prev) => ({ ...prev, companyName: event.target.value }))}
                  />
                  <Input
                    required
                    placeholder="Industry"
                    value={companyProfile.industry}
                    onChange={(event) => setCompanyProfile((prev) => ({ ...prev, industry: event.target.value }))}
                  />
                  <Input
                    required
                    placeholder="Location"
                    value={companyProfile.location}
                    onChange={(event) => setCompanyProfile((prev) => ({ ...prev, location: event.target.value }))}
                  />
                  <Input
                    required
                    placeholder="Website"
                    value={companyProfile.website}
                    onChange={(event) => setCompanyProfile((prev) => ({ ...prev, website: event.target.value }))}
                  />
                </div>
                <Textarea
                  required
                  className="mt-3"
                  placeholder="About Company"
                  value={companyProfile.about}
                  onChange={(event) => setCompanyProfile((prev) => ({ ...prev, about: event.target.value }))}
                />
                <Button type="submit" className="mt-4 bg-orange-500 text-white hover:bg-orange-600">
                  Save Company Profile
                </Button>
              </form>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">Profile Preview</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{companyProfile.companyName || "Company Name"}</h3>
                <p className="text-sm text-muted-foreground">{companyProfile.industry || "Industry"} • {companyProfile.location || "Location"}</p>
                <p className="mt-2 text-sm text-slate-700">{companyProfile.about || "About company will appear here."}</p>
                <p className="mt-2 text-sm text-orange-600">{companyProfile.website || "Website URL"}</p>
              </div>
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
