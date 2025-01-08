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
import { IoMdPlay } from "react-icons/io";

export default function Slugs() {
  const [slugs, setSlugs] = useState<any>([]);

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

  const handleGetSlugs = () => {
    api()
      .get(`/routes/list?page=${page}&limit=${limit}`)
      .then((res) => {
        setSlugs(res.data.routes);
        setTotal(res.data.total);
      })
      .catch(() => console.log("Não foi possivel buscar as slugs"));
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }
  
    if (usuario && !usuario?.is_admin && !usuario?.routes.prefixes.includes("/routes")) {
      redirect("/404");
    }
  }, [usuario]);

  useEffect(() => {
    handleGetSlugs();
  }, [page, limit]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Slugs</h1>
        <Link
          href="/configuracoes/slugs/cadastrar"
          className="bg-indigo-600 py-2 px-4 rounded-md text-white"
        >
          Adicionar slug
        </Link>
      </div>

      {slugs.length > 0 ? (
        <>
          <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="py-2 text-start pl-4">Nome</th>
                  <th className="py-2 text-start">Slug</th>
                  <th className="py-2 text-start">Criado em</th>
                  <th className="py-2 text-end pr-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {slugs.map((connection: any) => {
                  return (
                    <tr className="border-b text-sm" key={connection.id}>
                      <td className="py-2 text-start pl-4">
                        {connection.name}
                      </td>
                      <td className="py-2 text-start">{connection.slug}</td>
                      <td className="py-2 text-start">
                        {formatarData(connection.created_at)}
                      </td>
                      <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                        <Link
                          href={`/configuracoes/slugs/${connection.id}/executar`}
                        >
                          <Tooltip
                            side="top"
                            text="Executar query"
                            trigger={
                              <IoMdPlay
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
