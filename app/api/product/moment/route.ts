import { connectDB } from "@/lib/db/dbase";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

// Get 5 random products
// Products of the moment

await connectDB();
export async function GET() {
  try {
    const products = await Product.aggregate([{ $sample: { size: 5 } }]);
    return NextResponse.json(products, { status: 200 });
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
