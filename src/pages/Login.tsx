
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roleLabel: Record<string, string> = {
  student: "Student",
  company: "Company",
  college: "College",
  startup: "Startup",
  entrepreneur: "Startup",
  incubator: "Incubator",
};

const roleTheme: Record<string, { accent: string; soft: string; border: string; text: string }> = {
  student: {
    accent: "from-sky-500 to-blue-500",
    soft: "bg-sky-100 text-sky-700",
    border: "border-sky-100",
    text: "text-sky-700",
  },
  company: {
    accent: "from-orange-500 to-rose-500",
    soft: "bg-orange-100 text-orange-700",
    border: "border-orange-100",
    text: "text-orange-700",
  },
  college: {
    accent: "from-amber-500 to-orange-500",
    soft: "bg-amber-100 text-amber-700",
    border: "border-amber-100",
    text: "text-amber-700",
  },
  startup: {
    accent: "from-emerald-500 to-teal-500",
    soft: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-100",
    text: "text-emerald-700",
  },
  entrepreneur: {
    accent: "from-emerald-500 to-teal-500",
    soft: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-100",
    text: "text-emerald-700",
  },
  incubator: {
    accent: "from-violet-500 to-fuchsia-500",
    soft: "bg-violet-100 text-violet-700",
    border: "border-violet-100",
    text: "text-violet-700",
  },
};

const SELECTED_ROLE_KEY = "tss_selected_role";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userType = searchParams.get("role") || "student";
  const resolvedRole = roleLabel[userType] || "Student";
  const theme = roleTheme[userType] || roleTheme.student;

  const resolveRole = (metadataRole?: string) => {
    const savedRole = localStorage.getItem(SELECTED_ROLE_KEY) || undefined;
    return metadataRole || savedRole || userType || "student";
  };

  const redirectByRole = (targetRole: string) => {
    switch (targetRole) {
      case "student":
        navigate("/dashboard/home");
        break;
      case "startup":
      case "entrepreneur":
        navigate("/entrepreneur-dashboard");
        break;
      case "college":
        navigate("/college-dashboard");
        break;
      case "company":
        navigate("/company-dashboard");
        break;
      case "incubator":
        navigate("/incubator-dashboard");
        break;
      default:
        navigate("/dashboard/home"); // Default fallback
    }
  };

  const handleLoginSuccess = async (authUser: { id: string; email?: string | null; user_metadata?: Record<string, any> }) => {
    const metadataRole = authUser.user_metadata?.userType || authUser.user_metadata?.role;
    const selectedRole = resolveRole(metadataRole);

    const fullName =
      authUser.user_metadata?.full_name ||
      authUser.user_metadata?.name ||
      authUser.email?.split("@")[0] ||
      "User";

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...(authUser.user_metadata || {}),
        userType: selectedRole,
        full_name: fullName,
      },
    });

    if (updateError) {
      toast({ title: "Profile Sync Warning", description: updateError.message, variant: "destructive" });
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        user_id: authUser.id,
        email: authUser.email ?? null,
        full_name: fullName,
      },
      { onConflict: "user_id" }
    );

    if (profileError) {
      toast({ title: "Profile Save Warning", description: profileError.message, variant: "destructive" });
    }

    localStorage.removeItem(SELECTED_ROLE_KEY);
    redirectByRole(selectedRole);
  };

  useEffect(() => {
    let mounted = true;

    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session?.user) {
        await handleLoginSuccess(data.session.user);
        return;
      }

      setCheckingSession(false);
    };

    checkExistingSession();

    return () => {
      mounted = false;
    };
  }, [userType]);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      localStorage.setItem(SELECTED_ROLE_KEY, userType);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login?role=${userType}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      localStorage.removeItem(SELECTED_ROLE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        localStorage.setItem(SELECTED_ROLE_KEY, userType);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              userType,
              full_name: email.split("@")[0],
            },
            emailRedirectTo: `${window.location.origin}/login?role=${userType}`,
          },
        });

        if (error) throw error;

        if (!data.session) {
          toast({
            title: "Check your email",
            description: "Account created. Verify your email to continue.",
          });
          return;
        }

        if (data.user) {
          await handleLoginSuccess(data.user);
        }
      } else {
        localStorage.setItem(SELECTED_ROLE_KEY, userType);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          await handleLoginSuccess(data.user);
        }
      }
    } catch (error: any) {
      toast({ title: isSignUp ? "Sign Up Failed" : "Sign In Failed", description: error.message, variant: "destructive" });
      localStorage.removeItem(SELECTED_ROLE_KEY);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50/25 to-white">
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/25 to-white px-4 py-8">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-amber-100/70 bg-white/90 shadow-xl backdrop-blur-sm md:grid-cols-2">
        <div className={`hidden bg-gradient-to-br ${theme.accent} p-10 text-white md:flex md:flex-col md:justify-between`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              <Sparkles className="h-3.5 w-3.5" />
              The Student Spot
            </p>
            <h2 className="mt-6 max-w-md text-4xl font-bold leading-tight">Build your future in one ecosystem.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/90">Students, startups, companies, colleges, and incubators collaborate through one connected platform.</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/15 p-4 text-sm shadow-sm backdrop-blur-sm">
            <p className="font-semibold">Role selected: {resolvedRole}</p>
            <p className="mt-1 text-white/90">Use your account to access your dedicated dashboard instantly after login.</p>
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="-ml-2 mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>

          <div className="mb-7 text-center">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.accent} text-white shadow-sm`}>
              <ShieldCheck className="h-8 w-8" />
            </div>
            <p className={`mx-auto mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.soft}`}>{resolvedRole}</p>
            <h1 className="font-heading text-2xl font-bold text-slate-900">{isSignUp ? "Create your account" : "Sign in to continue"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Secure login to access your role-specific dashboard.</p>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 transition-all focus-visible:border-amber-400 focus-visible:ring-amber-200" required />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 transition-all focus-visible:border-amber-400 focus-visible:ring-amber-200" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className={`!mt-6 w-full bg-gradient-to-r ${theme.accent} text-white shadow-sm hover:opacity-95`}>
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button onClick={handleGoogleLogin} disabled={loading} variant="outline" className={`w-full border ${theme.border} ${theme.text} transition-all hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-sm`}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don\'t have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-amber-600 hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
