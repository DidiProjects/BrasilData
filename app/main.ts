import { Effect, Layer } from "effect";
import { CostDocument } from "./Services/PortalTransparencia/API";
import { COSTS, MANAGING } from "./utils/enum";
import PortalTransparenciaAPI from "./Services/PortalTransparencia/API/PortalTransparenciaAPI";
import { FetchHttpClient } from "effect/unstable/http";


const program = CostDocument.getCostDocument({
  dataEmissao: "03/09/2025",
  fase: COSTS.STAGE.COMMITMENT,
  unidadeGestora: MANAGING.UNITY.SRA1,
}).pipe(
  Effect.provide(Layer.provide(PortalTransparenciaAPI.layer, FetchHttpClient.layer)),
  Effect.catchTags({
    NetworkError: (e) => Effect.logError(`Falha de rede: ${e.error}`).pipe(Effect.as([])),
    HttpError: (e) => Effect.logError(`Portal respondeu ${e.status}: ${e.body}`).pipe(Effect.as([])),
    InvalidFilter: (e) => Effect.logError(e.message).pipe(Effect.as([])),
  }),
);

Effect.runPromise(program).then((docs) => console.log(docs));