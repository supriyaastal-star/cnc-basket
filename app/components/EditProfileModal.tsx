"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ProfileFormData, profileSchema } from "../schemas/profile.schema";
import Field from "@/components/ui/Field";
import { t } from "@/lib/i18n";


type Props = {
  open: boolean;
  onClose: () => void;
  onSave:(data:ProfileFormData) => void;
  defaultValues:ProfileFormData;
};

export default function EditProfileModal({ open, onClose,onSave,defaultValues }: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } =
  useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });


  async function onSubmit(data: ProfileFormData) {
    try {
      setLoading(true);

      // ✅ API integration pattern
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      onClose();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">{t("editProfile")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <Field
    label="Name"
    {...register("name")}
    error={errors.name?.message}
  />

  <Field
    label="Email"
    type="email"
    {...register("email")}
    error={errors.email?.message}
  />

  <Field
    label="Phone"
    {...register("phone")}
    error={errors.phone?.message}
  />

  <Field
    label="City"
    {...register("city")}
    error={errors.city?.message}
  />

  <Field
    label="State"
    {...register("state")}
    error={errors.state?.message}
  />

  <Field
    label="GST"
    {...register("gst")}
    error={errors.gst?.message}
  />

  {/* Buttons full width */}
  <div className="md:col-span-2 flex justify-end gap-3 pt-4">
    <button
      type="button"
      onClick={onClose}
      disabled={loading}
      className="border cursor-pointer px-4 cursor-pointer py-2 rounded-md font-bold"
    >
      {t("cancel")}
    </button>

    <button
      type="submit"
      disabled={loading}
      className="px-5 py-2 font-bold cursor-pointer rounded-md bg-gradient-to-t from-orange-400 via-orange-500 to-orange-600 text-white flex items-center gap-2"
    >
      {loading && <Loader2 className="animate-spin" size={16} />}
      {t("save")}
    </button>
  </div>

</form>
      </div>
    </div>
  );
}
