import { BoolWrapper } from "./BoolWrapper"
import { ExpressionHandler } from "./ExpressionHandler"
import { NumberWrapper } from "./NumberWrapper"
import { StringWrapper } from "./StringWrapper"

export abstract class Wrapper {
    private value:any = null
    static processes:ExpressionHandler[] = []

    constructor(value:any){
        this.setValue(value)
    }

    public static wrap(value:string):Wrapper{
        if(value === 'true' || value === 'false') return new BoolWrapper(value === 'true')
        if(!isNaN(+value)) return new NumberWrapper(+value)
        if(value.startsWith('"') && value.endsWith('"') && (value.match(/"/g) || []).length == 2) return new StringWrapper(value.replace('"', ''))
        throw Error('hmmm, something is weird with ' + value)
    }

    public processExpression(trigger:string, args:Wrapper[]):Wrapper{
        throw new Error("There's something wrong with your code");
    }

    public getValue():any{
        return this.value
    }

    public setValue(value:any){
        this.value = value
    }
}