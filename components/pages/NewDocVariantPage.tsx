import type { VariantPreviewData } from "@/data/variant-preview/peugeot207Hdi";
import NewDocVariantCommonProblems from "@/components/sections/new-doc-variant-page-sections/NewDocVariantCommonProblems";
import NewDocVariantEngineCode from "@/components/sections/new-doc-variant-page-sections/NewDocVariantEngineCode";
import NewDocVariantHero from "@/components/sections/new-doc-variant-page-sections/NewDocVariantHero";
import NewDocVariantHistorySpecs from "@/components/sections/new-doc-variant-page-sections/NewDocVariantHistorySpecs";
import NewDocVariantHowItWorks from "@/components/sections/new-doc-variant-page-sections/NewDocVariantHowItWorks";

type Props = { data: VariantPreviewData };

export default function NewDocVariantPage({ data }: Props) {
  return (
    <>
      <NewDocVariantHero {...data} />
      <NewDocVariantHowItWorks steps={data.howItWorks} />
      <NewDocVariantHistorySpecs history={data.history} vehicleImage={data.images.vehicle} />
      <NewDocVariantEngineCode data={data.engineGuide} engineImage={data.images.heroEngine} />
      <NewDocVariantCommonProblems
        data={data.commonProblems}
        vehicleImage={data.images.vehicle}
        backgroundImage={data.images.heroBackground}
      />
    </>
  );
}
