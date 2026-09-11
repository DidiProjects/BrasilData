import { Effect, Layer } from "effect";
import { CostDocument } from "./Services/PortalTransparencia/API";
import { COSTS, MANAGING } from "./utils/enum";
import PortalTransparenciaAPI from "./Services/PortalTransparencia/API/PortalTransparenciaAPI";
import { FetchHttpClient } from "effect/unstable/http";


const result = Effect.runPromise(
  CostDocument.getCostDocument({
    dataEmissao: "03/09/2025",
    fase: COSTS.STAGE.COMMITMENT,
    unidadeGestora: MANAGING.UNITY.SRA1,
  }).pipe(Effect.provide(Layer.provide(PortalTransparenciaAPI.layer, FetchHttpClient.layer))),
);

result.then((docs) => console.log(docs)).catch((err) => console.error(err));