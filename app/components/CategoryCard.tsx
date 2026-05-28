"use client";

import { useEffect, useState } from "react";

interface CardProps {
  img: string;
  offers?: string[];
  fullImage?: boolean;
  title?: string;
  bgImg?: string[];
}


export default function CategoryCards() {
  return (
    <div className="w-full flex justify-center gap-10 py-10 flex-wrap md:flex-nowrap">


      {/* CARD 1 - CNC Machines + Scrolling Offers */}
      <Card
        title="CNC Services"
        img="/images/card2.svg"
        bgImg={[
          "/images/advertise.jpg",
          "/images/advertise1.jpg",
          "/images/advertise2.jpg",
        ]}
      />

      <Card
        title="CNC Spare"
        img="/images/card2.svg"
        bgImg={[
          "/images/advertise1.jpg",
          "/images/advertise2.jpg",
          "/images/advertise.jpg",
        ]}
      />

      <Card
        title="CNC Machines"
        img="/images/card2.svg"
        bgImg={[
          "/images/advertise2.jpg",
          "/images/advertise.jpg",
          "/images/advertise1.jpg",
        ]}
      />
    </div>
  );
}

/* ===========================================================
   CARD COMPONENT WITH OPTIONAL SCROLLING OFFER LIST
   =========================================================== */

function Card({ img, title, bgImg = [] }: CardProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (bgImg.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImg.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bgImg]);

  return (
    <div className="relative w-68 h-64 flex justify-center">
      <div className="relative w-3xs h-full rounded-xl shadow-xl overflow-hidden">

        {/* 🔥 Background Slider */}
        {bgImg.map((bg, index) => (
          <img
            key={index}
            src={bg}
            alt="bg"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* 🟦 TITLE OVERLAY */}
        {title && (
          <div className="absolute bottom-0 left-0 w-full z-20 px-4 pt-3 pb-4">
            <h3 className="bg-gradient-to-r from-blue-400 to-blue-800 text-white text-lg font-semibold text-center cursor-pointer">
              {title}
            </h3>
          </div>
        )}
        {/* Bottom Image */}
        <div className="absolute -bottom-3 w-2xs left-1/2 -translate-x-1/2 z-20">
          <img
            src={img}
            className="w-full h-full object-cover"
            alt="bottom-shape"
          />
        </div>
      </div>
    </div>
  );
}
