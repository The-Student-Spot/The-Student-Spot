import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Link as LinkIcon,
  Trash2,
  Plus,
  Edit2,
  Check,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  FileText,
  Award,
  Code,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  Target,
  Heart,
  TrendingUp,
  CheckCircle,
  Circle,
  Share2,
  Download,
  Code2,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import StudentDashboardNavLayout from "@/components/layout/StudentDashboardNavLayout";

interface ProfileData {
  basicInfo: {
    firstName: string;
    lastName: string;
    headline: string;
    college: string;
    location: string;
    profilePhoto: string;
    gender: "male" | "female" | "other";
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa: string;
  }>;
  skills: string[];
  careerInterest: {
    preferredRole: string;
    industry: string;
    goals: string;
  };
  resume: {
    fileName: string;
    uploadedAt: string;
    fileUrl: string;
  };
  portfolio: {
    links: Array<{ title: string; url: string }>;
  };
  proofOfWork: {
    projects: Array<{ title: string; description: string; link: string; imageUrl?: string }>;
  };
  certificates: {
    certs: Array<{ title: string; issuer: string; date: string; credentialUrl?: string; photoUrl?: string }>;
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
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [photoEditOpen, setPhotoEditOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [skillInputError, setSkillInputError] = useState("");
  const [portfolioLinkError, setPortfolioLinkError] = useState("");
  const [proofOfWorkError, setProofOfWorkError] = useState("");
  const [certificateError, setCertificateError] = useState("");
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [educationFieldErrors, setEducationFieldErrors] = useState<Record<number, string>>({});
  const [profileLoaded, setProfileLoaded] = useState(false);
  const saveTimeoutRef = useRef<number | null>(null);
  const skipNextSaveRef = useRef(false);

  const emptyEducationEntry = {
    institution: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
    gpa: "",
  };

  const getAvatarUrl = (gender: "male" | "female" | "other", seed: string) => {
    // male uses avataaars, female uses a long-hair style, and other uses the older adventurer-neutral style
    const style = gender === "female" ? "lorelei" : gender === "other" ? "adventurer-neutral" : "avataaars";
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
  };

  const [profileData, setProfileData] = useState<ProfileData>({
    basicInfo: {
      firstName: user?.displayName?.split(" ")[0] || "",
      lastName: user?.displayName?.split(" ")[1] || "",
      headline: "Student | Tech Enthusiast",
      college: "Your College Name",
      location: "City, Country",
      profilePhoto: "",
      gender: "male",
    },
    education: [emptyEducationEntry],
    skills: [],
    careerInterest: {
      preferredRole: "Full Stack Developer",
      industry: "Technology",
      goals: "Build impactful products and lead a team",
    },
    resume: {
      fileName: "",
      uploadedAt: "",
      fileUrl: "",
    },
    portfolio: {
      links: [],
    },
    proofOfWork: {
      projects: [],
    },
    certificates: {
      certs: [],
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

  const getSectionCompletion = (filled: boolean[]) =>
    Math.round((filled.filter(Boolean).length / filled.length) * 100);

  const profileCompletionDetails = [
    {
      label: "Basic info",
      value: getSectionCompletion([
        Boolean(profileData.basicInfo.firstName),
        Boolean(profileData.basicInfo.lastName),
        Boolean(profileData.basicInfo.headline),
        Boolean(profileData.basicInfo.college),
        Boolean(profileData.basicInfo.location),
        Boolean(profileData.basicInfo.profilePhoto),
      ]),
    },
    {
      label: "Education",
      value:
        profileData.education.length > 0
          ? Math.round(
              profileData.education.reduce(
                (sum, entry) =>
                  sum +
                  getSectionCompletion([
                    Boolean(entry.institution),
                    Boolean(entry.degree),
                    Boolean(entry.field),
                    Boolean(entry.startYear),
                    Boolean(entry.endYear),
                    Boolean(entry.gpa),
                  ]),
                0
              ) / profileData.education.length
            )
          : 0,
    },
    {
      label: "Skills",
      value: profileData.skills.length > 0 ? 100 : 0,
    },
    {
      label: "Career track",
      value: getSectionCompletion([
        Boolean(profileData.careerInterest.preferredRole),
        Boolean(profileData.careerInterest.industry),
        Boolean(profileData.careerInterest.goals),
      ]),
    },
    {
      label: "Links & interests",
      value: getSectionCompletion([
        Boolean(profileData.socialLinks.linkedin),
        Boolean(profileData.socialLinks.github),
        Boolean(profileData.socialLinks.twitter),
        Boolean(profileData.socialLinks.portfolio),
        profileData.portfolio.links.length > 0,
        profileData.proofOfWork.projects.length > 0,
        profileData.certificates.certs.length > 0,
        profileData.impactWork.initiatives.length > 0,
        profileData.startupInterest,
      ]),
    },
  ];

  const completion = Math.round(
    profileCompletionDetails.reduce((sum, item) => sum + item.value, 0) / profileCompletionDetails.length
  );

  const incompleteSections = profileCompletionDetails
    .filter((item) => item.value < 100)
    .map((item) => item.label);

  const completionRemark =
    incompleteSections.length > 0
      ? `Still left to complete: ${incompleteSections.join(", ")}.`
      : "Profile is fully complete.";

  const skillSuggestions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "UI/UX Design",
    "Figma",
    "Git/GitHub",
    "API Development",
    "Problem Solving",
    "Communication",
  ].filter((skill) => !profileData.skills.some((existingSkill) => existingSkill.toLowerCase() === skill.toLowerCase()));

  const addSkill = (skill: string) => {
    const normalizedSkill = skill.trim();
    if (!normalizedSkill) {
      setSkillInputError("Enter a skill name.");
      return;
    }

    const isSkillName =
      normalizedSkill.length <= 40 &&
      normalizedSkill.split(/\s+/).length <= 4 &&
      /^[A-Za-z0-9][A-Za-z0-9\s+\-#/.&()]*$/.test(normalizedSkill);

    if (!isSkillName) {
      setSkillInputError("Enter only a skill name, not a sentence.");
      return;
    }

    const alreadyAdded = profileData.skills.some(
      (existingSkill) => existingSkill.toLowerCase() === normalizedSkill.toLowerCase()
    );
    if (alreadyAdded) {
      setSkillInputError("That skill is already added.");
      return;
    }

    setSkillInputError("");

    setProfileData({
      ...profileData,
      skills: [...profileData.skills, normalizedSkill],
    });
  };

  const removeSkill = (skillIndex: number) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((_, index) => index !== skillIndex),
    });
  };

  const isEducationEntryComplete = (educationEntry: (typeof emptyEducationEntry)) =>
    Boolean(
      educationEntry.institution.trim() &&
        educationEntry.degree.trim() &&
        educationEntry.field.trim() &&
        educationEntry.startYear.trim() &&
        educationEntry.endYear.trim()
    );

  const addEducationEntry = () => {
    if (profileData.education.length > 0) {
      const lastEducation = profileData.education[profileData.education.length - 1];
      if (!isEducationEntryComplete(lastEducation)) {
        return;
      }
      // Prevent duplicate field of study across entries
      const lastField = lastEducation.field.trim().toLowerCase();
      if (lastField) {
        const duplicate = profileData.education
          .slice(0, profileData.education.length - 1)
          .some((e) => e.field.trim().toLowerCase() === lastField);
        if (duplicate) {
          setEducationFieldErrors({ [profileData.education.length - 1]: "This field of study already exists." });
          return;
        }
      }
    }

    setProfileData({
      ...profileData,
      education: [...profileData.education, { ...emptyEducationEntry }],
    });
  };

  const addProofOfWorkProject = () => {
    const lastProject = profileData.proofOfWork.projects[profileData.proofOfWork.projects.length - 1];
    if (lastProject && (!lastProject.title.trim() || !lastProject.description.trim() || !lastProject.link.trim())) {
      setProofOfWorkError("Fill the current project before adding another.");
      return;
    }

    setProofOfWorkError("");
    setProfileData({
      ...profileData,
      proofOfWork: {
        projects: [...profileData.proofOfWork.projects, { title: "", description: "", link: "", imageUrl: "" }],
      },
    });
  };

  const addCertificate = () => {
    const lastCertificate = profileData.certificates.certs[profileData.certificates.certs.length - 1];
    if (lastCertificate && (!lastCertificate.title.trim() || !lastCertificate.issuer.trim() || !lastCertificate.date.trim())) {
      setCertificateError("Fill the current certificate before adding another.");
      return;
    }

    setCertificateError("");
    setProfileData({
      ...profileData,
      certificates: {
        certs: [...profileData.certificates.certs, { title: "", issuer: "", date: "", credentialUrl: "", photoUrl: "" }],
      },
    });
  };

  const getIncompleteFields = (label: string) => {
    switch (label) {
      case "Basic info": {
        const missing: string[] = [];
        if (!profileData.basicInfo.firstName) missing.push("First name");
        if (!profileData.basicInfo.lastName) missing.push("Last name");
        if (!profileData.basicInfo.headline) missing.push("Headline");
        if (!profileData.basicInfo.college) missing.push("College");
        if (!profileData.basicInfo.location) missing.push("Location");
        if (!profileData.basicInfo.profilePhoto) missing.push("Profile photo");
        return missing;
      }
      case "Education": {
        if (profileData.education.length === 0) return ["No education added"];
        const list: string[] = [];
        profileData.education.forEach((entry, i) => {
          const missing: string[] = [];
          if (!entry.institution.trim()) missing.push("Institution");
          if (!entry.degree.trim()) missing.push("Degree");
          if (!entry.field.trim()) missing.push("Field of study");
          if (!entry.startYear.trim()) missing.push("Start year");
          if (!entry.endYear.trim()) missing.push("End year");
          if (!entry.gpa.trim()) missing.push("GPA");
          if (missing.length) list.push(`Education ${i + 1}: ${missing.join(", ")}`);
        });
        return list.length ? list : ["All education entries complete"];
      }
      case "Skills":
        return profileData.skills.length === 0 ? ["No skills added"] : [];
      case "Career track": {
        const missing: string[] = [];
        if (!profileData.careerInterest.preferredRole) missing.push("Preferred role");
        if (!profileData.careerInterest.industry) missing.push("Industry");
        if (!profileData.careerInterest.goals) missing.push("Goals");
        return missing;
      }
      case "Links & interests": {
        const missing: string[] = [];
        if (!profileData.socialLinks.linkedin) missing.push("LinkedIn");
        if (!profileData.socialLinks.github) missing.push("GitHub");
        if (!profileData.socialLinks.twitter) missing.push("Twitter");
        if (!profileData.socialLinks.portfolio) missing.push("Portfolio link");
        if (profileData.portfolio.links.length === 0) missing.push("Portfolio items");
        if (profileData.proofOfWork.projects.length === 0) missing.push("Projects");
        if (profileData.certificates.certs.length === 0) missing.push("Certificates");
        if (profileData.impactWork.initiatives.length === 0) missing.push("Impact work");
        if (!profileData.startupInterest) missing.push("Startup interest toggle");
        return missing;
      }
      default:
        return [];
    }
  };

  const normalizeUrl = (url: string) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return "";
    return /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
  };

  const addPortfolioLink = () => {
    const lastLink = profileData.portfolio.links[profileData.portfolio.links.length - 1];
    if (lastLink && (!lastLink.title.trim() || !lastLink.url.trim())) {
      setPortfolioLinkError("Fill the current portfolio link before adding another.");
      return;
    }

    setPortfolioLinkError("");
    setProfileData({
      ...profileData,
      portfolio: {
        links: [...profileData.portfolio.links, { title: "", url: "" }],
      },
    });
  };

  const updateResumeFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({
        ...profileData,
        resume: {
          fileName: file.name,
          uploadedAt: new Date().toISOString().split("T")[0],
          fileUrl: reader.result as string,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) {
        return;
      }

      try {
        setProfileLoaded(false);
        skipNextSaveRef.current = true;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const savedProfile = userSnap.data()?.studentProfile;

        if (savedProfile) {
          setProfileData((currentProfile) => ({
            ...currentProfile,
            ...savedProfile,
            basicInfo: { ...currentProfile.basicInfo, ...savedProfile.basicInfo },
            careerInterest: { ...currentProfile.careerInterest, ...savedProfile.careerInterest },
            resume: { ...currentProfile.resume, ...savedProfile.resume },
            portfolio: { links: savedProfile.portfolio?.links ?? currentProfile.portfolio.links },
            proofOfWork: { projects: savedProfile.proofOfWork?.projects ?? currentProfile.proofOfWork.projects },
            certificates: { certs: savedProfile.certificates?.certs ?? currentProfile.certificates.certs },
            impactWork: { initiatives: savedProfile.impactWork?.initiatives ?? currentProfile.impactWork.initiatives },
            socialLinks: { ...currentProfile.socialLinks, ...savedProfile.socialLinks },
            education: savedProfile.education ?? currentProfile.education,
            skills: savedProfile.skills ?? currentProfile.skills,
            startupInterest:
              typeof savedProfile.startupInterest === "boolean"
                ? savedProfile.startupInterest
                : currentProfile.startupInterest,
          }));
        }
      } catch (error) {
        console.error("Failed to load student profile:", error);
      } finally {
        setProfileLoaded(true);
      }
    };

    loadProfile();
  }, [user?.uid]);

