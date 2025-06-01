import Product from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subcatId = searchParams.get("subcatId");
    if (!subcatId) {
      return NextResponse.json({ message: "subcatId manquant" }, { status: 400 });
    }
    const products = await Product.find({ subCategory: subcatId });
    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération des produits", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 