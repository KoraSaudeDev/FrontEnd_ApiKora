import { removeCookie } from "@/helper/getCookies";
import { useApplication } from "@/providers/application-provider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoReorderThreeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Tooltip } from "../Tooltip/Tooltip";
import { IoMdPlay } from "react-icons/io";
import { useEffect, useState } from "react";

type HeaderProps = {
  openSidebar: boolean;
  onChangeOpenSidebar: () => void;
};

export default function Header(props: HeaderProps) {
  const { openSidebar, onChangeOpenSidebar } = props;
  const { usuario } = useApplication();
  const [rotaDeConfiguracao, setRotaDeConfiguracao] = useState<string | null>(
    null
  );

  const showSettings =
    usuario?.is_admin ||
    usuario?.routes.prefixes.includes("/routes") ||
    usuario?.routes.prefixes.includes("/connections") ||
    usuario?.routes.prefixes.includes("/systems") ||
    usuario?.routes.prefixes.includes("/users") ||
    usuario?.routes.prefixes.includes("/access");

  const showRoutes =
    usuario?.is_admin ||
    (usuario?.routes &&
      usuario.routes.slugs &&
      usuario.routes.slugs.length > 0);

  const handleLogout = () => {
    removeCookie("user");
    redirect("/login");
  };

  function encontrarRotaDeConfiguracao(rotas: any) {
    if (rotas === undefined) return;
    const rotasDeConfiguracao = [
      "/systems",
      "/users",
      "/routes",
      "/connections",
      "/access",
    ];

    // Verifica se alguma das rotas de configuração está no array fornecido
    for (let i = 0; i < rotas.length; i++) {
      if (rotasDeConfiguracao.includes(rotas[i])) {
        if (rotas[i] === "/systems") {
          return setRotaDeConfiguracao("/agrupamentos");
        }

        if (rotas[i] === "/routes") {
          return setRotaDeConfiguracao("/slugs");
        }

        if (rotas[i] === "/connections") {
          return setRotaDeConfiguracao("/conexoes");
        }

        if (rotas[i] === "/users") {
          return setRotaDeConfiguracao("/usuarios");
        }

        if (rotas[i] === "/access") {
          return setRotaDeConfiguracao("/acessos");
        }
      }
    }

    return null; // Retorna null caso não encontre nenhuma rota de configuração
  }

  useEffect(() => {
    if (usuario?.is_admin) {
      setRotaDeConfiguracao("/usuarios");
    } else {
      encontrarRotaDeConfiguracao(usuario?.routes.prefixes);
    }
  }, [usuario]);

  return (
    <header
      className={`${
        openSidebar ? "w-[calc(100%-230px)]" : "w-full "
      } h-16 bg-[#284557] flex items-center justify-between px-4 ml-auto fixed right-0 z-[700]`}
    >
      <IoReorderThreeOutline
        className="text-white cursor-pointer"
        size={30}
        onClick={onChangeOpenSidebar}
      />

      <div className="flex gap-3">
      <div className="flex items-center gap-4">
        {usuario &&
          !usuario.is_admin &&
          usuario.routes &&
          !usuario.routes.prefixes.includes("/depara") && (
            <>
              {showRoutes && (
                <Tooltip
                  side="bottom"
                  text="Executar rotas"
                  trigger={
                    <Link href="/slugs" className="pr-2">
                      <IoMdPlay className="text-white" size={22} />
                    </Link>
                  }
                />
              )}
            </>
          )}

        {usuario && usuario.is_admin && showSettings && (
          <Tooltip
            side="bottom"
            text="Configurações"
            trigger={
              <Link
                href={`/configuracoes${rotaDeConfiguracao}`}
                className="border-r border-r-white pr-4"
              >
                <IoSettingsOutline className="text-white" size={22} />
              </Link>
            }
          />
        )}
      </div>

      <div
        className="text-white items-center flex gap-2 mr-4 cursor-pointer"
        onClick={handleLogout}
      >
        Sair
        <MdLogout className="text-white" size={22} />
      </div>
      </div>
    </header>
  );
}
