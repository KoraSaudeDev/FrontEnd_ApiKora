"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "../Accordion/Accordion";
import { useApplication } from "@/providers/application-provider";
import { useEffect, useState } from "react";

type SidebarProps = {
  openSidebar: boolean;
};

export default function SidebarConfiguracoes(props: SidebarProps) {
  const { openSidebar } = props;
  const pathname = usePathname();
  const { usuario } = useApplication();

  const [userItems, setUserItems] = useState<any>([]);
  const [slugsItems, setSlugsItems] = useState<any>([]);

  const activeSlug =
    pathname.includes("/slugs") || pathname.includes("/agrupamentos")
      ? "Slugs"
      : "";

  const activeUser =
    pathname.includes("/usuarios") || pathname.includes("/acessos")
      ? "Usuários"
      : "";

  const containsWordInPathname = (word: string): boolean => {
    return pathname.includes(word);
  };

  useEffect(() => {
    setUserItems([
      {
        item: "Usuários",
        children: [
          {
            label: "Usuário",
            path: "/configuracoes/usuarios",
            isShow:
              usuario?.is_admin || usuario?.routes.prefixes.includes("/users"),
          },
          {
            label: "Grupos de acesso",
            path: "/configuracoes/acessos",
            isShow:
              usuario?.is_admin || usuario?.routes.prefixes.includes("/access"),
          },
        ],
      },
    ]);
    setSlugsItems([
      {
        item: "Slugs",
        children: [
          {
            label: "Slug",
            path: "/configuracoes/slugs",
            isShow:
              usuario?.is_admin || usuario?.routes.prefixes.includes("/routes"),
          },
          {
            label: "Agrupamentos",
            path: "/configuracoes/agrupamentos",
            isShow:
              usuario?.is_admin ||
              usuario?.routes.prefixes.includes("/systems"),
          },
        ],
      },
    ]);
  }, [usuario]);
  return (
    <div
      className={`${
        openSidebar ? "w-[250px]" : "w-0 left-[-10000px]"
      }  h-screen bg-white top-0 text-white transition-all shadow-[rgba(0,_0,_0,_0.1)_4px_0_8px] pt-10 relative`}
    >
      <div
        className={`bg-[#284557] w-[230px] flex-col h-16 flex justify-center items-center absolute top-0 ${
          !openSidebar && "left-[-10000px] transition-all"
        }`}
      >
        <Image src="/images/logokora.webp" alt="" width={132} height={30} />
      </div>

      <div className="flex flex-col gap-3 items-center mt-10 mb-5 w-[230px]">
        <div className="bg-green-500 text-white size-12 rounded-full flex justify-center items-center font-medium">
          K
        </div>
        <p className="text-gray-800">Configurações</p>
      </div>
      <div className="flex flex-col p-3 font-medium text-sm gap-2 ">
        <Accordion items={userItems} defaultValue={activeUser} />

        {(usuario?.is_admin ||
          usuario?.routes.prefixes.includes("/connections")) && (
            <Link
              href="/configuracoes/conexoes"
              className="text-[#284557] data-[active=true]:text-blue-600 pl-3  h-[28px]"
              data-active={containsWordInPathname("conexoes")}
            >
              Conexões
            </Link>
          )}

        <Accordion items={slugsItems} defaultValue={activeSlug} />
      </div>
    </div>
  );
}
