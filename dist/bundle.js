(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
class API {
    sendSaveData() {
        const apiUrl = 'https://5591-203-78-117-152.ngrok-free.app/';
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(apiUrl, {
            method: 'POST',
            headers: headers,
            // body: JSON.stringify(user)
        });
        return fetch(request)
            .then(res => {
            console.log("got response:", res);
        });
    }
    getMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = 'http://localhost:3000/map';
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    throw new Error('Network Response was not ok');
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                // alert(JSON.stringify(jsonData));
                return JSON.stringify(jsonData);
            }
            catch (error) {
                console.error("hello");
            }
        });
    }
    getQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = 'http://localhost:3000/question';
                const response = yield fetch(apiUrl);
                // alert(JSON.stringify(response));
                let question = { text: "", a: "", b: "", c: "", d: "", answer: "" };
                if (!response.ok)
                    throw new Error('Network Response was not ok');
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                question.text = jsonData.text;
                question.a = jsonData.a;
                question.b = jsonData.b;
                question.c = jsonData.c;
                question.d = jsonData.d;
                question.answer = jsonData.answer;
                return question;
            }
            catch (error) {
                // alert(JSON.stringify(error))
                console.error("hello");
            }
        });
    }
    gameStart() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = 'http://localhost:3000/map';
            const apiUrl2 = 'http://localhost:3000/entity';
            alert("gamestart api");
            let map = { tile: [], entity: [] };
            try {
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    alert('error connecting to backend-api');
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                map.tile = jsonData;
            }
            catch (error) {
                alert('error getting tile data');
                console.error("hello");
            }
            try {
                const response = yield fetch(apiUrl2);
                if (!response.ok)
                    throw new Error('Network Response was not ok');
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                map.entity = jsonData;
            }
            catch (error) {
                alert('error getting entity data');
            }
            return map;
        });
    }
    getEntity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = 'http://localhost:3000/map';
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    throw new Error('Network Response was not ok');
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                // alert(JSON.stringify(jsonData));
                return JSON.stringify(jsonData);
            }
            catch (error) {
                console.error("hello");
            }
        });
    }
}
exports.API = API;

},{}],2:[function(require,module,exports){
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
        this.moveMouseTriggerPressed = false;
        this.cameraMoved = false;
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
        // this.canvas.onwheel = (evt) => {
        //     this.setCanvasScale(this.canvasScale * (1-(evt.deltaY * 0.001)))
        // }
        this.setCanvasScale(0.25);
        this.canvas.onmousedown = (evt) => {
            if (evt.button == 0) {
                this.moveMouseTriggerPressed = true;
                evt.preventDefault();
                return false;
            }
        };
        this.canvas.onmouseup = (evt) => {
            if (evt.button == 0) {
                if (!this.cameraMoved)
                    console.log('click!');
                this.cameraMoved = false;
                this.moveMouseTriggerPressed = false;
            }
        };
        this.canvas.onmouseleave = (evt) => {
            this.cameraMoved = false;
            this.moveMouseTriggerPressed = false;
        };
        // this.canvas.onmousemove = (evt) => {
        //     if(this.moveMouseTriggerPressed) {
        //         this.cameraMoved = true
        //         this.cameraPosition.x -= (evt.movementX) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
        //         this.cameraPosition.y -= (evt.movementY) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
        //     }
        // }
        window.onresize = (evt) => {
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

},{"./GameObjects/PlayerUnit":28,"./GameObjects/Tile":31}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class BoolWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
        this.type = "boolean";
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = BoolWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error("this operator, '" + trigger + "' doesn't exist for boolean");
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
BoolWrapper.processes = [
    {
        trigger: "",
        arguments: 0,
        process: (self, args) => {
            return self;
        }
    },
    {
        trigger: ".",
        arguments: 1,
        process: (self, args) => {
            var _a;
            switch ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.getValue()) {
                default:
                    throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a boolean");
            }
        }
    },
    {
        trigger: "==",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof BoolWrapper)
                return new BoolWrapper(self.getValue() == arg.getValue());
            return new BoolWrapper(false);
        }
    },
    {
        trigger: "!=",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof BoolWrapper)
                return new BoolWrapper(self.getValue() != arg.getValue());
            return new BoolWrapper(true);
        }
    },
    {
        trigger: "&&",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof BoolWrapper)
                return new BoolWrapper(self.getValue() && arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is not a boolean");
        }
    },
    {
        trigger: "||",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof BoolWrapper)
                return new BoolWrapper(self.getValue() || arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is not a boolean");
        }
    },
];

},{"./Wrapper":16}],4:[function(require,module,exports){
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
        if (!this.terminal.running)
            return;
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

},{"./Command":5,"./Expression":7,"./Wrapper":16}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(terminal) {
        this.terminal = terminal;
    }
}
exports.Command = Command;

},{}],6:[function(require,module,exports){
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

},{"./Command":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const VoidWrapper_1 = require("./VoidWrapper");
const Wrapper_1 = require("./Wrapper");
class Expression {
    constructor(terminal, trigger = null, first = null, args = null) {
        this.terminal = terminal;
        this.first = first;
        this.trigger = trigger;
        this.args = args;
    }
    setFirst(value) {
        this.first = value;
    }
    getFirst() {
        return this.first;
    }
    setArgs(value) {
        this.args = value;
    }
    addArg(value) {
        if (this.args == null)
            this.args = [];
        this.args.push(value);
    }
    getArgs() {
        return this.args;
    }
    setTrigger(value) {
        this.trigger = value;
    }
    isSelfExpression() {
        return this.trigger == null && this.args == null && this.first != null;
    }
    getResult() {
        if (this.first == null)
            throw Error('something went wrong with the expression, the first is null');
        var first;
        try {
            first = this.first instanceof Wrapper_1.Wrapper ?
                this.first :
                this.first instanceof Expression ?
                    this.first.getResult() :
                    this.terminal.getVariable(this.first);
            if (this.trigger == null && this.args == null) {
                return first;
            }
        }
        catch (err) {
            if (this.first !== '@g')
                throw err;
            // console.log('error passed');
        }
        if (this.args == null || this.trigger == null)
            throw Error('something went wrong with the expression, the args or the trigger is null');
        if (this.first instanceof VoidWrapper_1.VoidWrapper)
            throw Error('there is something wrong with your code, this.first returns void');
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
        // accessing global function
        if (this.first === '@g') {
            return this.terminal.processGlobalExpression(this.trigger, args);
            // const argCount = args.length
            // const expHandler = this.terminal.globalExpressionHandlers.find(x => {
            //     return x.trigger === this.trigger && x.arguments == argCount
            // })
            // if(!expHandler) throw Error('something is wrong with what you wrote')
            // return expHandler.process(new VoidWrapper(), args);
        }
        return first.processExpression(this.trigger, args);
    }
}
exports.Expression = Expression;

},{"./VoidWrapper":14,"./Wrapper":16}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberWrapper = void 0;
const BoolWrapper_1 = require("./BoolWrapper");
const StringWrapper_1 = require("./StringWrapper");
const Wrapper_1 = require("./Wrapper");
class NumberWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
        this.type = "number";
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = NumberWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error("this operator, '" + trigger + "' doesn't exist for number");
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
NumberWrapper.processes = [
    {
        trigger: "",
        arguments: 0,
        process: (self, args) => {
            return self;
        }
    },
    {
        trigger: ".",
        arguments: 1,
        process: (self, args) => {
            switch (args[0].getValue()) {
                case 'toString()':
                    return new StringWrapper_1.StringWrapper(self.getValue().toString());
                default:
                    throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a number");
            }
        }
    },
    {
        trigger: "+",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof StringWrapper_1.StringWrapper)
                return new StringWrapper_1.StringWrapper(self.getValue() + arg.getValue());
            if (arg instanceof NumberWrapper)
                return new NumberWrapper(self.getValue() + arg.getValue());
            throw new Error("you can't add " + self.getValue() + " and " + arg.getValue());
        }
    },
    {
        trigger: "-",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new NumberWrapper(self.getValue() - arg.getValue());
            throw new Error("you can't subtract " + self.getValue() + " by " + arg.getValue());
        }
    },
    {
        trigger: "*",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new NumberWrapper(self.getValue() * arg.getValue());
            throw new Error("you can't multiply " + self.getValue() + " with " + arg.getValue());
        }
    },
    {
        trigger: "/",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new NumberWrapper(self.getValue() / arg.getValue());
            throw new Error("you can't divide " + self.getValue() + " by " + arg.getValue());
        }
    },
    {
        trigger: "%",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new NumberWrapper(self.getValue() % arg.getValue());
            throw new Error("you can't mod " + self.getValue() + " by " + arg.getValue());
        }
    },
    {
        trigger: "==",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() == arg.getValue());
            return new BoolWrapper_1.BoolWrapper(false);
        }
    },
    {
        trigger: "!=",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() != arg.getValue());
            return new BoolWrapper_1.BoolWrapper(true);
        }
    },
    {
        trigger: "<=",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() <= arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string");
        }
    },
    {
        trigger: ">=",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() >= arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string");
        }
    },
    {
        trigger: "<",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() < arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string");
        }
    },
    {
        trigger: ">",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() > arg.getValue());
            throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string");
        }
    },
];

},{"./BoolWrapper":3,"./StringWrapper":12,"./Wrapper":16}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWrapper = void 0;
const WaitWrapper_1 = require("./WaitWrapper");
const Wrapper_1 = require("./Wrapper");
class PlayerWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
        this.type = "playerUnit";
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = PlayerWrapper.processes.find(x => {
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
exports.PlayerWrapper = PlayerWrapper;
PlayerWrapper.processes = [
    {
        trigger: "",
        arguments: 0,
        process: (self, args) => {
            return self;
        }
    },
    {
        trigger: ".",
        arguments: 1,
        process: (self, args) => {
            var _a;
            switch ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.getValue()) {
                case 'moveUp()':
                    return new WaitWrapper_1.WaitWrapper('move up 1');
                case 'moveDown()':
                    return new WaitWrapper_1.WaitWrapper('move down 1');
                case 'moveLeft()':
                    return new WaitWrapper_1.WaitWrapper('move left 1');
                case 'moveRight()':
                    return new WaitWrapper_1.WaitWrapper('move right 1');
                default:
                    throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
            }
        }
    },
    {
        trigger: ".",
        arguments: 2,
        process: (self, args) => {
            var _a;
            switch ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.getValue()) {
                case 'moveUp()':
                    return new WaitWrapper_1.WaitWrapper('move up ' + args[1].getValue());
                case 'moveDown()':
                    return new WaitWrapper_1.WaitWrapper('move down ' + args[1].getValue());
                case 'moveLeft()':
                    return new WaitWrapper_1.WaitWrapper('move left ' + args[1].getValue());
                case 'moveRight()':
                    return new WaitWrapper_1.WaitWrapper('move right ' + args[1].getValue());
                default:
                    throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
            }
        }
    },
];

},{"./WaitWrapper":15,"./Wrapper":16}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleCommand = void 0;
const Command_1 = require("./Command");
const VoidWrapper_1 = require("./VoidWrapper");
const WaitWrapper_1 = require("./WaitWrapper");
class SingleCommand extends Command_1.Command {
    constructor(terminal, expression, nextCommand, variableToSet) {
        super(terminal);
        this.variableToSet = "";
        this.nextCommand = nextCommand;
        this.expression = expression;
        this.asyncTask = null;
        this.variableToSet = variableToSet;
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
        if (!this.isSynced() || !this.terminal.running)
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

},{"./Command":5,"./VoidWrapper":14,"./WaitWrapper":15}],11:[function(require,module,exports){
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

},{"./Command":5,"./EndCommand":6}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringWrapper = void 0;
const BoolWrapper_1 = require("./BoolWrapper");
const NumberWrapper_1 = require("./NumberWrapper");
const Wrapper_1 = require("./Wrapper");
class StringWrapper extends Wrapper_1.Wrapper {
    constructor(value) {
        super(value);
        this.type = "string";
    }
    processExpression(trigger, args) {
        const argCount = args.length;
        const expHandler = StringWrapper.processes.find(x => {
            return x.trigger === trigger && x.arguments == argCount;
        });
        if (!expHandler)
            throw Error("this operator, '" + trigger + "' doesn't exist for string");
        return expHandler.process(this, args);
    }
    getValue() {
        return super.getValue();
    }
    setValue(value) {
        super.setValue(value);
    }
}
exports.StringWrapper = StringWrapper;
StringWrapper.processes = [
    {
        trigger: "",
        arguments: 0,
        process: (self, args) => {
            return self;
        }
    },
    {
        trigger: ".",
        arguments: 1,
        process: (self, args) => {
            var _a;
            switch ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.getValue()) {
                case 'toNumber()':
                    const val = +self.getValue();
                    return new NumberWrapper_1.NumberWrapper(val);
                default:
                    throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a string");
            }
        }
    },
    {
        trigger: "+",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof NumberWrapper_1.NumberWrapper)
                return new StringWrapper(self.getValue() + arg.getValue());
            if (arg instanceof StringWrapper)
                return new StringWrapper(self.getValue() + arg.getValue());
            throw new Error("you can't add " + self.getValue() + " and " + arg.getValue());
        }
    },
    {
        trigger: "==",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof StringWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() == arg.getValue());
            return new BoolWrapper_1.BoolWrapper(false);
        }
    },
    {
        trigger: "!=",
        arguments: 1,
        process: (self, args) => {
            const arg = args[0];
            if (arg instanceof StringWrapper)
                return new BoolWrapper_1.BoolWrapper(self.getValue() != arg.getValue());
            return new BoolWrapper_1.BoolWrapper(true);
        }
    },
];

},{"./BoolWrapper":3,"./NumberWrapper":8,"./Wrapper":16}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const EndCommand_1 = require("./EndCommand");
const Expression_1 = require("./Expression");
const SingleCommand_1 = require("./SingleCommand");
const StartCommand_1 = require("./StartCommand");
const VoidWrapper_1 = require("./VoidWrapper");
const Wrapper_1 = require("./Wrapper");
const NumberWrapper_1 = require("./NumberWrapper");
const BoolWrapper_1 = require("./BoolWrapper");
const StringWrapper_1 = require("./StringWrapper");
const BranchCommand_1 = require("./BranchCommand");
const PlayerWrapper_1 = require("./PlayerWrapper");
class Terminal {
    constructor(playerUnit) {
        this.content = "";
        this.running = false;
        this.currentCommand = null;
        this.variables = new Map();
        this.globalExpressionHandlers = [
            {
                trigger: ".",
                arguments: 1,
                process: (self, args) => {
                    switch (args[0].getValue()) {
                        case 'alert()':
                            console.log('alert');
                            return new StringWrapper_1.StringWrapper('alert!');
                        default:
                            throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist globally");
                    }
                }
            },
            {
                trigger: ".",
                arguments: 2,
                process: (self, args) => {
                    switch (args[0].getValue()) {
                        case 'alert()':
                            console.log(args[1].getValue());
                            return args[1];
                        default:
                            throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
                    }
                }
            },
            {
                trigger: ".",
                arguments: 3,
                process: (self, args) => {
                    switch (args[0].getValue()) {
                        case 'random()':
                            if (args[1] instanceof NumberWrapper_1.NumberWrapper && args[2] instanceof NumberWrapper_1.NumberWrapper)
                                return new NumberWrapper_1.NumberWrapper(Math.floor(Math.random() * args[2].getValue() + args[1].getValue()));
                        default:
                            throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
                    }
                }
            },
            {
                trigger: "-",
                arguments: 1,
                process: (self, args) => {
                    if (args[0] instanceof NumberWrapper_1.NumberWrapper)
                        return new NumberWrapper_1.NumberWrapper(-args[0].getValue());
                    throw Error("you tried to negate " + args[0].getValue() + ", you can't negate things that aren't numbers");
                }
            },
            {
                trigger: "!",
                arguments: 1,
                process: (self, args) => {
                    if (args[0] instanceof BoolWrapper_1.BoolWrapper)
                        return new BoolWrapper_1.BoolWrapper(!args[0].getValue());
                    throw Error("you tried to use the not operator (!) on " + args[0].getValue() + ", you can't do this to things that aren't booleans");
                }
            },
        ];
        this.player = new PlayerWrapper_1.PlayerWrapper(playerUnit);
    }
    setContent(value) {
        this.content = value;
    }
    static wrap(value) {
        if (value === 'true' || value === 'false')
            return new BoolWrapper_1.BoolWrapper(value === 'true');
        if (!isNaN(+value))
            return new NumberWrapper_1.NumberWrapper(+value);
        if ((/^".*"$/ && (value.match(/"/g) || []).length == 2))
            return new StringWrapper_1.StringWrapper(value.replace(/"/g, ''));
        if ((/^'.*'$/ && (value.match(/'/g) || []).length == 2))
            return new StringWrapper_1.StringWrapper(value.replace(/'/g, ''));
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
                    if (i == code.length - 1)
                        throw Error('there is an open string, missing "/\' ');
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
    processGlobalExpression(trigger, args) {
        const expHandler = this.globalExpressionHandlers.find(x => {
            return x.trigger === trigger && x.arguments == args.length;
        });
        if (!expHandler) {
            try {
                return this.player.processExpression(trigger, args);
            }
            catch (err) {
                throw Error("this method, '" + args[0].getValue() + "' doesn't exist globally");
            }
        }
        try {
            return expHandler.process(new VoidWrapper_1.VoidWrapper(), args);
        }
        catch (err1) {
            try {
                return this.player.processExpression(trigger, args);
            }
            catch (err2) {
                throw err1;
            }
        }
    }
    _compile(codeTokens) {
        const startCommand = new StartCommand_1.StartCommand(this);
        var placeholderCommands = [startCommand];
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
                            if (i >= codeTokens.length)
                                throw Error('there is an opened bracket, missing )');
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
                            condition = this.compileExpression(conditionTokens);
                        }
                        var temp = new BranchCommand_1.BranchCommand(this, condition);
                        setNextCommand(temp);
                        // if true
                        if (codeTokens[++i] !== '{') {
                            const commandTokens = [codeTokens[i]];
                            while (codeTokens[++i] !== ';') {
                                if (i >= codeTokens.length)
                                    throw Error('missing curly braces, if ex. if(true){moveRight();}');
                                commandTokens.push(codeTokens[i]);
                            }
                            const compiledCommand = this.compileSingleCommand(this, commandTokens);
                            temp.setTrueNextCommand(compiledCommand);
                            placeholderCommands = [compiledCommand];
                        }
                        else {
                            const codeBlockTokens = [codeTokens[++i]];
                            var bracketCounter = 1;
                            if (codeTokens[i] === '}') {
                                const empty = new StartCommand_1.StartCommand(this);
                                temp.setTrueNextCommand(empty);
                                placeholderCommands = [empty];
                            }
                            else {
                                while (bracketCounter > 0) {
                                    i++;
                                    if (i >= codeTokens.length)
                                        throw Error('there is an open curly bracket, missing }');
                                    switch (codeTokens[i]) {
                                        case '{':
                                            bracketCounter++;
                                            break;
                                        case '}':
                                            bracketCounter--;
                                            break;
                                        default:
                                            break;
                                    }
                                    if (bracketCounter > 0) {
                                        codeBlockTokens.push(codeTokens[i]);
                                    }
                                }
                                const compiledBlockCommands = this._compile(codeBlockTokens);
                                temp.setTrueNextCommand(compiledBlockCommands.startCommand);
                                placeholderCommands = [...compiledBlockCommands.endCommands];
                            }
                        }
                        while (codeTokens[i + 1] === 'else' && codeTokens[i + 2] === 'if') {
                            i += 2;
                            if (codeTokens[++i] !== '(')
                                throw Error('if syntax error, correct syntax ex. : if(a == "test"){ moveUp(); }');
                            const conditionTokens = [];
                            var bracketCounter = 1;
                            while (bracketCounter > 0) {
                                i++;
                                if (i >= codeTokens.length)
                                    throw Error('there is an opened bracket, missing )');
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
                                condition = this.compileExpression(conditionTokens);
                            }
                            const elseif = new BranchCommand_1.BranchCommand(this, condition);
                            temp.setFalseNextCommand(elseif);
                            temp = elseif;
                            // if true
                            if (codeTokens[++i] !== '{') {
                                const commandTokens = [codeTokens[i]];
                                while (codeTokens[++i] !== ';') {
                                    if (i >= codeTokens.length)
                                        throw Error('missing curly braces, if ex. if(true){moveRight();}');
                                    commandTokens.push(codeTokens[i]);
                                }
                                const compiledCommand = this.compileSingleCommand(this, commandTokens);
                                temp.setTrueNextCommand(compiledCommand);
                                placeholderCommands = [...placeholderCommands, compiledCommand];
                            }
                            else {
                                const codeBlockTokens = [codeTokens[++i]];
                                var bracketCounter = 1;
                                if (codeTokens[i] === '}') {
                                    const empty = new StartCommand_1.StartCommand(this);
                                    temp.setTrueNextCommand(empty);
                                    placeholderCommands = [...placeholderCommands, empty];
                                }
                                else {
                                    while (bracketCounter > 0) {
                                        if (i >= codeTokens.length)
                                            throw Error('there is an open curly bracket, missing }');
                                        switch (codeTokens[++i]) {
                                            case '{':
                                                bracketCounter++;
                                                break;
                                            case '}':
                                                bracketCounter--;
                                                break;
                                            default:
                                                break;
                                        }
                                        if (bracketCounter > 0) {
                                            codeBlockTokens.push(codeTokens[i]);
                                        }
                                    }
                                    const compiledBlockCommands = this._compile(codeBlockTokens);
                                    temp.setTrueNextCommand(compiledBlockCommands.startCommand);
                                    placeholderCommands = [...placeholderCommands, ...compiledBlockCommands.endCommands];
                                }
                            }
                        }
                        // if false
                        if (codeTokens[i + 1] === 'else') {
                            i++;
                            if (codeTokens[++i] !== '{') {
                                const commandTokens = [codeTokens[i]];
                                while (codeTokens[++i] !== ';') {
                                    if (i >= codeTokens.length)
                                        throw Error('missing curly braces, if ex. if(true){moveRight();}');
                                    commandTokens.push(codeTokens[i]);
                                }
                                const compiledCommand = this.compileSingleCommand(this, commandTokens);
                                temp.setFalseNextCommand(compiledCommand);
                                placeholderCommands.push(compiledCommand);
                            }
                            else {
                                const codeBlockTokens = [codeTokens[++i]];
                                var bracketCounter = 1;
                                if (codeTokens[i] === '}') {
                                    const empty = new StartCommand_1.StartCommand(this);
                                    temp.setFalseNextCommand(empty);
                                    placeholderCommands = [...placeholderCommands, empty];
                                }
                                else {
                                    while (bracketCounter > 0) {
                                        if (i >= codeTokens.length)
                                            throw Error('there is an open curly bracket, missing }');
                                        switch (codeTokens[++i]) {
                                            case '{':
                                                bracketCounter++;
                                                break;
                                            case '}':
                                                bracketCounter--;
                                                break;
                                            default:
                                                break;
                                        }
                                        if (bracketCounter > 0) {
                                            codeBlockTokens.push(codeTokens[i]);
                                        }
                                    }
                                    const compiledBlockCommands = this._compile(codeBlockTokens);
                                    temp.setFalseNextCommand(compiledBlockCommands.startCommand);
                                    placeholderCommands = [...placeholderCommands, ...compiledBlockCommands.endCommands];
                                }
                            }
                        }
                        else {
                            placeholderCommands.push(temp);
                        }
                    }
                    break;
                case "while":
                    {
                        if (codeTokens[++i] !== '(')
                            throw Error('while syntax error, correct syntax ex. : while(a == "up"){ moveUp(); }');
                        const conditionTokens = [];
                        var bracketCounter = 1;
                        while (bracketCounter > 0) {
                            i++;
                            if (i >= codeTokens.length)
                                throw Error('there is an opened bracket, missing )');
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
                            condition = this.compileExpression(conditionTokens);
                        }
                        var temp = new BranchCommand_1.BranchCommand(this, condition);
                        setNextCommand(temp);
                        // if true
                        if (codeTokens[++i] !== '{') {
                            const commandTokens = [codeTokens[i]];
                            while (codeTokens[++i] !== ';') {
                                if (i >= codeTokens.length)
                                    throw Error('missing curly braces, if ex. if(true){moveRight();}');
                                commandTokens.push(codeTokens[i]);
                            }
                            const compiledCommand = this.compileSingleCommand(this, commandTokens);
                            temp.setTrueNextCommand(compiledCommand);
                            placeholderCommands = [compiledCommand];
                        }
                        else {
                            const codeBlockTokens = [codeTokens[++i]];
                            var bracketCounter = 1;
                            if (codeTokens[i] === '}') {
                                const empty = new StartCommand_1.StartCommand(this);
                                temp.setTrueNextCommand(empty);
                                placeholderCommands = [empty];
                            }
                            else {
                                while (bracketCounter > 0) {
                                    if (i >= codeTokens.length)
                                        throw Error('there is an open curly bracket, missing }');
                                    switch (codeTokens[++i]) {
                                        case '{':
                                            bracketCounter++;
                                            break;
                                        case '}':
                                            bracketCounter--;
                                            break;
                                        default:
                                            break;
                                    }
                                    if (bracketCounter > 0) {
                                        codeBlockTokens.push(codeTokens[i]);
                                    }
                                }
                                const compiledBlockCommands = this._compile(codeBlockTokens);
                                temp.setTrueNextCommand(compiledBlockCommands.startCommand);
                                placeholderCommands = [...compiledBlockCommands.endCommands];
                            }
                        }
                        setNextCommand(temp);
                        placeholderCommands = [temp];
                    }
                    break;
                case "for":
                    {
                        if (codeTokens[++i] !== '(')
                            throw Error('for syntax error, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }');
                        const commandTokens = [];
                        var bracketCounter = 1;
                        while (bracketCounter > 0) {
                            i++;
                            if (i >= codeTokens.length)
                                throw Error('there is an opened bracket, missing )');
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
                                commandTokens.push(codeTokens[i]);
                            }
                        }
                        if (commandTokens[1] !== '=')
                            throw Error('for syntax error, it needs to have an assignment, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }');
                        const splitIndex = commandTokens.indexOf('to');
                        if (splitIndex == -1)
                            throw Error("for syntax error, it needs to have a 'to' keyword, correct syntax ex. : for(index = 0 to 8){ moveUp(index); }");
                        const assignmentCommand = this.compileSingleCommand(this, commandTokens.slice(0, splitIndex));
                        const targetExpression = this.compileExpression(commandTokens.slice(splitIndex + 1));
                        const conditionExpression = new Expression_1.Expression(this, "<=", commandTokens[0], [targetExpression]);
                        const incrementCommand = this.compileSingleCommand(this, [commandTokens[0], '=', commandTokens[0], '+', '1']);
                        const conditionCommand = new BranchCommand_1.BranchCommand(this, conditionExpression);
                        setNextCommand(assignmentCommand);
                        assignmentCommand.setNextCommand(conditionCommand);
                        incrementCommand.setNextCommand(conditionCommand);
                        placeholderCommands = [conditionCommand];
                        if (codeTokens[++i] !== '{') {
                            const commandTokens = [codeTokens[i]];
                            while (codeTokens[++i] !== ';') {
                                if (i >= codeTokens.length)
                                    throw Error('missing semicolon , if ex. if(true)moveRight();');
                                commandTokens.push(codeTokens[i]);
                            }
                            const compiledCommand = this.compileSingleCommand(this, commandTokens);
                            conditionCommand.setTrueNextCommand(compiledCommand);
                            compiledCommand.setNextCommand(incrementCommand);
                        }
                        else {
                            const codeBlockTokens = [codeTokens[++i]];
                            var bracketCounter = 1;
                            if (codeTokens[i] === '}') {
                                const empty = new StartCommand_1.StartCommand(this);
                                conditionCommand.setTrueNextCommand(empty);
                                empty.setNextCommand(incrementCommand);
                            }
                            else {
                                while (bracketCounter > 0) {
                                    if (i >= codeTokens.length)
                                        throw Error('there is an open curly bracket, missing }');
                                    switch (codeTokens[++i]) {
                                        case '{':
                                            bracketCounter++;
                                            break;
                                        case '}':
                                            bracketCounter--;
                                            break;
                                        default:
                                            break;
                                    }
                                    if (bracketCounter > 0) {
                                        codeBlockTokens.push(codeTokens[i]);
                                    }
                                }
                                const compiledBlockCommands = this._compile(codeBlockTokens);
                                conditionCommand.setTrueNextCommand(compiledBlockCommands.startCommand);
                                compiledBlockCommands.endCommands.forEach(x => {
                                    if (x instanceof StartCommand_1.StartCommand)
                                        x.setNextCommand(incrementCommand);
                                    if (x instanceof SingleCommand_1.SingleCommand)
                                        x.setNextCommand(incrementCommand);
                                    if (x instanceof BranchCommand_1.BranchCommand)
                                        x.setFalseNextCommand(incrementCommand);
                                });
                            }
                        }
                    }
                    break;
                default:
                    {
                        if (codeTokens[i] === ';')
                            continue;
                        const commandTokens = [];
                        do {
                            commandTokens.push(codeTokens[i]);
                            if (i > codeTokens.length)
                                throw Error('missing ;');
                        } while (codeTokens[++i] !== ';');
                        const compiledCommand = this.compileSingleCommand(this, commandTokens);
                        setNextCommand(compiledCommand);
                        placeholderCommands = [compiledCommand];
                    }
                    break;
            }
        }
        return {
            startCommand: startCommand.getNextCommand(),
            endCommands: placeholderCommands
        };
        function setNextCommand(command) {
            placeholderCommands.forEach(x => {
                if (x instanceof StartCommand_1.StartCommand)
                    x.setNextCommand(command);
                if (x instanceof SingleCommand_1.SingleCommand)
                    x.setNextCommand(command);
                if (x instanceof BranchCommand_1.BranchCommand)
                    x.setFalseNextCommand(command);
            });
        }
    }
    compileSingleCommand(terminal, commandTokens) {
        const assignment = commandTokens.includes('=');
        var variable = "";
        var expression;
        if (assignment && commandTokens.indexOf('=') != 1)
            throw Error('invalid assignment syntax, valid ex. a = 3');
        if (assignment) {
            if (Terminal.checkVariableName(commandTokens[0])) {
                variable = commandTokens[0];
                expression = this.compileExpression(commandTokens.slice(2));
            }
            else
                throw Error('invalid variable name');
        }
        else {
            expression = this.compileExpression(commandTokens);
        }
        return new SingleCommand_1.SingleCommand(terminal, expression, null, variable);
    }
    compileExpression(expTokens) {
        var _a;
        const globalSymbol = '@g';
        const postfixedTokens = [];
        const postfixOps = [];
        const opsRegex = /^((==|!=|\|\||&&|<=|>=)|[<>!%+\-*\/])$|^\./;
        const unaryOpsRegex = /^[!-]$/;
        const separatorRegex = /^[\(\),]$/;
        const priority = [
            ['.'],
            ['!'],
            ['*', '/', '%'],
            ['+', '-'],
            ['<', '>', '<=', '>='],
            ['==', '!='],
            ['&&'],
            ['||']
        ];
        // postfixify
        for (let i = 0; i < expTokens.length; i++) {
            if (opsRegex.test(expTokens[i])) {
                //check if this is a unary operator by looking at the token before, if it's an operator or a bracket then this operator is most likely to be unary
                if (unaryOpsRegex.test(expTokens[i]) && (!expTokens[i - 1] || (opsRegex.test(expTokens[i - 1]) && expTokens[i - 1] !== '.') || separatorRegex.test(expTokens[i - 1]))) {
                    postfixedTokens.push(globalSymbol);
                    stackOp(expTokens[i]);
                    continue;
                }
                // if two operators are stacked together, throw an error
                if (expTokens[i - 1] && (opsRegex.test(expTokens[i - 1]) || (separatorRegex.test(expTokens[i - 1]) && expTokens[i - 1] !== ')')))
                    throw Error('something is wrong at : ' + expTokens.slice(i - 1, i + 2).join(' '));
                // if the operator is stackable according to the priority table then stack, else eject previous ones until stackable again
                while (!opStackable(peek(postfixOps), expTokens[i])) {
                    pushOp();
                }
                stackOp(expTokens[i]);
                continue;
            }
            if (expTokens[i] === '(') {
                postfixOps.push('(');
                continue;
            }
            if (expTokens[i] === ')') {
                var op;
                while ((op = peek(postfixOps)) && op !== '(') {
                    pushOp();
                }
                if (postfixOps.length == 0)
                    throw Error('uneven number of brackets, "(" missing');
                postfixOps.pop();
                continue;
            }
            if (expTokens[i] === ',') {
                while ((op = peek(postfixOps)) && op !== '(') {
                    pushOp();
                }
                continue;
            }
            // if the code reaches this part that means the token is most likely not a symbol
            // throw an error if values or variables are stacked next to each other
            if (expTokens[i - 1] && !opsRegex.test(expTokens[i - 1]) && !separatorRegex.test(expTokens[i - 1]))
                throw Error('something is wrong at 2: ' + expTokens.slice(i - 1, i + 2).join(' '));
            if (expTokens[i + 1] === '(') {
                if (expTokens[i - 1] !== '.') {
                    postfixedTokens.push(globalSymbol);
                    stackOp('.' + expTokens[i] + '()');
                    continue;
                }
                postfixOps[postfixOps.length - 1] += expTokens[i] + '()';
                continue;
            }
            postfixedTokens.push(expTokens[i]);
        }
        // push all remaining operators
        while (postfixOps.length > 0) {
            if (peek(postfixOps) === '(')
                throw Error('uneven number of brackets, ")" missing');
            pushOp();
        }
        // convert postfix string into expression tree
        var root = new Expression_1.Expression(this);
        var expressionParentStack = [root];
        setSelfExpression(expressionParentStack[0], postfixedTokens[0]);
        if (postfixedTokens.length == 1) {
            return expressionParentStack[0];
        }
        for (let i = 1; i < postfixedTokens.length; i++) {
            if (postfixedTokens[i] === '(') {
                if (opsRegex.test(postfixedTokens[i - 1])) {
                    const oldParent = expressionParentStack.pop();
                    if (!oldParent)
                        throw Error('expressionParentStack is emtpy, this is a bug in the compiler');
                    const newParent = new Expression_1.Expression(this, null, oldParent.isSelfExpression() ? oldParent.getFirst() : oldParent, []);
                    expressionParentStack.push(newParent);
                    if (root == newParent)
                        root = newParent;
                }
                continue;
            }
            if (postfixedTokens[i] === ')') {
                if (!opsRegex.test(postfixedTokens[i + 1]))
                    throw Error('there is no operator after the closing curly bracket');
                if (postfixedTokens[i - 1] === '(') {
                    i += 1;
                    const parent = peek(expressionParentStack);
                    if (/^\..+/.test(postfixedTokens[i])) {
                        parent.setTrigger('.');
                        parent.addArg(new StringWrapper_1.StringWrapper(postfixedTokens[i].substring(1)));
                    }
                    else {
                        throw Error('there is not supposed to be any operator that accepts 0 parameters other than methods');
                        // parent.setTrigger(postfixedTokens[i])
                        // parent.setArgs([])
                    }
                    continue;
                }
                i += 1;
                const lastParameter = expressionParentStack.pop();
                if (!lastParameter)
                    throw Error('lastParameter undefined, something is wrong here');
                const first = lastParameter.getFirst();
                if (first == null)
                    throw Error('lastParameter first is not supposed to be null but it is, something is wrong here');
                const parent = peek(expressionParentStack);
                parent.addArg(lastParameter.isSelfExpression() ? first : lastParameter);
                if (/^\..+/.test(postfixedTokens[i])) {
                    parent.setTrigger('.');
                    parent.setArgs([new StringWrapper_1.StringWrapper(postfixedTokens[i].substring(1)), ...((_a = parent.getArgs()) !== null && _a !== void 0 ? _a : [])]);
                }
                else {
                    parent.setTrigger(postfixedTokens[i]);
                }
                continue;
            }
            // if the code reaches this part then the current token is most likely a variable or an argument
            if (postfixedTokens[i - 1] !== '(') {
                // if the code reaches this part then this part is where the next argument starts
                const lastParameter = expressionParentStack.pop();
                if (!lastParameter)
                    throw Error('lastParameter undefined, something is wrong here');
                const first = lastParameter.getFirst();
                if (first == null)
                    throw Error('lastParameter first is not supposed to be null but it is, something is wrong here');
                const parent = peek(expressionParentStack);
                parent.addArg(lastParameter.isSelfExpression() ? first : lastParameter);
            }
            const newParent = new Expression_1.Expression(this);
            setSelfExpression(newParent, postfixedTokens[i]);
            expressionParentStack.push(newParent);
        }
        return expressionParentStack[0];
        function setSelfExpression(expression, value) {
            try {
                expression.setFirst(Terminal.wrap(value));
            }
            catch (err) {
                expression.setFirst(value);
            }
            expression.setTrigger(null);
            expression.setArgs(null);
        }
        function peek(stack) {
            return stack[stack.length - 1];
        }
        function opStackable(prevOp, op) {
            if (prevOp == undefined || prevOp === '(')
                return true;
            if (/^\./.test(op))
                return true;
            if (/^\./.test(prevOp))
                return false;
            for (let i = 0; i < priority.length; i++) {
                if (priority[i].includes(prevOp))
                    return false;
                if (priority[i].includes(op))
                    return true;
            }
            return true;
        }
        function stackOp(op) {
            postfixedTokens.push('(');
            postfixOps.push(op);
        }
        function pushOp() {
            const op = postfixOps.pop();
            if (!op)
                return;
            postfixedTokens.push(')');
            postfixedTokens.push(op);
        }
    }
    compile() {
        const compiled = this._compile(Terminal.tokenize(this.content));
        compiled.endCommands.forEach(x => {
            if (x instanceof StartCommand_1.StartCommand)
                x.setNextCommand(new EndCommand_1.EndCommand(this));
            if (x instanceof SingleCommand_1.SingleCommand)
                x.setNextCommand(new EndCommand_1.EndCommand(this));
            if (x instanceof BranchCommand_1.BranchCommand)
                x.setFalseNextCommand(new EndCommand_1.EndCommand(this));
        });
        this.variables = new Map();
        this.currentCommand = new StartCommand_1.StartCommand(this, compiled.startCommand);
        console.log(this.currentCommand);
    }
    execute() {
        this.running = true;
    }
    stop() {
        this.running = false;
    }
}
exports.Terminal = Terminal;

},{"./BoolWrapper":3,"./BranchCommand":4,"./EndCommand":6,"./Expression":7,"./NumberWrapper":8,"./PlayerWrapper":9,"./SingleCommand":10,"./StartCommand":11,"./StringWrapper":12,"./VoidWrapper":14,"./Wrapper":16}],14:[function(require,module,exports){
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
        this.type = "void";
    }
}
exports.VoidWrapper = VoidWrapper;

},{"./Wrapper":16}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitWrapper = void 0;
const VoidWrapper_1 = require("./VoidWrapper");
class WaitWrapper extends VoidWrapper_1.VoidWrapper {
    constructor(command) {
        super();
        this.type = "wait";
        this.command = command;
    }
}
exports.WaitWrapper = WaitWrapper;

},{"./VoidWrapper":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
class Wrapper {
    constructor(value) {
        this.value = null;
        this.type = "wrapper";
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

},{}],17:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Grid_1 = require("./GameObjects/Grid");
const Player_1 = require("./Player");
const Direction_1 = require("./GameObjects/Direction");
const API_1 = require("./API");
class GameManager {
    constructor(canvasView = null, terminalView = null, shopView, inventoryView = null, questionView = null) {
        this.api = null;
        this.lastTimeStamp = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrameId = -1;
        this.player = new Player_1.Player();
        this.terminalView = null;
        this.grid = new Grid_1.Grid({ x: 100, y: 100 });
        this.canvasView = null;
        this.activePlayerUnit = null;
        this.shopView = null;
        this.inventoryView = null;
        this.questionView = null;
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        this.setShopView(shopView);
        this.setInventoryView(inventoryView);
        this.api = new API_1.API();
        this.setQuestionView(questionView);
    }
    load() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            alert('await load');
            let map = { tile: [], entity: [] };
            map = yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.gameStart()); //use non-null assertion operator.
            alert(map.tile.length);
            //redoing load grid because the constructor cannot be an async function.
            this.grid = new Grid_1.Grid({ x: 100, y: 100 });
            this.grid.redo(map.tile, map.entity);
            this.grid.addEntity(this.player.units[0]);
            this.setActivePlayerUnit(this.player.units[0]);
            (_b = this.questionView) === null || _b === void 0 ? void 0 : _b.setPlayer(this.player);
            yield ((_c = this.questionView) === null || _c === void 0 ? void 0 : _c.load());
            (_d = this.questionView) === null || _d === void 0 ? void 0 : _d.refreshStats();
        });
    }
    getQuestionView() {
        return this.questionView;
    }
    setInventoryView(inventoryView) {
        this.inventoryView = inventoryView;
    }
    getInventoryView() {
        return this.inventoryView;
    }
    //API testing
    // public async testAPI(){
    //     const string1 = await this.api?.gameStart();
    //     return string1;
    // }
    testAPIsoal() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const string1 = yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.getQuestion());
            return string1;
        });
    }
    removeGridEntity(x, y) {
        var _a, _b;
        this.player.addGold((_a = this.grid.entityGrid[y][x]) === null || _a === void 0 ? void 0 : _a.entityDrop());
        (_b = this.questionView) === null || _b === void 0 ? void 0 : _b.refreshStats();
        this.grid.entityGrid[y][x] = null;
    }
    alertEntity() {
        console.log(this.grid.entities);
    }
    setShopView(shopView) {
        this.shopView = shopView;
    }
    getShopView() {
        return this.shopView;
    }
    getDeltatime() {
        return this.deltaTime;
    }
    //change current equipment
    changeEquipment() {
    }
    isGoodEnough(level, target) {
        return level >= target;
    }
    //commit action
    //actionType:
    //1 = mine
    //2 = break
    //Direction.Under = dig
    Action(direction, actionType) {
        const coords = this.player.getCoordinate();
        let temp = null;
        switch (direction) {
            case Direction_1.Direction.Up:
                temp = this.grid.getEntity((coords.x), (coords.y - 1));
                if (temp) {
                    switch (actionType) {
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()))
                                    this.removeGridEntity(coords.x, (coords.y - 1));
                                //if equipment is not good enough
                                else
                                    alert('equipment is not good enough');
                            }
                            else {
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            switch (temp.getEntityName()) {
                                case 'Chest':
                                    alert('this is a chest');
                                    this.removeGridEntity(coords.x, (coords.y - 1));
                                    break;
                                default: //wrong equipment to destroy entity
                                    alert('this is the wrong tool!');
                                    break;
                            }
                            break;
                        default:
                            alert('Invalid action!');
                            break;
                    }
                }
                else {
                    alert('no entity object');
                }
                break;
            case Direction_1.Direction.Down:
                temp = this.grid.getEntity((coords.x), (coords.y + 1));
                if (temp) {
                    switch (actionType) {
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()))
                                    this.removeGridEntity(coords.x, (coords.y + 1));
                                //if equipment is not good enough
                                else
                                    alert('equipment is not good enough');
                            }
                            else {
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            break;
                        default:
                            alert('Invalid action!');
                            break;
                    }
                }
                break;
            case Direction_1.Direction.Left:
                temp = this.grid.getEntity((coords.x - 1), (coords.y));
                if (temp) {
                    switch (actionType) {
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()))
                                    this.removeGridEntity((coords.x - 1), (coords.y));
                                //if equipment is not good enough
                                else
                                    alert('equipment is not good enough');
                            }
                            else {
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            break;
                        default:
                            alert('Invalid action!');
                            break;
                    }
                }
                break;
            case Direction_1.Direction.Right:
                temp = this.grid.getEntity((coords.x + 1), (coords.y));
                if (temp) {
                    switch (actionType) {
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()))
                                    this.removeGridEntity((coords.x + 1), (coords.y));
                                //if equipment is not good enough
                                else
                                    alert('equipment is not good enough');
                            }
                            else {
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            break;
                        default:
                            alert('Invalid action!');
                            break;
                    }
                }
                break;
            case Direction_1.Direction.Under: //shovel
                break;
            default:
                break;
        }
    }
    setActivePlayerUnit(value) {
        var _a, _b;
        (_a = this.terminalView) === null || _a === void 0 ? void 0 : _a.setTerminal((_b = value === null || value === void 0 ? void 0 : value.terminal) !== null && _b !== void 0 ? _b : null);
        this.activePlayerUnit = value;
    }
    setQuestionView(questionView) {
        this.questionView = questionView;
    }
    getActivePlayerUnit() {
        return this.activePlayerUnit;
    }
    getPlayer() {
        return this.player;
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
        var _a;
        if (!this.canvasView) {
            this.grid.update(this.deltaTime);
            return;
        }
        this.canvasView.setCameraPosition(((_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.getSpriteCoordinate()) || { x: 0, y: 0 });
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

},{"./API":1,"./GameObjects/Direction":22,"./GameObjects/Grid":26,"./Player":39}],18:[function(require,module,exports){
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

},{"./ChainedAnimation":20,"./GroupAnimation":27}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./Animation":19}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chest = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Chest extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Chest", 1, 10, 50);
        this.getLoot = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'chest', Animation_1.Animation.assets['chest_normal'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Chest = Chest;

},{"./Animation":19,"./ChainedAnimation":20,"./Entity":23}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["Under"] = 4] = "Under";
    Direction[Direction["None"] = 5] = "None";
})(Direction || (exports.Direction = Direction = {}));

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Animated_1 = require("./Animated");
class Entity extends Animated_1.Animated {
    constructor(coordinate, animations = [], entityName, entityLevel, minValue, maxValue) {
        super(animations);
        this.grid = null;
        this.entityType = null;
        this.entityLevel = null;
        this.entityName = null;
        this.minValue = null;
        this.maxValue = null;
        this.coordinate = coordinate;
        this.entityName = entityName;
        this.entityLevel = entityLevel;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    getCoordinate() {
        return this.coordinate;
    }
    getEntityName() {
        if (this.entityName) {
            return this.entityName;
        }
        return "";
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
    getEntityLevel() {
        return this.entityLevel;
    }
    setEntityLevel(x) {
        this.entityLevel = x;
    }
    entityDrop() {
        if (this.minValue != null && this.maxValue != null) {
            return Math.round(Math.random() * this.maxValue) + this.minValue;
        }
        else {
            return 0; //if this returns into 0 there's sumting wong
        }
    }
}
exports.Entity = Entity;

},{"./Animated":18}],24:[function(require,module,exports){
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

},{"./GroupAnimation":27,"./Tile":31}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gravel = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Gravel extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[3]);
        this.currentAnimationIndex = 0;
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Gravel = Gravel;

},{"./GroupAnimation":27,"./Tile":31}],26:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Grass_1 = require("./Grass");
const GroupAnimation_1 = require("./GroupAnimation");
const PlayerUnit_1 = require("./PlayerUnit");
const Sand_1 = require("./Sand");
const Gravel_1 = require("./Gravel");
const Rock_1 = require("./Rock");
const Chest_1 = require("./Chest");
const ChainedAnimation_1 = require("./ChainedAnimation");
const Animation_1 = require("./Animation");
const gold_ore_1 = require("./gold_ore");
const silver_ore_1 = require("./silver_ore");
const iron_ore_1 = require("./iron_ore");
class Grid {
    constructor(size) {
        this.size = size;
        this.entities = [];
        this.entityGrid = [];
        this.tiles = [];
    }
    redo(map, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.size.y; i++) {
                this.entityGrid.push([]);
                this.tiles.push([]);
                for (let j = 0; j < this.size.x; j++) {
                    this.entityGrid[i].push(null);
                    if (map[j][i] == "grass") {
                        this.tiles[i].push(new Grass_1.Grass({ x: j, y: i }));
                    }
                    else {
                        if (map[j][i] == "sand") {
                            this.tiles[i].push(new Sand_1.Sand({ x: j, y: i }));
                        }
                        else {
                            this.tiles[i].push(new Gravel_1.Gravel({ x: j, y: i }));
                        }
                    }
                    // if(entity[j][i]=="rock"){
                    //     const rock = new Rock({ x: j, y: i });
                    //     rock.addAnimation(new ChainedAnimation(
                    //         rock,
                    //         'rock',
                    //         Animation.assets['rock'],
                    //         { x: 32, y: 32 },
                    //         1,
                    //         -1,
                    //         1
                    //     ))
                    //     this.addEntity(rock);
                    // }
                    // else if(entity[j][i]=="chest"){
                    //     const chest = new Chest({x:j, y:i});
                    //     chest.addAnimation(new ChainedAnimation(
                    //         chest,
                    //         'chest',
                    //         Animation.assets['chest_normal'],
                    //         {x:32, y:32},
                    //         1,
                    //         -1,
                    //         1
                    //     ))
                    //     this.addEntity(chest);
                    // }
                    switch (entity[j][i]) {
                        case 'rock':
                            const rock = new Rock_1.Rock({ x: j, y: i });
                            rock.addAnimation(new ChainedAnimation_1.ChainedAnimation(rock, 'rock', Animation_1.Animation.assets['rock'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(rock);
                            break;
                        case 'iron_ore':
                            const iron_ore = new iron_ore_1.Iron_ore({ x: j, y: i });
                            iron_ore.addAnimation(new ChainedAnimation_1.ChainedAnimation(iron_ore, 'Iron_ore', Animation_1.Animation.assets['iron_ore'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(iron_ore);
                            break;
                        case 'silver_ore':
                            const silver_ore = new silver_ore_1.Silver_ore({ x: j, y: i });
                            silver_ore.addAnimation(new ChainedAnimation_1.ChainedAnimation(silver_ore, 'Silver_ore', Animation_1.Animation.assets['silver_ore'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(silver_ore);
                            break;
                        case 'gold_ore':
                            const gold_ore = new gold_ore_1.Gold_ore({ x: j, y: i });
                            gold_ore.addAnimation(new ChainedAnimation_1.ChainedAnimation(gold_ore, 'Gold_ore', Animation_1.Animation.assets['gold_ore'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(gold_ore);
                            break;
                        case 'chest':
                            const chest = new Chest_1.Chest({ x: j, y: i });
                            chest.addAnimation(new ChainedAnimation_1.ChainedAnimation(chest, 'chest', Animation_1.Animation.assets['chest_normal'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(chest);
                            break;
                        case 'medium_chest':
                            break;
                        case 'big_chest':
                            break;
                        default:
                            break;
                    }
                }
            }
        });
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
    getEntity(x, y) {
        return this.entityGrid[y][x];
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

},{"./Animation":19,"./ChainedAnimation":20,"./Chest":21,"./Grass":24,"./Gravel":25,"./GroupAnimation":27,"./PlayerUnit":28,"./Rock":29,"./Sand":30,"./gold_ore":32,"./iron_ore":33,"./silver_ore":34}],27:[function(require,module,exports){
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

},{"./Animation":19}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
const Terminal_1 = require("../Console/Terminal");
const Inventory_1 = require("../Items/Inventory");
const Direction_1 = require("./Direction");
const Entity_1 = require("./Entity");
class PlayerUnit extends Entity_1.Entity {
    constructor(coordinate, moveSpeed = 1, animations = []) {
        super(coordinate, animations, "Player", 99, 99, 99);
        this.isMoving = false;
        this.moveSpeed = 1;
        this.lerpProgress = 0;
        this.moveProgress = 0;
        this.moveIteration = 0;
        this.direction = Direction_1.Direction.None;
        this.inventory = new Inventory_1.Inventory();
        this.equipped = null;
        this.terminal = new Terminal_1.Terminal(this);
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
    getLerpProgress() {
        return this.lerpProgress;
    }
    setLerpProgress(value) {
        this.lerpProgress = value;
    }
    update(deltaTime) {
        var _a;
        // console.log(this.lerpProgress);
        if (this.terminal.running) {
            try {
                (_a = this.terminal.currentCommand) === null || _a === void 0 ? void 0 : _a.Execute();
            }
            catch (err) {
                console.log('Runtime ' + err);
                this.terminal.stop();
            }
        }
        var currentCommand = this.terminal.currentCommand;
        // if(currentCommand instanceof SingleCommand){
        //     const asyncTask = currentCommand.getAsyncTask()
        //     if(asyncTask && this.terminal.running){
        //         const taskDetail = asyncTask.split(' ')
        //         if(taskDetail[0] === 'move'){
        //             switch(taskDetail[1]){
        //                 case 'up':
        //                     this.direction = Direction.Up;
        //                     break;
        //                 case 'down':
        //                     this.direction = Direction.Down;
        //                     break;
        //                 case 'left':
        //                     this.direction = Direction.Left;
        //                     break;
        //                 case 'right':
        //                     this.direction = Direction.Right;
        //                     break;
        //                 default:
        //                     this.direction = Direction.None;
        //                     break;
        //             }
        //             this.moveIteration = Number.parseInt(taskDetail[2])
        //             if(!this.isMoving)this.move(this.direction)
        //         }
        //     }
        if (this.isMoving)
            this.lerpProgress += deltaTime * this.moveSpeed;
        if (this.lerpProgress >= 1) {
            this.moveProgress += 1;
            this.lerpProgress = 0;
            this.originalCoordinate = this.coordinate;
            this.isMoving = false;
            this.playAnimation('idle');
            // if(this.moveProgress < this.moveIteration) {
            //     if(!this.terminal.running){
            //         this.moveProgress  = 0
            //         this.moveIteration = 0
            //         this.playAnimation('idle')
            //         return
            //     }
            //     this.move(this.direction)
            //     return
            // }
            // this.moveProgress  = 0
            // this.moveIteration = 0
            // currentCommand = currentCommand.jumpNextCommand()
            // try{
            //     currentCommand.Execute()
            // }
            // catch(err){
            //     console.log('Runtime ' + err)
            //     this.terminal.stop()
            // }
            // if(!(currentCommand instanceof SingleCommand) || !(currentCommand.getAsyncTask()?.startsWith('move '))){
            //     this.playAnimation('idle')
            // }
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
    getX() {
        return this.coordinate.x;
    }
    getY() {
        return this.coordinate.y;
    }
    //In-game actions
    Dig() {
    }
    Mine() {
        if (this.isMoving)
            return;
        this.isMoving = true;
        this.playAnimation('walk');
    }
    move(direction) {
        if (this.isMoving || direction == Direction_1.Direction.None)
            return;
        this.isMoving = true;
        // this.playAnimation('walk')
        switch (direction) {
            case Direction_1.Direction.Left:
                this.playAnimation('walk_reverse');
                break;
            case Direction_1.Direction.Right:
                this.playAnimation('walk');
                break;
            default:
                this.playAnimation('walk');
                break;
        }
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

},{"../Console/Terminal":13,"../Items/Inventory":37,"./Direction":22,"./Entity":23}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Rock extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Rock", 1, 10, 50);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'rock', Animation_1.Animation.assets['rock'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Rock = Rock;

},{"./Animation":19,"./ChainedAnimation":20,"./Entity":23}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sand = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Sand extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[2]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Sand = Sand;

},{"./GroupAnimation":27,"./Tile":31}],31:[function(require,module,exports){
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

},{"./Animated":18}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gold_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Gold_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Gold_ore", 3, 80, 400);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Gold_ore', Animation_1.Animation.assets['gold_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Gold_ore = Gold_ore;

},{"./Animation":19,"./ChainedAnimation":20,"./Entity":23}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iron_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Iron_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Iron_ore", 2, 20, 100);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Iron_ore', Animation_1.Animation.assets['iron_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Iron_ore = Iron_ore;

},{"./Animation":19,"./ChainedAnimation":20,"./Entity":23}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Silver_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Silver_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Silver_ore", 2, 40, 200);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Silver_ore', Animation_1.Animation.assets['silver_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Silver_ore = Silver_ore;

},{"./Animation":19,"./ChainedAnimation":20,"./Entity":23}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryView = void 0;
class InventoryView {
    constructor(inventoryButton, inventory, inventoryShopElement) {
        this.inventory = null;
        this.inventoryButton = null;
        this.inventoryShopElement = null;
        this.setInventory(inventory);
        this.setInventoryShopElement(inventoryShopElement);
        this.setInventoryButton(inventoryButton);
    }
    initInventoryButton() {
        var _a;
        if (this.inventoryButton) {
            (_a = this.inventoryButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                if (this.inventory) {
                    this.inventory.open(this.getInventoryShopElement());
                }
            });
        }
    }
    setInventoryShopElement(inventoryShopElement) {
        this.inventoryShopElement = inventoryShopElement;
    }
    getInventoryShopElement() {
        return this.inventoryShopElement;
    }
    setInventoryButton(inventoryButton) {
        this.inventoryButton = inventoryButton;
        this.initInventoryButton();
    }
    getInventoryButton() {
        return this.inventoryButton;
    }
    setInventory(value) {
        this.inventory = value;
    }
    getInventory() {
        return this.inventory;
    }
}
exports.InventoryView = InventoryView;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const Item_1 = require("./Item");
//book is not equipable, rather a consumeable.
class Book extends Item_1.Item {
    constructor(imagePath, itemName) {
        super(imagePath, itemName, "book 1", 1000);
    }
}
exports.Book = Book;

},{"./Item":38}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const Book_1 = require("./Book");
class Inventory {
    constructor() {
        this.items = [];
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
        this.items.push({
            item: new Book_1.Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        });
    }
    open(inventoryShopElement) {
        if (inventoryShopElement) {
            inventoryShopElement.innerHTML = "";
            for (let i = 0; i < this.items.length; i++) {
                // Create the card element
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                // Create the image element
                const imageElement = document.createElement('img');
                imageElement.classList.add('inventory-item-image');
                imageElement.classList.add('card-img-top');
                imageElement.src = this.items[i].item.getImagePath();
                imageElement.alt = ``;
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                // Create the name element
                const nameElement = document.createElement('p');
                nameElement.classList.add('inventory-item-name');
                nameElement.classList.add('card-text');
                nameElement.innerText = this.items[i].item.getItemName();
                // Create the owned element
                const ownedElement = document.createElement('h4');
                ownedElement.classList.add('inventory-item-owned');
                ownedElement.classList.add('card-title');
                ownedElement.innerText = `${this.items[i].amount}`;
                // Append the child elements to the card element
                cardBody.appendChild(nameElement);
                cardBody.appendChild(ownedElement);
                cardElement.appendChild(imageElement);
                cardElement.appendChild(cardBody);
                // You can then append the cardElement to your container element
                const cardContainer = document.querySelector('.shop-inventory');
                cardContainer.style.display = "grid";
                cardContainer.style.gridTemplateColumns = "1fr 1fr";
                cardContainer.style.height = "200px";
                cardContainer.style.overflow = "auto";
                // Assuming you have a container element in your HTML
                if (cardContainer) {
                    cardContainer.appendChild(cardElement);
                }
            }
        }
    }
}
exports.Inventory = Inventory;

},{"./Book":36}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(imagePath, itemName, itemDesc, itemPrice) {
        this.imagePath = imagePath;
        this.itemName = itemName;
        this.itemDesc = itemDesc;
        this.itemPrice = itemPrice;
    }
    getItemPrice() {
        return this.itemPrice;
    }
    setItemPrice(itemPrice) {
        this.itemPrice = itemPrice;
    }
    getImagePath() {
        return this.imagePath;
    }
    setImagePath(imagePath) {
        this.imagePath = imagePath;
    }
    getItemName() {
        return this.itemName;
    }
    setItemName(itemName) {
        this.itemName = itemName;
    }
    getItemDesc() {
        return this.itemDesc;
    }
    setItemDesc(itemDesc) {
        this.itemDesc = itemDesc;
    }
}
exports.Item = Item;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Animation_1 = require("./GameObjects/Animation");
const ChainedAnimation_1 = require("./GameObjects/ChainedAnimation");
const PlayerUnit_1 = require("./GameObjects/PlayerUnit");
class Player {
    //this tells which item the player is holding
    //0 = not holding anything
    //1 = sword
    //2 = pickaxe
    //3 = shovel
    constructor() {
        this.gold = 500;
        this.energy = 0;
        this.units = [];
        this.curEquip = 0;
        //item effects
        //each item changes the level depending on the tier
        //Ex: Stone Pick = 1, Iron Pick = 2, Damascus Steel Pick = 3
        //this interacts with entityType and Level.
        this.swordLevel = 0;
        this.pickaxeLevel = 0;
        this.shovelLevel = 0;
        this.EquipType = 0;
        const p1 = new PlayerUnit_1.PlayerUnit({ x: 1, y: 1 });
        p1.addAnimation(new ChainedAnimation_1.ChainedAnimation(p1, "idle", Animation_1.Animation.assets['player_idle'], { x: 32, y: 32 }, 2, -1, 1));
        p1.createAnimation("walk", Animation_1.Animation.assets['player_walk'], { x: 32, y: 32 }, 4, "", 4);
        p1.createAnimation("walk_reverse", Animation_1.Animation.assets['player_walk_reverse'], { x: 32, y: 32 }, 4, "", 4);
        p1.setMoveSpeed(2);
        this.units.push(p1);
    }
    getGold() {
        return this.gold;
    }
    getEnergy() {
        return this.energy;
    }
    addEnergy(x) {
        this.energy += x;
    }
    addGold(x) {
        this.gold += x;
    }
    action(price) {
        if (this.energy >= price)
            return true;
        return false;
    }
    getCoordinate() {
        return this.units[0].getCoordinate();
    }
    getEquipment() {
        return this.EquipType;
    }
    setEquipment(x) {
        this.EquipType = x;
    }
    getEquipmentLevels() {
        return { sword: this.swordLevel, pickaxe: this.pickaxeLevel, shovel: this.shovelLevel };
    }
    //testing
    setEquipmentLevels(x) {
        this.swordLevel = x;
        this.shovelLevel = x;
        this.pickaxeLevel = x;
    }
}
exports.Player = Player;

},{"./GameObjects/Animation":19,"./GameObjects/ChainedAnimation":20,"./GameObjects/PlayerUnit":28}],40:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionView = void 0;
class QuestionView {
    constructor(QuestionArea, UpdateButton, api, a, b, c, d, energyDiv, goldDiv) {
        this.QuestionArea = null;
        this.UpdateBtn = null;
        this.api = null;
        this.curQuestion = null;
        this.AButton = null;
        this.BButton = null;
        this.CButton = null;
        this.DButton = null;
        this.energyDiv = null;
        this.goldDiv = null;
        this.player = null;
        this.setQuestionArea(QuestionArea);
        this.setUpdateBtn(UpdateButton);
        this.setAPI(api);
        this.setButtons(a, b, c, d);
        this.setEnergyDiv(energyDiv);
        this.setGoldDiv(goldDiv);
    }
    setGoldDiv(goldDiv) {
        this.goldDiv = goldDiv;
    }
    setButtons(a, b, c, d) {
        this.AButton = a;
        this.BButton = b;
        this.CButton = c;
        this.DButton = d;
    }
    refreshStats() {
        var _a, _b;
        if (this.energyDiv) {
            this.energyDiv.innerHTML = `Energy: ${(_a = this.player) === null || _a === void 0 ? void 0 : _a.getEnergy()}`;
        }
        if (this.goldDiv) {
            this.goldDiv.innerHTML = `Gold: ${(_b = this.player) === null || _b === void 0 ? void 0 : _b.getGold()}`;
        }
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UpdateQuestion();
        });
    }
    setQuestionArea(QuestionArea) {
        this.QuestionArea = QuestionArea;
    }
    setUpdateBtn(UpdateBtn) {
        this.UpdateBtn = UpdateBtn;
    }
    setCurQuestion(question) {
        this.curQuestion = question;
    }
    setAPI(api) {
        this.api = api;
    }
    setEnergyDiv(energyDiv) {
        this.energyDiv = energyDiv;
    }
    setPlayer(player) {
        this.player = player;
    }
    checkAnswer(self, val) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (val == "") {
                self.style.display = 'none';
            }
            else {
                (_a = this.player) === null || _a === void 0 ? void 0 : _a.addEnergy(10);
                this.refreshStats();
                yield this.UpdateQuestion();
            }
        });
    }
    resetAnswerButtons(a, b, c, d) {
        //Object passed here to make sure it isn't null.
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";
        a.style.display = "inline";
        b.style.display = "inline";
        c.style.display = "inline";
        d.style.display = "inline";
    }
    UpdateQuestion() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const reqAPI = yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.getQuestion());
            let q = { text: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.text, a: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.a, b: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.b, c: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.c, d: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.d, answer: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.answer };
            this.curQuestion = q;
            if (this.QuestionArea != null && this.curQuestion != null && this.AButton && this.BButton && this.CButton && this.DButton) {
                this.QuestionArea.innerHTML = this.curQuestion.text;
                this.AButton.innerHTML = `A. ${q.a}`;
                this.BButton.innerHTML = `B. ${q.b}`;
                this.CButton.innerHTML = `C. ${q.c}`;
                this.DButton.innerHTML = `D. ${q.d}`;
                this.resetAnswerButtons(this.AButton, this.BButton, this.CButton, this.DButton);
                switch (q.answer) {
                    case 'a':
                        this.AButton.value = "ans";
                        break;
                    case 'b':
                        this.BButton.value = "ans";
                        break;
                    case 'c':
                        this.CButton.value = "ans";
                        break;
                    case 'd':
                        this.DButton.value = "ans";
                        break;
                    default:
                        break;
                }
            }
            else {
                if (this.QuestionArea == null)
                    alert('QuestionArea is null! please tell a nearby admin');
            }
        });
    }
}
exports.QuestionView = QuestionView;

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const Book_1 = require("./Items/Book");
class Shop {
    constructor() {
        this.item =
            [
                new Book_1.Book("dist/Assets/Prototype/buku1.png", "Book"), new Book_1.Book("dist/Assets/Prototype/buku1.png", "Book"), new Book_1.Book("dist/Assets/Prototype/buku1.png", "Book"), new Book_1.Book("dist/Assets/Prototype/buku1.png", "Book"),
            ];
    }
    open(shopHTML) {
        if (shopHTML) {
            shopHTML.innerHTML = "";
            // console.log(shopHTML)
            shopHTML.style.display = "grid";
            shopHTML.style.gridTemplateColumns = "1fr";
            for (let i = 0; i < this.item.length; i++) {
                // Card shop
                const shopTemp = document.createElement('div');
                shopTemp.className = 'card-shop';
                // Image shop
                const shopImage = document.createElement('img');
                shopImage.className = 'shop-img';
                shopImage.src = this.item[i].getImagePath();
                // Description shop
                const desc = document.createElement('div');
                desc.className = 'desc';
                const itemName = document.createElement('div');
                itemName.className = 'content item-name';
                itemName.innerHTML = this.item[i].getItemName();
                const mainDesc = document.createElement('div');
                mainDesc.className = 'special-content main-desc';
                mainDesc.innerHTML = this.item[i].getItemDesc();
                const addBox = document.createElement('div');
                addBox.classList.add('row');
                const colDiv1 = document.createElement('div');
                colDiv1.classList.add('col-sm-2');
                const plusBtn = document.createElement('div');
                plusBtn.classList.add('btn', 'btn-success');
                plusBtn.textContent = '+';
                plusBtn.addEventListener('click', () => {
                    const item = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`);
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`);
                    if (item) {
                        const currentQty = parseInt(item.value) || 0;
                        item.value = `${currentQty + 1}`;
                        const totalPrice = parseInt(item.value) * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    }
                    else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                });
                colDiv1.appendChild(plusBtn);
                const colDiv2 = document.createElement('div');
                colDiv2.classList.add('col-sm-2');
                const itemQtyDiv = document.createElement('input');
                itemQtyDiv.style.width = '30px';
                itemQtyDiv.type = 'number';
                itemQtyDiv.classList.add('item-qty', `item-${i}`);
                itemQtyDiv.value = '1';
                itemQtyDiv.addEventListener('change', () => {
                    const item = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`);
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`);
                    if (item) {
                        const currentQty = parseInt(item.value) || 0;
                        const totalPrice = currentQty * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    }
                    else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                });
                colDiv2.appendChild(itemQtyDiv);
                const colDiv3 = document.createElement('div');
                colDiv3.classList.add('col-sm-2');
                const minusBtn = document.createElement('div');
                minusBtn.classList.add('btn', 'btn-danger');
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () => {
                    const item = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`);
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`);
                    if (item) {
                        const currentQty = parseInt(item.value) || 0;
                        if (currentQty > 1) {
                            item.value = `${currentQty - 1}`;
                        }
                        const totalPrice = parseInt(item.value) * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    }
                    else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                });
                colDiv3.appendChild(minusBtn);
                const colDiv4 = document.createElement('div');
                colDiv4.classList.add('col-sm-6', `total-price-container-item-${i}`);
                const totalPriceDiv = document.createElement('div');
                totalPriceDiv.classList.add('total-price', `total-price-item-${i}`);
                totalPriceDiv.textContent = `Gold ${parseInt(itemQtyDiv.value) * this.item[i].getItemPrice()}`;
                colDiv4.appendChild(totalPriceDiv);
                addBox.appendChild(colDiv1);
                addBox.appendChild(colDiv2);
                addBox.appendChild(colDiv3);
                addBox.appendChild(colDiv4);
                const buyButton = document.createElement('button');
                buyButton.className = 'content buy-button';
                buyButton.innerHTML = 'Buy';
                desc.appendChild(itemName);
                desc.appendChild(mainDesc);
                desc.appendChild(addBox);
                desc.appendChild(buyButton);
                shopTemp.appendChild(shopImage);
                shopTemp.appendChild(desc);
                shopHTML.appendChild(shopTemp);
                shopHTML.style.height = '200px';
                shopHTML.style.overflow = 'auto';
            }
        }
    }
}
exports.Shop = Shop;

},{"./Items/Book":36}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopView = void 0;
class ShopView {
    constructor(shopButton, shop, inventoryShopElement) {
        this.shop = null;
        this.shopButton = null;
        this.inventoryShopElement = null;
        this.setShop(shop);
        this.setInventoryShopElement(inventoryShopElement);
        this.setShopButton(shopButton);
    }
    initShopButton() {
        var _a;
        if (this.shopButton) {
            (_a = this.shopButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                if (this.shop) {
                    this.shop.open(this.getInventoryShopElement());
                }
            });
        }
    }
    setInventoryShopElement(inventoryShopElement) {
        this.inventoryShopElement = inventoryShopElement;
    }
    getInventoryShopElement() {
        return this.inventoryShopElement;
    }
    setShopButton(shopButton) {
        this.shopButton = shopButton;
        this.initShopButton();
    }
    getShopButton() {
        return this.shopButton;
    }
    setShop(value) {
        this.shop = value;
    }
    getShop() {
        return this.shop;
    }
}
exports.ShopView = ShopView;

},{}],43:[function(require,module,exports){
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
            // console.log(target)
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
            var _a, _b;
            if (!this.terminal)
                return;
            try {
                // const terminal2 = document.querySelector("#console") as HTMLTextAreaElement
                console.log(((_a = this.textArea) === null || _a === void 0 ? void 0 : _a.value) || "");
                this.terminal.setContent(((_b = this.textArea) === null || _b === void 0 ? void 0 : _b.value) || "");
                this.terminal.compile();
                this.terminal.execute();
            }
            catch (err) {
                throw err;
                console.log('Compile Time ' + err);
            }
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

},{}],44:[function(require,module,exports){
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
    const player_dig = new Image();
    //player.dig.src
    const sand_tile = new Image();
    sand_tile.src = "./dist/Assets/Prototype/sand.png";
    const gravel_tile = new Image();
    gravel_tile.src = "./dist/Assets/Prototype/gravel.png";
    const player_walk_reverse = new Image();
    player_walk_reverse.src = "./dist/Assets/Prototype/itland_ptype_player_walk_mirrored.png";
    //Other Entities
    const rock = new Image();
    rock.src = './dist/Assets/Prototype/rock.png';
    const iron_ore = new Image();
    iron_ore.src = './dist/Assets/Prototype/iron_ore.png';
    const gold_ore = new Image();
    gold_ore.src = './dist/Assets/Prototype/gold_ore.png';
    const silver_ore = new Image();
    silver_ore.src = './dist/Assets/Prototype/silver_ore.png';
    const chest_normal = new Image();
    chest_normal.src = "./dist/Assets/Prototype/chest_normal_temp.png";
    const chest_medium = new Image();
    const chest_large = new Image();
    Animation_1.Animation.assets['grass_tile'] = grass;
    Animation_1.Animation.assets['flowery_grass_tile'] = flowergrass;
    Animation_1.Animation.assets['player_idle'] = player_idle;
    Animation_1.Animation.assets['player_walk'] = player_walk;
    Animation_1.Animation.assets['player_walk_reverse'] = player_walk_reverse;
    Animation_1.Animation.assets['sand'] = sand_tile;
    Animation_1.Animation.assets['rock'] = rock;
    Animation_1.Animation.assets['iron_ore'] = iron_ore;
    Animation_1.Animation.assets['gold_ore'] = gold_ore;
    Animation_1.Animation.assets['silver_ore'] = silver_ore;
    Animation_1.Animation.assets['chest_normal'] = chest_normal;
    Animation_1.Animation.assets['chest_medium'] = chest_medium;
    Animation_1.Animation.assets['chest_large'] = chest_large;
    GroupAnimation_1.GroupAnimation.animations.push(new GroupAnimation_1.GroupAnimation("grass_tile", grass, { x: 32, y: 32 }, 1, //number of frames
    0 //speed
    ), new GroupAnimation_1.GroupAnimation("flowery_grass_tile", flowergrass, //
    { x: 32, y: 32 }, 2, //number of frames
    1 //speed
    ), new GroupAnimation_1.GroupAnimation("sand_tile", sand_tile, { x: 32, y: 32 }, 1, 0), new GroupAnimation_1.GroupAnimation("gravel_tile", gravel_tile, { x: 32, y: 32 }, 1, 0));
}
exports.default = loadAsset;

},{"./Classes/GameObjects/Animation":19,"./Classes/GameObjects/GroupAnimation":27}],45:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasView_1 = require("./Classes/CanvasView");
const TerminalView_1 = require("./Classes/TerminalView");
const GameManager_1 = require("./Classes/GameManager");
const ShopView_1 = require("./Classes/ShopView");
const loadAsset_1 = __importDefault(require("./loadAsset"));
const Shop_1 = require("./Classes/Shop");
const Direction_1 = require("./Classes/GameObjects/Direction");
const InventoryView_1 = require("./Classes/InventoryView");
const Inventory_1 = require("./Classes/Items/Inventory");
const QuestionView_1 = require("./Classes/QuestionView");
const API_1 = require("./Classes/API");
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    //Main game
    const canvas = document.querySelector("#view");
    const terminal = document.querySelector("#console");
    const executeButton = document.querySelector("#executeButton");
    const stopButton = document.querySelector("#stopButton");
    const shopButton = document.querySelector(".button-shop");
    const inventoryButton = document.querySelector(".button-inventory");
    const inventoryShopElement = document.querySelector(".shop-inventory");
    const QuestionArea = document.querySelector("#question");
    const shop = new Shop_1.Shop();
    const inventory = new Inventory_1.Inventory();
    if (canvas == null)
        throw new Error("Canvas not found");
    if (shopButton == null)
        throw new Error("Shop button not found");
    canvas.width = (_b = (_a = canvas.parentElement) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : window.innerWidth;
    canvas.height = (_d = (_c = canvas.parentElement) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : window.innerHeight;
    const soalButton = document.querySelector("#get-soal");
    const AButton = document.querySelector("#a");
    const BButton = document.querySelector("#b");
    const CButton = document.querySelector("#c");
    const DButton = document.querySelector("#d");
    const energyDiv = document.querySelector("#energyAmount");
    const goldDiv = document.querySelector("#goldAmount");
    (0, loadAsset_1.default)();
    const game = new GameManager_1.GameManager(new CanvasView_1.CanvasView(canvas), new TerminalView_1.TerminalView(terminal, executeButton, stopButton), new ShopView_1.ShopView(shopButton, shop, inventoryShopElement), new InventoryView_1.InventoryView(inventoryButton, inventory, inventoryShopElement), new QuestionView_1.QuestionView(QuestionArea, soalButton, new API_1.API(), AButton, BButton, CButton, DButton, energyDiv, goldDiv));
    game.start();
    yield game.load();
    const pUnit = game.getActivePlayerUnit();
    // const map = await game.testAPI();
    // alert(map);
    // soalButton.addEventListener('click', async () => {
    //     const tAPI = await game.testAPIsoal();
    //     let q:Question = {text:tAPI?.text!, a:tAPI?.a!, b:tAPI?.b!, c:tAPI?.c!, d:tAPI?.d!, answer:tAPI?.answer!};
    //     QuestionArea.innerHTML = q.text;
    // })
    //Shop
    //Quiz Section
    // const curPlayer = game.getPlayer();
    // const energyAmount = document.querySelector("#energyAmount") as HTMLDivElement
    // energyAmount.value = `Energy: ${curPlayer.getEnergy()}`
    soalButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        yield ((_e = game.getQuestionView()) === null || _e === void 0 ? void 0 : _e.UpdateQuestion());
    }));
    AButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        yield ((_f = game.getQuestionView()) === null || _f === void 0 ? void 0 : _f.checkAnswer(AButton, AButton.value));
    }));
    BButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        yield ((_g = game.getQuestionView()) === null || _g === void 0 ? void 0 : _g.checkAnswer(BButton, BButton.value));
    }));
    CButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        yield ((_h = game.getQuestionView()) === null || _h === void 0 ? void 0 : _h.checkAnswer(CButton, CButton.value));
    }));
    DButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        yield ((_j = game.getQuestionView()) === null || _j === void 0 ? void 0 : _j.checkAnswer(DButton, DButton.value));
    }));
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        let price = 5; //energy price for action.
        if (key === 'w') {
            pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Up);
        }
        if (key === 'a') {
            pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Left);
        }
        if (key === 's') {
            pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Down);
        }
        if (key === 'd') {
            pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Right);
        }
        //temp key to change equipment
        //0 = not equipping anything
        //1 = pickaxe
        //2 = sword
        //3 = shovel
        if (key === 'q') {
            const curEquip = game.getPlayer().getEquipment();
            switch (curEquip) {
                case 1: //equip pickaxe 
                    game.getPlayer().setEquipment(2);
                    alert('equipped pickaxe');
                    break;
                case 2: //equip sword
                    game.getPlayer().setEquipment(3);
                    alert('equipped pickaxe');
                    break;
                case 3: //equip shovel
                    game.getPlayer().setEquipment(0);
                    alert('equipped pickaxe');
                    break;
                case 0: //not equipping anything
                    game.getPlayer().setEquipment(1);
                    alert('equipped pickaxe');
                    break;
                default:
                    break;
            }
            alert(game.getPlayer().getEquipment());
        }
        if (key === '1') {
            game.getPlayer().setEquipmentLevels(1);
        }
        if (key === '2') {
            game.getPlayer().setEquipmentLevels(2);
        }
        if (key === '3') {
            game.getPlayer().setEquipmentLevels(3);
        }
        if (key === 'i') { //destroy top entity
            //for destroying crates, and stone entities.
            game.Action(Direction_1.Direction.Up, game.getPlayer().getEquipment());
        }
        if (key === 'j') { //destroy left entitiy
            //for destroying crates, and stone entities.
            game.Action(Direction_1.Direction.Left, game.getPlayer().getEquipment());
        }
        if (key === 'k') { //destroy bottom entity
            //for destroying crates, and stone entities.
            game.Action(Direction_1.Direction.Down, game.getPlayer().getEquipment());
        }
        if (key === 'l') { //destroy right entity
            //for destroying crates, and stone entities.
            game.Action(Direction_1.Direction.Right, game.getPlayer().getEquipment());
        }
        console.clear();
    });
    // fullscreenHandler();
});
// const fullscreenHandler = () => {
//     if (window.innerHeight === screen.height) {
//         document.body.style.backgroundColor = "red";
//     } else {
//         document.body.style.backgroundColor = "blue";
//     }
// }
// document.addEventListener("fullscreenchange", fullscreenHandler);
// function fullscreenHandler() {
//     if (document.fullscreenElement) {
//         document.body.style.backgroundColor = "red";
//     } else {
//         document.body.style.backgroundColor = "blue";
//     }
// }
// document.addEventListener("fullscreenchange", fullscreenHandler);
// function fullscreenHandler() {
//     if (window.screen.width === window.innerWidth && window.screen.height === window.innerHeight) {
//         document.body.style.backgroundColor = "red";
//     } else {
//         document.body.style.backgroundColor = "blue";
//     }
// }
// document.addEventListener("resize", fullscreenHandler);
function fullscreenHandler() {
    const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
    if (!isFullscreen) {
        document.body.style.backgroundColor = "red";
    }
    else {
        document.body.style.backgroundColor = "white";
    }
}
let resizeTimeout = null;
function handleResize() {
    if (resizeTimeout !== null) {
        window.cancelAnimationFrame(resizeTimeout);
    }
    resizeTimeout = window.requestAnimationFrame(() => {
        fullscreenHandler();
        resizeTimeout = null;
    });
}
window.addEventListener("resize", handleResize);

},{"./Classes/API":1,"./Classes/CanvasView":2,"./Classes/GameManager":17,"./Classes/GameObjects/Direction":22,"./Classes/InventoryView":35,"./Classes/Items/Inventory":37,"./Classes/QuestionView":40,"./Classes/Shop":41,"./Classes/ShopView":42,"./Classes/TerminalView":43,"./loadAsset":44}]},{},[45]);
