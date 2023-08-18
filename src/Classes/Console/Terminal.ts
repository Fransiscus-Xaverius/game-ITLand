import { Command } from "./Command";
import { Wrapper } from "./Wrapper";

export class Terminal{
    public content:string = "";
    public running:boolean = false
    public currentCommand:Command|null = null
    private variables:Map<string, Wrapper> = new Map();

    public getVariable(variableName:string):Wrapper{
        const value = this.variables.get(variableName)
        if(value) return value
        throw Error('Variable ' + variableName + ' is not defined')
    }

    public setVariable(variableName:string, value:string|Wrapper){
        var wrapperValue:Wrapper;
        if(value instanceof Wrapper) wrapperValue = value
        else{
            try{
                // if this fails it means value is most likely a variable name
                wrapperValue = Wrapper.wrap(value)
            }
            catch(err){
                // if value is not a variable name then throw an error for undefined variable
                wrapperValue = this.getVariable(variableName)
            }
        }

        this.variables.set(variableName, wrapperValue)
    }

    public compile():void{
        
    }

    public execute():void{
        this.running = true
        alert(this.content)
    }

    public stop():void{
        this.running = false
    }
}