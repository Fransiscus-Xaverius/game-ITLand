import { Command } from "./Command";
import { Terminal } from "./Terminal";

export class EndCommand extends Command{
    constructor(terminal:Terminal){
        super(terminal)
    }

    public Execute(): void {
    }
    
}