"use client";

import { getSupabase, type Project } from "@/lib/supabase";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ProjectsContextType = {
  projects: Project[];
  getProjects: () => Promise<void>;
  getProjectById: (id: string) => Promise<Project[] | undefined>;
  error: TypeError | undefined;
  isLoading: boolean;
} | null;

const Project = createContext<ProjectsContextType | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<TypeError | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = useCallback(async () => {
    const supabase = await getSupabase();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      setProjects(data || []);
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjectById = async (id: string): Promise<Project[] | undefined> => {
    const supabase = await getSupabase();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id);

      if (error) throw new Error(error.message);

      return data || [];
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { projects, getProjects, getProjectById, error, isLoading };
  return <Project.Provider value={value}>{children}</Project.Provider>;
};

export function useProjects() {
  const context = useContext(Project);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de un ProjectProvider");
  }
  return context;
}
