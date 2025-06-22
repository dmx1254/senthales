import { NextResponse } from "next/server";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/db/dbase";


await connectDB();

export async function GET() {
  try {
    // Prend les 3 premiers produits (adapte si tu veux filtrer autrement)
    const products = await Product.find({}).limit(3);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des produits",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
