import { Schema, model, models, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

interface IFormDataAddress extends Document {
  fullname: string;
  address: string;
  city: string;
  phone: string;
  zip: string;
}

interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  orderNumber: string;
  products: IProduct[];
  totalPrice: number;
  shipping: number;
  paymentMethod: string;
  shippingZone: string;
  shippingDetails: IFormDataAddress;
  paymentStatus: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: false },
      },
    ],
    orderNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    shippingZone: { type: String, default: "" },
    shippingDetails: { type: Schema.Types.Mixed, default: {} },
    paymentMethod: { type: String, default: "cash-on-delivery" },
    paymentStatus: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Order = models.order || model<IOrder>("order", OrderSchema);

export default Order;
