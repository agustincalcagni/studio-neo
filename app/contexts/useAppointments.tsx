"use client";

import { getSupabase } from "@/lib/supabase";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

// Define the shape of an Appointment
export interface Appointment {
  id: string;
  barber_id: string;
  client_name: string;
  client_id: string;
  service_id: Date;
  start_time: Date | string | number;
  end_time: Date | string | number;
  status: string;
  created_at: Date | string | number;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  isLoading: boolean;
  error: TypeError | undefined | null;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined,
);

// Provider Component
export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<TypeError | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.from("appointments").select("*");

      if (error) throw new Error(error.message);

      setAppointments(data);
    } catch (error) {
      setError(error as TypeError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAppointments();
  }, []);

  const addAppointment = async (appointment: Appointment) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("appointments").insert(appointment);

      if (error) throw new Error(error.message);

      const {} = await supabase.from("appointments").select("");
    } catch (error) {
      setError(error as TypeError);
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        isLoading,
        error,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom Hook to use the Context
export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error(
      "useAppointments must be used within an AppointmentsProvider",
    );
  }
  return context;
};
