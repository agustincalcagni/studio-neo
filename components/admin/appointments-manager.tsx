"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  CalendarDays,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { getSupabase } from "@/lib/supabase";

// Tipos para los turnos
type AppointmentStatus = "available" | "booked" | "blocked";

interface Appointment {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:mm
  client_name?: string;
  status: AppointmentStatus;
}

// Generador de horarios estilo barbería (cada 45 min)
const generateTimeSlots = () => {
  const slots = [];
  let hour = 9;
  let minute = 0;

  // De 9:00 a 19:00
  while (hour < 19) {
    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    slots.push(timeString);

    minute += 45;
    if (minute >= 60) {
      hour += 1;
      minute -= 60;
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export function AppointmentsManager() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientName, setClientName] = useState("");

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.from("appointments").select("*");

      if (error) {
        console.error("Error fetching appointments:", error);
        // Fallback a datos locales si la tabla no existe aún
        return;
      }

      if (data) {
        setAppointments(data as Appointment[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Obtener estado de un slot específico
  const getSlotStatus = (time: string): AppointmentStatus => {
    if (!date) return "available";
    const dateStr = format(date, "yyyy-MM-dd");
    const appointment = appointments.find(
      (a) => a.date === dateStr && a.time === time,
    );
    return appointment ? appointment.status : "available";
  };

  // Manejar reserva
  const handleBooking = async () => {
    if (!date || !selectedSlot) return;

    const dateStr = format(date, "yyyy-MM-dd");

    // Optimistic update
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      date: dateStr,
      time: selectedSlot,
      client_name: clientName || "Cliente",
      status: "booked",
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    setClientName("");
    setSelectedSlot(null);

    toast.success("Turno reservado con éxito");

    try {
      const supabase = await getSupabase();
      await supabase.from("appointments").insert([
        {
          date: dateStr,
          time: selectedSlot,
          client_name: clientName || "Cliente",
          status: "booked",
        },
      ]);
    } catch (error) {
      toast.error("Error al guardar en base de datos");
    }
  };

  const handleSlotClick = (time: string) => {
    const status = getSlotStatus(time);
    if (status === "available") {
      setSelectedSlot(time);
      setIsDialogOpen(true);
    } else {
      // Ver detalles si ya está ocupado
      const dateStr = format(date!, "yyyy-MM-dd");
      const appt = appointments.find(
        (a) => a.date === dateStr && a.time === time,
      );
      if (appt && appt.client_name) {
        toast.info(`Turno reservado por: ${appt.client_name}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-primary" />
          Gestión de Turnos
        </h2>
        <p className="text-muted-foreground">
          Administra tu disponibilidad y reservas de clientes.
        </p>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-8">
        {/* Calendar Column */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Seleccionar Fecha</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex justify-center pb-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
              className="rounded-md border-none"
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </CardContent>
        </Card>

        {/* Time Slots Column */}
        <Card className="flex-1">
          <CardHeader className="border-b mb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {date
                    ? format(date, "EEEE d 'de' MMMM", { locale: es })
                    : "Seleccione una fecha"}
                </CardTitle>
                <CardDescription className="mt-1">
                  Horarios disponibles para agendar
                </CardDescription>
              </div>
              {date && (
                <Badge variant="outline" className="capitalize">
                  {format(date, "MMMM yyyy", { locale: es })}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !date ? (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Por favor seleccioná una fecha en el calendario</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {timeSlots.map((time) => {
                  const status = getSlotStatus(time);
                  const isSelected = selectedSlot === time;

                  return (
                    <Button
                      key={time}
                      variant={
                        status === "booked"
                          ? "secondary"
                          : isSelected
                            ? "default"
                            : "outline"
                      }
                      className={`h-auto py-3 flex flex-col items-center gap-1 transition-all ${
                        status === "booked"
                          ? "opacity-50 cursor-not-allowed border-transparent bg-muted/50"
                          : status === "blocked"
                            ? "hidden"
                            : "hover:border-primary hover:text-primary"
                      }`}
                      disabled={status !== "available"}
                      onClick={() => handleSlotClick(time)}
                    >
                      <Clock className="w-4 h-4 mb-1 opacity-50" />
                      <span className="font-mono text-base font-medium">
                        {time}
                      </span>
                      {status === "booked" && (
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">
                          Ocupado
                        </span>
                      )}
                      {status === "available" && (
                        <span className="text-[10px] text-green-500 font-bold">
                          Libre
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Leyenda */}
            <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t text-sm text-muted-foreground justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-input bg-background" />
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted/50 border border-transparent" />
                <span>Ocupado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservar Turno</DialogTitle>
            <DialogDescription>
              Ingresá los datos para bloquear el horario de las{" "}
              <span className="font-bold text-foreground">{selectedSlot}</span>{" "}
              hs el día{" "}
              <span className="font-bold text-foreground">
                {date && format(date, "d 'de' MMMM", { locale: es })}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Nombre del Cliente / Nota</Label>
              <Input
                id="client"
                placeholder="Ej. Juan Pérez - Corte de pelo"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleBooking}>Confirmar Reserva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
