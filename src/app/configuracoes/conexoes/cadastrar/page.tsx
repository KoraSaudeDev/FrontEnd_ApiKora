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
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

export default function CadastrarConexao() {
  const [isLoading, setIsLoading] = useState(false);
  const { usuario } = useApplication();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dbTypeOptions = [
    {
      label: "MySQL",
      value: "mysql",
    },
    {
      label: "SAP",
      value: "SAP",
    },
    {
      label: "Oracle",
      value: "oracle",
    },
  ];

  const dbTypeOracleOptions = [
    {
      label: "Service Name",
      value: "service_name",
    },
    {
      label: "SID",
      value: "sid",
    },
  ];

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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const values = watch(["password", "db_type", "db_type_oracle"]);
  const isTypeOracle = values[1] === "oracle";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    delete data.confirmPassword;
    delete data.db_type_oracle;

    try {
      await api().post("/connections/create", data);

      alert({
        intent: "success",
        title: "Conexão criada!",
        text: "Conexão criada com sucesso",
        withClose: false,
      });

      setIsLoading(false);
      router.push("/configuracoes/conexoes");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar conexoes",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }
  }, []);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Cadastrar conexão</h1>

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
              Username
            </label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">
                O username é obrigatório
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">Senha</label>
            <div className=" relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border w-full border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
                {...register("password", { required: true })}
              />
              <div
                className="absolute top-2.5 right-4 cursor-pointer hover:opacity-75 transition-all"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
              {errors.password?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  A senha é obrigatória
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Confirmar senha
            </label>
            <div className=" relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border w-full border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === values[0],
                })}
              />
              <div
                className="absolute top-2.5 right-4 cursor-pointer hover:opacity-75 transition-all"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-xs text-red-600 mt-1">
                  As senhas precisam ser iguais
                </p>
              )}
              {errors.confirmPassword?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  A senha é obrigatória
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Nome do banco de dados
            </label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("database_name")}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">Host</label>
            <input
              type="text"
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("host", { required: true })}
            />
            {errors.host?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O host é obrigatório</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">Porta</label>
            <input
              type="number"
              className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              {...register("port", { required: true, valueAsNumber: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">A porta é obrigatória</p>
            )}
          </div>
        </div>
        {isMounted && (
          <div className="grid grid-cols-3 gap-4 mt-4 w-full">
            <div className="flex flex-col gap-1">
              <label className="text-[#3e4676] text-sm font-medium ">
                Tipo de banco de dados
              </label>
              <Controller
                name="db_type"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={dbTypeOptions}
                    isClearable
                    styles={customStyles}
                    placeholder="Selecione o perfil"
                    //   className={`${isTypeOracle ? "w-[calc(33%-8px)]" : "w-[calc(33%-8px)]"}`}
                    value={dbTypeOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption: any) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                    }}
                  />
                )}
              />
              {errors.db_type?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  O Tipo de banco de dados é obrigatório
                </p>
              )}
            </div>
            {isTypeOracle && (
              <div className="flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Tipo de banco de dados
                </label>
                <Controller
                  name="db_type_oracle"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={dbTypeOracleOptions}
                      isClearable
                      styles={customStyles}
                      placeholder="Selecione o perfil"
                      value={dbTypeOracleOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(selectedOption: any) => {
                        field.onChange(
                          selectedOption ? selectedOption.value : null
                        );
                      }}
                    />
                  )}
                />
                {errors.db_type_oracle?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O Tipo de banco de dados é obrigatório
                  </p>
                )}
              </div>
            )}
            {values[2] && values[2] === "sid" && isTypeOracle && (
              <div className="flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  SID
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("sid", { required: true })}
                />
                {errors.SID?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">O SID obrigatório</p>
                )}
              </div>
            )}

            {values[2] && values[2] === "service_name" && isTypeOracle && (
              <div className="flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("service_name", { required: true })}
                />
                {errors.service_name?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O Service Name obrigatório
                  </p>
                )}
              </div>
            )}
          </div>
        )}

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
