"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import logo from "../../public/cnc-logo-white.png";
import Link from "next/link";

type Suggestion = {
  label: string;
};

export default function SearchAdvanced() {
  const router = useRouter();

  const STATIC_DATA = {
    mechanical: [
      "Ballscrews",
      "LM Guideways",
      "Bearings",
      "Telescopic Guards",
      "Hydraulics",
      "Valves",
    ],
    electrical: [
      "Servo Motors",
      "PLC",
      "Sensors",
      "Limit Switches",
      "Drives",
      "Cards",
    ],
  };

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [openSuggest, setOpenSuggest] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔁 Generate suggestions from BOTH categories
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const allItems = [
      ...STATIC_DATA.mechanical,
      ...STATIC_DATA.electrical,
    ].map((item) => ({ label: item }));

    const filtered = allItems.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered);
    setOpenSuggest(true);
  }, [query]);

  function applySuggestion(item: Suggestion) {
    setQuery(item.label);
    setOpenSuggest(false);
    inputRef.current?.blur();
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) {
      toast.error("Please enter a search term!");
      return;
    }

    // 🔥 Search BOTH mechanical + electrical
    router.push(`/search-results?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <Toaster position="top-center" />
      <Link href="/" className="hidden md:flex justify-center mb-6">
  <Image
    src={logo}
    alt="Logo"
    width={260}
    height={100}
    className="object-contain"
  />
</Link>
      <div className="flex justify-center w-full flex-col align-center">
        <h3 className="leading-relaxed align-center flex justify-center pb-10 text-4xl text-white text-center mx-auto w-full md:w-2/3">
          Where Precision Meets Quality – Your Trusted Partner for CNC Services, Industrial Spares, and Machine Solutions.</h3>
        
        <form
          onSubmit={onSearch}
          className="w-full flex justify-center px-4 pb-6 md:p-b10"
        >
          <div className="w-full max-w-3xl relative">

            {/* 🔍 SEARCH INPUT */}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpenSuggest(true)}
              placeholder="Search Mechanical & Electrical parts Here..."
              className="w-full p-3 pr-14 border border-white-300 placeholder:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-white-700"
            />

            {/* 🔘 SEARCH BUTTON INSIDE */}
            <button
              type="submit"
              className="absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 p-3 rounded-tr-lg rounded-br-lg bg-gradient-to-r from-white-400 to-white-800"
            >
              <div className="flex text-white gap-2">
              <Search className="w-5 h-5 text-white" /></div>
            </button>

            {/* 🔽 SUGGESTIONS */}
            {openSuggest && suggestions.length > 0 && (
              <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onMouseDown={() => applySuggestion(item)}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
