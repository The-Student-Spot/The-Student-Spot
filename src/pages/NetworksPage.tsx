import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import StudentDashboardNavLayout from "@/components/layout/StudentDashboardNavLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bookmark, BookmarkCheck, Search, MapPin, Users, Briefcase, Globe, Megaphone, Star, Calendar, Zap, Heart, Building2, Lightbulb, ArrowRight, ExternalLink } from "lucide-react";

const NetworksPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Featured section data
  const featured = useMemo(() => ({
    title: "Featured Networks & Partners",
    description: "Curated networks and partners recommended for you.",
  }), []);

  // STUDENT NETWORK
  const studentNetwork = useMemo(() => ({
    title: "Student Network",
    items: [
      { id: "campus-leader-1", label: "TSS Campus Leaders", members: 12, featured: true },
      { id: "peer-collab", label: "Peer collaboration", members: 84 },
    ],
  }), []);

  // STARTUP NETWORK
  const startupNetwork = useMemo(() => ({
    title: "Startup Network",
    items: [
      { id: "startup-1", name: "SeedSpark", tagline: "AI for social impact", hiring: ["internship","product"], featured: true },
      { id: "startup-2", name: "GreenLoop", tagline: "Circular economy", hiring: ["design"] },
    ],
  }), []);

  // SPEAKER NETWORK
  const speakerNetwork = useMemo(() => ({
    title: "Speaker Network",
    items: [
      { id: "speaker-1", name: "Dr. A. Expert", topic: "Product Management", sessions: ["PM 101"], upcoming: true },
      { id: "speaker-2", name: "Ms. Mentor", topic: "Design Thinking", sessions: ["Design Sprint"], upcoming: false },
    ],
  }), []);

  // SPONSOR NETWORK
  const sponsorNetwork = useMemo(() => ({
    title: "Sponsor Network",
    items: [
      { id: "brand-1", name: "Acme Corp", opportunities: ["Internships","Hiring"], featured: true },
      { id: "brand-2", name: "BrightCo", opportunities: ["Partnerships"] },
    ],
  }), []);

  // VENUE NETWORK
  const venueNetwork = useMemo(() => ({
    title: "Venue Network",
    items: [
      { id: "venue-1", name: "Corner Cafe", type: "Cafe", location: "Central Campus", featured: true },
      { id: "venue-2", name: "Maker Hub", type: "Co-working", location: "North Wing" },
    ],
  }), []);

  // CORPORATE NETWORK
  const corporateNetwork = useMemo(() => ({
    title: "Corporate Network",
    items: [
      { id: "corp-1", name: "GlobalTech", openings: ["Software Engineer","Data Analyst"], featured: true },
      { id: "corp-2", name: "FinServe", openings: ["Business Analyst"] },
    ],
  }), []);

  // SERVICE PARTNERS
  const servicePartners = useMemo(() => ({
    title: "Service Partners",
    items: [
      { id: "svc-legal-1", category: "Legal", name: "LawAssist", services: ["Contract review","Startup compliance"] },
      { id: "svc-fin-1", category: "Finance", name: "LedgerPro", services: ["Tax advisory","Bookkeeping"] },
      { id: "svc-design-1", category: "Design", name: "PixelCraft", services: ["Brand design","UI/UX"] },
      { id: "svc-marketing-1", category: "Marketing", name: "MarketMinds", services: ["Growth strategy","Ads"] },
    ],
  }), []);

  const toggleBookmark = (id: string) => setBookmarks((s) => ({ ...s, [id]: !s[id] }));

  const openApply = (id: string) => {
    setSelectedItem(id);
    setApplyOpen(true);
  };

  const filtered = (items: Record<string, unknown>[]) => {
    if (!query && category === "all") return items;
    return items.filter((it) => {
      const text = JSON.stringify(it).toLowerCase();
      const matchesQuery = query ? text.includes(query.toLowerCase()) : true;
      const matchesCat = category === "all" ? true : (it.type || it.category || "").toString().toLowerCase() === category.toLowerCase();
      return matchesQuery && matchesCat;
    });
  };

  return (
    <StudentDashboardNavLayout activeSection="networks" headerTitle="One Platform. Multiple Networks." headerDescription="A unified ecosystem where students connect with peers, startups, mentors, brands, venues, corporations, and professional service partners.">
      <div className="space-y-12 pb-12">
        {/* PREMIUM HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 p-8 lg:p-12 shadow-2xl border border-orange-400/20"
        >
          {/* Decorative blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-red-400 opacity-20 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">One Platform. Multiple Networks.</h1>
                <p className="text-lg text-orange-50 font-semibold mb-8">Connect with peers, founders, experts, brands, venues, and professional partners in one powerful ecosystem.</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-orange-900 font-bold rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Explore Networks
                </Button>
              </div>

              {/* Floating network chips */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <Users className="h-5 w-5 mb-2" />
                  <p className="text-sm font-semibold">Students</p>
                  <p className="text-xs text-orange-100">10K+ Members</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <Lightbulb className="h-5 w-5 mb-2" />
                  <p className="text-sm font-semibold">Startups</p>
                  <p className="text-xs text-orange-100">500+ Teams</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <Megaphone className="h-5 w-5 mb-2" />
                  <p className="text-sm font-semibold">Experts</p>
                  <p className="text-xs text-orange-100">250+ Speakers</p>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.25 }} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white hover:bg-white/15 transition-all">
                  <Building2 className="h-5 w-5 mb-2" />
                  <p className="text-sm font-semibold">Partners</p>
                  <p className="text-xs text-orange-100">100+ Brands</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NETWORK STATS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-3xl font-black text-orange-600">10K+</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">Students Connected</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-rose-50 to-rose-100 p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-3xl font-black text-rose-600">500+</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">Startups Featured</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-3xl font-black text-yellow-600">250+</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">Expert Speakers</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100 p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-3xl font-black text-green-600">100+</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">Corporate Partners</p>
          </div>
        </div>

        {/* CATEGORY NAVIGATION - PREMIUM PILL TABS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setCategory("all")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              category === "all"
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Featured
          </button>
          {["students", "startups", "speakers", "sponsors", "venues", "corporate", "services"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                category === cat
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Search networks, companies, speakers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 py-3 rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* FEATURED NETWORKS - PREMIUM CAROUSEL */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <div>
              <h2 className="text-2xl font-black text-slate-900">Featured Networks</h2>
              <p className="text-sm text-slate-600">Curated recommendations for you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Student Network */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="group rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all">
              <div className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">{studentNetwork.items[0].label}</p>
                  <p className="text-sm text-slate-600 mt-1">Campus leaders network</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users className="h-4 w-4" />
                  {studentNetwork.items[0].members} active members
                </div>
                <div className="pt-2 space-y-2">
                  <Button onClick={() => openApply(studentNetwork.items[0].id)} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                    Connect Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(studentNetwork.items[0].id)}
                    className="w-full rounded-lg border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    {bookmarks[studentNetwork.items[0].id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Featured Startup Network */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="group rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 overflow-hidden hover:shadow-lg hover:border-rose-300 transition-all">
              <div className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 text-white">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">{startupNetwork.items[0].name}</p>
                  <p className="text-sm text-slate-600 mt-1">{startupNetwork.items[0].tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {startupNetwork.items[0].hiring.map((tag) => (
                    <Badge key={tag} className="bg-rose-200 text-rose-700 font-semibold rounded-full">{tag}</Badge>
                  ))}
                </div>
                <div className="pt-2 space-y-2">
                  <Button onClick={() => openApply(startupNetwork.items[0].id)} className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-lg">
                    Join Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(startupNetwork.items[0].id)}
                    className="w-full rounded-lg border-rose-300 text-rose-600 hover:bg-rose-50"
                  >
                    {bookmarks[startupNetwork.items[0].id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Featured Speaker Network */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="group rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden hover:shadow-lg hover:border-yellow-300 transition-all">
              <div className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">{speakerNetwork.items[0].name}</p>
                  <p className="text-sm text-slate-600 mt-1">Expert in {speakerNetwork.items[0].topic}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                  {speakerNetwork.items[0].upcoming ? "Upcoming session" : "Past sessions"}
                </div>
                <div className="pt-2 space-y-2">
                  <Button onClick={() => openApply(speakerNetwork.items[0].id)} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
                    Register Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(speakerNetwork.items[0].id)}
                    className="w-full rounded-lg border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                  >
                    {bookmarks[speakerNetwork.items[0].id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STUDENT NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Student Network</h2>
              <p className="text-sm text-slate-600">Campus leaders & peer collaborations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentNetwork.items.map((it, idx) => (
              <motion.div key={it.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 hover:shadow-lg hover:border-orange-300 hover:-translate-y-2 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{it.label}</p>
                    {it.featured && <Badge className="bg-orange-200 text-orange-700 font-semibold mt-1">Featured</Badge>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                  <Users className="h-4 w-4 text-orange-600" />
                  {it.members} members
                </div>
                <div className="space-y-3">
                  <Button onClick={() => openApply(it.id)} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold">
                    Join Network
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(it.id)} className="w-full rounded-lg border-orange-300 text-orange-600 hover:bg-orange-50">
                    {bookmarks[it.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save for later
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STARTUP NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 text-white">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Startup Network</h2>
              <p className="text-sm text-slate-600">Discover and join innovative teams</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {startupNetwork.items.map((s, idx) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6 hover:shadow-lg hover:border-rose-300 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white mb-4">
                  <Lightbulb className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{s.name}</p>
                <p className="text-sm text-slate-600 mt-2">{s.tagline}</p>
                {s.featured && <Badge className="bg-rose-200 text-rose-700 font-semibold mt-3">Featured</Badge>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {s.hiring.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-xs border-rose-300 text-rose-700">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(s.id)} className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold">
                    Join Team
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(s.id)} className="w-full rounded-lg border-rose-300 text-rose-600 hover:bg-rose-50">
                    {bookmarks[s.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SPEAKER NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Speaker Network</h2>
              <p className="text-sm text-slate-600">Learn from industry experts and mentors</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {speakerNetwork.items.map((sp, idx) => (
              <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6 hover:shadow-lg hover:border-yellow-300 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white mb-4">
                  <Megaphone className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{sp.name}</p>
                <p className="text-sm text-slate-600 mt-2">Expert in <span className="font-semibold">{sp.topic}</span></p>
                {sp.upcoming && <Badge className="bg-yellow-200 text-yellow-800 font-semibold mt-3">Upcoming Session</Badge>}
                <div className="mt-4 text-sm text-slate-700">
                  <p className="font-semibold mb-2">Sessions:</p>
                  <div className="flex flex-wrap gap-2">
                    {sp.sessions.map((session) => (
                      <Badge key={session} variant="outline" className="rounded-full text-xs border-yellow-300 text-yellow-700">{session}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(sp.id)} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold">
                    Register Now
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)} className="w-full rounded-lg border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                    {bookmarks[sp.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SPONSOR NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Sponsor Network</h2>
              <p className="text-sm text-slate-600">Connect with brands and leading companies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sponsorNetwork.items.map((sp, idx) => (
              <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6 hover:shadow-lg hover:border-green-300 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white mb-4">
                  <Star className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{sp.name}</p>
                <p className="text-sm text-slate-600 mt-2">Brand & partnerships</p>
                {sp.featured && <Badge className="bg-green-200 text-green-700 font-semibold mt-3">Featured Partner</Badge>}
                <div className="mt-4 text-sm text-slate-700">
                  <p className="font-semibold mb-2">Opportunities:</p>
                  <div className="flex flex-wrap gap-2">
                    {sp.opportunities.map((opp) => (
                      <Badge key={opp} variant="outline" className="rounded-full text-xs border-green-300 text-green-700">{opp}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(sp.id)} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                    Connect
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)} className="w-full rounded-lg border-green-300 text-green-600 hover:bg-green-50">
                    {bookmarks[sp.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VENUE NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Venue Network</h2>
              <p className="text-sm text-slate-600">Discover cafes, co-working spaces, and event venues</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venueNetwork.items.map((v, idx) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 hover:shadow-lg hover:border-orange-300 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-4">
                  <MapPin className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{v.name}</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                  <Badge variant="outline" className="rounded-full text-xs border-orange-300 text-orange-700">{v.type}</Badge>
                  <span className="font-semibold">{v.location}</span>
                </div>
                {v.featured && <Badge className="bg-orange-200 text-orange-700 font-semibold mt-3">Popular Venue</Badge>}
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(v.id)} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold">
                    Book Now
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(v.id)} className="w-full rounded-lg border-orange-300 text-orange-600 hover:bg-orange-50">
                    {bookmarks[v.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CORPORATE NETWORK SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-white">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Corporate Network</h2>
              <p className="text-sm text-slate-600">Connect with leading corporations and hiring partners</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {corporateNetwork.items.map((c, idx) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-slate-300 bg-gradient-to-br from-slate-50 to-white p-6 hover:shadow-lg hover:border-slate-400 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 text-white mb-4">
                  <Briefcase className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{c.name}</p>
                <p className="text-sm text-slate-600 mt-2">Company partnerships & hiring</p>
                {c.featured && <Badge className="bg-slate-200 text-slate-700 font-semibold mt-3">Top Recruiter</Badge>}
                <div className="mt-4 text-sm text-slate-700">
                  <p className="font-semibold mb-2">Open Positions:</p>
                  <div className="flex flex-wrap gap-2">
                    {c.openings.map((opening) => (
                      <Badge key={opening} variant="outline" className="rounded-full text-xs border-slate-300 text-slate-700">{opening}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(c.id)} className="w-full bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold">
                    Explore Roles
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(c.id)} className="w-full rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50">
                    {bookmarks[c.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICE PARTNERS SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Service Partners</h2>
              <p className="text-sm text-slate-600">Legal, finance, design, marketing professionals</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePartners.items.map((sp, idx) => (
              <motion.div key={sp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 hover:shadow-lg hover:border-amber-300 hover:-translate-y-2 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white mb-4">
                  <Zap className="h-7 w-7" />
                </div>
                <p className="text-lg font-bold text-slate-900">{sp.name}</p>
                <Badge className="bg-amber-200 text-amber-700 font-semibold mt-2">{sp.category}</Badge>
                <div className="mt-4 text-sm text-slate-700">
                  <p className="font-semibold mb-2">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {sp.services.map((service) => (
                      <Badge key={service} variant="outline" className="rounded-full text-xs border-amber-300 text-amber-700">{service}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => openApply(sp.id)} className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold">
                    Connect
                  </Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)} className="w-full rounded-lg border-amber-300 text-amber-600 hover:bg-amber-50">
                    {bookmarks[sp.id] ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONNECT DIALOG */}
        <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Connect with Network</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <p className="text-slate-700">Connect with <strong className="text-orange-600">{selectedItem}</strong> and expand your opportunities in The Student Spot ecosystem.</p>
              <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                <p className="text-sm text-slate-700"><span className="font-semibold">What happens next:</span> Your profile will be shared with this network and they'll be able to reach out to you directly.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => { setApplyOpen(false); }} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold">
                  Confirm Connection
                </Button>
                <Button variant="outline" onClick={() => setApplyOpen(false)} className="flex-1 rounded-lg border-slate-300">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Loading skeleton */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        ) : null}
      </div>
    </StudentDashboardNavLayout>
  );
};

export default NetworksPage;
