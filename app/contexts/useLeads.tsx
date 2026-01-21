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
  notReadLeads: ContactLead[];
  deleteLead: (id: string) => Promise<void>;
  markLeadAsRead: (id: string) => Promise<void>;
  markLeadAsNotRead: (id: string) => Promise<void>;
} | null;

const LeadsContext = createContext<LeadsContextType | null>(null);

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [error, setError] = useState<TypeError | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getLeads = useCallback(async () => {
    const supabase = await getSupabase();
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

  const deleteLead = async (id: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("contact_leads")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting lead:", error);
      } else {
        getLeads();
      }
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  };

  const markLeadAsRead = async (id: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("contact_leads")
        .update({ status: true })
        .eq("id", id);

      if (error) {
        console.error("Error deleting lead:", error);
      } else {
        getLeads();
      }
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  };

  const markLeadAsNotRead = async (id: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("contact_leads")
        .update({ status: false })
        .eq("id", id);

      if (error) {
        console.error("Error deleting lead:", error);
      } else {
        getLeads();
      }
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  const notReadLeads = leads.filter((lead) => lead.status === false);

  const value = {
    leads,
    getLeads,
    error,
    isLoading,
    notReadLeads,
    deleteLead,
    markLeadAsRead,
    markLeadAsNotRead,
  };
  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
};

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads debe usarse dentro de un LeadsProvider");
  }
  return context;
}