  useEffect(() => {
    if (!profileLoaded || !user?.uid) {
      return;
    }

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(async () => {
      try {
        setIsSaving(true);
        await setDoc(
          doc(db, "users", user.uid),
          {
            studentProfile: profileData,
            studentProfileUpdatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Failed to save student profile:", error);
      } finally {
        setIsSaving(false);
      }
    }, 700);

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [profileData, profileLoaded, user?.uid]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const profileCompletion = Math.min(100, Math.round(
    (profileData.basicInfo.firstName && profileData.basicInfo.lastName ? 20 : 0) +
    (profileData.basicInfo.headline ? 10 : 0) +
    (profileData.skills.length > 0 ? 15 : 0) +
    (profileData.certificates.certs.length > 0 ? 15 : 0) +
    (profileData.proofOfWork.projects.length > 0 ? 15 : 0) +
    (profileData.education.length > 0 ? 10 : 0) +
    (profileData.impactWork.initiatives.length > 0 ? 15 : 0)
  ));

  return (
    <StudentDashboardNavLayout activeSection="profile" headerTitle="My Profile">
      {/* Profile Content */}
      <div className="flex-1 space-y-8 pb-12">
        {/* Premium Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 p-8 lg:p-10 shadow-2xl border border-orange-400/20"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-red-400 opacity-20 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              {/* Left: Avatar & Basic Info */}
              <div className="flex flex-col items-center lg:items-start gap-4 lg:flex-shrink-0">
                <div className="relative w-fit">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 blur-lg opacity-50" />
                  <img
                    src={profileData.basicInfo.profilePhoto || getAvatarUrl(profileData.basicInfo.gender, user?.email || "default")}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                  <button
                    onClick={() => setPhotoEditOpen(true)}
                    className="absolute bottom-2 right-2 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full p-3 shadow-lg transition-all border-2 border-white"
                    title="Edit profile photo"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-center lg:text-left text-white">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <h2 className="text-3xl lg:text-4xl font-black">
                      {profileData.basicInfo.firstName} {profileData.basicInfo.lastName}
                    </h2>
                    <Badge className="bg-yellow-400 text-yellow-900 font-semibold px-3 py-1">
                      ✓ Verified
                    </Badge>
                  </div>
                  <p className="text-lg text-orange-50 font-semibold mb-3">{profileData.basicInfo.headline}</p>
                  <div className="flex flex-col gap-2 text-sm text-orange-100">
                    {profileData.basicInfo.college && (
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <GraduationCap className="h-4 w-4" />
                        {profileData.basicInfo.college}
                      </div>
                    )}
                    {profileData.basicInfo.location && (
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <MapPin className="h-4 w-4" />
                        {profileData.basicInfo.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Center: Stats */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-2 gap-3 w-full lg:w-auto">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <p className="text-xs font-semibold text-orange-100 uppercase">Profile</p>
                  <p className="text-2xl font-black mt-1">{profileCompletion}%</p>
                  <p className="text-xs text-orange-100 mt-1">Complete</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <p className="text-xs font-semibold text-orange-100 uppercase">Skills</p>
                  <p className="text-2xl font-black mt-1">{profileData.skills.length}</p>
                  <p className="text-xs text-orange-100 mt-1">Added</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <p className="text-xs font-semibold text-orange-100 uppercase">Certificates</p>
                  <p className="text-2xl font-black mt-1">{profileData.certificates.certs.length}</p>
                  <p className="text-xs text-orange-100 mt-1">Earned</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.25 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <p className="text-xs font-semibold text-orange-100 uppercase">Projects</p>
                  <p className="text-2xl font-black mt-1">{profileData.proofOfWork.projects.length}</p>
                  <p className="text-xs text-orange-100 mt-1">Showcased</p>
                </motion.div>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-shrink-0">
                <Button
                  onClick={() => {
                    setEditingSection("basicInfo");
                    setTimeout(() => {
                      document.querySelector('[data-section="basicInfo"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 0);
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-orange-900 font-bold rounded-xl px-6 py-3 w-full lg:w-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold rounded-xl px-6 py-3 w-full lg:w-auto backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Photo Edit Modal */}
          <Dialog open={photoEditOpen} onOpenChange={setPhotoEditOpen}>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader className="flex items-center justify-between pr-0">
                  <DialogTitle className="text-2xl font-bold">Edit Profile Photo</DialogTitle>
                </DialogHeader>

              <div className="space-y-6">
                {/* Photo Preview and Upload */}
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-400 blur-lg opacity-50" />
                      <img
                        src={profileData.basicInfo.profilePhoto || getAvatarUrl(profileData.basicInfo.gender, user?.email || "default")}
                        alt="Profile Preview"
                        className="relative w-40 h-40 rounded-full border-4 border-orange-200 object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="photoUpload" className="text-base font-bold text-slate-900">Upload New Photo</Label>
                    <input
                      ref={photoInputRef}
                      id="photoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfileData({
                              ...profileData,
                              basicInfo: { ...profileData.basicInfo, profilePhoto: reader.result as string },
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => photoInputRef.current?.click()}
                        className="flex items-center gap-2 rounded-lg"
                      >
                        <Upload className="h-4 w-4" />
                        Choose file
                      </Button>
                      {profileData.basicInfo.profilePhoto ? (
                        <span className="text-sm text-green-600 font-medium">✓ Photo selected</span>
                      ) : (
                        <span className="text-sm text-slate-500">No file selected</span>
                      )}
                    </div>
                  </div>
                  {profileData.basicInfo.profilePhoto && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, profilePhoto: "" },
                        })
                      }
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>

                {/* Gender Selection */}
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <Label className="text-base font-bold text-slate-900">Select Gender</Label>
                  <div className="flex gap-3 w-full">
                    <Button
                      type="button"
                      variant={profileData.basicInfo.gender === "male" ? "default" : "outline"}
                      onClick={() =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, gender: "male" },
                        })
                      }
                      className={`flex-1 rounded-lg ${profileData.basicInfo.gender === "male" ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white" : ""}`}
                    >
                      Male
                    </Button>
                    <Button
                      type="button"
                      variant={profileData.basicInfo.gender === "female" ? "default" : "outline"}
                      onClick={() =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, gender: "female" },
                        })
                      }
                      className={`flex-1 rounded-lg ${profileData.basicInfo.gender === "female" ? "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white" : ""}`}
                    >
                      Female
                    </Button>
                    <Button
                      type="button"
                      variant={profileData.basicInfo.gender === "other" ? "default" : "outline"}
                      onClick={() =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, gender: "other" },
                        })
                      }
                      className={`flex-1 rounded-lg ${profileData.basicInfo.gender === "other" ? "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white" : ""}`}
                    >
                      Other
                    </Button>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={() => setPhotoEditOpen(false)}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-lg mt-6"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Profile Completion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              {/* Circular Progress */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    {/* Progress circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - profileCompletion / 100) }}
                      transition={{ duration: 1, delay: 0.3 }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="text-4xl font-black text-slate-900">
                      {profileCompletion}%
                    </motion.p>
                    <p className="text-sm font-semibold text-slate-600">Complete</p>
                  </div>
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Profile Checklist</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">Basic Information</span>
                      <span className="text-slate-600 font-semibold">{profileData.basicInfo.firstName && profileData.basicInfo.lastName ? "100" : "0"}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: profileData.basicInfo.firstName && profileData.basicInfo.lastName ? "100%" : "0%" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">Career Track</span>
                      <span className="text-slate-600 font-semibold">{profileData.careerInterest.preferredRole ? "100" : "0"}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: profileData.careerInterest.preferredRole ? "100%" : "0%" }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">Education</span>
                      <span className="text-slate-600 font-semibold">{profileData.education.length > 0 ? "100" : "0"}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: profileData.education.length > 0 ? "100%" : "0%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">Skills & Expertise</span>
                      <span className="text-slate-600 font-semibold">{profileData.skills.length > 0 ? "100" : "0"}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: profileData.skills.length > 0 ? "100%" : "0%" }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">Work & Portfolio</span>
                      <span className="text-slate-600 font-semibold">{profileData.proofOfWork.projects.length > 0 || profileData.portfolio.links.length > 0 ? "100" : "0"}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: profileData.proofOfWork.projects.length > 0 || profileData.portfolio.links.length > 0 ? "100%" : "0%" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                  <p className="text-sm font-semibold text-slate-900">💡 Tip: Complete your profile to unlock better opportunities and visibility from mentors and recruiters.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Basic Info Section */}
          <motion.div
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
            data-section="basicInfo"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Basic Information</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "basicInfo" ? null : "basicInfo")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "basicInfo" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "basicInfo" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-semibold text-slate-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.basicInfo.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, firstName: e.target.value },
                        })
                      }
                      className="rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-semibold text-slate-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.basicInfo.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, lastName: e.target.value },
                        })
                      }
                      className="rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headline" className="font-semibold text-slate-700">Headline / Title</Label>
                  <Input
                    id="headline"
                    value={profileData.basicInfo.headline}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        basicInfo: { ...profileData.basicInfo, headline: e.target.value },
                      })
                    }
                    className="rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., CS Student @ Stanford | AI Enthusiast"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college" className="font-semibold text-slate-700">College / University</Label>
                    <Input
                      id="college"
                      value={profileData.basicInfo.college}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, college: e.target.value },
                        })
                      }
                      className="rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Your college"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-semibold text-slate-700">Location</Label>
                    <Input
                      id="location"
                      value={profileData.basicInfo.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          basicInfo: { ...profileData.basicInfo, location: e.target.value },
                        })
                      }
                      className="rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 p-4 border border-orange-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">🚀 Interested in Startups?</p>
                      <p className="text-sm text-slate-600">Let recruiters know you're open to startup opportunities</p>
                    </div>
                    <Switch
                      checked={profileData.startupInterest}
                      onCheckedChange={(checked) =>
                        setProfileData({ ...profileData, startupInterest: checked })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg mt-6"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "✓ Save Changes"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Name</p>
                    <p className="text-lg font-bold text-slate-900">{profileData.basicInfo.firstName} {profileData.basicInfo.lastName || "(incomplete)"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Headline</p>
                    <p className="text-lg font-semibold text-slate-800">{profileData.basicInfo.headline || "Add a headline"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1 flex items-center gap-1"><GraduationCap className="h-3 w-3" /> College</p>
                    <p className="text-base font-semibold text-slate-800">{profileData.basicInfo.college || "Add college"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</p>
                    <p className="text-base font-semibold text-slate-800">{profileData.basicInfo.location || "Add location"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Startup Interest</p>
                      <p className="text-sm text-slate-600">Open to startup opportunities</p>
                    </div>
                  </div>
                  <Badge className={profileData.startupInterest ? "bg-green-100 text-green-800 font-semibold px-3 py-1" : "bg-slate-100 text-slate-800 font-semibold px-3 py-1"}>
                    {profileData.startupInterest ? "✓ Yes" : "No"}
                  </Badge>
                </div>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Social Profiles</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "social" ? null : "social")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "social" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "social" ? (
              <div className="space-y-4">
                {Object.entries(profileData.socialLinks).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="font-semibold text-slate-700 capitalize flex items-center gap-2">
                      {key === "linkedin" && <Linkedin className="h-4 w-4" />}
                      {key === "github" && <Github className="h-4 w-4" />}
                      {key !== "linkedin" && key !== "github" && <ExternalLink className="h-4 w-4" />}
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
                      className="rounded-lg border-slate-200 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(profileData.socialLinks).map(([key, value]) => (
                  <div key={key}>
                    {value ? (
                      <a
                        href={normalizeUrl(value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          {key === "linkedin" && <Linkedin className="h-5 w-5 text-orange-600" />}
                          {key === "github" && <Github className="h-5 w-5 text-slate-900" />}
                          {key !== "linkedin" && key !== "github" && <ExternalLink className="h-5 w-5 text-rose-600" />}
                          <div>
                            <p className="font-semibold text-slate-900 capitalize">{key}</p>
                            <p className="text-sm text-slate-600 group-hover:text-rose-600 transition-colors">Visit profile →</p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
                      </a>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center">
                        <p className="text-sm text-slate-600 capitalize font-medium">{key} - Not added</p>
                      </div>
                    )}
                  </div>
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Education</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addEducationEntry}
                  className="rounded-lg hover:bg-slate-100 text-emerald-600"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingSection(editingSection === "education" ? null : "education")}
                  className="rounded-lg hover:bg-slate-100"
                >
                  {editingSection === "education" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {editingSection === "education" ? (
              <div className="space-y-4">
                {profileData.education.map((educationEntry, index) => (
                  <div key={index} className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                        <p className="font-bold text-slate-900">Education {index + 1}</p>
                      </div>
                      {profileData.education.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          onClick={() =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.filter((_, itemIndex) => itemIndex !== index),
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`} className="font-semibold text-slate-700">University / College</Label>
                      <Input
                        id={`institution-${index}`}
                        value={educationEntry.institution}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            education: profileData.education.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, institution: e.target.value } : item
                            ),
                          })
                        }
                        className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g., Stanford University"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`} className="font-semibold text-slate-700">Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={educationEntry.degree}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, degree: e.target.value } : item
                              ),
                            })
                          }
                          className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${index}`} className="font-semibold text-slate-700">Field of Study</Label>
                        <Input
                          id={`field-${index}`}
                          value={educationEntry.field}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, field: e.target.value } : item
                              ),
                            })
                          }
                          className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="e.g., Computer Science"
                        />
                        {educationFieldErrors[index] && (
                          <p className="text-sm text-red-600 mt-1">{educationFieldErrors[index]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startYear-${index}`} className="font-semibold text-slate-700">Start Year</Label>
                        <Input
                          id={`startYear-${index}`}
                          type="number"
                          value={educationEntry.startYear}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, startYear: e.target.value } : item
                              ),
                            })
                          }
                          className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endYear-${index}`} className="font-semibold text-slate-700">End Year</Label>
                        <Input
                          id={`endYear-${index}`}
                          type="number"
                          value={educationEntry.endYear}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, endYear: e.target.value } : item
                              ),
                            })
                          }
                          className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${index}`} className="font-semibold text-slate-700">GPA</Label>
                        <Input
                          id={`gpa-${index}`}
                          value={educationEntry.gpa}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, gpa: e.target.value } : item
                              ),
                            })
                          }
                          className="rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.education.length > 0 ? (
                  profileData.education.map((educationEntry, index) => (
                    <div key={index} className="group rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 hover:shadow-md hover:border-emerald-300 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-slate-900 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-emerald-600" />
                            {educationEntry.institution || "(Incomplete)"}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {educationEntry.degree} {educationEntry.field ? `in ${educationEntry.field}` : ""}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {(educationEntry.startYear || educationEntry.endYear) && (
                            <Badge className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1">
                              {educationEntry.startYear || "?"} - {educationEntry.endYear || "?"}
                            </Badge>
                          )}
                          {educationEntry.gpa && (
                            <Badge className="bg-amber-100 text-amber-800 font-semibold px-3 py-1">
                              GPA {educationEntry.gpa}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No education added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Add your educational background to strengthen your profile</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Skills Section */}
          <motion.div
            custom={4}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Skills & Expertise</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "skills" ? null : "skills")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "skills" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "skills" ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="font-semibold text-slate-800">Your Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.length > 0 ? (
                      profileData.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 font-semibold px-3 py-2 rounded-full hover:shadow-md transition-shadow cursor-pointer" onClick={() => removeSkill(idx)}>
                          {skill}
                          <button type="button" className="ml-2 text-lg hover:text-amber-950">×</button>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No skills added yet</p>
                    )}
                  </div>
                </div>
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-800">Add New Skill</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., React, Python, Product Management"
                      value={newSkillInput}
                      onChange={(e) => {
                        setNewSkillInput(e.target.value);
                        if (skillInputError) setSkillInputError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill(newSkillInput);
                          setNewSkillInput("");
                        }
                      }}
                      className="flex-1 rounded-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        addSkill(newSkillInput);
                        setNewSkillInput("");
                      }}
                      className="rounded-lg border-amber-200 hover:bg-amber-50 text-amber-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {skillInputError && <p className="text-sm text-red-600 font-medium">{skillInputError}</p>}
                </div>
                {skillSuggestions.length > 0 && (
                  <div className="space-y-3 border-t border-slate-200 pt-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                    <p className="font-semibold text-slate-800">💡 Suggested Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="rounded-full border-2 border-dashed border-amber-300 bg-white px-3 py-1 text-sm font-semibold text-amber-700 transition-all hover:bg-amber-50 hover:border-amber-400 hover:shadow-sm"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, idx) => (
                      <Badge key={idx} className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                        ✓ {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <Zap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No skills added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Add your technical and soft skills to showcase your expertise</p>
                  </div>
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Career Interests</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "careerInterest" ? null : "careerInterest")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "careerInterest" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "careerInterest" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredRole" className="font-semibold text-slate-700">Preferred Role</Label>
                  <Input
                    id="preferredRole"
                    value={profileData.careerInterest.preferredRole}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        careerInterest: { ...profileData.careerInterest, preferredRole: e.target.value },
                      })
                    }
                    className="rounded-lg border-slate-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="e.g., Product Manager, Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-semibold text-slate-700">Industry Interest</Label>
                  <Input
                    id="industry"
                    value={profileData.careerInterest.industry}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        careerInterest: { ...profileData.careerInterest, industry: e.target.value },
                      })
                    }
                    className="rounded-lg border-slate-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="e.g., Fintech, Healthcare, SaaS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals" className="font-semibold text-slate-700">Career Goals</Label>
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
                    className="rounded-lg border-slate-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Share your career aspirations and what you're looking to achieve..."
                  />
                </div>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-1 flex items-center gap-2"><Briefcase className="h-4 w-4 text-red-600" /> Preferred Role</p>
                  <p className="text-lg font-semibold text-slate-900">{profileData.careerInterest.preferredRole || "Not specified"}</p>
                </div>
                <div className="rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-1 flex items-center gap-2"><Building2 className="h-4 w-4 text-red-600" /> Industry</p>
                  <p className="text-lg font-semibold text-slate-900">{profileData.careerInterest.industry || "Not specified"}</p>
                </div>
                {profileData.careerInterest.goals && (
                  <div className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-4">
                    <p className="text-xs font-semibold text-red-700 uppercase mb-2 flex items-center gap-2"><Heart className="h-4 w-4" /> Career Goals</p>
                    <p className="text-slate-800 leading-relaxed">{profileData.careerInterest.goals}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Resume Upload Section */}
          <motion.div
            custom={6}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-white">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Resume</h3>
              </div>
            </div>
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateResumeFromFile(file);
                }
                e.target.value = "";
              }}
            />
            {profileData.resume.fileName ? (
              <div className="rounded-xl p-5 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{profileData.resume.fileName}</p>
                    <p className="text-xs text-slate-600">Uploaded {profileData.resume.uploadedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {profileData.resume.fileUrl && (
                    <Button variant="outline" size="sm" asChild className="rounded-lg border-slate-300 hover:bg-slate-100">
                      <a href={profileData.resume.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        View
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => resumeInputRef.current?.click()} className="rounded-lg border-slate-300 hover:bg-slate-100">
                    <Upload className="h-4 w-4 mr-1" />
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-3 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => resumeInputRef.current?.click()}>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-500" />
                  </div>
                </div>
                <p className="text-slate-900 font-bold text-lg">Upload Your Resume</p>
                <p className="text-sm text-slate-600 mt-1">PDF, DOC, or DOCX formats supported</p>
                <Button onClick={() => resumeInputRef.current?.click()} className="mt-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white">
                  <LinkIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Portfolio Links</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "portfolio" ? null : "portfolio")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "portfolio" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "portfolio" ? (
              <div className="space-y-4">
                {profileData.portfolio.links.map((link, idx) => (
                  <div key={idx} className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Link title (e.g., GitHub Portfolio)"
                        value={link.title}
                        onChange={(e) => {
                          const newLinks = [...profileData.portfolio.links];
                          newLinks[idx].title = e.target.value;
                          setPortfolioLinkError("");
                          setProfileData({ ...profileData, portfolio: { links: newLinks } });
                        }}
                        className="flex-1 rounded-lg border-red-200 focus:border-red-500 focus:ring-red-500"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newLinks = profileData.portfolio.links.filter((_, i) => i !== idx);
                          setProfileData({ ...profileData, portfolio: { links: newLinks } });
                        }}
                        className="rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="https://github.com/yourprofile"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...profileData.portfolio.links];
                        newLinks[idx].url = e.target.value;
                        setPortfolioLinkError("");
                        setProfileData({ ...profileData, portfolio: { links: newLinks } });
                      }}
                      className="rounded-lg border-red-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addPortfolioLink}
                  className="w-full rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Portfolio Link
                </Button>
                {portfolioLinkError && <p className="text-sm text-red-600 font-medium">{portfolioLinkError}</p>}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.portfolio.links.length > 0 ? (
                  profileData.portfolio.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={normalizeUrl(link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 hover:shadow-md hover:border-red-300 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                          <ExternalLink className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">{link.title}</p>
                          <p className="text-xs text-slate-600">Visit →</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                    </a>
                  ))
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <LinkIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No portfolio links added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Share your projects, GitHub, personal website, or other portfolio links</p>
                  </div>
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Proof of Work</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "proofOfWork" ? null : "proofOfWork")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "proofOfWork" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "proofOfWork" ? (
              <div className="space-y-5">
                {profileData.proofOfWork.projects.map((project, idx) => (
                  <div key={idx} className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                      <p className="font-bold text-slate-900">Project {idx + 1}</p>
                      {profileData.proofOfWork.projects.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          onClick={() => {
                            const newProjects = profileData.proofOfWork.projects.filter((_, i) => i !== idx);
                            setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label className="font-semibold text-slate-700">Project Screenshot</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-green-300">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title || "Project screenshot"} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-xs text-slate-500 font-medium">No image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            id={`projectImage-${idx}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const newProjects = [...profileData.proofOfWork.projects];
                                newProjects[idx].imageUrl = reader.result as string;
                                setProofOfWorkError("");
                                setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                              };
                              reader.readAsDataURL(file);
                              e.target.value = "";
                            }}
                          />
                          <label htmlFor={`projectImage-${idx}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-green-300 text-sm font-semibold text-green-700 cursor-pointer hover:bg-green-50 transition-colors">
                            <Upload className="h-4 w-4" />
                            Upload
                          </label>
                          <p className="text-xs text-slate-600 mt-2">PNG/JPEG · 16:9 · Up to 5MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectTitle-${idx}`} className="font-semibold text-slate-700">Project Title</Label>
                      <Input
                        id={`projectTitle-${idx}`}
                        placeholder="e.g., E-commerce Platform"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...profileData.proofOfWork.projects];
                          newProjects[idx].title = e.target.value;
                          setProofOfWorkError("");
                          setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                        }}
                        className="rounded-lg border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectDesc-${idx}`} className="font-semibold text-slate-700">Description</Label>
                      <Textarea
                        id={`projectDesc-${idx}`}
                        placeholder="Describe what you built and what technologies you used..."
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...profileData.proofOfWork.projects];
                          newProjects[idx].description = e.target.value;
                          setProofOfWorkError("");
                          setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                        }}
                        rows={3}
                        className="rounded-lg border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectLink-${idx}`} className="font-semibold text-slate-700">Project Link</Label>
                      <Input
                        id={`projectLink-${idx}`}
                        placeholder="https://github.com/yourrepo or project URL"
                        value={project.link}
                        onChange={(e) => {
                          const newProjects = [...profileData.proofOfWork.projects];
                          newProjects[idx].link = e.target.value;
                          setProofOfWorkError("");
                          setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                        }}
                        className="rounded-lg border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addProofOfWorkProject}
                  className="w-full rounded-lg border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
                {proofOfWorkError && <p className="text-sm text-red-600 font-medium">{proofOfWorkError}</p>}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.proofOfWork.projects.length > 0 ? (
                  profileData.proofOfWork.projects.map((project, idx) => (
                    <div key={idx} className="group rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden hover:shadow-lg hover:border-green-300 transition-all">
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title || "Project screenshot"}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-5">
                        <p className="font-bold text-lg text-slate-900 flex items-center gap-2">
                          <Code className="h-5 w-5 text-green-600" />
                          {project.title || "(Untitled)"}
                        </p>
                        {project.description && <p className="text-slate-700 mt-2 text-sm leading-relaxed">{project.description}</p>}
                        {project.link && (
                          <a
                            href={normalizeUrl(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-green-600 hover:text-green-700 mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            View Project
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <Code className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No projects added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Showcase your best projects, open-source contributions, or side hustles</p>
                  </div>
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Certificates & Achievements</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "certificates" ? null : "certificates")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "certificates" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "certificates" ? (
              <div className="space-y-4">
                {profileData.certificates.certs.map((cert, idx) => (
                  <div key={idx} className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                      <p className="font-bold text-slate-900">Certificate {idx + 1}</p>
                      {profileData.certificates.certs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          onClick={() => {
                            const newCerts = profileData.certificates.certs.filter((_, i) => i !== idx);
                            setProfileData({ ...profileData, certificates: { certs: newCerts } });
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certTitle-${idx}`} className="font-semibold text-slate-700">Certificate Name</Label>
                      <Input
                        id={`certTitle-${idx}`}
                        placeholder="e.g., Google Cloud Certification"
                        value={cert.title}
                        onChange={(e) => {
                          const newCerts = [...profileData.certificates.certs];
                          newCerts[idx].title = e.target.value;
                          setCertificateError("");
                          setProfileData({ ...profileData, certificates: { certs: newCerts } });
                        }}
                        className="rounded-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certIssuer-${idx}`} className="font-semibold text-slate-700">Issuing Organization</Label>
                      <Input
                        id={`certIssuer-${idx}`}
                        placeholder="e.g., Google, Coursera, MIT"
                        value={cert.issuer}
                        onChange={(e) => {
                          const newCerts = [...profileData.certificates.certs];
                          newCerts[idx].issuer = e.target.value;
                          setCertificateError("");
                          setProfileData({ ...profileData, certificates: { certs: newCerts } });
                        }}
                        className="rounded-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certDate-${idx}`} className="font-semibold text-slate-700">Issue Date</Label>
                      <Input
                        id={`certDate-${idx}`}
                        type="date"
                        value={cert.date}
                        onChange={(e) => {
                          const newCerts = [...profileData.certificates.certs];
                          newCerts[idx].date = e.target.value;
                          setCertificateError("");
                          setProfileData({ ...profileData, certificates: { certs: newCerts } });
                        }}
                        className="rounded-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certUrl-${idx}`} className="font-semibold text-slate-700">Credential URL (optional)</Label>
                      <Input
                        id={`certUrl-${idx}`}
                        placeholder="https://credentials.example.com/..."
                        value={cert.credentialUrl || ""}
                        onChange={(e) => {
                          const newCerts = [...profileData.certificates.certs];
                          newCerts[idx].credentialUrl = e.target.value;
                          setProfileData({ ...profileData, certificates: { certs: newCerts } });
                        }}
                        className="rounded-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold text-slate-700">Certificate Image</Label>
                      <input
                        type="file"
                        accept="image/*"
                        id={`cert-photo-${idx}`}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const newCerts = [...profileData.certificates.certs];
                              newCerts[idx].photoUrl = reader.result as string;
                              setProfileData({ ...profileData, certificates: { certs: newCerts } });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`cert-photo-${idx}`)?.click()}
                          className="rounded-lg border-amber-200 text-amber-600 hover:bg-amber-50"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        {cert.photoUrl && (
                          <img src={cert.photoUrl} alt="cert" className="h-16 w-20 rounded-lg object-cover border border-amber-200" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addCertificate}
                  className="w-full rounded-lg border-amber-200 text-amber-600 hover:bg-amber-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certificate
                </Button>
                {certificateError && <p className="text-sm text-red-600 font-medium">{certificateError}</p>}
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.certificates.certs.length > 0 ? (
                  profileData.certificates.certs.map((cert, idx) => (
                    <div key={idx} className="group rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all">
                      {cert.photoUrl && (
                        <img src={cert.photoUrl} alt={cert.title} className="w-full h-32 object-cover" />
                      )}
                      <div className="p-4">
                        <p className="font-bold text-slate-900 flex items-center gap-2">
                          <Award className="h-5 w-5 text-amber-600" />
                          {cert.title}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">Issued by <span className="font-semibold">{cert.issuer}</span></p>
                        {cert.date && <p className="text-xs text-slate-500 mt-1">{cert.date}</p>}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-amber-600 hover:text-amber-700 mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Credential
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <Award className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No certificates added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Add certifications, awards, and professional achievements</p>
                  </div>
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
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow pb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Impact Work & Volunteering</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "impact" ? null : "impact")}
                className="rounded-lg hover:bg-slate-100"
              >
                {editingSection === "impact" ? <Check className="h-4 w-4 text-green-600" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </div>
            {editingSection === "impact" ? (
              <div className="space-y-4">
                {profileData.impactWork.initiatives.map((initiative, idx) => (
                  <div key={idx} className="rounded-xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50 p-5 space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500" />
                      <p className="font-bold text-slate-900">Initiative {idx + 1}</p>
                      {profileData.impactWork.initiatives.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          onClick={() => {
                            const newInitiatives = profileData.impactWork.initiatives.filter((_, i) => i !== idx);
                            setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`initTitle-${idx}`} className="font-semibold text-slate-700">Initiative Name</Label>
                      <Input
                        id={`initTitle-${idx}`}
                        placeholder="e.g., Food Bank Volunteer"
                        value={initiative.title}
                        onChange={(e) => {
                          const newInitiatives = [...profileData.impactWork.initiatives];
                          newInitiatives[idx].title = e.target.value;
                          setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                        }}
                        className="rounded-lg border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`initDesc-${idx}`} className="font-semibold text-slate-700">Description</Label>
                      <Textarea
                        id={`initDesc-${idx}`}
                        placeholder="What did you contribute? What impact did you make?"
                        value={initiative.description}
                        onChange={(e) => {
                          const newInitiatives = [...profileData.impactWork.initiatives];
                          newInitiatives[idx].description = e.target.value;
                          setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                        }}
                        rows={3}
                        className="rounded-lg border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`initHours-${idx}`} className="font-semibold text-slate-700">Volunteer Hours</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`initHours-${idx}`}
                          placeholder="Hours"
                          type="number"
                          min={0}
                          step={1}
                          inputMode="numeric"
                          value={initiative.hours}
                          onChange={(e) => {
                            const newInitiatives = [...profileData.impactWork.initiatives];
                            newInitiatives[idx].hours = parseInt(e.target.value) || 0;
                            setProfileData({ ...profileData, impactWork: { initiatives: newInitiatives } });
                          }}
                          className="flex-1 rounded-lg border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                        />
                        <span className="font-semibold text-slate-700">hours</span>
                      </div>
                    </div>
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
                  className="w-full rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Initiative
                </Button>
                <Button
                  onClick={() => setEditingSection(null)}
                  className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-semibold rounded-lg mt-6"
                >
                  ✓ Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.impactWork.initiatives.length > 0 ? (
                  profileData.impactWork.initiatives.map((initiative, idx) => (
                    <div key={idx} className="group rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 p-5 hover:shadow-lg hover:border-rose-300 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-slate-900 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-rose-600" />
                            {initiative.title || "(Untitled)"}
                          </p>
                          {initiative.description && <p className="text-slate-700 mt-2 text-sm leading-relaxed">{initiative.description}</p>}
                          {initiative.hours > 0 && (
                            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-rose-600">
                              <TrendingUp className="h-4 w-4" />
                              {initiative.hours} hours contributed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <Heart className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No impact work added yet</p>
                    <p className="text-xs text-slate-500 mt-1">Share your volunteering, CSR, and community service contributions</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </StudentDashboardNavLayout>
    );
};

export default StudentProfilePage;
