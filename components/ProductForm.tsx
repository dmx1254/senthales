"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  stock: number;
  image: string;
}

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    description: "",
    category: "",
    subCategory: "",
    stock: 0,
    image: "",
  });
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, image: base64String }));
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l&apos;envoi des données");
      }
      const data = await response.json();
      console.log("Produit ajouté avec succès:", data);
      // Réinitialiser le formulaire après succès

      toast.success("Produit ajouté avec succès", {
        duration: 3000,
        position: "top-right",
      });

      // setFormData({
      //   name: "",
      //   price: 0,
      //   description: "",
      //   category: "",
      //   subCategory: "",
      //   stock: 0,
      //   image: "",
      // });
      // setPreview("");
    } catch (error) {
      console.error("Erreur lors de l&apos;envoi:", error);
      toast.error("Erreur lors de l&apos;envoi des données", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        {/* Upload d'image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image du produit
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      setFormData((prev) => ({ ...prev, image: "" }));
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#FFCD00] hover:text-[#FFCD00]/80 focus-within:outline-none"
                    >
                      <span>Télécharger une image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF jusqu&apos;à 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Nom du produit */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom du produit
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
          />
        </div>

        {/* Prix */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Prix (FCFA)
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
            min="0"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Catégorie
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
            placeholder="Ex: Huile Végétale, Aliments Bébé, etc."
          />
        </div>

        {/* Sous-catégorie */}
        <div>
          <label
            htmlFor="subCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Sous-catégorie
          </label>
          <input
            type="text"
            id="subCategory"
            value={formData.subCategory}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subCategory: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
            placeholder="Ex: Huile d'olive, Lait, Riz, etc."
          />
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
            min="0"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFCD00] focus:ring-[#FFCD00] sm:text-sm"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFCD00] hover:bg-[#FFCD00]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFCD00] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Envoi en cours..." : "Ajouter le produit"}
          </button>
        </div>
      </div>
    </form>
  );
}
