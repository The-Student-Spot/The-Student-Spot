import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import StudentDashboardNavLayout from "@/components/layout/StudentDashboardNavLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bookmark, BookmarkCheck, Search, MapPin, Users, Briefcase, Globe, Megaphone, Star, Calendar } from "lucide-react";

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

  const filtered = (items: any[]) => {
    if (!query && category === "all") return items;
    return items.filter((it) => {
      const text = JSON.stringify(it).toLowerCase();
      const matchesQuery = query ? text.includes(query.toLowerCase()) : true;
      const matchesCat = category === "all" ? true : (it.type || it.category || "").toLowerCase() === category.toLowerCase();
      return matchesQuery && matchesCat;
    });
  };

  return (
    <StudentDashboardNavLayout activeSection="networks" headerTitle="One Platform. Multiple Networks." headerDescription="A unified ecosystem where students connect with peers, startups, mentors, brands, venues, corporations, and professional service partners.">
      <div className="space-y-6">
        {/* Global Utilities */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Input placeholder="Search networks" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button variant="outline" onClick={() => setQuery("")}>Clear</Button>
          </div>
          <div className="flex gap-2 items-center">
            <Badge>Featured</Badge>
            <Button onClick={() => setCategory("all")}>All</Button>
            <Button onClick={() => setCategory("students")}>Students</Button>
            <Button onClick={() => setCategory("startups")}>Startups</Button>
            <Button onClick={() => setCategory("speakers")}>Speakers</Button>
            <Button onClick={() => setCategory("sponsors")}>Sponsors</Button>
            <Button onClick={() => setCategory("venues")}>Venues</Button>
            <Button onClick={() => setCategory("corporate")}>Corporate</Button>
            <Button onClick={() => setCategory("services")}>Service Partners</Button>
          </div>
        </div>

        {/* Featured Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Featured</h3>
          <p className="text-sm text-slate-600">{featured.description}</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{studentNetwork.items[0].label}</p>
                  <p className="text-xs text-muted-foreground">Featured campus leaders card</p>
                </div>
                <div className="text-sm text-slate-600">{studentNetwork.items[0].members} members</div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => openApply(studentNetwork.items[0].id)}>Connect with campus leaders</Button>
                <Button variant="outline" onClick={() => toggleBookmark(studentNetwork.items[0].id)}>
                  {bookmarks[studentNetwork.items[0].id] ? <BookmarkCheck /> : <Bookmark />} Save
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{startupNetwork.items[0].name}</p>
                  <p className="text-xs text-muted-foreground">Startup discovery cards</p>
                </div>
                <div className="text-sm text-slate-600">Tags: {startupNetwork.items[0].hiring.join(", ")}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => openApply(startupNetwork.items[0].name)}>Join startup team</Button>
                <Button variant="outline" onClick={() => toggleBookmark(startupNetwork.items[0].name)}>
                  {bookmarks[startupNetwork.items[0].name] ? <BookmarkCheck /> : <Bookmark />} Save
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{speakerNetwork.items[0].name}</p>
                  <p className="text-xs text-muted-foreground">Speaker spotlight section</p>
                </div>
                <div className="text-sm text-slate-600">Upcoming: {speakerNetwork.items[0].upcoming ? "Yes" : "No"}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => openApply(speakerNetwork.items[0].id)}>Register for session</Button>
                <Button variant="outline" onClick={() => toggleBookmark(speakerNetwork.items[0].id)}>
                  {bookmarks[speakerNetwork.items[0].id] ? <BookmarkCheck /> : <Bookmark />} Save
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 1: Student Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Student Network</h3>
          <p className="text-sm text-slate-600">Campus leaders – TSS Campus Leaders · Peer collaboration</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentNetwork.items.map((it) => (
              <Card key={it.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{it.label}</p>
                    <p className="text-xs text-muted-foreground">{it.featured ? "Featured campus leaders card" : "Peer community"}</p>
                  </div>
                  <div className="text-sm text-slate-600">{it.members} members</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(it.id)}>Join network</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(it.id)}>
                    {bookmarks[it.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Activity feed (placeholder)</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: Startup Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Startup Network</h3>
          <p className="text-sm text-slate-600">Discover startups · Join teams</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {startupNetwork.items.map((s) => (
              <Card key={s.id} className="p-4">
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.tagline}</p>
                <div className="mt-2 text-xs">Hiring tags: {s.hiring.join(", ")}</div>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(s.id)}>Join startup team</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(s.id)}>
                    {bookmarks[s.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Speaker Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Speaker Network</h3>
          <p className="text-sm text-slate-600">Learn from experts · Attend sessions</p>
          <div className="mt-3 space-y-3">
            {speakerNetwork.items.map((sp) => (
              <Card key={sp.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{sp.name}</p>
                  <p className="text-xs text-muted-foreground">Expert profile · Topics: {sp.topic}</p>
                  <p className="text-xs mt-1">Sessions: {sp.sessions.join(", ")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => openApply(sp.id)}>Register CTA</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)}>
                    {bookmarks[sp.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 4: Sponsor Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Sponsor Network</h3>
          <p className="text-sm text-slate-600">Brands & companies · Opportunities & hiring</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sponsorNetwork.items.map((sp) => (
              <Card key={sp.id} className="p-4">
                <p className="font-semibold">{sp.name}</p>
                <p className="text-xs text-muted-foreground">Brand profiles · Partnerships</p>
                <div className="mt-2 text-xs">Opportunities: {sp.opportunities.join(", ")}</div>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(sp.id)}>Apply / Connect</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)}>
                    {bookmarks[sp.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 5: Venue Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Venue Network</h3>
          <p className="text-sm text-slate-600">Cafes · Co-working spaces · Event venues · Clubs / community spaces</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {venueNetwork.items.map((v) => (
              <Card key={v.id} className="p-4">
                <p className="font-semibold">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.type} · {v.location}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(v.id)}>Booking / Connect</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(v.id)}>
                    {bookmarks[v.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 6: Corporate Network */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Corporate Network</h3>
          <p className="text-sm text-slate-600">Hiring partners · Innovation teams</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corporateNetwork.items.map((c) => (
              <Card key={c.id} className="p-4">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">Company profiles · Innovation collaborations</p>
                <div className="mt-2 text-xs">Openings: {c.openings.join(", ")}</div>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(c.id)}>Networking Connect</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(c.id)}>
                    {bookmarks[c.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 7: Service Partners */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">Service Partners</h3>
          <p className="text-sm text-slate-600">Legal · Finance · Design · Marketing</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicePartners.items.map((sp) => (
              <Card key={sp.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{sp.name}</p>
                    <p className="text-xs text-muted-foreground">Category: {sp.category}</p>
                  </div>
                  <div className="text-xs text-slate-600">Services: {sp.services.join(", ")}</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => openApply(sp.id)}>Connect CTA</Button>
                  <Button variant="outline" onClick={() => toggleBookmark(sp.id)}>
                    {bookmarks[sp.id] ? <BookmarkCheck /> : <Bookmark />} Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Loading / Empty states */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ) : null}

        {/* Apply / Register Dialog (simple backend-ready dialog) */}
        <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect / Apply</DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <p className="text-sm">This will trigger the backend connect/apply flow for <strong>{selectedItem}</strong>.</p>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => { /* placeholder for backend call */ setApplyOpen(false); }}>Confirm</Button>
                <Button variant="outline" onClick={() => setApplyOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StudentDashboardNavLayout>
  );
};

export default NetworksPage;
