import { Data } from 'effect';


export class HttpError extends Data.TaggedError("HttpError")<{ status: number; statusText: string; body: string }> { }
export class NetwoerkError extends Data.TaggedError("NetworkError")<{ error: unknown }> { }
export class MissingApiKey extends Data.TaggedError("MissingApiKey")<{}> { }
export class InvalidFilter extends Data.TaggedError("InvalidFilter")<{ message: string }> { }

export * from "./costDocument";