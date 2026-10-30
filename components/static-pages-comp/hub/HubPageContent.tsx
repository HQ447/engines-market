import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import HubHeadingSection from "@/components/static-pages-comp/hub/HubHeadingSection";
import HubParagraphSection from "@/components/static-pages-comp/hub/HubParagraphSection";
import HubListSection from "@/components/static-pages-comp/hub/HubListSection";
import HubTableSection from "@/components/static-pages-comp/hub/HubTableSection";
import HubFaqSection from "@/components/static-pages-comp/hub/HubFaqSection";
import HubFormSection from "@/components/static-pages-comp/hub/HubFormSection";
import HubLinksSection from "@/components/static-pages-comp/hub/HubLinksSection";
import HubLabelSection from "@/components/static-pages-comp/hub/HubLabelSection";
import HubCardsSection from "@/components/static-pages-comp/hub/HubCardsSection";
import HubStatSection from "@/components/static-pages-comp/hub/HubStatSection";
import HubImageSection from "@/components/static-pages-comp/hub/HubImageSection";
import HubQuoteSection from "@/components/static-pages-comp/hub/HubQuoteSection";

function renderHubContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <HubHeadingSection block={block} key={index} />;
    case "paragraph": return <HubParagraphSection block={block} key={index} />;
    case "list": return <HubListSection block={block} key={index} />;
    case "table": return <HubTableSection block={block} key={index} />;
    case "faq": return <HubFaqSection block={block} key={index} />;
    case "form": return <HubFormSection form={block} key={index} />;
    case "links": return <HubLinksSection block={block} key={index} />;
    case "label": return <HubLabelSection block={block} key={index} />;
    case "cards": return <HubCardsSection block={block} key={index} />;
    case "stat": return <HubStatSection block={block} key={index} />;
    case "image": return <HubImageSection block={block} key={index} />;
    case "quote": return <HubQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function HubPageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <HubFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderHubContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-teal-200 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderHubContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><HubTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-teal-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-teal-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

