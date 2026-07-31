import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { t } from "@/lib/i18n";



type Props = {
  product: Product;
  onGetDetails: (product: Product) => void;
  premierProducts?: string[]; // Dropdown options
};

export default function ProductCard({
  product,
  onGetDetails,
  premierProducts = [],
}: Props) {
  const searchParams = useSearchParams();
  const showCompany = searchParams.get("showCompany") === "true";
  const [selectedPremier, setSelectedPremier] = useState("");

  return (
    <article className="relative bg-white/10 backdrop-blur-lg rounded-md shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden border border-white/20">
      {product.gstNumber && (
        <span className="absolute z-10 top-3 left-3 bg-orange-600 text-white font-medium text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <CheckCircle size={14} />
          {t("gSTVerified")}
        </span>
      )}

      {/* Product Image */}
      <div className="w-full aspect-[16/9] relative overflow-hidden rounded-md">
        <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.subcategory}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center px-5 mt-3">
        {product.status && (
          <span
            className={`px-3 py-1 rounded-full text-xs shadow-md ${product.status === "New"
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
              }`}
          >
            {product.status}
          </span>
        )}

        {/* {premierProducts.length > 0 && (
          <select
            value={selectedPremier}
            onChange={(e) => setSelectedPremier(e.target.value)}
            className="rounded-full px-3 py-1 border text-sm text-black flex gap-2 items-center hover:bg-gray-100"
          >
            <option value="" disabled>
              {t("premierProduct")}
            </option>
            {premierProducts.map((p, idx) => (
              <option key={idx} value={p} className="text-black">
                {p}
              </option>
            ))}
          </select>
        )} */}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-black-400">{product.subcategory}</h3>

        {/* Company */}
        {showCompany ? (
          <div className="text-sm font-semibold text-orange-300">
            {t("company")}: {product.company ?? "Not Available"}
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic">{t("company")}: {t("hidden")}</div>
        )}

        <div className="flex justify-between items-center text-sm mt-2">
          <div className="flex flex-col space-y-1">
            {product.city && <span className="text-black-400">{product.city}</span>}
            {product.state && <span className="text-black-400">{product.state}</span>}
          </div>
          <span
            className={`border rounded-full font-medium px-4 py-1 ${product.inStock ? "text-green-400 border-green-400" : "text-red-600 border-red-400"
              }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

      

        <div className="flex justify-center pt-2">
          <button
            onClick={() => onGetDetails(product)}
            className="cursor-pointer px-5 py-2 font-medium rounded-md bg-[#1F1F1F] text-white text-md flex gap-2 items-center border border-transparent hover:bg-white hover:text-[#1F1F1F] hover:border-[#1F1F1F] transition-all duration-200"
          >
           {t("getDetails")}
          </button>
        </div>
      </div>

    </article>
  );
}
