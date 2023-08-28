import { ExpressionHandler } from "./ExpressionHandler"

export abstract class Wrapper {
    private value:any = null
    static processes:ExpressionHandler[] = []

    constructor(value:any){
        this.setValue(value)
    }

    public log(){
        console.log(this.value)
    }

    public processExpression(trigger:string, args:Wrapper[]):Wrapper{
        const argCount = args.length
        const expHandler = Wrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount
        })

        if(!expHandler) throw Error('something is wrong with what you wrote')
        return expHandler.process(this, args);
    }

    public getValue():any{
        return this.value
    }

    public setValue(value:any){
        this.value = value
    }
}