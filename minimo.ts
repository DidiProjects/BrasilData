import { Playwright, chromium } from "effect-playwright";
import { Effect, Schema, Array as EffectArray, DateTime } from "effect";
import { FastCheck } from "effect/testing"

// 💎 Schemas validados no runtime (mais poderoso que zod e cia.)
const CompanhiaAerea = Schema.Struct({
  country: Schema.Trimmed,
  company: Schema.Trimmed,
});
type CompanhiaAerea = typeof CompanhiaAerea.Type;

// 💎 Erros tipados
export class ElementNotFound extends Schema.TaggedError<ElementNotFound>()(
  "ElementNotFound",
  {
    locator: Schema.Unknown,
    error: Schema.Unknown,
  },
) {}

const parseCompaniesFromLine = (line?: string): CompanhiaAerea[] => {
  if (!line) return [];

  const [country, companies] = line.split(":");

  if (!companies) return [];

  return companies
    .split(",")
    .map((company) => ({ country: country.trim(), company: company.trim() }));
};

// https://pt.wikipedia.org/wiki/Lista_de_companhias_a%C3%A9reas_em_atividade
const rasparPagina = Effect.fn("rasparPagina")(function* (
  page: Playwright.Page,
) {
  const elements = yield* page.locator(".mw-content-ltr li").all();
  const companiesByCountry = yield* Effect.all(
    elements.map((e) =>
      e
        .innerText()
        .pipe(
          Effect.catchTag(
            "PlaywrightError",
            (error) => new ElementNotFound({ locator: e, error }),
          ),
        ),
    ),
    {
      concurrency: 30, // 💎 concorrência é facinho
      mode: "result", // 💎 Muito tranquilo de lidar com erros da forma que for necessária, tipo descartar
    },
  );

  // 💎 Descartamos os erros mas notificamos no log
  const errors = EffectArray.getFailures(companiesByCountry);
  if (EffectArray.isReadonlyArrayNonEmpty(errors)) {
    yield* Effect.log("Deu merda aqui", errors);
  }

  const companhias = EffectArray.getSuccesses(companiesByCountry).reduce(
    (acc, curr) => [...acc, ...parseCompaniesFromLine(curr)],
    [] as CompanhiaAerea[],
  );

  // 💎 Validando as companhias no runtime
  return yield* Schema.decodeEffect(Schema.Array(CompanhiaAerea))(companhias);
});

// 💎 O programa pega os tipos dos erros e retornos e serviços a partir dos effect "children""
const program = Effect.gen(function* () {
  const playwright = yield* Playwright.Playwright;

  // 💎 Escopos lidam automaticamente com o "clean-up"
  // The browser is closed automatically when the scope ends.
  const browser = yield* playwright.launchScoped(chromium, {
    headless: true,
  });

  // #1 abrir a página
  const page = yield* browser.newPage();
  const a = page.locator("mw-content-ltr");
  a.all();

  // #2 navegar pra página e esperar que esteja tudo carregado
  // Effect.Effect<SuccessResult, Error, NecessaryServices>
  yield* page.goto(
    "https://pt.wikipedia.org/wiki/Lista_de_companhias_a%C3%A9reas_em_atividade",
    {
      waitUntil: "networkidle",
    },
  );

  const companhias = yield* rasparPagina(page);
  yield* Effect.log(companhias);
}).pipe(Effect.scoped, Effect.provide(Playwright.layer));

// 💎 Effects são preguiçosos, só rodam quando você manda
Effect.runPromise(program);



/**
  * Pra brincar além:
  *
  * 1. Effect HTTP APIs - gera um client automático com RPC que inclui o decoding/encoding dos schemas
  *     - Exemplo: eu tenho um Schema.DateTime:
  *
  const minhaDataNoMeioDosLimites = DateTime.clamp(queroViajar, { maximum: dataLimite, minimum: dateMinima })

  // Encoded: 2026-08-31T12:32:00.000Z
  // Decoded: DateTime
  Schema.DateTimeUtcFromString

  2. Telemetry pra saber quanto tempo cada effectizinho tá tomando

  3. Effect SQL
**/
