"use client";

import React, { useState } from "react";
import InformationsStep from "../../components/steps/InformationsStep";
import AdressesStep from "../../components/steps/AdressesStep";
import LivraisonStep from "../../components/steps/LivraisonStep";
import PaiementStep from "../../components/steps/PaiementStep";
import Image from "next/image";
import { useCartSubtotal } from "@/lib/storecart";
import { useCartStore } from "@/lib/storecart";
import { formatCurrency, FormDataAddress, generateOrderNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const steps = [
  "Informations personnelles",
  "Adresses",
  "Mode de livraison",
  "Paiement",
];

const Commandes = () => {
  const { data: session } = useSession();
  const subtotal = useCartSubtotal();
  const { items, totalAmount, totalItems, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(session ? 1 : 0);
  const [shipping, setShipping] = useState(0);
  const [paymentMethod] = useState<string>("payment_on_delivery");
  const [shippingZone, setShippingZone] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataAddress>({
    fullname: session?.user?.lastname + " " + session?.user?.firstname || "",
    address: session?.user?.address || "",
    city: session?.user?.city || "",
    phone: session?.user?.phone || "",
    zip: session?.user?.zip || "",
  });

  const handleShipping = (value: number) => {
    setShipping(value);
  };

  const handleFormData = (
    value: "fullname" | "address" | "city" | "phone" | "zip",
    newValue: string
  ) => {
    setFormData({ ...formData, [value]: newValue });
  };

  const handleShippingZone = (value: string) => {
    setShippingZone(value);
  };
  // console.log(shipping);

  const handleNextStep = () => {
    if (currentStep === 0) {
      setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
    } else if (
      currentStep === 1 &&
      formData.fullname &&
      formData.address &&
      formData.city &&
      formData.phone &&
      formData.zip
    ) {
      setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
    } else if (currentStep === 2 && shippingZone && shipping) {
      setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
    } else if (currentStep === 3 && paymentMethod) {
      if (currentStep === steps.length - 1) {
        handleAddOrder();
      } else {
        setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InformationsStep />;
      case 1:
        return (
          <AdressesStep formData={formData} handleFormData={handleFormData} />
        );
      case 2:
        return (
          <LivraisonStep
            handleShippingZone={handleShippingZone}
            shipping={shipping}
            handleShipping={handleShipping}
          />
        );
      case 3:
        return <PaiementStep paymentMethod={paymentMethod} />;
      default:
        return null;
    }
  };

  const handleAddOrder = async () => {
    setIsLoading(true);

    const newItems = items.map((item) => ({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const data = {
      products: newItems,
      totalPrice: totalAmount + shipping,
      shippingZone,
      paymentMethod,
      shippingDetails: formData,
      shipping,
      paymentStatus: "pending",
      orderNumber: generateOrderNumber(),
    };

    try {
      const response = await fetch("/api/order/create-new-order", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (response.ok) {
        toast.success(res.message, {
          style: {
            color: "#16a34a",
          },
          position: "top-right",
          duration: 3000,
        });

        clearCart();
        setShipping(0);
        setShippingZone("");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Une erreur est survenue lors de la création de votre commande, veuillez réessayer plus tard",
        {
          style: {
            color: "#dc2626",
          },
          position: "top-right",
          duration: 3000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  //   console.log(session);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col md:flex-row justify-center items-start gap-6 md:gap-8 py-8 px-2 md:px-4 font-montserrat">
      <div className="w-full md:w-3/5 bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-0">
        {/* Stepper */}
        <div className="flex max-md:grid max-md:grid-cols-2 max-md:place-items-center md:flex-row items-center justify-center md:justify-between mb-8 gap-4 md:gap-0">
          {steps.map((step, idx) => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 ${idx === currentStep ? "bg-primary text-white border-gray-200" : "bg-white text-gray-500 border-gray-200"}`}
              >
                {idx + 1}
              </div>
              <span
                className={`ml-2 font-semibold max-w-[100px] text-xs md:text-sm ${idx === currentStep ? "text-primary" : "text-gray-500"}`}
              >
                {step}
              </span>
              {idx < steps.length - 1 && (
                <div className="max-md:hidden flex-1 h-0.5 bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
        {/* Step Content */}
        <div className="min-h-[250px] md:min-h-[350px]">{renderStep()}</div>
        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between mt-8 gap-4 md:gap-0">
          <button
            className="px-6 py-2 rounded cursor-pointer bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 w-full md:w-auto"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
          >
            Précédent
          </button>
          <button
            className="px-6 py-2 rounded cursor-pointer text-sm bg-primary transition-colors hover:opacity-80 text-white font-semibold disabled:opacity-50 w-full md:w-auto"
            onClick={handleNextStep}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">En cours</span>
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            ) : currentStep === steps.length - 1 ? (
              "Commander"
            ) : (
              "Suivant"
            )}
          </button>
        </div>
      </div>
      <div className="w-full md:w-2/5 bg-white rounded-lg shadow p-4 md:p-6 flex flex-col items-start mb-8 md:mb-0 gap-4">
        <span className="text-sm text-neutral-600">
          {`${totalItems} article${totalItems > 1 ? "s" : ""}`}
        </span>

        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-full flex flex-col sm:flex-row items-start gap-2 justify-between"
            style={{
              borderBottom:
                index < items.length - 1 ? "0.5px solid #f3f4f6" : "none",
              paddingBottom: index < items.length - 1 ? "16px" : "0",
            }}
          >
            <div className="flex items-start gap-2 w-full sm:w-auto">
              <div className="relative border p-2 border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover object-center rounded-md"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-base md:text-lg font-medium line-clamp-1">
                  {item.name}
                </span>
                <span className="text-xs md:text-sm text-gray-500">
                  QTY: {item.quantity}
                </span>
                <span className="text-sm md:text-base font-bold text-[#142A4E]">
                  {formatCurrency(item.quantity * item.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex items-center justify-between">
          <span className="text-xs md:text-sm text-neutral-600">
            Sous-total
          </span>
          <span className="text-xs md:text-sm font-bold text-black/80">
            {subtotal}
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs md:text-sm text-neutral-600">Livraison</span>
          <span className="text-xs md:text-sm font-bold text-black/80">
            {formatCurrency(shipping)}
          </span>
        </div>
        <div className="w-full flex items-center justify-between border-t pt-4 border-gray-200">
          <span className="text-xs md:text-sm text-gray-500">Total TTC</span>
          <span className="text-xs md:text-sm font-bold text-black/80">
            {formatCurrency(totalAmount + shipping)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Commandes;
