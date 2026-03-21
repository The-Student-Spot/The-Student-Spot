import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Building, School, Rocket } from "lucide-react";

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
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="
  bg-gradient-card 
  border border-border 
  rounded-2xl 
  p-8 
  flex flex-col items-center justify-center text-center 
  cursor-pointer 
  shadow-card 
  hover:shadow-card-hover 
  transition-all duration-300
  hover:-translate-y-2
  group
"
    onClick={onClick}
  >
    <div className="transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
  </motion.div>
);

const Auth = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: string) => {
    // We will pass the selected role to a new login page
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent to-background p-4 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="w-full max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-gradient">
            Join The Student Spot
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            First, let us know who you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <UserTypeCard
            icon={<User className="w-12 h-12 text-primary" />}
            title="Student"
            onClick={() => handleSelectRole("student")}
          />
          <UserTypeCard
            icon={<Building className="w-12 h-12 text-primary" />}
            title="Company"
            onClick={() => handleSelectRole("company")}
          />
          <UserTypeCard
            icon={<School className="w-12 h-12 text-primary" />}
            title="College"
            onClick={() => handleSelectRole("college")}
          />
          <UserTypeCard
            icon={<Rocket className="w-12 h-12 text-primary" />}
            title="Startup"
            onClick={() => handleSelectRole("startup")}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
