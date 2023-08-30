import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { Command } from "./Command";
import { PlayerWrapper } from "./PlayerWrapper";
import { Terminal } from "./Terminal";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";

export class Expression{
    private terminal:Terminal
    private first:Expression|Wrapper|string|null
    private trigger:string|null
    private args:(Expression|Wrapper|string)[]|null

    constructor(terminal:Terminal, trigger:string|null = null, first:Expression|Wrapper|string|null = null, args:(Expression|Wrapper|string)[]|null = null){
        this.terminal = terminal
        this.first = first
        this.trigger = trigger
        this.args = args
    }

    public setFirst(value:Expression|Wrapper|string|null):void{
        this.first = value
    }

    public getFirst():Expression|Wrapper|string|null{
        return this.first
    }

    public setArgs(value:(Expression|Wrapper|string)[]|null):void{
        this.args = value
    }

    public addArg(value:Expression|Wrapper|string):void{
        if(this.args == null) this.args = []
        this.args.push(value)
    }

    public getArgs():(Expression|Wrapper|string)[]|null{
        return this.args
    }

    public setTrigger(value:string|null):void{
        this.trigger = value
    }

    public isSelfExpression():boolean{
        return this.trigger == null && this.args == null && this.first != null
    }

    public getResult(): Wrapper {
        if(this.first == null) throw Error('something went wrong with the expression, the first is null')

        const first = this.first instanceof Wrapper ? 
            this.first : 
            this.first instanceof Expression ? 
                this.first.getResult() : 
                this.terminal.getVariable(this.first)
        ;

        if(this.trigger == null && this.args == null){
            return first;
        } 

        if(this.args == null || this.trigger == null) throw Error('something went wrong with the expression, the args or the trigger is null')
        if(this.first instanceof VoidWrapper) throw Error('there is something wrong with your code, this.first returns void')

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