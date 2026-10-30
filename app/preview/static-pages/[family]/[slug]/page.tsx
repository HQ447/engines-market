import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FamilyPreviewRouter from "@/components/static-pages-comp/FamilyPreviewRouter";
import { getPreviewPage, previewStaticParams } from "@/lib/staticPagePreview";

type PageProps = {
  params: Promise<{ family: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return previewStaticParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family, slug } = await params;
  const page = getPreviewPage(family, slug);

  return {
    title: page ? `Preview: ${page.seo.title}` : "Static page preview",
    description: page?.seo.description,
    robots: { index: false, follow: false },
  };
}

export default async function StaticPagePreviewRoute({ params }: PageProps) {
  const { family, slug } = await params;
  const page = getPreviewPage(family, slug);
  if (!page) notFound();
  return <FamilyPreviewRouter page={page} />;
}
