import Image from "next/image";
import logo from "../../public/logo.svg";

export default function Header() {
    return(
         <header className="w-full bg-white shadow-md px-6 py-3 flex items-center">
      {/* Logo Left */}
      <Image src={logo} alt="logo"/>
    </header>
    )
}