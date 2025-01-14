"use client";

import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";

import { api } from "@/lib/axios";

type TesteConexaoProps = {
  idConnection: number | null;
};

export default function TesteConexao(props: TesteConexaoProps) {
  const { idConnection } = props;
  const [messege, setMessage] = useState({
    status: "",
    message: "",
  });

  const handleConnectionTest = async () => {
    try {
      const response: any = await api().get(
        `/connections/test/${idConnection}`
      );
      setMessage({
        message: response.data.message,
        status: "success",
      });
    } catch (error) {
      setMessage({
        message: "Falha ao testar conexão",
        status: "error",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    handleConnectionTest();
    console.log(idConnection);
  }, []);

  return (
    <div className="overflow-auto w-full h-full p-8 scroll-smooth flex items-center flex-col">
      <h1 className="text-2xl text-[#3e4676] mb-8">Teste de conexão</h1>
      {messege.status === "success" && (
        <CiCircleCheck size={48} className="text-green-600" />
      )}
      {messege.status === "error" && (
        <MdErrorOutline size={48} className="text-red-600" />
      )}
      <p className="mt-2 text-[#3e4676]">{messege.message}</p>
    </div>
  );
}
