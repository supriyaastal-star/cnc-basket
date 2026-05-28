"use client";

import { useRouter } from "next/navigation";
import { Clock3, FileSearch, ShoppingBag, ArrowRight } from "lucide-react";

const historyStats = [
  {
    title: "Products Viewed",
    value: "24",
    description: "Recent product searches and views.",
    icon: FileSearch,
    bg: "from-orange-400 to-orange-500",
  },
  {
    title: "Quotations Generated",
    value: "12",
    description: "Requests created from your recent searches.",
    icon: Clock3,
    bg: "from-yellow-400 to-orange-400",
  },
  {
    title: "Orders Placed",
    value: "5",
    description: "Confirmed purchases from sellers.",
    icon: ShoppingBag,
    bg: "from-slate-500 to-slate-700",
  },
];

const historyEvents = [
  {
    title: "Requested quotation for CNC spindle",
    date: "May 10, 2026",
    status: "Quotation sent",
    amount: "₹18,200",
  },
  {
    title: "Viewed electrical motor listings",
    date: "May 9, 2026",
    status: "Browsed",
    amount: "-",
  },
  {
    title: "Saved seller contact for mechanical parts",
    date: "May 8, 2026",
    status: "Saved",
    amount: "-",
  },
  {
    title: "Placed order for hydraulic pump",
    date: "May 5, 2026",
    status: "Order placed",
    amount: "₹9,750",
  },
];

export default function HistoryOverview() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-500 to-slate-700 text-white shadow-2xl p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] opacity-90">History</p>
            <h1 className="mt-2 text-4xl font-semibold">Search & order history</h1>
            <p className="mt-3 max-w-2xl text-orange-100/90">
              Review the products you viewed, quotations you requested, and orders you placed. Stay on top of important activity at a glance.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 border border-white/20 px-5 py-4 shadow-xl backdrop-blur-xl text-right">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-100">Last active</p>
            <p className="mt-2 text-3xl font-bold">2h ago</p>
            <p className="mt-1 text-sm text-orange-100/90">Your latest search session is still open.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {historyStats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-3xl border border-orange-100/20 bg-white shadow-xl p-6">
              <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${item.bg} p-4 text-white shadow-lg`}>
                <Icon size={22} />
              </div>
              <p className="mt-6 text-sm font-medium text-gray-500">{item.title}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-3 text-sm text-gray-500">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
        <div className="flex flex-col gap-4 px-6 py-5 border-b border-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Recent activity</h2>
            <p className="mt-1 text-sm text-slate-500">Latest actions from your account history.</p>
          </div>
          <button
            onClick={() => router.push("/view-history")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            View all history
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="divide-y divide-slate-200">
          {historyEvents.map((event) => (
            <div key={event.title} className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{event.title}</p>
                <p className="mt-2 text-sm text-slate-500">{event.date}</p>
              </div>
              <div className="flex flex-col items-start gap-2 text-sm md:items-end">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{event.status}</span>
                <span className="font-semibold text-slate-900">{event.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
