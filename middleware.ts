import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Vérifie si c'est une route protégée (profile)
  const isProtectedProfileRoute = /^\/profile/.test(
    request.nextUrl.pathname
  );

  if (isProtectedProfileRoute) {
    // Utilise getToken de next-auth pour vérifier l'authentification
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Redirige vers la page de connexion en préservant la locale
      const loginUrl = new URL(`/connexion`, request.url);
      // Ajoute l'URL de callback pour rediriger après la connexion
      loginUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher mis à jour pour inclure toutes les routes localisées et protégées
  matcher: [
    // Routes protégées
    "/profile/:path*",
  ],
};
