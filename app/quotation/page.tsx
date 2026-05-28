"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/cnc-logo-orange.png";
import Link from "next/link";

export default function QuotationPage() {
  const router = useRouter();

  const plans = [
    {
      title: "Silver",
      price: "₹ 100 / YEAR",
      features: [
        "Seller product View 1",
        "Contact information of the seller",
        "Complete product information",
        "Notification Through Message",
        "Location Wise Search",
        "Product Search History",
      ],
      buttonColor: "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:opacity-90",
    },
    {
      title: "Gold",
      price: "₹ 300 / YEAR",
      features: [
        "Seller product View 4",
        "Contact information of the seller",
        "Complete product information",
        "Notification Through Message",
        "Location Wise Search",
        "Product Search History",
      ],
      highlighted: true,
      buttonColor: "bg-gradient-to-r from-orange-400 to-red-400 text-white hover:scale-105",
    },
    {
      title: "Platinum",
      price: "₹ 500 / YEAR",
      features: [
        "Seller product View 8",
        "Contact information of the seller",
        "Complete product information",
        "Notification Through Message",
        "Location Wise Search",
        "Product Search History",
      ],
      buttonColor: "bg-black text-white hover:scale-105",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-8">


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full text-center"
      >
        <Link href="/" className="hidden md:flex justify-center mb-8">
  <Image
    src={logo}
    alt="Logo"
    width={260}
    height={100}
    className="object-contain"
  />
</Link>
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-4xl md:text-5xl font-bold mb-3 text-black-800"
        >
          Choose Your Package
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 mb-12 mx-auto max-w-xl text-center text-lg font-medium leading-relaxed"
        >
          View seller products, contact details, full product info, notifications via messages, location-wise search, product search history, and quotation pricing.
        </motion.p>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 40px rgba(0,0,0,0.2)",
              }}
              className={`relative rounded-3xl p-8 transition-transform duration-300 bg-white border ${
                plan.highlighted
                  ? "border-orange-600 shadow-xl ring-2 ring-orange-600 bg-gradient-to-b from-orange-50 via-orange-100 to-white"
                  : "border-orange-400 shadow-md"
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <span className="absolute top-2 right-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-xs font-bold py-1 px-2 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <h2 className="text-3xl font-bold mb-2">{plan.title}</h2>
              <p className="text-xl font-semibold text-gray-700 mb-6">{plan.price}</p>

              <ul className="text-gray-700 space-y-3 mb-6 text-left px-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>

<button
  onClick={() =>
    router.push(`/quotation-summary?plan=${plan.title.toLowerCase()}`)
  }
  className={`w-full py-3 rounded-xl font-semibold transition-all cursor-pointer ${plan.buttonColor}`}
>
  Get Plan
</button>



            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
