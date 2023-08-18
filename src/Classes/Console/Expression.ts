import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { Command } from "./Command";
import { PlayerWrapper } from "./PlayerWrapper";
import { Terminal } from "./Terminal";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";

export class Expression{
    private first:Expression|Wrapper
    private trigger:string
    private args:(Expression|Wrapper)[]

    constructor(first:Expression|Wrapper, trigger:string, args:(Expression|Wrapper)[] = []){
        this.first = first
        this.trigger = trigger
        this.args = args
    }

    public getResult(): Wrapper {
        const first = this.first instanceof Wrapper ? this.first : this.first.getResult()
        if(this.first instanceof VoidWrapper) throw Error('there is something wrong with your code')

        const args:Wrapper[] = []
        for (let index = 0; index < this.args.length; index++) {
            const item = this.args[index]
            if(item instanceof VoidWrapper) throw Error('there is something wrong with your code')
            args[index] =  item instanceof Wrapper ? item : item.getResult();
        }

        return first.processExpression(this.trigger, args)
    }
    
} 