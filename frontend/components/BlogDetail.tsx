"use client";
import SpinLoader from "@/shared/utils/SpinLoader";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const GET_ARTICLES = gql`
  query {
   articles {
      slug
      title
      description
      cover {
        url
        alternativeText
      }
      author {
        name
        email
      }
      category {
        name
        slug
      }
    }
  }
`;

interface Article {
  slug: string;
  title: string;
  description: string;
  cover: {
    url: string;
    alternativeText: string;
  };
  author: {
    name: string;
    email: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

export default function BlogDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const { loading, error, data } = useQuery<{ articles: Article[] }>(GET_ARTICLES);

  if (loading) return <SpinLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const article = data?.articles?.find((a: Article) => a.slug === slug);

  if (!article) return <p>No article found for slug: {slug}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button
        onClick={() => router.push("/blog")}
        className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-8 overflow-hidden rounded-xl">
        <Image
          className="w-full max-h-[520px] object-cover"
          width={1200}
          height={520}
          loading="lazy"
          unoptimized
          src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}${article?.cover?.url}`}
          alt={article?.cover?.alternativeText || article?.title}
        />
      </div>

      <article className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>
            <strong className="text-gray-700">Author:</strong>{" "}
            {article.author.name}
          </span>
          <span>
            <strong className="text-gray-700">Email:</strong>{" "}
            {article.author.email}
          </span>
          <span className="inline-flex flex-wrap items-center rounded-full bg-indigo-50 px-3 py-1 -mt-1 text-indigo-600 font-medium">
            {article.category.name}
          </span>
        </div>

        <hr className="border-gray-200" />

        <p className="text-base leading-relaxed text-gray-700">
          {article.description}
        </p>
      </article>
    </div>

  );
}
