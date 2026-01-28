import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await getSupabase();

    const { data, error } = await supabase.from("appointments").select("*");

    if (error) throw new Error(error.message);

    return Response.json({ data });
  } catch (error) {
    return Response.json({ message: "Error en el servidor" });
  }
}
