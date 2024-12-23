"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { getCookies } from "@/helper/getCookies";
import { redirect, useRouter } from "next/navigation";
import { useApplication } from "@/providers/application-provider";

export default function CadastrarRota() {
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useApplication();
  const router = useRouter();

  if (!getCookies("user")) {
    redirect("/login");
  }

  if (usuario && usuario?.is_admin === false) {
    redirect("/404");
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const route = {
        description: data.description,
        route_prefix: data.route_prefix,
      };

      await api().post("/routes/create", route);

      alert({
        intent: "success",
        title: "Rota criada!",
        text: "Rota criada com sucesso",
        withClose: false
      });

      setIsLoading(false)
      router.push("/configuracoes/rotas");
      
      setTimeout(() => (
        window.location.reload()
      ), 1000)
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar rota",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Cadastrar rota</h1>

      <form
        className="bg-white w-full border p-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Informações</h2>
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Prefixo
            </label>
            <Controller
              name="route_prefix"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-1 focus-visible:outline-none focus-visible:border-[#007aff]"
                  value={
                    field.value
                      ? field.value.startsWith("/")
                        ? field.value
                        : `/${field.value}`
                      : ""
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (inputValue === "") {
                      field.onChange(inputValue);
                    } else if (!inputValue.startsWith("/")) {
                      field.onChange(`/${inputValue}`);
                    } else {
                      field.onChange(inputValue);
                    }
                  }}
                />
              )}
            />
            {errors.route_prefix?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O prefixo obrigatório</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Descrição
            </label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">
                A descrição é obrigatório
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
