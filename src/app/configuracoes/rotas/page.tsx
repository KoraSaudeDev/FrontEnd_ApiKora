"use client";

import { api } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { getCookies } from "@/helper/getCookies";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";

export default function Usuarios() {
  const [routes, setRoutes] = useState<any>([]);

  const { usuario } = useApplication();

  if (!getCookies("user")) {
    redirect("/login");
  }

  if (usuario && usuario?.is_admin === false) {
    redirect("/404");
  }

  const handleGetUsers = () => {
    api()
      .get("routes/list")
      .then((res) => setRoutes(res.data.routes))
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Rotas</h1>
        <Link
          href="/configuracoes/rotas/cadastrar"
          className="bg-indigo-600 py-2 px-4 rounded-md text-white"
        >
          Adicionar rota
        </Link>
      </div>

      <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 text-start pl-4">Prefix</th>
              <th className="py-2 text-start">Descrição</th>
              <th className="py-2 text-end pr-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {routes.map((route: any) => {
              return (
                <tr className="border-b" key={route.id}>
                  <td className="py-2 text-start pl-4">{route.route_prefix}</td>
                  <td className="py-2 text-start">{route.description}</td>
                  <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                    <Link href={`/configuracoes/rotas/${route.id}`}>
                      <Tooltip
                        side="top"
                        text="Editar rota"
                        trigger={
                          <MdModeEdit
                            size={22}
                            className="cursor-pointer hover:opacity-50"
                          />
                        }
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
