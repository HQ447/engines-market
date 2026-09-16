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
};

export default function NewDocEnginePage({ data }: Props) {
  return (
    <>
      <EngineHero data={data.sections.hero} engineCode={data.engine.code} />
      <EngineSpecs
        data={data.sections.specs}
        engineCode={data.engine.code}
        brandName={data.brand.name}
        engineImage={data.sections.hero.engineImage}
        compatibility={data.sections.compatibility}
      />
      <EngineCompatibility data={data.sections.compatibility} engineCode={data.engine.code} brandName={data.brand.name} />
      <EngineCostGuide data={data.sections.costGuide} engineCode={data.engine.code} image={data.sections.costGuide.image} />
      <EngineFailures data={data.sections.failures} engineCode={data.engine.code} backgroundImage={data.sections.hero.engineCutout?.src} />
      <EngineVariants data={data.sections.variants} engineCode={data.engine.code} engineImage={data.sections.hero.engineCutout?.src} backgroundImage={data.sections.hero.engineCutout?.src} />
      <EngineBuyingGuide data={data.sections.buyingGuide} engineCode={data.engine.code} engineImage={data.sections.hero.engineCutout?.src} backgroundImage={data.sections.hero.backgroundImage?.src} />
      <EngineRelated data={data.sections.related} engineCode={data.engine.code} engineImage={data.sections.hero.engineCutout?.src} backgroundImage={data.sections.hero.engineCutout?.src} />
      <EngineFaq data={data.sections.faq} engineCode={data.engine.code} />
      <EngineTrustCta data={data.sections.trustCta} engineCode={data.engine.code} backgroundImage="/images/brands/mg/brand/mg-live-market-bg.png" />
    </>
  );
}
