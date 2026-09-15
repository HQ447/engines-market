import Mg10e4eHero from "@/components/Mg10e4eHero";
import enginePage from "@/data/mg-10e4e-engine.json";
import type { EnginePageData } from "@/types/engine-page";

const data = enginePage as EnginePageData;

export default function PreviewPage() {
  return (
    <Mg10e4eHero
      data={data.sections.hero}
      engineCode={data.engine.code}
      specs={data.sections.specs}
      compatibility={data.sections.compatibility}
    />
  );
}
