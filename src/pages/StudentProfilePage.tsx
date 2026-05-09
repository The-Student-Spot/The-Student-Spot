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
  GraduationCap,
  FileText,
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

  return (
    <StudentDashboardNavLayout activeSection="profile" headerTitle="My Profile">
      {/* Profile Content */}
      <div className="flex-1 space-y-6">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600">Student Profile</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Build a profile that stands out</h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600">
            Keep your information, experience, and achievements organized so mentors, colleges, and companies can understand your story quickly.
          </p>
        </div>

          {/* Profile Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative w-fit">
                <img
                  src={profileData.basicInfo.profilePhoto || getAvatarUrl(profileData.basicInfo.gender, user?.email || "default")}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button
                  onClick={() => setPhotoEditOpen(true)}
                  className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-2 shadow-lg transition-colors border-2 border-white"
                  title="Edit profile photo"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
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
                    onClick={() => {
                      setEditingSection("basicInfo");
                      setTimeout(() => {
                        document.querySelector('[data-section="basicInfo"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo Edit Modal */}
          <Dialog open={photoEditOpen} onOpenChange={setPhotoEditOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-between pr-0">
                  <DialogTitle>Edit Profile Photo</DialogTitle>
                </DialogHeader>

              <div className="space-y-6">
                {/* Photo Preview and Upload */}
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <img
                      src={profileData.basicInfo.profilePhoto || getAvatarUrl(profileData.basicInfo.gender, user?.email || "default")}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full border-4 border-yellow-200 object-cover"
                    />
                  </div>
                  <div>
                    <Label htmlFor="photoUpload" className="text-base font-semibold">Upload Photo</Label>
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
                    <div className="mt-2 flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => photoInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Choose file
                      </Button>
                      {profileData.basicInfo.profilePhoto ? (
                        <span className="text-sm text-muted-foreground">Preview available</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">No file selected</span>
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
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>

                {/* Gender Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Gender</Label>
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
                      className={`flex-1 ${profileData.basicInfo.gender === "male" ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}`}
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
                      className={`flex-1 ${profileData.basicInfo.gender === "female" ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}`}
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
                      className={`flex-1 ${profileData.basicInfo.gender === "other" ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}`}
                    >
                      Other
                    </Button>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={() => setPhotoEditOpen(false)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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

              </div>
              <div className="space-y-3">
                {profileCompletionDetails.map((item) => {
                  const missing = getIncompleteFields(item.label);
                  const tooltipTitle = `${item.label} ${item.value}% complete`;
                  const tooltipDescription = missing.length
                    ? "These are the items still needed in this section:"
                    : "Nothing is missing here. This section is complete.";
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{item.label}</span>
                        <span className="text-slate-600">{item.value}%</span>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="cursor-help"
                            title={`${item.label}: ${missing.length ? missing.join("; ") : "Complete"}`}
                            aria-label={`${item.label} completion details: ${missing.length ? missing.join("; ") : "Complete"}`}
                          >
                            <Progress value={item.value} className="h-2" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs whitespace-normal text-xs space-y-1">
                            <p className="font-semibold text-popover-foreground">{tooltipTitle}</p>
                            <p className="text-popover-foreground/80">{tooltipDescription}</p>
                            {missing.length > 0 && (
                              <ul className="list-disc pl-4 space-y-1 text-popover-foreground/90">
                                {missing.map((field) => (
                                  <li key={field}>{field}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {completionRemark}
              </p>
            </div>
          </motion.div>

          {/* Basic Info Section */}
          <motion.div
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-6 border border-slate-200"
            data-section="basicInfo"
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
                  <span className="font-medium text-slate-800">Gender:</span>{" "}
                  <Badge className="ml-2 bg-blue-100 text-blue-800 capitalize">{profileData.basicInfo.gender}</Badge>
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
                      <a href={value} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline break-all">
                        {value}
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
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addEducationEntry}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingSection(editingSection === "education" ? null : "education")}
                >
                  {editingSection === "education" ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {editingSection === "education" ? (
              <div className="space-y-4">
                {profileData.education.map((educationEntry, index) => (
                  <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-800">Education {index + 1}</p>
                      {profileData.education.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() =>
                            setProfileData({
                              ...profileData,
                              education: profileData.education.filter((_, itemIndex) => itemIndex !== index),
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
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
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`field-${index}`}>Field of Study</Label>
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
                          className="mt-1"
                        />
                        {educationFieldErrors[index] && (
                          <p className="text-sm text-red-600 mt-1">{educationFieldErrors[index]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`startYear-${index}`}>Start Year</Label>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endYear-${index}`}>End Year</Label>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`gpa-${index}`}>GPA</Label>
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
                          className="mt-1"
                        />
                      </div>
                    </div>
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
              <div className="space-y-3 text-sm">
                {profileData.education.length > 0 ? (
                  profileData.education.map((educationEntry, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {educationEntry.institution || `Education ${index + 1}`}
                        </p>
                        <p className="text-slate-600">
                          {educationEntry.degree} {educationEntry.field ? `• ${educationEntry.field}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {educationEntry.startYear || "?"} - {educationEntry.endYear || "?"}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-800">
                          GPA {educationEntry.gpa || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No education added yet</p>
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
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-yellow-100 text-yellow-800">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(idx)}
                        className="ml-2 hover:opacity-70"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
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
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addSkill(newSkillInput);
                      setNewSkillInput("");
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {skillInputError && <p className="text-sm text-red-600">{skillInputError}</p>}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Suggested skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.length > 0 ? (
                      skillSuggestions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="rounded-full border border-dashed border-yellow-300 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 transition-colors hover:bg-yellow-100 hover:border-yellow-400"
                        >
                          + {skill}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">You have added all suggested skills.</p>
                    )}
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
              <Button variant="ghost" size="sm" onClick={() => resumeInputRef.current?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
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
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-slate-800">{profileData.resume.fileName}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {profileData.resume.uploadedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {profileData.resume.fileUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profileData.resume.fileUrl} target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => resumeInputRef.current?.click()}>
                  Change
                  </Button>
                </div>
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
                          setPortfolioLinkError("");
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
                        setPortfolioLinkError("");
                        setProfileData({ ...profileData, portfolio: { links: newLinks } });
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addPortfolioLink}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Portfolio Link
                </Button>
                {portfolioLinkError && <p className="text-sm text-red-600">{portfolioLinkError}</p>}
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
                      href={normalizeUrl(link.url)}
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
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title || "Project screenshot"}
                        className="h-40 w-full rounded-lg object-cover border border-slate-200"
                      />
                    )}
                    <div className="space-y-2">
                      <Label>Project screenshot (optional)</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-28 h-20 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title || "Project screenshot"} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-xs text-muted-foreground">No image</div>
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

                          <div className="flex items-center gap-2">
                            <label htmlFor={`projectImage-${idx}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-50 border border-slate-200 text-sm cursor-pointer hover:shadow-sm">
                              <Upload className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm">Choose image</span>
                            </label>
                            <span className="text-xs text-muted-foreground">PNG / JPEG · recommended 16:9 · up to 5MB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Input
                      placeholder="Project title"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...profileData.proofOfWork.projects];
                        newProjects[idx].title = e.target.value;
                        setProofOfWorkError("");
                        setProfileData({ ...profileData, proofOfWork: { projects: newProjects } });
                      }}
                    />
                    <Textarea
                      placeholder="Project description"
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...profileData.proofOfWork.projects];
                        newProjects[idx].description = e.target.value;
                        setProofOfWorkError("");
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
                        setProofOfWorkError("");
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
                  onClick={addProofOfWorkProject}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
                {proofOfWorkError && <p className="text-sm text-red-600">{proofOfWorkError}</p>}
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
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title || "Project screenshot"}
                          className="mb-3 h-40 w-full rounded-lg object-cover border border-slate-200"
                        />
                      )}
                      <p className="font-medium text-slate-800">{project.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                      {project.link && (
                        <a
                          href={normalizeUrl(project.link)}
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
                        setCertificateError("");
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
                    <Input
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) => {
                        const newCerts = [...profileData.certificates.certs];
                        newCerts[idx].issuer = e.target.value;
                        setCertificateError("");
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
                        setCertificateError("");
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
                    <Input
                      placeholder="Credential URL (optional)"
                      value={cert.credentialUrl || ""}
                      onChange={(e) => {
                        const newCerts = [...profileData.certificates.certs];
                        newCerts[idx].credentialUrl = e.target.value;
                        setProfileData({ ...profileData, certificates: { certs: newCerts } });
                      }}
                    />
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`cert-photo-${idx}`)?.click()}
                        className="flex-1"
                      >
                        Upload Certificate Photo
                      </Button>
                      {cert.photoUrl && (
                        <img src={cert.photoUrl} alt="cert" className="h-10 w-10 rounded-md object-cover" />
                      )}
                    </div>
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
                  onClick={addCertificate}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certificate
                </Button>
                {certificateError && <p className="text-sm text-red-600">{certificateError}</p>}
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
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline break-all mt-2 inline-block">
                          {cert.credentialUrl}
                        </a>
                      )}
                      {cert.photoUrl && (
                        <div className="mt-2">
                          <img src={cert.photoUrl} alt={`${cert.title} photo`} className="h-20 w-32 object-cover rounded-md" />
                        </div>
                      )}
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Hours contributed"
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
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground">hrs</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Enter total hours (e.g., 10)</p>
                    </div>
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
      </StudentDashboardNavLayout>
    );
};

export default StudentProfilePage;
