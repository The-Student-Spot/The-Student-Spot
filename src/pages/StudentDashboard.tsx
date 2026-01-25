
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Bell, Bookmark, Briefcase, Building, Code, Compass, FileText, GraduationCap, Home, LifeBuoy, Lightbulb, 
  MessageSquare, Mic, Rocket, School, Settings, Star, Users, Video, LogOut, ChevronRight, Calendar
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const dashboardItems = {
  learning: [
    { icon: <Code />, title: "Coding Practice", description: "Sharpen your skills with challenges." },
    { icon: <Mic />, title: "AI Mock Interviews", description: "Practice interviews with AI feedback." },
    { icon: <FileText />, title: "Notes & Books", description: "Access a library of resources." },
    { icon: <Compass />, title: "Exam Prep", description: "Prepare for your exams effectively." },
    { icon: <Star />, title: "Skill Courses", description: "Upskill with expert-led courses." },
  ],
  jobs: [
    { icon: <Briefcase />, title: "Private Jobs", description: "Find jobs in top companies." },
    { icon: <Building />, title: "Government Jobs", description: "Explore public sector careers." },
    { icon: <Rocket />, title: "Startup Jobs", description: "Join innovative startups." },
    { icon: <Bookmark />, title: "Application Tracker", description: "Manage your job applications." },
  ],
  entrepreneurship: [
    { icon: <Rocket />, title: "Startup Launchpad", description: "Tools to launch your venture." },
    { icon: <Lightbulb />, title: "Founder Stories", description: "Learn from successful founders." },
    { icon: <FileText />, title: "Tools & Templates", description: "Get resources for your startup." },
  ],
  community: [
    { icon: <Calendar />, title: "Events & Webinars", description: "Join events and webinars." },
    { icon: <Users />, title: "Mentorship Zone", description: "Connect with experienced mentors." },
    { icon: <Settings />, title: "Resources & Tools", description: "Find helpful resources and tools." },
    { icon: <MessageSquare />, title: "Community", description: "Engage with fellow students." },
    { icon: <LifeBuoy />, title: "Support", description: "Get help and support." },
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
      View More <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const StudentDashboard = () => {
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
              <GraduationCap className="h-6 w-6" />
              <span>Student Dashboard</span>
            </NavLink>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium space-y-1">
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Home className="h-4 w-4" />Personalized Path</NavLink>
            
            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">Jobs & Internships</h3>
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Briefcase className="h-4 w-4" />Jobs</NavLink>
            
            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">Learning</h3>
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Code className="h-4 w-4" />Development</NavLink>
            
            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">Entrepreneurship</h3>
            <NavLink to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50"><Rocket className="h-4 w-4" />Startup Hub</NavLink>
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
           <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.displayName || "Student"}!</h1>
           <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-slate-200 hover:bg-slate-100">
             <Bell className="h-5 w-5 text-slate-500" />
            </Button>
        </header>
        <div className="flex-1 space-y-10">
            <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Learning & Development</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {dashboardItems.learning.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Jobs & Internships</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {dashboardItems.jobs.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
             <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Entrepreneurship Hub</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {dashboardItems.entrepreneurship.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-4 text-slate-700">Community & Support</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {dashboardItems.community.map(item => <DashboardCard key={item.title} {...item} />)}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
