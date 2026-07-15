"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Package, PlusCircle, TrendingUp } from "lucide-react";

const sellerSteps = [
  {
    title: "Create listings",
    icon: PlusCircle,
    description: "Add product details, pricing, and availability for new inventory.",
  },
  {
    title: "Manage offers",
    icon: Package,
    description: "Review incoming requests, update status, and keep buyers informed.",
  },
  {
    title: "Grow sales",
    icon: TrendingUp,
    description: "Track activity and close more sales with a consistent sales workflow.",
  },
];

export default function SellerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-[32px] border border-orange-100 bg-white p-8 shadow-2xl shadow-orange-100/70 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              Seller workspace
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Manage your selling flow from one place
            </h1>
            <p className="mt-3 max-w-2xl text-base text-gray-600">
              This flow mirrors Buyer’s structure so product discovery, review, and completion stay familiar and easy to follow.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Back to role selection <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sellerSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/70 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sell with confidence</h2>
              <p className="mt-2 text-sm text-gray-600">
                List products, keep updates current, and move quickly from inquiry to successful sale.
              </p>
            </div>
            <button
              type="button"
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              Start selling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
