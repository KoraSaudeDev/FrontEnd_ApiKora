"use client";

import { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { useApplication } from "@/providers/application-provider";
import { redirect } from "next/navigation";
import { getCookies } from "@/helper/getCookies";

export default function CadastrarUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [routes, setRoutes] = useState<any>([]);
  const optionsProfile = [
    { value: "administrador", label: "Administrador" },
    { value: "usuario", label: "Usuário" },
  ];

  const {  usuario } = useApplication();

  if (usuario && usuario?.is_admin === false) {
    redirect("/404");
  }

  if (!getCookies("user")) {
    redirect("/login");
  } 
  
  const {
    register,
    handleSubmit,
    control,
    // setValue,
    // reset,
    watch,
    formState: { errors },
  } = useForm();

  const values = watch(["password", "profile"]);
  const isUserProfile = values[1] === "usuario";

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
    try {
      const user = {
        username: data.username,
        password: data.password,
        is_admin: data.profile === "administrador",
      };

      // Realizando a criação do usuário
      const createUserResponse = await api().post("users/create", user);
      const userId = createUserResponse.data.user_id;

      if (data.profile === "usuario" && userId) {
        await api().post("/users/routes/assign", {
          user_id: userId,
          route_ids: data.routes,
        });
      }

      alert({
        intent: "success",
        title: "Usuário criado!",
        text: "Usuário criado com sucesso",
        withClose: false
      });

      setTimeout(() => (
        window.location.reload()
      ), 1000)
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar usuário",
        withClose: true
      });
    }
  };

  const handleGetRoutes = () => {
    api()
      .get("routes/list")
      .then((res) => {
        const formattedArray = res.data.routes.map((item: any) => ({
          label: item.route_prefix,
          value: item.id,
        }));
        setRoutes(formattedArray);
      })
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetRoutes();
  }, []);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Cadastrar usuário</h1>

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
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O nome é obrigatório</p>
            )}
          </div>
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
        {isMounted && (
          <div className="flex gap-4 mt-4 w-[66.3%]">
            <div className="w-full flex flex-col gap-1">
              <label className="text-[#3e4676] text-sm font-medium">
                Perfil
              </label>
              <Controller
                name="profile"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsProfile}
                    isClearable
                    styles={customStyles}
                    placeholder="Selecione o perfil"
                    className={`${
                      isUserProfile ? "w-full" : "w-[calc(50%-8px)]"
                    }`}
                    value={optionsProfile.find(
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
              {errors.profile?.type === "required" && (
                <p className="text-xs text-red-600 mt-1">
                  O perfil é obrigatório
                </p>
              )}
            </div>

            {isUserProfile && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Rotas
                </label>

                <Controller
                  name="routes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={routes}
                      isClearable
                      isMulti
                      styles={customStyles}
                      placeholder="Selecione as rotas"
                      className="w-full"
                      onChange={(selectedOptions: any) => {
                        const values = selectedOptions
                          ? selectedOptions.map((option: any) => option.value)
                          : [];
                        field.onChange(values);
                      }}
                      value={routes.filter((option: any) =>
                        (field.value || []).includes(option.value)
                      )}
                    />
                  )}
                />
                {errors.routes?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    As rotas são obrigatórias
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
                className="h-5"
              />
            )}
            {!isLoading && "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
