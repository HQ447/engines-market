import type { ModelPageData } from "@/types/model";
import NewDocModelCommonProblems from "@/components/sections/new-doc-model-page-sections/NewDocModelCommonProblems";
import NewDocModelEngineCodes from "@/components/sections/new-doc-model-page-sections/NewDocModelEngineCodes";
import NewDocModelEngineSizes from "@/components/sections/new-doc-model-page-sections/NewDocModelEngineSizes";
import NewDocModelEngineTypes from "@/components/sections/new-doc-model-page-sections/NewDocModelEngineTypes";
import NewDocModelEngineYears from "@/components/sections/new-doc-model-page-sections/NewDocModelEngineYears";
import NewDocModelFaq from "@/components/sections/new-doc-model-page-sections/NewDocModelFaq";
import NewDocModelFuelTypes from "@/components/sections/new-doc-model-page-sections/NewDocModelFuelTypes";
import NewDocModelHero from "@/components/sections/new-doc-model-page-sections/NewDocModelHero";
import NewDocModelHowItWorks from "@/components/sections/new-doc-model-page-sections/NewDocModelHowItWorks";
import NewDocModelLiveMarketPrices from "@/components/sections/new-doc-model-page-sections/NewDocModelLiveMarketPrices";
import NewDocModelReviews from "@/components/sections/new-doc-model-page-sections/NewDocModelReviews";
import NewDocModelTrustCta from "@/components/sections/new-doc-model-page-sections/NewDocModelTrustCta";
import NewDocModelVariantCoverage from "@/components/sections/new-doc-model-page-sections/NewDocModelVariantCoverage";

type Props = {
  data: ModelPageData;
};

export default function NewDocModelPage({ data }: Props) {
  return (
    <>
      <NewDocModelHero data={data} />
      <NewDocModelHowItWorks data={data} />
      <NewDocModelLiveMarketPrices data={data} />
      <NewDocModelReviews data={data} />
      <NewDocModelVariantCoverage data={data} />
      <NewDocModelEngineCodes data={data} />
      <NewDocModelCommonProblems data={data} />
      <NewDocModelEngineTypes data={data} />
      <NewDocModelEngineSizes data={data} />
      <NewDocModelFuelTypes data={data} />
      <NewDocModelEngineYears data={data} />
      <NewDocModelFaq data={data} />
      <NewDocModelTrustCta data={data} />
    </>
  );
}
