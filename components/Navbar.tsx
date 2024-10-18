import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="relative mx-auto flex w-full flex-col py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} className="size-10" alt="Logo" />

          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Marshal</span>
          </h4>
        </Link>
        <div className="md:hidden">ThemeToggle</div>
      </div>

      <nav className="hidden md:flex md:justify-end md:space-x-4">
        <AuthModal />
      </nav>
    </div>
  );
}
