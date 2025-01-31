"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { getCookies } from "@/helper/getCookies";
import { redirect, useRouter } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import Select from "react-select";
import { customStyles } from "@/lib/StyleSelect/StyleSelect";

type EditarAcessoProps = {
  idUser: number | null;
};

export default function EditarAcesso(props: EditarAcessoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [slugs, setSlugs] = useState<any>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { usuario } = useApplication();
  const router = useRouter();

  const {idUser} = props;


  const routesPrefixOptions = [
    { label: "/verzo", value: "/verzo" },
    { label: "/depara", value: "/depara" },
    { label: "/rotas", value: "/routes" },
    { label: "/conexoes", value: "/connections" },
    { label: "/agrupamentos", value: "/systems" },
    { label: "/usuarios", value: "/users" },
    { label: "/acessos", value: "/access" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api().put(`/access/edit/${idUser}`, data);

      alert({
        intent: "success",
        title: "Acesso editado!",
        text: "Acesso editado com sucesso",
        withClose: false,
      });

      setIsLoading(false);
      router.push("/configuracoes/acessos");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar acesso",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

    const handleGetAccess= () => {
      api()
        .get(`/access/${idUser}`)
        .then((res) => {
      
          const user = res.data.access;
          setValue("name", user.name);
          setValue("route_slugs", user.route_slugs);
          setValue("route_prefixes", user.route_prefixes);
        })
        .catch(() => console.log("Não foi possivel buscar os acessos"));
    };

  const handleGetSlugs = () => {
    api()
      .get(`/routes/list`)
      .then((res) => {
        const formattedArray = res.data.routes.map((item: any) => ({
          label: item.slug,
          value: item.slug,
        }));
        setSlugs(formattedArray);
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

    handleGetSlugs();
  }, [usuario]);

  useEffect(() => {
    setIsMounted(true);
    handleGetAccess()
  }, []);

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth">
      <h1 className="text-2xl text-[#3e4676]">Editar grupo de acesso</h1>
      {isMounted && (
        <form
          className="bg-white w-full border p-6 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>Informações</h2>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-[#3e4676] text-sm font-medium">Nome</label>
              <input
                type="text"
                className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  O nome é obrigatório
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-[#3e4676] text-sm font-medium">
                Slugs
              </label>
              {slugs && (
                <Controller
                  name="route_slugs"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={slugs}
                      isClearable
                      isMulti
                      styles={customStyles}
                      placeholder="Selecione as conexões"
                      className="w-full"
                      onChange={(selectedOptions: any) => {
                        const values = selectedOptions
                          ? selectedOptions.map((option: any) => option.value)
                          : [];
                        field.onChange(values);
                      }}
                      value={slugs.filter((option: any) =>
                        (field.value || []).includes(option.value)
                      )}
                    />
                  )}
                />
              )}

              {errors.route_slugs?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  As slugs são obrigatórias
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-[#3e4676] text-sm font-medium">
                Prefixos
              </label>

              <Controller
                name="route_prefixes"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={routesPrefixOptions}
                    isClearable
                    isMulti
                    styles={customStyles}
                    placeholder="Selecione as conexões"
                    className="w-full"
                    onChange={(selectedOptions: any) => {
                      const values = selectedOptions
                        ? selectedOptions.map((option: any) => option.value)
                        : [];
                      field.onChange(values);
                    }}
                    value={routesPrefixOptions.filter((option: any) =>
                      (field.value || []).includes(option.value)
                    )}
                  />
                )}
              />

              {errors.route_prefixes?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  Os prefixos são obrigatórios
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
      )}
    </div>
  );
}
