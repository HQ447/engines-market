import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/cms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Static pre-rendering for sub-50ms TTFB
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 2. Dynamic SEO Metadata & OpenGraph Social Cards
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: {
      canonical: post.seo?.canonicalUrl || `https://enginesmarket.co.uk/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.featuredImage?.url ? [post.featuredImage.url] : [],
    },
  };
}

// 3. Article View Page
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Google JSON-LD Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Editorial Team",
    },
    image: post.featuredImage?.url,
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8 space-y-4 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>By {post.author?.name || "Editorial Team"}</span>
          <span>•</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span>•</span>
          <time>{new Date(post.publishedAt).toLocaleDateString("en-GB")}</time>
        </div>
      </header>

      {post.featuredImage?.url && (
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.altText || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Semantic Tiptap HTML Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    </article>
  );
}