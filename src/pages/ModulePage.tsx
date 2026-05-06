import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { dashboardSections } from "./StudentDashboard";

const DashboardCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-card rounded-xl p-5 flex flex-col items-start gap-4 border border-transparent hover:border-yellow-400 transition-all group h-full">
    <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-500 transition-all duration-300 group-hover:scale-110">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-md text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
  </motion.div>
);

const ModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const section = dashboardSections.find((s) => s.id === moduleId);

  if (!section) {
    return (
      <div className="p-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold mt-4">Module not found</h2>
        <p className="text-sm text-muted-foreground mt-2">We couldn't find that module.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/student-dashboard')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{section.title}</h1>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {section.items?.map((item: any) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
