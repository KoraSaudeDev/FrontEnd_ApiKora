import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/lib/axios";
import { alert } from "@/hooks/use-alert";
import { customStyles } from "@/lib/StyleSelect/StyleSelect";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
const Select = dynamic(() => import("react-select"), { ssr: false });

type ExecutarQueryProps = {
  idQuery: number | null;
};

export default function ExecutarQuery(props: ExecutarQueryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [parameters, setParameters] = useState<any>([]);
  const [isClient, setIsClient] = useState(false); // Garantir execução no cliente

  const [values, setValues] = useState<any>(null)

  const { idQuery } = props;

  const parameterTypeBoolean = [
    { label: "Verdadeiro", value: true },
    { label: "Falso", value: false },
  ];

  const { handleSubmit, control, setValue, watch } = useForm();

  const connectionsActive = watch("connections");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const dados = {
      parameters: values,
      ...data,
    };

    try {
      const result = await api().post(`/routes/execute/${slug}`, dados);
      setResult(result.data.data);
      setIsLoading(false);
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

  const handleGetParametersAndSlug = async () => {
    try {
      const data = await api().get(`/routes/profile/${idQuery}`);

      const transformedIds = data.data.route.connections.map(
        (item: { slug: string }) => item.slug
      );

      console.log(transformedIds);
      setValue("connections", transformedIds);
      setSlug(data.data.route.slug);
      setParameters(data.data.route.parameters);
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
    }
  };

  const handleGetConnections = () => {
    api()
      .get(`/connections/list-simple`)
      .then((res) => {
        const transformedIds = res.data.connections.map((item: any) => {
          return { label: item.slug, value: item.slug };
        });
        setConnections(transformedIds);
      })
      .catch(() => console.log("Não foi possivel buscar as conexões"));
  };

  useEffect(() => {
    const resultado =connectionsActive && connectionsActive.map((nome:any) => {
      const objeto = {} as any;
      parameters.forEach((param: any) => {
        objeto[param.name] = param.value; // Usando o nome do parâmetro como chave e o valor como valor
      });
      return { [nome]: objeto }; // Retorna o objeto no formato desejado
    });

    setValues(resultado)
  }, [connectionsActive, parameters])

  useEffect(() => {
    setIsClient(true); // Definir que o componente foi montado no cliente
    handleGetParametersAndSlug();
    handleGetConnections();
  }, []);

  // Não renderiza o conteúdo até o componente estar montado no cliente
  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth">
      <h1 className="text-2xl text-[#3e4676]">Executar query</h1>

      <form
        className="bg-white w-full border p-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {parameters.length > 0 && (
          <div>
            <h2 className="mb-4">Parâmetros</h2>
            {connectionsActive &&
              connectionsActive.map((item:string, itemIndex:number) => (
                <>
                   <h3>Parametro do banco - {item}</h3>
                   <div key={itemIndex}>
                  {parameters.map((parameter: any, index: any) => (
                  <>
                 
                      <div key={index} className="flex flex-col gap-1 w-1/2 mb-4">
                      <label className="text-[#3e4676] text-sm font-medium">
                        {parameter.name}
                      </label>
                      {parameter.type === "boolean" && (
                        <Select
                          options={parameterTypeBoolean}
                          isClearable
                          styles={customStyles}
                          placeholder="Selecione tipo"
                          className="w-full"
                          onChange={(selectedOptions: any) => {
                            setValues((prevArray: any) => {
                              const novoArray = [...prevArray];

                              novoArray[itemIndex][item][parameter.name] = selectedOptions.value;
                              
                              return novoArray;
                            });

                          }}
                        />
                      )}

                      {parameter.type === "string" && (
                        <input
                          value={parameter.value}
                          onChange={(e: any) => {
                            setValues((prevArray: any) => {
                              const novoArray = [...prevArray];

                              novoArray[itemIndex][item][parameter.name] = e.target.value;
                              
                              return novoArray;
                            });
                          }}
                          type="text"
                          className="w-full border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                        />
                      )}

                      {parameter.type === "integer" && (
                        <input
                          type="number"
                          className="w-full border border-[#ddd] rounded px-2 py-[5px] focus-visible:outline-none focus-visible:border-[#007aff]"
                          value={parameter.value}
                          onChange={(e: any) => {
                            setValues((prevArray: any) => {
                              const novoArray = [...prevArray];

                              novoArray[itemIndex][item][parameter.name] = e.target.value;
                              
                              return novoArray;
                            });
                          }}
                        />
                      )}
                    </div>
                  </>
                  ))}
                </div>
                
                </>
               
              ))}

            <div className="w-1/2 flex flex-col gap-1">
              <label className="text-[#3e4676] text-sm font-medium">
                Conexões
              </label>
              {connections && (
                <Controller
                  name="connections"
                  control={control}
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
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <p className="text-sm mt-6">
            Clique no botão para executar sua query
          </p>
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
            {!isLoading && "Executar"}
          </button>
        </div>
      </form>
      {result && (
        <div className="bg-white w-full border p-6 mt-8">
          <h2 className="mb-4">Resultado</h2>
          <ReactJson
            src={result}
            theme="summerfruit"
            style={{
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      )}
    </div>
  );
}
