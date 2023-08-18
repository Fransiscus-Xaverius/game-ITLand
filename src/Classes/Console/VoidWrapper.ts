import { ExpressionHandler } from "./ExpressionHandler";
import { Wrapper } from "./Wrapper";

export class VoidWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        
    ]

    constructor(){
        super(null);
    }

    public getValue():null {
        return super.getValue();
    }

    public setValue(value:null){
        super.setValue(value);
    }
}