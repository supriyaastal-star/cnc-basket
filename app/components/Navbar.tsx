"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/cnc-logo-orange.png";
import { Menu, X, User, LogOut, History, UserCircle, Wallet } from "lucide-react";
import { t } from "@/lib/i18n";

type NavbarProps = {
  onLoginClick: () => void;
};

const user = {
  name: "Supriya",
  credit: 1250,
};

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full shadow-sm relative">

      {/* ================= TOP BAR ================= */}
      <div className="md:hidden flex justify-between items-center px-6 py-6 bg-white relative z-50">

        {/* LOGO */}
        <Link href="/" className="flex items-center ">
          <Image src={logo} alt="Logo" width={200} height={80} />
        </Link>

        {/* RIGHT SIDE (MOBILE MENU) */}
        <div className="flex items-center gap-4">
          <button type="button"
            className="md:hidden text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-2 relative z-40">
        <div className="w-full px-16 mx-auto flex items-center justify-between px-6">
          <ul className="flex items-center gap-10 text-[16px] font-medium text-black">

            <li>
              <Link href="/search-results?category=mechanical" className="text-white hover:text-black">
                {t("mechanicalSpares")}
              </Link>
            </li>

            <li>
              <Link href="/search-results?category=electrical" className="text-white hover:text-black">
                {t("elecrticalSpares")}
              </Link>
            </li>

            <li>
              <Link href="/cnc-services" className="text-white hover:text-black">
                {t("cNCServices")}
              </Link>
            </li>

            <li>
              <Link href="/new-machine" className="text-white hover:text-black">
                {t("newMachine")}
              </Link>
            </li>

            <li>
              <Link href="/old-machine" className="text-white hover:text-black">
                {t("oldMachine")}
              </Link>
            </li>

          </ul>

          {/* DESKTOP USER (moved into menubar, right side) */}
          <div className="hidden md:block relative">
            <div
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <button type="button"
                className="w-10 h-10 rounded-full bg-transparent border border-solid text-white font-bold flex items-center justify-center"
              >
                {user.name.charAt(0)}
              </button>

              <span className="text-white font-medium">
                {user.name}
              </span>
            </div>

            {userOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white text-black rounded-xl shadow-lg z-50">

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Wallet size={14} /> ₹{user.credit}
                  </p>
                </div>

                <button
                  onClick={() => { setUserOpen(false); router.push("/profile"); }}
                  className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <UserCircle size={16} /> Profile
                </button>

                <button
                  onClick={() => { setUserOpen(false); router.push("/history"); }}
                  className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <History size={16} /> History
                </button>

                <button
                  onClick={() => { setUserOpen(false); router.push("/login"); }}
                  className="w-full cursor-pointer px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-30 md:hidden">

          <div className="p-5 space-y-4">

            {/* USER CARD */}
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">₹{user.credit}</p>
              </div>
            </div>

            {/* 🔥 ACTIONS (NOW AT TOP) */}
            <div className="flex flex-col divide-y border-b pb-3">

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/profile");
                }}
                className="flex items-center gap-2 py-3 hover:text-orange-600"
              >
                <UserCircle size={18} /> Profile
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/history");
                }}
                className="flex items-center gap-2 py-3 hover:text-orange-600"
              >
                <History size={18} /> History
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/login");
                }}
                className="flex items-center gap-2 py-3 text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>

            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col divide-y">

              <Link
                onClick={() => setMenuOpen(false)}
                href="/search-results?category=mechanical"
                className="py-3 hover:text-orange-600"
              >
                Mechanical Spares
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                href="/search-results?category=electrical"
                className="py-3 hover:text-orange-600"
              >
                Electrical Spares
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                href="/cnc-services"
                className="py-3 hover:text-orange-600"
              >
                CNC Services
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                href="/new-machine"
                className="py-3 hover:text-orange-600"
              >
                New Machine
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                href="/old-machine"
                className="py-3 hover:text-orange-600"
              >
                Old Machine
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={() => {
                setMenuOpen(false);
                onLoginClick();
              }}
              className="w-full rounded-full px-5 py-2 bg-orange-500 text-white flex gap-2 justify-center shadow-md mt-3"
            >
              <User size={18} /> Log In
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}