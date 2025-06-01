import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/db/dbase";
import bcrypt from "bcrypt";

await connectDB();
export async function PATCH(req: Request) {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }
  const data = await req.json();

  // Mise à jour des infos de base
  const fields = ["firstname", "lastname", "phone", "address", "city", "state", "zip"];
  fields.forEach((field) => {
    if (data[field] !== undefined) user[field] = data[field];
  });

  // Changement de mot de passe
  if (data.oldPassword && data.newPassword) {
    const isMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Ancien mot de passe incorrect" }, { status: 400 });
    }
    user.password = await bcrypt.hash(data.newPassword, 10);
  }

  await user.save();
  return NextResponse.json({ message: "Profil mis à jour avec succès" }, { status: 200 });
}
