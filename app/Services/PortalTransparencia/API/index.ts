import { COSTS, MANAGING } from "../../../utils/enum";
import { ICostDocumentRequestParams, ICostDocumentResponse } from "../Interfaces/costs";

export async function documentosPorFavorecido(
  filtro: ICostDocumentRequestParams,
  apiKey = process.env.PORTAL_TRANSPARENCIA_API_KEY,
): Promise<ICostDocumentResponse[]> {
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

  const url = `${process.env.PORTAL_TRANSPARENCIA_BASE_URL
    }/api-de-dados/despesas/documentos?${query}`;
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

  const documentos = (await res.json()) as ICostDocumentResponse[];
  console.log(`  -> ${documentos.length} documento(s)`);
  return documentos;
}

export const parseValorBRL = (valor: string): number =>
  Number(valor.replace(/\./g, "").replace(",", "."));

documentosPorFavorecido({
  dataEmissao: "03/09/2025",
  fase: COSTS.STAGE.COMMITMENT,
  unidadeGestora: MANAGING.UNITY.SRA1,
})
  .then((documentos) => console.log(documentos))
  .catch((err) => console.error(err));
