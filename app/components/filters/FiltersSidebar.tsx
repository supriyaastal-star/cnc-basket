"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LOCATIONS from "./data/locations";
import { t } from "@/lib/i18n";

export default function FiltersSidebar() {
  const lang = "en";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stateInput, setStateInput] = useState<string>(
    searchParams.get("state") || ""
  );
  const [cityInput, setCityInput] = useState<string>(
    searchParams.get("city") || ""
  );


  const [condition, setCondition] = useState<"new" | "old" | "Both">(
    searchParams.get("condition") as "new" | "old" | "Both"
  ) ?? "Both";

  useEffect(() => {
    if (!condition) {
      const paramCondition = searchParams.get("condition") as "new" | "old" | "Both" | null;
      setCondition(paramCondition ?? "Both");
    }
  }, [condition, searchParams]);


  const [selectedStates, setSelectedStates] = useState<string[]>(
    searchParams.get("state")?.split(",") ?? []
  );

  const [selectedCities, setSelectedCities] = useState<string[]>(
    searchParams.get("city")?.split(",") ?? []
  );

  const [withGstChecked, setWithGstChecked] = useState<boolean>(
    searchParams.get("with_gst") === "1"
  );

  function toggleArray(
    arr: string[],
    setFn: (v: string[]) => void,
    value: string
  ) {
    if (arr.includes(value)) {
      setFn(arr.filter((x) => x !== value));
    } else {
      setFn([...arr, value]);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams();

    if (condition) params.set("condition", condition);
    if (stateInput) params.set("state", stateInput);
    if (cityInput) params.set("city", cityInput);

    if (withGstChecked) params.set("with_gst", "1");

    const category = searchParams.get("category");
    if (category) params.set("category", category);

    router.push(`/search-results?${params.toString()}`);
  }, [condition, selectedStates, selectedCities, withGstChecked]);

  function clearFilters() {
    setCondition("Both");
    setSelectedStates([]);
    setSelectedCities([]);
    setWithGstChecked(false);

    router.push("/search-results");
  }

  return (
    <aside className="w-full">
      <div className="sticky top-6 bg-white p-4 border rounded-md shadow">
        <div className="flex justify-between align-items-center">


          <h3 className="text-lg font-semibold mt-2 mb-4">{t("filters")}</h3>
          <button
            onClick={clearFilters}
            className="px-2 font-bold text-xs mt-2 mb-4 text-orange-600 cursor-pointer"
          >
            {t("clearFilter")}
          </button>
        </div>
        {/* Condition */}
        <div className="mb-4">
          <div className="font-medium text-sm mb-1">{t("condition")}</div>
          <div className="flex gap-2 font-medium">
            {["new", "old", "Both"].map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c as "new" | "old" | "Both")}
                className={`px-4 cursor-pointer py-1 rounded-md text-sm ${condition === c
                  ? "bg-[#1F1F1F] text-white"
                  : "bg-gray-200"
                  }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* GST */}
        <div className="font-medium text-sm mb-1">{t("gst")}</div>
        <label className="flex items-center gap-2 mb-4 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={withGstChecked}
            onChange={() => setWithGstChecked((v) => !v)}
          />
          {t("withGst")}
        </label>
        {/* State */}
        <div className="mb-4">
          <div className="font-medium text-sm mb-1">{t("state")}</div>
          <input
            type="text"
            placeholder="Type state..."
            className="w-full p-2 border rounded text-sm"
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value)}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <div className="font-medium text-sm mb-1">{t("city")}</div>
          <input
            type="text"
            placeholder="Type city..."
            className="w-full p-2 border rounded text-sm"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </div>




      </div>
    </aside>
  );
}
