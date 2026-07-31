"use client";

import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import RoleSelectionModal from "../components/RoleSelectionModal";
import FiltersSidebar from "../components/filters/FiltersSidebar";
import { useSearchParams, useRouter } from "next/navigation";
import logo from "../../public/cnc-logo-white.png";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const premierList = ["Prime A", "Prime B", "Prime C"];

const SAMPLE: Product[] = [
  {
    id: "p1",
    category: "mechanical",
    subcategory: "Ballscrews",
    image: "/images/cnc.jpg",
    city: "Pune",
    state: "Maharashtra",
    inStock: false,
    status: "New",
    gstNumber: "27ABCDE1234F1Z5",
  },
  {
    id: "p2",
    category: "electrical",
    subcategory: "Servo Motors",
    image: "/images/cnc.jpg",
    city: "Mumbai",
    state: "Maharashtra",
    inStock: true,
    status: "New",
    gstNumber: "27ABCDE1234F1Z5",
  },
  {
    id: "p3",
    category: "mechanical",
    subcategory: "LM Guideways",
    image: "/images/cnc.jpg",
    city: "Mumbai",
    state: "Maharashtra",
    inStock: true,
    status: "Old",
    gstNumber: "27ABCDE1234F1Z5",
  },
  {
    id: "p4",
    category: "mechanical",
    subcategory: "LM Guideways",
    image: "/images/cnc.jpg",
    city: "Mumbai",
    state: "Maharashtra",
    inStock: true,
    status: "Old",
    gstNumber: "27ABCDE1234F1Z5",
  },
];

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const condition = searchParams.get("condition");
  const withGst = searchParams.get("with_gst") === "1";

  const states = searchParams.get("state")?.split(",") ?? [];
  const cities = searchParams.get("city")?.split(",") ?? [];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [roleSelectionOpen, setRoleSelectionOpen] = useState(false);

  const filteredProducts = SAMPLE.filter((p) => {
    if (category && p.category !== category) return false;

    if (condition === "new" && p.status !== "New") return false;
    if (condition === "old" && p.status !== "Old") return false;

    if (withGst && !p.gstNumber) return false;

    if (states.length > 0 && !states.includes(p.state)) return false;
    if (cities.length > 0 && !cities.includes(p.city)) return false;

    return true;
  });

  function onGetDetails(p: Product) {
    setSelectedProduct(p);

    if (typeof window !== "undefined") {
      const authState = window.sessionStorage.getItem("auth_state");
      const parsedAuth = authState ? JSON.parse(authState) : null;

      if (parsedAuth?.isLoggedIn) {
        router.push(`/quotation?productId=${p.id}`);
        return;
      }
    }

    setRoleSelectionOpen(true);
  }

return (
  <main className="w-full overflow-x-hidden bg-[#f8f8f8] min-h-screen">

    {/* ================= BANNER ================= */}
    <section className="relative h-[140px] md:h-[220px] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cnc.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Desktop Logo */}
      <Link
        href="/"
        className="hidden md:flex relative z-10 justify-center"
      >
        <Image
          src={logo}
          alt="Logo"
          width={260}
          height={100}
          className="object-contain"
        />
      </Link>
    </section>

    {/* ================= PAGE HEADING ================= */}
    <section className="px-4 py-5 md:py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-[#1F1F1F]">
        Search Results
      </h1>
    </section>

    {/* ================= MAIN CONTENT ================= */}
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pb-8">

      <div className="flex flex-col xl:flex-row gap-6">

        {/* ===== SIDEBAR ===== */}
        <div className="w-full xl:w-[300px] shrink-0">
          <FiltersSidebar />
        </div>

        {/* ===== PRODUCTS ===== */}
        <div className="flex-1">

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <p className="text-gray-500 text-lg">
                No products found for selected filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onGetDetails={() => onGetDetails(p)}
                  premierProducts={premierList}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>

    <RoleSelectionModal
      open={roleSelectionOpen}
      onClose={() => setRoleSelectionOpen(false)}
      productId={selectedProduct?.id}
    />

  </main>
);
}