import { Command } from "./Command";
import { EndCommand } from "./EndCommand";
import { Expression } from "./Expression";
import { SingleCommand } from "./SingleCommand";
import { StartCommand } from "./StartCommand";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";
import { NumberWrapper } from "./NumberWrapper";
import { BoolWrapper } from "./BoolWrapper";
import { StringWrapper } from "./StringWrapper";
import { BranchCommand } from "./BranchCommand";

export class Terminal{
    public content:string = "";
    public running:boolean = false
    public currentCommand:Command|null = null
    private variables:Map<string, Wrapper> = new Map();

    public static wrap(value:string):Wrapper{
        if(value === 'true' || value === 'false') return new BoolWrapper(value === 'true')
        if(!isNaN(+value)) return new NumberWrapper(+value)
        if((/^".*"$/ && (value.match(/"/g) || []).length == 2)) return new StringWrapper(value.replace('"', ''))
        if((/^'.*'$/ && (value.match(/'/g) || []).length == 2)) return new StringWrapper(value.replace("'", ''))
        throw Error(value + " is not a boolean, number, or string")
    }

    public static tokenize(code:string):string[]{
        const tokens:string[] = []
        // + - * / = > < ! %
        const stackableOp:RegExp = /[\+\-\*\/\=\<\>\!\%]/
        const stringOp:RegExp = /['"]/
        var stringBuilder = ""
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            if(stringBuilder.length > 0){
                if(stringOp.test(stringBuilder[0])){
                    stringBuilder += char
                    if(stringBuilder[0] === char) pushStringBuilder()
                    continue;
                }

                if(stringOp.test(char)){
                    pushStringBuilder()
                    stringBuilder += char
                    continue
                }
            }
            if(/\s/.test(char)) {
                pushStringBuilder()
                continue;
            }
            // [ ] { } ( ) ; .
            if(/[\[\]\{\}\(\);.,]/.test(char)){
                if(char === '.' && /^[0-9]+$/.test(stringBuilder)){
                    stringBuilder += char
                    continue;
                }

                pushStringBuilder()
                tokens.push(char)
                continue;
            }
            if(stackableOp.test(char)){
                if(stringBuilder.length >= 2 || (stringBuilder.length > 0 && !stackableOp.test(stringBuilder))){
                    pushStringBuilder()
                }

                stringBuilder += char
                continue;
            }
            if(stackableOp.test(stringBuilder)){
                pushStringBuilder()
            }
            stringBuilder += char
        }
        pushStringBuilder()

        return tokens

        function pushStringBuilder(){
            if(stringBuilder.length > 0) {
                tokens.push(stringBuilder)
                stringBuilder = ""
            }
        }
    }

    public static checkVariableName(name:string):string{
        const variableRegex:RegExp = /^[a-zA-Z_][a-zA-Z0-9_]*$/
        if(variableRegex.test(name)) return name
        throw Error('invalid variable name')
    }

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
                wrapperValue = Terminal.wrap(value)
            }
            catch(err){
                // if value is not a variable name then throw an error for undefined variable
                wrapperValue = this.getVariable(variableName)
            }
        }

        this.variables.set(variableName, wrapperValue)
    }

    private _compile(codeTokens:string[]):{startCommand:Command, endCommands:Command[]}{

        const startCommand:StartCommand = new StartCommand(this)
        var placeholderCommands:Command[] = [startCommand]

        for (let i = 0; i < codeTokens.length; i++) {
            switch(codeTokens[i]){
                case "if" : {
                    if(codeTokens[++i] !== '(') throw Error('if syntax error, correct syntax ex. : if(a == "test"){ moveUp(); }')
                    const conditionTokens:string[] = [];
                    var bracketCounter = 1
                    while(bracketCounter > 0){
                        i++;
                        switch(codeTokens[i]){
                            case '(':
                                bracketCounter++;
                                break;
                            case ')':
                                bracketCounter--;
                                break;
                            default:
                                break;
                        }

                        if(bracketCounter > 0){
                            conditionTokens.push(codeTokens[i])
                        }
                    }

                    var condition:Expression|Wrapper|string;
                    if(conditionTokens.length == 1){
                        try{
                            condition = Terminal.wrap(conditionTokens[0])
                        }
                        catch(err){
                            condition = Terminal.checkVariableName(conditionTokens[0])
                        }
                    }
                    else{
                        condition = compileExpression(conditionTokens)
                    }

                    const temp = new BranchCommand(this, condition)
                    setNextCommand(temp);

                    // if true
                    if(codeTokens[++i] !== '{') {
                        const commandTokens:string[] = [codeTokens[i]];
                        while(codeTokens[++i] !== ';'){
                            commandTokens.push(codeTokens[i])
                        }

                        const compiledCommand = compileSingleCommand(this, commandTokens)
                        temp.setTrueNextCommand(compiledCommand)
                        placeholderCommands = [compiledCommand]
                        
                    }
                    else{
                        const codeBlockTokens:string[] = [codeTokens[++i]];
                        var bracketCounter = 1;
                        while(bracketCounter > 0){
                            switch(codeTokens[++i]){
                                case '{':
                                    bracketCounter++;
                                    break;
                                case '}':
                                    bracketCounter--;
                                    break;
                                default:
                                    break;
                            }
    
                            if(bracketCounter > 0){
                                codeBlockTokens.push(codeTokens[i])
                            }
                        }
                        const compiledBlockCommands = this._compile(codeBlockTokens)
                        temp.setTrueNextCommand(compiledBlockCommands.startCommand)
                        placeholderCommands = [...compiledBlockCommands.endCommands]
                    }

                    // if false
                    if(codeTokens[++i] === 'else'){
                        if(codeTokens[++i] !== '{') {
                            const commandTokens:string[] = [codeTokens[i]];
                            while(codeTokens[++i] !== ';'){
                                commandTokens.push(codeTokens[i])
                            }
    
                            const compiledCommand = compileSingleCommand(this, commandTokens)
                            temp.setFalseNextCommand(compiledCommand)
                            placeholderCommands.push(compiledCommand)
                            
                        }
                        else{
                            const codeBlockTokens:string[] = [codeTokens[++i]];
                            var bracketCounter = 1;
                            while(bracketCounter > 0){
                                switch(codeTokens[++i]){
                                    case '{':
                                        bracketCounter++;
                                        break;
                                    case '}':
                                        bracketCounter--;
                                        break;
                                    default:
                                        break;
                                }
        
                                if(bracketCounter > 0){
                                    codeBlockTokens.push(codeTokens[i])
                                }
                            }
                            const compiledBlockCommands = this._compile(codeBlockTokens)
                            temp.setFalseNextCommand(compiledBlockCommands.startCommand)
                            placeholderCommands = [...placeholderCommands, ...compiledBlockCommands.endCommands]
                        }
                    }
                    else{
                        placeholderCommands.push(temp)
                    }

                } break;
                case "while" : {

                } break;
                case "for" : {

                } break;
                default : {
                    const commandTokens:string[] = [];
                    do{
                        commandTokens.push(codeTokens[i])
                    }while(codeTokens[++i] !== ';');

                    const compiledCommand = compileSingleCommand(this, commandTokens)
                    setNextCommand(compiledCommand)
                    placeholderCommands = [compiledCommand]
                } break;
            }
        }

        return {
            startCommand: startCommand.getNextCommand(),
            endCommands: placeholderCommands
        }
        throw Error('Method not implemented')

        function compileSingleCommand(terminal:Terminal, commandTokens:string[]):SingleCommand{
            const assignment = commandTokens.includes('=')
            var variable:string|undefined = undefined;
            var expression:Expression;

            if(assignment && commandTokens.indexOf('=') != 1) throw Error('invalid assignment syntax, valid ex. a = 3')
            if(assignment){
                if(Terminal.checkVariableName(commandTokens[0])){
                    variable = commandTokens[0]
                    expression = compileExpression(commandTokens.slice(2))
                }
                else throw Error('invalid variable name')
            }
            else{
                expression = compileExpression(commandTokens)
            }

            return new SingleCommand(terminal, expression, null, variable)
        }

        function compileExpression(expTokens:string[]):Expression{
            throw Error('Function not implemented')
        }

        function setNextCommand(command:Command){
            placeholderCommands.forEach(x => {
                if(x instanceof SingleCommand) x.setNextCommand(command)
                if(x instanceof BranchCommand) x.setFalseNextCommand(command)
            })
        }
    }

    public compile():void{
        //this.currentCommand = this._compile(Terminal.tokenize(this.content)).startCommand
        
    }

    public execute():void{
        this.running = true
        alert(Terminal.tokenize(this.content))
    }

    public stop():void{
        this.running = false
    }
}