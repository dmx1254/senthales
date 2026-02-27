"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MdOutlineSupportAgent } from "react-icons/md";
import {
  AlignJustify,
  User,
  LogOut,
  ShoppingCart,
  Heart,
  Package,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/storecart";
import { categories } from "@/lib/data";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalFavsItems } = useCartStore();

  const menuItems = [
    {
      title: "Mon Compte",
      icon: User,
      href: "/profile",
      showWhenLoggedIn: true,
    },
    {
      title: "Mes Commandes",
      icon: Package,
      href: "/profile/commandes",
      showWhenLoggedIn: true,
    },
    {
      title: "Mes Favoris",
      icon: Heart,
      href: "/profile/favoris",
      showWhenLoggedIn: true,
    },
    {
      title: "Panier",
      icon: ShoppingCart,
      href: "/commandes",
      showWhenLoggedIn: false,
    },
  ];

  return (
    <div className="flex w-full items-center justify-between p-4 font-montserrat">
      <div className="flex items-center gap-2">
        <MdOutlineSupportAgent />
        <div className="text-xs md:text-sm">
          <span className="font-bold">Support whatsapp:</span> +221 78 323 94 61
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex md:hidden items-center gap-4 hover:opacity-80 transition-opacity">
            <AlignJustify size={20} />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-[400px] p-0 flex flex-col h-full"
        >
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto w-full p-4">
            {session ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{`${session.user?.lastname} ${session.user?.firstname}`}</p>
                  <p className="text-sm text-gray-500">{session.user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Link
                  href="/connexion"
                  className="w-full px-4 py-2 text-center bg-black text-white rounded-lg hover:opacity-90 transition-opacity block"
                >
                  Connexion
                </Link>
              </div>
            )}

            <div className="space-y-1 mb-4">
              {menuItems.map((item) => {
                if (item.showWhenLoggedIn && !session) return null;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <item.icon size={20} className="text-gray-600" />
                    <span>{item.title}</span>
                    {item.title === "Mes Favoris" && totalFavsItems > 0 && (
                      <span className="ml-auto bg-black text-white text-xs px-2 py-1 rounded-full">
                        {totalFavsItems}
                      </span>
                    )}
                  </Link>
                );
              })}

              {session && (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-red-600 w-full"
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              )}
            </div>

            <div className="border-t w-full pt-4">
              <div className="bg-[#FAFAFA] p-2 border border-gray-200 rounded-[10px] mb-4 w-full">
                <span className="font-semibold">Rayons</span>
              </div>
              <div className="border rounded-[10px] border-gray-300 p-4 w-full">
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((c, index) => (
                    <AccordionItem
                      key={c.id}
                      value={`item-${index + 1}`}
                      className="w-full"
                    >
                      <AccordionTrigger
                        isLink={c.isLink}
                        className="cursor-pointer hover:no-underline"
                      >
                        <Link href={`/${c.slug}`}>{c.title}</Link>
                      </AccordionTrigger>
                      {c.subcat?.map((s) => (
                        <AccordionContent
                          key={`${s.id}-${index}`}
                          className="ml-4 cursor-pointer"
                        >
                          <Link
                            href={`/${c.slug}/${s.slug}`}
                            className="transition-colors duration-300 hover:text-[#142A4E] hover:font-medium"
                          >
                            {s.title}
                          </Link>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="w-full pt-4 flex items-center justify-center">
              <p className="w-full text-sm text-center font-bold">
                Senthales &copy; {new Date().getFullYear()} tout droit réservés
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
