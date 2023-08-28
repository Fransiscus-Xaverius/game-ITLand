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

    public processExpression(trigger: string, args: Wrapper[]): Wrapper {
        if(!trigger) this.log()
        const handler = StringWrapper.processes.find(x => x.trigger === trigger)
    
        if(!handler)throw new Error("There's something wrong with your code");
        return handler.process(this, args);
    }

    public getValue():string {
        return super.getValue();
    }

    public setValue(value:string){
        super.setValue(value);
    }
}