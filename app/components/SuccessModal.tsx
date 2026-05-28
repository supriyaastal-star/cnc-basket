"use client";

import { motion } from "framer-motion";

export default function SuccessModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h2>
        <p className="mt-2 text-gray-600">
          Redirecting to product details in <b>20 seconds...</b>
        </p>
      </motion.div>
    </div>
  );
}
