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

type connectionsType = {
  id: number,
  name: string
}

export default function Sistemas() {
  const [systems, setSystems] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total] = useState(0);

  

  const handleGetSystems = () => {
    api()
      .get(`systems/list?page=${page}&limit=${limit}`)
      .then((res) =>{ setSystems(res.data.systems)
        // setTotal(res.data.total)
      })
      .catch(() => console.log("Não foi possivel buscar os sistemas"));
  };

  function gerarStringCidades(connections: connectionsType[]) {
    // Pega no máximo 10 cidades
    const cidadesLimitadas = connections.slice(0, 10);
    
    // Cria a string com os nomes das cidades
    const cidadesString = cidadesLimitadas.map(cidade => cidade.name).join(' - ');
    
    // Se o array original tiver mais de 10 elementos, adicionar o texto "mais X"
    if (connections.length > 10) {
      const restante = connections.length - 10;
      return `${cidadesString} - mais ${restante}`;
    }
    
    return cidadesString;
  }

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }
  
    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }
  }, [])

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
                  <th className="py-2 text-start pl-4">
                    
                    
                    Nome
                  </th>
                  <th className="py-2 text-start">Conexões</th>
                  <th className="py-2 text-end pr-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {systems.map((system: any) => {
                  return (
                    <tr className="border-b" key={system.id}>
                      <td className="py-2 text-start pl-4">
                        {system.name}
                      </td>
                      <td className="py-2 text-start">{gerarStringCidades(system.connections)}</td>
                      <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                      <Link href={`/configuracoes/sistemas/${system.id}`}>
                          <Tooltip
                            side="top"
                            text="Editat conexões"
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
