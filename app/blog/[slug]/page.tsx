import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/cms";
import { EngineQuoteWidget } from "@/components/blog/engine-quote-widget";
import { RelatedGuidesWidget } from "@/components/blog/related-guides-widget";

export const revalidate = 3600;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: `${slug.replace(/-/g, " ")} | Blog` };
  }

  return {
    title: post.seoMetadata?.metaTitle || `${post.title} | Blog`,
    description: post.seoMetadata?.metaDescription || post.excerpt,
    alternates: {
      canonical: post.seoMetadata?.canonicalUrl || `https://enginesmarket.co.uk/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

const articleHtml = post.html || "";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Schema.org Article & Breadcrumb JSON-LD */}
      {post.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.jsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:underline hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline hover:text-foreground">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{post.title}</span>
      </nav>

      {/* Main Grid: 8 Columns Article (~72%) / 4 Columns Sidebar (~28%) */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Left / Main Article Column */}
        <article className="lg:col-span-8 min-w-0">
          {/* Header */}
          <header className="mb-8 space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-y border-border/50 py-3">
              <span>By <strong className="text-foreground font-semibold">{post.author?.name || "Editorial Team"}</strong></span>
              <span>•</span>
              <span>{post.readingTimeMinutes || 2} min read</span>
              <span>•</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* Rendered Semantic HTML Content */}
          <div
            className="cms-content prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        </article>

        {/* Right Sticky Sidebar (Desktop 28% width / Stacks at bottom on mobile) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
          {/* 1. Interactive Reg Lookup & Quote Form */}
          <EngineQuoteWidget siteName="Engines Market" />

          {/* 2. Related Engine Guides */}
          <RelatedGuidesWidget currentSlug={slug} />
        </aside>
      </div>
    </div>
  );
}
