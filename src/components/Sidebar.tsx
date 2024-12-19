"use client";

import Accordion from "./Accordion";
import { useState } from "react";
import Image from "next/image";

type SidebarProps = {
  openSidebar: boolean;
};

export default function Sidebar(props: SidebarProps) {
  const { openSidebar } = props;

  const [items] = useState([
    {
      item: "Verzo",
      children: [
        {
          label: "Sobre",
          path: "/verzo#sobre",
        },
        {
          label: "API",
          path: "/verzo#api",
        },
        {
          label: "Autenticação",
          path: "/verzo#autenticacao",
        },
        {
          label: "MV",
          path: "/verzo#mv",
        },
        {
          label: "Tasy",
          path: "/verzo#tasy",
        },
      ],
    },
  ]);

  // const myRoutes = () => {
  //   fetchClient("http://10.27.254.153:3793/users/list").then(
  //     async (response) =>
  //       response.status === 200 && console.log((await response.json()).data)
  //   );
  // };

  // useEffect(() => {myRoutes()}, [])

  return (
    <div
      className={`${
        openSidebar ? "w-[250px]" : "w-0 left-[-10000px]"
      }  h-screen bg-white top-0 text-white transition-all shadow-[rgba(0,_0,_0,_0.1)_4px_0_8px] pt-10 relative`}
    >
      <div
        className={`bg-[#284557] w-[230px] flex-col h-16 flex justify-center items-center absolute top-0 ${
          !openSidebar && "left-[-10000px] transition-all"
        }`}
      >
        <Image src="/images/logokora.webp" alt="" width={132} height={30} />
      </div>

      <div className="flex flex-col gap-3 items-center mt-10 mb-5 w-[230px]">
        <div className="bg-green-500 text-white size-12 rounded-full flex justify-center items-center font-medium">
          K
        </div>
        <p className="text-gray-800">Documentações</p>
      </div>
      <Accordion items={items} />
    </div>
  );
}
