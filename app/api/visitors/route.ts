import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("sn_visitors")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      return Response.json({
        message: "Error en la base de datos: " + error.message,
      });
    }

    return Response.json({ message: "Datos obtenidos", data });
  } catch (error) {
    return Response.json({ message: "Error en el servidor" });
  }
}
