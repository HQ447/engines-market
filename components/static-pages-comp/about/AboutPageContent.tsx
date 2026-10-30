import type { ReactNode } from "react";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import AboutHeadingSection from "@/components/static-pages-comp/about/AboutHeadingSection";
import AboutParagraphSection from "@/components/static-pages-comp/about/AboutParagraphSection";
import AboutListSection from "@/components/static-pages-comp/about/AboutListSection";
import AboutTableSection from "@/components/static-pages-comp/about/AboutTableSection";
import AboutFaqSection from "@/components/static-pages-comp/about/AboutFaqSection";
import AboutFormSection from "@/components/static-pages-comp/about/AboutFormSection";
import AboutLinksSection from "@/components/static-pages-comp/about/AboutLinksSection";
import AboutLabelSection from "@/components/static-pages-comp/about/AboutLabelSection";
import AboutCardsSection from "@/components/static-pages-comp/about/AboutCardsSection";
import AboutStatSection from "@/components/static-pages-comp/about/AboutStatSection";
import AboutImageSection from "@/components/static-pages-comp/about/AboutImageSection";
import AboutQuoteSection from "@/components/static-pages-comp/about/AboutQuoteSection";

function renderAboutContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <AboutHeadingSection block={block} key={index} />;
    case "paragraph": return <AboutParagraphSection block={block} key={index} />;
    case "list": return <AboutListSection block={block} key={index} />;
    case "table": return <AboutTableSection block={block} key={index} />;
    case "faq": return <AboutFaqSection block={block} key={index} />;
    case "form": return <AboutFormSection form={block} key={index} />;
    case "links": return <AboutLinksSection block={block} key={index} />;
    case "label": return <AboutLabelSection block={block} key={index} />;
    case "cards": return <AboutCardsSection block={block} key={index} />;
    case "stat": return <AboutStatSection block={block} key={index} />;
    case "image": return <AboutImageSection block={block} key={index} />;
    case "quote": return <AboutQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function AboutPageContent({ page }: { page: StaticPageRecord }) {
  const leadBlocks = page.content.leadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === page.hero.lead));
  const sectionsContainFaqs = page.content.sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...page.content.sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {page.forms.map((form: StaticForm, index) => <AboutFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderAboutContentBlock(block, index))}</div> : null}
    {page.content.sections.map((section) => <section className={`mt-10 border-t border-emerald-200 pt-8`} id={section.id} key={section.id}><h2 className="text-2xl font-black text-[#0a2952] sm:text-3xl">{section.heading}</h2><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderAboutContentBlock(block, index))}</div></section>)}
    {page.tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><AboutTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && page.faqs.length ? <section className={`mt-10 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-emerald-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{page.faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

