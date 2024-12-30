"use client";

import { api } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookies } from "@/helper/getCookies";
import { redirect, useParams } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Pagination from "@/components/Pagination/Pagination";

export default function Queries() {
  const params = useParams<{ id: string }>();
  const idSystem = params.id;

  const [queries, setQueries] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleGetQueries = () => {
    api()
      .get(`executors/list/${idSystem}?page=${page}&limit=${limit}`)
      .then((res) => {
        setQueries(res.data.executors);
        setTotal(res.data.total);
      })
      .catch(() => console.log("Não foi possivel buscar as rotas"));
  };

  function generateConnectionString(connections: string[]) {
    const limitedConnections = connections.slice(0, 10);

    const connectionsString = limitedConnections
      .map((connection) => connection)
      .join(" - ");

    if (connections.length > 10) {
      const restante = connections.length - 10;
      return `${connectionsString} - mais ${restante}`;
    }

    return connectionsString;
  }

  function formatarData(dataString: string) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
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
    handleGetQueries();
  }, [page, limit]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Queries</h1>
        <Link
          href={`/configuracoes/sistemas/${idSystem}/queries/cadastrar`}
          className="bg-indigo-600 py-2 px-4 rounded-md text-white"
        >
          Adicionar query
        </Link>
      </div>

      {queries.length > 0 ? (
        <>
          <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 text-start pl-4">Executor</th>
                  <th className="py-2 text-start">Nome do sistema</th>
                  <th className="py-2 text-start">Caminho do arquivo</th>
                  <th className="py-2 text-start">Conexões</th>
                  <th className="py-2 text-start">Executado em</th>
                  <th className="py-2 text-start">Criado em</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {queries.map((query: any) => {
                  return (
                    <tr className="border-b" key={query.executor_id}>
                      <td className="py-2 text-start pl-4">
                        {query.executor_name}
                      </td>
                      <td className="py-2 text-start">{query.system_name}</td>
                      <td className="py-2 text-start">{query.file_path}</td>
                      <td className="py-2 text-start">
                        {generateConnectionString(query.connections)}
                      </td>
                      <td className="py-2 text-start">
                        {query.executed_at !== "Nunca executado"
                          ? formatarData(query.executed_at)
                          : query.executed_at}
                      </td>
                      <td className="py-2 text-start">
                        {formatarData(query.created_at)}
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
