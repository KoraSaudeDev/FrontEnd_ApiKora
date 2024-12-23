import { removeCookie } from "@/helper/getCookies";
import { useApplication } from "@/providers/application-provider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoReorderThreeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

type HeaderProps = {
  openSidebar: boolean;
  onChangeOpenSidebar: () => void;
};

export default function  Header(props: HeaderProps) {
  const { openSidebar, onChangeOpenSidebar } = props;
  const { usuario } = useApplication();



  const handleLogout = () => {
    removeCookie("user")
    redirect("/login")
  }


  return (
    <header
      className={`${
        openSidebar ? "w-[calc(100%-230px)]" : "w-full "
      } h-16 bg-[#284557] flex items-center justify-between px-4 ml-auto fixed right-0 z-[99999]`}
    >
      <IoReorderThreeOutline
        className="text-white cursor-pointer"
        size={30}
        onClick={onChangeOpenSidebar}
      />

      <div className="flex items-center gap-4">
        {usuario?.is_admin && (
          <Link href="/configuracoes/usuarios" className="border-r border-r-white pr-4">
            <IoSettingsOutline className="text-white" size={22} />
          </Link>
        )}
         <div className="text-white flex gap-2 mr-4"> 
            Sair
            <MdLogout className="text-white" size={22} onClick={handleLogout} />
          </div>
      </div>
    </header>
  );
}
