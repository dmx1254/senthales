import Newsletter from "@/lib/models/newsletter";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Newsletter.deleteMany();
    return NextResponse.json(
      {
        message: "Newsletters deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Newsletters deletion failed",
      },
      { status: 500 }
    );
  }
}
