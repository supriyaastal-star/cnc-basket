"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateAccount: () => void;
  productId?: string;
};

export default function LoginModal({
  open,
  onClose,
  onCreateAccount,
  productId,
}: Props) {
  const router = useRouter();

  if (!open) return null;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onClose();
    router.push(`/quotation?productId=${productId}`);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-2">{t("login")}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t("LoginToViewProductDetails")}
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Mobile / Email"
              className="w-full border rounded-md px-3 py-2"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2"
              required
            />

            <button
              type="submit"
              className="w-full justify-center cursor-pointer px-5 py-2 font-medium rounded-md bg-[#1F1F1F] text-white text-md flex gap-2 items-center border border-transparent transition-all duration-200"
            >
              {t("login")}
            </button>
          </form>

          {/* CREATE ACCOUNT LINK */}
          <div className="text-center mt-4 text-sm">
            {t("dontHaveAccount")}
            <button
              onClick={onCreateAccount}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
            {t("createAccount")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
