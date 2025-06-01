"use client";

import { useCartStore } from "@/lib/storecart";
import { useState } from "react";
import Image from "next/image";
import { Trash2, Loader } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function FavorisPage() {
  const { favsItems, removeFavsItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  console.log(favsItems);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#f7f7e8] to-[#f0f4ff] pb-8">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm py-4 mb-8">
        <h1 className="text-3xl font-extrabold text-black/90 text-center tracking-tight">
          Mes favoris
        </h1>
      </header>
      <div className="flex flex-col items-center px-2">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader className="animate-spin text-[#FFCD00]" size={32} />
          </div>
        ) : favsItems.length === 0 ? (
          <div className="text-gray-400 text-center mt-12">
            Aucun favori pour le moment.
          </div>
        ) : (
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {favsItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl group overflow-hidden min-h-[200px]"
              >
                <button
                  className="absolute cursor-pointer top-3 right-3 p-2 rounded-full bg-white/80 border border-gray-200 hover:bg-red-100 hover:border-red-200 transition-colors shadow-md z-10"
                  title="Supprimer des favoris"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      removeFavsItem(item.id);
                      setLoading(false);
                    }, 300);
                  }}
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
                {item.image && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow flex items-center justify-center bg-gray-50 mb-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="text-base font-bold text-black/90 text-center line-clamp-1 mb-0.5">
                  {item.name}
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#FFCD00]/20 text-[#FFCD00] font-semibold text-xs shadow-sm">
                    {formatCurrency(item.price)}
                  </span>
                  <span className="text-xs text-gray-400">Qté : {item.quantity}</span>
                </div>
                <div className="text-xs text-gray-500 text-center line-clamp-2">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
