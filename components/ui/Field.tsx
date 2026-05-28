import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Field({ label, error, ...props }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <input
        {...props}
        className={`w-full px-3 py-2 border rounded-md outline-none
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
