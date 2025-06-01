"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useCartItemsCount,
  useCartStore,
  useCartSubtotal,
} from "@/lib/storecart";
import { ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const Cart = () => {
  const totalItems = useCartItemsCount();
  const subtotal = useCartSubtotal();
  const { items, removeItem, totalAmount } = useCartStore();
  const [open, setOpen] = useState<boolean>(false);
  const [shipping, setShipping] = useState<number>(0);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart strokeWidth={1} size={36} className="text-gray-500" />
          <span className="absolute h-5 w-5 text-xs font-semibold -top-1 left-6 flex items-center justify-center rounded-full  bg-[#FFCD00]">
            {totalItems}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent isClosePlaced={false} className="font-montserrat">
        <SheetTitle className="p-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer outline-none transition-colors duration-300 hover:text-[#142A4E]"
            >
              <X size={20} />
            </button>
            <span className="text-xl font-semibold">Panier</span>
            <span className="flex items-center justify-center text-xs p-2 w-5 h-5 bg-[#142A4E] text-white rounded-full">
              {totalItems}
            </span>
          </div>
        </SheetTitle>
        <div className="flex flex-col mb-8 px-4 h-full scrollbar-hide items-start gap-4 max-h-[340px] overflow-y-scroll">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-full flex items-start gap-2 justify-between"
              style={{
                borderBottom:
                  index < items.length - 1 ? "0.5px solid #f3f4f6" : "none",
                paddingBottom: index < items.length - 1 ? "16px" : "0",
              }}
            >
              <div className="flex items-start gap-2">
                <div className="relative border p-2 border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover object-center rounded-md"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-lg font-medium line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    QTY: {item.quantity}
                  </span>
                  <span className="text-base font-bold text-[#142A4E]">
                    {formatCurrency(item.quantity * item.price)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  removeItem(item.id);
                  toast.success(
                    `Le produit: ${item.name} a été supprimé du panier`,
                    {
                      style: {
                        background: "#142A4E",
                        color: "#fff",
                      },
                      position: "top-right",
                      icon: "🗑️",
                      duration: 3000,
                    }
                  );
                }}
                className="cursor-pointer outline-none transition-colors duration-300 text-gray-500 hover:text-[#142A4E]"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full px-4 mt-20">
          <div className="flex items-center justify-between border-b pb-4 border-gray-100">
            <span className="text-base font-medium">Total partiel</span>
            <span className="text-base font-bold">{subtotal}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4 border-gray-100">
            <span className="text-base font-medium">Livraison</span>
            <span className="text-base font-bold">
              {formatCurrency(shipping)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b pb-4 border-gray-100">
            <span className="text-base font-medium">Total TTC</span>
            <span className="text-base font-bold text-[#142A4E]">
              {formatCurrency(totalAmount + shipping)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between absolute bottom-[1] left-0 right-0 gap-0 w-full">
          <Link
            href="/cart"
            onClick={() => {
              setTimeout(() => {
                setOpen(false);
              }, 500);
            }}
            className="w-full z-10 text-center bg-[#222222] text-white cursor-pointer transition-colors duration-300 hover:bg-[#1c1b1b] p-4 text-sm uppercase"
          >
            Voir mon panier
          </Link>
          <Link
            href="/commandes"
            onClick={() => {
              setTimeout(() => {
                setOpen(false);
              }, 500);
            }}
            className="w-full z-10 text-center bg-[#142A4E] text-white cursor-pointer transition-colors duration-300 hover:bg-[#263245] p-4 text-sm uppercase"
          >
            Commander
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
