import { NextResponse } from "next/server";
import { navMenus } from "@/lib/navData";

export async function GET() {
  return NextResponse.json(
    { navMenus },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    },
  );
}
