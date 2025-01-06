"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { getCookies } from "@/helper/getCookies";
import { redirect, useParams, useRouter } from "next/navigation";
import { useApplication } from "@/providers/application-provider";

export default function EditarAgrupamento() {
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useApplication();
  const router = useRouter();
  const params = useParams<{ id: string }>()
  const idGroup = params.id

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api().put(`/systems/update/${idGroup}`, data);

      alert({
        intent: "success",
        title: "Agrupamento editado!",
        text: "Agrupamento editado com sucesso",
        withClose: false,
      });

      setIsLoading(false);
      router.push("/configuracoes/agrupamentos");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao editar agrupamento",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  const handleGetGroup = () => {
    api()
      .get(`systems/profile/${idGroup}`)
      .then((res) => {
        const group = res.data.system;
        setValue("name", group.name);
        setValue("description",group.description);

      })
      .catch(() => console.log("Não foi possivel buscar os grupos"));
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }
  
    if (usuario && !usuario?.is_admin && !usuario?.routes.prefixes.includes("/systems")) {
      redirect("/404");
    }

    handleGetGroup()
  }, [usuario]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Editar agrupamento</h1>

      <form
        className="bg-white w-full border p-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Informações</h2>
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">Nome</label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O nome é obrigatório</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Descrição
            </label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">
                A descrição é obrigatória
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button
            className="w-[120px] flex justify-center bg-[#28a745] text-white rounded hover:opacity-75 transition-all border-none py-2 px-7 text-sm font-medium mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed ml-auto"
            disabled={isLoading}
          >
            {isLoading && (
              <Image
                src="/images/loading.svg"
                alt=""
                width={1500}
                height={20}
                className="h-5 w-fit"
              />
            )}
            {!isLoading && "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
