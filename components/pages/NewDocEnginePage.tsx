import type { EnginePageData } from "@/types/engine-page";
import EngineCompatibility from "../sections/new-doc-engine-sec/EngineCompatibility";
import EngineHero from "../sections/new-doc-engine-sec/EngineHero";
import EngineSpecs from "../sections/new-doc-engine-sec/EngineSpecs";
import EngineBuyingGuide from "../sections/new-doc-engine-sec/EngineBuyingGuide";
import EngineCostGuide from "../sections/new-doc-engine-sec/EngineCostGuide";
import EngineFaq from "../sections/new-doc-engine-sec/EngineFaq";
import EngineFailures from "../sections/new-doc-engine-sec/EngineFailures";
import EngineRelated from "../sections/new-doc-engine-sec/EngineRelated";
import EngineTrustCta from "../sections/new-doc-engine-sec/EngineTrustCta";
import EngineVariants from "../sections/new-doc-engine-sec/EngineVariants";

type Props = {
  data: EnginePageData;
  trustBackgroundImage?: string;
};

export default function NewDocEnginePage({ data, trustBackgroundImage }: Props) {
  const engineVisual =
    data.sections.hero.engineCutout?.src ?? data.sections.hero.engineImage.src;

  return (
    <>
      <EngineHero data={data.sections.hero} engineCode={data.engine.code} />
      <EngineSpecs
        data={data.sections.specs}
        engineCode={data.engine.code}
        brandName={data.brand.name}
        engineImage={{
          ...data.sections.hero.engineImage,
          src: engineVisual,
        }}
        compatibility={data.sections.compatibility}
      />
      <EngineCompatibility data={data.sections.compatibility} engineCode={data.engine.code} brandName={data.brand.name} />
      <EngineCostGuide data={data.sections.costGuide} engineCode={data.engine.code} image={data.sections.costGuide.image} />
      <EngineFailures data={data.sections.failures} engineCode={data.engine.code} backgroundImage={engineVisual} />
      <EngineVariants data={data.sections.variants} engineCode={data.engine.code} engineImage={engineVisual} backgroundImage={engineVisual} />
      <EngineBuyingGuide data={data.sections.buyingGuide} engineCode={data.engine.code} engineImage={engineVisual} backgroundImage={data.sections.hero.backgroundImage?.src} />
      <EngineRelated data={data.sections.related} engineCode={data.engine.code} engineImage={engineVisual} backgroundImage={engineVisual} />
      <EngineFaq data={data.sections.faq} engineCode={data.engine.code} />
      <EngineTrustCta
        data={data.sections.trustCta}
        engineCode={data.engine.code}
        backgroundImage={trustBackgroundImage}
      />
    </>
  );
}
