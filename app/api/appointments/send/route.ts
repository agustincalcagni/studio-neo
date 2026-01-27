import { getSupabase } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = await getSupabase();

    const { error } = await supabase.from("appointments").insert([{}]);

    if (error) throw new Error(error.message);

    return Response.json({ message: "Datos enviados" });
  } catch (error) {
    return Response.json({ message: "Error en el servidor" });
  }
}
