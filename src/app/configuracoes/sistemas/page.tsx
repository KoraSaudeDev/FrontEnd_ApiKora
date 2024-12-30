"use client";

import { api } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { getCookies } from "@/helper/getCookies";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Pagination from "@/components/Pagination/Pagination";
import { MdModeEdit } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";

type connectionsType = {
  id: number;
  name: string;
};

export default function Sistemas() {
  const [systems, setSystems] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total] = useState(0);

  const handleGetSystems = () => {
    api()
      .get(`systems/list?page=${page}&limit=${limit}`)
      .then((res) => {
        setSystems(res.data.systems);
        // setTotal(res.data.total)
      })
      .catch(() => console.log("Não foi possivel buscar os sistemas"));
  };

  function generateConnectionString(connections: connectionsType[]) {
    const limitedConnections = connections.slice(0, 10);

    const connectionsString = limitedConnections
      .map((connection) => connection.name)
      .join(" - ");

    if (connections.length > 10) {
      const restante = connections.length - 10;
      return `${connectionsString} - mais ${restante}`;
    }

    return connectionsString;
  }

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }
  }, []);

  useEffect(() => {
    handleGetSystems();
  }, [page, limit]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Sistemas</h1>
        <Link
          href="/configuracoes/sistemas/cadastrar"
          className="bg-indigo-600 py-2 px-4 rounded-md text-white"
        >
          Adicionar sistema
        </Link>
      </div>

      {systems.length > 0 ? (
        <>
          <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 text-start pl-4">Nome</th>
                  <th className="py-2 text-start">Conexões</th>
                  <th className="py-2 text-end pr-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {systems.map((system: any) => {
                  return (
                    <tr className="border-b" key={system.id}>
                      <td className="py-2 text-start pl-4">{system.name}</td>
                      <td className="py-2 text-start">
                        {generateConnectionString(system.connections)}
                      </td>
                      <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                        <Link href={`/configuracoes/sistemas/${system.id}/queries`}>
                          <Tooltip
                            side="top"
                            text="Acessar queries"
                            trigger={
                              <FaDatabase
                                size={22}
                                className="cursor-pointer hover:opacity-50"
                              />
                            }
                          />
                        </Link>
                        <Link href={`/configuracoes/sistemas/${system.id}`}>
                          <Tooltip
                            side="top"
                            text="Editar conexões"
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
          {total > limit && (
            <Pagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <SkeletonTable />
      )}
    </div>
  );
}
