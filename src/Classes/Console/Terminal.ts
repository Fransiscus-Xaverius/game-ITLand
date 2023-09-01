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
import { ExpressionHandler } from "./ExpressionHandler";
import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { PlayerWrapper } from "./PlayerWrapper";

export class Terminal{
    public content:string = "";
    public running:boolean = false
    public currentCommand:Command|null = null
    private variables:Map<string, Wrapper> = new Map();
    private player:PlayerWrapper;
    private globalExpressionHandlers:ExpressionHandler[] = [
        {
            trigger:".",
            arguments:1,
            process:(self:VoidWrapper, args:Wrapper[])=>{
                switch(args[0].getValue()){
                    case 'alert()':
                        console.log('alert')
                        return new StringWrapper('alert!');
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist globally");
                }
            }
        },
        {
            trigger:".",
            arguments:2,
            process:(self:VoidWrapper, args:Wrapper[])=>{
                switch(args[0].getValue()){
                    case 'alert()':
                        console.log(args[1].getValue())
                        return args[1];
                    default:
                        throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
                }
            }
        },
        {
            trigger:".",
            arguments:3,
            process:(self:VoidWrapper, args:Wrapper[])=>{
                switch(args[0].getValue()){
                    case 'random()':
                        if(args[1] instanceof NumberWrapper && args[2] instanceof NumberWrapper) return new NumberWrapper(Math.floor(Math.random()*args[2].getValue() + args[1].getValue()));
                    default:
                        throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
                }
            }
        },
        {
            trigger:"-",
            arguments:1,
            process:(self:VoidWrapper, args:Wrapper[])=>{
                if(args[0] instanceof NumberWrapper) return new NumberWrapper(-args[0].getValue())
                throw Error("you tried to negate " + args[0].getValue() + ", you can't negate things that aren't numbers")
            }
        },
        {
            trigger:"!",
            arguments:1,
            process:(self:VoidWrapper, args:Wrapper[])=>{
                if(args[0] instanceof BoolWrapper) return new BoolWrapper(!args[0].getValue())
                throw Error("you tried to use the not operator (!) on " + args[0].getValue() + ", you can't do this to things that aren't booleans")
            }
        },
    ]

    constructor(playerUnit:PlayerUnit){
        this.player = new PlayerWrapper(playerUnit)
    }

