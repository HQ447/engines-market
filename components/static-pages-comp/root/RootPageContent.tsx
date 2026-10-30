import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import RootHeadingSection from "@/components/static-pages-comp/root/RootHeadingSection";
import RootParagraphSection from "@/components/static-pages-comp/root/RootParagraphSection";
import RootListSection from "@/components/static-pages-comp/root/RootListSection";
import RootTableSection from "@/components/static-pages-comp/root/RootTableSection";
import RootFaqSection from "@/components/static-pages-comp/root/RootFaqSection";
import RootFormSection from "@/components/static-pages-comp/root/RootFormSection";
import RootLinksSection from "@/components/static-pages-comp/root/RootLinksSection";
import RootLabelSection from "@/components/static-pages-comp/root/RootLabelSection";
import RootCardsSection from "@/components/static-pages-comp/root/RootCardsSection";
import RootStatSection from "@/components/static-pages-comp/root/RootStatSection";
import RootImageSection from "@/components/static-pages-comp/root/RootImageSection";
import RootQuoteSection from "@/components/static-pages-comp/root/RootQuoteSection";

function renderRootContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <RootHeadingSection block={block} key={index} />;
    case "paragraph": return <RootParagraphSection block={block} key={index} />;
    case "list": return <RootListSection block={block} key={index} />;
    case "table": return <RootTableSection block={block} key={index} />;
    case "faq": return <RootFaqSection block={block} key={index} />;
    case "form": return <RootFormSection form={block} key={index} />;
    case "links": return <RootLinksSection block={block} key={index} />;
    case "label": return <RootLabelSection block={block} key={index} />;
    case "cards": return <RootCardsSection block={block} key={index} />;
    case "stat": return <RootStatSection block={block} key={index} />;
    case "image": return <RootImageSection block={block} key={index} />;
    case "quote": return <RootQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function RootPageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <RootFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderRootContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-blue-200 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderRootContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><RootTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-blue-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

