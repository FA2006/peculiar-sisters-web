import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section } from "@/components/SiteLayout";
import { ArrowLeft, Calendar } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";

type SanityBlog = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  featuredImage?: any;
  content?: any[];
};

const BLOG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    featuredImage,
    content
  }
`;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await sanityClient.fetch<SanityBlog | null>(
      BLOG_QUERY,
      {
        slug: params.slug,
      },
    );

    return {
      post,
    };
  },

  head: ({ loaderData }) => {
    const post = loaderData?.post;

    const title = post
      ? `${post.title} — Peculiar Sisters Fellowship`
      : "Blog — Peculiar Sisters Fellowship";

    const description =
      post?.excerpt ??
      "Christian living, faith, purpose, marriage, parenting, and leadership.";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
      ],
    };
  },

  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return (
      <SiteLayout>
        <Section>
          <div className="container-app text-center py-24">
            <h1 className="font-display text-4xl text-primary">
              Blog post not found
            </h1>

            <p className="mt-3 text-muted-foreground">
              We couldn't find the article you're looking for.
            </p>

            <Link
              to="/blog"
              className="mt-8 inline-flex rounded-full bg-royal text-white text-sm font-semibold px-5 py-2.5 shadow-gold ring-1 ring-[--gold]/40 hover:brightness-110 transition"
            >
              Back to blog
            </Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }

  const image = post.featuredImage
    ? urlFor(post.featuredImage)
        .width(1600)
        .height(900)
        .url()
    : null;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[--purple] text-primary-foreground">
        {image && (
          <>
            <img
              src={image}
              alt={post.title}
              className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] brightness-75"
            />

            <div className="absolute inset-0 bg-[--purple]/85" />
          </>
        )}

        <div className="container-app relative py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex rounded-full bg-secondary/20 text-[--gold] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]">
              {post.category}
            </div>

            <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/80">
              <Calendar className="h-4 w-4 text-[--gold]" />
              {formatDate(post.publishedAt)}
            </div>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/85 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <Section>
        <div className="container-app">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
          <ArrowLeft className="h-4 w-4" />
            All blog posts
          </Link>

          <article className="max-w-3xl mx-auto">
            {image && (
              <img
                src={image}
                alt={post.title}
                className="w-full rounded-3xl object-cover mb-10"
              />
            )}

            <div className="prose prose-lg max-w-none">
              {post.content?.map((block, index) => {
                if (block._type !== "block") {
                  return null;
                }

                const text = block.children
                  ?.map((child: any) => child.text)
                  .join("");

                if (!text) {
                  return null;
                }

                return (
                  <p key={index}>
                    {text}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </Section>
    </SiteLayout>
  );
}