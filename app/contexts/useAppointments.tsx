import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of an Appointment
export interface Appointment {
  id: string;
  title: string;
  date: Date;
  patientName: string;
  notes?: string;
}

// Define the shape of the Context
interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  removeAppointment: (id: string) => void;
  updateAppointment: (id: string, updatedData: Partial<Appointment>) => void;
}

// Create the Context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined,
);

// Provider Component
export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const updateAppointment = (id: string, updatedData: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app)),
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        removeAppointment,
        updateAppointment,
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
