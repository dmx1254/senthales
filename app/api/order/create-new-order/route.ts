import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Order from "@/lib/models/order";
import { options } from "../../auth/[...nextauth]/option";

import { connectDB } from "@/lib/db/dbase";

await connectDB();
export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const newOrder = await Order.create({
      userId: session.user.id,
      products: data.products,
      totalPrice: data.totalPrice,
      shippingZone: data.shippingZone,
      paymentMethod: data.paymentMethod,
      shippingDetails: data.shippingDetails,
      shipping: data.shipping,
      paymentStatus: data.paymentStatus,
      orderNumber: data.orderNumber,
    });

    if (!newOrder) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const message = `Bonjour ${newOrder.shippingDetails.fullname}, commande n° ${newOrder.orderNumber} enregistrée. Vous recevrez un SMS lorsque votre commande sera prête à être récupérée.`;

    const sendSMS = await fetch("https://api.axiomtext.com/api/sms/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AXIOMTEXT_API_KEY!}`,
      },
      body: JSON.stringify({
        to: newOrder.shippingDetails.phone,
        message: message,
        signature: "SENTHALES",
      }),
    });

    if (!sendSMS.ok) {
      const errorText = await sendSMS.text();
      console.error("Erreur SMS:", errorText);
    }

    return NextResponse.json(
      {
        message: "Votre commande a été enregistrée avec succès",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