    public static wrap(value:string):Wrapper{
        if(value === 'true' || value === 'false') return new BoolWrapper(value === 'true')
        if(!isNaN(+value)) return new NumberWrapper(+value)
        if((/^".*"$/ && (value.match(/"/g) || []).length == 2)) return new StringWrapper(value.replace(/"/g, ''))
        if((/^'.*'$/ && (value.match(/'/g) || []).length == 2)) return new StringWrapper(value.replace(/'/g, ''))
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
                    if(i == code.length - 1) throw Error('there is an open string, missing "/\' ')
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

    public processGlobalExpression(trigger:string, args:Wrapper[]):Wrapper{
        const expHandler = this.globalExpressionHandlers.find(x => {
            return x.trigger === trigger && x.arguments == args.length
        })

        if(!expHandler) {
            try{
                return this.player.processExpression(trigger,args);
            }
            catch(err){
                throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
            }
        }

        try{
            return expHandler.process(new VoidWrapper(), args);
        }
        catch(err1){
            try{
                return this.player.processExpression(trigger,args);
            }
            catch(err2){
                throw err1;
            }
        }
        
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
                        if(i >= codeTokens.length) throw Error('there is an opened bracket, missing )')
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
                        condition = this.compileExpression(conditionTokens)
                    }

                    var temp = new BranchCommand(this, condition)
                    setNextCommand(temp);

                    // if true
                    if(codeTokens[++i] !== '{') {
                        const commandTokens:string[] = [codeTokens[i]];
                        while(codeTokens[++i] !== ';'){
                            if(i >= codeTokens.length) throw Error('missing curly braces, if ex. if(true){moveRight();}')
                            commandTokens.push(codeTokens[i])
                        }

                        const compiledCommand = this.compileSingleCommand(this, commandTokens)
                        temp.setTrueNextCommand(compiledCommand)
                        placeholderCommands = [compiledCommand]
                        
                    }
                    else{
                        const codeBlockTokens:string[] = [codeTokens[++i]];
                        var bracketCounter = 1;
                        if(codeTokens[i] === '}'){
                            const empty = new StartCommand(this)
                            temp.setTrueNextCommand(empty)
                            placeholderCommands = [empty]
                        }
                        else{

                            while(bracketCounter > 0){
                                if(i >= codeTokens.length) throw Error('there is an open curly bracket, missing }')
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
                    }

                    while(codeTokens[i+1] === 'else' && codeTokens[i+2] === 'if'){
                        i += 2
                        if(codeTokens[++i] !== '(') throw Error('if syntax error, correct syntax ex. : if(a == "test"){ moveUp(); }')
                        const conditionTokens:string[] = [];
                        var bracketCounter = 1
                        while(bracketCounter > 0){
                            i++;
                            if(i >= codeTokens.length) throw Error('there is an opened bracket, missing )')
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
                            condition = this.compileExpression(conditionTokens)
                        }

                        const elseif = new BranchCommand(this, condition)
                        temp.setFalseNextCommand(elseif)
                        temp = elseif;

                        // if true
                        if(codeTokens[++i] !== '{') {
                            const commandTokens:string[] = [codeTokens[i]];
                            while(codeTokens[++i] !== ';'){
                                if(i >= codeTokens.length) throw Error('missing curly braces, if ex. if(true){moveRight();}')
                                commandTokens.push(codeTokens[i])
                            }

                            const compiledCommand = this.compileSingleCommand(this, commandTokens)
                            temp.setTrueNextCommand(compiledCommand)
                            placeholderCommands = [...placeholderCommands, compiledCommand]
                            
                        }
                        else{
                            const codeBlockTokens:string[] = [codeTokens[++i]];
                            var bracketCounter = 1;
                            if(codeTokens[i] === '}'){
                                const empty = new StartCommand(this)
                                temp.setTrueNextCommand(empty)
                                placeholderCommands = [...placeholderCommands, empty]
                            }
                            else{

                                while(bracketCounter > 0){
                                    if(i >= codeTokens.length) throw Error('there is an open curly bracket, missing }')
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
                                placeholderCommands = [...placeholderCommands, ...compiledBlockCommands.endCommands]

                            }
                        }
                    }

                    // if false
                    if(codeTokens[++i] === 'else'){
                        if(codeTokens[++i] !== '{') {
                            const commandTokens:string[] = [codeTokens[i]];
                            while(codeTokens[++i] !== ';'){
                                if(i >= codeTokens.length) throw Error('missing curly braces, if ex. if(true){moveRight();}')
                                commandTokens.push(codeTokens[i])
                            }
    
                            const compiledCommand = this.compileSingleCommand(this, commandTokens)
                            temp.setFalseNextCommand(compiledCommand)
                            placeholderCommands.push(compiledCommand)
                            
                        }
                        else{
                            const codeBlockTokens:string[] = [codeTokens[++i]];
                            var bracketCounter = 1;
                            if(codeTokens[i] === '}'){
                                const empty = new StartCommand(this)
                                temp.setFalseNextCommand(empty)
                                placeholderCommands = [...placeholderCommands, empty]
                            }
                            else{
                                while(bracketCounter > 0){
                                    if(i >= codeTokens.length) throw Error('there is an open curly bracket, missing }')
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
                    }
                    else{
                        placeholderCommands.push(temp)
                    }

                } break;
                case "while" : {
                    if(codeTokens[++i] !== '(') throw Error('while syntax error, correct syntax ex. : while(a == "up"){ moveUp(); }')
                    const conditionTokens:string[] = [];
                    var bracketCounter = 1
                    while(bracketCounter > 0){
                        i++;
                        if(i >= codeTokens.length) throw Error('there is an opened bracket, missing )')
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
                        condition = this.compileExpression(conditionTokens)
                    }

                    var temp = new BranchCommand(this, condition)
                    setNextCommand(temp);

                    // if true
                    if(codeTokens[++i] !== '{') {
                        const commandTokens:string[] = [codeTokens[i]];
                        while(codeTokens[++i] !== ';'){
                            if(i >= codeTokens.length) throw Error('missing curly braces, if ex. if(true){moveRight();}')
                            commandTokens.push(codeTokens[i])
                        }

                        const compiledCommand = this.compileSingleCommand(this, commandTokens)
                        temp.setTrueNextCommand(compiledCommand)
                        placeholderCommands = [compiledCommand]
                        
                    }
                    else{
                        const codeBlockTokens:string[] = [codeTokens[++i]];
                        var bracketCounter = 1;
                        if(codeTokens[i] === '}'){
                            const empty = new StartCommand(this)
                            temp.setTrueNextCommand(empty)
                            placeholderCommands = [empty]
                        }
                        else{

                            while(bracketCounter > 0){
                                if(i >= codeTokens.length) throw Error('there is an open curly bracket, missing }')
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
                    }
                    setNextCommand(temp)
                    placeholderCommands = [temp]
                } break;
                case "for" : {
                    if(codeTokens[++i] !== '(') throw Error('for syntax error, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }')
                    const commandTokens:string[] = []
                    var bracketCounter = 1
                    while(bracketCounter > 0){
                        i++;
                        if(i >= codeTokens.length) throw Error('there is an opened bracket, missing )')
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
                            commandTokens.push(codeTokens[i])
                        }
                    }

                    if(commandTokens[1] !== '=')throw Error('for syntax error, it needs to have an assignment, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }')
                    const splitIndex = commandTokens.indexOf('to')
                    if(splitIndex == -1) throw Error("for syntax error, it needs to have a 'to' keyword, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }")
                    const assignmentCommand = this.compileSingleCommand(this, commandTokens.slice(0,splitIndex))
                    const targetExpression = this.compileExpression(commandTokens.slice(splitIndex+1))
                    const conditionExpression = new Expression(this, "<=", commandTokens[0],[targetExpression])
                    const incrementCommand = this.compileSingleCommand(this, [commandTokens[0],'=',commandTokens[0],'+','1'])
                    const conditionCommand = new BranchCommand(this,conditionExpression)
                    setNextCommand(assignmentCommand)
                    assignmentCommand.setNextCommand(conditionCommand)
                    incrementCommand.setNextCommand(conditionCommand)
                    placeholderCommands = [conditionCommand]

                    if(codeTokens[++i] !== '{') {
                        const commandTokens:string[] = [codeTokens[i]];
                        while(codeTokens[++i] !== ';'){
                            if(i >= codeTokens.length) throw Error('missing curly braces, if ex. if(true){moveRight();}')
                            commandTokens.push(codeTokens[i])
                        }

                        const compiledCommand = this.compileSingleCommand(this, commandTokens)
                        conditionCommand.setTrueNextCommand(compiledCommand)
                        compiledCommand.setNextCommand(incrementCommand)
                        
                    }
                    else{
                        const codeBlockTokens:string[] = [codeTokens[++i]];
                        var bracketCounter = 1;
                        if(codeTokens[i] === '}'){
                            const empty = new StartCommand(this)
                            conditionCommand.setTrueNextCommand(empty)
                            empty.setNextCommand(incrementCommand)
                        }
                        else{

                            while(bracketCounter > 0){
                                if(i >= codeTokens.length) throw Error('there is an open curly bracket, missing }')
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
                            conditionCommand.setTrueNextCommand(compiledBlockCommands.startCommand)
                            compiledBlockCommands.endCommands.forEach(x => {
                                if(x instanceof StartCommand) x.setNextCommand(incrementCommand)
                                if(x instanceof SingleCommand) x.setNextCommand(incrementCommand)
                                if(x instanceof BranchCommand) x.setFalseNextCommand(incrementCommand)
                            })
                        }
                    }
                } break;
                default : {
                    if(codeTokens[i] === ';') continue
                    const commandTokens:string[] = [];
                    do{
                        commandTokens.push(codeTokens[i])
                        if(i > codeTokens.length) throw Error('missing ;')
                    }while(codeTokens[++i] !== ';');

                    const compiledCommand = this.compileSingleCommand(this, commandTokens)
                    setNextCommand(compiledCommand)
                    placeholderCommands = [compiledCommand]

                } break;
            }
        }

        return {
            startCommand: startCommand.getNextCommand(),
            endCommands: placeholderCommands
        }

        

        
        function setNextCommand(command:Command){
            placeholderCommands.forEach(x => {
                if(x instanceof StartCommand) x.setNextCommand(command)
                if(x instanceof SingleCommand) x.setNextCommand(command)
                if(x instanceof BranchCommand) x.setFalseNextCommand(command)
            })
        }
    }

    private compileSingleCommand(terminal:Terminal, commandTokens:string[]):SingleCommand{
        const assignment = commandTokens.includes('=')
        var variable:string = "";
        var expression:Expression;

        if(assignment && commandTokens.indexOf('=') != 1) throw Error('invalid assignment syntax, valid ex. a = 3')
        if(assignment){
            if(Terminal.checkVariableName(commandTokens[0])){
                variable = commandTokens[0]
                expression = this.compileExpression(commandTokens.slice(2))
            }
            else throw Error('invalid variable name')
        }
        else{
            expression = this.compileExpression(commandTokens)
        }

        return new SingleCommand(terminal, expression, null, variable)
    }

    private compileExpression(expTokens:string[]):Expression{
        const globalSymbol:string = '@g'
        const postfixedTokens:string[] = []
        const postfixOps:string[]  = []
        const opsRegex:RegExp = /^((==|!=|\|\||&&|<=|>=)|[<>!%+\-*\/])$|^\./
        const unaryOpsRegex:RegExp = /^[!-]$/
        const separatorRegex:RegExp = /^[\(\),]$/
        const priority = [
            ['.'],
            ['!'],
            ['*', '/', '%'],
            ['+', '-'],
            ['<', '>', '<=', '>='],
            ['==', '!='],
            ['&&'],
            ['||']
        ]

        // postfixify
        for (let i = 0; i < expTokens.length; i++) {
            if(opsRegex.test(expTokens[i])){

                //check if this is a unary operator by looking at the token before, if it's an operator or a bracket then this operator is most likely to be unary
                if(unaryOpsRegex.test(expTokens[i]) && (!expTokens[i-1] || (opsRegex.test(expTokens[i-1]) && expTokens[i-1] !== '.') || separatorRegex.test(expTokens[i-1]))){
                    postfixedTokens.push(globalSymbol);
                    stackOp(expTokens[i])
                    continue;
                }

                // if two operators are stacked together, throw an error
                if(expTokens[i-1] && (opsRegex.test(expTokens[i-1]) || (separatorRegex.test(expTokens[i-1]) && expTokens[i-1] !== ')'))) throw Error('something is wrong at : ' + expTokens.slice(i-1, i+2).join(' '))

                // if the operator is stackable according to the priority table then stack, else eject previous ones until stackable again
                while(!opStackable(peek(postfixOps), expTokens[i])){
                    pushOp()
                }
                stackOp(expTokens[i])
                continue;
            }

            if(expTokens[i] === '('){
                postfixOps.push('(')
                continue;
            }

            if(expTokens[i] === ')'){
                var op:string|undefined;
                while((op = peek(postfixOps)) && op !== '('){
                    pushOp()
                }
                if(postfixOps.length == 0) throw Error('uneven number of brackets, "(" missing')
                postfixOps.pop()
                continue;
            }

            if(expTokens[i] === ','){
                while((op = peek(postfixOps)) && op !== '('){
                    pushOp()
                }
                continue;
            }

            // if the code reaches this part that means the token is most likely not a symbol
            // throw an error if values or variables are stacked next to each other
            if(expTokens[i-1] && !opsRegex.test(expTokens[i-1]) && !separatorRegex.test(expTokens[i-1])) throw Error('something is wrong at 2: ' + expTokens.slice(i-1, i+2).join(' '))
            if(expTokens[i+1] === '('){
                if(expTokens[i-1] !== '.'){
                    postfixedTokens.push(globalSymbol)
                    stackOp('.'+expTokens[i]+'()')
                    continue;
                }
                postfixOps[postfixOps.length-1] += expTokens[i] + '()'
                continue;
            }
            postfixedTokens.push(expTokens[i])
        }

        // push all remaining operators
        while(postfixOps.length > 0){
            if(peek(postfixOps) === '(') throw Error('uneven number of brackets, ")" missing')
            pushOp()
        }



        // convert postfix string into expression tree
        var root:Expression = new Expression(this)
        var expressionParentStack: Expression[] = [root]
        setSelfExpression(expressionParentStack[0], postfixedTokens[0])

        if(postfixedTokens.length == 1){
            return expressionParentStack[0];
        }
        for (let i = 1; i < postfixedTokens.length; i++) {
            if(postfixedTokens[i] === '('){

                if(opsRegex.test(postfixedTokens[i-1])){

                    const oldParent = expressionParentStack.pop()
                    if(!oldParent) throw Error('expressionParentStack is emtpy, this is a bug in the compiler');
                    const newParent = new Expression(this, null, oldParent.isSelfExpression() ? oldParent.getFirst() : oldParent, [])
                    expressionParentStack.push(newParent)
                    if(root == newParent) root = newParent
                    
                }


                continue
            }

            if(postfixedTokens[i] === ')'){
               
                if(!opsRegex.test(postfixedTokens[i+1])) throw Error('there is no operator after the closing curly bracket')
                if(postfixedTokens[i-1] === '('){
                    i += 1;
                    const parent = peek(expressionParentStack)
                    if(/^\..+/.test(postfixedTokens[i])){
                        parent.setTrigger('.')
                        parent.addArg(new StringWrapper(postfixedTokens[i].substring(1)))
                    }
                    else{
                        throw Error('there is not supposed to be any operator that accepts 0 parameters other than methods')
                        // parent.setTrigger(postfixedTokens[i])
                        // parent.setArgs([])
                    }

                    continue
                }

                i += 1
                const lastParameter = expressionParentStack.pop()
                if(!lastParameter) throw Error('lastParameter undefined, something is wrong here')
                const first = lastParameter.getFirst()
                if(first == null) throw Error('lastParameter first is not supposed to be null but it is, something is wrong here')
                const parent = peek(expressionParentStack)
                parent.addArg(lastParameter.isSelfExpression() ? first: lastParameter)

                if(/^\..+/.test(postfixedTokens[i])){
                    parent.setTrigger('.')
                    parent.setArgs([ new StringWrapper(postfixedTokens[i].substring(1)), ...(parent.getArgs() ?? []) ])
                }
                else{
                    parent.setTrigger(postfixedTokens[i])
                }

                continue
            }

            // if the code reaches this part then the current token is most likely a variable or an argument

            if(postfixedTokens[i-1] !== '('){
                // if the code reaches this part then this part is where the next argument starts
                const lastParameter = expressionParentStack.pop()
                if(!lastParameter) throw Error('lastParameter undefined, something is wrong here')
                const first = lastParameter.getFirst()
                if(first == null) throw Error('lastParameter first is not supposed to be null but it is, something is wrong here')
                const parent = peek(expressionParentStack)
                parent.addArg(lastParameter.isSelfExpression() ? first: lastParameter)
            }

            const newParent = new Expression(this)
            setSelfExpression(newParent, postfixedTokens[i])
            expressionParentStack.push(newParent)
        }

        // console.log(expressionParentStack.length)
        return expressionParentStack[0];

        

        function setSelfExpression(expression:Expression, value:string):void{
            try{
                expression.setFirst(Terminal.wrap(value))
            }
            catch(err){
                expression.setFirst(value)
            }
            expression.setTrigger(null)
            expression.setArgs(null)
        }

        function peek<T>(stack:T[]):T{
            return stack[stack.length-1]
        }

        function opStackable(prevOp:string, op:string):boolean{
            if(prevOp == undefined || prevOp === '(') return true
            if(/^\./.test(op)) return true;
            if(/^\./.test(prevOp)) return false;
            for (let i = 0; i < priority.length; i++) {
                if(priority[i].includes(prevOp)) return false
                if(priority[i].includes(op)) return true
            }
            return true;
        }

        function stackOp(op:string):void{
            postfixedTokens.push('(')
            postfixOps.push(op)
        }

        function pushOp():void{
            const op = postfixOps.pop()
            if(!op) return
            postfixedTokens.push(')')
            postfixedTokens.push(op)
        }
    }


    public compile():void{
        const compiled = this._compile(Terminal.tokenize(this.content))
        compiled.endCommands.forEach(x => {
            if(x instanceof StartCommand) x.setNextCommand(new EndCommand(this))
            if(x instanceof SingleCommand) x.setNextCommand(new EndCommand(this))
            if(x instanceof BranchCommand) x.setFalseNextCommand(new EndCommand(this))
        })
        this.variables = new Map()
        this.currentCommand = new StartCommand(this, compiled.startCommand)

        console.log(this.currentCommand)
    }

    public execute():void{
        this.running = true
    }

    public stop():void{
        this.running = false
    }
}