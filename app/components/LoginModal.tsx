"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateAccount?: () => void;
  productId?: string;
};

export default function LoginModal({
  open,
  onClose,
  onCreateAccount,
  productId,
}: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!open) return null;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const identifier = (form.elements[0] as HTMLInputElement)?.value?.trim() || "Buyer";
    const initial = identifier.charAt(0).toUpperCase() || "B";

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "auth_state",
        JSON.stringify({
          isLoggedIn: true,
          role: "buyer",
          name: identifier,
          initial,
        })
      );
    }

    onClose();
    router.push(`/quotation?productId=${productId}`);
  }

  const title = useMemo(() => (mode === "login" ? t("login") : "Sign Up"), [mode]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
          <div className="mb-4 flex rounded-full border border-gray-200 bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${mode === "login" ? "bg-[#1F1F1F] text-white" : "text-gray-600"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${mode === "signup" ? "bg-[#1F1F1F] text-white" : "text-gray-600"}`}
            >
              Signup
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {mode === "login"
              ? "Welcome back. Sign in to continue."
              : "Create your account to continue."}
          </p>

          {mode === "login" ? (
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
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-md px-3 py-2"
              />
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (typeof window !== "undefined") {
                    window.sessionStorage.setItem("auth_state", JSON.stringify({ isLoggedIn: true, role: "buyer", name: "New User" }));
                  }
                  router.push(`/quotation?productId=${productId}`);
                }}
                className="w-full justify-center cursor-pointer px-5 py-2 font-medium rounded-md bg-[#1F1F1F] text-white text-md flex gap-2 items-center border border-transparent transition-all duration-200"
              >
                Create Account
              </button>
            </div>
          )}

          <div className="text-center mt-4 text-sm">
            {mode === "login" ? (
              <>
                {t("dontHaveAccount")}{" "}
                <button onClick={() => setMode("signup")} className="text-blue-600 cursor-pointer font-semibold hover:underline">
                  {t("createAccount")}
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-blue-600 cursor-pointer font-semibold hover:underline">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
