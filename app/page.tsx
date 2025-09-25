"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import clsx from "clsx";
import ProductMoment from "@/components/ProductMoment";
import MostSell from "@/components/MostSell";
import Link from "next/link";

export default function Home() {
  const [isActive, setIsActive] = useState<number>(0);

  const images = [
    {
      id: "hgu12s",
      icon: "/banner/banner1.jpg",
    },
    {
      id: "habkq",
      icon: "/banner/banner2.jpg",
    },
    {
      id: "paxwt",
      icon: "/banner/banner3.jpg",
    },
    {
      id: "nazpr",
      icon: "/banner/banner4.jpg",
    },
  ];

  const categories = [
    {
      id: "lwv67x",
      icon: "/category/fruit-et-legume.png",
      title: "Fruit et légume",
      slug: "fruits-legumes-viandes",
    },
    {
      id: "lpaqm",
      icon: "/category/huile.png",
      title: "Huile",
      slug: "huile",
    },
    {
      id: "lah51e",
      icon: "/category/pate.png",
      title: "Pâte",
      slug: "pate-alimentaire",
    },
    {
      id: "auw1ka",
      icon: "/category/boisson.png",
      title: "Boisson",
      slug: "boisson",
    },
    {
      id: "qnt7ht",
      icon: "/category/riz.png",
      title: "Riz",
      slug: "riz",
    },
  ];
  return (
    <main className="flex items-start gap-12 font-montserrat p-4 md:p-8">
      <div className="sticky hidden md:flex top-16 w-72">
        <Sidebar />
      </div>
      <div className="flex-1 flex-col items-center justify-center">
        <div
          className="relative w-full"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            borderRadius: "10px",
          }}
        >
          <Image
            src={images[isActive].icon}
            alt="banner"
            width={2000}
            height={2000}
            className="object-cover object-center h-auto md:h-[400px] rounded-[10px] transition-all duration-300"
          />
          <div className="absolute top-[44%] left-0 w-full h-full flex items-center gap-1 justify-center">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={clsx("w-3 h-3 rounded-full cursor-pointer z-10", {
                  "bg-[#FFCD00]": isActive === index,
                  "bg-[#142A4E]": isActive !== index,
                })}
                onClick={() => setIsActive(index)}
              />
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-20">
          {categories.map((c) => (
            <Link
              href={`/${c.slug}`}
              key={c.id}
              className="group cursor-pointer flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={c.icon}
                  alt={c.title}
                  width={150}
                  height={150}
                  className="object-cover object-center w-[100px] h-[100px] md:w-[150px] md:h-[150px] p-2 border border-gray-200 rounded-full group-hover:border-dashed group-hover:border-black transition-colors duration-300"
                />
              </div>
              <div className="relative overflow-hidden">
                <p className="text-center text-base font-medium group-hover:text-black transition-colors duration-300 p-2 rounded-full relative z-10">
                  {c.title}
                </p>
                <div className="absolute inset-0 bg-[#FFCD00] scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full" />
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full flex max-md:flex-col items-stretch gap-4">
          <div className="w-full md:w-1/4">
            <Image
              src="/poster/poster1.jpg"
              alt="service-clients"
              width={1000}
              height={300}
              className="object-cover object-center h-[250px] w-full rounded-[10px] transition-all duration-300"
            />
          </div>
          <div className="w-full md:w-2/4">
            <Image
              src="/poster/poster5.jpg"
              alt="atranger"
              width={1000}
              height={300}
              className="object-cover object-center h-[250px] w-full rounded-[10px] transition-all duration-300"
            />
          </div>
          <div className="w-full md:w-1/4">
            <Image
              src="/poster/poster3.jpg"
              alt="patisserie"
              width={1000}
              height={300}
              className="object-cover object-center h-[250px] w-full rounded-[10px] transition-all duration-300"
            />
          </div>
        </div>
        <div className="w-full mt-12 flex flex-col gap-12">
          <ProductMoment />
          <div className="w-full h-full">
            <video
              src="/banner/vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              width={2000}
              height={500}
              className="object-cover object-center w-full h-full md:max-h-[400px] md:h-[500px] rounded-[10px] transition-all duration-300"
            />
          </div>
          <MostSell />
        </div>
      </div>
    </main>
  );
}
