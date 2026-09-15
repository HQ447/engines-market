const CMS_API_URL = process.env.CMS_API_URL || "https://headless-cms-blogs.vercel.app/api/v1";
const SITE_SLUG = process.env.CMS_SITE_SLUG || "enginesmarket";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  htmlContent: string;
  readingTimeMinutes: number;
  featuredImage?: { url: string; altText: string };
  author?: { name: string; avatarUrl: string; bio: string };
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  seo: { title: string; description: string; canonicalUrl?: string };
  publishedAt: string;
}

// Fetch all published posts (for archive & sitemap)
export async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${CMS_API_URL}/sites/${SITE_SLUG}/content?type=post&status=published`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching posts from CMS:", error);
    return [];
  }
}

// Fetch single article by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${CMS_API_URL}/sites/${SITE_SLUG}/content/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching post ${slug} from CMS:`, error);
    return null;
  }
}