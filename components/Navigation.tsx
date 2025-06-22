"use client";

import * as React from "react";
import Link from "next/link";

import { cn, ProductR } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { IoMdHome } from "react-icons/io";
import SelectionSemaineMenu from "./SelectionSemaineMenu";

export function Navigation() {
  const [products, setProducts] = React.useState<ProductR[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsLoading(true);
      fetch("/api/selection-semaine", {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24 * 7, // 1 hour
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <NavigationMenu className="font-montserrat">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="focus:bg-transparent active:bg-transparent focus-visible:bg-transparent focus:outline-none hover:bg-transparent"
          >
            <Link href="/" passHref>
              <span className="bg-[#FFCD00] px-4 py-2 rounded-[10px]">
                <IoMdHome size={26} className="text-black" />
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white text-sm uppercase font-semibold">
            Notre compagnie
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col items-start justify-center gap-1 p-2 w-full lg:w-[300px]">
              <NavigationMenuLink
                asChild
                className="hover:text-[#142A4E] hover:bg-none"
              >
                <Link className="" href="/livraison">
                  <span className="mb-2 mt-4 text-base">Livraison</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                asChild
                className="hover:text-[#142A4E] hover:bg-none"
              >
                <Link className="" href="/mentions-legales">
                  <span className="mb-2 mt-4 text-base">Mentions légales</span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                asChild
                className="hover:text-[#142A4E] hover:bg-none"
              >
                <Link className="" href="/conditions-utilisation">
                  <span className="mb-2 mt-4 text-base">
                    Conditions d&apos;utilisation
                  </span>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink
                asChild
                className="hover:text-[#142A4E] hover:bg-none"
              >
                <Link className="" href="/a-propos">
                  <span className="mb-2 mt-4 text-base">A propos</span>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white text-sm uppercase font-semibold">
            Selection de la semaine
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-full gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[600px] ">
              <SelectionSemaineMenu products={products} isLoading={isLoading} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
