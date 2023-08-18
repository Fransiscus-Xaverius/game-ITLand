import { Command } from "./Command";
import { Expression } from "./Expression";
import { Terminal } from "./Terminal";
import { VoidWrapper } from "./VoidWrapper";
import { WaitWrapper } from "./WaitWrapper";

export class SingleCommand extends Command{
    private nextCommand:Command
    private expression:Expression
    private variableToSet?:string

    private asyncTask:string|null

    constructor(terminal:Terminal, expression:Expression, nextCommand:Command, variableToSet?:string){
        super(terminal)
        this.nextCommand = nextCommand
        this.expression = expression
        this.asyncTask = null
    }

    public jumpNextCommand(): Command{
        this.terminal.currentCommand = this.nextCommand
        return this.nextCommand
    }

    public getAsyncTask():string|null{
        return this.asyncTask
    }

    public isSynced():boolean{
        return this.asyncTask == null
    }

    public Execute(): void {
        if(!this.isSynced()) return;
        const result = this.expression.getResult()
        if(this.variableToSet){
            if(result instanceof VoidWrapper) throw Error("you can't put nothing in variable " + this.variableToSet)
            this.terminal.setVariable(this.variableToSet, result)
        }
        if(result instanceof WaitWrapper){
            this.asyncTask = result.command
            return;
        }
        if(this.isSynced()) this.jumpNextCommand()
        throw new Error("Method not implemented.");
    }
    
}