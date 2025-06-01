import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const { id } = await params;


    console.log(id);
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { message: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { 
        message: "Erreur lors de la récupération du produit", 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    );
  }
} 