"use client";

import { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { redirect, useParams, useRouter } from "next/navigation";
import React from "react";
import { useApplication } from "@/providers/application-provider";
import { getCookies } from "@/helper/getCookies";
import { customStyles } from "@/lib/StyleSelect/StyleSelect";

export default function CadastrarUsuario() {
  const params = useParams<{ id: string }>();
  const idUser = params.id;

  const { usuario } = useApplication();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [access, setAccess] = useState<any>([]);
  const optionsProfile = [
    { value: "administrador", label: "Administrador" },
    { value: "usuario", label: "Usuário" },
  ];
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      profile: "",
      access_ids: [] as any,
    },
  });

  const values = watch(["password", "profile"]);
  const isUserProfile = values[1] === "usuario";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const user = {
        username: data.username,
        password: data.password,
        is_admin: data.profile === "administrador",
      };

     const responseUser = await api().put(`users/edit/${idUser}`, user);

     if(data.profile === "usuario") {
      const userAccess = {
        user_id: responseUser.data.user_id,
        access_ids: data.access_ids,
      };

      await api().put("/access/user/edit", userAccess);
     }


      alert({
        intent: "success",
        title: "Usuário editado!",
        text: "Usuário editado com sucesso",
        withClose: false,
      });
      setIsLoading(false);
      router.push("/configuracoes/usuarios");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao editar usuário",
        withClose: true,
      });
      setIsLoading(false);
    }
  };


  const handleGetRoutes = () => {
    api()
      .get("/access/list")
      .then((res) => {
        const formattedArray = res.data.accesses.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setAccess(formattedArray);
      })
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  const handleGetUser = () => {
    api()
      .get(`users/profile/${idUser}`)
      .then((res) => {
        const user = res.data.user;
        setValue("username", user.username);
        setValue("profile", user.is_admin ? "administrador" : "usuario");

        const transformedIds = user.accesses.map(
          (item: { access_id: string }) => item.access_id
        );
        console.log(user.accesses, "user");
        setValue("access_ids", transformedIds);
      })
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetRoutes();
    handleGetUser();
  }, []);

  useEffect(() => {
    // if (!getCookies("user")) {
    //   redirect("/login");
    // }
    // if (usuario && !usuario?.is_admin && !usuario?.routes.prefixes.includes("/users")) {
    //   redirect("/404");
    // }
  }, [usuario]);

  return (
    <div className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Editar usuário</h1>

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
                className="border w-full border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                {...register("password")}
              />
              <div
                className="absolute top-2.5 right-4 cursor-pointer hover:opacity-75 transition-all"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Confirmar senha
            </label>
            <div className=" relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border w-full border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                {...register("confirmPassword", {
                  validate: (value) => {
                    if (values[0]) {
                      return value === values[0];
                    }
                    return true;
                  },
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
                  Acessos
                </label>

                <Controller
                  name="access_ids"
                  // rules={{ required: isUserProfile && true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={access}
                      isClearable
                      isMulti
                      styles={customStyles}
                      placeholder="Selecione os acessos"
                      className="w-full"
                      onChange={(selectedOptions: any) => {
                        const values = selectedOptions
                          ? selectedOptions.map((option: any) => option.value)
                          : [];
                        field.onChange(values);
                      }}
                      value={access.filter((option: any) =>
                        (field.value || []).includes(option.value)
                      )}
                    />
                  )}
                />
                {errors.access_ids?.type === "required" && (
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
