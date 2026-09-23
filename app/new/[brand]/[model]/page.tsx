import type { Metadata } from "next";
import AutoInternalLinks from "@/components/internal-links/AutoInternalLinks";
import NewDocEnginePage from "@/components/pages/NewDocEnginePage";
import { getEnginePageData, getEnginePageStaticParams } from "@/lib/enginePageData";
import { getInternalLinkPlan } from "@/lib/internalLinkIndex";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import { SITE_URL } from "@/lib/site";
import type { EnginePageData, EnginePageHeroData } from "@/types/engine-page";
import { notFound, permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{
    brand: string;
    model: string;
  }>;
};

export async function generateStaticParams() {
  return getEnginePageStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, model } = await params;
  const pageData = await getEnginePageData(brand, model);

  if (!pageData) {
    return {
      title: "New Engine Page Preview",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
    alternates: { canonical: pageData.seo.canonical },
    metadataBase: new URL(SITE_URL),
    robots: { index: false, follow: false },
  };
}

function getPreviewEngineCutout(pageData: EnginePageData) {
  const hero = pageData.sections.hero;

  if (hero.engineCutout?.src) return hero.engineCutout;

  const signals = [
    ...hero.pills,
    hero.title,
    hero.description,
    hero.engineImage.src,
  ]
    .join(" ")
    .toLowerCase();

  const src = /diesel|bluehdi|hdi|tdi|dci|cdi|turbodiesel/.test(signals)
    ? "/images/shared/hero-engines/temporary-diesel-engine-cutout.png"
    : /performance|gti|amg|m-power|v8|v6|type r|quattro rs/.test(signals)
      ? "/images/shared/hero-engines/temporary-performance-engine-cutout.png"
      : "/images/shared/hero-engines/temporary-petrol-engine-cutout.png";

  return {
    src,
    alt: hero.engineImage.alt,
  };
}

function getPreviewHeroPrices(pageData: EnginePageData): EnginePageHeroData["prices"] {
  const existingPrices = pageData.sections.hero.prices;
  if (existingPrices.length > 0) return existingPrices;

  return pageData.sections.costGuide.rows
    .map((row) => {
      const condition = row.condition.trim();
      const tone = condition.toLowerCase();
      if (tone !== "used" && tone !== "reconditioned" && tone !== "rebuilt") {
        return null;
      }

      const price = row.supplyOnly.match(/£\s*[\d,]+/i)?.[0] ?? "";
      if (!price) return null;

      return {
        label: `${condition} from`,
        price,
        tone: tone as EnginePageHeroData["prices"][number]["tone"],
      };
    })
    .filter((price): price is NonNullable<typeof price> => price !== null);
}

function applyPreviewOverrides(pageData: EnginePageData): EnginePageData {
  const firstCompatibleModel = pageData.sections.compatibility.rows[0];
  const modelHref = firstCompatibleModel?.links?.[0]?.href;
  const modelSlug = modelHref
    ?.replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .at(-1);
  const resolvedModelImage = modelSlug
    ? resolveModelImagePaths({
        brandSlug: pageData.brand.slug,
        modelSlug,
        modelName: firstCompatibleModel?.model,
      }).resolvedSmallImage
    : undefined;
  const vehicleImage =
    pageData.sections.compatibility.rows.find((row) => row.image)?.image ??
    resolvedModelImage;

  const hero = {
    ...pageData.sections.hero,
    ...(vehicleImage
      ? {
          backgroundImage: {
            src: vehicleImage,
            alt: `${pageData.brand.name} compatible vehicle`,
          },
        }
      : {}),
    ...(pageData.sections.hero.engineCutout?.src
      ? {}
      : { engineCutout: getPreviewEngineCutout(pageData) }),
    ...(pageData.sections.hero.prices.length > 0
      ? {}
      : { prices: getPreviewHeroPrices(pageData) }),
  };

  return {
    ...pageData,
    sections: {
      ...pageData.sections,
      hero,
    },
  };
}

export default async function NewEngineTestingPage({ params }: Props) {
  const { brand, model } = await params;
  const sourceData = await getEnginePageData(brand, model);

  if (!sourceData) notFound();

  if (brand !== sourceData.brand.slug || model !== sourceData.engine.slug) {
    permanentRedirect(`/new/${sourceData.brand.slug}/${sourceData.engine.slug}`);
  }

  const internalLinkPlan = await getInternalLinkPlan({
    brandSlug: sourceData.brand.slug,
    engineSlug: sourceData.engine.slug,
    currentPath: sourceData.seo.canonical,
    pageType: "engine",
  });

  const previewData = applyPreviewOverrides(sourceData);

  return (
    <>
      {sourceData.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sourceData.structuredData),
          }}
        />
      ) : null}
      <AutoInternalLinks
        targets={internalLinkPlan.targets}
        maxLinksByType={internalLinkPlan.maxLinksByType}
        maxLinksPerPage={internalLinkPlan.maxLinksPerPage}
        maxLinksPerTarget={internalLinkPlan.defaultMaxLinksPerTarget}
      />
      <NewDocEnginePage
        data={previewData}
        trustBackgroundImage={previewData.sections.hero.backgroundImage?.src}
      />
    </>
  );
}
