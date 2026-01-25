
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth, db } from "@/integrations/firebase/client";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userType = searchParams.get("role") || "student";

  const handleLoginSuccess = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    // Always use the userType from the URL parameter as the source of truth
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email!.split('@')[0],
      userType: userType, // This ensures the role is updated on every login
      lastLoginAt: new Date().toISOString(),
      createdAt: docSnap.exists() ? docSnap.data().createdAt : new Date().toISOString(),
    };

    // Create or update the user document in Firestore
    await setDoc(userRef, userData, { merge: true });

    // Redirect based on the selected role
    switch (userType) {
      case "student":
        navigate("/student-dashboard");
        break;
      case "entrepreneur":
        navigate("/entrepreneur-dashboard");
        break;
      case "college":
        navigate("/college-dashboard");
        break;
      case "company":
        navigate("/company-dashboard");
        break;
      default:
        navigate("/student-dashboard"); // Default fallback
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await handleLoginSuccess(result.user);
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      await handleLoginSuccess(userCredential.user);
    } catch (error: any) {
      toast({ title: isSignUp ? "Sign Up Failed" : "Sign In Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-heading font-bold text-3xl">T</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground capitalize">{userType} {isSignUp ? "Sign Up" : "Login"}</h1>
            <p className="text-muted-foreground mt-1">{isSignUp ? "Create your account" : "Sign in to continue"}</p>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full !mt-6 bg-yellow-500 hover:bg-yellow-600 text-black">
              {loading ? "Please wait..." : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button onClick={handleGoogleLogin} disabled={loading} variant="outline" className="w-full">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don\'t have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-yellow-500 hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
