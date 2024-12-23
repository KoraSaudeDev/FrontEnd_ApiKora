"use client";

import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  openSidebar: boolean;
};

export default function SidebarConfiguracoes(props: SidebarProps) {
  const { openSidebar } = props;

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
        <Link href="/configuracoes/usuarios" className="text-[#284557]">
          Usuários
        </Link>
        <Link href="/configuracoes/rotas" className="text-[#284557]">
          Rotas
        </Link>
      </div>
    </div>
  );
}