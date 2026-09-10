const BASE_URL = "https://api.portaldatransparencia.gov.br";

export type FaseDespesa = 1 | 2 | 3;

export interface FiltroDocumentos {
  dataEmissao: string; // "DD/MM/AAAA"
  fase: FaseDespesa;
  unidadeGestora?: string; // código SIAFI da UG emitente
  gestao?: string; // código SIAFI da gestão
  pagina?: number; // default 1
}

export interface DespesaDocumento {
  data?: string;
  documento?: string;
  documentoResumido?: string;
  observacao?: string;
  funcao?: string;
  subfuncao?: string;
  programa?: string;
  acao?: string;
  subTitulo?: string;
  localizadorGasto?: string;
  fase?: string;
  especie?: string;
  favorecido?: string;
  codigoFavorecido?: string;
  nomeFavorecido?: string;
  ufFavorecido?: string;
  valor?: string;
  codigoUg?: string;
  ug?: string;
  codigoUo?: string;
  uo?: string;
  codigoOrgao?: string;
  orgao?: string;
  codigoOrgaoSuperior?: string;
  orgaoSuperior?: string;
  categoria?: string;
  grupo?: string;
  elemento?: string;
  modalidade?: string;
  numeroProcesso?: string;
  planoOrcamentario?: string;
  autor?: string;
  favorecidoIntermediario?: boolean;
  favorecidoListaFaturas?: boolean;
}

export async function documentosPorFavorecido(
  filtro: FiltroDocumentos,
  apiKey = process.env.PORTAL_TRANSPARENCIA_API_KEY,
): Promise<DespesaDocumento[]> {
  if (!apiKey) {
    throw new Error(
      "Defina PORTAL_TRANSPARENCIA_API_KEY (portaldatransparencia.gov.br/api-de-dados/cadastrar-email)",
    );
  }
  if (!filtro.unidadeGestora && !filtro.gestao) {
    throw new Error(
      "A API exige unidadeGestora ou gestao além de dataEmissao+fase " +
        "(ela não lista o dia inteiro como a consulta web).",
    );
  }

  const query = new URLSearchParams({
    dataEmissao: filtro.dataEmissao,
    fase: String(filtro.fase),
    pagina: String(filtro.pagina ?? 1),
  });
  if (filtro.unidadeGestora) query.set("unidadeGestora", filtro.unidadeGestora);
  if (filtro.gestao) query.set("gestao", filtro.gestao);

  const url = `${BASE_URL}/api-de-dados/despesas/documentos?${query}`;
  console.log("GET", url);

  const res = await fetch(url, {
    headers: { "chave-api-dados": apiKey, Accept: "application/json" },
  });
  console.log(`  -> ${res.status} ${res.statusText}`);

  if (!res.ok) {
    throw new Error(
      `Portal da Transparência respondeu ${res.status}: ${await res.text()}`,
    );
  }

  const documentos = (await res.json()) as DespesaDocumento[];
  console.log(`  -> ${documentos.length} documento(s)`);
  return documentos;
}

export const parseValorBRL = (valor: string): number =>
  Number(valor.replace(/\./g, "").replace(",", "."));

documentosPorFavorecido({
  dataEmissao: "03/09/2025",
  fase: 1,
  unidadeGestora: "110161", // Superintendência Reg. de Adm. da 1ª Região (AGU)
})
  .then((documentos) => console.log(documentos))
  .catch((err) => console.error(err));
