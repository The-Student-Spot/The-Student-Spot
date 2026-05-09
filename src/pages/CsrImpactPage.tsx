import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import StudentDashboardNavLayout from "@/components/layout/StudentDashboardNavLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  GraduationCap,
  HandHeart,
  MapPinned,
  Megaphone,
  Search,
  Share2,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

type ProgramItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  participants: number;
  icon: ReactNode;
  details: string[];
};

type OpportunityItem = {
  id: string;
  organization: string;
  title: string;
  description: string;
  duration: string;
  locationTag: string;
  skillsGained: string[];
  eligibility: string;
  icon: ReactNode;
};

type CampaignItem = {
  id: string;
  title: string;
  organizer: string;
  goal: string;
  beneficiaries: string;
  timeline: string;
  status: string;
  icon: ReactNode;
};

type OutcomeItem = {
  id: string;
  label: string;
  metric: string;
  progress: number;
  summary: string;
  trendLabel: string;
  trendPositive: boolean;
  analytics: { label: string; value: string }[];
};

const programsData: ProgramItem[] = [
  {
    id: "rural-development",
    title: "Rural Development",
    description: "Support village-led initiatives focused on livelihoods, infrastructure, and community resilience.",
    category: "Community",
    status: "Open for Applications",
    participants: 124,
    icon: <MapPinned className="h-6 w-6" />,
    details: [
      "Community mapping and need assessment",
      "Local livelihood planning and implementation",
      "Mentorship from field coordinators",
      "Impact reporting for measurable outcomes",
    ],
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description: "Join programs that build confidence, leadership, and access to opportunity for women and girls.",
    category: "Gender",
    status: "Featured",
    participants: 98,
    icon: <HandHeart className="h-6 w-6" />,
    details: [
      "Leadership circles and peer support",
      "Skill-building workshops and learning cohorts",
      "Mentor access and advocacy projects",
      "Tracking participation and outcome metrics",
    ],
  },
  {
    id: "student-empowerment",
    title: "Student Empowerment",
    description: "Help students lead clubs, campaigns, and campus initiatives that create measurable change.",
    category: "Education",
    status: "Limited Spots",
    participants: 212,
    icon: <GraduationCap className="h-6 w-6" />,
    details: [
      "Student leadership and campus organizing",
      "Peer mentorship and learning circles",
      "Project ownership and delivery support",
      "Measurable participation and growth tracking",
    ],
  },
];

const opportunitiesData: OpportunityItem[] = [
  {
    id: "volunteer-work",
    organization: "HelpingHands",
    title: "Volunteer Work",
    description: "Contribute to ongoing social programs, outreach drives, and service activities with direct community impact.",
    duration: "3 months",
    locationTag: "On-site",
    skillsGained: ["Community Outreach", "Communication", "Teamwork"],
    eligibility: "Open to all students with interest in service and social action.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: "ngo-internships",
    organization: "GreenFuture NGO",
    title: "NGO Internships",
    description: "Work alongside program teams on research, operations, and delivery for social good initiatives.",
    duration: "6 months",
    locationTag: "Remote",
    skillsGained: ["Research", "Project Management", "Reporting"],
    eligibility: "Students with basic writing and coordination skills are encouraged to apply.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    id: "impact-projects",
    organization: "Impact Lab",
    title: "Impact Projects",
    description: "Build and deliver short-term projects that solve social challenges and improve local outcomes.",
    duration: "1 month",
    locationTag: "Hybrid",
    skillsGained: ["Design Thinking", "Reporting", "Facilitation"],
    eligibility: "Students with project interest and a willingness to collaborate across teams.",
    icon: <Target className="h-6 w-6" />,
  },
];

const campaignsData: CampaignItem[] = [
  {
    id: "awareness-drives",
    title: "Awareness Drives",
    organizer: "City Youth",
    goal: "Reach 10k people with health, education, and civic awareness messaging.",
    beneficiaries: "Urban youth and families",
    timeline: "2026-05 to 2026-06",
    status: "Active",
    icon: <Megaphone className="h-6 w-6" />,
  },
  {
    id: "fundraising-initiatives",
    title: "Fundraising Initiatives",
    organizer: "Charity A",
    goal: "Raise $50k to expand access to education, food, and emergency support.",
    beneficiaries: "Rural families and local nonprofits",
    timeline: "2026-06 to 2026-09",
    status: "Recruiting",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: "free-education-programs",
    title: "Free Education Programs",
    organizer: "EduTrust",
    goal: "Enroll 500 students into free learning support, mentoring, and access programs.",
    beneficiaries: "School children",
    timeline: "2026-07 to 2026-12",
    status: "Planned",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    id: "rural-skill-camps",
    title: "Rural Skill Camps",
    organizer: "SkillUp",
    goal: "Train 200 beneficiaries with practical skills for income and employability.",
    beneficiaries: "Rural youth",
    timeline: "2026-08 to 2026-10",
    status: "Open",
    icon: <Sprout className="h-6 w-6" />,
  },
];

