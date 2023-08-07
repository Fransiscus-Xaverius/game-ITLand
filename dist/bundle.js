(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasView = void 0;
const Tile_1 = require("./GameObjects/Tile");
class CanvasView {
    constructor(canvas = null) {
        this.canvas = null;
        this.context = null;
        this.canvasScale = 1;
        this.maxCanvasScale = 2;
        this.minCanvasScale = 0.5;
        this.maxCanvasSize = 1;
        this.defaultTilesPerCanvas = 10;
        this.renderRadius = 5;
        this.middleMousePressed = false;
        this.cameraPosition = { x: 1, y: 0 };
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
                this.cameraPosition.x -= (evt.movementX / this.canvasScale) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize);
                this.cameraPosition.y -= (evt.movementY / this.canvasScale) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize);
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
    render(grid) {
        var _a, _b, _c, _d;
        if (this.context == null || this.canvas == null)
            return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (grid == null)
            return;
        const oneTileSize = (this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize * this.canvasScale;
        const oneTileSizeX = oneTileSize / Tile_1.Tile.defaultTileResolution.x;
        const oneTileSizeY = oneTileSize / Tile_1.Tile.defaultTileResolution.y;
        const xCam = Math.floor(this.cameraPosition.x * oneTileSize - this.canvas.width / 2);
        const yCam = Math.floor(this.cameraPosition.y * oneTileSize - this.canvas.height / 2);
        for (let i = Math.round(this.cameraPosition.y) - this.renderRadius; i < Math.round(this.cameraPosition.y) + this.renderRadius; i++) {
            for (let j = Math.round(this.cameraPosition.x) - this.renderRadius; j < Math.round(this.cameraPosition.x) + this.renderRadius; j++) {
                var tileSprite = (_b = (_a = grid.tiles[i]) === null || _a === void 0 ? void 0 : _a.at(j)) === null || _b === void 0 ? void 0 : _b.currentAnimationFrame();
                var entitySprite = (_d = (_c = grid.entityGrid[i]) === null || _c === void 0 ? void 0 : _c.at(j)) === null || _d === void 0 ? void 0 : _d.currentAnimationFrame();
                if (tileSprite) {
                    const xSize = Math.floor(oneTileSizeX * tileSprite.resolution.x);
                    const ySize = Math.floor(oneTileSizeY * tileSprite.resolution.y);
                    this.context.drawImage(tileSprite.spriteSheet, tileSprite.position.x, tileSprite.position.y, tileSprite.resolution.x, tileSprite.resolution.y, j * xSize - xCam, i * ySize - yCam, xSize, ySize);
                }
            }
        }
        this.context.fillText("x : " + this.cameraPosition.x, 10, 20);
        this.context.fillText("y : " + this.cameraPosition.y, 10, 40);
    }
}
exports.CanvasView = CanvasView;

},{"./GameObjects/Tile":23}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
}
exports.Command = Command;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForCommand = void 0;
const Command_1 = require("./Command");
class ForCommand extends Command_1.Command {
}
exports.ForCommand = ForCommand;

},{"./Command":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class GlobalWrapper extends Wrapper_1.Wrapper {
}
exports.GlobalWrapper = GlobalWrapper;

},{"./Wrapper":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfCommand = void 0;
const Command_1 = require("./Command");
class IfCommand extends Command_1.Command {
}
exports.IfCommand = IfCommand;

},{"./Command":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class PlayerWrapper extends Wrapper_1.Wrapper {
}
exports.PlayerWrapper = PlayerWrapper;

},{"./Wrapper":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceCommand = void 0;
const Command_1 = require("./Command");
class SequenceCommand extends Command_1.Command {
}
exports.SequenceCommand = SequenceCommand;

},{"./Command":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
class Terminal {
}
exports.Terminal = Terminal;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhileCommand = void 0;
const Command_1 = require("./Command");
class WhileCommand extends Command_1.Command {
}
exports.WhileCommand = WhileCommand;

},{"./Command":2}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
class Wrapper {
}
exports.Wrapper = Wrapper;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = require("./Terminal");
const Command_1 = require("./Command");
const ForCommand_1 = require("./ForCommand");
const IfCommand_1 = require("./IfCommand");
const WhileCommand_1 = require("./WhileCommand");
const SequenceCommand_1 = require("./SequenceCommand");
const Wrapper_1 = require("./Wrapper");
const PlayerWrapper_1 = require("./PlayerWrapper");
const GlobalWrapper_1 = require("./GlobalWrapper");
exports.default = {
    Terminal: Terminal_1.Terminal,
    Command: Command_1.Command,
    ForCommand: ForCommand_1.ForCommand,
    IfCommand: IfCommand_1.IfCommand,
    WhileCommand: WhileCommand_1.WhileCommand,
    SequenceCommand: SequenceCommand_1.SequenceCommand,
    Wrapper: Wrapper_1.Wrapper,
    PlayerWrapper: PlayerWrapper_1.PlayerWrapper,
    GlobalWrapper: GlobalWrapper_1.GlobalWrapper
};

},{"./Command":2,"./ForCommand":3,"./GlobalWrapper":4,"./IfCommand":5,"./PlayerWrapper":6,"./SequenceCommand":7,"./Terminal":8,"./WhileCommand":9,"./Wrapper":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Grid_1 = require("./GameObjects/Grid");
class GameManager {
    constructor(canvasView = null) {
        this.canvasView = null;
        this.lastTimeStamp = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrameId = -1;
        this.terminals = [];
        this.grid = new Grid_1.Grid({ x: 15, y: 15 });
        this.setCanvasView(canvasView);
    }
    getDeltatime() {
        return this.deltaTime;
    }
    setCanvasView(canvasView) {
        this.canvasView = canvasView;
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
        this.grid.nextFrame(this.deltaTime);
    }
    render() {
        var _a;
        (_a = this.canvasView) === null || _a === void 0 ? void 0 : _a.render(this.grid);
    }
}
exports.GameManager = GameManager;

},{"./GameObjects/Grid":17}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animated = void 0;
const Animation_1 = require("./Animation");
class Animated {
    constructor(animations = []) {
        this.currentAnimationIndex = 0;
        this.animations = animations;
    }
    addAnimation(animation) {
        this.animations.push(animation);
    }
    createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation = "", animationSpeed = 1) {
        this.animations.push(new Animation_1.Animation(this, animationName, spriteSheet, spriteResolution, spriteFrameNum, this.animations.findIndex(x => x.animationName === nextAnimation), animationSpeed));
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

},{"./Animation":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
class Animation {
    constructor(owner, animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimationIndex = -1, // -1 will make this loop indefinitely
    animationSpeed = 1 // 0 will make this a static sprite (no animation)
    ) {
        this.animationProgress = 0;
        this.owner = owner;
        this.animationName = animationName;
        this.spriteSheet = spriteSheet;
        this.spriteResolution = spriteResolution;
        this.spriteFrameNum = spriteFrameNum;
        this.nextAnimationIndex = nextAnimationIndex;
        this.animationSpeed = animationSpeed;
    }
    resetAnimation() {
        this.animationProgress = 0;
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
exports.Animation = Animation;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Animated_1 = require("./Animated");
class Entity extends Animated_1.Animated {
}
exports.Entity = Entity;

},{"./Animated":13}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const Animation_1 = require("./Animation");
const Tile_1 = require("./Tile");
class Grass extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate);
        this.addAnimation(new Animation_1.Animation(this, "grass", document.querySelector("#itland_ptype_grasstile"), { x: 32, y: 32 }, 1, -1, 0));
        this.addAnimation(new Animation_1.Animation(this, "flower_grass", document.querySelector("#itland_ptype_flowergrasstile"), { x: 32, y: 32 }, 2, -1, 1));
        this.currentAnimationIndex = Math.round(Math.random());
    }
    step(stepper) {
        throw new Error("Method not implemented.");
    }
}
exports.Grass = Grass;

},{"./Animation":14,"./Tile":23}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Grass_1 = require("./Grass");
class Grid {
    constructor(size) {
        this.size = size;
        this.entities = [];
        this.entityGrid = new Array(size.y).fill(new Array(size.x).fill(null));
        this.tiles = [];
        for (let i = 0; i < size.y; i++) {
            this.tiles.push([]);
            for (let j = 0; j < size.x; j++) {
                this.tiles[i].push(new Grass_1.Grass({ x: j, y: i }));
            }
        }
    }
    nextFrame(deltaTime) {
        this.entities.forEach(x => {
            x.nextFrame(deltaTime);
        });
        this.tiles.forEach(x => {
            x.forEach(y => {
                y === null || y === void 0 ? void 0 : y.nextFrame(deltaTime);
            });
        });
    }
}
exports.Grid = Grid;

},{"./Grass":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ground = void 0;
const Tile_1 = require("./Tile");
class Ground extends Tile_1.Tile {
    step(stepper) {
        throw new Error("Method not implemented.");
    }
}
exports.Ground = Ground;

},{"./Tile":23}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTable = void 0;
class LootTable {
}
exports.LootTable = LootTable;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
class PlayerUnit {
}
exports.PlayerUnit = PlayerUnit;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
const Entity_1 = require("./Entity");
class Rock extends Entity_1.Entity {
}
exports.Rock = Rock;

},{"./Entity":15}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNTEntity = void 0;
const Entity_1 = require("./Entity");
class TNTEntity extends Entity_1.Entity {
}
exports.TNTEntity = TNTEntity;

},{"./Entity":15}],23:[function(require,module,exports){
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

},{"./Animated":13}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animated_1 = require("./Animated");
const Animation_1 = require("./Animation");
const Entity_1 = require("./Entity");
const Grid_1 = require("./Grid");
const Ground_1 = require("./Ground");
const LootTable_1 = require("./LootTable");
const PlayerUnit_1 = require("./PlayerUnit");
const Rock_1 = require("./Rock");
const Tile_1 = require("./Tile");
const TNTEntity_1 = require("./TNTEntity");
exports.default = {
    Animated: Animated_1.Animated,
    Animation: Animation_1.Animation,
    Entity: Entity_1.Entity,
    Grid: Grid_1.Grid,
    Ground: Ground_1.Ground,
    LootTable: LootTable_1.LootTable,
    PlayerUnit: PlayerUnit_1.PlayerUnit,
    Rock: Rock_1.Rock,
    Tile: Tile_1.Tile,
    TNTEntity: TNTEntity_1.TNTEntity
};

},{"./Animated":13,"./Animation":14,"./Entity":15,"./Grid":17,"./Ground":18,"./LootTable":19,"./PlayerUnit":20,"./Rock":21,"./TNTEntity":22,"./Tile":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
}
exports.Inventory = Inventory;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
}
exports.Item = Item;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickaxe = void 0;
const Item_1 = require("./Item");
class Pickaxe extends Item_1.Item {
}
exports.Pickaxe = Pickaxe;

},{"./Item":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
const Item_1 = require("./Item");
class Shovel extends Item_1.Item {
}
exports.Shovel = Shovel;

},{"./Item":26}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNT = void 0;
const Item_1 = require("./Item");
class TNT extends Item_1.Item {
}
exports.TNT = TNT;

},{"./Item":26}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("./Inventory");
const Item_1 = require("./Item");
const Pickaxe_1 = require("./Pickaxe");
const Shovel_1 = require("./Shovel");
const TNT_1 = require("./TNT");
exports.default = {
    Inventory: Inventory_1.Inventory,
    Item: Item_1.Item,
    Pickaxe: Pickaxe_1.Pickaxe,
    Shovel: Shovel_1.Shovel,
    TNT: TNT_1.TNT
};

},{"./Inventory":25,"./Item":26,"./Pickaxe":27,"./Shovel":28,"./TNT":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
}
exports.Player = Player;

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
class Shop {
}
exports.Shop = Shop;

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subnamespace_1 = require("./subnamespace");
const Player_1 = require("./Player");
const GameManager_1 = require("./GameManager");
const Shop_1 = require("./Shop");
const CanvasView_1 = require("./CanvasView");
exports.default = {
    GameObjects: subnamespace_1.GameObjects,
    Items: subnamespace_1.Items,
    Console: subnamespace_1.Console,
    Player: Player_1.Player,
    GameManager: GameManager_1.GameManager,
    Shop: Shop_1.Shop,
    CanvasView: CanvasView_1.CanvasView,
};

},{"./CanvasView":1,"./GameManager":12,"./Player":31,"./Shop":32,"./subnamespace":34}],34:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = exports.Items = exports.GameObjects = void 0;
const GameObjects_1 = __importDefault(require("./GameObjects"));
exports.GameObjects = GameObjects_1.default;
const Items_1 = __importDefault(require("./Items"));
exports.Items = Items_1.default;
const Console_1 = __importDefault(require("./Console"));
exports.Console = Console_1.default;

},{"./Console":11,"./GameObjects":24,"./Items":30}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ptype_path = './Assets/Prototype';
function init() {
}
exports.default = init;

},{}],36:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Classes_1 = __importDefault(require("./Classes"));
const assetInit_1 = __importDefault(require("./assetInit"));
window.onload = () => {
    var _a, _b, _c, _d;
    const canvas = document.querySelector("#view");
    if (canvas == null)
        throw new Error("Canvas not found");
    canvas.width = (_b = (_a = canvas.parentElement) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : window.innerWidth;
    canvas.height = (_d = (_c = canvas.parentElement) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : window.innerHeight;
    (0, assetInit_1.default)();
    const game = new Classes_1.default.GameManager(new Classes_1.default.CanvasView(canvas));
    game.start();
};

},{"./Classes":33,"./assetInit":35}]},{},[36]);
