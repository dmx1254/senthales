"use client";

import { CartItem, useCartStore } from "@/lib/storecart";
import { formatCurrency, ProductR } from "@/lib/utils";
import { Heart, ShoppingBag, Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { toast } from "sonner";
import { useState } from "react";

const Product = ({
  product,
  category,
  subCategory,
}: {
  product: ProductR;
  category: string;
  subCategory: string;
}) => {
  const { addItem, addFavsItem, favsItems } = useCartStore();
  const [showDialog, setShowDialog] = useState(false);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Pick<ProductR, "_id" | "name" | "price" | "description" | "image">
  ) => {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: 1,
    });
    toast.success("Produit ajouté au panier", {
      style: {
        color: "#16a34a",
      },
      duration: 3000,
      position: "top-right",
    });
  };

  const handleAddToFavs = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Pick<ProductR, "_id" | "name" | "price" | "description" | "image">
  ) => {
    e.preventDefault();
    const isInFavs = favsItems.some(
      (item: CartItem) => item.id === product._id
    );
    if (isInFavs) {
      toast.error("Produit déjà dans les favoris", {
        style: {
          color: "#dc2626",
        },
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    addFavsItem({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: 1,
    });
    toast.success("Produit ajouté aux favoris", {
      style: {
        color: "#16a34a",
      },
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <>
      <Link
        href={`/${category}/${subCategory}/${product._id}`}
        key={product._id}
        className="group relative bg-white border border-gray-200 flex flex-col items-center h-full p-4 rounded-[10px] overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative w-[80%] flex items-center justify-center aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center gap-2 p-4 w-full max-md:-mt-8">
          <div className="flex items-center gap-[.5px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <MdOutlineStarPurple500
                key={index}
                className="w-4 h-4 text-gray-400"
              />
            ))}
          </div>
          <h3 className="text-base sm:text-lg w-full uppercase text-black/80 font-bold text-center line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-black/70 font-bold">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        <div className="flex md:hidden absolute top-[50%] group-hover:flex transition-all duration-300 items-center justify-center gap-2">
          <button
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => handleAddToFavs(e, product)}
          >
            <Heart size={17} />
          </button>
          <button
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => handleAddToCart(e, product)}
          >
            <ShoppingBag size={17} />
          </button>
          <button 
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => {
              e.preventDefault();
              setShowDialog(true);
            }}
          >
            <Eye size={17} />
          </button>
          {/* <button className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80">
            <Image
              src="/images/comparepro.svg"
              alt="compare"
              width={12}
              height={12}
              className="w-4 h-4 text-white" 
            />
          </button> */}
        </div>
        <div className="flex md:hidden absolute top-[50%] group-hover:flex transition-all duration-300 items-center justify-center gap-2">
          <button
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => handleAddToFavs(e, product)}
          >
            <Heart size={17} />
          </button>
          <button
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => handleAddToCart(e, product)}
          >
            <ShoppingBag size={17} />
          </button>
          <button 
            className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
            onClick={(e) => {
              e.preventDefault();
              setShowDialog(true);
            }}
          >
            <Eye size={17} />
          </button>
        
        </div>
      </Link>

      {/* Product Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setShowDialog(false)}
                className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Image section */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details section */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <MdOutlineStarPurple500
                          key={index}
                          className="w-5 h-5 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-[#142A4E]">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={(e) => {
                        handleAddToCart(e, product);
                      }}
                      className="w-full bg-[#142A4E] text-white py-3 rounded-lg font-semibold hover:bg-[#142A4E]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={20} />
                      Ajouter au panier
                    </button>
                    <button
                      onClick={(e) => {
                        handleAddToFavs(e, product);
                      }}
                      className="w-full border-2 border-[#142A4E] text-[#142A4E] py-3 rounded-lg font-semibold hover:bg-[#142A4E]/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart size={20} />
                      Ajouter aux favoris
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
