import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewDocVariantPage from "@/components/pages/NewDocVariantPage";
import { mapVariantPageDataToNewDocData } from "@/lib/newDocVariantPageData";
import { getVariantPageData } from "@/lib/variantPageData";

const sourceRoute = {
  brand: "peugeot",
  model: "207",
  variant: "1-4-hdi-engine",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const sourceData = await getVariantPageData(
    sourceRoute.brand,
    sourceRoute.model,
    sourceRoute.variant,
  );

  return {
    title: sourceData?.seo.title || "Peugeot 207 1.4 HDi Engine Replacement | Preview",
    description:
      sourceData?.seo.description ||
      "Preview of the new Peugeot 207 1.4 HDi Variant Landing Page.",
    robots: { index: false, follow: false },
  };
}

export default async function Peugeot207PreviewPage() {
  const sourceData = await getVariantPageData(
    sourceRoute.brand,
    sourceRoute.model,
    sourceRoute.variant,
  );

  if (!sourceData) {
    notFound();
  }

  return <NewDocVariantPage data={mapVariantPageDataToNewDocData(sourceData)} />;
}
