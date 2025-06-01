"use client";

import { FormDataAddress } from "@/lib/utils";

const AdressesStep = ({
  formData,
  handleFormData,
}: {
  formData: FormDataAddress;
  handleFormData: (value: keyof FormDataAddress, newValue: string) => void;
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 font-montserrat">2 Adresses</h2>
      <p className="text-sm text-neutral-600 mb-4">
        L&apos;adresse sélectionnée sera utilisée à la fois comme adresse
        personnelle (pour la facturation) et comme adresse de livraison.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm text-neutral-600">
            Prénom et nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            className="border rounded px-3 py-2 text-sm bg-[#F1F1F1]"
            placeholder="Prénom et nom"
            value={formData.fullname}
            onChange={(e) => handleFormData("fullname", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm text-neutral-600">
            Adresse <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            className="border rounded px-3 py-2 text-sm bg-[#F1F1F1]"
            placeholder="Votre adresse"
            value={formData.address}
            onChange={(e) => handleFormData("address", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm text-neutral-600">
            Ville <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            className="border rounded px-3 py-2 text-sm bg-[#F1F1F1]"
            placeholder="Votre ville"
            value={formData.city}
            onChange={(e) => handleFormData("city", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm text-neutral-600">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            className="border rounded px-3 py-2 text-sm bg-[#F1F1F1]"
            placeholder="Votre téléphone"
            value={formData.phone}
            onChange={(e) => handleFormData("phone", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm text-neutral-600">
            Code postal <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            className="border rounded px-3 py-2 text-sm bg-[#F1F1F1]"
            placeholder="Votre code postal"
            name="zip"
            value={formData.zip}
            onChange={(e) => handleFormData("zip", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdressesStep;
