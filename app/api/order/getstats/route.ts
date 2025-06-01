import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Order from "@/lib/models/order";
import { connectDB } from "@/lib/db/dbase";
import User from "@/lib/models/user";
import { options } from "../../auth/[...nextauth]/option";

await connectDB();
export async function GET() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    );
  }
  const orders = await Order.find({ userId: user._id });
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const delivered = orders.filter(
    (o) => o.paymentStatus === "delivered"
  ).length;
  const pending = orders.filter((o) => o.paymentStatus === "pending").length;
  const processing = orders.filter(
    (o) => o.paymentStatus === "processing"
  ).length;
  const cancelled = orders.filter(
    (o) => o.paymentStatus === "cancelled"
  ).length;
  return NextResponse.json(
    {
      totalOrders,
      totalSpent,
      delivered,
      pending,
      processing,
      cancelled,
    },
    { status: 200 }
  );
}
