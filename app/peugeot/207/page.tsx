import type { Metadata } from "next";
import NewDocVariantPage from "@/components/pages/NewDocVariantPage";
import { peugeot207HdiPreviewData } from "@/data/variant-preview/peugeot207Hdi";

export const metadata: Metadata = {
  title: "Peugeot 207 1.4 HDi Engine Replacement | Preview",
  description: "Preview of the new Peugeot 207 1.4 HDi Variant Landing Page.",
  robots: { index: false, follow: false },
};

export default function Peugeot207PreviewPage() {
  return <NewDocVariantPage data={peugeot207HdiPreviewData} />;
}
