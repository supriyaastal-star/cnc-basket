"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PLAN_DETAILS } from "../common/planData";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/cnc-logo-orange.png";

export default function QuotationSummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected plan key from URL
  const selectedPlanKey = searchParams.get("plan") || "";
  const plan = PLAN_DETAILS[selectedPlanKey];

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    company: "",
  });

  // ⭐ Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user_profile");
    if (saved) {
      setCustomer(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = () => {
    router.push(
      `/payment?plan=${selectedPlanKey}&name=${encodeURIComponent(customer.name)}`
    );
  };

  return (
    <>
    <Link href="/" className="hidden md:block flex justify-center my-10 z-10">
  <Image
    src={logo}
    alt="Logo"
    width={260}
    height={100}
    className="object-contain"
  />
</Link>
     <h1 className="text-3xl font-bold text-center mt-8 text-black">Customer Details</h1>
      <p className="text-gray-500 text-center mb-6">
        Selected Plan: <span className="font-semibold text-orange-600">{plan?.title}</span>
      </p>
    
   <div className="min-h-screen flex justify-center items-start bg-white p-6">
    
  <div className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-start gap-8">
   
    {/* Selected Plan Card */}
    {plan && (
      <div className="bg-white p-6 rounded-xl shadow-md border border-orange-300 w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          {plan.title} Plan
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-4">{plan.price}</p>
        <ul className="text-gray-700 space-y-2">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-green-600">✔</span> {f}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Customer Details Form */}
    <div className="bg-white p-8 shadow-xl rounded-xl w-full md:w-1/2">
      

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-3 border rounded-lg"
          value={customer.company}
          onChange={(e) =>
            setCustomer({ ...customer, company: e.target.value })
          }
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-800 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  </div>
</div>
</>
  );
}
