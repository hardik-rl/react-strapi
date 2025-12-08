"use client"
import React, { useState } from 'react'
import ProductPage from './AddProduct'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SpinLoader from '@/shared/utils/SpinLoader';
import Image from 'next/image';

const GET_PRODUCTS = gql`
  query {
   products {
      name
      price
      description
      rating
      stock
      image {
        url
        alternativeText
      }
    }
}`;

interface Product {
    name: string;
    price: number;
    description: Array<{ children: Array<{ text: string }> }>;
    rating: number;
    stock: number;
    image: {
        url: string;
        alternativeText: string;
    }
}

const ProductList = () => {
    const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
    console.log(data, "data");

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const total = data?.products.length || 0;
    const totalPages = Math.ceil(total / pageSize);

    const paginatedProducts = data?.products.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    if (loading) return <SpinLoader />;
    if (error) return <p>Error: {error.message}</p>;

    if (!data?.products?.length) {
        return <p>No products found.</p>;
    }

    return (
        <>
            <ProductPage />
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Rating</th>
                        {/* <th>Stock</th> */}
                        {/* <th>image</th> */}
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts?.map((item: Product, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description[0]?.children[0]?.text}</td>
                            <td>{item.price}</td>
                            <td>{item.rating}</td>
                            {/* <td>{item.stock}</td> */}
                            {/* <td>
                                <Image src={
                                    item?.image?.url
                                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`
                                        : "/placeholder.png"
                                } alt={item.image.alternativeText  || "Image"} width={50} height={50} />
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center gap-3 my-8">
                <button
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer flex items-center gap-1"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    <ArrowLeft />
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer flex items-center gap-1"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    <ArrowRight />
                </button>
            </div>
        </>
    )
}

export default ProductList