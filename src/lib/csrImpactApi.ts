import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  GraduationCap,
  HandHeart,
  MapPinned,
  Megaphone,
  Sparkles,
  Sprout,
  Target,
  Users,
} from "lucide-react";

export type ProgramItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  participants: number;
  icon: LucideIcon;
  details: string[];
};

export type OpportunityItem = {
  id: string;
  organization: string;
  title: string;
  description: string;
  duration: string;
  locationTag: string;
  skillsGained: string[];
  eligibility: string;
  icon: LucideIcon;
};

export type CampaignItem = {
  id: string;
  title: string;
  organizer: string;
  goal: string;
  beneficiaries: string;
  timeline: string;
  status: string;
  icon: LucideIcon;
};

export type OutcomeItem = {
  id: string;
  label: string;
  metric: string;
  progress: number;
  summary: string;
  trendLabel: string;
  trendPositive: boolean;
  analytics: { label: string; value: string }[];
};

export type CsrImpactFilters = {
  searchQuery: string;
  programCategory: string;
  opportunityCategory: string;
  campaignCategory: string;
};

export type CsrImpactDashboardData = {
  programs: ProgramItem[];
  opportunities: OpportunityItem[];
  campaigns: CampaignItem[];
  outcomes: OutcomeItem[];
};

export type CsrImpactItemType = "program" | "opportunity" | "campaign";

const apiBase = String(import.meta.env.VITE_CSR_IMPACT_API_BASE_URL ?? "/api/csr-impact").replace(/\/$/, "");

const fallbackPrograms: ProgramItem[] = [
  {
    id: "rural-development",
    title: "Rural Development",
    description: "Support village-led initiatives focused on livelihoods, infrastructure, and community resilience.",
    category: "Community",
    status: "Open for Applications",
    participants: 124,
    icon: MapPinned,
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
    icon: HandHeart,
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
    icon: GraduationCap,
    details: [
      "Student leadership and campus organizing",
      "Peer mentorship and learning circles",
      "Project ownership and delivery support",
      "Measurable participation and growth tracking",
    ],
  },
];

const fallbackOpportunities: OpportunityItem[] = [
  {
    id: "volunteer-work",
    organization: "HelpingHands",
    title: "Volunteer Work",
    description: "Contribute to ongoing social programs, outreach drives, and service activities with direct community impact.",
    duration: "3 months",
    locationTag: "On-site",
    skillsGained: ["Community Outreach", "Communication", "Teamwork"],
    eligibility: "Open to all students with interest in service and social action.",
    icon: Users,
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
    icon: Sparkles,
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
    icon: Target,
  },
];

const fallbackCampaigns: CampaignItem[] = [
  {
    id: "awareness-drives",
    title: "Awareness Drives",
    organizer: "City Youth",
    goal: "Reach 10k people with health, education, and civic awareness messaging.",
    beneficiaries: "Urban youth and families",
    timeline: "2026-05 to 2026-06",
    status: "Active",
    icon: Megaphone,
  },
  {
    id: "fundraising-initiatives",
    title: "Fundraising Initiatives",
    organizer: "Charity A",
    goal: "Raise $50k to expand access to education, food, and emergency support.",
    beneficiaries: "Rural families and local nonprofits",
    timeline: "2026-06 to 2026-09",
    status: "Recruiting",
    icon: BarChart3,
  },
  {
    id: "free-education-programs",
    title: "Free Education Programs",
    organizer: "EduTrust",
    goal: "Enroll 500 students into free learning support, mentoring, and access programs.",
    beneficiaries: "School children",
    timeline: "2026-07 to 2026-12",
    status: "Planned",
    icon: GraduationCap,
  },
  {
    id: "rural-skill-camps",
    title: "Rural Skill Camps",
    organizer: "SkillUp",
    goal: "Train 200 beneficiaries with practical skills for income and employability.",
    beneficiaries: "Rural youth",
    timeline: "2026-08 to 2026-10",
    status: "Open",
    icon: Sprout,
  },
];

