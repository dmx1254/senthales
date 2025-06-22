import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbase";
import User from "@/lib/models/user";

connectDB();

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Le numéro de téléphone et le code sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { error: "Aucun compte trouvé avec ce numéro de téléphone" },
        { status: 404 }
      );
    }

    // Vérifier le code OTP via AXIOMTEXT
    const verifyOtp = await fetch(`${process.env.AXIOMTEXT_API_URL}verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AXIOMTEXT_API_KEY!}`,
      },
      body: JSON.stringify({ phone, code }),
    });

    const verifyOtpData = await verifyOtp.json();

    if (!verifyOtpData.success) {
      return NextResponse.json(
        { errorMessage: verifyOtpData.error || "Code OTP invalide" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Code vérifié avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la vérification du code:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la vérification du code" },
      { status: 500 }
    );
  }
} 