import { Wrapper } from "./Wrapper";

export class BoolWrapper extends Wrapper{
    constructor(value:boolean){
        super(value);
    }

    public getValue():boolean {
        return super.getValue();
    }

    public setValue(value:boolean){
        super.setValue(value);
    }
}