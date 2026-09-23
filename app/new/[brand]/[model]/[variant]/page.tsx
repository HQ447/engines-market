import type { Metadata } from "next";
import AutoInternalLinks from "@/components/internal-links/AutoInternalLinks";
import NewDocVariantPage from "@/components/pages/NewDocVariantPage";
import { getInternalLinkPlan } from "@/lib/internalLinkIndex";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import { mapVariantPageDataToNewDocData } from "@/lib/newDocVariantPageData";
import {
  getVariantPageData,
  getVariantPageStaticParams,
} from "@/lib/variantPageData";
import { SITE_URL } from "@/lib/site";
import { notFound, permanentRedirect } from "next/navigation";

const previewAssetRoot = "/images/variant-preview/peugeot-207-1-4-hdi";

type Props = {
  params: Promise<{
    brand: string;
    model: string;
    variant: string;
  }>;
};

function slugPart(value: string) {
  return value.trim().toLowerCase();
}

function getTestingAssetOverrides(
  brand: string,
  model: string,
  modelName: string,
  sourceMainImage?: string,
) {
  const brandSlug = slugPart(brand);
  const modelSlug = slugPart(model);
  const modelImage = resolveModelImagePaths({
    brandSlug,
    modelSlug,
    modelName,
    configuredMainImage: sourceMainImage,
  }).resolvedMainImage;
  const brandLogo = `/BrandsLogos/${brandSlug}-logo-small.webp.webp`;

  return {
    heroBackground: `${previewAssetRoot}/hero-background.png`,
    vehicle: modelImage || sourceMainImage,
    brandLogo,
    commonProblemsVehicle: `${previewAssetRoot}/common-problems-scene.png`,
    usedEngine: `${previewAssetRoot}/used-engine-cutout.png`,
    reconditionedEngine: `${previewAssetRoot}/engine-cutout.png`,
    rebuiltEngine: `${previewAssetRoot}/rebuilt-engine-cutout.png`,
    heroEngine: `${previewAssetRoot}/engine-cutout.png`,
  };
}

export function generateStaticParams() {
  return getVariantPageStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, model, variant } = await params;
  const pageData = await getVariantPageData(brand, model, variant);

  if (!pageData) {
    return {
      title: "New Variant Page Preview",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
    alternates: {
      canonical: pageData.seo.canonical,
    },
    metadataBase: new URL(SITE_URL),
    robots: { index: false, follow: false },
  };
}

export default async function NewVariantTestingPage({ params }: Props) {
  const { brand, model, variant } = await params;
  const sourceData = await getVariantPageData(brand, model, variant);

  if (!sourceData) {
    notFound();
  }

  if (
    brand !== sourceData.brand.slug ||
    model !== sourceData.model.slug ||
    variant !== sourceData.variant.slug
  ) {
    permanentRedirect(
      `/new/${sourceData.brand.slug}/${sourceData.model.slug}/${sourceData.variant.slug}`,
    );
  }

  const internalLinkPlan = await getInternalLinkPlan({
    brandSlug: sourceData.brand.slug,
    modelSlug: sourceData.model.slug,
    currentPath: sourceData.seo.canonical,
    pageType: "variant",
  });

  const dataWithTestingAssets = {
    ...sourceData,
    assets: {
      ...sourceData.assets,
      newDocImages: getTestingAssetOverrides(
        sourceData.brand.slug,
        sourceData.model.slug,
        sourceData.model.name,
        sourceData.assets.mainImage,
      ),
    },
  };

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
      <NewDocVariantPage
        data={mapVariantPageDataToNewDocData(dataWithTestingAssets)}
      />
    </>
  );
}
