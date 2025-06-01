"use client";

import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categories } from "@/lib/data";
import Link from "next/link";

const Sidebar = ({
  isShowDownSidebar = true,
  category = "",
  isTitle = "Rayons",
}: {
  isShowDownSidebar?: boolean;
  category?: string;
  isTitle?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Ouvrir l'accordion si la catégorie correspond
  useEffect(() => {
    if (category) {
      setIsOpen(true);
    }
  }, [category]);

  const handleAccordionChange = (value: string | null) => {
    if (value) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const filteredCategories = categories.filter((c) => c.slug === category || category === "");

  // console.log(filteredCategories);

  return (
    <div className="flex flex-col items-start gap-2  w-72">
      <div className="w-full bg-[#FAFAFA] p-2 border border-gray-200 rounded-[10px]">
        <span className="font-semibold">{isTitle}</span>
      </div>
      {isShowDownSidebar && (
        <div className="w-full border rounded-[10px] border-gray-300 p-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={handleAccordionChange}
            defaultValue={category ? `item-${filteredCategories.findIndex(c => c.slug === category) + 1}` : undefined}
          >
            {filteredCategories.map((c, index) => (
              <AccordionItem
                key={c.id}
                value={`item-${index + 1}`}
                className="w-full"
              >
                <AccordionTrigger
                  isOpen={isOpen}
                  isLink={c.isLink}
                  className="cursor-pointer hover:no-underline"
                >
                  <Link href={`/${c.slug}`}>{c.title}</Link>
                </AccordionTrigger>
                {c.subcat?.map((s) => (
                  <AccordionContent
                    key={`${s.id}-${index}`}
                    className="ml-4 cursor-pointer"
                  >
                    <Link
                      href={`/${c.slug}/${s.slug}`}
                      className="transition-colors duration-300 hover:text-[#142A4E] hover:font-medium"
                    >
                      {s.title}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
