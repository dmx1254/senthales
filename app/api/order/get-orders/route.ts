import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Order from "@/lib/models/order";
import User from "@/lib/models/user";
import { options } from "../../auth/[...nextauth]/option";
import { connectDB } from "@/lib/db/dbase";

await connectDB();

export async function GET() {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // On récupère l'utilisateur pour avoir son _id
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    );
  }

  try {
    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
