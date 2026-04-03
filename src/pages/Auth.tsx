import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Building, School, Rocket, FlaskConical } from "lucide-react";

const roleAccents = {
  Student: "from-blue-500 to-sky-500",
  Company: "from-orange-500 to-rose-500",
  College: "from-amber-500 to-orange-500",
  Startup: "from-emerald-500 to-teal-500",
  Incubator: "from-violet-500 to-fuchsia-500",
} as const;

const roleDescriptions = {
  Student: "Jobs, learning, mentorship, and startup discovery.",
  Company: "Hire talent, post roles, and manage engagement.",
  College: "Run placements, collaborations, and startup programs.",
  Startup: "Build, hire, fundraise, and ship faster.",
  Incubator: "Onboard startups, mentor founders, and accelerate growth.",
} as const;

const UserTypeCard = ({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className="group cursor-pointer rounded-2xl border border-amber-100/70 bg-gradient-to-b from-white to-amber-50/45 p-7 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg"
    onClick={onClick}
  >
    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${roleAccents[title as keyof typeof roleAccents]} text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-lg text-slate-900 transition-colors group-hover:text-amber-700">{title}</h3>
    <p className="mt-1 text-xs text-slate-500">{roleDescriptions[title as keyof typeof roleDescriptions]}</p>
  </motion.div>
);

const Auth = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: string) => {
    // We will pass the selected role to a new login page
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/25 to-white p-4">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl"></div>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center">
        <div className="w-full rounded-3xl border border-amber-100/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground transition-colors hover:text-amber-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 mt-4 text-center"
          >
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              <FlaskConical className="h-3.5 w-3.5" />
              Choose your role
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Join The Student Spot
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Pick the workspace that matches what you want to build, hire, or grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            <UserTypeCard icon={<User className="h-7 w-7" />} title="Student" onClick={() => handleSelectRole("student")} />
            <UserTypeCard icon={<Building className="h-7 w-7" />} title="Company" onClick={() => handleSelectRole("company")} />
            <UserTypeCard icon={<School className="h-7 w-7" />} title="College" onClick={() => handleSelectRole("college")} />
            <UserTypeCard icon={<Rocket className="h-7 w-7" />} title="Startup" onClick={() => handleSelectRole("startup")} />
            <UserTypeCard icon={<FlaskConical className="h-7 w-7" />} title="Incubator" onClick={() => handleSelectRole("incubator")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
