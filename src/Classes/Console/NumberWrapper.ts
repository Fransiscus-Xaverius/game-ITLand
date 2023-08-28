import { Wrapper } from "./Wrapper";

export class NumberWrapper extends Wrapper{
    constructor(value:number){
        super(value);
    }

    public processExpression(trigger: string, args: Wrapper[]): Wrapper {
        const argCount = args.length
        const expHandler = Wrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount
        })

        if(!expHandler) throw Error('something is wrong with what you wrote')
        return expHandler.process(this, args);
    }

    public getValue():number {
        return super.getValue();
    }

    public setValue(value:number){
        super.setValue(value);
    }
}