import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import SymptomHeadingSection from "@/components/static-pages-comp/symptoms/SymptomHeadingSection";
import SymptomParagraphSection from "@/components/static-pages-comp/symptoms/SymptomParagraphSection";
import SymptomListSection from "@/components/static-pages-comp/symptoms/SymptomListSection";
import SymptomTableSection from "@/components/static-pages-comp/symptoms/SymptomTableSection";
import SymptomFaqSection from "@/components/static-pages-comp/symptoms/SymptomFaqSection";
import SymptomFormSection from "@/components/static-pages-comp/symptoms/SymptomFormSection";
import SymptomLinksSection from "@/components/static-pages-comp/symptoms/SymptomLinksSection";
import SymptomLabelSection from "@/components/static-pages-comp/symptoms/SymptomLabelSection";
import SymptomCardsSection from "@/components/static-pages-comp/symptoms/SymptomCardsSection";
import SymptomStatSection from "@/components/static-pages-comp/symptoms/SymptomStatSection";
import SymptomImageSection from "@/components/static-pages-comp/symptoms/SymptomImageSection";
import SymptomQuoteSection from "@/components/static-pages-comp/symptoms/SymptomQuoteSection";

function renderSymptomContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <SymptomHeadingSection block={block} key={index} />;
    case "paragraph": return <SymptomParagraphSection block={block} key={index} />;
    case "list": return <SymptomListSection block={block} key={index} />;
    case "table": return <SymptomTableSection block={block} key={index} />;
    case "faq": return <SymptomFaqSection block={block} key={index} />;
    case "form": return <SymptomFormSection form={block} key={index} />;
    case "links": return <SymptomLinksSection block={block} key={index} />;
    case "label": return <SymptomLabelSection block={block} key={index} />;
    case "cards": return <SymptomCardsSection block={block} key={index} />;
    case "stat": return <SymptomStatSection block={block} key={index} />;
    case "image": return <SymptomImageSection block={block} key={index} />;
    case "quote": return <SymptomQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function SymptomPageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <SymptomFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderSymptomContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-violet-200 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderSymptomContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><SymptomTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-violet-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-violet-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

