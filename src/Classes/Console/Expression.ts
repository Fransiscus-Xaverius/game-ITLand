import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { Command } from "./Command";
import { PlayerWrapper } from "./PlayerWrapper";
import { Terminal } from "./Terminal";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";

export class Expression{
    private terminal:Terminal
    private first:Expression|Wrapper|string
    private trigger:string
    private args:(Expression|Wrapper|string)[]

    constructor(terminal:Terminal, first:Expression|Wrapper, trigger:string, args:(Expression|Wrapper)[] = []){
        this.terminal = terminal
        this.first = first
        this.trigger = trigger
        this.args = args
    }

    public getResult(): Wrapper {
        const first = this.first instanceof Wrapper ? 
            this.first : 
            this.first instanceof Expression ? 
                this.first.getResult() : 
                this.terminal.getVariable(this.first)
        ;

        if(this.first instanceof VoidWrapper) throw Error('there is something wrong with your code')

        const args:Wrapper[] = []
        for (let index = 0; index < this.args.length; index++) {
            const item = this.args[index]
            args[index] =  item instanceof Wrapper ? 
                item : 
                item instanceof Expression ?
                    item.getResult(): 
                    this.terminal.getVariable(item)
            ;

            if(args[index] instanceof VoidWrapper) throw Error('there is something wrong with your code')
        }

        return first.processExpression(this.trigger, args)
    }
    
} 