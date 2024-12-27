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
import { FaRegTrashAlt } from "react-icons/fa";
import { alert } from "@/hooks/use-alert";

export default function Conexoes() {
  const [connections, setConnections] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  function formatarData(dataString: string) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); 
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  const handleGetConnections = () => {
    api()
      .get(`/connections/list?page=${page}&limit=${limit}`)
      .then((res) => {
        setConnections(res.data.connections);
        setTotal(res.data.total)
      })
      .catch(() => console.log("Não foi possivel buscar as conexões"));
  };

  const handleDeleteConnection = (id: string) => {
    api()
      .delete(`/connections/delete/${id}`)
      .then(() => {
        alert({
          intent: "success",
          title: "Conexão excluída!",
          text: "Conexão excluída com sucesso",
          withClose: true,
          withConfirm: false,
        });
        handleGetConnections();
      });
  };

  const handleDeleteConnectionAlert = (id: string) => {
    alert({
      intent: "confirm",
      title: "Excluir conexão",
      text: "Você tem certeza que deseja excluir a conexão?",
      withClose: true,
      withConfirm: true,
      confirm: () => handleDeleteConnection(id),
    });
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }
  }, []);

  useEffect(() => {
    handleGetConnections();
  }, [page, limit]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Conexões</h1>
        <Link
          href="/configuracoes/conexoes/cadastrar"
          className="bg-indigo-600 py-2 px-4 rounded-md text-white"
        >
          Adicionar conexão
        </Link>
      </div>

      {connections.length > 0 ? (
        <>
          <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="py-2 text-start pl-4">Nome</th>
                  <th className="py-2 text-start">UserName</th>
                  <th className="py-2 text-start">Porta</th>
                  <th className="py-2 text-start">Host</th>
                  <th className="py-2 text-start">Nome do serviço</th>
                  <th className="py-2 text-start">Tipo de banco</th>
                  <th className="py-2 text-start">Criado em</th>
                  <th className="py-2 text-end pr-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {connections.map((connection: any) => {
                  return (
                    <tr className="border-b text-sm" key={connection.id}>
                      <td className="py-2 text-start pl-4">{connection.name}</td>
                      <td className="py-2 text-start">{connection.username}</td>
                      <td className="py-2 text-start">{connection.port}</td>
                      <td className="py-2 text-start">{connection.host}</td>
                      <td className="py-2 text-start">{connection.service_name}</td>
                      <td className="py-2 text-start">{connection.db_type}</td>
                      <td className="py-2 text-start">
                        {formatarData(connection.created_at)}
                      </td>
                      <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                        <Tooltip
                          side="top"
                          text="Excluir conexão"
                          trigger={
                            <FaRegTrashAlt
                              size={18}
                              className="cursor-pointer transition hover:text-red-500"
                              onClick={() =>
                                handleDeleteConnectionAlert(connection.id)
                              }
                            />
                          }
                        />
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
