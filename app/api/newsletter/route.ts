import Newsletter from "@/lib/models/newsletter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const isEmailExists = await Newsletter.findOne({ email });
    if (isEmailExists) {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit à la newsletter" },
        { status: 400 }
      );
    }
    const newsletter = await Newsletter.create({ email });
    return NextResponse.json(newsletter);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'inscription à la newsletter",
      },
      { status: 400 }
    );
  }
}
