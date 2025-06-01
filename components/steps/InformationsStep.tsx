"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InformationsStep = () => {
  const { data: session } = useSession();

  // console.log(session);

  return session ? (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none outline-none">
          <AccordionTrigger isLink={true} className="outline-none border-none">
            <h2 className="text-lg font-semibold mb-4">
              Informations Personnelles
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">
                  Prénom et nom: <span className="font-semibold">{`${session?.user?.lastname} ${session?.user?.firstname}`}</span>
                </label>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">
                  Ville: <span className="font-semibold">{`${session?.user?.state}, ${session?.user?.city}`}</span>
                </label>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">
                  Adresse: <span className="font-semibold">{`${session?.user?.address || "Non renseigné"}`}</span>
                </label>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">
                  Téléphone:{" "}
                  <span className="font-semibold">
                    {`${session?.user?.phone || "Non renseigné"}`}
                  </span>
                </label>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">
                  Code postal:{" "}
                  <span className="font-semibold">
                    {`${session?.user?.zip || "Non renseigné"}`}
                  </span>
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ) : (
    <div>
      <div className="flex items-center gap-4">
        <Link
          href="/connexion"
          className="text-sm text-neutral-600 font-semibold transition-colors duration-200 hover:opacity-80"
        >
          Se connecter
        </Link>
        <span className="text-sm text-neutral-600">/</span>
        <Link
          href="/inscription"
          className="text-sm text-neutral-600 font-semibold transition-colors duration-200 hover:opacity-80"
        >
          S&apos;inscrire
        </Link>
      </div>
    </div>
  );
};

export default InformationsStep;
