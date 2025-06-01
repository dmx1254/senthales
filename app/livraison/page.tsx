import React from "react";
import { shippingOptions } from "@/lib/utils";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const LivraisonPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 md:mt-12 flex py-8 md:py-16 flex-col gap-10 items-center justify-center font-montserrat bg-gradient-to-br from-[#fffbe6] to-[#f3f4f6] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#142A4E] drop-shadow-sm">Expéditions et Livraisons</h1>

      <p className="text-center max-w-2xl text-gray-700 text-lg mb-4">
        Les livraisons à domicile sont généralement expédiées dans un délai de 24h après réception. Service de livraison rapide et fiable. Commandez via notre site internet <span className="font-semibold text-[#FFCD00]">www.senthales.sn</span>. Ravitaillement assuré dans les meilleures conditions et en toute sécurité. Senthales, moins cher que partout, supermarché 100% sénégalais. <br />
        <span className="text-sm text-gray-500">E-mail: info.senthales@gmail.com</span>
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="absolute -top-4 right-4 bg-[#FFCD00] text-[#142A4E] font-bold px-4 py-1 rounded-full shadow-md text-lg flex items-center gap-2">
              <FaMoneyBillWave className="text-[#16a34a]" />
              {option.price} FCFA
            </div>
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-[#FFCD00] text-2xl drop-shadow" />
              <span className="text-lg font-bold text-[#142A4E] group-hover:text-[#FFCD00] transition-colors duration-300">
                {option.name}
              </span>
            </div>
            <div className="text-gray-600 text-base leading-relaxed pl-2 border-l-4 border-[#FFCD00] bg-[#fffde7] rounded-md">
              {option.deliveryZone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivraisonPage;
