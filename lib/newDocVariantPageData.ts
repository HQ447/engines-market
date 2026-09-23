import type { NewDocVariantData } from "@/types/new-doc-variant";
import type { VariantPageData } from "@/types/variant";

type NewDocImages = NewDocVariantData["images"];

type VariantAssetsWithNewDocImages = VariantPageData["assets"] & {
  newDocImages?: Partial<NewDocImages>;
};

function splitHeading(value: string) {
  const parts = value.split(/\s+[-—]\s+/);

  if (parts.length < 2) {
    return { titleLead: value, titleAccent: "" };
  }

  return {
    titleLead: parts[0],
    titleAccent: parts.slice(1).join(" — "),
  };
}

function getTimelineItem(description: string, fallbackYear: string) {
  const match = description.match(/^\*\*(\d{4})\*\*\s*-\s*(.*)$/);

  return {
    year: match?.[1] ?? fallbackYear,
    text: match?.[2] ?? description,
  };
}

function getTickerItems(ticker: string) {
  return ticker
    .split("·")
    .map((item) => item.replace(/^\s*[●•]\s*/, "").trim())
    .filter(Boolean);
}

function getImage(
  images: Partial<NewDocImages> | undefined,
  key: keyof NewDocImages,
  fallback: string,
) {
  return images?.[key] || fallback;
}

function getDisplayVariant(
  brandName: string,
  modelName: string,
  modelSlug: string,
  variantName: string,
) {
  const prefixes = [
    `${brandName} ${modelName}`,
    `${brandName} ${modelSlug}`,
    modelName,
    modelSlug,
  ];
  const normalizedVariant = variantName.trim();

  for (const prefix of prefixes) {
    if (normalizedVariant.toLowerCase().startsWith(prefix.toLowerCase())) {
      const remainder = normalizedVariant.slice(prefix.length).trim();
      if (remainder) {
        return remainder;
      }
    }
  }

  return normalizedVariant;
}

