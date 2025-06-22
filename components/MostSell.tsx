"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Eye,
  Heart,
  ShoppingBag,
} from "lucide-react";
import clsx from "clsx";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { formatCurrency, ProductR } from "@/lib/utils";
import { useCartStore } from "@/lib/storecart";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  {
    id: "ghfsd",
    title: "Epicerie Sucrée",
    slug: "epicerie-sucree",
  },
  {
    id: "lvwkf",
    title: "Biscuits & Confiserie",
    slug: "biscuits-confiserie",
  },
  {
    id: "mxjax",
    title: "Produits-bébé",
    slug: "produits-bebe",
  },
  {
    id: "otshf",
    title: "Produits locaux",
    slug: "produits-locaux",
  },
  {
    id: "mkxzb",
    title: "Epicerie Salée",
    slug: "epicerie-salee",
  },
];

const PRODUCTS_PER_PAGE = 4;

export default function MostSell() {
  const { addItem, addFavsItem, favsItems } = useCartStore();
  const [products, setProducts] = useState<ProductR[]>([]);
  const [isProductFetched, setIsProductFetched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("epicerie-sucree");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductR | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductFetched(true);
      try {
        const response = await fetch(
          `/api/product/categories?category=${selectedCategory}&page=${page}&limit=${PRODUCTS_PER_PAGE}&sort=prix-asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // cache: "force-cache",
            // next: {
            //   revalidate: 60 * 60, // 1 hour
            // },
          }
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      } catch {
        setProducts([]);
      } finally {
        setIsProductFetched(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, page]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddToCart = (
    product: Pick<ProductR, "_id" | "name" | "price" | "description" | "image">
  ) => {
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
    product: Pick<ProductR, "_id" | "name" | "price" | "description" | "image">
  ) => {
    const isInFavs = favsItems.some((item) => item.id === product._id);
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

  const handleQuickView = (product: ProductR) => {
    setSelectedProduct(product);
    setShowDialog(true);
  };

  return (
    <div className="w-full font-montserrat">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-lg md:text-2xl font-bold text-black/70">
          Produits les plus vendus
        </h2>
        <div className="flex gap-4 items-center">
          <button
            className={clsx({
              "opacity-50 text-gray-300 cursor-not-allowed": page === 1,
              "text-gray-500 cursor-pointer": page > 1,
            })}
            onClick={handlePrev}
            disabled={page === 1}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <button
            className={clsx({
              "opacity-50 text-gray-300 cursor-not-allowed":
                page === totalPages,
              "text-gray-500 cursor-pointer": page < totalPages,
            })}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center md:items-start justify-between my-8 gap-2 sm:gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={clsx(
              "border font-medium cursor-pointer border-gray-200 px-3 sm:px-4 py-2 rounded-[10px] text-sm sm:text-base whitespace-nowrap",
              {
                "bg-[#FFCD00] text-black": selectedCategory === category.slug,
                "text-black/60": selectedCategory !== category.slug,
              }
            )}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isProductFetched ? (
          [...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 flex flex-col items-center p-3 sm:p-4 rounded-[10px] overflow-hidden"
            >
              <div className="relative w-full aspect-square max-w-[150px]">
                <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 sm:p-4 w-full">
                <div className="flex items-center gap-[.5px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-5 sm:h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 sm:h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white border border-gray-200 flex flex-col items-center p-3 sm:p-4 rounded-[10px] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full aspect-square max-w-[150px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col items-center gap-2 p-3 sm:p-4">
                <div className="flex items-center gap-[.5px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MdOutlineStarPurple500
                      key={index}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
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
              <div className="hidden absolute top-[50%] md:group-hover:flex transition-all duration-300 items-center justify-center gap-2">
                <button
                  onClick={() => handleAddToFavs(product)}
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
                >
                  <Heart size={17} />
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
                >
                  <ShoppingBag size={17} />
                </button>
                <button
                  onClick={() => handleQuickView(product)}
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
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
              <div className="flex md:hidden absolute top-[50%] transition-all duration-300 items-center justify-center gap-2 ">
                <button
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
                  onClick={() => handleAddToFavs(product)}
                >
                  <Heart size={17} />
                </button>
                <button
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag size={17} />
                </button>
                <button
                  className="flex items-center justify-center p-1.5 rounded-[6px] bg-[#142A4E] text-white cursor-pointer hover:bg-[#142A4E]/80"
                  onClick={() => handleQuickView(product)}
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
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Aucun produit trouvé
          </div>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg p-0 overflow-hidden rounded-2xl shadow-2xl border-0">
          {selectedProduct && (
            <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 items-center relative">
              <span className="absolute top-4 sm:top-10 right-4 sm:right-6 px-2 sm:px-3 py-1 rounded-full bg-[#FFCD00]/20 text-[#FFCD00] font-semibold text-xs shadow-sm uppercase">
                {selectedProduct.category}
              </span>
              {selectedProduct.image && (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-50">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col items-center gap-1 w-full">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-1 w-full">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 sm:px-4 py-1 rounded-full bg-[#FFCD00]/20 text-[#FFCD00] font-bold text-base sm:text-lg shadow">
                    {formatCurrency(selectedProduct.price)}
                  </span>
                </div>
                <div className="flex items-center gap-[.5px] mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MdOutlineStarPurple500
                      key={index}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="text-gray-700 text-center text-sm sm:text-base mb-2">
                  {selectedProduct.description}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full">
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg bg-[#FFCD00] text-black font-bold shadow hover:bg-black hover:text-[#FFCD00] transition-colors text-sm"
                >
                  Ajouter au panier
                </button>
                <button
                  onClick={() => handleAddToFavs(selectedProduct)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg bg-white border border-[#FFCD00] text-[#FFCD00] font-bold shadow hover:bg-[#FFCD00] hover:text-black transition-colors text-sm"
                >
                  Ajouter aux favoris
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
