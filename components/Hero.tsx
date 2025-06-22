"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Heart, UserRound } from "lucide-react";
import Cart from "./Cart";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { FaSignOutAlt, FaUser } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/storecart";
const Hero = () => {
  const { data: session } = useSession();
  const { totalFavsItems } = useCartStore();
  const handleSignout = async () => {
    await signOut();
  };
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    !pathname.includes("/profile") && (
      <>
        <div className="w-full flex items-center justify-between gap-4 px-4 py-8 bg-[#F5F5F5] font-montserrat">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={150}
              className="object-cover object-center"
            />
          </Link>
          <div className="hidden md:flex w-full max-w-[500px]">
            <Input
              placeholder="Rechercher un article"
              className="bg-white text-sm px-4 py-6"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/profile/favoris" className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Heart strokeWidth={1} size={38} className="text-gray-500" />
                <span className="absolute h-5 w-5 text-xs font-semibold -top-1 left-6 flex items-center justify-center rounded-full  bg-[#FFCD00]">
                  {totalFavsItems}
                </span>
              </div>
              <span>Mes listes</span>
            </Link>
            {session ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild onMouseEnter={() => setOpen(true)}>
                  <button className="flex items-center gap-2 transition-colors hover:opacity-80">
                    <div>
                      <UserRound
                        strokeWidth={1}
                        size={36}
                        className="text-gray-500"
                      />
                    </div>
                    <span className="font-medium">{`${session.user?.lastname} ${session.user?.firstname}`}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-52"
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
                    >
                      <FaUser size={16} className="text-black" />
                      <span className="font-medium text-sm">Mon compte</span>
                    </Link>
                    <button
                      onClick={handleSignout}
                      className="flex items-center border-none outline-none gap-2 cursor-pointer transition-colors duration-200 hover:opacity-80"
                    >
                      <FaSignOutAlt size={16} className="text-black" />
                      <span className="font-medium text-sm">Déconnexion</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href="/connexion"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
              >
                <div>
                  <UserRound
                    strokeWidth={1}
                    size={36}
                    className="text-gray-500"
                  />
                </div>
                <span>Connexion</span>
              </Link>
            )}

            <Cart />
          </div>
        </div>
        <div className="flex md:hidden items-center justify-between gap-4 p-4 bg-transparent">
          <div className="w-full">
            <Input
              placeholder="Rechercher un article"
              className="bg-white text-sm p-5"
            />
          </div>
          <Link href="/profile/favoris" className="flex w-full max-w-32 items-center gap-2">
            <div className="relative">
              <Heart strokeWidth={1} size={36} className="text-gray-500" />
              <span className="absolute h-5 w-5 text-xs font-semibold -top-1 left-6 flex items-center justify-center rounded-full  bg-[#FFCD00]">
                {totalFavsItems}
              </span>
            </div>
            <span>Mes listes</span>
          </Link>
        </div>
      </>
    )
  );
};

export default Hero;
