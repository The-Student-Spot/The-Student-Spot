
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase/client";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirect to home after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md text-center bg-card p-8 rounded-3xl shadow-card border border-border"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mx-auto mb-6 w-20 h-20 rounded-full gradient-hero flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-primary-foreground" />
        </motion.div>
        
        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
          Login Successful!
        </h1>

        <p className="text-muted-foreground text-lg mb-4">
          Welcome back, <span className="font-semibold text-primary">{user?.displayName || "User"}</span>!
        </p>
        
        <p className="text-muted-foreground">
          You are now being redirected to the homepage.
        </p>

        <div className="mt-8">
            <div className="w-full bg-border rounded-full h-2">
                <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                />
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginSuccess;
