"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { customStyles } from "@/lib/StyleSelect/StyleSelect";

export default function CadastrarSlug() {
  const [isLoading, setIsLoading] = useState(false);
  const [grouping, setGrouping] = useState<any>(null);
  const [connections, setConnections] = useState<any>(null);
  const [parameters, setParameters] = useState<any>([]);
  const [parametersWithResults, setParametersWithResults] = useState<any>([]);
  const [parametersNoResults, setParametersNoResults] = useState<any>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const preProcessed = watch("type_query");

  const parameterType = [
    { label: "Inteiro", value: "integer" },
    { label: "String", value: "string" },
    { label: "Boleano", value: "boolean" },
    { label: "Data e hora", value: "datetime-local" },
  ];
  const parameterTypeBoolean = [
    { label: "Verdadeiro", value: true },
    { label: "Falso", value: false },
  ];

  const queryType = [
    { label: "Pré-processada", value: "pre-processada" },
    { label: "Pós-processada", value: "pos-processada" },
  ];

  const onSubmit = async (dataValues: any) => {
    setIsLoading(true);
    let data;
    delete dataValues.type_query;
    try {
      if (preProcessed === "pre-processada") {
        const combinedParameters = [
          ...parameters,
          ...parametersWithResults,
          ...parametersNoResults
        ];
        data = {
          ...dataValues,
          parameters: combinedParameters,
          is_pre_processed: true,
          is_post_processed: false,
        };
      } else {
        data = {
          ...dataValues,
          parameters,
          is_pre_processed: true,
          is_post_processed: false,
        };
      }

      await api().post("/routes/create", data);

      alert({
        intent: "success",
        title: "Query criada!",
        text: "Query criada com sucesso",
        withClose: false,
      });

      setIsLoading(false);
      router.push(`/configuracoes/slugs`);

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erro ao submeter dados:", error);
      alert({
        intent: "error",
        title: "Erro!",
        text: "Erro ao criar query",
        withClose: true,
      });
      setIsLoading(false);
    }
  };

  const handleGetGrouping = () => {
    api()
      .get(`/systems/list`)
      .then((res) => {
        const formattedArray = res.data.systems.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        console.log(res.data.sys);
        setGrouping(formattedArray);
      })
      .catch(() => console.log("Não foi possivel buscar as rotas"));
  };

  const handleGetConnections = () => {
    api()
      .get(`/connections/list`)
      .then((res) => {
        const formattedArray = res.data.connections.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setConnections(formattedArray);
      })
      .catch(() => console.log("Não foi possivel buscar as rotas"));
  };

  function handleExtractParameters(input: string) {
    input = input.trim();

    const regex = /@([a-zA-Z][a-zA-Z0-9_-]*)/g;

    const newParameters = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
      let parameterName = match[1];

      if (parameterName.endsWith(".")) {
        parameterName = parameterName.slice(0, -1);
      }

      const existingParameter = parameters.find(
        (param: any) => param.name === parameterName
      );

      if (existingParameter) {
        newParameters.push({
          ...existingParameter,
          type: existingParameter.type,
          value: existingParameter.value,
        });
      } else {
        newParameters.push({
          name: parameterName,
          type: "",
          value: null,
        });
      }
    }
    setParameters(newParameters);
  }

  function handleExtractParametersWithResults(input: string) {
    input = input.trim();

    const regex = /@([a-zA-Z][a-zA-Z0-9_-]*)/g;

    const newParameters = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
      let parameterName = match[1];

      if (parameterName.endsWith(".")) {
        parameterName = parameterName.slice(0, -1);
      }

      const existingParameter = parametersWithResults.find(
        (param: any) => param.name === parameterName
      );

      if (existingParameter) {
        newParameters.push({
          ...existingParameter,
          type: existingParameter.type,
          value: existingParameter.value,
        });
      } else {
        newParameters.push({
          name: parameterName,
          type: "",
          value: null,
        });
      }
    }
    setParametersWithResults(newParameters);
  }

  function handleExtractParametersNoResults(input: string) {
    input = input.trim();

    const regex = /@([a-zA-Z][a-zA-Z0-9_-]*)/g;

    const newParameters = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
      let parameterName = match[1];

      if (parameterName.endsWith(".")) {
        parameterName = parameterName.slice(0, -1);
      }

      const existingParameter = parametersNoResults.find(
        (param: any) => param.name === parameterName
      );

      if (existingParameter) {
        newParameters.push({
          ...existingParameter,
          type: existingParameter.type,
          value: existingParameter.value,
        });
      } else {
        newParameters.push({
          name: parameterName,
          type: "",
          value: null,
        });
      }
    }
    setParametersNoResults(newParameters);
  }

  useEffect(() => {
    handleGetGrouping();
    handleGetConnections();
  }, []);

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth">
      <h1 className="text-2xl text-[#3e4676]">Cadastrar slug</h1>

      <form
        className="bg-white w-full border p-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Informações</h2>
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
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Tipo de Query
            </label>
            <Controller
              name="type_query"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={queryType}
                  isClearable
                  styles={customStyles}
                  placeholder="Selecione um tipo"
                  className="w-full"
                  value={queryType.find(
                    (option: any) => option.value === field.value
                  )}
                  onChange={(selectedOption: any) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                  }}
                />
              )}
            />
            {errors.type_query?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">O tipo é obrigatório</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Agrupamentos
            </label>
            {grouping && (
              <Controller
                name="system_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={grouping}
                    isClearable
                    styles={customStyles}
                    placeholder="Selecione um agrupamento"
                    className="w-full"
                    value={grouping.find(
                      (option: any) => option.value === field.value
                    )}
                    onChange={(selectedOption: any) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                    }}
                  />
                )}
              />
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">
              Conexões
            </label>
            {connections && (
              <Controller
                name="connection_ids"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={connections}
                    isClearable
                    isMulti
                    styles={customStyles}
                    placeholder="Selecione um agrupamento"
                    className="w-full"
                    closeMenuOnSelect={false}
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
        {preProcessed && <>
          <div className="flex gap-4 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-[#3e4676] text-sm font-medium">Query</label>
            <Controller
              name={preProcessed === "pre-processada" ? "pre_query" : "query"}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    field.onChange(inputValue);
                    handleExtractParameters(inputValue);
                  }}
                ></textarea>
              )}
            />
            {errors.query?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">
                O prefixo é obrigatório
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {parameters.map((parameter: any, index: number) => (
            <div key={index} className="w-full flex flex-col gap-1">
              Parâmetro - {parameter.name}
              <div className="flex gap-4">
                <div className="w-full flex flex-col gap-1">
                  <label className="text-[#3e4676] text-sm font-medium">
                    Tipo
                  </label>
                  <Select
                    options={parameterType}
                    isClearable
                    styles={customStyles}
                    placeholder="Selecione tipo"
                    className="w-full"
                    onChange={(selectedOptions: any) => {
                      const updatedParameters = [...parameters];
                      updatedParameters[index] = {
                        ...updatedParameters[index],
                        type: selectedOptions.value,
                      };

                      setParameters(updatedParameters);
                    }}
                  />
                </div>

                {parameter.type === "integer" && (
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-[#3e4676] text-sm font-medium">
                      Valor
                    </label>
                    <input
                      type="number"
                      className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                      value={parameter.value || ""}
                      onChange={(value) => {
                        const updatedParameters = [...parameters];

                        updatedParameters[index] = {
                          ...updatedParameters[index],
                          value: Number(value.target.value),
                        };

                        setParameters(updatedParameters);
                      }}
                    />
                  </div>
                )}

                {parameter.type === "datetime-local" && (
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-[#3e4676] text-sm font-medium">
                      Valor
                    </label>
                    <input
                      type="datetime-local"
                      className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                      value={parameter.value || ""}
                      onChange={(value) => {
                        console.log(value.target.value);
                        const updatedParameters = [...parameters];

                        updatedParameters[index] = {
                          ...updatedParameters[index],
                          value: value.target.value,
                        };

                        setParameters(updatedParameters);
                      }}
                    />
                  </div>
                )}

                {parameter.type === "string" && (
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-[#3e4676] text-sm font-medium">
                      Valor
                    </label>
                    <input
                      type="text"
                      className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                      value={parameter.value || ""}
                      onChange={(value) => {
                        const updatedParameters = [...parameters];
                        updatedParameters[index] = {
                          ...updatedParameters[index],
                          value: value.target.value,
                        };

                        setParameters(updatedParameters);
                      }}
                    />
                  </div>
                )}

                {parameter.type === "boolean" && (
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-[#3e4676] text-sm font-medium">
                      Valor
                    </label>
                    <Select
                      options={parameterTypeBoolean}
                      isClearable
                      styles={customStyles}
                      placeholder="Selecione tipo"
                      className="w-full"
                      onChange={(selectedOptions: any) => {
                        const updatedParameters = [...parameters];
                        updatedParameters[index] = {
                          ...updatedParameters[index],
                          value: selectedOptions.value,
                        };

                        setParameters(updatedParameters);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </>}
    

        {preProcessed === "pre-processada" && (
          <>
            {/* Com resultados  */}
            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Query com resultado
                </label>
                <Controller
                  name="query_true"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        field.onChange(inputValue);
                        handleExtractParametersWithResults(inputValue);
                      }}
                    ></textarea>
                  )}
                />
                {errors.query?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O prefixo é obrigatório
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {parametersWithResults.map((parameter: any, index: number) => (
                <div key={index} className="w-full flex flex-col gap-1">
                  Parâmetro com resultados - {parameter.name}
                  <div className="flex gap-4">
                    <div className="w-full flex flex-col gap-1">
                      <label className="text-[#3e4676] text-sm font-medium">
                        Tipo
                      </label>
                      <Select
                        options={parameterType}
                        isClearable
                        styles={customStyles}
                        placeholder="Selecione tipo"
                        className="w-full"
                        onChange={(selectedOptions: any) => {
                          const updatedParameters = [...parametersWithResults];
                          updatedParameters[index] = {
                            ...updatedParameters[index],
                            type: selectedOptions.value,
                          };

                          setParametersWithResults(updatedParameters);
                        }}
                      />
                    </div>

                    {parameter.type === "integer" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="number"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersWithResults];

                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: Number(value.target.value),
                            };

                            setParametersWithResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "datetime-local" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="datetime-local"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersWithResults];

                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: value.target.value,
                            };

                            setParametersWithResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "string" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="text"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersWithResults];
                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: value.target.value,
                            };

                            setParametersWithResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "boolean" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <Select
                          options={parameterTypeBoolean}
                          isClearable
                          styles={customStyles}
                          placeholder="Selecione tipo"
                          className="w-full"
                          onChange={(selectedOptions: any) => {
                            const updatedParameters = [...parametersWithResults];
                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: selectedOptions.value,
                            };

                            setParametersWithResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Sem resultados  */}
            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-[#3e4676] text-sm font-medium">
                  Query sem resultado
                </label>
                <Controller
                  name="query_false"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        field.onChange(inputValue);
                        handleExtractParametersNoResults(inputValue);
                      }}
                    ></textarea>
                  )}
                />
                {errors.query?.type === "required" && (
                  <p className="text-xs text-red-600 mt-1">
                    O prefixo é obrigatório
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {parametersNoResults.map((parameter: any, index: number) => (
                <div key={index} className="w-full flex flex-col gap-1">
                  Parâmetro sem resultados - {parameter.name}
                  <div className="flex gap-4">
                    <div className="w-full flex flex-col gap-1">
                      <label className="text-[#3e4676] text-sm font-medium">
                        Tipo
                      </label>
                      <Select
                        options={parameterType}
                        isClearable
                        styles={customStyles}
                        placeholder="Selecione tipo"
                        className="w-full"
                        onChange={(selectedOptions: any) => {
                          const updatedParameters = [...parametersNoResults];
                          updatedParameters[index] = {
                            ...updatedParameters[index],
                            type: selectedOptions.value,
                          };

                          setParametersNoResults(updatedParameters);
                        }}
                      />
                    </div>

                    {parameter.type === "integer" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="number"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersNoResults];

                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: Number(value.target.value),
                            };

                            setParametersNoResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "datetime-local" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="datetime-local"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersNoResults];

                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: value.target.value,
                            };

                            setParametersNoResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "string" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <input
                          type="text"
                          className="border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value || ""}
                          onChange={(value) => {
                            const updatedParameters = [...parametersNoResults];
                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: value.target.value,
                            };

                            setParametersNoResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}

                    {parameter.type === "boolean" && (
                      <div className="w-full flex flex-col gap-1">
                        <label className="text-[#3e4676] text-sm font-medium">
                          Valor
                        </label>
                        <Select
                          options={parameterTypeBoolean}
                          isClearable
                          styles={customStyles}
                          placeholder="Selecione tipo"
                          className="w-full"
                          onChange={(selectedOptions: any) => {
                            const updatedParameters = [...parametersNoResults];
                            updatedParameters[index] = {
                              ...updatedParameters[index],
                              value: selectedOptions.value,
                            };

                            setParametersNoResults(updatedParameters);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
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
            {!isLoading && "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
