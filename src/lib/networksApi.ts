export type StudentNetworkItem = {
  id: string;
  label: string;
  members: number;
  featured?: boolean;
};

export type StartupNetworkItem = {
  id: string;
  name: string;
  tagline: string;
  hiring: string[];
  featured?: boolean;
};

export type SpeakerNetworkItem = {
  id: string;
  name: string;
  topic: string;
  sessions: string[];
  upcoming: boolean;
};

export type SponsorNetworkItem = {
  id: string;
  name: string;
  opportunities: string[];
  featured?: boolean;
};

export type VenueNetworkItem = {
  id: string;
  name: string;
  type: string;
  location: string;
  featured?: boolean;
};

export type CorporateNetworkItem = {
  id: string;
  name: string;
  openings: string[];
  featured?: boolean;
};

export type ServicePartnerItem = {
  id: string;
  category: string;
  name: string;
  services: string[];
};

export type NetworksDashboardData = {
  studentNetwork: { title: string; items: StudentNetworkItem[] };
  startupNetwork: { title: string; items: StartupNetworkItem[] };
  speakerNetwork: { title: string; items: SpeakerNetworkItem[] };
  sponsorNetwork: { title: string; items: SponsorNetworkItem[] };
  venueNetwork: { title: string; items: VenueNetworkItem[] };
  corporateNetwork: { title: string; items: CorporateNetworkItem[] };
  servicePartners: { title: string; items: ServicePartnerItem[] };
};

export type NetworksFilters = {
  searchQuery: string;
  category: string;
};

const apiBase = String(import.meta.env.VITE_NETWORKS_API_BASE_URL ?? "/api/networks").replace(/\/$/, "");

const toStringArray = (value: unknown, fallback: string[]) =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string") ? value : fallback;

const getText = (value: unknown, fallback: string) => (typeof value === "string" && value.trim() ? value : fallback);
const getNumber = (value: unknown, fallback: number) => (typeof value === "number" && Number.isFinite(value) ? value : fallback);
const getBoolean = (value: unknown, fallback: boolean) => (typeof value === "boolean" ? value : fallback);

export const networksFallbackData: NetworksDashboardData = {
  studentNetwork: {
    title: "Student Network",
    items: [
      { id: "campus-leader-1", label: "TSS Campus Leaders", members: 12, featured: true },
      { id: "peer-collab", label: "Peer collaboration", members: 84 },
    ],
  },
  startupNetwork: {
    title: "Startup Network",
    items: [
      { id: "startup-1", name: "SeedSpark", tagline: "AI for social impact", hiring: ["internship", "product"], featured: true },
      { id: "startup-2", name: "GreenLoop", tagline: "Circular economy", hiring: ["design"] },
    ],
  },
  speakerNetwork: {
    title: "Speaker Network",
    items: [
      { id: "speaker-1", name: "Dr. A. Expert", topic: "Product Management", sessions: ["PM 101"], upcoming: true },
      { id: "speaker-2", name: "Ms. Mentor", topic: "Design Thinking", sessions: ["Design Sprint"], upcoming: false },
    ],
  },
  sponsorNetwork: {
    title: "Sponsor Network",
    items: [
      { id: "brand-1", name: "Acme Corp", opportunities: ["Internships", "Hiring"], featured: true },
      { id: "brand-2", name: "BrightCo", opportunities: ["Partnerships"] },
    ],
  },
  venueNetwork: {
    title: "Venue Network",
    items: [
      { id: "venue-1", name: "Corner Cafe", type: "Cafe", location: "Central Campus", featured: true },
      { id: "venue-2", name: "Maker Hub", type: "Co-working", location: "North Wing" },
    ],
  },
  corporateNetwork: {
    title: "Corporate Network",
    items: [
      { id: "corp-1", name: "GlobalTech", openings: ["Software Engineer", "Data Analyst"], featured: true },
      { id: "corp-2", name: "FinServe", openings: ["Business Analyst"] },
    ],
  },
  servicePartners: {
    title: "Service Partners",
    items: [
      { id: "svc-legal-1", category: "Legal", name: "LawAssist", services: ["Contract review", "Startup compliance"] },
      { id: "svc-fin-1", category: "Finance", name: "LedgerPro", services: ["Tax advisory", "Bookkeeping"] },
      { id: "svc-design-1", category: "Design", name: "PixelCraft", services: ["Brand design", "UI/UX"] },
      { id: "svc-marketing-1", category: "Marketing", name: "MarketMinds", services: ["Growth strategy", "Ads"] },
    ],
  },
};

const normalizeStudent = (item: Partial<StudentNetworkItem> & { id: string }): StudentNetworkItem => ({
  id: item.id,
  label: getText(item.label, item.id),
  members: getNumber(item.members, 0),
  featured: getBoolean(item.featured, false),
});

const normalizeStartup = (item: Partial<StartupNetworkItem> & { id: string }): StartupNetworkItem => ({
  id: item.id,
  name: getText(item.name, item.id),
  tagline: getText(item.tagline, ""),
  hiring: toStringArray(item.hiring, []),
  featured: getBoolean(item.featured, false),
});

const normalizeSpeaker = (item: Partial<SpeakerNetworkItem> & { id: string }): SpeakerNetworkItem => ({
  id: item.id,
  name: getText(item.name, item.id),
  topic: getText(item.topic, ""),
  sessions: toStringArray(item.sessions, []),
  upcoming: getBoolean(item.upcoming, false),
});

