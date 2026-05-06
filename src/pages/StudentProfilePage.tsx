import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ArrowLeft,
  Bell,
  Menu,
  X,
  Upload,
  Link as LinkIcon,
  Trash2,
  Plus,
  Edit2,
  Check,
  MapPin,
  Briefcase,
  GraduationCap,
  LogOut,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ProfileData {
  basicInfo: {
    firstName: string;
    lastName: string;
    headline: string;
    college: string;
    location: string;
    profilePhoto: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa: string;
  };
  skills: string[];
  careerInterest: {
    preferredRole: string;
    industry: string;
    goals: string;
  };
  resume: {
    fileName: string;
    uploadedAt: string;
  };
  portfolio: {
    links: Array<{ title: string; url: string }>;
  };
  proofOfWork: {
    projects: Array<{ title: string; description: string; link: string }>;
  };
  certificates: {
    certs: Array<{ title: string; issuer: string; date: string }>;
  };
  impactWork: {
    initiatives: Array<{ title: string; description: string; hours: number }>;
  };
  startupInterest: boolean;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    portfolio: string;
  };
}

const StudentProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    basicInfo: {
      firstName: user?.displayName?.split(" ")[0] || "",
      lastName: user?.displayName?.split(" ")[1] || "",
      headline: "Student | Tech Enthusiast",
      college: "Your College Name",
      location: "City, Country",
      profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
    },
    education: {
      institution: "",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      startYear: "2022",
      endYear: "2026",
      gpa: "3.8",
    },
    skills: ["React", "TypeScript", "Tailwind CSS"],
    careerInterest: {
      preferredRole: "Full Stack Developer",
      industry: "Technology",
      goals: "Build impactful products and lead a team",
    },
    resume: {
      fileName: "Resume.pdf",
      uploadedAt: "2024-01-15",
    },
    portfolio: {
      links: [{ title: "Portfolio Website", url: "https://example.com" }],
    },
    proofOfWork: {
      projects: [
        { title: "Project Name", description: "Brief description", link: "https://example.com" },
      ],
    },
    certificates: {
      certs: [{ title: "AWS Solutions Architect", issuer: "Amazon", date: "2024-01-15" }],
    },
    impactWork: {
      initiatives: [{ title: "Volunteer Initiative", description: "Description", hours: 20 }],
    },
    startupInterest: false,
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    },
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getCompletion = () => {
    const sections = [
      profileData.basicInfo.firstName && profileData.basicInfo.lastName,
      profileData.education.institution,
      profileData.skills.length > 0,
      profileData.careerInterest.preferredRole,
      profileData.socialLinks.linkedin || profileData.portfolio.links.length > 0,
    ];
    return Math.round((sections.filter(Boolean).length / sections.length) * 100);
  };

  const completion = getCompletion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-slate-50">
      {/* Sidebar */}
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
            <button
              onClick={() => navigate("/student-dashboard")}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50 text-left"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
          </nav>
          <div className="mt-auto p-4 border-t">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-yellow-500">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{user.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-yellow-500 flex-shrink-0"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                Login
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 gap-0 p-4 lg:p-8 scroll-smooth">
        {/* Header */}
        <header className="sticky top-0 -mx-4 lg:-mx-8 px-4 lg:px-8 py-4 bg-slate-50 border-b border-slate-200 z-30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/student-dashboard")}
              className="text-slate-600 hover:bg-slate-100 flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="hidden lg:flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-yellow-500" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-slate-800">My Profile</span>
                <span className="text-xs text-muted-foreground">Complete your profile</span>
              </div>
            </div>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetContent side="left" className="w-[320px] p-0 bg-card">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="h-5 w-5 text-yellow-500" />
                    My Profile
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 py-4 space-y-2 overflow-y-auto h-full">
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-left"
                      onClick={() => navigate("/student-dashboard")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  </SheetClose>
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
            <h1 className="text-2xl font-bold text-slate-800 truncate">My Profile</h1>
          </div>
          <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200 hover:bg-slate-100 shrink-0">
            <Bell className="h-5 w-5 text-slate-500" />
          </Button>
        </header>

        {/* Profile Content */}
        <div className="flex-1 space-y-6 pt-4">
          {/* Profile Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img
                src={profileData.basicInfo.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                      {profileData.basicInfo.firstName} {profileData.basicInfo.lastName}
                    </h2>
                    <p className="text-lg text-slate-600">{profileData.basicInfo.headline}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {profileData.basicInfo.college}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.basicInfo.location}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setEditingSection("basicInfo")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Completion */}
          <motion.div
            custom={0}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Profile Completion</h3>
                <Badge className="bg-yellow-100 text-yellow-800">{completion}%</Badge>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Basic info", value: 20 },
                  { label: "Skills", value: 20 },
                  { label: "Resume", value: 20 },
                  { label: "Career track", value: 20 },
                  { label: "Links & interests", value: 20 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{item.label}</span>
                      <span className="text-slate-600">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
              <Progress value={completion} className="h-3 bg-slate-200" />
            </div>
          </motion.div>

          {/* Basic Info Section */}
          <motion.div
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "basicInfo" ? null : "basicInfo")}
              >
                {editingSection === "basicInfo" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "basicInfo" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.basicInfo.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, firstName: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.basicInfo.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, lastName: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    value={profileData.basicInfo.headline}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        basicInfo: { ...profileData.basicInfo, headline: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="college">College</Label>
                    <Input
                      id="college"
                      value={profileData.basicInfo.college}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, college: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.basicInfo.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, location: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-medium text-slate-800">Interested in Startup</p>
                    <p className="text-sm text-muted-foreground">Toggle if you're interested in launching a startup</p>
                  </div>
                  <Switch
                    checked={profileData.startupInterest}
                    onCheckedChange={(checked) =>
                      setProfileData({ ...profileData, startupInterest: checked })
                    }
                  />
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-slate-800">Name:</span> {profileData.basicInfo.firstName} {profileData.basicInfo.lastName}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Headline:</span> {profileData.basicInfo.headline}
                </p>
                <p>
                  <span className="font-medium text-slate-800">College:</span> {profileData.basicInfo.college}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Location:</span> {profileData.basicInfo.location}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Startup Interest:</span>{" "}
                  {profileData.startupInterest ? (
                    <Badge className="ml-2 bg-green-100 text-green-800">Yes</Badge>
                  ) : (
                    <Badge className="ml-2 bg-slate-100 text-slate-800">No</Badge>
                  )}
                </p>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Social Links</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "social" ? null : "social")}
              >
                {editingSection === "social" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "social" ? (
              <div className="space-y-4">
                {Object.entries(profileData.socialLinks).map(([key, value]) => (
                  <div key={key}>
                    <Label htmlFor={key} className="capitalize">
                      {key}
                    </Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, [key]: e.target.value },
                        })
                      }
                      placeholder={`Your ${key} profile URL`}
                      className="mt-1"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                {Object.entries(profileData.socialLinks).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium text-slate-800 capitalize">{key}:</span>{" "}
                    {value ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not added</span>
                    )}
                  </p>
                ))}
              </div>
            )}
          </motion.div>

          {/* Education Section */}
          <motion.div
            custom={3}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Education</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "education" ? null : "education")}
              >
                {editingSection === "education" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "education" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={profileData.education.institution}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        education: { ...profileData.education, institution: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={profileData.education.degree}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: { ...profileData.education, degree: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="field">Field of Study</Label>
                    <Input
                      id="field"
                      value={profileData.education.field}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: { ...profileData.education, field: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startYear">Start Year</Label>
                    <Input
                      id="startYear"
                      type="number"
                      value={profileData.education.startYear}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: { ...profileData.education, startYear: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endYear">End Year</Label>
                    <Input
                      id="endYear"
                      type="number"
                      value={profileData.education.endYear}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: { ...profileData.education, endYear: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={profileData.education.gpa}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          education: { ...profileData.education, gpa: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-slate-800">Institution:</span> {profileData.education.institution || "Not added"}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Degree:</span> {profileData.education.degree}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Field:</span> {profileData.education.field}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Duration:</span> {profileData.education.startYear} -{" "}
                  {profileData.education.endYear}
                </p>
                <p>
                  <span className="font-medium text-slate-800">GPA:</span> {profileData.education.gpa}
                </p>
              </div>
            )}
          </motion.div>

          {/* Skills Section */}
          <motion.div
            custom={4}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Skills</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "skills" ? null : "skills")}
              >
                {editingSection === "skills" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "skills" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-yellow-100 text-yellow-800">
                      {skill}
                      <button
                        onClick={() => {
                          const newSkills = profileData.skills.filter((_, i) => i !== idx);
                          setProfileData({ ...profileData, skills: newSkills });
                        }}
                        className="ml-2 hover:opacity-70"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add a skill" id="newSkill" className="flex-1" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("newSkill") as HTMLInputElement;
                      if (input.value) {
                        setProfileData({ ...profileData, skills: [...profileData.skills, input.value] });
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-slate-100 text-slate-800">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No skills added yet</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Career Interest Section */}
          <motion.div
            custom={5}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Career Interest</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "careerInterest" ? null : "careerInterest")}
              >
                {editingSection === "careerInterest" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "careerInterest" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferredRole">Preferred Role</Label>
                  <Input
                    id="preferredRole"
                    value={profileData.careerInterest.preferredRole}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        careerInterest: { ...profileData.careerInterest, preferredRole: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={profileData.careerInterest.industry}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        careerInterest: { ...profileData.careerInterest, industry: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="goals">Career Goals</Label>
                  <Textarea
                    id="goals"
                    value={profileData.careerInterest.goals}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        careerInterest: { ...profileData.careerInterest, goals: e.target.value },
                      })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-slate-800">Preferred Role:</span> {profileData.careerInterest.preferredRole}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Industry:</span> {profileData.careerInterest.industry}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Goals:</span>
                  <br />
                  {profileData.careerInterest.goals}
                </p>
              </div>
            )}
          </motion.div>

          {/* Resume Upload Section */}
          <motion.div
            custom={6}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Resume</h3>
              <Button variant="ghost" size="sm">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {profileData.resume.fileName ? (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-slate-800">{profileData.resume.fileName}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {profileData.resume.uploadedAt}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-600 font-medium">Upload your resume</p>
                <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX files</p>
                <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
              </div>
            )}
          </motion.div>

          {/* Portfolio Links */}
          <motion.div
            custom={7}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Portfolio Links</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "portfolio" ? null : "portfolio")}
              >
                {editingSection === "portfolio" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "portfolio" ? (
              <div className="space-y-4">
                {profileData.portfolio.links.map((link, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Link title"
                        value={link.title}
                        onChange={(e) => {
                          const newLinks = [...profileData.portfolio.links];
                          newLinks[idx].title = e.target.value;
                          setProfileData({ ...profileData, portfolio: { links: newLinks } });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newLinks = profileData.portfolio.links.filter((_, i) => i !== idx);
                          setProfileData({ ...profileData, portfolio: { links: newLinks } });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...profileData.portfolio.links];
                        newLinks[idx].url = e.target.value;
                        setProfileData({ ...profileData, portfolio: { links: newLinks } });
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileData({
                      ...profileData,
                      portfolio: {
                        links: [...profileData.portfolio.links, { title: "", url: "" }],
                      },
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Portfolio Link
                </Button>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {profileData.portfolio.links.length > 0 ? (
                  profileData.portfolio.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                    >
                      <LinkIcon className="h-4 w-4 text-yellow-600" />
                      <span className="text-blue-600 hover:underline">{link.title}</span>
                    </a>
                  ))
                ) : (
                  <p className="text-muted-foreground">No portfolio links added yet</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Proof of Work */}
          <motion.div
            custom={8}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Proof of Work</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "proofOfWork" ? null : "proofOfWork")}
              >
                {editingSection === "proofOfWork" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "proofOfWork" ? (
              <div className="space-y-4">
                {profileData.proofOfWork.projects.map((project, idx) => (
                  <div key={idx} className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Input
                      placeholder="Project title"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...profileData.proofOfWork.projects];
                        newProjects[idx].title = e.target.value;
                        setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                      }}
                    />
                    <Textarea
                      placeholder="Project description"
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...profileData.proofOfWork.projects];
                        newProjects[idx].description = e.target.value;
                        setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                      }}
                      rows={3}
                    />
                    <Input
                      placeholder="Project link"
                      value={project.link}
                      onChange={(e) => {
                        const newProjects = [...profileData.proofOfWork.projects];
                        newProjects[idx].link = e.target.value;
                        setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newProjects = profileData.proofOfWork.projects.filter((_, i) => i !== idx);
                        setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                      }}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileData({
                      ...profileData,
                      proofOfWork: {
                        projects: [
                          ...profileData.proofOfWork.projects,
                          { title: "", description: "", link: "" },
                        ],
                      },
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.proofOfWork.projects.length > 0 ? (
                  profileData.proofOfWork.projects.map((project, idx) => (
                    <Card key={idx} className="p-4">
                      <p className="font-medium text-slate-800">{project.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">No projects added yet</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Certificates & Achievements */}
          <motion.div
            custom={9}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Certificates & Achievements</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "certificates" ? null : "certificates")}
              >
                {editingSection === "certificates" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "certificates" ? (
              <div className="space-y-4">
                {profileData.certificates.certs.map((cert, idx) => (
                  <div key={idx} className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Input
                      placeholder="Certificate name"
                      value={cert.title}
                      onChange={(e) => {
                        const newCerts = [...profileData.certificates.certs];
                        newCerts[idx].title = e.target.value;
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
                    <Input
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) => {
                        const newCerts = [...profileData.certificates.certs];
                        newCerts[idx].issuer = e.target.value;
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
                    <Input
                      placeholder="Date"
                      type="date"
                      value={cert.date}
                      onChange={(e) => {
                        const newCerts = [...profileData.certificates.certs];
                        newCerts[idx].date = e.target.value;
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newCerts = profileData.certificates.certs.filter((_, i) => i !== idx);
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileData({
                      ...profileData,
                      certificates: {
                        certs: [...profileData.certificates.certs, { title: "", issuer: "", date: "" }],
                      },
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certificate
                </Button>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.certificates.certs.length > 0 ? (
                  profileData.certificates.certs.map((cert, idx) => (
                    <Card key={idx} className="p-4">
                      <p className="font-medium text-slate-800">{cert.title}</p>
                      <p className="text-sm text-slate-600">Issued by {cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">No certificates added yet</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Impact Work */}
          <motion.div
            custom={10}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200 pb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Impact Work (CSR / Volunteering)</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "impact" ? null : "impact")}
              >
                {editingSection === "impact" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "impact" ? (
              <div className="space-y-4">
                {profileData.impactWork.initiatives.map((initiative, idx) => (
                  <div key={idx} className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Input
                      placeholder="Initiative name"
                      value={initiative.title}
                      onChange={(e) => {
                        const newInitiatives = [...profileData.impactWork.initiatives];
                        newInitiatives[idx].title = e.target.value;
                        setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                      }}
                    />
                    <Textarea
                      placeholder="Description"
                      value={initiative.description}
                      onChange={(e) => {
                        const newInitiatives = [...profileData.impactWork.initiatives];
                        newInitiatives[idx].description = e.target.value;
                        setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                      }}
                      rows={3}
                    />
                    <Input
                      placeholder="Hours contributed"
                      type="number"
                      value={initiative.hours}
                      onChange={(e) => {
                        const newInitiatives = [...profileData.impactWork.initiatives];
                        newInitiatives[idx].hours = parseInt(e.target.value) || 0;
                        setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newInitiatives = profileData.impactWork.initiatives.filter((_, i) => i !== idx);
                        setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                      }}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileData({
                      ...profileData,
                      impactWork: {
                        initiatives: [
                          ...profileData.impactWork.initiatives,
                          { title: "", description: "", hours: 0 },
                        ],
                      },
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Initiative
                </Button>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.impactWork.initiatives.length > 0 ? (
                  profileData.impactWork.initiatives.map((initiative, idx) => (
                    <Card key={idx} className="p-4">
                      <p className="font-medium text-slate-800">{initiative.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{initiative.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Hours: {initiative.hours}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">No impact work added yet</p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage;
