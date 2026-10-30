import fs from "node:fs";
import path from "node:path";

export type StaticTable = {
  headers: string[];
  rows: string[][];
};

export type StaticFaq = {
  question: string;
  answer: string;
};

export type StaticForm = {
  action: string;
  method: string;
  fields: Array<{
    element: string;
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
};

export type StaticBlock =
  | { type: "heading"; level: string; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | ({ type: "table" } & StaticTable)
  | ({ type: "faq" } & StaticFaq)
  | ({ type: "form" } & StaticForm)
  | { type: "links"; links: Array<{ href: string; text: string }> }
  | { type: "label"; text: string }
  | { type: "cards"; cards: Array<{ title: string; text: string; highlight: string; meta: string; icon?: string; items?: string[]; fullText?: string }> }
  | { type: "stat"; value: string; label: string }
  | { type: "image"; src: string; alt: string }
  | { type: "quote"; text: string };

export type StaticPageRecord = {
  id: string;
  contentType: string;
  slug: string;
  route: string;
  source: {
    originalFile: string;
    sourceHash: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    openGraph: {
      title: string;
      description: string;
      url: string;
      image: string;
      type: string;
    };
  };
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    options: Array<{ label: string; amount: string; detail: string }>;
    trust: string[];
    image: { src: string; alt: string } | null;
  };
  content: {
    text: string;
    headings: Array<{ level: string; id: string; text: string }>;
    leadBlocks: StaticBlock[];
    sections: Array<{ id: string; heading: string; blocks: StaticBlock[] }>;
  };
  tables: StaticTable[];
  faqs: StaticFaq[];
  relatedLinks: Array<{ href: string; text: string }>;
  media: Array<{ src: string; alt: string; width: string; height: string }>;
  forms: StaticForm[];
  structuredData: unknown[];
  stats: Record<string, number>;
};

function collectJsonFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectJsonFiles(entryPath);
    return entry.name.endsWith(".json") && entry.name !== "index.json" ? [entryPath] : [];
  });
}

function loadPreviewPages(): StaticPageRecord[] {
  const dataRoot = path.join(process.cwd(), "data", "static-pages");
  return collectJsonFiles(dataRoot)
    .map((filePath) => JSON.parse(fs.readFileSync(filePath, "utf8")) as StaticPageRecord)
    .sort((left, right) => left.id.localeCompare(right.id));
}

export const previewPages = loadPreviewPages();

export const previewStaticParams = previewPages.map((page) => ({
  family: page.contentType,
  slug: page.slug.split("/").pop() ?? page.slug,
}));

export function getPreviewPage(family: string, slug: string) {
  return previewPages.find((page) => {
    const pageSlug = page.slug.split("/").pop() ?? page.slug;
    return page.contentType === family && pageSlug === slug;
  });
}
