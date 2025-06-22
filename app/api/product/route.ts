import { NextResponse } from "next/server";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/db/dbase";

await connectDB();
export async function POST(req: Request) {
  try {
    const data = await req.json();

    await Product.create(data);
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Product not created", error: error.message },
      { status: 500 }
    );
  }
}
