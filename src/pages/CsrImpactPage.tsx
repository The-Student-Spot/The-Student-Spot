import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
  ArrowRight,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Flame,
  Heart,
  Search,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  Award,
  Globe,
} from "lucide-react";
import {
  csrImpactFallbackData,
  joinCsrImpactItem,
  loadCsrImpactDashboard,
  loadCsrImpactProgramDetails,
  shareCsrImpactItem,
  toggleCsrImpactBookmark,
  type CampaignItem,
  type CsrImpactItemType,
  type OpportunityItem,
  type OutcomeItem,
  type ProgramItem,
} from "@/lib/csrImpactApi";

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
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: delay * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const pulseVariants = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(249, 115, 22, 0.7)",
      "0 0 0 10px rgba(249, 115, 22, 0)",
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};

const CsrImpactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [programCategory, setProgramCategory] = useState("All");
  const [opportunityCategory, setOpportunityCategory] = useState("All");
  const [campaignCategory, setCampaignCategory] = useState("All");
  const [programs, setPrograms] = useState<ProgramItem[]>(csrImpactFallbackData.programs);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(csrImpactFallbackData.opportunities);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(csrImpactFallbackData.campaigns);
  const [outcomes, setOutcomes] = useState<OutcomeItem[]>(csrImpactFallbackData.outcomes);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [joinedPrograms, setJoinedPrograms] = useState<Record<string, boolean>>({});
  const [joinedOpportunities, setJoinedOpportunities] = useState<Record<string, boolean>>({});
  const [joinedCampaigns, setJoinedCampaigns] = useState<Record<string, boolean>>({});
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [shareNotice, setShareNotice] = useState("");
  const selectedProgramId = selectedProgram?.id;

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      const data = await loadCsrImpactDashboard({
        searchQuery,
        programCategory,
        opportunityCategory,
        campaignCategory,
      });

      if (!active) return;

      setPrograms(data.programs);
      setOpportunities(data.opportunities);
      setCampaigns(data.campaigns);
      setOutcomes(data.outcomes);
      setIsLoading(false);
    };

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [searchQuery, programCategory, opportunityCategory, campaignCategory]);

  useEffect(() => {
    if (!selectedProgramId) return;

    let active = true;

    const loadDetails = async () => {
      const details = await loadCsrImpactProgramDetails(selectedProgramId);
      if (active) {
        setSelectedProgram(details);
      }
    };

    void loadDetails();

    return () => {
      active = false;
    };
  }, [selectedProgramId]);

  const totalSaved = Object.values(savedItems).filter(Boolean).length;

  const toggleSaved = (itemType: CsrImpactItemType, id: string) => {
    const nextState = !savedItems[id];
    setSavedItems((current) => ({ ...current, [id]: nextState }));
    void toggleCsrImpactBookmark(itemType, id, nextState);
  };

  const markJoined = (
    itemType: CsrImpactItemType,
    setter: Dispatch<SetStateAction<Record<string, boolean>>>,
    id: string,
  ) => {
    setter((current) => ({ ...current, [id]: true }));
    void joinCsrImpactItem(itemType, id);
  };

  const shareItem = async (title: string, description: string) => {
    const usedNativeShare = await shareCsrImpactItem(title, description);
    if (!usedNativeShare) {
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
      <div className="space-y-8 pb-6">
        {/* Premium Hero Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-rose-600 px-6 py-12 lg:px-10 lg:py-16 shadow-2xl"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-rose-400 opacity-20 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Make Impact Now</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Drive Impact <span className="text-yellow-300">Beyond Careers</span>
              </h1>
              <p className="text-base sm:text-lg text-orange-50 max-w-2xl leading-relaxed">
                Contribute to meaningful causes, lead community initiatives, empower underserved populations, and create measurable social change. Transform your passion into action.
              </p>
              <Button className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-semibold px-6 py-3 h-auto rounded-full text-base shadow-lg hover:shadow-xl transition-all">
                Explore Impact <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Floating Metric Chips */}
            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-4 xl:gap-3">
              <motion.div variants={floatingVariants} animate="animate" className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                <p className="text-xs font-semibold text-orange-100">Total Students</p>
                <p className="text-2xl font-bold mt-1">10K+</p>
              </motion.div>
              <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: "0.2s" }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                <p className="text-xs font-semibold text-orange-100">Programs</p>
                <p className="text-2xl font-bold mt-1">{programs.length}00+</p>
              </motion.div>
              <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: "0.4s" }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                <p className="text-xs font-semibold text-orange-100">NGO Partners</p>
                <p className="text-2xl font-bold mt-1">100+</p>
              </motion.div>
              <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: "0.6s" }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                <p className="text-xs font-semibold text-orange-100">Certificates</p>
                <p className="text-2xl font-bold mt-1">5K+</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Search & Filter Card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl border-slate-200 p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div className="space-y-3">
                <Label htmlFor="csr-search" className="text-sm font-semibold text-slate-700">Search everything</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="csr-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search programs, opportunities, campaigns..."
                    className="pl-10 py-2.5 rounded-xl border-slate-200 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Filter Programs</Label>
                  <Select value={programCategory} onValueChange={setProgramCategory}>
                    <SelectTrigger className="rounded-xl">
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
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Filter Opportunities</Label>
                  <Select value={opportunityCategory} onValueChange={setOpportunityCategory}>
                    <SelectTrigger className="rounded-xl">
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
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Filter Campaigns</Label>
                  <Select value={campaignCategory} onValueChange={setCampaignCategory}>
                    <SelectTrigger className="rounded-xl">
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
            {shareNotice && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {shareNotice}
              </motion.p>
            )}
          </Card>
        </motion.div>

        {/* Programs Section */}
        <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌱</span>
              <h2 className="text-3xl font-bold text-slate-900">Programs for Change</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">Join our core impact tracks and lead initiatives that create real, measurable social change in communities.</p>
          </div>

          {isLoading ? (
            renderLoadingCards(3)
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {programs.map((program, index) => {
                const isSaved = Boolean(savedItems[program.id]);
                const isJoined = Boolean(joinedPrograms[program.id]);
                const categoryColors: Record<string, string> = {
                  Community: "border-t-green-500",
                  Gender: "border-t-pink-500",
                  Education: "border-t-orange-500",
                  "Default": "border-t-rose-500",
                };

                return (
                  <motion.div
                    key={program.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className={`h-full rounded-2xl border-slate-200 border-t-4 ${categoryColors[program.category] || categoryColors["Default"]} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-slate-50 backdrop-blur-sm bg-white/80`}>
                      <div className="flex h-full flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <motion.div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                            <program.icon className="h-8 w-8" />
                          </motion.div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{program.title}</h3>
                            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{program.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold">{program.status}</Badge>
                          <Badge className="bg-slate-100 text-slate-700 font-medium">
                            <Users className="h-3 w-3 mr-1" />
                            {program.participants} joined
                          </Badge>
                        </div>

                        <div className="space-y-3 flex-grow">
                          <div className="text-sm text-slate-600 font-medium">
                            Category: <span className="text-slate-900 font-semibold">{program.category}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                          <Button
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg"
                            onClick={() => markJoined("program", setJoinedPrograms, program.id)}
                            disabled={isJoined}
                          >
                            {isJoined ? "✓ Joined" : "Join Now"}
                          </Button>
                          <Button variant="outline" onClick={() => toggleSaved("program", program.id)} className="rounded-lg">
                            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" onClick={() => setSelectedProgram(program)} className="rounded-lg">
                            <Eye className="h-4 w-4" />
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
              description="Adjust the program category or search term to discover more impact opportunities."
            />
          )}
        </motion.section>

        {/* Opportunities Section */}
        <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              <h2 className="text-3xl font-bold text-slate-900">Opportunities to Contribute</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">Volunteer, intern, or lead impact projects. Build experience while making a difference.</p>
          </div>

          {isLoading ? (
            renderLoadingCards(3)
          ) : opportunities.length > 0 ? (
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => {
                const isSaved = Boolean(savedItems[opportunity.id]);
                const isJoined = Boolean(joinedOpportunities[opportunity.id]);

                return (
                  <motion.div
                    key={opportunity.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="rounded-2xl border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 bg-gradient-to-br from-white to-slate-50/50">
                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Left: Icon/Logo */}
                        <div className="flex-shrink-0">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-md">
                            <opportunity.icon className="h-10 w-10" />
                          </div>
                        </div>

                        {/* Center: Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">{opportunity.organization}</p>
                              <h3 className="text-xl font-bold text-slate-900 mt-1">{opportunity.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Badge className="bg-orange-100 text-orange-700 text-xs font-semibold">
                                <Clock3 className="h-3 w-3 mr-1" />
                                {opportunity.duration}
                              </Badge>
                              <Badge className="bg-slate-100 text-slate-700 text-xs font-semibold">{opportunity.locationTag}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{opportunity.description}</p>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Skills You'll Gain</p>
                              <div className="flex flex-wrap gap-2">
                                {opportunity.skillsGained.map((skill) => (
                                  <Badge key={skill} className="bg-yellow-100 text-yellow-800 font-medium text-xs">
                                    ✨ {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Eligibility</p>
                              <p className="text-sm text-slate-700">{opportunity.eligibility}</p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-2 w-full md:w-auto md:flex-shrink-0">
                          <Button
                            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg w-full md:w-auto"
                            onClick={() => markJoined("opportunity", setJoinedOpportunities, opportunity.id)}
                            disabled={isJoined}
                          >
                            {isJoined ? "✓ Applied" : "Apply Now"}
                          </Button>
                          <div className="flex gap-2 w-full md:w-auto">
                            <Button variant="outline" onClick={() => toggleSaved("opportunity", opportunity.id)} className="flex-1 md:flex-none rounded-lg">
                              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" onClick={() => shareItem(opportunity.title, opportunity.description)} className="flex-1 md:flex-none rounded-lg">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
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

        {/* Campaigns Section */}
        <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📢</span>
              <h2 className="text-3xl font-bold text-slate-900">Active Campaigns</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">Join ongoing campaigns that drive awareness, funding, education, and rural development.</p>
          </div>

          {isLoading ? (
            renderLoadingCards(4)
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {campaigns.map((campaign, index) => {
                const isSaved = Boolean(savedItems[campaign.id]);
                const isJoined = Boolean(joinedCampaigns[campaign.id]);
                const progress = Math.floor(Math.random() * 60) + 30; // Simulated progress

                return (
                  <motion.div
                    key={campaign.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="rounded-2xl border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 bg-gradient-to-br from-white via-slate-50 to-white">
                      <div className="flex h-full flex-col gap-5">
                        {/* Header with icon and status */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-md flex-shrink-0">
                              <campaign.icon className="h-7 w-7" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold text-slate-900">{campaign.title}</h3>
                              <p className="text-sm text-slate-600 font-medium">{campaign.organizer}</p>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold flex-shrink-0">
                            {campaign.status}
                          </Badge>
                        </div>

                        {/* Campaign details grid */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Goal</p>
                            <p className="text-slate-900 font-semibold">{campaign.goal}</p>
                          </div>
                          <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Timeline</p>
                            <p className="text-slate-900 font-semibold">{campaign.timeline}</p>
                          </div>
                        </div>

                        {/* Beneficiaries */}
                        <div className="rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-semibold text-orange-600 uppercase mb-1">Beneficiaries Reached</p>
                              <p className="text-2xl font-bold text-orange-900">{campaign.beneficiaries}</p>
                            </div>
                            <Globe className="h-8 w-8 text-orange-400 opacity-50" />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-600">Campaign Progress</span>
                            <span className="text-sm font-bold text-slate-900">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-3 rounded-full" />
                        </div>

                        {/* Action buttons */}
                        <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100">
                          <Button
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg"
                            onClick={() => markJoined("campaign", setJoinedCampaigns, campaign.id)}
                            disabled={isJoined}
                          >
                            {isJoined ? "✓ Joined" : "Join Campaign"}
                          </Button>
                          <Button variant="outline" onClick={() => toggleSaved("campaign", campaign.id)} className="rounded-lg" size="icon">
                            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </Button>
                          <Button variant="outline" onClick={() => shareItem(campaign.title, campaign.goal)} className="rounded-lg" size="icon">
                            <Share2 className="h-4 w-4" />
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
              description="Use the campaign category filter or search bar to reveal more campaign cards."
            />
          )}
        </motion.section>

        {/* Outcomes Analytics Section */}
        <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📈</span>
              <h2 className="text-3xl font-bold text-slate-900">Measurable Outcomes</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">Track the real-world impact and social change metrics of our programs and campaigns.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="rounded-2xl border-slate-200 p-6 space-y-5">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-32 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="h-full rounded-2xl border-slate-200 p-6 bg-gradient-to-br from-white to-slate-50/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="space-y-5 h-full flex flex-col">
                      {/* Header with trend */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{outcome.label}</p>
                          <Badge
                            className={`flex-shrink-0 font-semibold ${outcome.trendPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            <ArrowUpRight className={`h-3.5 w-3.5 mr-1 ${!outcome.trendPositive && "rotate-180"}`} />
                            {outcome.trendLabel}
                          </Badge>
                        </div>

                        {/* Animated metric display */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          className="space-y-1"
                        >
                          <p className="text-4xl font-black text-slate-900">{outcome.metric}</p>
                          <p className="text-sm text-slate-600 font-medium">{outcome.summary}</p>
                        </motion.div>
                      </div>

                      {/* Circular Progress Indicator */}
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-700">Achievement</span>
                          <span className="text-slate-600 font-bold">{outcome.progress}%</span>
                        </div>
                        <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${outcome.progress}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Analytics breakdown */}
                      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 space-y-3">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <BarChart3 className="h-4 w-4 text-orange-600" />
                          Key Metrics
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {outcome.analytics.map((item, idx) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 + 0.4 }}
                              className="rounded-lg bg-white border border-slate-200 p-3 text-center hover:bg-orange-50 transition-colors"
                            >
                              <p className="text-xs text-slate-600 font-semibold mb-2 uppercase">{item.label}</p>
                              <p className="text-lg font-bold text-slate-900">{item.value}</p>
                            </motion.div>
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

        {/* My Impact Personal Dashboard */}
        <motion.section custom={4} variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">✨</span>
              <h2 className="text-3xl font-bold text-slate-900">Your Impact Dashboard</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">Track your personal contributions and achievements across all CSR initiatives.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Hours Volunteered */}
            <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible">
              <Card className="rounded-2xl border-slate-200 p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-sm hover:shadow-lg transition-all">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md">
                      <Heart className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">+12%</span>
                  </div>
                  <div className="flex-grow">
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-black text-slate-900">
                      {Object.values(joinedPrograms).filter(Boolean).length * 24}
                    </motion.p>
                    <p className="text-sm text-slate-700 font-semibold mt-2">Hours Volunteered</p>
                  </div>
                  <div className="pt-3 border-t border-rose-200">
                    <p className="text-xs text-slate-600">Contributed this month</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Campaigns Joined */}
            <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
              <Card className="rounded-2xl border-slate-200 p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-sm hover:shadow-lg transition-all">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-md">
                      <Flame className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Active</span>
                  </div>
                  <div className="flex-grow">
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-black text-slate-900">
                      {Object.values(joinedCampaigns).filter(Boolean).length}
                    </motion.p>
                    <p className="text-sm text-slate-700 font-semibold mt-2">Campaigns Joined</p>
                  </div>
                  <div className="pt-3 border-t border-orange-200">
                    <p className="text-xs text-slate-600">You're leading change</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Certificates Earned */}
            <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
              <Card className="rounded-2xl border-slate-200 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-sm hover:shadow-lg transition-all">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md">
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">New</span>
                  </div>
                  <div className="flex-grow">
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-black text-slate-900">
                      {Object.values(joinedOpportunities).filter(Boolean).length}
                    </motion.p>
                    <p className="text-sm text-slate-700 font-semibold mt-2">Certificates Earned</p>
                  </div>
                  <div className="pt-3 border-t border-yellow-200">
                    <p className="text-xs text-slate-600">Skill certification progress</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Communities Impacted */}
            <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
              <Card className="rounded-2xl border-slate-200 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm hover:shadow-lg transition-all">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Growing</span>
                  </div>
                  <div className="flex-grow">
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-black text-slate-900">
                      {Math.floor((Object.values(joinedPrograms).filter(Boolean).length + Object.values(joinedCampaigns).filter(Boolean).length) * 15)}
                    </motion.p>
                    <p className="text-sm text-slate-700 font-semibold mt-2">Communities Reached</p>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-xs text-slate-600">Direct beneficiaries</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer info card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-orange-50 to-rose-50 p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Ready to make impact?</h3>
              <p className="text-slate-600 max-w-xl">
                Our backend-powered dashboard seamlessly connects filters, bookmarks, join actions, and analytics to create a cohesive impact experience. Data drives every decision.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
              <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold px-4 py-2">📊 Analytics</Badge>
              <Badge className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 font-semibold px-4 py-2">🔄 Responsive</Badge>
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold px-4 py-2">🎯 Filters</Badge>
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={Boolean(selectedProgram)} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="sm:max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">{selectedProgram?.title}</DialogTitle>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-5">
              <p className="text-slate-700 text-base leading-relaxed">{selectedProgram.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 font-semibold px-3 py-1.5">
                  📚 {selectedProgram.category}
                </Badge>
                <Badge className="bg-green-100 text-green-700 font-semibold px-3 py-1.5">
                  ✓ {selectedProgram.status}
                </Badge>
                <Badge className="bg-slate-100 text-slate-700 font-semibold px-3 py-1.5">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {selectedProgram.participants} joined
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Program Details</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedProgram.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 text-sm text-slate-700 font-medium hover:bg-gradient-to-br hover:from-orange-50 hover:to-slate-100 transition-all"
                    >
                      ✓ {detail}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                <Button
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg"
                  onClick={() => {
                    markJoined("program", setJoinedPrograms, selectedProgram.id);
                    setSelectedProgram(null);
                  }}
                  disabled={Boolean(joinedPrograms[selectedProgram.id])}
                >
                  {joinedPrograms[selectedProgram.id] ? "✓ You've Joined" : "Join Program"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleSaved("program", selectedProgram.id)}
                  className="rounded-lg"
                >
                  {savedItems[selectedProgram.id] ? (
                    <>
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
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
