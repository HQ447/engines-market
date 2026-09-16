import type { EnginePageData } from "@/types/engine-page";
import EngineCompatibility from "./new-doc-engine/sections/EngineCompatibility";
import EngineHero from "./new-doc-engine/sections/EngineHero";
import EngineSpecs from "./new-doc-engine/sections/EngineSpecs";

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
    </>
  );
}
