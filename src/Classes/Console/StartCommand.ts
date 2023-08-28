import { Command } from "./Command";
import { EndCommand } from "./EndCommand";
import { Terminal } from "./Terminal";

export class StartCommand extends Command{
    private nextCommand:Command
    constructor(terminal:Terminal, nextCommand?:Command){
        super(terminal)
        this.nextCommand = nextCommand ?? new EndCommand(terminal)
    }

    public getNextCommand():Command{
        return this.nextCommand
    }

    public setNextCommand(value:Command){
        this.nextCommand = value
    }

    public jumpNextCommand(): Command{
        this.terminal.currentCommand = this.nextCommand
        return this.nextCommand
    }

    public Execute(): void {
        this.jumpNextCommand()
    }
    
}