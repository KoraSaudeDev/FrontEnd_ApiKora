"use client";

import Image from "next/image";
import { useState } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { alert } from "@/hooks/use-alert";
import { api } from "@/lib/axios";
// import { cookies } from "next/headers";


export default function Login() {
  const logoKoraUrl = "https://i.postimg.cc/8k9pdsZV/unnamed.png";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);

    const user = {
      username: userName,
      password: password,
    };

    api()
      .post("auth/login", user)
      .then((res) => {
        document.cookie = `user=${res.data.token}; path=/; max-age=3600; secure;`;
        if (res?.status === 200) {
          return router.push("/inicio");
        }
      })
      .catch(() => {
        alert({
          intent: "error",
          title: "Erro na autenticação!",
          text: "Username ou senha incorreta.",
          withClose: true,
        });
      }).finally(() => setIsLoading(false))

  };

  return (
    <div className="bg-[#f3f7fc] flex justify-center items-center w-full h-screen flex-col gap-10">
      <Image src={logoKoraUrl} alt="" width={100} height={100} />
      <div className="bg-white shadow-[rgba(0,_0,_0,_0.1)_0_4px_12px] flex justify-center items-center flex-col w-[500px] rounded-md gap-4 px-12 py-8">
        <h2 className="text-xl text-[#3e4676] font-semibold">
          Bem-vindo à API Kora
        </h2>
        <h2 className="text-lg text-[#3e4676] font-semibold">Documentação</h2>
        <div className="w-full flex flex-col gap-1">
          <label className="text-[#3e4676] text-sm font-medium">Nome</label>
          <input
            type="text"
            className="border border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-[#3e4676] text-sm font-medium">Senha</label>
          <div className=" relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border w-full border-[#ddd] rounded px-2 py-1  focus-visible:outline-none focus-visible:border-[#007aff]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-2.5 right-4 cursor-pointer hover:opacity-75 transition-all"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-[#28a745] text-white rounded hover:opacity-75 transition-all border-none py-2 px-7 text-sm font-medium ml-auto mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading && (
            <Image
              src="/images/loading.svg"
              alt=""
              width={1500}
              height={20}
              className="h-5"
            />
          )}
          {!isLoading && "Entrar"}
        </button>
      </div>
    </div>
  );
}
