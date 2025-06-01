"use client";

import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Navigation } from "./Navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    !pathname.includes("/profile") && (
      <div className="w-full px-4 py-2 flex items-center justify-between gap-4 bg-[#142A4E] font-montserrat">
        <Navigation />
        <div className="md:flex hidden items-center gap-2">
          <FaPhoneAlt className="text-white" size={18} />
          <span className="text-sm text-white font-semibold">
            24/7 support Whatsapp +221 77 145 78 16
          </span>
        </div>
      </div>
    )
  );
};

export default Navbar;
