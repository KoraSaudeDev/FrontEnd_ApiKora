"use client";

import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { getCookies } from "@/helper/getCookies";
import { useEffect } from "react";
import { CopyBlock, github } from "react-code-blocks";
import Image from "next/image";

export default function Verzo() {
  const { usuario } = useApplication();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "json/API-KORA-DE-PARA.postman_collection.json"; 
    link.download = "API-KORA-DE-PARA.postman_collection.json"; 
    link.click();
  };

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (
      usuario && usuario?.is_admin === false &&
      usuario?.routes &&
      !usuario.routes.prefixes.includes("/depara")
    ) {
      redirect("/404");
    }
  }, []);

  return (
    <main className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth dePara">
      <section id="sobre" className="pt-2">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">Documentação dePara</h2>
            <button
              onClick={handleDownload}
              className="bg-indigo-600 py-2 px-4 rounded-md text-white hover:opacity-75"
            >
              Baixar collection
            </button>
          </div>

          <hr className="my-2" />

          <h3 className="my-2 font-semibold text-lg">Sobre</h3>

          <p className="text-base">
            O projeto "de/para" consiste em uma API para consultar uma tabela
            que relaciona códigos de diferentes sistemas hospitalares (como MV e
            Tasy) com seus respectivos códigos no SAP. Essa tabela funciona como
            um mapeamento, indicando, por exemplo, que um código de produto em
            um sistema corresponde a outro código no SAP. A API permite a
            consulta desses dados com filtros, apenas facilitando o controle dos
            códigos correspondentes.
          </p>
          <hr className="my-2" />
        </div>
      </section>

      <section>
        <h3 className="my-2 font-semibold text-lg">Motivação do Projeto</h3>
        <p className="text-base mb-4">
          Em ambientes hospitalares, diferentes softwares de gestão podem ser
          utizados para administração. No entanto, cada sistema adota sua
          própria codificação para os mesmos itens, o que pode gerar
          inconsistências, erros e retrabalho na integração dos dados. O projeto
          "De/Para" resolve esse problema ao centralizar e padronizar o
          relacionamento entre códigos, garantindo mais precisão e agilidade no
          intercâmbio de informações.
        </p>
        <ul>
          <li>
            Funcionamento da API - A API permite consultas rápidas e
            estruturadas, oferecendo os seguintes recursos:
          </li>
          <li>
            Mapeamento de códigos: Retorna a correspondência entre um código em
            um sistema e seu equivalente no SAP.
          </li>
          <li>
            Filtro personalizado: Permite buscas refinadas com base em critérios
            específicos, como categoria, descrição ou sistema de origem.
          </li>
          <li>
            Integração facilitada: Pode ser consumida por outros sistemas via
            requisições HTTP, possibilitando automação de processos.
          </li>
          <li>
            Atualização dinâmica: Possibilidade de manutenção e inclusão de
            novos mapeamentos conforme necessário.
          </li>
        </ul>
        <hr className="my-2" />
      </section>

      <section>
        <h3 className="my-2 font-semibold text-lg">Funcionamento da API</h3>
        <p className="text-base mb-4">
          A API permite consultas rápidas e estruturadas, oferecendo os
          seguintes recursos:
        </p>
        <ul>
          <li>
            Mapeamento de códigos: Retorna a correspondência entre um código em
            um sistema e seu equivalente no SAP.
          </li>
          <li>
            Filtro personalizado: Permite buscas refinadas com base em critérios
            específicos, como categoria, descrição ou sistema de origem.
          </li>
          <li>
            Integração facilitada: Pode ser consumida por outros sistemas via
            requisições HTTP, possibilitando automação de processos.
          </li>
          <li>
            Atualização dinâmica: Possibilidade de manutenção e inclusão de
            novos mapeamentos conforme necessário.
          </li>
        </ul>
        <hr className="my-2" />
      </section>

      <section>
        <h3 className="my-2 font-semibold text-lg">Benefícios</h3>
        <ul>
          <li>
            Redução de erros manuais na conversão de códigos entre sistemas.
          </li>
          <li>
            Otimização da gestão hospitalar ao padronizar nomenclaturas e
            registros.
          </li>
          <li>
            Facilidade de auditoria e rastreabilidade, garantindo conformidade e
            segurança dos dados.
          </li>
          <li>
            Melhoria na integração de sistemas sem necessidade de ajustes
            manuais constantes.
          </li>
        </ul>
        Com essa API, a comunicação entre os sistemas hospitalares torna-se mais
        fluida, confiável e eficiente, contribuindo para um melhor gerenciamento
        dos processos internos e operacionais.
        <hr className="my-2" />
      </section>

      <section id="autenticacao" className="pt-2">
        <div>
          <section id="autenticacao">
            <h3 className="my-2 font-semibold text-lg">
              Autenticação na API "De/Para
            </h3>
            <p>
              A API utiliza JWT (JSON Web Token) como método de autenticação,
              garantindo segurança e controle de acesso às rotas protegidas
            </p>
            <h3 className="my-2 font-semibold text-lg">
              Processo de Autenticação
            </h3>
            <ul>
              <li>O usuário fornece suas credenciais () na rota de login.</li>
              <li>
                Se as credenciais forem válidas, a API gera um access_token, que
                é um JWT contendo as permissões e tempo de expiração.
              </li>
              <li>
                O usuário deve incluir esse token no cabeçalho das requisições
                subsequentes para acessar as rotas protegidas.
              </li>
            </ul>
            <h4 className="my-1 font-semibold">- Fazendo Login</h4>

            <div className="border mt-2 mb-6">
              <div className="flex items-center gap-5 bg-green-100 py-1 px-4">
                <span className="bg-green-500 p-1.5 rounded text-white font-semibold text-md">
                  POST
                </span>{" "}
                <CopyBlock
                  text="https://api.korasaude.com.br/api/auth/login"
                  language="javascript"
                  theme={github}
                />
              </div>
              <div className="bg-white p-3">
                <p className="text-sm font-medium">
                  Método responsável por logar o usuario para ter acesso ao
                  Token
                </p>

                <p className="text-sm font-medium mb-3">
                  - No body da requisição é preciso passar o username e o
                  password{" "}
                </p>

                <CopyBlock
                  text={`{
    "username": "*********"
    "password": "*********"
}`}
                  language="javascript"
                  theme={github}
                />

                <p className="text-sm font-medium my-3">
                  - Se a requisição for bem-sucedida, a resposta conterá o
                  token.
                </p>

                <div className="flex items-center gap-2 my-4 text-sm">
                  Response:
                  <span className="bg-green-200 p-2 flex items-center justify-center w-fit rounded font-semibold">
                    200
                  </span>
                </div>
                <CopyBlock
                  text={`{
    "routes": [],
    "status": "success",
    "token": "*********"
 }`}
                  language="javascript"
                  theme={github}
                />
                <p className="text-sm font-medium my-3">
                  - O token tem validade de 1 hora; após esse período, será
                  necessário realizar o login novamente.
                </p>
              </div>
            </div>

            <hr className="my-2" />
          </section>
        </div>
      </section>

      <section id="uso">
        <h3 className="my-2 font-semibold text-lg">Uso</h3>
        <div className="border">
          <div className="flex items-center gap-5 bg-green-100 py-1 px-4">
            <span className="bg-green-500 p-1.5 rounded text-white font-semibold text-md">
              POST
            </span>{" "}
            <CopyBlock
              text="https://api.korasaude.com.br/api/depara/"
              language="javascript"
              theme={github}
            />
          </div>
          <div className="bg-white pt-3 pb-6 px-3">
            <p className="text-sm font-medium mb-2">
              Método responsável por puxar os dados do dePara
            </p>
            <p className="text-sm font-medium">
              - Para fazer essas requisições é preciso passar o{" "}
              <strong>token</strong> que foi recebido no login:
            </p>
            <p className="text-sm font-medium">
              - No corpo da requisição, dois itens são obrigatórios:{" "}
              <strong>page</strong> e <strong>per_page</strong>.
            </p>
            <p className="text-sm font-medium mb-2">
              - Vale ressaltar que, se o valor de <strong>per_page</strong> for
              muito alto, o tempo para retornar os dados irá aumentar."
            </p>
            <CopyBlock
              text={`{
    "page": 1
    "per_page": 2
}`}
              language="javascript"
              theme={github}
            />
            <p className="text-sm font-medium my-3">
              - Existem outros itens opcionais para filtrar os dados, são eles:
            </p>
            <CopyBlock
              text={`{
    "SISTEMAORIGEM": ***
    "SISTEMADESTINO": ***
    "IDSISTEMA": ***
    "DOMINIO": ***
    "VALORORIGEM": ***
    "VALORDESTINO": ***
}`}
              language="javascript"
              theme={github}
            />
            <p className="text-sm font-medium mt-2">
              - Se a requisição for bem-sucedida, a resposta conterá:
            </p>
            <div className="flex items-center gap-2 my-4 text-sm">
              Response:{" "}
              <span className="bg-green-200 p-2 flex items-center justify-center w-fit rounded font-semibold">
                200
              </span>
            </div>
            <p className="text-sm font-medium my-2">
              - Nesse exemplo foi passado no corpo <strong>page</strong>: 1 e{" "}
              <strong>per_page</strong>: 2
            </p>
            <CopyBlock
              text={`{
    "data": [
        {
            "DOMINIO": "UNIDADEDEMEDIDA",
            "HIS": 1,
            "IDSISTEMA": "MV",
            "SISTEMADESTINO": "1420",
            "SISTEMAORIGEM": "141",
            "VALORDESTINO": "FR",
            "VALORORIGEM": "49064"
        },
        {
            "DOMINIO": "CAIXA",
            "HIS": 1,
            "IDSISTEMA": "MV",
            "SISTEMADESTINO": "9998",
            "SISTEMAORIGEM": "1410",
            "VALORDESTINO": "0009",
            "VALORORIGEM": "12"
        }
    ],
    "items_per_page": 2,
    "page": 1,
    "pages": 7959659,
    "total_items": 15919317
}`}
              language="javascript"
              theme={github}
            />
              <p className="text-sm font-medium my-2">
              - Agora, vamos apresentar um exemplo utilizando os filtros opcionais:
            </p>
            <p className="text-sm font-medium my-2">
              - O corpo da requisição está da seguinte forma:
            </p>
            <CopyBlock
              text={`{
    "page": 1,
    "per_page": 10,
    "SISTEMAORIGEM": "1420",
    "SISTEMADESTINO": "9998",
    "IDSISTEMA": "MV",
    "DOMINIO": "MATERIAL",
    "VALORORIGEM": "12708",
    "VALORDESTINO": "0010024177"
}`}
              language="javascript"
              theme={github}
            />
               <p className="text-sm font-medium my-2">
              - O resultado desta busca com o filtro aplicado foi o seguinte: 
            </p>
            <CopyBlock
              text={`
    "data": [
        {
            "DOMINIO": "MATERIAL",
            "HIS": 1,
            "IDSISTEMA": "MV",
            "SISTEMADESTINO": "9998",
            "SISTEMAORIGEM": "1420",
            "VALORDESTINO": "0010024177",
            "VALORORIGEM": "12708"
        }
    ],
    "items_per_page": 10,
    "page": 1,
    "pages": 1,
    "total_items": 1
}`}
              language="javascript"
              theme={github}
            />
          </div>
        </div>
        <hr className="my-5" />
      </section>

      <section id="exemplos">
        <h3 className="my-2 font-semibold text-lg">Exemplos</h3>
        <h2 className="my-2 font-semibold text-base">- Login</h2>
        <Image
          src="/images/dePara/login.png"
          alt="Descrição da imagem"
          width={400}
          height={250}
          layout="responsive"
          className="mb-2 !w-[600px]"
        />

        <h3 className="mt-6 mb-2 font-semibold text-base">- DePara</h3>
          <Image
            src="/images/dePara/dePara.png"
            alt="Descrição da imagem"
            width={400}
            height={250}
            layout="responsive"
               className="mb-2 !w-[600px]"
          />
          <Image
            src="/images/dePara/token.png"
            alt="Descrição da imagem"
            width={400}
            height={250}
            layout="responsive"
               className="mb-2 !w-[600px]"
          />
      </section>
    </main>
  );
}
