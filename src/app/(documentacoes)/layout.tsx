"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

type SettingsProps = {
  children: ReactNode;
};
export default function MainLayout({ children }: SettingsProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleOpenSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };
  return (
    <div className="bg-[#284557] min-h-screen overflow-hidden">
      <Header
        openSidebar={openSidebar}
        onChangeOpenSidebar={handleOpenSidebar}
      />
      <div className="flex">
        {/* Sidebar fixa */}
        <div className={`${openSidebar ? "w-[250px]" : "w-0"} fixed top-0 left-0 h-full bg-[#f3f7fc]`}>
          <Sidebar openSidebar={openSidebar} />
        </div>

        {/* Conteúdo que tem scroll */}
        <div className={`h-screen overflow-auto ml-auto pt-16 ${openSidebar ? "w-[calc(100%-250px)]" : "w-full"}`}>{children}</div>
      </div>
    </div>
  );
}
