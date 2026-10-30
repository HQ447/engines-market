import type { ReactNode } from "react";
import type { StaticPageRecord } from "@/lib/staticPagePreview";

export type FamilyPreviewMode = "comparison" | "risk" | "price" | "service" | "diagnostic" | "story" | "data" | "brand" | "document" | "hub" | "action" | "generic";
export type FamilyPreviewTheme = "generic" | "case-studies" | "compare" | "failures" | "prices" | "services" | "symptoms" | "insights" | "about" | "legal" | "hub" | "root";

const pageThemes: Record<FamilyPreviewTheme, { page: string; notice: string; shell: string }> = {
  generic: { page: "bg-[#f7fafc]", notice: "border-emerald-200 bg-emerald-50 text-[#0a2952]", shell: "border-slate-200 bg-white" },
  "case-studies": { page: "bg-orange-50/50", notice: "border-orange-200 bg-orange-50 text-[#0a2952]", shell: "border-orange-200 bg-white" },
  compare: { page: "bg-blue-50/50", notice: "border-blue-200 bg-blue-50 text-[#0a2952]", shell: "border-blue-200 bg-white" },
  failures: { page: "bg-rose-50/50", notice: "border-rose-200 bg-rose-50 text-[#0a2952]", shell: "border-rose-200 bg-white" },
  prices: { page: "bg-amber-50/50", notice: "border-amber-200 bg-amber-50 text-[#0a2952]", shell: "border-amber-200 bg-white" },
  services: { page: "bg-sky-50/50", notice: "border-sky-200 bg-sky-50 text-[#0a2952]", shell: "border-sky-200 bg-white" },
  symptoms: { page: "bg-violet-50/50", notice: "border-violet-200 bg-violet-50 text-[#0a2952]", shell: "border-violet-200 bg-white" },
  insights: { page: "bg-indigo-50/50", notice: "border-indigo-200 bg-indigo-50 text-[#0a2952]", shell: "border-indigo-200 bg-white" },
  about: { page: "bg-emerald-50/50", notice: "border-emerald-200 bg-emerald-50 text-[#0a2952]", shell: "border-emerald-200 bg-white" },
  legal: { page: "bg-slate-100", notice: "border-slate-300 bg-slate-50 text-slate-950", shell: "border-slate-300 bg-white" },
  hub: { page: "bg-teal-50/50", notice: "border-teal-200 bg-teal-50 text-[#0a2952]", shell: "border-teal-200 bg-white" },
  root: { page: "bg-blue-50/50", notice: "border-blue-200 bg-blue-50 text-[#0a2952]", shell: "border-blue-200 bg-white" },
};

export default function FamilyPreviewPage({ page, themeName, mode, hero, body }: { page: StaticPageRecord; themeName: FamilyPreviewTheme; mode: FamilyPreviewMode; hero: ReactNode; body: ReactNode }) {
  const theme = pageThemes[themeName];
  return <div data-preview-family={themeName} data-preview-mode={mode} className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${theme.page}`}>
    <div className="mx-auto max-w-6xl">
      <div className={`mb-5 rounded-xl border px-4 py-3 text-sm shadow-sm ${theme.notice}`}><strong>Preview only:</strong> this family-specific UI is isolated, marked noindex, and does not replace the existing static page.</div>
      {page.structuredData.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.structuredData) }} /> : null}
      <article className={`rounded-3xl border p-5 shadow-xl sm:p-8 lg:p-10 ${theme.shell}`}>
        {hero}
        {body}
      </article>
      <details className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
        <summary className="cursor-pointer font-bold text-[#0a2952]">Preview source details</summary>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div><dt className="font-bold">Source</dt><dd>{page.source.originalFile}</dd></div>
          <div><dt className="font-bold">Route target</dt><dd>{page.route}</dd></div>
          <div className="sm:col-span-2"><dt className="font-bold">Source hash</dt><dd className="break-all">{page.source.sourceHash}</dd></div>
        </dl>
      </details>
    </div>
  </div>;
}
