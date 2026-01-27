import { getSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const supabase = await getSupabase();

    const { error } = await supabase.from("appointments").insert([
      {
        client_name: "Carlos",
        start_time: new Date().toISOString(),
        confirmed: "confirmed",
      },
    ]);

    if (error) throw new Error(error.message);

    return Response.json({ message: "Datos enviados" });
  } catch (error) {
    return Response.json({ message: "Error en el servidor", error: error });
  }
}
