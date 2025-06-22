"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Product from "@/components/Product";
import { ProductR } from "@/lib/utils";
import { categories, SubType } from "@/lib/data";

interface Filters {
  subCategory: string[];
  inStock: boolean;
  minPrice: number;
  maxPrice: number;
}

const CategoryPage = () => {
  const { category, subcatId } = useParams();

  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductR[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    subCategory: [subcatId as string],
    inStock: false,
    minPrice: 140,
    maxPrice: 187000,
  });
  const [subcategories, setSubcategories] = useState<SubType[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [sort, setSort] = useState("pertinence");
  const observer = useRef<IntersectionObserver | null>(null);

  useMemo(() => {
    const subcategories = categories.find(
      (item) => item.slug === category
    )?.subcat;
    setSubcategories(subcategories || []);
  }, [category]);

  const handleSubCategoryClick = (slug: string) => {
    setSelectedSubCategory(slug);
    setFilters((prev) => ({
      ...prev,
      subCategory: [slug],
    }));
    setPage(1);
  };

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Loading more products...", { page, hasMore });
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  const fetchProducts = async (pageNum: number, isNewSearch = false) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        category: category as string,
        subCategory: subcatId as string,
        page: pageNum.toString(),
        limit: "12",
        sort,
        ...(filters.subCategory.length > 0 && {
          subCategory: filters.subCategory.join(","),
        }),
        ...(filters.inStock && { inStock: "true" }),
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
      });

      console.log("Fetching products...", { pageNum, isNewSearch });
      const response = await fetch(`/api/product/categories?${queryParams}`);
      const data = await response.json();
      // console.log("Products fetched:", {
      //   productsCount: data.products.length,
      //   totalPages: data.pagination.totalPages,
      //   currentPage: data.pagination.currentPage,
      // });

      if (isNewSearch) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      setHasMore(pageNum < data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1, true);
  }, [category, filters, sort]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-montserrat">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center mx-auto gap-2 text-gray-500 text-sm px-4 md:px-8 pt-6">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>{" "}
        /<span>{category}</span>/<span>{subcatId}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6">
        {/* Sidebar sticky */}
        <div className="mb-6 md:mb-0 md:sticky md:top-6 h-fit">
          <Sidebar
            isShowDownSidebar={false}
            isTitle={subcatId?.toString().split("-").join(" ") as string}
          />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Titre */}
          <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200">
            <span className="text-sm text-neutral-500 font-semibold">
              {subcatId?.toString().split("-").join(" ") as string}
            </span>
          </div>

          {/* Filtres et tri */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-lg p-4 mt-2">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center cursor-pointer gap-1 px-3 py-2 border rounded text-sm bg-gray-50"
                onClick={() => setShowFilters((v) => !v)}
              >
                <SlidersHorizontal size={15} />
                Filtrer
              </button>
              <span className="text-sm text-gray-500 ml-2">
                {products.length} produits
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trier par :</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="pertinence">Pertinence</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
          {/* Bloc filtres avancés animé */}
          <div
            className={`w-full bg-[#FAFAFA] border border-gray-200 rounded-lg mt-2 overflow-hidden transition-all duration-300 ${
              showFilters
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Catégories */}
              <div className="flex-1 min-w-[180px]">
                <span className="block font-bold mb-3 text-gray-700">
                  CATÉGORIES
                </span>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                  {subcategories
                    .filter((cat) => cat.slug === subcatId)
                    .map((cat, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm md:text-base"
                      >
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange({
                                subCategory: [...filters.subCategory, cat.slug],
                              });
                            } else {
                              handleFilterChange({
                                subCategory: filters.subCategory.filter(
                                  (slug) => slug !== cat.slug
                                ),
                              });
                            }
                          }}
                          className="accent-[#142A4E]"
                        />
                        <span>{cat.title}</span>
                      </label>
                    ))}
                </div>
              </div>
              {/* Prix */}
              <div className="flex-1 min-w-[200px]">
                <span className="block font-bold mb-3 text-gray-700">PRIX</span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {filters.minPrice} FCFA
                  </span>
                  <input
                    type="range"
                    min="140"
                    max="187000"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange({ minPrice: parseInt(e.target.value) })
                    }
                    className="w-full sm:w-32 md:w-40 accent-[#142A4E]"
                  />
                  <span className="text-sm text-gray-500">
                    {filters.maxPrice} FCFA
                  </span>
                </div>
              </div>
              {/* Disponibilité */}
              <div className="flex-1 min-w-[120px]">
                <span className="block font-bold mb-3 text-gray-700">
                  DISPONIBILITÉ
                </span>
                <label className="flex items-center gap-2 text-sm md:text-base">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) =>
                      handleFilterChange({ inStock: e.target.checked })
                    }
                    className="accent-[#142A4E]"
                  />
                  <span>En stock</span>
                </label>
              </div>
            </div>
          </div>
          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.length === 0 && !loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 text-center max-w-md">
                  Aucun produit ne correspond à vos critères de recherche.
                  Essayez de :
                </p>
                <ul className="list-disc text-gray-600 mt-2 text-center">
                  <li>Modifier vos filtres</li>
                  <li>Changer la gamme de prix</li>
                  <li>Vérifier d&apos;autres sous-catégories</li>
                </ul>
              </div>
            ) : (
              products.map((product, index) => (
                <div
                  key={product._id}
                  ref={
                    index === products.length - 1 ? lastProductElementRef : null
                  }
                  className="h-[400px]"
                >
                  <Product
                    product={product}
                    category={category as string}
                    subCategory={product.subCategory || ""}
                  />
                </div>
              ))
            )}
          </div>
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#142A4E]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
