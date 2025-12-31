"use client"
import React, { useState } from 'react'
import AddUpdateProduct from './AddUpdateProduct'
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { ArrowLeft, ArrowRight, Pencil, Trash } from 'lucide-react';
import SpinLoader from '@/shared/utils/SpinLoader';
import { toast } from 'react-toastify';

const GET_PRODUCTS = gql`
  query {
   products {
   documentId
      name
      price
      description
    }
}`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($documentId: ID!) {
    deleteProduct(documentId: $documentId) {
      documentId
    }
  }
`;

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
    const [form, setForm] = useState({ name: "", price: "", description: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [prodEdit, setProdEdit] = useState(false);

    const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const total = data?.products.length || 0;
    const totalPages = Math.ceil(total / pageSize);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const handleRemoveSingleUser = async (documentId: string) => {
        try {
            await deleteProduct({
                variables: { documentId },
            });

            toast.success("Product Deleted Successfully");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "An error occurred");
        }
    }

    const handleUpdate = async (item: any) => {
        setForm({ name: item?.name, price: item?.price, description: item?.description[0]?.children[0]?.text });
        setProdEdit(item?.documentId);
        setModalOpen(true);
    };

    const paginatedProducts = data?.products.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    if (loading) return <SpinLoader />;
    if (error) {
        toast.error(error.message);
        return <p>Error: {error.message}</p>;
    }

    if (!data?.products?.length) {
        return <p>No products found.</p>;
    }

    return (
        <>
            <AddUpdateProduct modalOpen={modalOpen} setModalOpen={setModalOpen} form={form} setForm={setForm} prodEdit={prodEdit} setProdEdit={setProdEdit} />
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts?.map((item: Product, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td className='w-1/2'>{item.description[0]?.children[0]?.text}</td>
                            <td>{item.price}</td>
                            <td>
                                <div className='flex items-center gap-3'>
                                    <button onClick={() => handleUpdate(item)}>
                                        <Pencil className="cursor-pointer text-blue-700" size={18} />
                                    </button>
                                    <button onClick={() => handleRemoveSingleUser(item?.documentId!)}>
                                        <Trash className="cursor-pointer text-red-500" size={18} />
                                    </button>
                                </div>
                            </td>
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