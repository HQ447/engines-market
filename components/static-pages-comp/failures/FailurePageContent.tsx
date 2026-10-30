import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import FailureHeadingSection from "@/components/static-pages-comp/failures/FailureHeadingSection";
import FailureParagraphSection from "@/components/static-pages-comp/failures/FailureParagraphSection";
import FailureListSection from "@/components/static-pages-comp/failures/FailureListSection";
import FailureTableSection from "@/components/static-pages-comp/failures/FailureTableSection";
import FailureFaqSection from "@/components/static-pages-comp/failures/FailureFaqSection";
import FailureFormSection from "@/components/static-pages-comp/failures/FailureFormSection";
import FailureLinksSection from "@/components/static-pages-comp/failures/FailureLinksSection";
import FailureLabelSection from "@/components/static-pages-comp/failures/FailureLabelSection";
import FailureCardsSection from "@/components/static-pages-comp/failures/FailureCardsSection";
import FailureStatSection from "@/components/static-pages-comp/failures/FailureStatSection";
import FailureImageSection from "@/components/static-pages-comp/failures/FailureImageSection";
import FailureQuoteSection from "@/components/static-pages-comp/failures/FailureQuoteSection";

function renderFailureContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <FailureHeadingSection block={block} key={index} />;
    case "paragraph": return <FailureParagraphSection block={block} key={index} />;
    case "list": return <FailureListSection block={block} key={index} />;
    case "table": return <FailureTableSection block={block} key={index} />;
    case "faq": return <FailureFaqSection block={block} key={index} />;
    case "form": return <FailureFormSection form={block} key={index} />;
    case "links": return <FailureLinksSection block={block} key={index} />;
    case "label": return <FailureLabelSection block={block} key={index} />;
    case "cards": return <FailureCardsSection block={block} key={index} />;
    case "stat": return <FailureStatSection block={block} key={index} />;
    case "image": return <FailureImageSection block={block} key={index} />;
    case "quote": return <FailureQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function FailurePageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <FailureFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderFailureContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-rose-200 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderFailureContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><FailureTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-rose-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

