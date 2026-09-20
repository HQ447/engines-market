import Link from "next/link";
import { getBlogPosts } from "@/lib/cms";

interface Props {
  currentSlug: string;
}

export async function RelatedGuidesWidget({ currentSlug }: Props) {
  const { items } = await getBlogPosts(1, 4);

  const relatedPosts = items
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-4 sm:p-5 shadow-sm space-y-3.5 font-['Montserrat',sans-serif]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
          Related Guides
        </h3>
        <Link
          href="/blog"
          className="text-xs font-bold text-[#0055d4] hover:text-[#003d99] hover:underline flex items-center gap-0.5"
        >
          <span>View all guides</span>
          <span className="text-sm leading-none">→</span>
        </Link>
      </div>

      {/* Guide Cards */}
      <div className="space-y-3">
        {relatedPosts.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          const imageUrl =
            (post as any).featuredImage?.url ||
            post.seoMetadata?.ogImage ||
            "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80";

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-2.5 sm:p-3 shadow-xs transition hover:shadow-md hover:border-blue-500/30"
            >
              <div className="relative h-18 w-18 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-100">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                <div>
                  <h4 className="text-xs font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-[#0055d4] transition">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {formattedDate}
                  </p>
                </div>
                <div className="mt-1">
                  <span className="text-[11px] font-bold text-[#0055d4] group-hover:underline flex items-center gap-1">
                    <span>Read More</span>
                    <span className="text-xs leading-none">→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}