import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db/dbase";
import bcrypt from "bcrypt";
import User from "@/lib/models/user";

connectDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (credentials) {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Adresse E-mail incorrect");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrectPassword) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            phone: user.phone,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            gender: user.gender,
            address: user.address,
            city: user.city,
            state: user.state,
            zip: user.zip,
          };
        }
        return null; // Assurez-vous de retourner null si credentials est undefined
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.lastname = user.lastname;
        token.firstname = user.firstname;
        token.email = user.email;
        token.gender = user.gender;
        token.address = user.address;
        token.city = user.city;
        token.state = user.state;
        token.zip = user.zip;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.lastname = token.lastname as string;
        session.user.firstname = token.firstname as string;
        session.user.email = token.email as string;
        session.user.gender = token.gender as string;
        session.user.address = token.address as string;
        session.user.city = token.city as string;
        session.user.state = token.state as string;
        session.user.zip = token.zip as string;
      }
      return session;
    },
  },
};
