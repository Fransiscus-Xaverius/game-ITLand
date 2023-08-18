import { Wrapper } from "./Wrapper";

export class NumberWrapper extends Wrapper{
    constructor(value:number){
        super(value);
    }

    public getValue():number {
        return super.getValue();
    }

    public setValue(value:number){
        super.setValue(value);
    }
}