const outcomesData: OutcomeItem[] = [
  {
    id: "job-placements",
    label: "Job Placements",
    metric: "1,240",
    progress: 78,
    summary: "Students translated impact experience into paid roles and long-term career momentum.",
    trendLabel: "+12% this quarter",
    trendPositive: true,
    analytics: [
      { label: "Placement rate", value: "78%" },
      { label: "Active cohorts", value: "32" },
      { label: "Partner orgs", value: "84" },
    ],
  },
  {
    id: "livelihood-improvement",
    label: "Livelihood Improvement",
    metric: "3,560",
    progress: 62,
    summary: "Community-led initiatives improved income resilience and access to local opportunity.",
    trendLabel: "+8% this quarter",
    trendPositive: true,
    analytics: [
      { label: "Households reached", value: "1.8k" },
      { label: "Skills deployed", value: "15" },
      { label: "Micro projects", value: "96" },
    ],
  },
  {
    id: "skill-development",
    label: "Skill Development",
    metric: "8,900",
    progress: 90,
    summary: "Students gained practical leadership, communication, and project delivery capabilities.",
    trendLabel: "+16% this quarter",
    trendPositive: true,
    analytics: [
      { label: "Learning hours", value: "24k" },
      { label: "Certificates", value: "1.6k" },
      { label: "Completion", value: "90%" },
    ],
  },
];

const programCategories = ["All", "Community", "Gender", "Education"];
const opportunityCategories = ["All", "Volunteer Work", "NGO Internships", "Impact Projects"];
const campaignCategories = [
  "All",
  "Awareness Drives",
  "Fundraising Initiatives",
  "Free Education Programs",
  "Rural Skill Camps",
];

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.08, duration: 0.35 },
  }),
};

const CsrImpactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [programCategory, setProgramCategory] = useState("All");
  const [opportunityCategory, setOpportunityCategory] = useState("All");
  const [campaignCategory, setCampaignCategory] = useState("All");
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [joinedPrograms, setJoinedPrograms] = useState<Record<string, boolean>>({});
  const [joinedOpportunities, setJoinedOpportunities] = useState<Record<string, boolean>>({});
  const [joinedCampaigns, setJoinedCampaigns] = useState<Record<string, boolean>>({});
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [shareNotice, setShareNotice] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredPrograms = useMemo(() => {
    return programsData.filter((program) => {
      const matchesCategory = programCategory === "All" || program.category === programCategory;
      const matchesSearch = [program.title, program.description, program.category, program.status]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [programCategory, searchQuery]);

  const filteredOpportunities = useMemo(() => {
    return opportunitiesData.filter((opportunity) => {
      const matchesCategory = opportunityCategory === "All" || opportunity.title === opportunityCategory;
      const matchesSearch = [
        opportunity.organization,
        opportunity.title,
        opportunity.description,
        opportunity.duration,
        opportunity.locationTag,
        opportunity.eligibility,
        opportunity.skillsGained.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [opportunityCategory, searchQuery]);

  const filteredCampaigns = useMemo(() => {
    return campaignsData.filter((campaign) => {
      const matchesCategory = campaignCategory === "All" || campaign.title === campaignCategory;
      const matchesSearch = [campaign.title, campaign.organizer, campaign.goal, campaign.beneficiaries, campaign.timeline]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [campaignCategory, searchQuery]);

  const totalSaved = Object.values(savedItems).filter(Boolean).length;

  const toggleSaved = (id: string) => {
    setSavedItems((current) => ({ ...current, [id]: !current[id] }));
  };

  const markJoined = (
    setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    id: string,
  ) => {
    setter((current) => ({ ...current, [id]: true }));
  };

  const shareItem = async (title: string, description: string) => {
    const shareText = `${title} - ${description}`;
    if (navigator.share) {
      await navigator.share({ title, text: description });
    } else {
      await navigator.clipboard.writeText(shareText);
      setShareNotice("Link copied to clipboard");
      window.setTimeout(() => setShareNotice(""), 1800);
    }
  };

  const renderLoadingCards = (count: number) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-5 border-slate-200 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <Card className="rounded-xl border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
        <Eye className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{description}</p>
    </Card>
  );

  return (
    <StudentDashboardNavLayout
      activeSection="csrImpact"
      headerTitle="CSR / Impact"
      headerDescription="Drive Impact Beyond Careers"
    >
      <div className="space-y-6 pb-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-white p-6 lg:p-8 shadow-sm"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600">CSR / Impact Module</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">Drive Impact Beyond Careers</h1>
              <p className="max-w-3xl text-sm sm:text-base text-slate-600">
                A space where students contribute to society, participate in impact-driven programs, build leadership, and create measurable social change.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-3 gap-3">
              <Card className="rounded-xl border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-yellow-100 p-2 text-yellow-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Programs</p>
                    <p className="text-lg font-semibold text-slate-800">{programsData.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="rounded-xl border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Opportunities</p>
                    <p className="text-lg font-semibold text-slate-800">{opportunitiesData.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="rounded-xl border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Saved</p>
                    <p className="text-lg font-semibold text-slate-800">{totalSaved}</p>
                  </div>
                </div>
              </Card>
              <Card className="rounded-xl border-slate-200 p-4 sm:col-span-2 xl:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Impact Index</p>
                    <p className="text-lg font-semibold text-slate-800">92%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.section>

        <Card className="rounded-xl border-slate-200 p-4 lg:p-5">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="csr-search" className="text-sm font-semibold text-slate-700">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="csr-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search programs, opportunities, campaigns, or outcomes"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Programs</Label>
                <Select value={programCategory} onValueChange={setProgramCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter programs" />
                  </SelectTrigger>
                  <SelectContent>
                    {programCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Opportunities</Label>
                <Select value={opportunityCategory} onValueChange={setOpportunityCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter opportunities" />
                  </SelectTrigger>
                  <SelectContent>
                    {opportunityCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Campaigns</Label>
                <Select value={campaignCategory} onValueChange={setCampaignCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {shareNotice && <p className="mt-3 text-sm font-medium text-green-600">{shareNotice}</p>}
        </Card>

        <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Programs</h2>
              <p className="text-sm text-slate-600">Browse the three core impact tracks and open the details view for each one.</p>
            </div>
            <Badge className="bg-yellow-50 text-yellow-700">Section 1</Badge>
          </div>

          {isLoading ? (
            renderLoadingCards(3)
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPrograms.map((program, index) => {
                const isSaved = Boolean(savedItems[program.id]);
                const isJoined = Boolean(joinedPrograms[program.id]);

                return (
                  <motion.div
                    key={program.id}
                    custom={index}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="h-full rounded-xl border-slate-200 p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                            {program.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-semibold text-slate-800">{program.title}</h3>
                              <Badge className="bg-slate-100 text-slate-700">{program.category}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-slate-600">{program.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <Badge className="bg-green-100 text-green-700">{program.status}</Badge>
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                            <Users className="h-3.5 w-3.5" />
                            {program.participants} participants
                          </span>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                          <Button
                            className="bg-yellow-500 text-black hover:bg-yellow-600"
                            onClick={() => markJoined(setJoinedPrograms, program.id)}
                          >
                            {isJoined ? "Joined" : "Join"}
                          </Button>
                          <Button variant="outline" onClick={() => toggleSaved(program.id)}>
                            {isSaved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                            Save
                          </Button>
                          <Button variant="ghost" onClick={() => setSelectedProgram(program)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No programs matched your filters"
              description="Adjust the program category or search term to surface more options."
            />
          )}
        </motion.section>

        <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Opportunities</h2>
              <p className="text-sm text-slate-600">Volunteer work, NGO internships, and impact projects with share and save actions.</p>
            </div>
            <Badge className="bg-yellow-50 text-yellow-700">Section 2</Badge>
          </div>

          {isLoading ? (
            renderLoadingCards(3)
          ) : filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {filteredOpportunities.map((opportunity, index) => {
                const isSaved = Boolean(savedItems[opportunity.id]);
                const isJoined = Boolean(joinedOpportunities[opportunity.id]);

                return (
                  <motion.div
                    key={opportunity.id}
                    custom={index}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="h-full rounded-xl border-slate-200 p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            {opportunity.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800">{opportunity.organization}</p>
                            <h3 className="text-base font-semibold text-slate-900">{opportunity.title}</h3>
                            <p className="mt-1 text-sm text-slate-600">{opportunity.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge className="bg-blue-100 text-blue-700">
                            <Clock3 className="mr-1 h-3.5 w-3.5" />
                            {opportunity.duration}
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-700">{opportunity.locationTag}</Badge>
                          {isJoined && <Badge className="bg-green-100 text-green-700">Applied</Badge>}
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Skills gained</p>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.skillsGained.map((skill) => (
                              <Badge key={skill} className="bg-yellow-50 text-yellow-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Eligibility</p>
                          <p className="text-sm text-slate-700">{opportunity.eligibility}</p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                          <Button
                            className="bg-yellow-500 text-black hover:bg-yellow-600"
                            onClick={() => markJoined(setJoinedOpportunities, opportunity.id)}
                          >
                            Apply
                          </Button>
                          <Button variant="outline" onClick={() => toggleSaved(opportunity.id)}>
                            {isSaved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                            Save
                          </Button>
                          <Button variant="ghost" onClick={() => shareItem(opportunity.title, opportunity.description)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No opportunities matched your filters"
              description="Try a different opportunity category or search term to reveal more listings."
            />
          )}
        </motion.section>

        <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Campaigns</h2>
              <p className="text-sm text-slate-600">Join campaigns that build public awareness, funding, education access, and rural skills.</p>
            </div>
            <Badge className="bg-yellow-50 text-yellow-700">Section 3</Badge>
          </div>

          {isLoading ? (
            renderLoadingCards(4)
          ) : filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredCampaigns.map((campaign, index) => {
                const isSaved = Boolean(savedItems[campaign.id]);
                const isJoined = Boolean(joinedCampaigns[campaign.id]);

                return (
                  <motion.div
                    key={campaign.id}
                    custom={index}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="h-full rounded-xl border-slate-200 p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                            {campaign.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-semibold text-slate-900">{campaign.title}</h3>
                            <p className="mt-1 text-sm text-slate-600">{campaign.organizer}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">{campaign.status}</Badge>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600">
                          <p>
                            <span className="font-semibold text-slate-800">Goal:</span> {campaign.goal}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Beneficiaries:</span> {campaign.beneficiaries}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">Timeline:</span> {campaign.timeline}
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                          <Button
                            className="bg-yellow-500 text-black hover:bg-yellow-600"
                            onClick={() => markJoined(setJoinedCampaigns, campaign.id)}
                          >
                            {isJoined ? "Joined" : "Join Campaign"}
                          </Button>
                          <Button variant="outline" onClick={() => toggleSaved(campaign.id)}>
                            {isSaved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                            Bookmark
                          </Button>
                          <Button variant="ghost" onClick={() => shareItem(campaign.title, campaign.goal)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No campaigns matched your filters"
              description="Use the campaign category filter or search bar to reveal the campaign cards again."
            />
          )}
        </motion.section>

        <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Outcomes Dashboard</h2>
              <p className="text-sm text-slate-600">Track measurable social outcomes with trend indicators and detailed analytics cards.</p>
            </div>
            <Badge className="bg-yellow-50 text-yellow-700">Section 4</Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="rounded-xl border-slate-200 p-5 space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-24 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {outcomesData.map((outcome, index) => (
                <motion.div
                  key={outcome.id}
                  custom={index}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="h-full rounded-xl border-slate-200 p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{outcome.label}</p>
                          <p className="text-3xl font-bold text-slate-900">{outcome.metric}</p>
                        </div>
                        <Badge
                          className={outcome.trendPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                        >
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          {outcome.trendLabel}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Progress visualization</span>
                          <span>{outcome.progress}%</span>
                        </div>
                        <Progress value={outcome.progress} className="h-2" />
                      </div>

                      <p className="text-sm text-slate-600">{outcome.summary}</p>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <BarChart3 className="h-4 w-4 text-yellow-600" />
                          Detailed analytics
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {outcome.analytics.map((item) => (
                            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                              <p className="text-xs text-muted-foreground">{item.label}</p>
                              <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        <Card className="rounded-xl border-slate-200 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Module-ready structure</h3>
              <p className="text-sm text-slate-600">
                Filters, bookmarks, join actions, details dialogs, and analytics cards are kept in separate state and item models so backend endpoints can be connected later without reworking the UI.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-100 text-slate-700">Search</Badge>
              <Badge className="bg-slate-100 text-slate-700">Filters</Badge>
              <Badge className="bg-slate-100 text-slate-700">Bookmarks</Badge>
              <Badge className="bg-slate-100 text-slate-700">Responsive</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={Boolean(selectedProgram)} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-yellow-100 text-yellow-700">{selectedProgram.category}</Badge>
                <Badge className="bg-green-100 text-green-700">{selectedProgram.status}</Badge>
                <Badge className="bg-slate-100 text-slate-700">{selectedProgram.participants} participants</Badge>
              </div>
              <p className="text-sm text-slate-600">{selectedProgram.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedProgram.details.map((detail) => (
                  <div key={detail} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    {detail}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                  onClick={() => {
                    markJoined(setJoinedPrograms, selectedProgram.id);
                    setSelectedProgram(null);
                  }}
                >
                  Join Program
                </Button>
                <Button variant="outline" onClick={() => toggleSaved(selectedProgram.id)}>
                  {savedItems[selectedProgram.id] ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </StudentDashboardNavLayout>
  );
};

export default CsrImpactPage;
