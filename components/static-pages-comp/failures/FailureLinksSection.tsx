import Link from "next/link";
import type { StaticBlock } from "@/lib/staticPagePreview";
type LinksBlock = Extract<StaticBlock, { type: "links" }>;
export default function FailureLinksSection({ block }: { block: LinksBlock }) {
  return <ul className="mt-4 grid gap-2 sm:grid-cols-2">{block.links.map((link) => <li key={link.href + link.text}>{link.href.startsWith("/") ? <Link className="font-semibold text-[#123d84] hover:underline" href={link.href}>{link.text}</Link> : <a className="font-semibold text-[#123d84] hover:underline" href={link.href}>{link.text}</a>}</li>)}</ul>;
}

