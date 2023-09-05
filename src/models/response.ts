import { AnyJson } from "utils/any-json";

export interface ResponseError {
    fields: Record<string, string>;
    code: string;
}

export interface Response<D = undefined> {
    data: D;
    status: number;
    meta?: AnyJson;
    error?: ResponseError;
    token?: string;
}