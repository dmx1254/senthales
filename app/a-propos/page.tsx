import React from "react";

const AProposPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-20 px-4 py-10 bg-white/90 rounded-2xl shadow-lg flex flex-col gap-8 font-montserrat">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#142A4E] mb-2">À propos de Senthales</h1>
      <section className="text-gray-700 text-base leading-relaxed space-y-8">
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Notre entreprise Senthales</h2>
          <p>
            Ravitaillez-vous moins cher sur <span className="font-semibold text-[#FFCD00]">www.senthales.sn</span>
            <br />
            Achetez sans vous déplacer, économisez du temps et de l&apos;argent.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Produits &amp; Services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Produits de haute qualité</li>
            <li>Service client inégalé : <span className="font-semibold">+221 77 862 00 00</span> - <span className="font-semibold">+221 76 862 00 00</span> - <span className="font-semibold">+221 78 862 00 00</span></li>
            <li>Équipe Senthales à votre écoute</li>
            <li>Achetez au prix de gros</li>
            <li>Commandez et payez sur <span className="font-semibold text-[#FFCD00]">www.senthales.sn</span></li>
            <li>Livraison à domicile en 24H : simple, rapide, efficace</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Témoignages Senthales</h2>
          <p>
            Faites vos dons en ligne, large choix de produits disponibles tous les jours sur la plateforme <span className="font-semibold text-[#FFCD00]">senthales.com</span>.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Contact</h2>
          <p>
            E-mail : <a href="mailto:info.senthales@gmail.com" className="text-[#142A4E] underline">info.senthales@gmail.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AProposPage;
