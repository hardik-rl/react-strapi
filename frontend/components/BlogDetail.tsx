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
    <div className="p-6">
      <button
        onClick={() => router.push("/blog")}
        className="flex mb-4 items-center gap-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
      <Image
        className="w-full max-h-[520px] object-cover object-top mb-4 rounded"
        width={320}
        height={520}
        loading="lazy"
        unoptimized
        src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}${article?.cover?.url}` || ""}
        alt={article?.cover?.alternativeText}
      />
      <h1 className="text-2xl text-black-700 mb-2">
        <strong> {article.title}</strong>
      </h1>
      <p className="text-black-700">
        <strong>Description:</strong> {article.description}
      </p>
      <p className="text-black-700">
        <strong>Author:</strong> {article.author.name} ({article.author.email})
      </p>
      <p className="text-black-700">
        <strong>Category:</strong> {article.category.name}
      </p>
    </div>
  );
}
