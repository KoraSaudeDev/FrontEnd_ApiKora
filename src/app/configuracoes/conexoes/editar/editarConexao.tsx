"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { customStyles } from "@/lib/StyleSelect/StyleSelect";

type EditarConexaoProps = {
  idConnection: number | null;
};

export default function EditarConexao(props: EditarConexaoProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { usuario } = useApplication();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { idConnection } = props;

  const dbTypeOptions = [
    { label: "Redis", value: "redis" }, // host(s/r), port(i,r), password(s,o)
    { label: "MySQL", value: "mysql" }, // port(i,r), username(s,r), password(s,r), database_name(s,r)
    { label: "MariaDB", value: "mariadb" }, //host(s,r),  port(i,r), username(s,t), password(t,s), database_name(s,r)
    { label: "Oracle", value: "oracle" }, //host(s,r), port(i,r), username(s,r), password(s,r), service_name(s,o), sid(s,o)
    { label: "Postgres", value: "postgres" }, //host(s,r), port(i,r),username(s,r), password(s,t),  database_name(s,r)
    { label: "SQLite", value: "sqlite" }, // database_name(s,r)
    { label: "SAP", value: "sap" }, //extra_params(json, r), username(s,r),password(s,r)
    { label: "SAP HANA", value: "sap_hana" }, //host(s,r), port(i,r), username(s,r),password(s,r),database_name(s,r)
    { label: "MSSQL", value: "mssql" }, //host(s,r), port(i,r), username(s,r), password(s,r),database_name(s,r)
    { label: "IBM DB2", value: "ibm_db2" }, //host(s,r), port(i,r), username(s,r), password(s,r),database_name(s,r)
    { label: "MongoDB", value: "mongodb" }, //host(s,r), port(i,r),username(s,r),password(s,r)
    { label: "Cassandra", value: "cassandra" }, //host(s,r), port(i,r), username(s,r), password(s,r),database_name(s,o)
    { label: "Snowflake", value: "snowflake" }, //account(s,r), username(s,r), password(s,r),database_name(s,r),warehouse(s,r)
    // { label: "Firebase", value: "firebase" }, //service_account_key(json,r)
    { label: "Elasticsearch", value: "elasticsearch" }, //host(s,r), port(i,r), username(s,o),password(s,o)
    { label: "DynamoDB", value: "dynamodb" }, //region_name(s,r), access_key(s,r),secret_key(s,r)
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const values = watch(["password", "db_type", "db_type_oracle"]);
  const isTypeOracle = values[1] === "oracle";

  const optionsWithPassword = [
    "redis",
    "mysql",
    "mariadb",
    "oracle",
    "postgres",
    "sap",
    "sap_hana",
    "mssql",
    "ibm_db2",
    "mongodb",
    "cassandra",
    "snowflake",
    "elasticsearch",
  ];

  const optionsWithHost = [
    "redis",
    "mariadb",
    "oracle",
    "postgres",
    "sap_hana",
    "mssql",
    "ibm_db2",
    "mongodb",
    "cassandra",
    "elasticsearch",
    "sap",
  ];

  const optionsWithPort = [
    "redis",
    "mysql",
    "mariadb",
    "oracle",
    "postgres",
    "sap_hana",
    "mssql",
    "ibm_db2",
    "mongodb",
    "cassandra",
    "elasticsearch",
    "sap",
  ];

  const optionsWithUsername = [
    "mysql",
    "mariadb",
    "oracle",
    "postgres",
    "sap",
    "sap_hana",
    "mssql",
    "ibm_db2",
    "mongodb",
    "cassandra",
    "snowflake",
    "elasticsearch",
  ];

  const optionsWithDatabaseName = [
    "mysql",
    "mariadb",
    "postgres",
    "sqlite",
    "sap_hana",
    "mssql",
    "ibm_db2",
    "cassandra",
    "snowflake",
  ];

  const isPassword = (value: string) => optionsWithPassword.includes(value);
  const isHost = (value: string) => optionsWithHost.includes(value);
  const isPort = (value: string) => optionsWithPort.includes(value);
  const isUsername = (value: string) => optionsWithUsername.includes(value);
  const isDatabaseName = (value: string) =>
    optionsWithDatabaseName.includes(value);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    delete data.db_type_oracle;

    try {
      await api().put(`/connections/edit/${idConnection}`, data);

      alert({
        intent: "success",
        title: "Conexão editada!",
        text: "Conexão editada com sucesso",
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
        text: "Erro ao editar conexao",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  const handleGetConnection = () => {
    api()
      .get(`connections/${idConnection}`)
      .then((res) => {
        const connection = res.data.connection;
        console.log(connection);
        setValue("name", connection.name);
        setValue("db_type", connection.db_type);
        setValue("username", connection.username);
        setValue("port", connection.port);
        setValue("host", connection.host);

        if(connection.db_type === "oracle" && connection.sid) {
          setValue("db_type_oracle", "sid")
          setValue("sid", connection.sid)
        }

        if(connection.db_type === "oracle" && connection.service_name) {
          setValue("db_type_oracle", "service_name")
          setValue("service_name", connection.service_name)
        }

          

        // const transformedDbType = connection.db_type.map(
        //   (item: { db_type: string }) => item.db_type
        // );

        // console.log(transformedDbType)

        // setValue("profile", user.is_admin ? "administrador" : "usuario");
        // console.log(user.accesses, "user");
        // setValue("access_ids", transformedIds);
      })
      .catch(() => console.log("Não foi possivel buscar os usuários"));
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetConnection();
  }, []);

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth">
      <h1 className="text-2xl text-[#3e4676]">Editar conexão</h1>
      {isMounted && (
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
                <p className="text-xs text-red-600 mt-1">
                  O nome é obrigatório
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
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

          </div>

          <div className="flex gap-4 mt-4">
            {isUsername(values[1]) && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O username é obrigatório
                  </p>
                )}
              </div>
            )}
            {isHost(values[1]) && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Host
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("host", { required: true })}
                />
                {errors.host?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O host é obrigatório
                  </p>
                )}
              </div>
            )}

            {isPort(values[1]) && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Porta
                </label>
                <input
                  type="number"
                  className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("port", { required: true, valueAsNumber: true })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    A porta é obrigatória
                  </p>
                )}
              </div>
            )}

            {isDatabaseName(values[1]) && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Nome do banco de dados
                </label>
                <input
                  type="number"
                  className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("database_name", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                {errors.database_name?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O Nome do banco de dados é obrigatória
                  </p>
                )}
              </div>
            )}

            {isPassword(values[1]) && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Senha
                </label>
                <div className=" relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border w-full border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
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
            )}
          </div>

          {values[1] === "snowflake" && (
            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Account
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px]  focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("account", { required: true })}
                />
                {errors.account?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O account é obrigatório
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Warehouse
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("warehouse", { required: true })}
                />
                {errors.warehouse?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O warehouse é obrigatório
                  </p>
                )}
              </div>
            </div>
          )}

          {values[1] === "dynamodb" && (
            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Nome da região
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("region_name", { required: true })}
                />
                {errors.region_name?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O nome da região é obrigatório
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Access Key
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("access_key", { required: true })}
                />
                {errors.access_key?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O Access Key é obrigatório
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Secret Key
                </label>
                <input
                  type="text"
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                  {...register("secret_key", { required: true })}
                />
                {errors.secret_key?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O Secret Key é obrigatório
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 mt-4 w-full">
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
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
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
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
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
