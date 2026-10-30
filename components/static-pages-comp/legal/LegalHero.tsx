import Image from "next/image";
import type { StaticPageRecord } from "@/lib/staticPagePreview";

export default function LegalHero({ page }: { page: StaticPageRecord }) {
  return <section className="rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm sm:p-8"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">{page.hero.eyebrow}</p><h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{page.hero.heading || page.seo.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{page.hero.lead}</p>{page.hero.trust.length?<div className="mt-5 flex flex-wrap gap-2">{page.hero.trust.map(item=><span className="rounded-full bg-[#0a2952]/10 px-3 py-1 text-xs font-semibold text-[#0a2952]" key={item}>{item}</span>)}</div>:null}{page.hero.image?<Image className="mt-6 max-h-72 w-full rounded-xl object-contain" src={page.hero.image.src} alt={page.hero.image.alt} width={1200} height={630}/>:null}</section>;
}
