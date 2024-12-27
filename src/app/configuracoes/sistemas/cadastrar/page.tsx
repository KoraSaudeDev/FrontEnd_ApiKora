"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { getCookies } from "@/helper/getCookies";
import { redirect, useRouter } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import Select, { StylesConfig } from "react-select";

export default function CadastrarSistema() {
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useApplication();
  const [connections, setConnections] = useState<any>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 34,
      height: 34,
      borderColor: state.isFocused ? "#007aff" : "#ddd",
      boxShadow: state.isFocused ? "0 0 0 1px #007aff" : "none",
      fontFamily: "Arial, sans-serif",
      fontSize: "1rem",
      "&:hover": {
        borderColor: "#007aff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "Arial, sans-serif",
      fontSize: "1rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#3E4676",
    }),
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {

      await api().post("/systems/create", data);

      alert({
        intent: "success",
        title: "Sistema criado!",
        text: "Sistema criado com sucesso",
        withClose: false,
      });

      setIsLoading(false);
      router.push("/configuracoes/sistemas");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar sistema",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  const handleGetConnections = () => {
    api()
      .get(`/connections/list-simple`)
      .then((res) => {
        console.log(res);
        setConnections(res.data.connections);
      })
      .catch(() => console.log("Não foi possivel buscar as conexões"));
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }

    handleGetConnections();
  }, []);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Cadastrar sistema</h1>

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
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O nome é obrigatório</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Conexões
            </label>
            {connections && (
              <Controller
                name="connection_ids"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={connections}
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
                    value={connections.filter((option: any) =>
                      (field.value || []).includes(option.value)
                    )}
                  />
                )}
              />
            )}

            {errors.connection_ids?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">
                As conexões são obrigatórias
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
