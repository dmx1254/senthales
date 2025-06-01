"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductR } from "@/lib/utils";



export default function SelectionSemaineMenu() {
  const [products, setProducts] = useState<ProductR[]>([]);

  useEffect(() => {
    fetch("/api/selection-semaine")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  console.log(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => (
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
      ))}
    </div>
  );
} 