const fallbackOutcomes: OutcomeItem[] = [
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

const programTemplateById = new Map(fallbackPrograms.map((item) => [item.id, item] as const));
const opportunityTemplateById = new Map(fallbackOpportunities.map((item) => [item.id, item] as const));
const campaignTemplateById = new Map(fallbackCampaigns.map((item) => [item.id, item] as const));

const getText = (value: unknown, fallback: string) => (typeof value === "string" && value.trim() ? value : fallback);
const getNumber = (value: unknown, fallback: number) => (typeof value === "number" && Number.isFinite(value) ? value : fallback);
const getBoolean = (value: unknown, fallback: boolean) => (typeof value === "boolean" ? value : fallback);

const toStringArray = (value: unknown, fallback: string[]) =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string") ? (value as string[]) : fallback;

const normalizeProgram = (value: Partial<ProgramItem> & { id: string }): ProgramItem => {
  const fallback = programTemplateById.get(value.id);

  return {
    id: value.id,
    title: getText(value.title, fallback?.title ?? value.id),
    description: getText(value.description, fallback?.description ?? ""),
    category: getText(value.category, fallback?.category ?? "General"),
    status: getText(value.status, fallback?.status ?? "Open"),
    participants: getNumber(value.participants, fallback?.participants ?? 0),
    icon: fallback?.icon ?? MapPinned,
    details: toStringArray(value.details, fallback?.details ?? []),
  };
};

const normalizeOpportunity = (value: Partial<OpportunityItem> & { id: string }): OpportunityItem => {
  const fallback = opportunityTemplateById.get(value.id);

  return {
    id: value.id,
    organization: getText(value.organization, fallback?.organization ?? "Organization"),
    title: getText(value.title, fallback?.title ?? value.id),
    description: getText(value.description, fallback?.description ?? ""),
    duration: getText(value.duration, fallback?.duration ?? ""),
    locationTag: getText(value.locationTag, fallback?.locationTag ?? ""),
    skillsGained: toStringArray(value.skillsGained, fallback?.skillsGained ?? []),
    eligibility: getText(value.eligibility, fallback?.eligibility ?? ""),
    icon: fallback?.icon ?? Users,
  };
};

const normalizeCampaign = (value: Partial<CampaignItem> & { id: string }): CampaignItem => {
  const fallback = campaignTemplateById.get(value.id);

  return {
    id: value.id,
    title: getText(value.title, fallback?.title ?? value.id),
    organizer: getText(value.organizer, fallback?.organizer ?? ""),
    goal: getText(value.goal, fallback?.goal ?? ""),
    beneficiaries: getText(value.beneficiaries, fallback?.beneficiaries ?? ""),
    timeline: getText(value.timeline, fallback?.timeline ?? ""),
    status: getText(value.status, fallback?.status ?? "Open"),
    icon: fallback?.icon ?? BarChart3,
  };
};

const normalizeOutcome = (value: Partial<OutcomeItem> & { id: string }): OutcomeItem => {
  const fallback = fallbackOutcomes.find((item) => item.id === value.id);

  return {
    id: value.id,
    label: getText(value.label, fallback?.label ?? value.id),
    metric: getText(value.metric, fallback?.metric ?? "0"),
    progress: getNumber(value.progress, fallback?.progress ?? 0),
    summary: getText(value.summary, fallback?.summary ?? ""),
    trendLabel: getText(value.trendLabel, fallback?.trendLabel ?? ""),
    trendPositive: getBoolean(value.trendPositive, fallback?.trendPositive ?? true),
    analytics: Array.isArray(value.analytics)
      ? value.analytics
          .filter((entry): entry is { label: string; value: string } => Boolean(entry && typeof entry.label === "string" && typeof entry.value === "string"))
          .map((entry) => ({ label: entry.label, value: entry.value }))
      : fallback?.analytics ?? [],
  };
};

const normalizeFilters = (filters: CsrImpactFilters) => ({
  search: filters.searchQuery.trim().toLowerCase(),
  programCategory: filters.programCategory,
  opportunityCategory: filters.opportunityCategory,
  campaignCategory: filters.campaignCategory,
});

const matchesSearch = (text: string, search: string) => (search ? text.toLowerCase().includes(search) : true);

const filterPrograms = (filters: CsrImpactFilters) => {
  const normalized = normalizeFilters(filters);
  return fallbackPrograms.filter((program) => {
    const matchesCategory = normalized.programCategory === "All" || program.category === normalized.programCategory;
    const matchesText = matchesSearch([program.title, program.description, program.category, program.status].join(" "), normalized.search);
    return matchesCategory && matchesText;
  });
};

const filterOpportunities = (filters: CsrImpactFilters) => {
  const normalized = normalizeFilters(filters);
  return fallbackOpportunities.filter((opportunity) => {
    const matchesCategory = normalized.opportunityCategory === "All" || opportunity.title === normalized.opportunityCategory;
    const matchesText = matchesSearch(
      [
        opportunity.organization,
        opportunity.title,
        opportunity.description,
        opportunity.duration,
        opportunity.locationTag,
        opportunity.eligibility,
        opportunity.skillsGained.join(" "),
      ].join(" "),
      normalized.search,
    );
    return matchesCategory && matchesText;
  });
};

const filterCampaigns = (filters: CsrImpactFilters) => {
  const normalized = normalizeFilters(filters);
  return fallbackCampaigns.filter((campaign) => {
    const matchesCategory = normalized.campaignCategory === "All" || campaign.title === normalized.campaignCategory;
    const matchesText = matchesSearch(
      [campaign.title, campaign.organizer, campaign.goal, campaign.beneficiaries, campaign.timeline].join(" "),
      normalized.search,
    );
    return matchesCategory && matchesText;
  });
};

const fetchJson = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`CSR impact request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

const buildQueryString = (filters: CsrImpactFilters) => {
  const params = new URLSearchParams();
  if (filters.searchQuery.trim()) params.set("search", filters.searchQuery.trim());
  if (filters.programCategory !== "All") params.set("programCategory", filters.programCategory);
  if (filters.opportunityCategory !== "All") params.set("opportunityCategory", filters.opportunityCategory);
  if (filters.campaignCategory !== "All") params.set("campaignCategory", filters.campaignCategory);
  return params.toString();
};

export const loadCsrImpactDashboard = async (filters: CsrImpactFilters): Promise<CsrImpactDashboardData> => {
  const queryString = buildQueryString(filters);

  try {
    const payload = await fetchJson<Partial<CsrImpactDashboardData>>(`/dashboard${queryString ? `?${queryString}` : ""}`);

    return {
      programs: Array.isArray(payload.programs)
        ? payload.programs.filter((entry): entry is ProgramItem & { id: string } => Boolean(entry && typeof entry.id === "string")).map(normalizeProgram)
        : filterPrograms(filters),
      opportunities: Array.isArray(payload.opportunities)
        ? payload.opportunities
            .filter((entry): entry is OpportunityItem & { id: string } => Boolean(entry && typeof entry.id === "string"))
            .map(normalizeOpportunity)
        : filterOpportunities(filters),
      campaigns: Array.isArray(payload.campaigns)
        ? payload.campaigns
            .filter((entry): entry is CampaignItem & { id: string } => Boolean(entry && typeof entry.id === "string"))
            .map(normalizeCampaign)
        : filterCampaigns(filters),
      outcomes: Array.isArray(payload.outcomes)
        ? payload.outcomes.filter((entry): entry is OutcomeItem & { id: string } => Boolean(entry && typeof entry.id === "string")).map(normalizeOutcome)
        : fallbackOutcomes,
    };
  } catch {
    return {
      programs: filterPrograms(filters),
      opportunities: filterOpportunities(filters),
      campaigns: filterCampaigns(filters),
      outcomes: fallbackOutcomes,
    };
  }
};

export const loadCsrImpactProgramDetails = async (programId: string): Promise<ProgramItem> => {
  try {
    const payload = await fetchJson<Partial<ProgramItem> & { id: string }>(`/programs/${programId}`);
    return normalizeProgram({ id: programId, ...payload });
  } catch {
    return normalizeProgram({ id: programId });
  }
};

export const toggleCsrImpactBookmark = async (itemType: CsrImpactItemType, itemId: string, bookmarked: boolean) => {
  try {
    await fetchJson<{ success: boolean }>("/bookmarks", {
      method: bookmarked ? "POST" : "DELETE",
      body: JSON.stringify({ itemType, itemId }),
    });
  } catch {
    return;
  }
};

export const joinCsrImpactItem = async (itemType: CsrImpactItemType, itemId: string) => {
  try {
    await fetchJson<{ success: boolean }>("/join", {
      method: "POST",
      body: JSON.stringify({ itemType, itemId }),
    });
  } catch {
    return;
  }
};

export const shareCsrImpactItem = async (title: string, description: string) => {
  const shareText = `${title} - ${description}`;

  if (navigator.share) {
    try {
      await navigator.share({ title, text: description });
      return true; // Successfully used native share
    } catch {
      // User cancelled or native share failed, fallback to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
  } catch {
    // Clipboard API might fail if not focused or permitted
  }
  return false;
};

export const csrImpactFallbackData = {
  programs: fallbackPrograms,
  opportunities: fallbackOpportunities,
  campaigns: fallbackCampaigns,
  outcomes: fallbackOutcomes,
};