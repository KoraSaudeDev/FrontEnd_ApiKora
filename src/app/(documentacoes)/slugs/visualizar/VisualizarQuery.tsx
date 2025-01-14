"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { getCookies } from "@/helper/getCookies";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { LuDot } from "react-icons/lu";

type VisualizarQueryProps = {
  idQuery: number | null;
};

export default function VisualizarQuery(props: VisualizarQueryProps) {
  const [route, setRoute] = useState<any>(null);
  const { usuario } = useApplication();

  const { idQuery } = props;

  const handleGetQuery = async () => {
    if (!usuario?.is_admin) {
      const item = usuario?.routes.slugs.find((item) => item.id == idQuery);

      return setRoute(item);
    }

    const data = await api().get(`/routes/profile/${idQuery}`);

    return setRoute(data.data.route);
  };

  useEffect(() => {
    handleGetQuery();

    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && !usuario?.is_admin && usuario?.routes.slugs.length === 0) {
      redirect("/404");
    }
  }, [usuario]);

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth">
      <h1 className="text-lg">Visualizar query</h1>
      {route && (
        <div className="bg-white w-full border p-6 mt-8">
          <h2 className="">Nome</h2>
          <div className="pl-2 text-sm mb-3 font-bold">{route.name}</div>
          <h2 className="">Slug</h2>
          <div className="pl-2 text-sm mb-3 font-bold">{route.slug}</div>
          <h2 className="mb-3">Parâmetros</h2>
          {route.parameters &&
            route.parameters.map((parameter: any, index: number) => {
              return (
                <div key={index} className="flex gap-2 items-center mb-2 pl-2">
                  <span>
                    <LuDot size={22} />
                  </span>
                  <div className="text-sm">
                    <span className="font-bold">Nome:</span> {parameter.name}{" "}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">Tipo:</span> {parameter.type}{" "}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">Valor:</span> {parameter.value}{" "}
                  </div>
                </div>
              );
            })}

          <h2 className="mb-3">Query</h2>
          <div className="text-sm border p-2 rounded-sm">{route.query}</div>
        </div>
      )}
    </div>
  );
}
