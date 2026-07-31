"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProductDetailsPage({ params }: { params: { id?: string } }) {
  const [selectedPrimaryProduct, setSelectedPrimaryProduct] = useState("");
  const router = useRouter();

  function goToCategory(category: "mechanical" | "electrical") {
    router.push(`/search-results?category=${category}`);
  }

  const primaryProducts = ["Primary Product A", "Primary Product B", "Primary Product C"];

  const product = {
    name: "Super Widget",
    image: "/images/cnc.jpg",
    companyName: "Widget Corp.",
    address: "123 Industrial Area, City, State, 123456",
    contactPerson: "John Doe",
    mobile: "+91 9876543210",
    email: "contact@widgetcorp.com",
    stockAvailability: "50 Units",
    discount: "10%",
    gstNumber: "27ABCDE1234F1Z5",
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-6 pt-12">
      <div className="bg-gradient-to-b from-yellow-50 via-yellow-100 to-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-5xl w-full text-black flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
          <img src={product.image} alt={product.name} className="rounded-2xl w-full object-cover shadow-lg" />
          <div className="w-full rounded-xl border border-black/20 bg-white/70 p-3 text-sm text-gray-700">
            Selected product id: <span className="font-semibold">{params.id ?? "unknown"}</span>
          </div>
          <select
            value={selectedPrimaryProduct}
            onChange={(e) => setSelectedPrimaryProduct(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-white/20 text-black placeholder-white border border-black/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="" disabled>
              Select Primary Product
            </option>
            {primaryProducts.map((p, idx) => (
              <option key={idx} value={p} className="text-black">
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg">
            <span className="font-semibold">Company Name:</span> {product.companyName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Address:</span> {product.address}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Contact Person:</span> {product.contactPerson}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Mobile:</span> {product.mobile}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {product.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Stock Availability:</span> {product.stockAvailability}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Discount:</span> {product.discount}
          </p>
          <p className="text-lg">
            <span className="font-semibold">GST Number:</span> {product.gstNumber}
          </p>
          <div className="flex justify-start">
            <button onClick={() => goToCategory("mechanical")} className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 py-2 px-4 font-semibold">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
