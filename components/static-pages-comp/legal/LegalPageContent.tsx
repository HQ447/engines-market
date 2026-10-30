import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import LegalHeadingSection from "@/components/static-pages-comp/legal/LegalHeadingSection";
import LegalParagraphSection from "@/components/static-pages-comp/legal/LegalParagraphSection";
import LegalListSection from "@/components/static-pages-comp/legal/LegalListSection";
import LegalTableSection from "@/components/static-pages-comp/legal/LegalTableSection";
import LegalFaqSection from "@/components/static-pages-comp/legal/LegalFaqSection";
import LegalFormSection from "@/components/static-pages-comp/legal/LegalFormSection";
import LegalLinksSection from "@/components/static-pages-comp/legal/LegalLinksSection";
import LegalLabelSection from "@/components/static-pages-comp/legal/LegalLabelSection";
import LegalCardsSection from "@/components/static-pages-comp/legal/LegalCardsSection";
import LegalStatSection from "@/components/static-pages-comp/legal/LegalStatSection";
import LegalImageSection from "@/components/static-pages-comp/legal/LegalImageSection";
import LegalQuoteSection from "@/components/static-pages-comp/legal/LegalQuoteSection";

function renderLegalContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <LegalHeadingSection block={block} key={index} />;
    case "paragraph": return <LegalParagraphSection block={block} key={index} />;
    case "list": return <LegalListSection block={block} key={index} />;
    case "table": return <LegalTableSection block={block} key={index} />;
    case "faq": return <LegalFaqSection block={block} key={index} />;
    case "form": return <LegalFormSection form={block} key={index} />;
    case "links": return <LegalLinksSection block={block} key={index} />;
    case "label": return <LegalLabelSection block={block} key={index} />;
    case "cards": return <LegalCardsSection block={block} key={index} />;
    case "stat": return <LegalStatSection block={block} key={index} />;
    case "image": return <LegalImageSection block={block} key={index} />;
    case "quote": return <LegalQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function LegalPageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <LegalFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderLegalContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-slate-300 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderLegalContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><LegalTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-slate-600`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

