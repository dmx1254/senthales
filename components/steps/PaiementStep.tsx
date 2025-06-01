import Image from "next/image";
import React from "react";
import { FaTruck } from "react-icons/fa";

const PaiementStep = ({ paymentMethod }: { paymentMethod: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">4. Paiement</h2>
      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:border-primary transition-colors duration-200">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="paiement"
              className="w-5 h-5 accent-primary"
              defaultChecked={paymentMethod === "payment_on_delivery"}
            />
            <div className="flex items-center gap-3">
              <FaTruck className="text-2xl text-primary" />
              <div>
                <span className="font-semibold text-gray-800">
                  Paiement à la livraison
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Payez en espèces ou par carte lors de la réception de votre
                  commande
                </p>
              </div>
            </div>
          </label>
        </div>

        <div className="border rounded-lg p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <input type="radio" name="paiement" className="w-5 h-5" disabled />
            <div className="flex items-center gap-3">
              <Image
                src="/payment/wave.png"
                alt="wave"
                width={50}
                height={50}
                className="object-cover object-center"
              />
              <div>
                <span className="font-semibold text-gray-400">
                  Paiement par wave
                </span>
                <p className="text-sm text-gray-400 mt-1">Bientôt disponible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <input type="radio" name="paiement" className="w-5 h-5" disabled />
            <div className="flex items-center gap-3">
              <Image
                src="/payment/orange-money.jpg"
                alt="orange-money"
                width={24}
                height={24}
                className="object-cover object-center"
              />
              <div>
                <span className="font-semibold text-gray-400">
                  Paiement par orange money
                </span>
                <p className="text-sm text-gray-400 mt-1">Bientôt disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaiementStep;
