"use client";
import SpinLoader from "@/shared/utils/SpinLoader";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
    <ul className="p-4 grid grid-cols-3 gap-3">
      {data?.articles?.map((item: any) => (
        <li key={item.slug} className="border p-3 shadow-md rounded-md hover:bg-gray-700 hover:text-white transition">
         <a href={`/blog/${item.slug}`}>
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p>{item.description.slice(0, 100)}...</p>
         </a>
        </li>
      ))}
    </ul>
  );
}
