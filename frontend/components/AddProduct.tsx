"use client"
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useRef, useState } from "react";
import { number, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Int!) {
    createProduct(data: { name: $name, price: $price }) {
      name
      price
    }
  }
`;


export const productSchema = object({
  name: string().required(),
  price: number().required(),
});

const AddProduct = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({ name: "", price: "", });
  const [msg, setMsg] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const [createUser, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data: any) => {
      setMsg("✅ Product Created Successfully!");
      setForm({ name: "", price: "" });
    },
    onError: (error: any) => {
      setMsg(`❌ ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMsg("");

  //   await createUser({
  //     variables: {
  //       name: form.name,
  //       price: parseFloat(form.price),
  //     },
  //   });
  // };

  const trigger = useRef(null);
  const modal = useRef(null);

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    setModalOpen(false);
    //  e.preventDefault();
    setMsg("");
    await createUser({
      variables: {
        name: form.name,
        price: parseFloat(form.price),
      },
    });
  };

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!modal.current) return;
  //     if (
  //       !modalOpen ||
  //       modal.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }) => {
  //     if (!modalOpen || keyCode !== 27) return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  console.log(modalOpen, "open modal");


  return (
    <>
      <div className="container mx-auto mb-5 px-2">
        <div className="flex items-center justify-between">
          <h1 className='text-2xl font-bold'>Product List</h1>
          <button
            className="btn bg-indigo-600 text-white px-4 py-2 rounded"
            ref={trigger}
            onClick={() => setModalOpen(true)}
          >
            Add Product
          </button>
        </div>
        <div className={`fixed bg-black/50 left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${!modalOpen ? "hidden" : "block"}`}>
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] rounded-xl bg-white p-6"
          >
            <h1 className="font-bold text-2xl mb-4">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
              <input
                placeholder="name"
                {...register("name")}
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <p className="text-red-500">{errors.name?.message}</p>
              <input
                placeholder="Price"
                {...register("price")}
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full"
                type="number"
              />
              <p className="text-red-500">{errors.price?.message}</p>

              <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
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

export default AddProduct;
