import { ExpressionHandler } from "./ExpressionHandler";
import { Wrapper } from "./Wrapper";

export class StringWrapper extends Wrapper{
    static functions:ExpressionHandler[] = [
        
    ]

    static procedures:ExpressionHandler[] = [
        
    ]

    constructor(value:string){
        super(value);
    }

    public getValue():string {
        return super.getValue();
    }

    public setValue(value:string){
        super.setValue(value);
    }
}