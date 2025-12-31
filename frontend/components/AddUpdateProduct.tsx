"use client"
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useRef, useState } from "react";
import { number, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Int!, $description: JSON) {
    createProduct(data: { name: $name, price: $price, description: $description }) {
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
 mutation UpdateProduct(
  $documentId: ID!,
  $name: String!,
  $price: Int!,
  $description: JSON
) {
  updateProduct(
    documentId: $documentId
    data: { name: $name, price: $price, description: $description }
  ) {
    documentId
    name
  }
}
`;


export const productSchema = object({
  name: string().required(),
  price: number().typeError("Price must be number").required("Price is required"),
  description: string().required(),
});

const AddUpdateProduct = ({ form, setForm, modalOpen, setModalOpen, prodEdit, setProdEdit }: { form: any, setForm: any, modalOpen: boolean, setModalOpen: any, prodEdit: boolean, setProdEdit: any }) => {

  const [msg, setMsg] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const [createUser, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data: any) => {
      setMsg("✅ Product Created Successfully!");
      setForm({ name: "", price: "", description: "" });
    },
    onError: (error: any) => {
      setMsg(`❌ ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const trigger = useRef(null);
  const modal = useRef(null);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);


  const onSubmit = async (data: any) => {
    // if (errors) return;

    setMsg("");
    setModalOpen(false);
    setProdEdit(false);
    const variables = {
      name: form.name,
      price: parseInt(form.price),
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: form.description,
            },
          ],
        },
      ],
    };

    try {
      if (prodEdit) {
        // ✅ UPDATE
        await updateProduct({
          variables: {
            documentId: prodEdit,
            ...variables,
          },
        });
        toast.success("Product Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        // ✅ CREATE
        await createProduct({
          variables,
        });
        toast.success("Product Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const handleClose = () => {
    setModalOpen(false);
    setProdEdit(false);
    reset();
  }

  return (
    <>
      <div className="container mx-auto mb-5 px-2">
        <div className="flex items-center justify-between">
          <h1 className='text-2xl font-bold'>Product List</h1>
          <button
            className="btn bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-900"
            ref={trigger}
            onClick={() => setModalOpen(true)}
          >
            {prodEdit ? "Update" : "Add Product"}
          </button>

        </div>
        <div className={`fixed bg-black/50 left-0 top-0 z-10 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${!modalOpen ? "hidden" : "block"}`}>
          <div
            ref={modal}
            // onFocus={() => setModalOpen(true)}
            // onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] rounded-xl bg-white p-6"
          >
            <div className="flex items-center mb-4 justify-between">
              <h1 className="font-bold text-2xl cursor-pointer">{prodEdit ? "Update Product" : "Add Product"}</h1>
              <button onClick={() => handleClose()} className="p-3 cursor-pointer"><X /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-2">
              <input
                placeholder="Name"
                {...register("name")}
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full rounded-lg"
              />
              <p className="text-red-500 mb-6">{errors.name?.message}</p>

              <input
                placeholder="Description"
                {...register("description")}
                value={form.description}
                onChange={handleChange}
                className="border p-2 w-full rounded-lg h-24"
              />
              <p className="text-red-500 mb-6">{errors.description?.message}</p>

              <input
                placeholder="Price"
                {...register("price")}
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full rounded-lg"
                type="number"
              />
              <p className="text-red-500 mb-6">{errors.price?.message}</p>

              <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-900 text-white px-4 py-2 rounded cursor-pointer">
                {loading ? "Creating..." : "Submit"}
              </button>
              {msg && <p className="text-sm mt-2">{msg}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateProduct;
