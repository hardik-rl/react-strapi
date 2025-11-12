"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";

const GET_ARTICLES = gql`
  query {
   articles {
      slug
      title
      description
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
  // cover: string;
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

  const { loading, error, data } = useQuery<{ articles: Article[] }>(GET_ARTICLES);
  console.log(data, "data");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const article = data?.articles?.find((a: Article) => a.slug === slug);

  if (!article) return <p>No article found for slug: {slug}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black-700 mb-2">
        <strong>Title:</strong> {article.title}
      </h1>
      <p className="text-black-600 mb-4">Slug: {article.slug}</p>
      <p className="text-black-700">
        <strong>Description:</strong> {article.description}
      </p>
      <p className="text-black-700">
        <strong>Author:</strong> {article.author.name} ({article.author.email})
      </p>
      <p className="text-black-700">
        <strong>Category:</strong> {article.category.name} (Slug: {article.category.slug})
      </p>
    </div>
  );
}
