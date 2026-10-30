import type { StaticBlock } from "@/lib/staticPagePreview";
type LabelBlock = Extract<StaticBlock, { type: "label" }>;
export default function LegalLabelSection({ block }: { block: LabelBlock }) {
  return <p className={`mt-5 text-xs font-black uppercase tracking-[0.12em] text-slate-600`}>{block.text}</p>;
}

