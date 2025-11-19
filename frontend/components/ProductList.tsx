"use client"
import React, { useState } from 'react'
import ProductPage from './AddProduct'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const GET_PRODUCTS = gql`
  query {
   products {
      name
      price
    }
}`;

interface Product {
    name: string;
    price: number;
}

const ProductList = () => {
    const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const total = data?.products.length || 0;
    const totalPages = Math.ceil(total / pageSize);

    const paginatedProducts = data?.products.slice(
        (page - 1) * pageSize,
        page * pageSize
    );


    if (loading) return <p>Loading...</p>;
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
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts?.map((item: Product, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center gap-3 mt-4">
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