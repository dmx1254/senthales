"use client";

import React, { useState } from "react";
import {
  useCartStore,
  useCartItemsCount,
  useCartSubtotal,
} from "@/lib/storecart";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalAmount } = useCartStore();
  const totalItems = useCartItemsCount();
  const subtotal = useCartSubtotal();
  const [shipping] = useState<number>(0);

  return (
    <div className="w-full min-h-screen bg-[#fff] flex flex-col">
      <div className="flex items-center gap-2 text-gray-500 text-sm px-8 pt-6">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>{" "}
        / <span>cart</span>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-16 py-8">
        {/* Panier */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">PANIER</h2>
          <div className="flex flex-col gap-8">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                Votre panier est vide.
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 last:border-b-0 last:pb-0 gap-4 md:gap-0 w-full"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center md:justify-start min-w-[80px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-md object-contain bg-white border p-2 w-[70px] h-[70px] md:w-[80px] md:h-[80px]"
                    />
                  </div>
                  {/* Infos produit */}
                  <div className="flex flex-col flex-1 min-w-0 md:ml-4 items-center md:items-start text-center md:text-left">
                    <span className="font-bold text-base md:text-lg uppercase tracking-wide break-words">{item.name}</span>
                    <span className="text-gray-600 font-semibold mt-2 text-sm md:text-base">{formatCurrency(Number(item.price))}</span>
                  </div>
                  {/* Quantité */}
                  <div className="flex items-center justify-center gap-0 mx-0 md:mx-4 mt-2 md:mt-0">
                    <button
                      className="px-3 py-2 border border-gray-200 bg-white hover:bg-gray-100 text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <span className="px-4 md:px-6 py-2 bg-gray-100 text-lg select-none border-t border-b border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-2 border border-gray-200 bg-white hover:bg-gray-100 text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                  </div>
                  {/* Poubelle */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-600 hover:text-red-600 transition-colors ml-0 md:ml-4 mt-2 md:mt-0 self-center"
                  >
                    <Trash size={24} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border rounded bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              &lt; CONTINUER MES ACHATS
            </Link>
          </div>
        </div>
        {/* Récapitulatif */}
        <div className="w-full md:w-96 bg-white rounded-xl shadow p-6 h-fit flex flex-col gap-6">
          <div className="flex flex-col gap-2 border-b pb-4">
            <div className="flex items-center justify-between text-gray-600">
              <span>{totalItems} articles</span>
              <span className="font-bold text-lg">{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Livraison</span>
              <span className="font-bold text-lg">
                {formatCurrency(Number(shipping))}
              </span>
            </div>
            <div className="flex items-center justify-between text-black mt-2">
              <span className="font-semibold">Total TTC</span>
              <span className="font-bold text-xl">
                {formatCurrency(totalAmount + shipping)}
              </span>
            </div>
          </div>
          <Link
            href="/commandes"
            className="w-full bg-black text-center text-white py-3 rounded font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            COMMANDER &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
