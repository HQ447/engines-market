import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret");

  // Verify secret token matches Vercel environment variable
  if (secret !== process.env.CMS_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug } = body;

    // Instantly revalidate the blog archive and the specific article
    revalidatePath("/blog");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message },
      { status: 500 }
    );
  }
}