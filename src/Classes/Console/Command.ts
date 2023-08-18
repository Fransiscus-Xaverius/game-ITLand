import { Terminal } from "./Terminal";

export abstract class Command{
    protected terminal:Terminal
    constructor(terminal:Terminal){
        this.terminal = terminal
    }
    public abstract Execute():void;
}