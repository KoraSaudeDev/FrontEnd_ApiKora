"use client";

import Header from "@/components/Header/Header";
import SidebarConfiguracoes from "@/components/Sidebar/SidebarConfiguracoes";
import { api } from "@/lib/axios";
import { useApplication } from "@/providers/application-provider";
import { ReactNode, useEffect, useState } from "react";

type SettingsProps = {
  children: ReactNode;
};
export default function SettingsLayout({ children }: SettingsProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  const { init} = useApplication();

  const handleOpenSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    api()
    .get(`/users/me`)
    .then((res) => {
      console.log(res.data.user)
      init(res.data.user)
    });
  }, [])
  return (
    <div className="bg-[#284557] min-h-screen overflow-hidden">
      <Header
        openSidebar={openSidebar}
        onChangeOpenSidebar={handleOpenSidebar}
      />
      <div className="flex">
        {/* Sidebar fixa */}
        <div className={`${openSidebar ? "w-[250px]" : "w-0"} fixed top-0 left-0 h-full bg-[#f3f7fc]`}>
          <SidebarConfiguracoes openSidebar={openSidebar} />
        </div>

        {/* Conteúdo que tem scroll */}
        <div className={`h-screen overflow-auto ml-auto pt-16 ${openSidebar ? "w-[calc(100%-250px)]" : "w-full"}`}>{children}</div>
      </div>
    </div>
  );
}
