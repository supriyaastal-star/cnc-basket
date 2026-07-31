"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Store } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  productId?: string;
  initialView?: "choice" | "buyer-auth" | "seller-auth";
  defaultRole?: "buyer" | "seller";
};

export default function RoleSelectionModal({
  open,
  onClose,
  productId,
  initialView = "choice",
  defaultRole = "buyer",
}: Props) {
  const router = useRouter();
  const [view, setView] = useState<"choice" | "buyer-auth" | "seller-auth">(initialView);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [activeRole, setActiveRole] = useState<"buyer" | "seller">(defaultRole);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!open) {
      setView(initialView);
      setAuthMode("login");
      setActiveRole(defaultRole);
      setFeedback("");
      return;
    }

    setView(initialView);
    setAuthMode("login");
    setActiveRole(defaultRole);
    setFeedback("");
  }, [open, initialView, defaultRole]);

  if (!open) return null;

  function getStoredAccounts() {
    if (typeof window === "undefined") return [] as Array<{ name: string; email: string; phone: string; password: string; role: "buyer" | "seller" }>;

    try {
      const raw = window.sessionStorage.getItem("buyer_accounts");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveStoredAccounts(accounts: Array<{ name: string; email: string; phone: string; password: string; role: "buyer" | "seller" }>) {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("buyer_accounts", JSON.stringify(accounts));
    }
  }

  function persistAuth(name: string, role: "buyer" | "seller", email?: string, phone?: string) {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "auth_state",
        JSON.stringify({
          isLoggedIn: true,
          role,
          name,
          email: email ?? "",
          phone: phone ?? "",
        })
      );
    }
  }

  function handleSelection(role: "buyer" | "seller") {
    setActiveRole(role);

    if (role === "seller") {
      setView("seller-auth");
      return;
    }

    setView("buyer-auth");
  }

  function handleSignupSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value?.trim() ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim() ?? "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement | null)?.value?.trim() ?? "";
    const password = (form.elements.namedItem("password") as HTMLInputElement | null)?.value ?? "";

    if (!name || !email || !phone || !password) return;

    const accounts = getStoredAccounts();
    const alreadyExists = accounts.some((account) => account.email.toLowerCase() === email.toLowerCase());

    if (alreadyExists) {
      setFeedback("An account with this email already exists. Please login instead.");
      setAuthMode("login");
      return;
    }

    accounts.push({ name, email, phone, password, role: activeRole });
    saveStoredAccounts(accounts);
    setFeedback("Account created. Please login with your email and password to continue.");
    setAuthMode("login");
  }

  function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim() ?? "";
    const password = (form.elements.namedItem("password") as HTMLInputElement | null)?.value ?? "";

    if (!email || !password) return;

    const accounts = getStoredAccounts();
    const matchedAccount = accounts.find(
      (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password
    );

    if (!matchedAccount) {
      setFeedback("Invalid email or password. Please try again.");
      return;
    }

    persistAuth(matchedAccount.name, matchedAccount.role, matchedAccount.email, matchedAccount.phone);
    onClose();
    setFeedback("");

    if (matchedAccount.role === "seller") {
      router.push("/seller");
      return;
    }

    const quotationPath = productId ? `/quotation?productId=${productId}` : "/quotation";
    router.push(quotationPath);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-4xl rounded-[28px] border border-orange-100 bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              Welcome to CNC Basket
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
              {view === "choice"
                ? "Choose how you want to continue"
                : activeRole === "seller"
                  ? "Continue as Seller"
                  : "Continue as Buyer"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              {view === "choice"
                ? "Buyers can browse and purchase products. Sellers can list, manage, and sell their inventory."
                : activeRole === "seller"
                  ? "Enter your details to continue as a seller or create an account if you are new."
                  : "Enter your details to continue as a buyer or create an account if you are new."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        {view === "choice" ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSelection("buyer")}
              className="group rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <ShoppingCart size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Buyer</h3>
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
              onClick={() => handleSelection("seller")}
              className="group rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white">
                  <Store size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Seller</h3>
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
        ) : (
          <div className="mt-8 mx-auto max-w-md rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex rounded-full border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${authMode === "login" ? "bg-[#1F1F1F] text-white" : "text-gray-600"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${authMode === "signup" ? "bg-[#1F1F1F] text-white" : "text-gray-600"}`}
              >
                Sign Up
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {authMode === "login"
                ? "Enter your email and password to continue."
                : "Sign up to continue and receive updates about your order."}
            </p>

            {feedback ? <p className="mt-3 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">{feedback}</p> : null}

            {authMode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#1F1F1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="mt-5 space-y-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-orange-500"
                  required
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#1F1F1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Create Account
                </button>
              </form>
            )}

            <div className="mt-4 text-center text-sm text-gray-600">
              {authMode === "login" ? (
                <>
                  No account yet?{" "}
                  <button type="button" onClick={() => setAuthMode("signup")} className="font-semibold text-orange-600 hover:underline">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button type="button" onClick={() => setAuthMode("login")} className="font-semibold text-orange-600 hover:underline">
                    Login
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setView("choice")}
              className="mt-4 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
