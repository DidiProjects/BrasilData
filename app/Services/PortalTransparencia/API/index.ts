import { Effect, Config } from "effect";

import { COSTS, MANAGING } from "../../../utils/enum";
import { ICostDocumentRequestParams, ICostDocumentResponse } from "../Interfaces/costs";
import { NetwoerkError, HttpError, InvalidFilter } from "../Error";

export const documentosPorFavorecido = (filtro: ICostDocumentRequestParams) =>
  Effect.gen(function* () {
    if (!filtro.unidadeGestora && !filtro.gestao) {
      return yield* new InvalidFilter({
        message: "Informe unidadeGestora ou gestao além de dataEmissao e fase.",
      });
    }

    const apiKey = yield* Config.string("PORTAL_TRANSPARENCIA_API_KEY");
    const baseUrl = yield* Config.string("PORTAL_TRANSPARENCIA_BASE_URL");

    const query = new URLSearchParams({
      dataEmissao: filtro.dataEmissao,
      fase: String(filtro.fase),
      pagina: String(filtro.pagina ?? 1),
    });
    if (filtro.unidadeGestora) query.set("unidadeGestora", filtro.unidadeGestora);
    if (filtro.gestao) query.set("gestao", filtro.gestao);

    const url = `${baseUrl}/api-de-dados/despesas/documentos?${query}`;
    yield* Effect.log(`GET ${url}`);

    const res = yield* Effect.tryPromise({
      try: (signal) =>
        fetch(url, {
          signal,
          headers: { "chave-api-dados": apiKey, Accept: "application/json" },
        }),
      catch: (error) => new NetwoerkError({ error }),
    });
    yield* Effect.log(`-> ${res.status} ${res.statusText}`);

    if (!res.ok) {
      const body = yield* Effect.promise(() => res.text());
      return yield* new HttpError({
        status: res.status,
        statusText: res.statusText,
        body,
      });
    }

    const documentos = yield* Effect.tryPromise({
      try: () => res.json() as Promise<ICostDocumentResponse[]>,
      catch: (error) => new NetwoerkError({ error }),
    });
    yield* Effect.log(`-> ${documentos.length} documento(s)`);

    return documentos;
  });

export const parseValorBRL = (valor: string): number =>
  Number(valor.replace(/\./g, "").replace(",", "."));

Effect.runPromise(
  documentosPorFavorecido({
    dataEmissao: "03/09/2025",
    fase: COSTS.STAGE.COMMITMENT,
    unidadeGestora: MANAGING.UNITY.SRA1,
  }),
)
  .then((documentos) => console.log(documentos))
  .catch((err) => console.error(err));
