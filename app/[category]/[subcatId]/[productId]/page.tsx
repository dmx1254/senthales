"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ProductR } from "@/lib/utils";
import { useCartStore } from "@/lib/storecart";
import { toast } from "sonner";
import Link from "next/link";

// Composant effet loupe dynamique sur image
function ImageMagnifier({
  src,
  alt,
  width = 500,
  height = 500,
  zoom = 2,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  zoom?: number;
  className?: string;
}) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;
    const {
      left,
      top,
      width: imgWidth,
      height: imgHeight,
    } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMagnifierPos({
      x: Math.max(0, Math.min(x, imgWidth)),
      y: Math.max(0, Math.min(y, imgHeight)),
    });
  };

  // Désactive la loupe sur mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={`relative w-full flex items-center justify-center ${className || ""}`}
      style={{ minHeight: height }}
      onMouseEnter={() => !isMobile && setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="overflow-hidden rounded-lg bg-white border border-gray-200 flex items-center justify-center"
        style={{ width, height }}
      >
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain w-full h-full"
          priority
        />
        {/* Loupe dynamique */}
        {showMagnifier && !isMobile && (
          <div
            className="pointer-events-none absolute border-2 border-primary rounded-full shadow-lg"
            style={{
              left: magnifierPos.x - 75,
              top: magnifierPos.y - 75,
              width: 150,
              height: 150,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${width * zoom}px ${height * zoom}px`,
              backgroundPosition: `-${magnifierPos.x * zoom - 75}px -${magnifierPos.y * zoom - 75}px`,
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}

// Composant Tabs simple
function Tabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: string[];
  activeTab: number;
  onTabChange: (i: number) => void;
}) {
  return (
    <div className="flex border-b border-gray-200 rounded-t-lg bg-transparent justify-start">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`py-3 px-6 text-base font-semibold transition-colors duration-200 border focus:outline-none w-auto
            ${
              activeTab === i
                ? "bg-white text-[#142A4E]"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
            }
            ${i === 0 ? "rounded-t-lg" : ""}
            ${i === 1 ? "rounded-t-lg" : ""}
            ${i === tabs.length - 1 ? "rounded-t-lg" : ""}
          `}
          onClick={() => onTabChange(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductR | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductR[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { addItem, addFavsItem, favsItems } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/product/${productId}`);
        if (!response.ok) {
          throw new Error("Produit non trouvé");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        toast.error("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    const fetchSuggestedProducts = async () => {
      try {
        const response = await fetch("/api/product/moment");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits suggérés");
        }
        const data = await response.json();
        // Filtrer le produit actuel des suggestions
        setSuggestedProducts(data.filter((p: ProductR) => p._id !== productId));
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits suggérés:",
          error
        );
      }
    };

    fetchProduct();
    fetchSuggestedProducts();
  }, [productId]);

  const handlePrev = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const handleNext = () =>
    setCarouselIndex((i) => Math.min(suggestedProducts.length - 4, i + 1));

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: quantity,
    });

    toast.success("Produit ajouté au panier", {
      style: {
        color: "#16a34a",
      },
      duration: 3000,
      position: "top-right",
    });
  };

  const handleAddToFavs = () => {
    if (!product) return;

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
      quantity: quantity,
    });

    toast.success("Produit ajouté aux favoris", {
      style: {
        color: "#16a34a",
      },
      duration: 3000,
      position: "top-right",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#142A4E]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Produit non trouvé
          </h2>
          <p className="text-gray-600">
            Le produit que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-8 px-4 md:px-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#142A4E]">
            Accueil
          </Link>
          <span>/</span>
          <Link
            href={`/${product?.category}`}
            className="hover:text-[#142A4E] capitalize"
          >
            {product?.category}
          </Link>
          <span>/</span>
          <Link
            href={`/${product?.category}/${product?.subCategory}`}
            className="hover:text-[#142A4E] capitalize"
          >
            {product?.subCategory}
          </Link>
          <span>/</span>
          <span className="text-[#142A4E] font-medium">{product?.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image du produit */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <ImageMagnifier
                src={product?.image || ""}
                alt={product?.name || ""}
                width={500}
                height={500}
                className="object-cover"
                zoom={2.2}
              />
            </div>

            {/* Détails du produit */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product?.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(0 avis)</span>
                </div>
                <p className="text-4xl font-bold text-[#142A4E] mb-6">
                  {formatCurrency(product?.price || 0)}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Sélecteur de quantité */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Quantité :</span>
                <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                  <button
                    className="px-4 py-2 bg-gray-100 text-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="px-8 py-2 bg-white text-lg select-none min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 bg-gray-100 text-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#142A4E] text-white py-4 rounded-lg font-semibold hover:bg-[#142A4E]/90 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag size={24} />
                  Ajouter au panier
                </button>
                <button
                  onClick={handleAddToFavs}
                  className="w-full border-2 border-[#142A4E] text-[#142A4E] py-4 rounded-lg font-semibold hover:bg-[#142A4E]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={24} />
                  Ajouter aux favoris
                </button>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Informations produit
                </h2>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-600 text-sm">Catégorie</p>
                    <p className="font-medium capitalize">
                      {product?.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Sous catégorie</p>
                    <p className="font-medium capitalize">
                      {product?.subCategory}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="w-full mt-8 bg-transparent">
          <Tabs
            tabs={["Description", "Détails du produit", "Avis"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="rounded-b-lg p-8 text-lg font-semibold min-h-[80px] border border-t-0 border-gray-200 bg-white">
            {activeTab === 0 && (
              <span className="text-gray-600 leading-relaxed">
                {product?.description}
              </span>
            )}
            {activeTab === 1 && (
              <span className="text-gray-600">
                Détails techniques du produit à venir...
              </span>
            )}
            {activeTab === 2 && (
              <span className="text-gray-600">Aucun avis pour ce produit.</span>
            )}
          </div>
        </div>

        {/* Section produits suggérés */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Produits suggérés
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  disabled={carouselIndex === 0}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={carouselIndex >= suggestedProducts.length - 4}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-x-hidden">
                <div
                  className="flex gap-6 transition-transform duration-300"
                  style={{ transform: `translateX(-${carouselIndex * 280}px)` }}
                >
                  {suggestedProducts.map((prod) => (
                    <div
                      key={prod._id}
                      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center p-6 min-w-[260px] max-w-[260px] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-40 h-40 flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          width={160}
                          height={160}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                          {prod.name}
                        </h3>
                        <p className="text-lg font-bold text-[#142A4E] mb-3">
                          {formatCurrency(prod.price)}
                        </p>
                        <Link
                          href={`/${prod.category}/${prod.subCategory}?id=${prod._id}`}
                          className="inline-block px-4 py-2 text-sm font-medium text-[#142A4E] border-2 border-[#142A4E] rounded-lg hover:bg-[#142A4E] hover:text-white transition-colors"
                        >
                          Voir le produit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
