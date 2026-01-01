import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Products & Blogs
            <span className="block text-indigo-200">
              Powered by Headless CMS
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
            A modern React + Strapi platform showcasing real-world product
            management and content publishing with scalable architecture.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/product"
              className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition"
            >
              Explore Products
            </Link>

            <Link
              href="/blog"
              className="px-8 py-4 bg-indigo-500/20 border border-white/30 text-white font-semibold rounded-xl hover:bg-indigo-500/30 transition"
            >
              Read Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Products", value: "10+" },
              { title: "Blogs", value: "10+" },
              { title: "CMS Driven", value: "100%" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-8 text-center"
              >
                <h3 className="text-4xl font-bold text-indigo-600">
                  {item.value}
                </h3>
                <p className="mt-2 text-gray-600">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Why This Platform?
          </h2>

          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Designed to demonstrate scalable frontend architecture with a
            powerful content management backend.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Headless CMS",
                desc: "Manage content independently using Strapi admin panel.",
              },
              {
                title: "Product Management",
                desc: "Create, update and publish products with media support.",
              },
              {
                title: "Blog System",
                desc: "SEO-friendly blogs with rich text and slugs.",
              },
              {
                title: "Fast UI",
                desc: "Optimized React components with clean UX.",
              },
              {
                title: "Secure APIs",
                desc: "Role-based access using Strapi permissions.",
              },
              {
                title: "Scalable Design",
                desc: "Easily extendable to e-commerce or dashboards.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border p-8 hover:shadow-2xl transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Explore the Platform?
          </h2>

          <p className="mt-4 text-gray-300">
            Browse products and blogs managed directly from Strapi CMS.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/product"
              className="px-8 py-4 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Products
            </Link>

            <Link
              href="/blog"
              className="px-8 py-4 border border-gray-600 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Blogs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
