import { Wrapper } from "./Wrapper";

export type ExpressionHandler = {
    trigger:string;
    arguments:number;
    process: (self:Wrapper, args:Wrapper[]) => Wrapper
}