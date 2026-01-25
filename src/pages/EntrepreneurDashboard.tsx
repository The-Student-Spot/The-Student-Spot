
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Bell, Rocket, FileText, Video, Users, LifeBuoy, Lightbulb, LogOut, ChevronRight, Briefcase, Handshake
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const dashboardItems = {
  launchpad: [
    { icon: <Briefcase />, title: "Funding Sources", description: "Connect with investors and funds." },
    { icon: <FileText />, title: "Pitch Deck Templates", description: "Create a winning pitch deck." },
    { icon: <Handshake />, title: "Incubators / Accelerators", description: "Find support to grow your startup." },
  ],
  resources: [
    { icon: <Lightbulb />, title: "Founder Stories & Case Studies", description: "Learn from the journeys of others." },
    { icon: <FileText />, title: "Startup Tools & Templates", description: "Get essential startup resources." },
    { icon: <Briefcase />, title: "Legal & Business Guides", description: "Navigate legal and business setup." },
  ],
  community: [
    { icon: <Video />, title: "Events & Webinars", description: "Join exclusive founder events." },
    { icon: <Users />, title: "Mentorship", description: "Connect with experienced mentors." },
    { icon: <Users />, title: "Community", description: "Engage with fellow entrepreneurs." },
  ]
};

const DashboardCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
    className="bg-card rounded-xl p-5 flex flex-col items-start gap-4 border border-transparent hover:border-yellow-400 transition-all group h-full"
  >
    <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-md text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
    <div className="text-sm font-medium text-yellow-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      Explore <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const EntrepreneurDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-slate-50">
      <aside className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-20 items-center border-b px-6">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-yellow-500">
              <Rocket className="h-6 w-6" />
              <span>Founder Dashboard</span>
            </NavLink>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium space-y-1">
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Rocket className="h-4 w-4" />Startup Launchpad</NavLink>
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><FileText className="h-4 w-4" />Resources</NavLink>
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Users className="h-4 w-4" />Community</NavLink>
          </nav>
          <div className="mt-auto p-4 border-t">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-yellow-500">{user.email?.[0].toUpperCase()}</div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{user.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-500 hover:text-yellow-500 flex-shrink-0">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
                <Button onClick={() => navigate("/auth")} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Login</Button>
            )}
          </div>
        </div>
      </aside>
      <main className="flex flex-col flex-1 gap-6 p-4 lg:p-8">
        <header className="flex items-center justify-between">
           <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.displayName || "Founder"}!</h1>
           <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200 hover:bg-slate-100">
             <Bell className="h-5 w-5 text-slate-500" />
            </Button>
        </header>
        <div className="flex-1 space-y-10">
            <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Startup Launchpad</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dashboardItems.launchpad.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Resources & Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dashboardItems.resources.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
             <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Community & Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dashboardItems.community.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default EntrepreneurDashboard;
