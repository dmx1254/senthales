import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  gender: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  role: string;
}

const userSchema = new Schema(
  {
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = models.user || model<IUser>("user", userSchema);

export default User;
