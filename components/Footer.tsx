"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  return (
    !pathname.includes("/profile") && (
      <footer className="bg-[#142A4E] border-t border-gray-200 text-white font-montserrat">
        {/* <div className="w-full h-12 bg-[#F5F5F5]" /> */}
        {/* Logo & Description */}
        <div className="bg-white text-neutral-900 pt-10 pb-0 text-center">
          <Image
            src="/logo.png"
            alt="senthales Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <p className="max-w-3xl mx-auto mt-5 text-base">
            Nous sommes une boutique en ligne 100% sénégalaise de produits
            alimentaires et de boissons. Nous vous apportons innovation et
            créativité en proposant des produits soigneusement sélectionnés de
            haute qualité et une livraison rapide.
          </p>
        </div>
        {/* Main Footer Grid */}
        <div className="flex items-start max-lg:flex-col justify-between sm:px-10 px-4 gap-8 bg-white text-neutral-900 py-10 border-b border-gray-200">
          {/* Informations */}
          <div className="min-w-[220px] mb-5 flex flex-col items-start gap-2">
            <h3 className="font-bold text-base mb-2">INFORMATIONS</h3>
            <div className="mb-2 text-sm">
              <span role="img" aria-label="location" className="text-sm">
                📍
              </span>{" "}
              Dakar dieuppeul 1 N° 2248
              <br />
              Dakar, Sénégal
            </div>
            <Link
              href="mailto:senthales.support@gmail.com"
              className="text-sm hover:opacity-80"
            >
              <span role="img" aria-label="mail" className="text-sm">
                ✉️
              </span>{" "}
              senthales.support@gmail.com
            </Link>
            <Link
              href="https://wa.me/221771457816"
              className="text-sm hover:opacity-80"
            >
              <span role="img" aria-label="phone" className="text-sm">
                📞
              </span>{" "}
              WhatsApp +221 77 145 78 16
            </Link>
          </div>
          {/* Catégorie */}
          <div className="min-w-[220px] mb-5 flex flex-col items-start gap-2">
            <h3 className="font-bold text-base mb-2">CATEGORIE</h3>
            <Link href="/epicerie-sucree" className="text-sm">
              Epicerie Sucrée
            </Link>
            <Link
              href="/epicerie-sucree/cafe-capsule-moulu"
              className="text-sm"
            >
              Café capsule &amp; Moulu
            </Link>
            <Link href="/riz" className="text-sm">
              Riz
            </Link>
            <Link href="/huile" className="text-sm">
              Huile
            </Link>
            <Link href="/fruits-legumes-viandes" className="text-sm">
              Fruits &amp; légumes &amp; viandes
            </Link>
          </div>
          {/* Votre Compte */}
          <div className="min-w-[220px] mb-5 flex flex-col items-start gap-2">
            <h3 className="font-bold text-base mb-2">VOTRE COMPTE</h3>
            <Link href="/profile" className="text-sm">
              Informations personnelles
            </Link>
            <Link href="/profile/commandes" className="text-sm">
              Commandes
            </Link>
            <Link href="/profile/favoris" className="text-sm">
              Favoris
            </Link>
            {/* <Link href="/profile/adresses" className="text-sm">
              Adresses
            </Link>
            <Link href="/profile/listes-de-souhaits" className="text-sm">
              Mes listes de souhaits
            </Link>
            <Link href="/profile/alertes" className="text-sm">
              Mes alertes
            </Link> */}
          </div>
          {/* Newsletter */}
          <div className="mb-5 w-full lg:max-w-[300px]">
            <h3 className="font-bold text-base mb-2">NEWSLETTER</h3>
            <form className="flex mb-2">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="px-3 w-full text-sm py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-[#142A4E] text-white text-sm p-2 rounded-r-md font-bold hover:bg-[#142A4E]/90 transition-colors">
                S&apos;ABONNER
              </button>
            </form>
            <div className="text-sm text-gray-600 w-full lg:max-w-[300px]">
              Vous pouvez vous désinscrire à tout moment.
              <br />
              Vous trouverez pour cela nos informations de contact dans les
              conditions d&apos;utilisation du site.
            </div>
          </div>
        </div>
        {/* Paiement & Copyright */}
        <div className="flex items-center gap-4 justify-between sm:px-10 px-4 py-4 bg-[#142A4E] text-white">
          <div>
            <Image
              src="/paiement.png"
              alt="Paiement"
              width={100}
              height={100}
              className="object-cover object-center"
            />
          </div>
          <div className="text-center text-sm flex-1">
            senthales {new Date().getFullYear()} – Tous Droits Réservés
          </div>
          <span className="invisible">Invisible</span>
        </div>
        <div className="flex md:hidden items-center py-2 justify-center gap-2">
          <FaPhoneAlt className="text-white" size={16} />
          <span className="text-xs text-white font-semibold">
            24/7 support Whatsapp +221 77 145 78 16
          </span>
        </div>
      </footer>
    )
  );
};

export default Footer;
