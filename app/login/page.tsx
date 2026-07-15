"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Store } from "lucide-react";

const steps = [
  {
    title: "Browse",
    description: "Explore categories, compare listings, and find the right products quickly.",
  },
  {
    title: "Review",
    description: "Check details, pricing, and availability before you confirm a request.",
  },
  {
    title: "Purchase",
    description: "Complete your order and keep the buying journey moving smoothly.",
  },
];

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-[32px] border border-orange-100 bg-white/90 p-8 shadow-2xl shadow-orange-100/70 backdrop-blur md:p-10">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
            Welcome to CNC Basket
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Choose how you want to continue
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Buyers can browse and purchase products. Sellers can list, manage, and sell their inventory.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="group rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <ShoppingCart size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Buyer</h2>
                <p className="text-sm text-gray-500">Browse and purchase products</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Continue with the existing buyer experience to view products, compare options, and place requests.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 font-medium text-orange-600">
              Continue as Buyer <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => router.push("/seller")}
            className="group rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white">
                <Store size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Seller</h2>
                <p className="text-sm text-gray-500">List and sell your products</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Use the same polished experience to list inventory, manage offers, and complete sales.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 font-medium text-orange-600">
              Continue as Seller <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        <div className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/70 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                  {step.title}
                </div>
                <p className="text-sm leading-6 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
