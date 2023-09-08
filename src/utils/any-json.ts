
type Primitives = number | string | undefined | null;
export type AnyJson = { [key: string]: Array<Primitives> | AnyJson | Primitives } | FormData;
