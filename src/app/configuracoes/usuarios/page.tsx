"use client";

import { api } from "@/lib/axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { PiUserCircleCheckBold, PiUserCircleMinusBold } from "react-icons/pi";
import { alert } from "@/hooks/use-alert";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useApplication } from "@/providers/application-provider";
import { redirect } from "next/navigation";
import { getCookies } from "@/helper/getCookies";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Pagination from "@/components/Pagination/Pagination";

export default function Usuarios() {
  const [users, setUsers] = useState<any>([]);
  const { usuario } = useApplication();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);



  const handleActivateUser = (id: string) => {
    api()
      .put(`/users/restore/${id}`)
      .then(() => {
        alert({
          intent: "success",
          title: "Usuário ativo!",
          text: "Usuário ativado com sucesso",
          withClose: true,
        });
        handleGetUsers();
      });
  };

  const handleDeactivateUser = (id: string) => {
    api()
      .delete(`/users/delete/${id}`)
      .then((res) => {
        console.log(res);
        alert({
          intent: "success",
          title: "Usuário desativado!",
          text: "Usuário desativado com sucesso",
          withClose: true,
        });
        handleGetUsers();
      });
  };

  const handleGetUsers = () => {
    api()
      .get(`users/list?page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
      })
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }
  
    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }
  } , [])

  useEffect(() => {
    handleGetUsers();
  }, [page, limit]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <Suspense>
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Usuários</h1>
          <Link
            href="/configuracoes/usuarios/cadastrar"
            className="bg-indigo-600 py-2 px-4 rounded-md text-white"
          >
            Adicionar usuário
          </Link>
        </div>
        {users.length > 0 ? (
          <>
            <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 text-start pl-4"></th>
                    <th className="py-2 text-start">Username</th>
                    <th className="py-2 text-start">Perfil</th>
                    <th className="py-2 text-start">Rotas</th>
                    <th className="py-2 text-end pr-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {users.map((user: any) => {
                    return (
                      <tr className="border-b" key={user.id}>
                        <td className="py-2 text-start pl-4">
                          {user.is_active ? (
                            <div className="size-4 rounded-full bg-green-500 border-green-200 border-2"></div>
                          ) : (
                            <div className="size-4 rounded-full bg-red-500 border-red-200 border-2"></div>
                          )}
                        </td>
                        <td className="py-2 text-start">{user.username}</td>
                        <td className="py-2 text-start">
                          {user.is_admin ? "Administrador" : "Usuário"}
                        </td>
                        <td className="py-2 text-start">
                          {user.is_admin && "Todas"}
                          {!user.is_admin &&
                            user.routes.length === 0 &&
                            "Nenhuma rota liberada"}
                          {!user.is_admin &&
                            user.routes.length > 0 &&
                            user.routes.join(" - ")}
                        </td>
                        <td className="py-2 text-end pr-4 flex justify-end items-center gap-4">
                          <Link href={`/configuracoes/usuarios/${user.id}`}>
                            <Tooltip
                              side="top"
                              text="Editar usuário"
                              trigger={
                                <MdModeEdit
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                />
                              }
                            />
                          </Link>
                          {user.is_active ? (
                            <Tooltip
                              side="top"
                              text="Desativar usuário"
                              trigger={
                                <PiUserCircleMinusBold
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => handleDeactivateUser(user.id)}
                                />
                              }
                            />
                          ) : (
                            <Tooltip
                              side="top"
                              text="Ativar usuário"
                              trigger={
                                <PiUserCircleCheckBold
                                  size={22}
                                  className="cursor-pointer hover:opacity-50"
                                  onClick={() => handleActivateUser(user.id)}
                                />
                              }
                            />
                          )}
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
      </Suspense>
    </div>
  );
}
