'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyValue: '',
    monthlySalary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyValue: '',
          monthlySalary: '',
        });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to submit form');
      console.error(error);
    }
  };
const router = useRouter();
  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12">
      <h1 className="text-3xl font-semibold text-teal-600 mb-6">Contact Form</h1>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="mb-4 text-teal-600 hover:text-teal-700 focus:outline-none"
      >
        &#8592; Back to Home
      </button>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            name="propertyValue"
            placeholder="Property Value"
            value={formData.propertyValue}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            name="monthlySalary"
            placeholder="Monthly Salary"
            value={formData.monthlySalary}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Submit
        </button>
      </form>

      <Toaster />
    </div>
  );
}
