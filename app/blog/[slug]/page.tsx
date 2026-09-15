// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seoMetadata?.metaTitle || `${post.title} | Engines Market`,
    description: post.seoMetadata?.metaDescription || post.excerpt,
    alternates: {
      canonical: post.seoMetadata?.canonicalUrl || `https://enginesmarket.co.uk/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: post.seoMetadata?.ogImage ? [{ url: post.seoMetadata.ogImage }] : [],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Schema.org Article & Breadcrumb Structured Data */}
      {post.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.jsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium dark:text-gray-200 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>By {post.author?.name || "Engines Market Editorial"}</span>
          <span>•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{post.readingTimeMinutes || 1} min read</span>
        </div>
      </header>

      {/* Pre-rendered Semantic HTML Body */}
      <div
        className="cms-content prose prose-lg max-w-none dark:prose-invert leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.html || "" }}
      />
    </article>
  );
}