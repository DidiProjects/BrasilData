import { Config, Context, Effect, Layer } from "effect";
import { HttpClient, HttpClientRequest } from "effect/unstable/http";

import { NetwoerkError, HttpError } from "../Error";

export default class PortalTransparenciaAPI extends Context.Service<PortalTransparenciaAPI, {
  readonly request: (
    path: string,
    query: URLSearchParams,
  ) => Effect.Effect<unknown, NetwoerkError | HttpError>;
}>()("BrasilData/PortalTransparenciaAPI") {
  static readonly layer = Layer.effect(
    PortalTransparenciaAPI,
    Effect.gen(function* () {
      const apiKey = yield* Config.string("PORTAL_TRANSPARENCIA_API_KEY");
      const baseUrl = yield* Config.string("PORTAL_TRANSPARENCIA_BASE_URL");

      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.mapRequest(HttpClientRequest.prependUrl(baseUrl)),
        HttpClient.mapRequest(HttpClientRequest.setHeader("chave-api-dados", apiKey)),
        HttpClient.mapRequest(HttpClientRequest.acceptJson),
      );

      const request = Effect.fn("PortalTransparenciaAPI.request")(function* (
        path: string,
        query: URLSearchParams,
      ) {
        const res = yield* client.get(path, { urlParams: query }).pipe(
          Effect.mapError((error) => new NetwoerkError({ error })),
        );
        yield* Effect.log(`GET ${path}?${query} -> ${res.status}`);

        if (res.status >= 400) {
          const body = yield* res.text.pipe(
            Effect.mapError((error) => new NetwoerkError({ error })),
          );
          return yield* new HttpError({ status: res.status, statusText: "", body });
        }

        return yield* res.json.pipe(
          Effect.mapError((error) => new NetwoerkError({ error })),
        );
      });

      return { request };
    }),
  );
}
