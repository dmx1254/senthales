import React from "react";

const ConditionsUtilisationPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-20 px-4 py-10 bg-white/90 rounded-2xl shadow-lg flex flex-col gap-8 font-montserrat">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#142A4E] mb-2">
        Conditions d&apos;utilisation
      </h1>
      <section className="text-gray-700 text-base leading-relaxed space-y-8">
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 1</h2>
          <p>
            La marchandise commandée à Senthales sur le site e-commerce est livrée dans les 24 heures à Dakar (sauf empêchement exceptionnel) par nos services à l&apos;adresse souhaitée.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 2</h2>
          <p>
            Les frais de livraison prennent en compte le transport. Nous conseillons de regrouper les commandes pour éviter de supporter les mêmes frais pour chaque commande. Les marchandises livrées ne peuvent faire l&apos;objet d&apos;un retour après le départ du livreur. Chers clients, nous vous demandons la validation des livraisons avec nos services.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 3</h2>
          <p>
            Le règlement des factures à la livraison ne se fait qu&apos;en francs CFA, EURO ou DOLLAR, Visa, MasterCard 3D Secure, virement bancaire ou chèque. Nos livraisons sont limitées au territoire sénégalais. Par conséquent, toute commande destinée hors du territoire sénégalais doit faire l&apos;objet d&apos;une coordination préalable avec nos services par téléphone (<span className="font-semibold">+221 77 862 00 00</span>, <span className="font-semibold">+221 76 862 00 00</span>, <span className="font-semibold">+221 78 862 00 00</span>) ou par E-mail : <a href="mailto:info.senthales@gmail.com" className="text-[#142A4E] underline">info.senthales@gmail.com</a>.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 4</h2>
          <p>
            Les prix affichés sur le site sont exprimés en francs CFA et incluent toutes les taxes applicables. Senthales se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 5</h2>
          <p>
            Senthales s&apos;engage à protéger les données personnelles de ses clients. Les informations collectées sont utilisées uniquement dans le cadre de la relation commerciale et ne sont jamais partagées avec des tiers sans consentement préalable.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Règle Senthales n° 6</h2>
          <p>
            En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux sénégalais seront seuls compétents.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConditionsUtilisationPage;