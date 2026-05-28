import CategoryCards from "./components/CategoryCard";
import SearchAdvanced from "./components/SearchBar";
import banner from "../public/bg-home.jpeg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-full">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={banner} // 👉 apni image public folder me daalna
          alt="Banner"
          className="w-full h-full object-cover"
        />
         <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      {/* CONTENT (SEARCH BAR CENTER) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <SearchAdvanced />
      </div>

    </div>
  );
}