import mongoose from "mongoose";

const globalWithMongoose = global as typeof global & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<string> => {
  if (cached.conn) {
    return "Already connected to database";
  }

  if (!process.env.DB_CONNECT) {
    throw new Error("DB_CONNECT is not defined in the environment variables");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DB_CONNECT!)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return "Connected to database with success";
};