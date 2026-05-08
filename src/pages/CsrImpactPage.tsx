import { useState, useMemo, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GraduationCap, MapPin, Users, Clock, RefreshCw, Bookmark, CheckCircle, Upload, X, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const programsData = [
  {
    id: "rural",
    title: "Rural Development",
    description: "Work with communities to build sustainable livelihoods.",
    category: "Community",
    participants: 124,
  },
  {
    id: "women",
    title: "Women Empowerment",
    description: "Skills and leadership programs for women and girls.",
    category: "Gender",
    participants: 98,
  },
  {
    id: "student",
    title: "Student Empowerment",
    description: "Peer programs that help students lead local initiatives.",
    category: "Education",
    participants: 212,
  },
];

const opportunitiesData = [
  { id: "vol-1", org: "HelpingHands", role: "Volunteer", duration: "3 months", remote: false, skills: ["Community Outreach", "Communication"] },
  { id: "ngo-1", org: "GreenFuture NGO", role: "Intern", duration: "6 months", remote: true, skills: ["Research", "Project Management"] },
  { id: "proj-1", org: "Impact Lab", role: "Project Member", duration: "1 month", remote: false, skills: ["Design", "Reporting"] },
];

const campaignsData = [
  { id: "camp-1", title: "Awareness Drive", organizer: "City Youth", goal: "Reach 10k people", beneficiaries: "Urban youth", deadline: "2026-06-30" },
  { id: "camp-2", title: "Fundraising Initiative", organizer: "Charity A", goal: "Raise $50k", beneficiaries: "Rural families", deadline: "2026-09-10" },
  { id: "camp-3", title: "Free Education Program", organizer: "EduTrust", goal: "Enroll 500 students", beneficiaries: "School children", deadline: "2026-07-15" },
  { id: "camp-4", title: "Rural Skill Camps", organizer: "SkillUp", goal: "Train 200 beneficiaries", beneficiaries: "Rural youth", deadline: "2026-08-20" },
];

const CsrImpactPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ category: "All", location: "All", duration: "Any", remote: "Any" });
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [openApply, setOpenApply] = useState(false);
  const [activeOpportunity, setActiveOpportunity] = useState<any>(null);
  const [certificates, setCertificates] = useState([
    { id: 1, title: "Community Leader", issuer: "Issued: 2025-11-01", imageUrl: "" },
  ]);
  const [certificateDialog, setCertificateDialog] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const certificateInputRef = useRef<HTMLInputElement | null>(null);

  const filteredPrograms = useMemo(() => programsData, [filters]);
  const filteredOpportunities = useMemo(() => opportunitiesData, [filters]);
  const filteredCampaigns = useMemo(() => campaignsData, [filters]);

  const handleBookmark = (id: string) => setBookmarked((s) => ({ ...s, [id]: !s[id] }));
  const handleApply = (id: string) => {
    setApplied((s) => ({ ...s, [id]: true }));
  };

  const handleCertificateImageUpload = (e: React.ChangeEvent<HTMLInputElement>, certId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificates(
        certificates.map((cert) =>
          cert.id === certId
            ? { ...cert, imageUrl: reader.result as string }
            : cert
        )
      );
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const addNewCertificate = () => {
    if (!newCertTitle.trim()) return;
    const newCert = {
      id: Date.now(),
      title: newCertTitle,
      issuer: newCertIssuer || new Date().toLocaleDateString(),
      imageUrl: "",
    };
    setCertificates([...certificates, newCert]);
    setNewCertTitle("");
    setNewCertIssuer("");
    setCertificateDialog(false);
  };

  const removeCertificate = (certId: number) => {
    setCertificates(certificates.filter((cert) => cert.id !== certId));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <main className="space-y-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Drive Impact Beyond Careers</h1>
              <p className="text-sm text-muted-foreground mt-1">Help students contribute to society while building skills, leadership, and real-world impact.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" onClick={() => window.location.reload()}><RefreshCw className="h-4 w-4" /></Button>
            </div>
          </header>

          {/* Filters */}
          <Card className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <Label>Category</Label>
                <Input value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
              </div>
              <div>
                <Label>Duration</Label>
                <Input value={filters.duration} onChange={(e) => setFilters({ ...filters, duration: e.target.value })} />
              </div>
              <div>
                <Label>Remote / On-site</Label>
                <Input value={filters.remote} onChange={(e) => setFilters({ ...filters, remote: e.target.value })} />
              </div>
            </div>
          </Card>

          {/* Section 1 — Programs */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrograms.map((p) => (
                <Card key={p.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-500">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{p.title}</h3>
                        <Badge className="bg-yellow-50 text-yellow-700">{p.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">{p.participants} participants</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => { setActiveOpportunity(p); setOpenApply(true); }}>Apply</Button>
                          <Button variant="ghost" size="icon" onClick={() => handleBookmark(p.id)}>
                            <Bookmark className={`h-4 w-4 ${bookmarked[p.id] ? 'text-yellow-500' : 'text-slate-400'}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 2 — Opportunities */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpportunities.map((op) => (
                <Card key={op.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center">
                      <Users className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{op.org}</div>
                          <div className="text-sm text-muted-foreground">{op.role} • {op.duration}</div>
                        </div>
                        <Badge className="bg-slate-50 text-slate-700">{op.remote ? 'Remote' : 'On-site'}</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {op.skills.map((s: string) => <Badge key={s} className="bg-yellow-50 text-yellow-700">{s}</Badge>)}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button size="sm" onClick={() => { setActiveOpportunity(op); setOpenApply(true); handleApply(op.id); }}>Apply</Button>
                        <Button variant="ghost" size="icon" onClick={() => handleBookmark(op.id)}>
                          <Bookmark className={`h-4 w-4 ${bookmarked[op.id] ? 'text-yellow-500' : 'text-slate-400'}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 3 — Campaigns */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredCampaigns.map((c) => (
                <Card key={c.id} className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.organizer}</p>
                    <p className="text-sm text-slate-600 mt-2">Goal: {c.goal}</p>
                    <p className="text-sm text-slate-600">Beneficiaries: {c.beneficiaries}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Deadline: {c.deadline}</div>
                    <div>
                      <Button size="sm" onClick={() => { setActiveOpportunity(c); setOpenApply(true); }}>Join Campaign</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 4 — Outcomes Dashboard */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Outcomes Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Job Placements</div>
                    <div className="text-2xl font-bold mt-1">1,240</div>
                  </div>
                  <div className="w-32">
                    <Progress value={78} />
                    <div className="text-xs text-muted-foreground mt-1">78% target achieved</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Livelihood Improvement</div>
                    <div className="text-2xl font-bold mt-1">3,560</div>
                  </div>
                  <div className="w-32">
                    <Progress value={62} />
                    <div className="text-xs text-muted-foreground mt-1">62% target achieved</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Skill Development</div>
                    <div className="text-2xl font-bold mt-1">8,900</div>
                  </div>
                  <div className="w-32">
                    <Progress value={90} />
                    <div className="text-xs text-muted-foreground mt-1">90% target achieved</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Student Success Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-slate-50">
                    <div className="text-sm text-muted-foreground">Case Study</div>
                    <div className="font-semibold">Asha's Livelihood Journey</div>
                    <p className="text-sm text-slate-600 mt-1">Placed in social enterprise after skill camp.</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-slate-50">
                    <div className="text-sm text-muted-foreground">Certification</div>
                    <div className="font-semibold">Community Leader Program</div>
                    <p className="text-sm text-slate-600 mt-1">200+ certified student leaders.</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>

        {/* Right Sidebar Widgets */}
        <aside className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">My Volunteered Hours</div>
                <div className="text-xl font-bold">72 hrs</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Certificates & Proof</div>
              <Dialog open={certificateDialog} onOpenChange={setCertificateDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 px-2">
                    <Award className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Certificate / Proof</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label>Certificate Name</Label>
                      <Input
                        placeholder="e.g., Community Leader, Volunteer Certification"
                        value={newCertTitle}
                        onChange={(e) => setNewCertTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Issuer / Date</Label>
                      <Input
                        placeholder="e.g., Issued: 2025-11-01"
                        value={newCertIssuer}
                        onChange={(e) => setNewCertIssuer(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" onClick={() => setCertificateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addNewCertificate} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        Add Certificate
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  {cert.imageUrl && (
                    <div className="relative">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="h-24 w-full rounded-md object-cover border border-slate-200"
                      />
                      <button
                        onClick={() => removeCertificate(cert.id)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">{cert.title}</div>
                      <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                    </div>
                    <button
                      onClick={() => certificateInputRef.current?.click()}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs"
                    >
                      <Upload className="h-3 w-3" />
                      Photo
                    </button>
                    <input
                      ref={certificateInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleCertificateImageUpload(e, cert.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Active Campaigns Joined</div>
            <div className="mt-2">
              <div className="text-sm">Awareness Drive • City Youth</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
            <div className="mt-2 text-sm">Community Summit — 2026-06-12</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Recommended Opportunities</div>
            <div className="mt-2 text-sm">Rural Dev Internship • GreenFuture</div>
          </Card>
        </aside>
      </div>

      {/* Application Modal */}
      <Dialog open={openApply} onOpenChange={setOpenApply}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply / Join</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm">Applying to: {activeOpportunity?.title || activeOpportunity?.org || activeOpportunity?.name}</div>
            <div>
              <Label>Why do you want to join?</Label>
              <Input placeholder="A short message to organizers" />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Button variant="ghost" onClick={() => setOpenApply(false)}>Cancel</Button>
              <Button onClick={() => { /* placeholder for backend call */ setOpenApply(false); }}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CsrImpactPage;
