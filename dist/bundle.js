(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasView = void 0;
const Tile_1 = require("./GameObjects/Tile");
const PlayerUnit_1 = require("./GameObjects/PlayerUnit");
class CanvasView {
    constructor(canvas = null) {
        this.canvas = null;
        this.context = null;
        this.canvasScale = 1;
        this.maxCanvasScale = 1.5;
        this.minCanvasScale = 0.5;
        this.maxCanvasSize = 1;
        this.defaultTilesPerCanvas = 10;
        this.renderRadius = 6;
        this.middleMousePressed = false;
        this.cameraPosition = { x: 0, y: 0 };
        this.setCanvas(canvas);
    }
    setCanvas(canvas) {
        if (this.canvas) {
            window.onresize = null;
            this.canvas.onwheel = null;
            this.canvas.onmousedown = null;
            this.canvas.onmouseup = null;
            this.canvas.onmousemove = null;
            this.canvas.onmouseleave = null;
        }
        this.canvas = canvas;
        if (this.canvas == null || canvas == null) {
            this.context = null;
            return;
        }
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.maxCanvasSize = Math.max(this.canvas.width, this.canvas.height);
        this.canvas.onwheel = (evt) => {
            this.setCanvasScale(this.canvasScale * (1 - (evt.deltaY * 0.001)));
        };
        this.canvas.onmousedown = (evt) => {
            if (evt.button == 1) {
                this.middleMousePressed = true;
                evt.preventDefault();
                return false;
            }
        };
        this.canvas.onmouseup = (evt) => {
            if (evt.button == 1) {
                this.middleMousePressed = false;
            }
        };
        this.canvas.onmouseleave = (evt) => {
            this.middleMousePressed = false;
        };
        this.canvas.onmousemove = (evt) => {
            if (this.middleMousePressed) {
                this.cameraPosition.x -= (evt.movementX) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize);
                this.cameraPosition.y -= (evt.movementY) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize);
            }
        };
        window.onresize = (evt) => {
            console.log('resized');
            const target = this.canvas;
            if (!target)
                return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this.maxCanvasSize = Math.max(target.width, target.height);
            if (this.context)
                this.context.imageSmoothingEnabled = false;
        };
    }
    setCanvasScale(scale) {
        this.canvasScale = Math.min(this.maxCanvasScale, Math.max(this.minCanvasScale, scale));
    }
    setCameraPosition(position) {
        this.cameraPosition = position;
    }
    getCameraPosition() {
        return this.cameraPosition;
    }
    getContext() {
        return this.context;
    }
    getScaledRenderRadius() {
        return this.renderRadius / this.canvasScale;
    }
    render(grid) {
        var _a, _b, _c;
        if (this.context == null || this.canvas == null)
            return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (grid == null)
            return;
        const oneTileSize = this.canvasScale * this.maxCanvasSize / this.defaultTilesPerCanvas;
        const oneTileSizeX = oneTileSize / Tile_1.Tile.defaultTileResolution.x;
        const oneTileSizeY = oneTileSize / Tile_1.Tile.defaultTileResolution.y;
        const xCam = this.cameraPosition.x * oneTileSize - this.canvas.width / 2;
        const yCam = this.cameraPosition.y * oneTileSize - this.canvas.height / 2;
        const yPlayerOffset = Math.round(oneTileSize / 3);
        const scaledRadius = this.getScaledRenderRadius();
        const iStart = Math.floor(this.cameraPosition.y - scaledRadius);
        const iEnd = Math.ceil(this.cameraPosition.y + scaledRadius);
        const jStart = Math.floor(this.cameraPosition.x - scaledRadius);
        const jEnd = Math.ceil(this.cameraPosition.x + scaledRadius);
        for (let i = iStart; i < iEnd; i++) {
            if (i < 0)
                continue;
            for (let j = jStart; j < jEnd; j++) {
                if (j < 0)
                    continue;
                var tileSprite = (_b = (_a = grid.tiles[i]) === null || _a === void 0 ? void 0 : _a.at(j)) === null || _b === void 0 ? void 0 : _b.currentAnimationFrame();
                if (tileSprite) {
                    const xSize = oneTileSizeX * tileSprite.resolution.x;
                    const ySize = oneTileSizeY * tileSprite.resolution.y;
                    const xCoord = Math.round(j * xSize - xCam);
                    const yCoord = Math.round(i * ySize - yCam);
                    const xSizeScaled = Math.round((j + 1) * xSize - xCam) - xCoord;
                    const ySizeScaled = Math.round((i + 1) * ySize - yCam) - yCoord;
                    this.context.drawImage(tileSprite.spriteSheet, tileSprite.position.x, tileSprite.position.y, tileSprite.resolution.x, tileSprite.resolution.y, xCoord, yCoord, xSizeScaled, ySizeScaled);
                }
            }
        }
        for (let i = iStart; i < iEnd; i++) {
            if (i < 0)
                continue;
            for (let j = jStart; j < jEnd; j++) {
                if (j < 0)
                    continue;
                var entity = (_c = grid.entityGrid[i]) === null || _c === void 0 ? void 0 : _c.at(j);
                if (entity) {
                    const entitySprite = entity.currentAnimationFrame();
                    const xSize = oneTileSizeX * entitySprite.resolution.x;
                    const ySize = oneTileSizeY * entitySprite.resolution.y;
                    const spriteCoord = entity instanceof PlayerUnit_1.PlayerUnit ? entity.getSpriteCoordinate() : null;
                    const jPos = spriteCoord ? spriteCoord.x : j;
                    const iPos = spriteCoord ? spriteCoord.y : i;
                    const xCoord = jPos * xSize - xCam;
                    const yCoord = iPos * ySize - yCam;
                    const xSizeScaled = Math.round((jPos + 1) * xSize - xCam) - xCoord;
                    const ySizeScaled = Math.round((iPos + 1) * ySize - yCam) - yCoord;
                    this.context.drawImage(entitySprite.spriteSheet, entitySprite.position.x, entitySprite.position.y, entitySprite.resolution.x, entitySprite.resolution.y, xCoord, yCoord - (spriteCoord ? yPlayerOffset : 0), xSizeScaled, ySizeScaled);
                }
            }
        }
        this.context.fillText("x : " + this.cameraPosition.x, 10, 20);
        this.context.fillText("y : " + this.cameraPosition.y, 10, 40);
    }
}
exports.CanvasView = CanvasView;

},{"./GameObjects/PlayerUnit":24,"./GameObjects/Tile":25}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class BoolWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = Wrapper_1.Wrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error('something is wrong with what you wrote');
        return expHandler.process(this, args);
    }
    getValue() {
        return super.getValue();
    }
    setValue(value) {
        super.setValue(value);
    }
}
exports.BoolWrapper = BoolWrapper;

},{"./Wrapper":14}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchCommand = void 0;
const Command_1 = require("./Command");
const Expression_1 = require("./Expression");
const Wrapper_1 = require("./Wrapper");
class BranchCommand extends Command_1.Command {
    constructor(terminal, condition, trueNextCommand = null, falseNextCommand = null) {
        super(terminal);
        this.condition = condition;
        this.trueNextCommand = trueNextCommand;
        this.falseNextCommand = falseNextCommand;
    }
    setTrueNextCommand(value) {
        this.trueNextCommand = value;
    }
    setFalseNextCommand(value) {
        this.falseNextCommand = value;
    }
    Execute() {
        if (!this.trueNextCommand || !this.falseNextCommand)
            throw new Error("true and false nextCommands needs to be instantiated");
        const condition = this.condition instanceof Wrapper_1.Wrapper ?
            this.condition :
            this.condition instanceof Expression_1.Expression ?
                this.condition.getResult() :
                this.terminal.getVariable(this.condition);
        this.terminal.currentCommand = condition.getValue() ?
            this.trueNextCommand :
            this.falseNextCommand;
    }
}
exports.BranchCommand = BranchCommand;

},{"./Command":4,"./Expression":6,"./Wrapper":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(terminal) {
        this.terminal = terminal;
    }
}
exports.Command = Command;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndCommand = void 0;
const Command_1 = require("./Command");
class EndCommand extends Command_1.Command {
    constructor(terminal) {
        super(terminal);
    }
    Execute() {
    }
}
exports.EndCommand = EndCommand;

},{"./Command":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const VoidWrapper_1 = require("./VoidWrapper");
const Wrapper_1 = require("./Wrapper");
class Expression {
    constructor(terminal, first, trigger, args = []) {
        this.terminal = terminal;
        this.first = first;
        this.trigger = trigger;
        this.args = args;
    }
    getResult() {
        const first = this.first instanceof Wrapper_1.Wrapper ?
            this.first :
            this.first instanceof Expression ?
                this.first.getResult() :
                this.terminal.getVariable(this.first);
        if (this.first instanceof VoidWrapper_1.VoidWrapper)
            throw Error('there is something wrong with your code');
        const args = [];
        for (let index = 0; index < this.args.length; index++) {
            const item = this.args[index];
            args[index] = item instanceof Wrapper_1.Wrapper ?
                item :
                item instanceof Expression ?
                    item.getResult() :
                    this.terminal.getVariable(item);
            if (args[index] instanceof VoidWrapper_1.VoidWrapper)
                throw Error('there is something wrong with your code');
        }
        return first.processExpression(this.trigger, args);
    }
}
exports.Expression = Expression;

},{"./VoidWrapper":12,"./Wrapper":14}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class NumberWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = Wrapper_1.Wrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error('something is wrong with what you wrote');
        return expHandler.process(this, args);
    }
    getValue() {
        return super.getValue();
    }
    setValue(value) {
        super.setValue(value);
    }
}
exports.NumberWrapper = NumberWrapper;

},{"./Wrapper":14}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleCommand = void 0;
const Command_1 = require("./Command");
const VoidWrapper_1 = require("./VoidWrapper");
const WaitWrapper_1 = require("./WaitWrapper");
class SingleCommand extends Command_1.Command {
    constructor(terminal, expression, nextCommand, variableToSet) {
        super(terminal);
        this.nextCommand = nextCommand;
        this.expression = expression;
        this.asyncTask = null;
    }
    setNextCommand(value) {
        this.nextCommand = value;
    }
    jumpNextCommand() {
        if (!this.nextCommand)
            throw Error();
        this.terminal.currentCommand = this.nextCommand;
        return this.nextCommand;
    }
    getAsyncTask() {
        return this.asyncTask;
    }
    isSynced() {
        return this.asyncTask == null;
    }
    Execute() {
        if (!this.isSynced())
            return;
        const result = this.expression.getResult();
        if (this.variableToSet) {
            if (result instanceof VoidWrapper_1.VoidWrapper)
                throw Error("you can't put nothing in variable " + this.variableToSet);
            this.terminal.setVariable(this.variableToSet, result);
        }
        if (result instanceof WaitWrapper_1.WaitWrapper) {
            this.asyncTask = result.command;
            return;
        }
        if (this.isSynced())
            this.jumpNextCommand();
        // throw new Error("Method not implemented.");
    }
}
exports.SingleCommand = SingleCommand;

},{"./Command":4,"./VoidWrapper":12,"./WaitWrapper":13}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const Command_1 = require("./Command");
const EndCommand_1 = require("./EndCommand");
class StartCommand extends Command_1.Command {
    constructor(terminal, nextCommand) {
        super(terminal);
        this.nextCommand = nextCommand !== null && nextCommand !== void 0 ? nextCommand : new EndCommand_1.EndCommand(terminal);
    }
    getNextCommand() {
        return this.nextCommand;
    }
    setNextCommand(value) {
        this.nextCommand = value;
    }
    jumpNextCommand() {
        this.terminal.currentCommand = this.nextCommand;
        return this.nextCommand;
    }
    Execute() {
        this.jumpNextCommand();
    }
}
exports.StartCommand = StartCommand;

},{"./Command":4,"./EndCommand":5}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class StringWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
    }
    processExpression(trigger, args) {
        if (!trigger)
            this.log();
        const handler = StringWrapper.processes.find(x => x.trigger === trigger);
        if (!handler)
            throw new Error("There's something wrong with your code");
        return handler.process(this, args);
    }
    getValue() {
        return super.getValue();
    }
    setValue(value) {
        super.setValue(value);
    }
}
exports.StringWrapper = StringWrapper;
StringWrapper.functions = [];
StringWrapper.procedures = [];

},{"./Wrapper":14}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const SingleCommand_1 = require("./SingleCommand");
const StartCommand_1 = require("./StartCommand");
const Wrapper_1 = require("./Wrapper");
const NumberWrapper_1 = require("./NumberWrapper");
const BoolWrapper_1 = require("./BoolWrapper");
const StringWrapper_1 = require("./StringWrapper");
const BranchCommand_1 = require("./BranchCommand");
class Terminal {
    constructor() {
        this.content = "";
        this.running = false;
        this.currentCommand = null;
        this.variables = new Map();
    }
    static wrap(value) {
        if (value === 'true' || value === 'false')
            return new BoolWrapper_1.BoolWrapper(value === 'true');
        if (!isNaN(+value))
            return new NumberWrapper_1.NumberWrapper(+value);
        if ((/^".*"$/ && (value.match(/"/g) || []).length == 2))
            return new StringWrapper_1.StringWrapper(value.replace('"', ''));
        if ((/^'.*'$/ && (value.match(/'/g) || []).length == 2))
            return new StringWrapper_1.StringWrapper(value.replace("'", ''));
        throw Error(value + " is not a boolean, number, or string");
    }
    static tokenize(code) {
        const tokens = [];
        // + - * / = > < ! %
        const stackableOp = /[\+\-\*\/\=\<\>\!\%]/;
        const stringOp = /['"]/;
        var stringBuilder = "";
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            if (stringBuilder.length > 0) {
                if (stringOp.test(stringBuilder[0])) {
                    stringBuilder += char;
                    if (stringBuilder[0] === char)
                        pushStringBuilder();
                    continue;
                }
                if (stringOp.test(char)) {
                    pushStringBuilder();
                    stringBuilder += char;
                    continue;
                }
            }
            if (/\s/.test(char)) {
                pushStringBuilder();
                continue;
            }
            // [ ] { } ( ) ; .
            if (/[\[\]\{\}\(\);.,]/.test(char)) {
                if (char === '.' && /^[0-9]+$/.test(stringBuilder)) {
                    stringBuilder += char;
                    continue;
                }
                pushStringBuilder();
                tokens.push(char);
                continue;
            }
            if (stackableOp.test(char)) {
                if (stringBuilder.length >= 2 || (stringBuilder.length > 0 && !stackableOp.test(stringBuilder))) {
                    pushStringBuilder();
                }
                stringBuilder += char;
                continue;
            }
            if (stackableOp.test(stringBuilder)) {
                pushStringBuilder();
            }
            stringBuilder += char;
        }
        pushStringBuilder();
        return tokens;
        function pushStringBuilder() {
            if (stringBuilder.length > 0) {
                tokens.push(stringBuilder);
                stringBuilder = "";
            }
        }
    }
    static checkVariableName(name) {
        const variableRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        if (variableRegex.test(name))
            return name;
        throw Error('invalid variable name');
    }
    getVariable(variableName) {
        const value = this.variables.get(variableName);
        if (value)
            return value;
        throw Error('Variable ' + variableName + ' is not defined');
    }
    setVariable(variableName, value) {
        var wrapperValue;
        if (value instanceof Wrapper_1.Wrapper)
            wrapperValue = value;
        else {
            try {
                // if this fails it means value is most likely a variable name
                wrapperValue = Terminal.wrap(value);
            }
            catch (err) {
                // if value is not a variable name then throw an error for undefined variable
                wrapperValue = this.getVariable(variableName);
            }
        }
        this.variables.set(variableName, wrapperValue);
    }
    _compile(codeTokens) {
        const startCommand = new StartCommand_1.StartCommand(this);
        const placeholderCommands = [startCommand];
        for (let i = 0; i < codeTokens.length; i++) {
            switch (codeTokens[i]) {
                case "if":
                    {
                        if (codeTokens[++i] !== '(')
                            throw Error('if syntax error, correct syntax ex. : if(a == "test"){ moveUp(); }');
                        const conditionTokens = [];
                        var bracketCounter = 1;
                        while (bracketCounter > 0) {
                            i++;
                            switch (codeTokens[i]) {
                                case '(':
                                    bracketCounter++;
                                    break;
                                case ')':
                                    bracketCounter--;
                                    break;
                                default:
                                    break;
                            }
                            if (bracketCounter > 0) {
                                conditionTokens.push(codeTokens[i]);
                            }
                        }
                        var condition;
                        if (conditionTokens.length == 1) {
                            try {
                                condition = Terminal.wrap(conditionTokens[0]);
                            }
                            catch (err) {
                                condition = Terminal.checkVariableName(conditionTokens[0]);
                            }
                        }
                        else {
                            condition = compileExpression(conditionTokens);
                        }
                        const temp = new BranchCommand_1.BranchCommand(this, condition);
                        placeholderCommands.forEach(x => {
                            if (x instanceof SingleCommand_1.SingleCommand)
                                x.setNextCommand(temp);
                            if (x instanceof BranchCommand_1.BranchCommand)
                                x.setFalseNextCommand(temp);
                        });
                    }
                    break;
                case "while":
                    {
                    }
                    break;
                case "for":
                    {
                    }
                    break;
                default:
                    {
                    }
                    break;
            }
        }
        return {
            startCommand,
            endCommand: startCommand
        };
        throw Error('Method not implemented');
        function compileExpression(expTokens) {
            throw Error('Function not implemented');
        }
    }
    compile() {
        //this.currentCommand = new StartCommand(this, this._compile(this.content).startCommand)
    }
    execute() {
        this.running = true;
        alert(Terminal.tokenize(this.content));
    }
    stop() {
        this.running = false;
    }
}
exports.Terminal = Terminal;

},{"./BoolWrapper":2,"./BranchCommand":3,"./NumberWrapper":7,"./SingleCommand":8,"./StartCommand":9,"./StringWrapper":10,"./Wrapper":14}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class VoidWrapper extends Wrapper_1.Wrapper {
    constructor() {
        super(null);
    }
    getValue() {
        return super.getValue();
    }
    setValue(value) {
        super.setValue(value);
    }
}
exports.VoidWrapper = VoidWrapper;

},{"./Wrapper":14}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitWrapper = void 0;
const VoidWrapper_1 = require("./VoidWrapper");
class WaitWrapper extends VoidWrapper_1.VoidWrapper {
    constructor(command) {
        super();
        this.command = command;
    }
}
exports.WaitWrapper = WaitWrapper;

},{"./VoidWrapper":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
class Wrapper {
    constructor(value) {
        this.value = null;
        this.setValue(value);
    }
    log() {
        console.log(this.value);
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = Wrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error('something is wrong with what you wrote');
        return expHandler.process(this, args);
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
exports.Wrapper = Wrapper;
Wrapper.processes = [];

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Grid_1 = require("./GameObjects/Grid");
const Player_1 = require("./Player");
class GameManager {
    constructor(canvasView = null, terminalView = null) {
        this.lastTimeStamp = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrameId = -1;
        this.player = new Player_1.Player();
        this.terminalView = null;
        this.grid = new Grid_1.Grid({ x: 100, y: 100 });
        this.canvasView = null;
        this.activePlayerUnit = null;
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        this.grid.addEntity(this.player.units[0]);
        this.setActivePlayerUnit(this.player.units[0]);
    }
    getDeltatime() {
        return this.deltaTime;
    }
    setActivePlayerUnit(value) {
        var _a, _b;
        (_a = this.terminalView) === null || _a === void 0 ? void 0 : _a.setTerminal((_b = value === null || value === void 0 ? void 0 : value.terminal) !== null && _b !== void 0 ? _b : null);
        this.activePlayerUnit = value;
    }
    setCanvasView(canvasView) {
        this.canvasView = canvasView;
    }
    setTerminalView(terminalView) {
        var _a, _b, _c;
        terminalView === null || terminalView === void 0 ? void 0 : terminalView.setTerminal((_b = (_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.terminal) !== null && _b !== void 0 ? _b : null);
        (_c = this.terminalView) === null || _c === void 0 ? void 0 : _c.setTerminal(null);
        this.terminalView = terminalView;
    }
    start() {
        if (this.isRunning)
            return;
        const run = (timestamp) => {
            this.deltaTime = (timestamp - this.lastTimeStamp) / 1000;
            this.update();
            this.render();
            this.lastTimeStamp = timestamp;
            this.animationFrameId = requestAnimationFrame(run);
        };
        this.animationFrameId = requestAnimationFrame(run);
    }
    pause() {
        if (!this.isRunning)
            return;
        cancelAnimationFrame(this.animationFrameId);
    }
    update() {
        if (!this.canvasView) {
            this.grid.update(this.deltaTime);
            return;
        }
        const camPos = this.canvasView.getCameraPosition();
        const scaledRenderRadius = this.canvasView.getScaledRenderRadius();
        this.grid.update(this.deltaTime, {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius),
                y: Math.floor(camPos.y - scaledRenderRadius),
            },
            size: {
                x: Math.ceil(scaledRenderRadius * 2),
                y: Math.ceil(scaledRenderRadius * 2),
            }
        }, this.player.units);
    }
    render() {
        var _a, _b, _c;
        (_a = this.canvasView) === null || _a === void 0 ? void 0 : _a.render(this.grid);
        (_c = (_b = this.canvasView) === null || _b === void 0 ? void 0 : _b.getContext()) === null || _c === void 0 ? void 0 : _c.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80);
    }
}
exports.GameManager = GameManager;

},{"./GameObjects/Grid":22,"./Player":27}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animated = void 0;
const ChainedAnimation_1 = require("./ChainedAnimation");
const GroupAnimation_1 = require("./GroupAnimation");
class Animated {
    constructor(animations = []) {
        this.currentAnimationIndex = 0;
        this.animations = animations;
    }
    addAnimation(animation) {
        this.animations.push(animation);
    }
    createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation = "", animationSpeed = 1) {
        this.animations.push(new ChainedAnimation_1.ChainedAnimation(this, animationName, spriteSheet, spriteResolution, spriteFrameNum, this.animations.findIndex(x => x.animationName === nextAnimation), animationSpeed));
    }
    getAnimation(animationName) {
        const index = this.animations.findIndex(x => x.animationName === animationName);
        return index === -1 ? null : this.animations[index];
    }
    playAnimation(animationName) {
        this.animations[this.currentAnimationIndex].resetAnimation();
        this.currentAnimationIndex = this.animations.findIndex(x => x.animationName === animationName);
    }
    playAnimationIndex(animationIndex) {
        this.animations[this.currentAnimationIndex].resetAnimation();
        this.currentAnimationIndex = animationIndex;
    }
    nextFrame(deltaTime) {
        if (this.animations[this.currentAnimationIndex] instanceof GroupAnimation_1.GroupAnimation)
            return;
        this.animations[this.currentAnimationIndex].nextFrame(deltaTime);
    }
    currentAnimationFrame() {
        return this.animations[this.currentAnimationIndex].currentAnimationFrame();
    }
    getAvailableAnimations() {
        return this.animations.map(x => {
            return x.animationName;
        });
    }
}
exports.Animated = Animated;

},{"./ChainedAnimation":18,"./GroupAnimation":23}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
class Animation {
    constructor(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed = 1 // 0 will make this a static sprite (no animation)
    ) {
        this.animationProgress = 0;
        this.animationName = animationName;
        this.spriteSheet = spriteSheet;
        this.spriteResolution = spriteResolution;
        this.spriteFrameNum = spriteFrameNum;
        this.animationSpeed = animationSpeed;
    }
    resetAnimation() {
        this.animationProgress = 0;
    }
    nextFrame(deltaTime) {
        this.animationProgress += deltaTime * this.animationSpeed;
        this.animationProgress %= this.spriteFrameNum;
    }
    currentAnimationFrame() {
        const sx = this.spriteResolution.x * Math.floor(this.animationProgress);
        return {
            spriteSheet: this.spriteSheet,
            position: { x: sx, y: 0 },
            resolution: this.spriteResolution
        };
    }
}
exports.Animation = Animation;
Animation.assets = {};

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainedAnimation = void 0;
const Animation_1 = require("./Animation");
class ChainedAnimation extends Animation_1.Animation {
    constructor(owner, animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimationIndex = -1, // -1 will make this loop indefinitely
    animationSpeed = 1 // 0 will make this a static sprite (no animation)
    ) {
        super(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed);
        this.owner = owner;
        this.nextAnimationIndex = nextAnimationIndex;
    }
    nextFrame(deltaTime) {
        this.animationProgress += deltaTime * this.animationSpeed;
        if (this.nextAnimationIndex == -1) {
            this.animationProgress %= this.spriteFrameNum;
        }
        else if (this.animationProgress >= this.spriteFrameNum) {
            this.resetAnimation();
            this.owner.currentAnimationIndex = this.nextAnimationIndex;
        }
    }
    currentAnimationFrame() {
        const sx = this.spriteResolution.x * Math.floor(this.animationProgress);
        return {
            spriteSheet: this.spriteSheet,
            position: { x: sx, y: 0 },
            resolution: this.spriteResolution
        };
    }
}
exports.ChainedAnimation = ChainedAnimation;

},{"./Animation":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["None"] = 4] = "None";
})(Direction || (exports.Direction = Direction = {}));

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Animated_1 = require("./Animated");
class Entity extends Animated_1.Animated {
    constructor(coordinate, animations = []) {
        super(animations);
        this.grid = null;
        this.coordinate = coordinate;
    }
    getCoordinate() {
        return this.coordinate;
    }
    setCoordinate(value, triggerTile) {
        var _a;
        if (this.grid) {
            const row = this.grid.entityGrid[value.y];
            if (!row) {
                throw Error('index out of bounds');
            }
            const entity = row[value.x];
            if (entity === undefined) {
                throw Error('index out of bounds');
            }
            if (entity !== null) {
                throw Error('coordinate is not empty');
            }
            this.grid.entityGrid[this.coordinate.y][this.coordinate.x] = null;
            row[value.x] = this;
            this.coordinate = value;
            if (triggerTile)
                (_a = this.grid.tiles[value.y][value.x]) === null || _a === void 0 ? void 0 : _a.step(this);
            return;
        }
        this.coordinate = value;
    }
    getGrid() {
        return this.grid;
    }
    setGrid(grid) {
        var _a;
        if (this.grid == grid && (grid == null || (grid === null || grid === void 0 ? void 0 : grid.entities.includes(this))))
            return;
        if (grid != null) {
            if (grid.entityGrid.length <= this.coordinate.y || this.coordinate.y < 0)
                throw Error("This entity's coordinates are out of bounds for the grid");
            if (grid.entityGrid[0].length <= this.coordinate.x || this.coordinate.x < 0)
                throw Error("This entity's coordinates are out of bounds for the grid");
        }
        if (this.grid != null) {
            this.grid.removeEntity(this);
        }
        this.grid = grid;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.addEntity(this);
    }
}
exports.Entity = Entity;

},{"./Animated":16}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Grass extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[0]);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[1]);
        this.currentAnimationIndex = Math.round(Math.random());
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Grass = Grass;

},{"./GroupAnimation":23,"./Tile":25}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Grass_1 = require("./Grass");
const GroupAnimation_1 = require("./GroupAnimation");
const PlayerUnit_1 = require("./PlayerUnit");
class Grid {
    constructor(size) {
        this.size = size;
        this.entities = [];
        this.entityGrid = [];
        this.tiles = [];
        for (let i = 0; i < size.y; i++) {
            this.entityGrid.push([]);
            this.tiles.push([]);
            for (let j = 0; j < size.x; j++) {
                this.entityGrid[i].push(null);
                this.tiles[i].push(new Grass_1.Grass({ x: j, y: i }));
            }
        }
    }
    update(deltaTime, updateArea = null, priorityUpdate = []) {
        var _a, _b, _c, _d, _e, _f;
        GroupAnimation_1.GroupAnimation.animations.forEach(x => x.nextFrame(deltaTime));
        if (!updateArea) {
            for (let i = 0; i < this.size.y; ++i) {
                for (let j = 0; j < this.size.x; ++j) {
                    (_b = (_a = this.tiles[i]) === null || _a === void 0 ? void 0 : _a.at(j)) === null || _b === void 0 ? void 0 : _b.nextFrame(deltaTime);
                    (_d = (_c = this.entityGrid[i]) === null || _c === void 0 ? void 0 : _c.at(j)) === null || _d === void 0 ? void 0 : _d.nextFrame(deltaTime);
                }
            }
            return;
        }
        const xStart = updateArea.position.x;
        const xEnd = updateArea.position.x + updateArea.size.x;
        const yStart = updateArea.position.y;
        const yEnd = updateArea.position.y + updateArea.size.y;
        for (let i = yStart; i < yEnd; ++i) {
            for (let j = xStart; j < xEnd; ++j) {
                if (j < 0)
                    continue;
                const tile = (_e = this.tiles[i]) === null || _e === void 0 ? void 0 : _e.at(j);
                const entity = (_f = this.entityGrid[i]) === null || _f === void 0 ? void 0 : _f.at(j);
                if (tile && !priorityUpdate.includes(tile))
                    tile.nextFrame(deltaTime);
                if (entity && !priorityUpdate.includes(entity)) {
                    if (entity instanceof PlayerUnit_1.PlayerUnit)
                        entity.update(deltaTime);
                    entity.nextFrame(deltaTime);
                }
            }
        }
        priorityUpdate.forEach(x => {
            if (x instanceof PlayerUnit_1.PlayerUnit)
                x.update(deltaTime);
            x.nextFrame(deltaTime);
        });
    }
    addEntity(entity) {
        console.log("add");
        const index = this.entities.indexOf(entity);
        if (index != -1) {
            if (entity.getGrid() != this)
                entity.setGrid(this);
            return;
        }
        if (this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] != null) {
            throw Error("This coordinate is taken");
        }
        this.entities.push(entity);
        this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = entity;
        if (entity.getGrid() != this)
            entity.setGrid(this);
    }
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index != -1) {
            this.entities.splice(index, 1);
            this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = null;
        }
        if (entity.getGrid() == this) {
            entity.setGrid(null);
        }
    }
}
exports.Grid = Grid;

},{"./Grass":21,"./GroupAnimation":23,"./PlayerUnit":24}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupAnimation = void 0;
const Animation_1 = require("./Animation");
class GroupAnimation extends Animation_1.Animation {
    constructor(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed = 1 // 0 will make this a static sprite (no animation)
    ) {
        super(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed);
    }
}
exports.GroupAnimation = GroupAnimation;
GroupAnimation.animations = [];

},{"./Animation":17}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
const SingleCommand_1 = require("../Console/SingleCommand");
const Terminal_1 = require("../Console/Terminal");
const Inventory_1 = require("../Items/Inventory");
const Direction_1 = require("./Direction");
const Entity_1 = require("./Entity");
class PlayerUnit extends Entity_1.Entity {
    constructor(coordinate, moveSpeed = 1, animations = []) {
        super(coordinate, animations);
        this.isMoving = false;
        this.moveSpeed = 1;
        this.lerpProgress = 0;
        this.terminal = new Terminal_1.Terminal();
        this.inventory = new Inventory_1.Inventory();
        this.equipped = null;
        this.originalCoordinate = Object.assign({}, this.coordinate);
        this.setMoveSpeed(moveSpeed);
    }
    setMoveSpeed(value, animationSpeedMult = 1) {
        this.moveSpeed = value;
        const animation = this.getAnimation('walk');
        if (!animation)
            return;
        animation.animationSpeed = animation.spriteFrameNum * animationSpeedMult * this.moveSpeed;
    }
    addAnimation(animation) {
        super.addAnimation(animation);
        if (animation.animationName === 'walk') {
            this.setMoveSpeed(this.moveSpeed);
        }
    }
    createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation, animationSpeed) {
        super.createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation, animationSpeed);
        if (animationName === 'walk') {
            this.setMoveSpeed(this.moveSpeed);
        }
    }
    update(deltaTime) {
        var _a, _b;
        if (this.terminal.running)
            (_a = this.terminal.currentCommand) === null || _a === void 0 ? void 0 : _a.Execute();
        var currentCommand = this.terminal.currentCommand;
        if (currentCommand instanceof SingleCommand_1.SingleCommand) {
            const asyncTask = currentCommand.getAsyncTask();
            if (asyncTask) {
                const taskDetail = asyncTask.split(' ');
                if (taskDetail[0] === 'move') {
                    var direction = Direction_1.Direction.None;
                    switch (taskDetail[1]) {
                        case 'up':
                            direction = Direction_1.Direction.Up;
                            break;
                        case 'down':
                            direction = Direction_1.Direction.Down;
                            break;
                        case 'left':
                            direction = Direction_1.Direction.Left;
                            break;
                        case 'right':
                            direction = Direction_1.Direction.Right;
                            break;
                        default:
                            direction = Direction_1.Direction.None;
                            break;
                    }
                    if (!this.isMoving)
                        this.move(direction);
                }
            }
            if (!this.isMoving)
                this.lerpProgress += deltaTime * this.moveSpeed;
            if (this.lerpProgress >= 1) {
                this.lerpProgress = 0;
                this.originalCoordinate = this.coordinate;
                currentCommand = currentCommand.jumpNextCommand();
                currentCommand.Execute();
                if (!(currentCommand instanceof SingleCommand_1.SingleCommand) || !((_b = currentCommand.getAsyncTask()) === null || _b === void 0 ? void 0 : _b.startsWith('move '))) {
                    this.playAnimation('idle');
                    this.isMoving = false;
                }
            }
        }
    }
    getSpriteCoordinate() {
        if (!this.isMoving)
            return this.coordinate;
        const coordDiff = {
            x: this.originalCoordinate.x - this.coordinate.x,
            y: this.originalCoordinate.y - this.coordinate.y,
        };
        return {
            x: this.originalCoordinate.x - coordDiff.x * this.lerpProgress,
            y: this.originalCoordinate.y - coordDiff.y * this.lerpProgress,
        };
    }
    move(direction) {
        if (this.isMoving || direction == Direction_1.Direction.None)
            return;
        this.isMoving = true;
        this.playAnimation('walk');
        const nextCoord = Object.assign({}, this.coordinate);
        switch (direction) {
            case Direction_1.Direction.Up:
                nextCoord.y -= 1;
                break;
            case Direction_1.Direction.Down:
                nextCoord.y += 1;
                break;
            case Direction_1.Direction.Left:
                nextCoord.x -= 1;
                break;
            case Direction_1.Direction.Right:
                nextCoord.x += 1;
                break;
            default:
                break;
        }
        try {
            this.setCoordinate(nextCoord, true);
        }
        catch (err) { }
    }
}
exports.PlayerUnit = PlayerUnit;

},{"../Console/SingleCommand":8,"../Console/Terminal":11,"../Items/Inventory":26,"./Direction":19,"./Entity":20}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const Animated_1 = require("./Animated");
class Tile extends Animated_1.Animated {
    constructor(coordinate, animations = []) {
        super(animations);
        this.coordinate = coordinate;
    }
}
exports.Tile = Tile;
Tile.defaultTileResolution = { x: 32, y: 32 };

},{"./Animated":16}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
}
exports.Inventory = Inventory;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Animation_1 = require("./GameObjects/Animation");
const ChainedAnimation_1 = require("./GameObjects/ChainedAnimation");
const PlayerUnit_1 = require("./GameObjects/PlayerUnit");
class Player {
    constructor() {
        this.gold = 0;
        this.units = [];
        const p1 = new PlayerUnit_1.PlayerUnit({ x: 0, y: 0 });
        p1.addAnimation(new ChainedAnimation_1.ChainedAnimation(p1, "idle", Animation_1.Animation.assets['player_idle'], { x: 32, y: 32 }, 2, -1, 1));
        p1.createAnimation("walk", Animation_1.Animation.assets['player_walk'], { x: 32, y: 32 }, 4, "", 4);
        p1.setMoveSpeed(2);
        this.units.push(p1);
    }
}
exports.Player = Player;

},{"./GameObjects/Animation":17,"./GameObjects/ChainedAnimation":18,"./GameObjects/PlayerUnit":24}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalView = void 0;
class TerminalView {
    constructor(textArea, executeButton, stopButton, terminal = null) {
        this.terminal = null;
        this.textArea = null;
        this.executeButton = null;
        this.stopButton = null;
        this.setTerminal(terminal);
        this.setTextArea(textArea);
        this.setExecuteButton(executeButton);
        this.setStopButton(stopButton);
    }
    setTextArea(value) {
        var _a;
        const inputListener = (evt) => {
            if (!this.terminal)
                return;
            const target = evt.target;
            console.log(target);
            this.terminal.content = target.value;
        };
        if (value) {
            value.addEventListener('input', inputListener);
            if (this.terminal) {
                value.value = this.terminal.content;
            }
        }
        (_a = this.textArea) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', inputListener);
        this.textArea = value;
    }
    setTerminal(value) {
        if (this.textArea && value)
            this.textArea.value = value.content;
        this.terminal = value;
    }
    setExecuteButton(value) {
        const executeClickListener = (evt) => {
            if (!this.terminal)
                return;
            this.terminal.compile();
            this.terminal.execute();
        };
        if (this.executeButton)
            this.executeButton.removeEventListener('click', executeClickListener);
        value === null || value === void 0 ? void 0 : value.addEventListener('click', executeClickListener);
        this.executeButton = value;
    }
    setStopButton(value) {
        const stopClickListener = (evt) => {
            if (!this.terminal)
                return;
            this.terminal.stop();
        };
        if (this.stopButton)
            this.stopButton.removeEventListener('click', stopClickListener);
        value === null || value === void 0 ? void 0 : value.addEventListener('click', stopClickListener);
        this.stopButton = value;
    }
}
exports.TerminalView = TerminalView;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animation_1 = require("./Classes/GameObjects/Animation");
const GroupAnimation_1 = require("./Classes/GameObjects/GroupAnimation");
function loadAsset() {
    const grass = new Image();
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png";
    const flowergrass = new Image();
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png";
    const player_idle = new Image();
    player_idle.src = "./dist/Assets/Prototype/itland_ptype_player_idle.png";
    const player_walk = new Image();
    player_walk.src = "./dist/Assets/Prototype/itland_ptype_player_walk.png";
    Animation_1.Animation.assets['grass_tile'] = grass;
    Animation_1.Animation.assets['flowery_grass_tile'] = flowergrass;
    Animation_1.Animation.assets['player_idle'] = player_idle;
    Animation_1.Animation.assets['player_walk'] = player_walk;
    GroupAnimation_1.GroupAnimation.animations.push(new GroupAnimation_1.GroupAnimation("grass_tile", grass, { x: 32, y: 32 }, 1, 0), new GroupAnimation_1.GroupAnimation("flowery_grass_tile", flowergrass, { x: 32, y: 32 }, 2, 1));
}
exports.default = loadAsset;

},{"./Classes/GameObjects/Animation":17,"./Classes/GameObjects/GroupAnimation":23}],30:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasView_1 = require("./Classes/CanvasView");
const TerminalView_1 = require("./Classes/TerminalView");
const GameManager_1 = require("./Classes/GameManager");
const loadAsset_1 = __importDefault(require("./loadAsset"));
window.onload = () => {
    var _a, _b, _c, _d;
    const canvas = document.querySelector("#view");
    const terminal = document.querySelector("#console");
    const executeButton = document.querySelector("#executeButton");
    const stopButton = document.querySelector("#stopButton");
    if (canvas == null)
        throw new Error("Canvas not found");
    if (terminal == null)
        throw new Error("Console not found");
    if (executeButton == null)
        throw new Error("Start button not found");
    if (stopButton == null)
        throw new Error("Stop button not found");
    canvas.width = (_b = (_a = canvas.parentElement) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : window.innerWidth;
    canvas.height = (_d = (_c = canvas.parentElement) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : window.innerHeight;
    (0, loadAsset_1.default)();
    const game = new GameManager_1.GameManager(new CanvasView_1.CanvasView(canvas), new TerminalView_1.TerminalView(terminal, executeButton, stopButton));
    game.start();
};

},{"./Classes/CanvasView":1,"./Classes/GameManager":15,"./Classes/TerminalView":28,"./loadAsset":29}]},{},[30]);
