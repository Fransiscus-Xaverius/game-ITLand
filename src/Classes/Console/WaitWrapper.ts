import { ExpressionHandler } from "./ExpressionHandler";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";

export class WaitWrapper extends VoidWrapper{

    public readonly command:string;

    constructor(command:string){
        super()
        this.command = command;
    }
}