"use client";

import { getSupabase, type ContactLead } from "@/lib/supabase";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type LeadsContextType = {
  leads: ContactLead[];
  getLeads: () => Promise<void>;
  error: TypeError | undefined;
  isLoading: boolean;
} | null;

const LeadsContext = createContext<LeadsContextType | null>(null);

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [error, setError] = useState<TypeError | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getLeads = useCallback(async () => {
    const supabase = getSupabase();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      setLeads(data || []);
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getLeads();
  }, []);

  const value = { leads, getLeads, error, isLoading };
  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
};

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads debe usarse dentro de un LeadsProvider");
  }
  return context;
}
