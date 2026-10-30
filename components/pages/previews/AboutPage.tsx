import type { StaticPageRecord } from "@/lib/staticPagePreview";
import AboutPreview from "@/components/static-pages-comp/about/AboutPreview";

export default function AboutPage({ page }: { page: StaticPageRecord }) {
  return <AboutPreview page={page} />;
}
