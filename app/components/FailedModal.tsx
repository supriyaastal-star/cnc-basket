"use client";

import { t } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function FailedModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-red-600">{t("paymentFailed")} ❌</h2>
        <p className="mt-2 text-gray-600">{t("somethingWntWrong")}</p>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg"
        >
          {t("close")}
        </button>
      </motion.div>
    </div>
  );
}
