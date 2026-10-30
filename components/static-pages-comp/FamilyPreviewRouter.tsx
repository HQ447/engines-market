import type { StaticPageRecord } from "@/lib/staticPagePreview";
import StaticPagePreview from "@/components/pages/StaticPagePreview";
import AboutPage from "@/components/pages/previews/AboutPage";
import CaseStudiesPage from "@/components/pages/previews/CaseStudiesPage";
import ComparePage from "@/components/pages/previews/ComparePage";
import FailurePage from "@/components/pages/previews/FailurePage";
import HubPage from "@/components/pages/previews/HubPage";
import InsightsPage from "@/components/pages/previews/InsightsPage";
import LegalPage from "@/components/pages/previews/LegalPage";
import PricePage from "@/components/pages/previews/PricePage";
import RootPage from "@/components/pages/previews/RootPage";
import ServicePage from "@/components/pages/previews/ServicePage";
import SymptomPage from "@/components/pages/previews/SymptomPage";

export default function FamilyPreviewRouter({ page }: { page: StaticPageRecord }) {
  switch (page.contentType) {
    case "case-studies":
      return <CaseStudiesPage page={page} />;
    case "compare":
      return <ComparePage page={page} />;
    case "failures":
      return <FailurePage page={page} />;
    case "prices":
      return <PricePage page={page} />;
    case "services":
      return <ServicePage page={page} />;
    case "symptoms":
      return <SymptomPage page={page} />;
    case "insights":
      return <InsightsPage page={page} />;
    case "about":
      return <AboutPage page={page} />;
    case "legal":
      return <LegalPage page={page} />;
    case "hub":
      return <HubPage page={page} />;
    case "root":
      return <RootPage page={page} />;
    default:
      return <StaticPagePreview page={page} />;
  }
}
