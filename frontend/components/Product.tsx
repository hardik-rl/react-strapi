"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Int!) {
    createProduct(data: { name: $name, price: $price }) {
      name
      price
    }
  }
`;

export default function ProductPage() {
  const [form, setForm] = useState({ name: "", price: "", });
  const [msg, setMsg] = useState("");
  
  const [createUser, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data: any) => {
      setMsg("✅ Product Created Successfully!");
      setForm({ name: "", price: ""});
    },
    onError: (error: any) => {
      setMsg(`❌ ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    await createUser({
      variables: {
        name: form.name,
        price: parseFloat(form.price),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto p-4 border rounded-lg">
      <h1 className="font-bold text-2xl mb-4">Product</h1>
      <input
        name="name"
        placeholder="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full"
        type="number"
      />
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Add Product"}
      </button>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
