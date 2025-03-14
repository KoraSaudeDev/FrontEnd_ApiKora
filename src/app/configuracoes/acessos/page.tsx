"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { getCookies } from "@/helper/getCookies";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Pagination from "@/components/Pagination/Pagination";
import { changeNameRoutes } from "@/lib/ChangeNameRoutes/ChangeNameRoutes";
import { Modal } from "@/components/Modal/Modal";
import CadastrarAcesso from "./cadastrar/cadastro";
import EditarAcesso from "./editar/editarAcesso";

export default function Acessos() {
  const [access, setAccess] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total] = useState(0);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [activeUser, setActiveUser] = useState<number | null>(null);

  const handleGetUsers = () => {
    api()
      .get(`access/list?page=${page}&limit=${limit}`)
      .then((res) => {
        setAccess(res.data.accesses);
        // setTotal(res.data.total)
      })
      .catch(() => console.log("Não foi possivel buscar as rotas"));
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (
      usuario &&
      !usuario?.is_admin &&
      !usuario?.routes.prefixes.includes("/access")
    ) {
      redirect("/404");
    }
  }, [usuario]);

  useEffect(() => {
    handleGetUsers();
  }, [page, limit]);

  return (
    <>
      <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-[#3e4676]">Acessos</h1>
          <button
            onClick={() => setModalCadastro(true)}
            className="bg-indigo-600 py-2 px-4 rounded-md text-white"
          >
            Adicionar acesso
          </button>
        </div>

        {access.length > 0 ? (
          <>
            <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 text-start pl-4">Nome</th>
                    <th className="py-2 text-start">Slug</th>
                    <th className="py-2 text-start">Prefixos</th>
                    <th className="py-2 text-start">Rotas</th>
                    <th className="py-2 text-end pr-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {access.map((route: any) => {
                    return (
                      <tr className="border-b" key={route.id}>
                        <td className="py-2 text-start pl-4">{route.name}</td>
                        <td className="py-2 text-start">{route.slug}</td>
                        <td className="py-2 text-start">
                          {changeNameRoutes(route.route_prefixes).join(" - ")}
                        </td>
                        <td className="py-2 text-start">
                          {route.route_slugs.join(" - ")}
                        </td>

                        <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                          <button>
                            <Tooltip
                              side="top"
                              text="Editar acesso"
                              trigger={
                                <MdModeEdit
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => {
                                    setActiveUser(route.id);
                                    setModalEditar(true);
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
      {/* Modal cadastro */}
      <Modal isOpen={modalCadastro} onClose={() => setModalCadastro(false)}>
        <CadastrarAcesso />
      </Modal>

      {/* Modal editar */}
      <Modal isOpen={modalEditar} onClose={() => setModalEditar(false)}>
        <EditarAcesso idUser={activeUser} />
      </Modal>
    </>
  );
}
