"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, History, LogOut } from "lucide-react";
import { t } from "@/lib/i18n";
import React from "react";

export default function ProfileSidebar() {
  const router = useRouter();
const pathName = usePathname();

  return (
    <aside className="w-64 border-r p-6 hidden md:block bg-black">
      {/* <h2 className="text-lg font-semibold mb-6 text-white">{t("account")}</h2> */}

      <nav className="space-y-3">
        <SidebarItem active={pathName === "/profile"} 
          icon={<User size={18} />}
          label="Profile"
          onClick={() => {
            router.push("/profile");
          }}
        />

        <SidebarItem active={pathName === "/view-history" || pathName === "/history"}
          icon={<History size={18} />}
          label="View History"
          onClick={() => {
            router.push("/view-history");
          }}
        />

        <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          danger
          onClick={() => router.push("/login")}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  onClick,
  danger,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full font-normal cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left
        ${active
          ? "bg-black/10 text-white"
          : "text-white hover:bg-black/10"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
