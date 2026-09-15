// app/api/revalidate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Timing-safe HMAC-SHA256 signature verification
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expected = createHmac("sha256", secret).update(payload).digest("hex");
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    return sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-cms-signature-256");
    const secret = process.env.CMS_REVALIDATION_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "CMS_REVALIDATION_SECRET not configured on server" },
        { status: 500 }
      );
    }

    const bodyText = await req.text();

    if (!signature || !verifySignature(bodyText, signature, secret)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = JSON.parse(bodyText);
    const { affectedRoutes = [] } = payload;

    // Purge affected paths (e.g. /blog and /blog/my-post)
    const revalidatedRoutes: string[] = [];
    for (const route of affectedRoutes) {
      try {
        revalidatePath(route);
        revalidatedRoutes.push(route);
      } catch (pathErr) {
        console.warn(`Failed to revalidate path: ${route}`, pathErr);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: revalidatedRoutes,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Revalidation failed" }, { status: 500 });
  }
}