"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import SuccessModal from "../components/SuccessModal";
import FailedModal from "../components/FailedModal";



export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const plan = searchParams.get("plan") || "Selected Plan";
  const numericPrice = parseInt(searchParams.get("price") || "100", 10);
  const amountInPaise = numericPrice * 100;

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  async function startPayment() {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);
    try {
      const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!rzpKey) {
        setLoading(false);
        setFailedOpen(true);
        return;
      }

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        body: JSON.stringify({ amount: amountInPaise }),
      });
      const order = await orderRes.json();

     const options = {
  key: rzpKey,
  amount: amountInPaise,
  currency: "INR",
  name: "Quotation Payment",
  description: `Payment via ${selectedMethod} for ${plan}`,
  order_id: order.id,
  handler: function () {
    // Show success modal
    setLoading(false);
    setSuccessOpen(true);

    // Redirect after 1.5 seconds
    setTimeout(() => {
      router.push("/product-details");
    }, 1500);
  },
  modal: {
    ondismiss: function () {
      setLoading(false);
      setFailedOpen(true);
    },
  },
};


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailedOpen(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        {/* Plan Info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-black capitalize mb-2">{plan}</h1>
          <p className="text-xl font-semibold text-black mb-2">Plan Amount</p>
          <p className="text-5xl font-bold text-black">₹ {numericPrice}</p>
        </div>

        <p className="text-center text-black mb-8">
          Complete your payment to unlock company details and full features.
        </p>
      

        {/* Pay Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startPayment}
          className="w-full py-3 bg-black cursor-pointer rounded-2xl font-bold text-white shadow-xl transition-all"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </motion.button>
      </motion.div>

      {/* Modals */}
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      <FailedModal open={failedOpen} onClose={() => setFailedOpen(false)} />
    </div>
  );
}
