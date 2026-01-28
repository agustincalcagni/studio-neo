import { getSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { startTime, endTime, clientName } = await req.json();
  try {
    const supabase = await getSupabase();

    const { error } = await supabase.from("appointments").insert([
      {
        client_name: clientName,
        start_time: startTime,
        end_time: endTime,
        confirmed: "confirmed",
      },
    ]);

    if (error) throw new Error(error.message);

    return Response.json({ message: "Datos enviados" });
  } catch (error) {
    return Response.json({ message: "Error en el servidor", error: error });
  }
}
