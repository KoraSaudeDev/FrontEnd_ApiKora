"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useApplication } from "@/providers/application-provider";
import { getCookies } from "@/helper/getCookies";
import { useEffect } from "react";

export default function Verzo() {
  const { usuario } = useApplication();

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (usuario && usuario?.is_admin === false) {
      redirect("/404");
    }

    if (
      usuario?.is_admin === false &&
      usuario?.routes &&
      !usuario.routes.includes("/verzo")
    ) {
      redirect("/404");
    }
  }, []);
  return (
    <main className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <section id="sobre" className="pt-2">
        <div>
          <h2 className="text-2xl font-medium">Sobre</h2>
          <hr className="my-2" />
        </div>
        <h3 className="font-medium text-lg">Objetivo</h3>
        <p className="my-4">
          Esse guia tem como objetivo nortear as Integrações entre a Kora e os
          sistemas de nossos clientes e parceiros (ERPs e sistemas auxiliares).
          As integrações aqui documentadas servem como guia de um projeto de
          Busca de informações em ERPS parceiros que são eles MV e TASY. Em
          casos de necessidades extras ou cujo escopo contratado difere do
          especificado neste documento, favor consultar o ponto focal do
          projeto.
        </p>
        <Image
          src="/images/verzo/his_verzo.png"
          alt="Descrição da imagem"
          width={500}
          height={300}
          layout="responsive"
          className="mb-2"
        />
      </section>
      <section id="api" className="pt-2">
        <div>
          <h2 className="text-2xl font-medium">API</h2>
          <hr className="my-2" />
        </div>
        <p className="mb-4">
          Nossa aplicação é projetada para que o usuário possa escolher apenas
          um banco de dados, por vez porém alguns parametros são obrigatórios
          serem informados, que são os seguintes parametros.
        </p>
        <ul className="mb-4 pl-2">
          <li className="mb-4">
            <b>limit</b>: Nossa aplicação terá um limite de registro que poderão
            ser buscados, o limite padrão e 100 dados então caso não passe o
            limit saiba que será sempre retornado 100 registros por banco.
          </li>

          <li>
            <b>offset</b>: Nossa aplicação tem uma paginação, então nosso offset
            padrão será 0, caso você passe valores como 1,2 e assim por diante
            irá trazer os itens das próximas páginas.
          </li>
        </ul>
      </section>
      <section id="autenticacao" className="pt-2">
        <div>
          <h2 className="text-2xl font-medium">Autenticação</h2>
          <hr className="my-2" />
        </div>
        <p>
          Nossa aplicação utiliza o JWT como forma de autenticação então o
          usuário deve informar seu nome e sua senha com isso e gerado um
          access_token com um token, então você deve utilizar esse token para
          conseguir acessar as demais rotas protegidas.
        </p>
        <h3 className="font-medium text-lg my-2">Forma de autenticação</h3>
        <p>
          Nossa rota de login espera uma requisição do tipo POST apontando para
          a rota /login, obrigatóriamente você deve passar os parametros via
          corpo da requisição.
        </p>
        <Image
          src="/images/verzo/login.png"
          alt="Descrição da imagem"
          width={500}
          height={300}
          layout="responsive"
          className="my-4"
        />
        <h3 className="font-medium text-lg my-2">Tempo de validade do token</h3>
        <p>O token é válido por uma hora, após sua criação</p>
        <h3 className="font-medium text-lg my-2">Headers</h3>
        <p>
          Obrigatóriamente você deve passar um header chamado Content-Type com o
          valor de application/json
        </p>
        <Image
          src="/images/verzo/headers.png"
          alt="Descrição da imagem"
          width={500}
          height={300}
          layout="responsive"
          className="my-4"
        />
      </section>
      <section id="mv" className="pt-2">
        <div>
          <h2 className="text-2xl font-medium">MV</h2>
          <hr className="my-2" />
        </div>

        <p>
          Como falado anteriormente nós temos endpoints tanto para MV quanto
          para o TASY, nós temos uma série de rotas, todas elas com o mesmo nome
          do SQL que nós foi informado anteriormente, então sempre que você
          estiver executando uma rota, estaremos executando a mesma query que
          foi fornecida anteiormente
        </p>
        <h3 className="font-medium text-lg my-2">Bases MV</h3>
        <p>
          Você poderá escolher uma unidade específica que deseja bastando passar
          a sigla da unidade que deseja, abaixo estão todas as siglas de todoas
          as unidades integradas.
        </p>

        <ul className="pl-2 my-4">
          <li>HMS - Hospital Meridional Serra</li>
          <li>HA - Hospital Anchietta</li>
          <li>HMC - Hospital Meridional Cariacica</li>
          <li>ING_OTO</li>
          <li>HPC - Hospital Praia da costa </li>
          <li>HSL - Hospital São Luiz</li>
          <li>HSF - Hospital São francisco</li>
        </ul>
        <h3 className="font-medium text-lg">Rotas MV</h3>
        <ul className="pl-2 my-4">
          <li>/api/verzo/MV/sigla_hospital/ATENDIME</li>
          <li>/api/verzo/MV/sigla_hospital/CONFIG_UNIDADE</li>
          <li>/api/verzo/MV/sigla_hospital/CONVENIO</li>
          <li>/api/verzo/MV/sigla_hospital/EMPRESA_CON_PLA</li>
          <li>/api/verzo/MV/sigla_hospital/EMPRESA_PRODUTO</li>
          <li>/api/verzo/MV/sigla_hospital/ENT_PRO</li>
          <li>/api/verzo/MV/sigla_hospital/ESPECIE</li>
          <li>/api/verzo/MV/sigla_hospital/ESTOQUE</li>
          <li>/api/verzo/MV/sigla_hospital/GRU_PRO</li>
          <li>/api/verzo/MV/sigla_hospital/GRUPO_UNIDADE</li>
          <li>/api/verzo/MV/sigla_hospital/IMP_BRA</li>
          <li>/api/verzo/MV/sigla_hospital/ITREG_FAT</li>
          <li>/api/verzo/MV/sigla_hospital/ITREGRA</li>
          <li>/api/verzo/MV/sigla_hospital/LAB_PRO</li>
          <li>/api/verzo/MV/sigla_hospital/LOTE</li>
          <li>/api/verzo/MV/sigla_hospital/MULTI_EMPRESAS</li>
          <li>/api/verzo/MV/sigla_hospital/MVTO_ESTOQUE</li>
          <li>/api/verzo/MV/sigla_hospital/PRO_FAT</li>
          <li>/api/verzo/MV/sigla_hospital/PRODUTO</li>
          <li>/api/verzo/MV/sigla_hospital/REG_AMB</li>
          <li>/api/verzo/MV/sigla_hospital/REG_FAT</li>
          <li>/api/verzo/MV/sigla_hospital/REGRA_LANCAMENTO</li>
          <li>/api/verzo/MV/sigla_hospital/REGRA_SUBSTITUICAO_PROCED</li>
          <li>/api/verzo/MV/sigla_hospital/SETOR</li>
          <li>/api/verzo/MV/sigla_hospital/TAB_CONVENIO</li>
          <li>/api/verzo/MV/sigla_hospital/TAB_FAT</li>
          <li>/api/verzo/MV/sigla_hospital/TIP_DOC</li>
          <li>/api/verzo/MV/sigla_hospital/TUSS_OM</li>
          <li>/api/verzo/MV/sigla_hospital/TUSS</li>
          <li>/api/verzo/MV/sigla_hospital/UNI_PRO</li>
          <li>/api/verzo/MV/sigla_hospital/VAL_PRO</li>
        </ul>
      </section>
      <section id="tasy" className="pt-2">
        <div>
          <h2 className="text-2xl font-medium">TASY</h2>
          <hr className="my-2" />
        </div>

        <p>
          Como falado anteriormente nós temos endpoints tanto para MV quanto
          para o TASY, nós temos uma série de rotas, todas elas com o mesmo nome
          do SQL que nós foi informado anteriormente, então sempre que você
          estiver executando uma rota, estaremos executando a mesma query que
          foi fornecida anteiormente
        </p>
        <h3 className="font-medium text-lg my-4">Bases TASY</h3>
        <p>
          Você poderá escolher uma unidade específica que deseja bastando passar
          a sigla da unidade que deseja, abaixo estão todas as siglas de todoas
          as unidades integradas.
        </p>

        <ul className="pl-2 my-4">
          <li>HSMC - Hospital São Matheus de Cuiabá</li>
          <li>HPM - Hospital Palmas Medical</li>
          <li>HSF- Hospital e Maternidade São Francisco de assis</li>
          <li>ENCORE - Hospital encore</li>
          <li>IRT - INSTITUTO DE RADIOTERAPIA</li>
        </ul>
        <h3 className="font-medium text-lg">Rotas TASY</h3>
        <ul className="pl-2 my-4">
          <li>/api/verzo/TASY/sigla_hospital/BRASINDICE_PRECO</li>
          <li>/api/verzo/TASY/sigla_hospital/CATEGORIA_CONVENIO</li>
          <li>/api/verzo/TASY/sigla_hospital/CLASSE_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/CONTA_PACIENTE</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO_AMB</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO_BRASINDICE</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO_ESTABELECIMENTO</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO_PRECO_MAT</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVENIO_SIMPRO</li>
          <li>/api/verzo/TASY/sigla_hospital/CONVERSAO_MATERIAL_CONVENIO</li>
          <li>/api/verzo/TASY/sigla_hospital/ESTABELECIMENTO</li>
          <li>/api/verzo/TASY/sigla_hospital/GRUPO_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/KIT_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_ATEND_PACIENTE</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_BRASINDICE</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_CONVERSAO_UNIDADE</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_ESTAB</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_REGRA_QT_FAT</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_SIMPRO</li>
          <li>/api/verzo/TASY/sigla_hospital/MATERIAL_TUSS</li>
          <li>/api/verzo/TASY/sigla_hospital/MEDIC_FICHA_TECNICA</li>
          <li>/api/verzo/TASY/sigla_hospital/NATUREZA_OPERACAO</li>
          <li>/api/verzo/TASY/sigla_hospital/NOTA_FISCAL</li>
          <li>/api/verzo/TASY/sigla_hospital/NOTA_FISCAL_ITEM</li>
          <li>/api/verzo/TASY/sigla_hospital/OPERACAO_NOTA</li>
          <li>/api/verzo/TASY/sigla_hospital/PARAMETRO_FATURAMENTO</li>
          <li>/api/verzo/TASY/sigla_hospital/PRECO_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/REGRA_BRASINDICE_PRECO</li>
          <li>/api/verzo/TASY/sigla_hospital/REGRA_CONVENIO_PLANO</li>
          <li>/api/verzo/TASY/sigla_hospital/SALDO_ESTOQUE</li>
          <li>/api/verzo/TASY/sigla_hospital/SIMPRO_PRECO</li>
          <li>/api/verzo/TASY/sigla_hospital/SUBGRUPO_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/TABELA_PRECO_MATERIAL</li>
          <li>/api/verzo/TASY/sigla_hospital/TISS_TIPO_TABELA</li>
        </ul>
      </section>
    </main>
  );
}
