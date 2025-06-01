import React from "react";

const MentionsLegalesPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-20 px-4 py-10 bg-white/90 rounded-2xl shadow-lg flex flex-col gap-8 font-montserrat">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#142A4E] mb-2">
        Mentions légales
      </h1>
      <section className="text-gray-700 text-base leading-relaxed space-y-6">
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">
            Éditeur du site
          </h2>
          <p>
            <span className="font-semibold">Senthales</span> <br />
            Siège social : Dakar, Sénégal <br />
            E-mail :{" "}
            <a
              href="mailto:info.senthales@gmail.com"
              className="text-[#142A4E] underline"
            >
              info.senthales@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Hébergement</h2>
          <p>
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA
            <br />
            <a href="https://vercel.com" className="text-[#142A4E] underline">
              https://vercel.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu du site (textes, images, graphismes,
            logo, icônes, etc.) est la propriété exclusive de Senthales, sauf
            mention contraire. Toute reproduction, représentation, modification,
            publication, adaptation de tout ou partie des éléments du site, quel
            que soit le moyen ou le procédé utilisé, est interdite sans
            l&apos;autorisation écrite préalable de Senthales.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">
            Données personnelles
          </h2>
          <p>
            Les informations recueillies sur ce site sont enregistrées dans un
            fichier informatisé par Senthales pour la gestion de sa clientèle.
            Elles sont conservées pendant 3 ans et sont destinées au service
            marketing et commercial. Conformément à la loi sénégalaise sur la
            protection des données personnelles, vous pouvez exercer votre droit
            d'accès aux données vous concernant et les faire rectifier en
            contactant :{" "}
            <a
              href="mailto:info.senthales@gmail.com"
              className="text-[#142A4E] underline"
            >
              info.senthales@gmail.com
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">Cookies</h2>
          <p>
            Le site peut être amené à vous demander l&apos;acceptation des
            cookies pour des besoins de statistiques et d&apos;affichage. Un
            cookie est une information déposée sur votre disque dur par le
            serveur du site que vous visitez.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">
            Responsabilité
          </h2>
          <p>
            Senthales s&apos;efforce de fournir sur le site des informations
            aussi précises que possible. Toutefois, il ne pourra être tenu
            responsable des omissions, des inexactitudes et des carences dans la
            mise à jour, qu&apos;elles soient de son fait ou du fait des tiers
            partenaires qui lui fournissent ces informations.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#FFCD00] mb-1">
            Droit applicable
          </h2>
          <p>
            Le présent site est soumis au droit sénégalais. En cas de litige,
            les tribunaux sénégalais seront seuls compétents.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegalesPage;
