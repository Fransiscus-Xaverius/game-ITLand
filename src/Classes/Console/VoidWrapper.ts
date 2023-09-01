import { ExpressionHandler } from "./ExpressionHandler";
import { Wrapper } from "./Wrapper";

export class VoidWrapper extends Wrapper{
    constructor(){
        super(null);
    }

    public getValue():null {
        return super.getValue();
    }

    public setValue(value:null){
        super.setValue(value);
        this.type = "void"
    }
}