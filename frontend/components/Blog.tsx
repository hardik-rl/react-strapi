"use client";
import SpinLoader from "@/shared/utils/SpinLoader";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { ArrowRight } from "lucide-react";

const GET_ARTICLES = gql`
  query {
   articles {
      title
      slug
      description
    }
}`;

interface Article {
  title: string;
  slug: string;
  description: string;
}

interface GetArticlesResponse {
  articles: Article[];
}

export default function BlogList() {
  const { loading, error, data } = useQuery<GetArticlesResponse>(GET_ARTICLES);

  if (loading) return <SpinLoader />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.articles?.length) {
    return <p>No articles found.</p>;
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Articles
        </h1>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Insights, stories, and updates from our latest work
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 max-w-7xl mx-auto">
        {data?.articles?.map((item: any) => (
          <li
            key={item.slug}
            className="
          group relative rounded-xl border border-gray-200 bg-white
          p-5 shadow-sm transition-all duration-300
          hover:shadow-lg hover:-translate-y-1
          focus-within:ring-2 focus-within:ring-indigo-500
        "
          >
            <a
              href={`/blog/${item.slug}`}
              className="flex h-full flex-col"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {item.description}
              </p>

              <span className="mt-auto inline-flex items-center text-sm font-medium text-indigo-600 group-hover:underline">
                Read more
                <ArrowRight className="ml-1" size={16} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
