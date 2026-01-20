import { LocationProps } from "@/app/types/definitions";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { ip, city, country, sysInfo }: LocationProps = await req.json();

  if (!ip || !city || !country || !sysInfo) {
    return Response.json({ message: "Datos incompletos" });
  }

  try {
    const supabase = await getSupabase();
    const locationData = {
      ip,
      city,
      country,
      timezone: country.timezone ?? "N/A",
      system: sysInfo.system ?? "N/A",
      browser: sysInfo.webBrowser.browser ?? "N/A",
      emoji_flag: country.emojiFlag ?? "N/A",
    };
    const { error } = await supabase.from("sn_visitors").insert(locationData);

    if (error) {
      return Response.json({ message: "Error en DB: " + error.message });
    }

    return Response.json({
      message: "¡Los datos se han enviado correctamente!",
    });
  } catch (error) {
    return Response.json({ message: "Error al enviar datos al servidor" });
  }
}
