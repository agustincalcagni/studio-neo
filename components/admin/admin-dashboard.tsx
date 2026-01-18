"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ProjectsManager } from "./projects-manager";
import { LeadsManager } from "./leads-manager";
import { useLeads } from "@/app/contexts/useLeads";
import Link from "next/link";

type TabType = "projects" | "leads" | "home";

const tabs = [
  { id: "projects" as TabType, label: "Proyectos", icon: FolderKanban },
  { id: "leads" as TabType, label: "Leads", icon: Mail },
];

export function AdminDashboard({ user }: { user: User }) {
  const { getLeads, notReadLeads } = useLeads();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Toggle */}
      {!isSidebarOpen ? (
        <button
          className="fixed top-4 left-4 z-50 md:hidden p-2 bg-card rounded-lg border border-border"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky inset-y-0 left-0 z-40 w-64 h-dvh bg-card border-r border-border transform transition-transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">StudioNeo</h2>
                <p className="text-xs text-muted-foreground">Panel Admin</p>
              </div>
            </div>
            <span
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex md:hidden absolute top-6 right-2 p-2 bg-card rounded-lg border border-border"
            >
              <X className="" size={20} />
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-secondary text-primary-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </Link>
              </li>
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <div className="relative">
                      <tab.icon className="w-5 h-5" />
                      {tab.id === "leads" ? (
                        notReadLeads.length !== 0 ? (
                          <span className="absolute -top-2 -left-1.5 px-1.25 text-[10px] bg-red-400 rounded-full text-white">
                            {notReadLeads.length}
                          </span>
                        ) : null
                      ) : null}
                    </div>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "leads" && <LeadsManager />}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
