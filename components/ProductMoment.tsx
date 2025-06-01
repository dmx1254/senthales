"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Eye,
  Heart,
  ShoppingBag,
  X,
} from "lucide-react";
import clsx from "clsx";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useCartStore } from "@/lib/storecart";
import { toast } from "sonner";
import { formatCurrency, ProductR } from "@/lib/utils";

const categories = [
  {
    id: "ghfsd",
    title: "Epicerie Sucrée",
    slug: "epicerie-sucree",
  },
  {
    id: "jzqpa",
    title: "Boissons",
    slug: "boissons",
  },
  {
    id: "mkwya",
    title: "Pâte Alimentaire",
    slug: "pate-alimentaire",
  },
  {
    id: "lxaiu",
    title: "Fruits & légumes & viandes",
    slug: "fruits-legumes-viandes",
  },
  {
    id: "mkxzb",
    title: "Epicerie Salée",
    slug: "epicerie-salee",
  },
];

const PRODUCTS_PER_PAGE = 8;

export default function ProductMoment() {
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
          `/api/product/categories?category=${selectedCategory}&page=${page}&limit=${PRODUCTS_PER_PAGE}`
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
        <h2 className="text-lg md:text-2xl font-bold text-black/70">Produits du Moment</h2>
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
              "border font-medium cursor-pointer border-gray-200 px-4 py-2 rounded-[10px]",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isProductFetched ? (
          [...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 flex flex-col items-center p-4 rounded-[10px] overflow-hidden"
            >
              <div className="relative">
                <div className="w-[150px] h-[150px] bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 w-full">
                <div className="flex items-center gap-[.5px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white border border-gray-200 flex flex-col items-center p-4 rounded-[10px] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="flex items-center gap-[.5px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MdOutlineStarPurple500
                      key={index}
                      className="w-4 h-4 text-gray-400"
                    />
                  ))}
                </div>
                <h3 className="text-lg w-full uppercase text-black/80 font-bold text-center">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-base text-black/70 font-bold">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex absolute top-[50%] group-hover:flex transition-all duration-300 items-center justify-center gap-2 ">
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
              <div className="flex md:hidden absolute top-[50%] group-hover:flex transition-all duration-300 items-center justify-center gap-2 ">
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
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 text-lg mb-2">
              Aucun produit trouvé dans cette catégorie
            </div>
            <p className="text-gray-400 text-sm">
              Veuillez essayer une autre catégorie ou revenir plus tard
            </p>
          </div>
        )}
      </div>
      {/* Pagination info */}
      {products.length > 0 && (
        <div className="flex justify-center mt-4 text-sm text-gray-500">
          Page {page} sur {totalPages}
        </div>
      )}

      {/* Product Dialog */}
      {showDialog && selectedProduct && (
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
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details section */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProduct.name}
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
                      {formatCurrency(selectedProduct.price)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                      }}
                      className="w-full bg-[#142A4E] text-white py-3 rounded-lg font-semibold hover:bg-[#142A4E]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={20} />
                      Ajouter au panier
                    </button>
                    <button
                      onClick={() => {
                        handleAddToFavs(selectedProduct);
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
    </div>
  );
}
