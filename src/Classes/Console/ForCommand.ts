import { Command } from "./Command";
import { Terminal } from "./Terminal";

export class ForCommand extends Command{
    public Execute(terminal: Terminal, scope?: Command | undefined): void {
        throw new Error("Method not implemented.");
    }
    
}