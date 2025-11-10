"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, User, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData | "submit", string>>;

export default function InquiryForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Enter a valid email";
    if (form.phone && !form.phone.match(/^\+?[0-9\- ]{7,15}$/)) e.phone = "Enter a valid phone number";
    if (!form.subject.trim()) e.subject = "Please enter a subject";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    if (!form.consent) e.consent = "Please accept privacy terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: new Date().toISOString() }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      setSuccess("Thanks! Your inquiry was submitted.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "", consent: false });
    } catch (err) {
      setErrors({ submit: "Failed to submit. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 sm:p-10 bg-gradient-to-tr from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center gap-4 mt-16 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl text-white shadow-md">
          <Mail size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Send an Inquiry</h2>
          <p className="text-sm text-gray-500">We usually reply within 24 hours — tell us how we can help.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="relative block">
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-600">Name</div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300">
              <User size={18} className="text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </label>

          <label className="relative block">
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-600">Email</div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300">
              <Mail size={18} className="text-gray-400" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-transparent outline-none text-sm"
                type="email"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-600">Phone (optional)</div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300">
              <Phone size={18} className="text-gray-400" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-transparent outline-none text-sm"
                type="tel"
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </label>

          <label>
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-600">Subject</div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
          </label>
        </div>

        <label>
          <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-600">Message</div>
          <div className="flex items-start gap-3 bg-white dark:bg-gray-900 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300">
            <MessageSquare size={18} className="text-gray-400 mt-2" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us more — project details, timelines, budget..."
              rows={5}
              className="w-full bg-transparent outline-none resize-none text-sm"
            />
          </div>
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </label>

        <label className="flex items-start gap-3 mt-2">
          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1" />
          <div className="text-sm text-gray-600">I agree to the <span className="text-indigo-600">privacy policy</span> and to be contacted regarding my inquiry.</div>
        </label>
        {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-medium rounded-lg px-5 py-2 shadow hover:scale-[1.01] transition-transform disabled:opacity-60"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              'Send Inquiry'
            )}
          </button>

          <div className="text-sm text-gray-500">Or email us at <span className="text-indigo-600">hello@company.com</span></div>
        </div>

        {errors.submit && <p className="mt-2 text-sm text-red-500">{errors.submit}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </form>

      <footer className="mt-6 text-xs text-gray-400">By submitting you agree to our terms. We protect your data.</footer>
    </motion.div>
  );
}
