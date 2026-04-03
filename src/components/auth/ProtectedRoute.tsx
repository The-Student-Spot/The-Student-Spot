import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const roleAliases: Record<string, string[]> = {
  startup: ["startup", "entrepreneur"],
  entrepreneur: ["startup", "entrepreneur"],
};

const normalizeRole = (role?: string) => (role || "").toLowerCase();

const isRoleAllowed = (userRole: string, allowedRoles: string[]) => {
  const normalizedUserRole = normalizeRole(userRole);

  return allowedRoles.some((allowedRole) => {
    const normalizedAllowedRole = normalizeRole(allowedRole);
    const aliases = roleAliases[normalizedAllowedRole] || [normalizedAllowedRole];
    return aliases.includes(normalizedUserRole);
  });
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50/20 to-white">
        <p className="text-sm text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = user.userType || "";
    if (!isRoleAllowed(role, allowedRoles)) {
      return <Navigate to="/auth" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
