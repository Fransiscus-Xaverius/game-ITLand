import { BoolWrapper } from "./BoolWrapper";
import { ExpressionHandler } from "./ExpressionHandler";
import { StringWrapper } from "./StringWrapper";
import { Wrapper } from "./Wrapper";

export class NumberWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            trigger:"",
            arguments:0,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            trigger:".",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                switch(args[0].getValue()){
                    case 'toString()':
                        return new StringWrapper(self.getValue().toString());
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a number");
                }
            }
        },
        {
            trigger:"+",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() + arg.getValue())
                throw new Error("you can't add " + self.getValue() + " and " + arg.getValue())
            }
        },
        {
            trigger:"-",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() - arg.getValue())
                throw new Error("you can't subtract " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            trigger:"*",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() * arg.getValue())
                throw new Error("you can't multiply " + self.getValue() + " with " + arg.getValue())
            }
        },
        {
            trigger:"/",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() / arg.getValue())
                throw new Error("you can't divide " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            trigger:"%",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() % arg.getValue())
                throw new Error("you can't mod " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            trigger:"==",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() == arg.getValue())
                return new BoolWrapper(false)
            }
        },
        {
            trigger:"!=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() != arg.getValue())
                return new BoolWrapper(true)
            }
        },
        {
            trigger:"<=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() <= arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            trigger:">=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() >= arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            trigger:"<",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() < arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            trigger:">",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() > arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
    ]

    constructor(value:number){
        super(value);
        this.type="number"
    }

    public processExpression(trigger: string, args: Wrapper[]): Wrapper {
        const argCount = args.length
        const expHandler = NumberWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount
        })

        if(!expHandler) throw Error("this operator, '" + trigger + "' doesn't exist for number")
        return expHandler.process(this, args);
    }

    public getValue():number {
        return super.getValue();
    }

    public setValue(value:number){
        super.setValue(value);
    }
}