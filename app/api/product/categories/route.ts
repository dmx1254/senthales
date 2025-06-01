import Product from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";
import { SortOrder } from "mongoose";

interface FilterQuery {
  category?: string;
  subCategory?: string;
  stock?: { $gt: number };
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

type SortQuery = { [key: string]: SortOrder };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const sort = searchParams.get("sort") || "pertinence";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // console.log("category", category);
    // console.log("subCategory", subCategory);
    // console.log("minPrice", minPrice);
    // console.log("maxPrice", maxPrice);
    // console.log("inStock", inStock);
    // console.log("sort", sort);
    // console.log("page", page);
    // console.log("limit", limit);
    // Build filter object
    const filter: FilterQuery = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (inStock === "true") filter.stock = { $gt: 0 };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Build sort object
    const sortObj: SortQuery = {};
    switch (sort) {
      case "prix-asc":
        sortObj.price = 1;
        break;
      case "prix-desc":
        sortObj.price = -1;
        break;
      default:
        sortObj.createdAt = -1; // Default sort by newest
    }

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get products with filters, sort and pagination
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
