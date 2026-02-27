"use client";

import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Navigation } from "./Navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  return (
    !pathname.includes("/profile") && (
      <div className="w-full px-4 py-2 flex items-center justify-between gap-4 bg-[#142A4E] font-montserrat">
        <Navigation />
        <Link
          href="https://wa.me/221771457816"
          className="md:flex hidden items-center gap-2"
        >
          <FaPhoneAlt className="text-white" size={18} />
          <span className="text-sm text-white font-semibold">
            24/7 support Whatsapp +221 78 323 94 61
          </span>
        </Link>
      </div>
    )
  );
};

export default Navbar;
