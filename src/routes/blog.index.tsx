import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import { ArrowRight, Calendar } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  featuredImage?: any;
};

const BLOG_QUERY = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    featuredImage
  }
`;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const posts = await sanityClient.fetch<SanityPost[]>(BLOG_QUERY);

    return {
      posts,
    };
  },

  head: () => ({
    meta: [
      { title: "Blog — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Christian living, marriage, purpose, faith, and leadership — inspiration for peculiar women.",
      },
    ],
  }),

  component: Blog,
});

function Blog() {
  const { posts } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Words for the Peculiar Woman"
        subtitle="Inspiration, teaching, and reflection to feed your faith and your walk."
      />

      <Section>
        <div className="container-app grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => {
              const image = post.featuredImage
                ? urlFor(post.featuredImage)
                    .width(800)
                    .height(500)
                    .url()
                : null;

              return (
                <article
                  key={post._id}
                  className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden hover:shadow-elegant transition"
                >
                  <div className="h-44 bg-royal relative overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_30%,var(--gold)_0,transparent_60%)]" />

                        <div className="absolute bottom-4 left-4 text-[--gold] font-display text-4xl">
                          {post.title[0]}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-secondary/20 text-primary px-3 py-1 font-medium">
                        {post.category}
                      </span>

                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl text-primary group-hover:text-accent transition">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-16">
              No blog posts available yet.
            </p>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
