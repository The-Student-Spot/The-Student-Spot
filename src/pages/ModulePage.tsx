import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { dashboardSections } from "./StudentDashboard";
import StudentDashboardNavLayout from "@/components/layout/StudentDashboardNavLayout";

const DashboardCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)" }} className="bg-card rounded-xl p-5 flex flex-col items-start gap-4 border border-transparent hover:border-yellow-400 transition-all group h-full">
    <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-md text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
    <div className="text-sm font-medium text-yellow-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      View More →
    </div>
  </motion.div>
);

const ModulePage = () => {
  const { moduleId } = useParams();

  const section = dashboardSections.find((s) => s.id === moduleId);

  if (!section) {
    return (
      <StudentDashboardNavLayout
        activeSection={moduleId}
        headerTitle="Module not found"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Module not found</h2>
          <p className="text-sm text-muted-foreground">We couldn't find that module.</p>
        </div>
      </StudentDashboardNavLayout>
    );
  }

  return (
    <StudentDashboardNavLayout
      activeSection={moduleId}
      headerTitle={section.title}
      headerDescription={section.description}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{section.title}</h2>
          <p className="text-muted-foreground">{section.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {section.items?.map((item: any) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </StudentDashboardNavLayout>
  );
};

export default ModulePage;
