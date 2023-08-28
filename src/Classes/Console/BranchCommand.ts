import { Command } from "./Command";
import { Terminal } from "./Terminal";
import { Expression } from "./Expression";
import { Wrapper } from "./Wrapper";

export class BranchCommand extends Command{
    private condition:Expression|Wrapper|string
    private trueNextCommand:Command|null
    private falseNextCommand:Command|null

    constructor(terminal:Terminal, condition:Expression|Wrapper|string, trueNextCommand:Command|null = null, falseNextCommand:Command| null = null) {
        super(terminal);
        this.condition = condition
        this.trueNextCommand = trueNextCommand
        this.falseNextCommand = falseNextCommand
    }

    public setTrueNextCommand(value:Command){
        this.trueNextCommand = value
    }

    public setFalseNextCommand(value:Command){
        this.falseNextCommand = value
    }

    public Execute(): void {
        if(!this.trueNextCommand || !this.falseNextCommand)throw new Error("true and false nextCommands needs to be instantiated");
        const condition = this.condition instanceof Wrapper ? 
            this.condition : 
            this.condition instanceof Expression ? 
                this.condition.getResult() : 
                this.terminal.getVariable(this.condition)
        ;

        this.terminal.currentCommand = condition.getValue() ?
            this.trueNextCommand :
            this.falseNextCommand
        ;

    }
}