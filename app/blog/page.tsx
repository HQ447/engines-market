// import ResourceHubPage from "@/components/pages/ResourceHubPage";
// import { insightLinks, knowledgeLinks } from "@/lib/navigation";

// export const metadata = {
//   title: "Blog | Engines Market",
//   description: "Latest engine replacement guides, insights and resources.",
// };

// export default function BlogPage() {
//   return (
//     <ResourceHubPage
//       eyebrow="Blog"
//       title="Engine Replacement Blog"
//       description="Browse the latest guides and market insights while the dedicated blog archive is being built."
//       sections={[
//         { title: "Knowledge", links: knowledgeLinks },
//         { title: "Insights", links: insightLinks },
//       ]}
//     />
//   );
// }


// app/blog/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog & Engine Guides | Engines Market",
  description: "Expert automotive advice, engine diagnostic guides, and failure solutions from Engines Market.",
  alternates: {
    canonical: "https://enginesmarket.co.uk/blog",
  },
};

export const revalidate = 3600; // Incremental Static Regeneration fallback: 1 hour

export default async function BlogPage() {
  const { items: posts } = await getBlogPosts(1, 24);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Engine Guides &amp; Technical Advice
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Latest automotive buyer guides, failure symptoms, and replacement advice.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-12 text-center dark:border-gray-800">
          <p className="text-base font-semibold text-gray-900 dark:text-white">No articles published yet</p>
          <p className="mt-1 text-xs text-gray-500">Articles published from the CMS will appear here instantly.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2.5 text-xs text-gray-600 line-clamp-3 dark:text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>{post.readingTimeMinutes || 1} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}