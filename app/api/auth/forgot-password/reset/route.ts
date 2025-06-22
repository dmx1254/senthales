import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbase";
import User from "@/lib/models/user";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "Le numéro de téléphone et le mot de passe sont requis" },
        { status: 400 }
      );
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe
    await User.findOneAndUpdate(
      { phone },
      { password: hashedPassword }
    );

    return NextResponse.json(
      { message: "Mot de passe réinitialisé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la réinitialisation du mot de passe" },
      { status: 500 }
    );
  }
} 