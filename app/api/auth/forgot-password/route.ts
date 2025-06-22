import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbase";
import User from "@/lib/models/user";

connectDB();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Le numéro de téléphone est requis" },
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

    // Vérifier si le numéro de téléphone est déjà utilisé
    const isUserAlreadyPhoneExist = await User.findOne({ phone });
    if (!isUserAlreadyPhoneExist) {
      return NextResponse.json(
        { error: "Ce numéro de téléphone n'est pas associé à un compte" },
        { status: 400 }
      );
    }

    // Envoyer le code OTP via AXIOMTEXT
    const sendOtp = await fetch(`${process.env.AXIOMTEXT_API_URL}send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AXIOMTEXT_API_KEY!}`,
      },
      body: JSON.stringify({ phone, signature: "SENTHALES" }),
    });

    const sendOtpData = await sendOtp.json();

    if (sendOtpData.success) {
      return NextResponse.json({ message: "Code OTP envoyé" }, { status: 200 });
    }

    return NextResponse.json(
      { errorMessage: sendOtpData.error || "Erreur lors de l'envoi du code" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du code:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du code" },
      { status: 500 }
    );
  }
} 