const normalizeSponsor = (item: Partial<SponsorNetworkItem> & { id: string }): SponsorNetworkItem => ({
  id: item.id,
  name: getText(item.name, item.id),
  opportunities: toStringArray(item.opportunities, []),
  featured: getBoolean(item.featured, false),
});

const normalizeVenue = (item: Partial<VenueNetworkItem> & { id: string }): VenueNetworkItem => ({
  id: item.id,
  name: getText(item.name, item.id),
  type: getText(item.type, "Venue"),
  location: getText(item.location, ""),
  featured: getBoolean(item.featured, false),
});

const normalizeCorporate = (item: Partial<CorporateNetworkItem> & { id: string }): CorporateNetworkItem => ({
  id: item.id,
  name: getText(item.name, item.id),
  openings: toStringArray(item.openings, []),
  featured: getBoolean(item.featured, false),
});

const normalizeService = (item: Partial<ServicePartnerItem> & { id: string }): ServicePartnerItem => ({
  id: item.id,
  category: getText(item.category, "Service"),
  name: getText(item.name, item.id),
  services: toStringArray(item.services, []),
});

const validItems = <T extends { id: string }>(items: unknown): T[] =>
  Array.isArray(items) ? items.filter((item): item is T => Boolean(item && typeof item.id === "string")) : [];

const fetchJson = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Networks request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

const buildQueryString = (filters: NetworksFilters) => {
  const params = new URLSearchParams();
  if (filters.searchQuery.trim()) params.set("search", filters.searchQuery.trim());
  if (filters.category !== "all") params.set("category", filters.category);
  return params.toString();
};

const matchesSearch = (item: unknown, search: string) => {
  if (!search) return true;
  return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
};

const filterFallback = (filters: NetworksFilters): NetworksDashboardData => {
  const search = filters.searchQuery.trim();
  const show = (category: string) => filters.category === "all" || filters.category === "saved" || filters.category === category;
  return {
    studentNetwork: { ...networksFallbackData.studentNetwork, items: show("students") ? networksFallbackData.studentNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    startupNetwork: { ...networksFallbackData.startupNetwork, items: show("startups") ? networksFallbackData.startupNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    speakerNetwork: { ...networksFallbackData.speakerNetwork, items: show("speakers") ? networksFallbackData.speakerNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    sponsorNetwork: { ...networksFallbackData.sponsorNetwork, items: show("sponsors") ? networksFallbackData.sponsorNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    venueNetwork: { ...networksFallbackData.venueNetwork, items: show("venues") ? networksFallbackData.venueNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    corporateNetwork: { ...networksFallbackData.corporateNetwork, items: show("corporate") ? networksFallbackData.corporateNetwork.items.filter((item) => matchesSearch(item, search)) : [] },
    servicePartners: { ...networksFallbackData.servicePartners, items: show("services") ? networksFallbackData.servicePartners.items.filter((item) => matchesSearch(item, search)) : [] },
  };
};

export const loadNetworksDashboard = async (filters: NetworksFilters): Promise<NetworksDashboardData> => {
  const queryString = buildQueryString(filters);

  try {
    const payload = await fetchJson<Partial<NetworksDashboardData>>(`/dashboard${queryString ? `?${queryString}` : ""}`);

    return {
      studentNetwork: {
        title: getText(payload.studentNetwork?.title, networksFallbackData.studentNetwork.title),
        items: validItems<StudentNetworkItem>(payload.studentNetwork?.items).map(normalizeStudent),
      },
      startupNetwork: {
        title: getText(payload.startupNetwork?.title, networksFallbackData.startupNetwork.title),
        items: validItems<StartupNetworkItem>(payload.startupNetwork?.items).map(normalizeStartup),
      },
      speakerNetwork: {
        title: getText(payload.speakerNetwork?.title, networksFallbackData.speakerNetwork.title),
        items: validItems<SpeakerNetworkItem>(payload.speakerNetwork?.items).map(normalizeSpeaker),
      },
      sponsorNetwork: {
        title: getText(payload.sponsorNetwork?.title, networksFallbackData.sponsorNetwork.title),
        items: validItems<SponsorNetworkItem>(payload.sponsorNetwork?.items).map(normalizeSponsor),
      },
      venueNetwork: {
        title: getText(payload.venueNetwork?.title, networksFallbackData.venueNetwork.title),
        items: validItems<VenueNetworkItem>(payload.venueNetwork?.items).map(normalizeVenue),
      },
      corporateNetwork: {
        title: getText(payload.corporateNetwork?.title, networksFallbackData.corporateNetwork.title),
        items: validItems<CorporateNetworkItem>(payload.corporateNetwork?.items).map(normalizeCorporate),
      },
      servicePartners: {
        title: getText(payload.servicePartners?.title, networksFallbackData.servicePartners.title),
        items: validItems<ServicePartnerItem>(payload.servicePartners?.items).map(normalizeService),
      },
    };
  } catch {
    return filterFallback(filters);
  }
};

export const toggleNetworkBookmark = async (itemId: string, bookmarked: boolean) => {
  try {
    await fetchJson<{ success: boolean }>("/bookmarks", {
      method: bookmarked ? "POST" : "DELETE",
      body: JSON.stringify({ itemId }),
    });
  } catch {
    return;
  }
};

export const connectNetworkItem = async (itemId: string) => {
  try {
    await fetchJson<{ success: boolean }>("/connect", {
      method: "POST",
      body: JSON.stringify({ itemId }),
    });
  } catch {
    return;
  }
};
