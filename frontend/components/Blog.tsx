"use client";
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

export default function BlogList() {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.articles?.length) {
    return <p>No articles found.</p>;
  }

  return (
    <ul className="p-4 space-y-3">
      {data?.articles?.map((item: any) => (
        <li key={item.slug} className="border p-3 rounded-md hover:bg-gray-50">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
