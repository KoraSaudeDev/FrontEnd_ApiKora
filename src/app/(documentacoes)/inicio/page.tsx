"use client";

import { useApplication } from "@/providers/application-provider";
import Link from "next/link";
import { FaRegSadCry } from "react-icons/fa";

export default function Inicio() {
  const { usuario } = useApplication();
  // const cookieStore = cookies();
  // const userCookie = (await cookieStore).get('user');

  // if (!userCookie) {
  //   redirect('/login');
  // }

  // if (userCookie) {
  //     redirect('/verzo');
  //   }
  return (
    <div className="bg-[#f3f7fc] flex justify-center items-center w-full h-screen flex-col gap-10 text-[#3e4676]">
      <h1 className="text-3xl font-medium">Bem-vindo à APi Kora</h1>
      {!usuario?.is_admin && usuario?.routes.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl">
            Desculpe, mas não há nenhuma documentação disponível para você!
          </p>
          <FaRegSadCry size={150} />
        </div>
      )}

      {usuario?.is_admin && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl">
            Clique no link abaixo para acessar a documentação completa!
          </p>
          <Link
            href="/verzo#sobre"
            className="w-fit bg-[#3e4676] text-white rounded hover:opacity-75 transition-all border-none py-2 px-7 text-lg font-medium m-auto mt-4"
          >
            Acessar
          </Link>
        </div>
      )}

      {!usuario?.is_admin && usuario?.routes && !usuario?.routes.includes("/verzo") &&  
         <div className="flex flex-col items-center gap-4">
         <p className="text-2xl">
           Desculpe, mas não há nenhuma documentação disponível para você!
         </p>
         <FaRegSadCry size={150} />
       </div>}
    </div>
  );
}
