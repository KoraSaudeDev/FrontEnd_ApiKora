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
    link.href = "json/API-KORA-BLUEMIND.postman_collection.json";
    link.download = "API-KORA-BLUEMIND.postman_collection.json";
    link.click();
  };

  const bluemindTasyTabs = [
    "bluemind_tasy_tab10",
    "bluemind_tasy_tab11",
    "bluemind_tasy_tab12",
    "bluemind_tasy_tab13_1",
    "bluemind_tasy_tab14",
    "bluemind_tasy_tab14_1",
    "bluemind_tasy_tab15",
    "bluemind_tasy_tab16",
    "bluemind_tasy_tab17",
    "bluemind_tasy_tab18",
    "bluemind_tasy_tab19",
    "bluemind_tasy_tab20",
    "bluemind_tasy_tab21",
    "bluemind_tasy_tab22",
    "bluemind_tasy_tab23",
    "bluemind_tasy_tab24",
    "bluemind_tasy_tab25",
    "bluemind_tasy_tab26",
    "bluemind_tasy_tab28",
    "bluemind_tasy_tab29",
    "bluemind_tasy_tab30",
    "bluemind_tasy_tab31",
    "bluemind_tasy_tab32",
    "bluemind_tasy_tab33",
    "bluemind_tasy_tab34",
    "bluemind_tasy_tab35",
    "bluemind_tasy_tab36",
    "bluemind_tasy_tab37",
    "bluemind_tasy_tab38"
  ];

  const bluemindMvTabs = [
    "bluemind_mv_tab22",
    "bluemind_mv_tab23",
    "bluemind_mv_tab24",
    "bluemind_mv_tab25",
    "bluemind_mv_tab27",
    "bluemind_mv_tab28",
    "bluemind_mv_tab29",
    "bluemind_mv_tab30",
    "bluemind_mv_tab31_1",
    "bluemind_mv_tab31_2",
    "bluemind_mv_tab32",
    "bluemind_mv_tab32_2",
    "bluemind_mv_tab33",
    "bluemind_mv_tab33_2",
    "bluemind_mv_tab35",
    "bluemind_mv_tab37",
    "bluemind_mv_tab38",
    "bluemind_mv_tab39",
    "bluemind_mv_tab39_2",
    "bluemind_mv_tab39_3",
    "bluemind_mv_tab39_4",
    "bluemind_mv_tab39_5",
    "bluemind_mv_tab40",
    "bluemind_mv_tab41",
    "bluemind_mv_tab42",
    "bluemind_mv_tab43",
    "bluemind_mv_tab44",
    "bluemind_mv_tab45",
    "bluemind_mv_tab47",
    "bluemind_mv_tab48",
    "bluemind_mv_tab49",
    "bluemind_mv_tab50",
    "bluemind_mv_tab51",
    "bluemind_mv_tab52",
    "bluemind_mv_tab53",
    "bluemind_mv_tab54",
    "bluemind_mv_tab55",
    "bluemind_mv_tab55_2",
    "bluemind_mv_tab55_3",
    "bluemind_mv_tab55_4",
    "bluemind_mv_tab56",
    "bluemind_mv_tab57",
    "bluemind_mv_tab57_2",
    "bluemind_mv_tab57_3",
    "bluemind_mv_tab57_4",
    "bluemind_mv_tab57_5",
    "bluemind_mv_tab57_6",
    "bluemind_mv_tab57_7",
    "bluemind_mv_tab57_8",
    "bluemind_mv_tab57_9",
    "bluemind_mv_tab57_10",
    "bluemind_mv_tab57_11",
    "bluemind_mv_tab58",
    "bluemind_mv_tab59",
    "bluemind_mv_tab59_2",
    "bluemind_mv_tab60",
    "bluemind_mv_tab61",
    "bluemind_mv_tab62",
    "bluemind_mv_tab63",
    "bluemind_mv_tab64",
    "bluemind_mv_tab65",
    "bluemind_mv_tab66",
    "bluemind_mv_tab67",
    "bluemind_mv_tab68",
    "bluemind_mv_tab69",
    "bluemind_mv_tab70",
    "bluemind_mv_tab71",
    "bluemind_mv_tab72",
    "bluemind_mv_tab73",
    "bluemind_mv_tab74",
    "bluemind_mv_tab75",
    "bluemind_mv_tab76",
    "bluemind_mv_tab77",
    "bluemind_mv_tab78",
    "bluemind_mv_tab79",
    "bluemind_mv_tab80",
    "bluemind_mv_tab81",
    "bluemind_mv_tab82",
    "bluemind_mv_tab83",
    "bluemind_mv_tab84",
    "bluemind_mv_tab85",
    "bluemind_mv_tab86",
    "bluemind_mv_tab87",
    "bluemind_mv_tab88",
    "bluemind_mv_tab89",
    "bluemind_mv_tab92",
    "bluemind_mv_tab94",
    "bluemind_mv_tab95",
    "bluemind_mv_tab95_2",
    "bluemind_mv_tab95_3",
    "bluemind_mv_tab96",
    "bluemind_mv_tab97",
    "bluemind_mv_tab98",
    "bluemind_mv_tab101",
    "bluemind_mv_tab101_2",
    "bluemind_mv_tab101_3",
    "bluemind_mv_tab102",
    "bluemind_mv_tab103",
    "bluemind_mv_tab104",
    "bluemind_mv_tab104_2",
    "bluemind_mv_tab104_3",
    "bluemind_mv_tab106",
    "bluemind_mv_tab107",
    "bluemind_mv_tab108",
    "bluemind_mv_tab109",
    "bluemind_mv_tab110",
    "bluemind_mv_tab111",
    "bluemind_mv_tab112",
    "bluemind_mv_tab113",
    "bluemind_mv_tab114",
    "bluemind_mv_tab115",
    "bluemind_mv_tab116",
    "bluemind_mv_tab117",
    "bluemind_mv_tab118",
    "bluemind_mv_tab119",
    "bluemind_mv_tab120",
    "bluemind_mv_tab126",
    "bluemind_mv_tab126_2",
    "bluemind_mv_tab126_3",
    "bluemind_mv_tab126_4",
    "bluemind_mv_tab126_5",
    "bluemind_mv_tab126_6",
    "bluemind_mv_tab126_7",
    "bluemind_mv_tab126_8",
    "bluemind_mv_tab126_9",
    "bluemind_mv_tab126_10",
    "bluemind_mv_tab126_11",
    "bluemind_mv_tab932",
    "bluemindmvtab57_5"
  ];

  const conexoes = [
    {
      Id: 1,
      Empresa: "HOSPITAL MERIDIONAL CARIACICA S.A",
      CNPJ: "00.625.711/0001-51",
      HIS: "MV",
      Versao: "MV2000",
      SlugHomologacao: "hmc__mv__bluemind__homolog",
      SlugProducao: "mvhmc__bluemind_prod",
      Observacao: "---"
    },
    {
      Id: 2,
      Empresa: "HOSPITAL METROPOLITANO S/A",
      CNPJ: "32.402.414/0001-33",
      HIS: "MV",
      Versao: "MV2000",
      SlugHomologacao: "hms__mv__bluemind__homolog",
      SlugProducao: "mv_hms__bluemind_prod",
      Observacao: "---"
    },
    {
      Id: 3,
      Empresa: "HOSPITAL SAO LUIZ S/A",
      CNPJ: "27.569.847/0001-48",
      HIS: "MV",
      Versao: "MV2000",
      SlugHomologacao: "hsl__mv__bluemind__homolog",
      SlugProducao: "mvhsl_bluemind_prod",
      Observacao: "---"
    },
    {
      Id: 4,
      Empresa: "HOSPITAL PRAIA DA COSTA S/A",
      CNPJ: "39.298.922/0001-62",
      HIS: "MV",
      Versao: "MV2000",
      SlugHomologacao: "hpc__mv__bluemind__homolog",
      SlugProducao: "mvhpc__bluemind_prod",
      Observacao: "---"
    },
    {
      Id: 5,
      Empresa: "HOSPITAL E MATERNIDADE SAO FRANCISCO DE ASSIS S/A",
      CNPJ: "30.779.649/0001-13",
      HIS: "MV",
      Versao: "MV2000",
      SlugHomologacao: "sao_francisco__homolog__bluemind",
      SlugProducao: "mvhsf__bluemind_prod",
      Observacao: "---"
    },
    {
      Id: 6,
      Empresa: "MATERNIDADE SANTA URSULA DE VITORIA LTDA",
      CNPJ: "27.434.992/0001-11",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "hmsm__mv__bluemind__homolog",
      SlugProducao: "hmsm__mv__bluemind__prod",
      Observacao: "multi empresa HMSM ID 1 HMV ID 2"
    },
    {
      Id: 7,
      Empresa: "HOSPITAL MERIDIONAL SAO MATEUS S.A",
      CNPJ: "10.427.478/0001-56",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "hmsm__mv__bluemind__homolog",
      SlugProducao: "hmsm__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 8,
      Empresa: "HOSPITAL ANCHIETA S.A",
      CNPJ: "02.560.878/0001-07",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "ha__mv__bluemind__homolog",
      SlugProducao: "ha__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 9,
      Empresa: "SERVICOS HOSPITALARES YUGE S.A",
      CNPJ: "72.576.143/0001-57",
      HIS: "TASY",
      Versao: "TASY",
      SlugHomologacao: "hsfb_tasy__bluemind__homolog",
      SlugProducao: "hsfb__tasy__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 10,
      Empresa: "HOSPITAL ENCORE LTDA",
      CNPJ: "26.878.439/0001-05",
      HIS: "TASY",
      Versao: "TASY",
      SlugHomologacao: "encore__tasy__bluemind__homolog",
      SlugProducao: "tasy__encore_prod_bluemind",
      Observacao: "---"
    },
    {
      Id: 11,
      Empresa: "INSTITUTO DE NEUROLOGIA DE GOIANIA LTDA",
      CNPJ: "01.011.865/0001-16",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "ingoto__mv__bluemind__homolog",
      SlugProducao: "ingoto__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 12,
      Empresa: "HOSPITAL SAO MATEUS LTDA FORTALEZA",
      CNPJ: "41.580.077/0001-65",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "ingoto__mv__bluemind__homolog",
      SlugProducao: "ingoto__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 13,
      Empresa: "HOSPITAL GASTROCLINICA",
      CNPJ: "07.272.404/0001-83",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "ingoto__mv__bluemind__homolog",
      SlugProducao: "ingoto__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 14,
      Empresa: "HOSPITAL GASTROCLINICA",
      CNPJ: "23.443.518/0001-03",
      HIS: "MV",
      Versao: "MVSOUL",
      SlugHomologacao: "ingoto__mv__bluemind__homolog",
      SlugProducao: "ingoto__mv__bluemind__prod",
      Observacao: "---"
    },
    {
      Id: 15,
      Empresa: "HOSPITAL E MATERNIDADE SAO MATEUS CUIABÁ",
      CNPJ: "15.016.827/0001-60",
      HIS: "TASY",
      Versao: "TASY",
      SlugHomologacao: "hsmc__homolog",
      SlugProducao: "tasy__hsmc__prod_bluemind",
      Observacao: "---"
    },
    {
      Id: 16,
      Empresa: "HOSPITAL PALMAS MEDICAL S.A",
      CNPJ: "12.955.953/0001-92",
      HIS: "TASY",
      Versao: "TASY",
      SlugHomologacao: "hpm__tasy__bluemind__homolog",
      SlugProducao: "tasy__hpm__prod_bluemind",
      Observacao: "---"
    },
    {
      Id: 17,
      Empresa: "SOCIEDADE HOSPITALAR SANTA THEREZA LTDA",
      CNPJ: "25.016.319/0001-36",
      HIS: "TASY",
      Versao: "TASY",
      SlugHomologacao: "hpm__tasy__bluemind__homolog",
      SlugProducao: "tasy__hpm__prod_bluemind",
      Observacao: "---"
    }
  ];
  
  

  useEffect(() => {
    if (!getCookies("user")) {
      redirect("/login");
    }

    if (
      usuario?.is_admin === false &&
      usuario?.routes &&
      !usuario.routes.prefixes.includes("/bluemind")
    ) {
      redirect("/404");
    }
  }, [usuario]);

  return (
    <main className="overflow-auto bg-[#f3f7fc] w-full h-full p-8 scroll-smooth">
      <section id="sobre" className="pt-2">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">Documentação BlueMind</h2>
            <button
              onClick={handleDownload}
              className="bg-indigo-600 py-2 px-4 rounded-md text-white hover:opacity-75"
            >
              Baixar collection
            </button>
          </div>

          <hr className="my-2" />

          <h3 className="my-2 font-semibold text-lg">Objetivo</h3>

          <p className="text-base">
            Esse guia tem como objetivo nortear as Integrações entre a Kora e os
            sistemas de nossos clientes e parceiros (ERPs e sistemas
            auxiliares). As integrações aqui documentadas servem como guia de um
            projeto de Busca de informações em ERPS parceiros que são eles MV e
            TASY. Em casos de necessidades extras ou cujo escopo contratado
            difere do especificado neste documento, favor consultar o ponto
            focal do projeto.
          </p>
          <Image
            src="/images/Bluemind/bluemind.drawio.png"
            alt="Descrição da imagem"
            width={400}
            height={250}
            layout="responsive"
            className="my-6 !w-[600px]"
          />
          <hr className="my-2" />
        </div>
      </section>

      <section id="autenticacao" className="pt-2">
        <div>
          <section id="autenticacao">
            <h3 className="my-2 font-semibold text-lg">
              Autenticação na API BlueMind
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

      <section id="conexoes" className="py-2">
      <h3 className="my-2 font-semibold text-lg">Lista completa das conexões</h3>
      <table cellPadding="10" className="border bg-white">
        <thead className="bg-slate-200 text-xs">
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>HIS</th>
            <th>Versão</th>
            <th>Slug Homologação</th>
            <th>Slug Produção</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {conexoes.map((conexao) => (
            <tr key={conexao.Id} className="border text-xs text-center">
              <td>{conexao.Id}</td>
              <td>{conexao.Empresa}</td>
              <td>{conexao.CNPJ}</td>
              <td>{conexao.HIS}</td>
              <td>{conexao.Versao}</td>
              <td>{conexao.SlugHomologacao}</td>
              <td>{conexao.SlugProducao}</td>
              <td>{conexao.Observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </section>

      <section id="uso-tasy">
        <h3 className="my-2 font-semibold text-lg">Uso - TASY</h3>
        <h4 className="my-1 font-semibold">- Buscando bancos de dados</h4>
        <div className="border">
          <div className="flex items-center gap-5 bg-blue-100 py-1 px-4">
            <span className="bg-blue-500 p-1.5 rounded text-white font-semibold text-md">
              GET
            </span>{" "}
            <CopyBlock
              text="https://api.korasaude.com.br/api/connections/list-simple"
              language="javascript"
              theme={github}
            />
          </div>
          <div className="bg-white pt-3 pb-6 px-3">
            <p className="text-sm font-medium mb-2">
              Método responsável por buscar todos os bancos de dados disponíveis
              para o uso.
            </p>
            <p className="text-sm font-medium">
              - Para fazer essas requisições é preciso passar o{" "}
              <strong>token</strong> que foi recebido no login.
            </p>
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
              - Aqui, a resposta traz dois bancos, juntamente com a slug de cada
              um, que será utilizada no próximo passo.
            </p>

            <CopyBlock
              text={`{
  "connections": [
    {
      "created_at": "Thu, 02 Jan 2025 23:28:51 GMT",
      "database_name": "",
      "db_type": "oracle",
      "host": "192.168.70.217",
      "label": "sao_matheus",
      "port": 1521,
      "service_name": "slrmvip.hospitalmeridional.local",
      "sid": null,
      "slug": "saomatheus",
      "username": "RAFAELVS_DB",
      "value": 12
    },
    {
      "created_at": "Fri, 03 Jan 2025 00:47:42 GMT",
      "database_name": "",
      "db_type": "oracle",
      "host": "10.65.10.1",
      "label": "sao_matheus_cuiaba",
      "port": 1521,
      "service_name": "dbprod",
      "sid": null,
      "slug": "saomatheuscuiaba",
      "username": "SVC_PLANNING",
      "value": 13
    },
  ],
  "status": "success"
}`}
              language="javascript"
              theme={github}
            />
          </div>
        </div>

        <h4 className="my-4 font-semibold">- Executando a Query</h4>
        <div className="border mt-2">
          <div className="flex items-center gap-5 bg-green-100 py-1 px-4">
            <span className="bg-green-500 p-1.5 rounded text-white font-semibold text-md">
              POST
            </span>{" "}
            <CopyBlock
              text="https://api.korasaude.com.br/api/routes/execute/:slug"
              language="javascript"
              theme={github}
            />
          </div>
          <div className="bg-white pt-3 pb-6 px-3">
            <p className="text-sm font-medium mb-2">
              Método responsável por executar uma query especifica do TASY
            </p>
            <p className="text-sm font-medium">
              - Aqui, vamos passar um exemplo de uma query para ser executada
              com a slug: <strong>bluemind_tasy_tab10</strong>
            </p>
            <p className="text-sm font-medium">
              - Para fazer essas requisições é preciso passar o{" "}
              <strong>token</strong> que foi recebido no login.
            </p>
            <p className="text-sm font-medium">
              - Na url da query é necessario passar a slug que nesse exemplo vai
              ficar assim{" "}
              <strong>
                https://api.korasaude.com.br/api/routes/execute/bluemind_tasy_tab10
              </strong>
            </p>
            <p className="text-sm font-medium">
              - Para esta query específica, vou fornecer um exemplo de como
              ficará o corpo da requisição. Lembrando que, para cada query, os
              parâmetros"
            </p>
            <p className="text-sm font-medium mb-2">
              - Este campo <strong>connections</strong> refere-se às conexões obtidas na requisição anterior. É necessário enviar um array contendo as slugs das conexões selecionadas.
            </p>

            <CopyBlock
              text={`{
    connections: ["saomatheus", "saomatheuscuiaba"]
    parameters: [
        saomatheus: {
          cd_material: "number",
          ds_material: "string",
          ds_reduzida: "string",
          cd_classe_material: "string",
          cd_unidade_medida_compra: "string",
          cd_unidade_medida_estoque: "string",
          cd_unidade_medida_consumo: "string",
          ie_material_estoque: "string",
          ie_receita: "string",
          ie_cobra_paciente:  "string",
          ie_baixa_inteira:  "string",
          ie_situacao: "string",
          qt_dias_validade: "number",
          dt_cadastramento: "datetime",
          nr_minimo_cotacao: "number",
          qt_estoque_maximo: "number"
          qt_estoque_minimo: "number",
          qt_ponto_pedido: "number",
          nr_codigo_barras: "string",
          ie_via_aplicacao: "string",
          ie_obrig_via_aplicacao:  "string",
          ie_disponivel_mercado: "string",
          qt_minimo_multiplo_solic: "number",
          qt_conv_compra_estoque: "number",
          cd_unidade_medida_solic: "string",
          ie_prescricao: "string",
          cd_kit_material: "number",
          qt_conversao_mg:  "number",
          ie_tipo_material: "string",
          cd_material_generico: "number",
          ie_padronizado:  "string",
          qt_conv_estoque_consumo: "number",
          cd_material_estoque: "number",
          cd_material_conta: "number",
          ie_preco_compra: "string",
          ie_material_direto: "string",
          ie_consignado: "string",
          ie_utilizacao_sus: "string",
          qt_limite_pessoa: "number",
          cd_unid_med_limite:  "string",
          ds_orientacao_uso: "string",
          ie_tipo_fonte_prescr: "string",
          ie_dias_util_medic: "string",
          ds_orientacao_usuario: "string",
          cd_medicamento: "string",
          ie_controle_medico: "number",
          ie_baixa_estoq_pac: "string",
          qt_horas_util_pac: "number",
          qt_dia_interv_ressup: "number",
          qt_dia_ressup_forn: "number",
          qt_max_prescricao: "number",
          qt_dia_estoque_minimo: "number",
          qt_consumo_mensal: "number",
          ie_curva_abc: "string",
          ie_classif_xyz: "string",
          qt_prioridade_coml: "number",
          cd_fabricante: "string",
          nr_seq_grupo_rec: "number",
          cd_sistema_ant: "string",
          nr_seq_fabric: "number",
          ie_bomba_infusao:  "string",
          ie_diluicao: "string",
          ie_solucao: "string"
        },
        saomatheuscuiaba: {
          ...Os mesmos parâmetros
        }
    ],

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
            <CopyBlock
              text={`{
    "data": [
        {
    "data": {
        "saomatheus": "Query executada com sucesso",
        "saomatheuscuiaba": "Query executada com sucesso"
    },
    "status": "success"
}`}
              language="javascript"
              theme={github}
            />
          </div>
        </div>
        <h4 className="my-4 font-semibold">- Lista completa de slugs TASY</h4>
        <ul className="grid grid-cols-2 gap-3 list-none p-0">
          {bluemindTasyTabs.map((item: string) => (
            <li
              key={item}
              className="bg-white p-4 border border-gray-300 rounded-md shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm font-medium mt-2">
          <strong>OBS:</strong> Em alguns casos, as slugs possuem um sufixo
          numérico no final, como no exemplo da <i>bluemind_tasy_tab13_1</i>,
          Isso significa que a mesma query pode ter headers diferentes.
        </p>

        <hr className="my-5" />
      </section>

      <hr className="my-2" />

      <section id="uso-mv">
        <h3 className="my-2 font-semibold text-lg">Uso - MV</h3>
        <h4 className="my-1 font-semibold">- Buscando bancos de dados</h4>
        <div className="border">
          <div className="flex items-center gap-5 bg-blue-100 py-1 px-4">
            <span className="bg-blue-500 p-1.5 rounded text-white font-semibold text-md">
              GET
            </span>{" "}
            <CopyBlock
              text="https://api.korasaude.com.br/api/connections/list-simple"
              language="javascript"
              theme={github}
            />
          </div>
          <div className="bg-white pt-3 pb-6 px-3">
            <p className="text-sm font-medium mb-2">
              Método responsável por buscar todos os bancos de dados disponíveis
              para o uso.
            </p>
            <p className="text-sm font-medium">
              - Para fazer essas requisições é preciso passar o{" "}
              <strong>token</strong> que foi recebido no login.
            </p>
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
              - Aqui, a resposta traz dois bancos, juntamente com a slug de cada
              um, que será utilizada no próximo passo.
            </p>

            <CopyBlock
              text={`{
  "connections": [
    {
      "created_at": "Thu, 02 Jan 2025 23:28:51 GMT",
      "database_name": "",
      "db_type": "oracle",
      "host": "192.168.70.217",
      "label": "sao_matheus",
      "port": 1521,
      "service_name": "slrmvip.hospitalmeridional.local",
      "sid": null,
      "slug": "saomatheus",
      "username": "RAFAELVS_DB",
      "value": 12
    },
    {
      "created_at": "Fri, 03 Jan 2025 00:47:42 GMT",
      "database_name": "",
      "db_type": "oracle",
      "host": "10.65.10.1",
      "label": "sao_matheus_cuiaba",
      "port": 1521,
      "service_name": "dbprod",
      "sid": null,
      "slug": "saomatheuscuiaba",
      "username": "SVC_PLANNING",
      "value": 13
    },
  ],
  "status": "success"
}`}
              language="javascript"
              theme={github}
            />
          </div>
        </div>

        <h4 className="my-4 font-semibold">- Executando a Query</h4>
        <div className="border mt-2">
          <div className="flex items-center gap-5 bg-green-100 py-1 px-4">
            <span className="bg-green-500 p-1.5 rounded text-white font-semibold text-md">
              POST
            </span>{" "}
            <CopyBlock
              text="https://api.korasaude.com.br/api/routes/execute/:slug"
              language="javascript"
              theme={github}
            />
          </div>
          <div className="bg-white pt-3 pb-6 px-3">
            <p className="text-sm font-medium mb-2">
              Método responsável por executar uma query especifica do MV
            </p>
            <p className="text-sm font-medium">
              - Aqui, vamos passar um exemplo de uma query para ser executada
              com a slug: <strong>bluemind_mv_tab101</strong>
            </p>
            <p className="text-sm font-medium">
              - Para fazer essas requisições é preciso passar o{" "}
              <strong>token</strong> que foi recebido no login.
            </p>
            <p className="text-sm font-medium">
              - Na url da query é necessario passar a slug que nesse exemplo vai
              ficar assim{" "}
              <strong>
                https://api.korasaude.com.br/api/routes/execute/bluemind_mv_tab101
              </strong>
            </p>
            <p className="text-sm font-medium">
              - Para esta query específica, vou fornecer um exemplo de como
              ficará o corpo da requisição. Lembrando que, para cada query, os
              parâmetros"
            </p>
            <p className="text-sm font-medium mb-2">
              - Este campo <strong>connections</strong> refere-se às conexões obtidas na requisição anterior. É necessário enviar um array contendo as slugs das conexões selecionadas.
            </p>

            <CopyBlock
              text={`{
    connections: ["saomatheus", "saomatheuscuiaba"]
    parameters: [
        saomatheus: {
          cd_indice: "number",
          nm_indice: "string",
        },
        saomatheuscuiaba: {
          cd_indice: "number",
          nm_indice: "string",
        }
    ],

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
            <CopyBlock
              text={`{
    "data": [
        {
    "data": {
        "saomatheus": "Query executada com sucesso",
        "saomatheuscuiaba": "Query executada com sucesso"
    },
    "status": "success"
}`}
              language="javascript"
              theme={github}
            />
          </div>
        </div>
        <h4 className="my-4 font-semibold">- Lista completa de slugs MV</h4>
        <ul className="grid grid-cols-2 gap-3 list-none p-0">
          {bluemindMvTabs.map((item: string) => (
            <li
              key={item}
              className="bg-white p-4 border border-gray-300 rounded-md shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium mt-2">
          <strong>OBS:</strong> Em alguns casos, as slugs possuem um sufixo
          numérico no final, como no exemplo da <i>bluemind_mv_tab55</i>, que
          varia de <i>bluemind_mv_tab55_1</i> até <i>bluemind_mv_tab55_4</i>.
          Isso significa que a mesma query pode ter headers diferentes.
        </p>

        <hr className="my-5" />
      </section>

      <section id="exemplos">
        <h2 className="my-2 font-semibold text-lg">Exemplos</h2>
        <h3 className="my-2 font-semibold text-base">- Login</h3>
        <Image
          src="/images/BlueMind/login.png"
          alt="Descrição da imagem"
          width={400}
          height={250}
          layout="responsive"
          className="mb-2 !w-[600px]"
        />

        <h3 className="my-2 font-semibold text-base">- Autenticar rotas</h3>
        <Image
          src="/images/BlueMind/token.png"
          alt="Descrição da imagem"
          width={400}
          height={250}
          layout="responsive"
          className="mb-2 !w-[600px]"
        />

        <h3 className="mt-6 mb-2 font-semibold text-base">- Buscas conexões</h3>
        <Image
          src="/images/BlueMind/conexoes.png"
          alt="Descrição da imagem"
          width={400}
          height={250}
          layout="responsive"
          className="mb-2 !w-[600px]"
        />
         <h3 className="mt-6 mb-2 font-semibold text-base">- Executar query</h3>
        <Image
          src="/images/BlueMind/executar.png"
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
