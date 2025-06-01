"use client";

import React, { useState } from "react";
import { formatCurrency, shippingOptions } from "@/lib/utils";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";

const LivraisonStep = ({
  shipping,
  handleShipping,
  handleShippingZone,
}: {
  shipping: number;
  handleShipping: (value: number) => void;
  handleShippingZone: (value: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleShippingOption = (option: number) => {
    setSelectedOption(option);
    handleShipping(
      shippingOptions.find((index) => index.id === option)?.price || 0
    );
    handleShippingZone(
      shippingOptions.find((index) => index.id === option)?.deliveryZone || ""
    );
  };

  return (
    <div>
      <h2 className="w-full text-lg font-semibold mb-6 text-black/80">
        3. Mode de livraison
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {shippingOptions.map((option) => {
          const isSelected =
            selectedOption === option.id || shipping === option.price;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => handleShippingOption(option.id)}
              className={`flex items-center gap-4 h-28 w-full rounded-xl border transition-all px-5 py-4 shadow-sm
                ${
                  isSelected
                    ? "border-[#FFCD00] bg-[#FFF8E1] ring-2 ring-[#FFCD00]"
                    : "border-gray-200 bg-white hover:border-[#FFCD00]/60 hover:bg-[#FFFDE7]"
                }
                focus:outline-none`}
            >
              <span>
                {isSelected ? (
                  <IoMdRadioButtonOn className="text-[#FFCD00]" size={24} />
                ) : (
                  <IoMdRadioButtonOff className="text-gray-400" size={24} />
                )}
              </span>
              <div className="flex flex-col flex-1 text-left">
                <span className="font-semibold text-base text-black/80">
                  {option.name}
                </span>
                <span className="text-sm text-neutral-500">
                  {option.deliveryZone}
                </span>
              </div>
              <span className="font-bold text-base text-black/80">
                {formatCurrency(option.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LivraisonStep;
