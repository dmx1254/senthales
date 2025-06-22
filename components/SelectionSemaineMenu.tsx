"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductR } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function SelectionSemaineMenu({
  products,
  isLoading,
}: {
  products: ProductR[];
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        products.map((product) => (
          <Link
            key={product._id}
            href={`/${product.category}/${product.subCategory}/${product._id}`}
            className="flex flex-col items-center border rounded-lg p-3 hover:shadow"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="object-cover rounded"
            />
            <div className="mt-2 font-semibold text-center">{product.name}</div>
            <div className="text-sm text-gray-500">{product.price} FCFA</div>
          </Link>
        ))
      )}
    </div>
  );
}
