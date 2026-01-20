import { NextResponse } from "next/server";

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "totals";
  const timeframe = searchParams.get("timeframe") || "7d";

  if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
    console.log("Missing env vars:", {
      hasToken: !!VERCEL_API_TOKEN,
      hasProjectId: !!VERCEL_PROJECT_ID,
    });
    return NextResponse.json(
      { error: "Vercel API not configured", configured: false },
      { status: 500 },
    );
  }

  // Calcular fechas según timeframe
  const now = new Date();
  const from = new Date();

  switch (timeframe) {
    case "24h":
      from.setHours(from.getHours() - 24);
      break;
    case "7d":
      from.setDate(from.getDate() - 7);
      break;
    case "30d":
      from.setDate(from.getDate() - 30);
      break;
    case "90d":
      from.setDate(from.getDate() - 90);
      break;
    default:
      from.setDate(from.getDate() - 7);
  }

  // Construir parámetros base - usar timestamps en milisegundos
  const baseParams: Record<string, string> = {
    projectId: VERCEL_PROJECT_ID,
    from: from.getTime().toString(),
    to: now.getTime().toString(),
  };

  if (VERCEL_TEAM_ID) {
    baseParams.teamId = VERCEL_TEAM_ID;
  }

  try {
    // Usar la API de Analytics Data de Vercel
    const teamParam = VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : "";
    const baseUrl = `https://vercel.com/api/web/insights/${VERCEL_PROJECT_ID}`;

    let url = "";
    const fromTs = from.getTime();
    const toTs = now.getTime();

    switch (endpoint) {
      case "totals":
        url = `${baseUrl}/stats?from=${fromTs}&to=${toTs}${teamParam}`;
        break;
      case "pages":
        url = `${baseUrl}/path?from=${fromTs}&to=${toTs}&limit=10${teamParam}`;
        break;
      case "countries":
        url = `${baseUrl}/country?from=${fromTs}&to=${toTs}&limit=10${teamParam}`;
        break;
      case "devices":
        url = `${baseUrl}/device?from=${fromTs}&to=${toTs}${teamParam}`;
        break;
      case "browsers":
        url = `${baseUrl}/browser?from=${fromTs}&to=${toTs}&limit=5${teamParam}`;
        break;
      case "referrers":
        url = `${baseUrl}/referrer?from=${fromTs}&to=${toTs}&limit=10${teamParam}`;
        break;
      default:
        url = `${baseUrl}/stats?from=${fromTs}&to=${toTs}${teamParam}`;
    }

    console.log("Fetching:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Vercel API Error:", response.status, errorText);
      return NextResponse.json(
        {
          error: "Failed to fetch analytics",
          status: response.status,
          details: errorText,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
