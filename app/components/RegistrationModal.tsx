"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterFormData, registerSchema } from "../schemas/registerSchema";
import { t } from "@/lib/i18n";

// Import Zod Schema + Type
// import {
//   registerSchema,
//   RegisterFormData,
// } from "@/app/schemas/registerSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productId?: string | null;
};

export default function RegistrationModal({ open, onClose, productId }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      personName: "",
      mobile: "",
      altMobile: "",
      address: "",
      website: "",
      gstNumber: "",
    },
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  if (!open) return null;
async function onSubmit(data: RegisterFormData) {
  try {
    const resp = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, productId: productId ?? null }),
    });

    const resJson = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      alert(resJson?.message || "Submission failed");
      return;
    }

    // ⭐ SAVE USER DETAILS FOR AUTO-FILL
    localStorage.setItem(
      "user_profile",
      JSON.stringify({
        name: data.personName,
        email: data.website ?? "",
        phone: data.mobile,
        company: data.companyName,
      })
    );

    onClose();

    router.push(
      `/quotation?productId=${encodeURIComponent(productId ?? "")}`
    );
  } catch {
    alert("Network error");
  }
}


  // Slide animation classes
  const panelBase =
    "fixed top-0 right-0 h-full w-full max-w-2xl z-50 transform transition-transform duration-300";
  const panelVisible = "translate-x-0";
  const panelHidden = "translate-x-full";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div
        className={`${panelBase} ${open ? panelVisible : panelHidden}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col bg-white shadow-2xl">
          {/* Header */}
          <div
            className="px-6 py-6 cursor-pointer bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white hover:opacity-90 text-md text-black flex gap-2 items-center hover:bg-gray-100"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {t("registerTitle")}
                </h3>
                <p className="text-white text-sm">
                  {t("registerSubtitle")}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-md"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              {/* Company */}
              <div>
                <label className="text-sm font-medium">{t("companyName")} *</label>
                <input
                  {...register("companyName")}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
                {errors.companyName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Person */}
              <div>
                <label className="text-sm font-medium">{t("personName")} *</label>
                <input
                  {...register("personName")}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
                {errors.personName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.personName.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">{t("mobile")} *</label>
                  <input
                    {...register("mobile")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                   {t("altMobile")}
                  </label>
                  <input
                    {...register("altMobile")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium">{t("address")} *</label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Website + GST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">{t("website")}</label>
                  <input
                    {...register("website")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">{t("gstNumber")}</label>
                  <input
                    {...register("gstNumber")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                  {t("privacyNote")}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 rounded-full border"
                  >
                    {t("cancel")}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 cursor-pointer px-5 py-2 bg-black text-md flex gap-2 items-center hover:bg-gray-600 rounded-full text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-500">
           {t("footerNote")}
          </div>
        </div>
      </div>
    </>
  );
}
