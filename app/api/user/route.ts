import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/db/dbase";
import { options } from "@/app/api/auth/[...nextauth]/option";

await connectDB();
export async function GET() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email }).select("-password");
  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
} 