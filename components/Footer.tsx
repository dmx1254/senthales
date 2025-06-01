"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        toast.error("Veuillez entrer une adresse e-mail valide", {
          style: {
            color: "#ef4444",
          },
          position: "top-right",
          duration: 3000,
          icon: "🚨",
        });
        return;
      }
      setIsLoading(true);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Vous êtes inscrit à la newsletter", {
          style: {
            background: "#142A4E",
            color: "#fff",
          },
          position: "top-right",
          duration: 5000,
          icon: "🎉",
        });
        setEmail("");
      } else {
        toast.error(data.error, {
          style: {
            color: "#ef4444",
          },
          position: "top-right",
          duration: 5000,
          icon: "🚨",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Une erreur est survenue lors de l'inscription à la newsletter",
        {
          style: {
            color: "#ef4444",
          },
          position: "top-right",
          duration: 5000,
          icon: "🚨",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    !pathname.includes("/profile") && (
      <footer className="bg-[#142A4E] border-t mt-12 border-gray-200 text-white font-montserrat">
        {/* <div className="w-full h-12 bg-[#F5F5F5]" /> */}
        {/* Logo & Description */}
        <div className="bg-white text-neutral-900 pt-10 pb-0 text-center">
          <Image
            src="/logo.png"
            alt="senthales Logo"
            width={150}
            height={150}
            className="mx-auto object-cover object-center"
          />
          <p className="max-w-5xl mx-auto mt-5 pb-6 text-sm text-neutral-500 px-4">
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
            <div className="mb-2 text-sm text-neutral-500">
              <span role="img" aria-label="location" className="text-sm">
                📍
              </span>{" "}
              Dakar dieuppeul 1 N° 2248
              <br />
              Dakar, Sénégal
            </div>
            <Link
              href="mailto:senthales.support@gmail.com"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              <span role="img" aria-label="mail" className="text-sm">
                ✉️
              </span>{" "}
              senthales.support@gmail.com
            </Link>
            <Link
              href="https://wa.me/221771457816"
              className="text-sm hover:opacity-80 text-neutral-500"
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
            <Link
              href="/epicerie-sucree"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Epicerie Sucrée
            </Link>
            <Link
              href="/epicerie-sucree/cafe-capsule-moulu"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Café capsule &amp; Moulu
            </Link>
            <Link
              href="/riz"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Riz
            </Link>
            <Link
              href="/huile"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Huile
            </Link>
            <Link
              href="/fruits-legumes-viandes"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Fruits &amp; légumes &amp; viandes
            </Link>
          </div>
          {/* Votre Compte */}
          <div className="min-w-[220px] mb-5 flex flex-col items-start gap-2">
            <h3 className="font-bold text-base mb-2">VOTRE COMPTE</h3>
            <Link
              href="/profile"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Informations personnelles
            </Link>
            <Link
              href="/profile/commandes"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
              Commandes
            </Link>
            <Link
              href="/profile/favoris"
              className="text-sm hover:opacity-80 text-neutral-500"
            >
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
            <form onSubmit={handleSubmit} className="flex mb-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Votre adresse e-mail"
                className="px-3 w-full outline-none focus:outline-none text-sm py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-[#142A4E] cursor-pointer text-white text-sm p-2 rounded-r-md font-bold hover:bg-[#142A4E]/90 transition-colors"
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={16} />
                ) : (
                  "S'ABONNER"
                )}
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
