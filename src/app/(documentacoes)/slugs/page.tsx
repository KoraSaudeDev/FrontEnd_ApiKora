"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { getCookies } from "@/helper/getCookies";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Pagination from "@/components/Pagination/Pagination";
import { IoMdPlay } from "react-icons/io";
import { LuView } from "react-icons/lu";
import { Modal } from "@/components/Modal/Modal";
import ExecutarQuery from "./executar/ExecutarQuery";
import VisualizarQuery from "./visualizar/VisualizarQuery";

export default function Slugs() {
  const [slugs, setSlugs] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalExecutar, setModalExecutar] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [activeUser, setActiveUser] = useState<number | null>(null);

  const handleGetSlugs = () => {
    if (usuario?.is_admin) {
      return api()
        .get(`/routes/list?page=${page}&limit=${limit}`)
        .then((res) => {
          setSlugs(res.data.routes);
          setTotal(res.data.total);
        })
        .catch(() => console.log("Não foi possivel buscar as slugs"));
    }

    return setSlugs(usuario?.routes.slugs);
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && !usuario?.is_admin && usuario?.routes.slugs.length === 0) {
      redirect("/404");
    }
  }, [usuario]);

  useEffect(() => {
    handleGetSlugs();
  }, [page, limit, usuario]);

  return (
    <>
      <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
        <div className="">
          <h1 className="text-2xl text-[#3e4676]">Slugs</h1>
        </div>

        {slugs && slugs.length > 0 ? (
          <>
            <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-sm">
                    <th className="py-2 text-start pl-4">Nome</th>
                    <th className="py-2 text-start">Slug</th>
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
                        <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                          <button>
                            <Tooltip
                              side="top"
                              text="Vizualizar query"
                              trigger={
                                <LuView
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => {
                                    setActiveUser(connection.id);
                                    setModalVisualizar(true);
                                  }}
                                />
                              }
                            />
                          </button>
                          <button>
                            <Tooltip
                              side="top"
                              text="Executar query"
                              trigger={
                                <IoMdPlay
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => {
                                    setActiveUser(connection.id);
                                    setModalExecutar(true);
                                  }}
                                />
                              }
                            />
                          </button>
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

      {/* Modal executar */}
      <Modal isOpen={modalExecutar} onClose={() => setModalExecutar(false)}>
        <ExecutarQuery idQuery={activeUser} />
      </Modal>

      {/* Modal visualizar */}
      <Modal isOpen={modalVisualizar} onClose={() => setModalVisualizar(false)}>
        <VisualizarQuery idQuery={activeUser} />
      </Modal>
    </>
  );
}
