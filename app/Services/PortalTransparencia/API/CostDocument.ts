import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { Effect, Layer } from "effect";

import { COSTS, MANAGING } from "../../../utils/enum";
import PortalTransparenciaAPI from "./PortalTransparenciaAPI";
import { ICostDocumentRequestParams, ICostDocumentResponse } from "../Interfaces/costs";
import { InvalidFilter } from "../Error";

export const getCostDocument = (filtro: ICostDocumentRequestParams) =>
  Effect.gen(function* () {
    if (!filtro.unidadeGestora && !filtro.gestao) {
      return yield* new InvalidFilter({
        message: "Informe unidadeGestora ou gestao além de dataEmissao e fase.",
      });
    }

    const query = new URLSearchParams({
      dataEmissao: filtro.dataEmissao,
      fase: String(filtro.fase),
      pagina: String(filtro.pagina ?? 1),
    });
    if (filtro.unidadeGestora) query.set("unidadeGestora", filtro.unidadeGestora);
    if (filtro.gestao) query.set("gestao", filtro.gestao);

    const api = yield* PortalTransparenciaAPI;
    return (yield* api.request("/api-de-dados/despesas/documentos", query)) as ICostDocumentResponse[];
  });

export default {
  getCostDocument,
}
