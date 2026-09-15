import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Mg10e4eHero from "@/components/pages/Mg10e4eHero";
import { getEnginePageData } from "@/lib/enginePageData";

export const metadata: Metadata = {
  title: "MG 10E4E Engine Replacement | Compare Prices",
  description:
    "Compare prices for used, reconditioned and rebuilt MG 10E4E engines from vetted UK specialists.",
  alternates: {
    canonical: "/mg/10e4e-engine/",
  },
};

export default async function Mg10e4eEnginePage() {
  const page = await getEnginePageData("mg", "10e4e-engine");

  if (!page) {
    notFound();
  }

  return (
    <Mg10e4eHero
      data={page.sections.hero}
      engineCode={page.engine.code}
      specs={page.sections.specs}
      compatibility={page.sections.compatibility}
    />
  );
}
