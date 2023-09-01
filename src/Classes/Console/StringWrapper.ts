import { BoolWrapper } from "./BoolWrapper";
import { ExpressionHandler } from "./ExpressionHandler";
import { NumberWrapper } from "./NumberWrapper";
import { Wrapper } from "./Wrapper";

export class StringWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            trigger:"",
            arguments:0,
            process:(self:StringWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            trigger:".",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'toNumber()':
                        const val:number = +self.getValue()
                        return new NumberWrapper(val);
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a string");
                }
            }
        },
        {
            trigger:"+",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                if(arg instanceof StringWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                throw new Error("you can't add " + self.getValue() + " and " + arg.getValue())
            }
        },
        {
            trigger:"==",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new BoolWrapper(self.getValue() == arg.getValue())
                return new BoolWrapper(false)
            }
        },
        {
            trigger:"!=",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new BoolWrapper(self.getValue() != arg.getValue())
                return new BoolWrapper(true)
            }
        },
    ]

    constructor(value:string){
        super(value);
    }

    public processExpression(trigger: string, args: Wrapper[]): Wrapper {
        const argCount =  args.length
        const expHandler = BoolWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount
        })

        if(!expHandler) throw Error("this operator, '" + trigger + "' doesn't exist for string")
        return expHandler.process(this, args);
    }

    public getValue():string {
        return super.getValue();
    }

    public setValue(value:string){
        super.setValue(value);
    }
}