export function mapVariantPageDataToNewDocData(
  source: VariantPageData,
): NewDocVariantData {
  const { brand, model, variant, sections } = source;
  const displayModel = model.slug || model.name;
  const displayVariant = getDisplayVariant(
    brand.name,
    model.name,
    model.slug,
    variant.name,
  );
  const heroHeading = splitHeading(sections.hero.h1);
  const historyHeading = splitHeading(sections.historyTimeline.h2);
  const engineHeading = splitHeading(sections.engineGuide.h2);
  const problemsHeading = splitHeading(sections.commonProblems.h2);
  const faqHeading = splitHeading(sections.faq.h2);
  const trustHeading = splitHeading(sections.trustCta.h2);
  const firstEngine = sections.engineGuide.items[0];
  const firstHighlight = sections.hero.highlights?.[0];
  const assets = source.assets as VariantAssetsWithNewDocImages;
  const imageOverrides = assets.newDocImages;
  const vehicleImage = getImage(
    imageOverrides,
    "vehicle",
    assets.mainImage || assets.smallImage || assets.ctaImage || assets.heroBg,
  );
  const engineOptions = sections.hero.engineOptions ?? [];
  const engineCode = firstEngine?.code || "";

  const priceText = firstHighlight?.price ?? "";
  const priceRange = priceText.match(/from\s+(.+)$/i)?.[1] ?? priceText;
  const priceDetails = (firstHighlight?.line2 || firstHighlight?.detail || "")
    .replace(/^\s*->\s*/, "")
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    brand: brand.name,
    model: displayModel,
    variant: displayVariant,
    engineCode,
    images: {
      heroBackground: getImage(imageOverrides, "heroBackground", assets.heroBg),
      vehicle: vehicleImage,
      brandLogo: getImage(imageOverrides, "brandLogo", vehicleImage),
      commonProblemsVehicle: getImage(
        imageOverrides,
        "commonProblemsVehicle",
        assets.heroBg,
      ),
      usedEngine: getImage(
        imageOverrides,
        "usedEngine",
        engineOptions[0]?.image || assets.heroBg,
      ),
      reconditionedEngine: getImage(
        imageOverrides,
        "reconditionedEngine",
        engineOptions[1]?.image || engineOptions[0]?.image || assets.heroBg,
      ),
      rebuiltEngine: getImage(
        imageOverrides,
        "rebuiltEngine",
        engineOptions[2]?.image || engineOptions[0]?.image || assets.heroBg,
      ),
      heroEngine: getImage(
        imageOverrides,
        "heroEngine",
        engineOptions[0]?.image || assets.heroBg,
      ),
    },
    hero: {
      eyebrow: sections.hero.tag,
      titleLead: heroHeading.titleLead,
      titleAccent: heroHeading.titleAccent,
      description: sections.hero.subheading,
      trustItems: sections.hero.trustBadges,
      price: {
        engineName: firstHighlight?.title || `${brand.name} ${model.name} engine`,
        range: priceRange,
        details: priceDetails,
      },
      options: engineOptions.map((option) => ({
        title: `${brand.name} ${displayModel}`,
        description: `${option.label} Engine — ${engineCode}`,
        image:
          option.tone === "used"
            ? getImage(imageOverrides, "usedEngine", option.image || assets.heroBg)
            : option.tone === "reconditioned"
              ? getImage(
                  imageOverrides,
                  "reconditionedEngine",
                  option.image || assets.heroBg,
                )
              : option.tone === "rebuilt"
                ? getImage(
                    imageOverrides,
                    "rebuiltEngine",
                    option.image || assets.heroBg,
                  )
                : option.image || assets.heroBg,
        href: "#quote-form",
      })),
      cta: sections.hero.form.buttonText || sections.hero.ctaLinkText,
      tickerItems: getTickerItems(sections.hero.ticker),
    },
    howItWorks: sections.howItWorks.cards.map((card) => ({
      number: String(card.number).padStart(2, "0"),
      title: card.front.h3,
      description: card.front.text,
      back: [card.back.heading, card.back.text, ...card.back.bullets]
        .filter(Boolean)
        .join(" "),
    })),
    history: {
      eyebrow: sections.historyTimeline.tag,
      titleLead: historyHeading.titleLead,
      titleAccent: historyHeading.titleAccent,
      description: sections.historyTimeline.intro,
      specs: sections.historyTimeline.specs.map(({ label, value }) => [label, value]),
      timeline: sections.historyTimeline.milestones.map((milestone, index) =>
        getTimelineItem(milestone.description, milestone.year || String(2006 + index)),
      ),
      closing: sections.historyTimeline.closingNote || "",
    },
    engineGuide: {
      eyebrow: sections.engineGuide.tag,
      titleLead: engineHeading.titleLead,
      titleAccent: engineHeading.titleAccent,
      description: sections.engineGuide.intro || sections.engineGuide.sectionSubtitle || "",
      engineName: firstEngine
        ? `${firstEngine.code} — ${firstEngine.title}`
        : `${brand.name} ${model.name} engine`,
      specs: (firstEngine?.specs || []).map(({ label, value }) => [label, value]),
      prices: (firstEngine?.costs || []).map(({ label, value }) => [label, value]),
      commonFailure: firstEngine?.commonFailure || "",
      cta: firstEngine?.cta || "",
      closing: firstEngine?.closing || "",
    },
    commonProblems: {
      eyebrow: sections.commonProblems.tag,
      titleLead: problemsHeading.titleLead,
      titleAccent: problemsHeading.titleAccent,
      description: sections.commonProblems.h3,
      vehicleValue: sections.commonProblems.h3,
      closingCta: {
        title: sections.commonProblems.finalCta.h4,
        description: sections.commonProblems.finalCta.paragraph,
        cta: sections.commonProblems.finalCta.buttonText,
      },
      cards: sections.commonProblems.problems.map((problem) => ({
        title: problem.group,
        affected: problem.affectedModels,
        mileage: problem.typicalFailureMileage,
        rootCause: problem.rootCause,
        repairOptions: (problem.repairOptions || []).map((option) => ({
          tier: option.tier,
          dealer: option.dealerPrice,
          specialist: option.specialistPrice,
        })),
        recommendation: problem.recommendation || "",
        cta: problem.cta,
      })),
    },
    faq: {
      eyebrow: sections.faq.tag,
      titleLead: faqHeading.titleLead,
      titleAccent: faqHeading.titleAccent,
      description: sections.faq.intro,
      items: sections.faq.items.map((item, index) => ({
        question: item.question.replace(/\s*[-—]\s*$/, "?"),
        answer: item.answer,
        icon: (["price", "problems", "value", "life", "compare", "code"] as const)[index % 6],
        highlights: item.comparisonTable?.rows.flatMap((row) =>
          row.map((value, columnIndex) => ({
            label: item.comparisonTable?.headers[columnIndex] || "",
            value,
          })),
        ),
        bullets: item.keyPoints,
        cta: item.cta,
      })),
    },
    whyChoose: {
      eyebrow: sections.trustCta.tag,
      titleLead: trustHeading.titleLead,
      titleAccent: trustHeading.titleAccent,
      description: sections.trustCta.finalText || sections.trustCta.intro,
      benefits: sections.trustCta.points.map((point, index) => ({
        value: point.title.split(" ")[0],
        label: point.title,
        icon: (["network", "warranty", "delivery"] as const)[index % 3],
      })),
      cta: sections.trustCta.buttonText,
      note: sections.trustCta.intro,
    },
  };
}
