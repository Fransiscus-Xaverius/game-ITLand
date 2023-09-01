import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { ExpressionHandler } from "./ExpressionHandler";
import { VoidWrapper } from "./VoidWrapper";
import { WaitWrapper } from "./WaitWrapper";
import { Wrapper } from "./Wrapper";

export class PlayerWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            trigger:"",
            arguments:0,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            trigger:".",
            arguments:1,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'moveUp()':
                        return new WaitWrapper('move up 1');
                    case 'moveDown()':
                        return new WaitWrapper('move down 1');
                    case 'moveLeft()':
                        return new WaitWrapper('move left 1');
                    case 'moveRight()':
                        return new WaitWrapper('move right 1');
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
                }
            }
        },
        {
            trigger:".",
            arguments:2,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'moveUp()':
                        return new WaitWrapper('move up ' + args[1].getValue());
                    case 'moveDown()':
                        return new WaitWrapper('move down ' + args[1].getValue());
                    case 'moveLeft()':
                        return new WaitWrapper('move left ' + args[1].getValue());
                    case 'moveRight()':
                        return new WaitWrapper('move right ' + args[1].getValue());
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
                }
            }
        },
        
    ]

    constructor(value:PlayerUnit){
        super(value);
    }

    public processExpression(trigger:string, args:Wrapper[]):Wrapper{
        const argCount = args.length
        const expHandler = PlayerWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount
        })

        if(!expHandler) throw Error('something is wrong with what you wrote')
        return expHandler.process(this, args);
    }

    public getValue():PlayerUnit {
        return super.getValue();
    }

    public setValue(value:PlayerUnit){
        super.setValue(value);
    }
}