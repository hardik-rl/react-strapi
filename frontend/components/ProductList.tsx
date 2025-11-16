"use client"
import React from 'react'
import ProductPage from './AddProduct'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

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
                    {data?.products?.map((item: Product, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductList