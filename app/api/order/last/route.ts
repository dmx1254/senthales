import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import Order from "@/lib/models/order";
import { connectDB } from "@/lib/db/dbase";
import User from "@/lib/models/user";

await connectDB();
export async function GET() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }
  const lastOrder = await Order.findOne({ userId: user.id }).sort({ createdAt: -1 });
  if (!lastOrder) {
    return NextResponse.json({ error: "Aucune commande trouvée" }, { status: 404 });
  }
  return NextResponse.json(lastOrder, { status: 200 });
} 