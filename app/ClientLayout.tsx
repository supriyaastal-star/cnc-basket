"use client";

"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setLoginOpen(true)} />

      {children}

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onCreateAccount={() => setLoginOpen(false)}
      />
    </>
  );
}
