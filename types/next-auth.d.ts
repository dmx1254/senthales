// types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    phone?: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      phone: string;
      gender: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };
  }
}

interface JWT {
  id?: string;
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}
