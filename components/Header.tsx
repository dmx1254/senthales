"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdOutlineSupportAgent } from "react-icons/md";

const Header = () => {
  const pathname = usePathname();
  return (
    !pathname.includes("/profile") && (
      <div className="flex w-full items-center justify-between p-4 font-montserrat">
        <div className="flex items-center gap-2">
          <MdOutlineSupportAgent />
          <div className="text-sm">
            <span className="font-bold">Support whatsapp:</span> +221 77 145 78
            16
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Image
              src="/svg/compare.svg"
              alt="compare"
              width={12}
              height={12}
            />
            <span>comparer(0)</span>
          </div>
        </div> */}
      </div>
    )
  );
};

export default Header;
