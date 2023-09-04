import { AnyJson } from "utils/any-json";

export interface Response<D = undefined> {
    data: D;
    status: number;
    meta?: AnyJson;
}