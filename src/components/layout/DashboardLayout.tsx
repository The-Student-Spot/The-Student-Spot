
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { sidebarNav, mainContent, header } = useDashboard(user?.role || "student");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!user) {
    navigate("/auth");
    return null; 
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-slate-50">
      <aside className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-20 items-center border-b px-6">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-yellow-500">
              {header.icon}
              <span>{header.title}</span>
            </NavLink>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium space-y-1">
            {sidebarNav.map((item) => (
                 <NavLink key={item.title} to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-yellow-600 hover:bg-yellow-50">{item.icon}{item.title}</NavLink>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
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
          </div>
        </div>
      </aside>
      <main className="flex flex-col flex-1 gap-6 p-4 lg:p-8">
        {mainContent}
      </main>
    </div>
  );
};

export default DashboardLayout;
