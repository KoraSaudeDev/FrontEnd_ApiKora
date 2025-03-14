import Accordion from "../Accordion/Accordion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useApplication } from "@/providers/application-provider";
// import { usePathname } from "next/navigation";

type SidebarProps = {
  openSidebar: boolean;
};

export default function Sidebar(props: SidebarProps) {
  const { openSidebar } = props;
  const { usuario } = useApplication();
  const [items, setItems] = useState<any>([]);
  // const pathname = usePathname();

  const handleAddItens = () => {
    if (usuario) {
      // Verifica se o usuário é admin ou se tem a rota /verzo
      if (usuario.is_admin) {
        return setItems([
          {
            item: "Verzo",
            children: [
              { label: "Sobre", path: "/verzo#sobre", isShow: true },
              { label: "API", path: "/verzo#api", isShow: true },
              {
                label: "Autenticação",
                path: "/verzo#autenticacao",
                isShow: true,
              },
              { label: "MV", path: "/verzo#mv", isShow: true },
              { label: "Tasy", path: "/verzo#tasy", isShow: true },
            ],
          },
          {
            item: "DePara",
            children: [
              { label: "Sobre", path: "/dePara#sobre", isShow: true },
              {
                label: "Autenticação",
                path: "/dePara#autenticacao",
                isShow: true,
              },
              { label: "Uso",   path: "/dePara#uso", isShow: true },
              { label: "Exemplos", path: "/dePara#exemplos", isShow: true },
            ],
          },
          {
            item: "Bluemind",
            children: [
              { label: "Sobre", path: "/bluemind#sobre", isShow: true },
              {
                label: "Autenticação",
                path: "/bluemind#autenticacao",
                isShow: true,
              },
              { label: "Conexões",   path: "/bluemind#conexoes", isShow: true },
              { label: "Uso TASY",   path: "/bluemind#uso-tasy", isShow: true },
              { label: "Uso MV",   path: "/bluemind#uso-mv", isShow: true },
              { label: "Exemplos", path: "/bluemind#exemplos", isShow: true },
            ],
          },
        ]);
      } else if (
        !usuario.is_admin &&
        usuario.routes &&
        usuario.routes.prefixes.includes("/verzo")
      ) {
        return setItems([
          {
            item: "Verzo",
            children: [
              { label: "Sobre", path: "/verzo#sobre", isShow: true },
              { label: "API", path: "/verzo#api", isShow: true },
              {
                label: "Autenticação",
                path: "/verzo#autenticacao",
                isShow: true,
              },
              { label: "MV", path: "/verzo#mv", isShow: true },
              { label: "Tasy", path: "/verzo#tasy", isShow: true },
            ],
          },
        ]);

      } 
      else if (
        !usuario.is_admin &&
        usuario.routes &&
        usuario.routes.prefixes.includes("/bluemind")
      ) {
        return setItems([
          {
            item: "Bluemind",
            children: [
              { label: "Sobre", path: "/bluemind#sobre", isShow: true },
              {
                label: "Autenticação",
                path: "/bluemind#autenticacao",
                isShow: true,
              },
              { label: "Conexões",   path: "/bluemind#conexoes", isShow: true },
              { label: "Uso TASY",   path: "/bluemind#uso-tasy", isShow: true },
              { label: "Uso MV",   path: "/bluemind#uso-mv", isShow: true },
              { label: "Exemplos", path: "/bluemind#exemplos", isShow: true },
            ],
          }
        ]);

      } 
      
      else if (
        !usuario.is_admin &&
        usuario.routes &&
        usuario.routes.prefixes.includes("/depara")
      ) {
        return setItems([
          {
            item: "DePara",
            children: [
              { label: "Sobre", path: "/dePara#sobre", isShow: true },
              {
                label: "Autenticação",
                path: "/dePara#autenticacao",
                isShow: true,
              },
              { label: "Uso",   path: "/dePara#uso", isShow: true },
              { label: "Exemplos", path: "/dePara#exemplos", isShow: true },
            ],
          },
        ]);
      }
    }
  };

  // const containsWordInPathname = (word: string): boolean => {
  //   return pathname.includes(word);
  // };

  useEffect(() => {
    if (items.length === 0) {
      handleAddItens();
    }
  }, [usuario]);

  console.log(usuario);

  return (
    <div
      className={`${
        openSidebar ? "w-[250px]" : "w-0 left-[-10000px]"
      } h-screen bg-white top-0 text-white transition-all shadow-[rgba(0,_0,_0,_0.1)_4px_0_8px] pt-10 relative`}
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
        <p className="text-gray-800">Documentações</p>
      </div>
      <Accordion items={items} defaultValue="" isHash />
      {/* {(usuario?.is_admin || (usuario?.routes?.slugs?.length ?? 0) > 0) && (
        <Link
          href="/slugs"
          className="text-[#284557] data-[active=true]:text-blue-600 pl-3 h-[28px] text-sm font-medium"
          data-active={containsWordInPathname("slugs")}
        >
          Slugs
        </Link>
      )} */}
    </div>
  );
}
