import { Strategy } from "passport-jwt";
import { Payload } from "./jwt.payload";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    constructor();
    validate(payload: Payload): Promise<true>;
}
export {};
