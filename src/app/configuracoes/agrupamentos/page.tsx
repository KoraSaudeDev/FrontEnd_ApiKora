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
import { Modal } from "@/components/Modal/Modal";
import CadastrarAgrupamento from "./cadastrar/cadastro";
import EditarAgrupamento from "./editar/editarAgrupamento";

export default function Agrupamentos() {
  const [groups, setGroups] = useState<any>([]);

  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [activeUser, setActiveUser] = useState<number | null>(null);

  const handleGetUsers = () => {
    api()
      .get(`/systems/list?page=${page}&limit=${limit}`)
      .then((res) => {
        console.log(res);
        setGroups(res.data.systems);
        setTotal(res.data.total);
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
      !usuario?.routes.prefixes.includes("/systems")
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
          <h1 className="text-2xl text-[#3e4676]">Agrupamento</h1>
          <button
            onClick={() => setModalCadastro(true)}
            className="bg-indigo-600 py-2 px-4 rounded-md text-white"
          >
            Adicionar agrupamento
          </button>
        </div>

        {groups.length > 0 ? (
          <>
            <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 text-start pl-4">Nome</th>
                    <th className="py-2 text-start">Descrição</th>
                    <th className="py-2 text-end pr-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {groups.map((group: any) => {
                    return (
                      <tr className="border-b" key={group.id}>
                        <td className="py-2 text-start pl-4">{group.name}</td>
                        <td className="py-2 text-start">{group.description}</td>
                        <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                          <div>
                            <Tooltip
                              side="top"
                              text="Editar agrupamento"
                              trigger={
                                <MdModeEdit
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => {
                                    setActiveUser(group.id);
                                    setModalEditar(true);
                                  }}
                                />
                              }
                            />
                          </div>
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
        <CadastrarAgrupamento />
      </Modal>
      {/* Modal editar */}
      <Modal isOpen={modalEditar} onClose={() => setModalEditar(false)}>
        <EditarAgrupamento idGroup={activeUser} />
      </Modal>
      EditarAgrupamento
    </>
  );
}
