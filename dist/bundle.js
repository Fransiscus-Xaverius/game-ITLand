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

},{"./GameObjects/PlayerUnit":23,"./GameObjects/Tile":26}],2:[function(require,module,exports){
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
const Player_1 = require("./Player");
const Direction_1 = require("./GameObjects/Direction");
class GameManager {
    constructor(canvasView = null) {
        this.lastTimeStamp = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrameId = -1;
        this.player = new Player_1.Player();
        this.terminals = [];
        this.grid = new Grid_1.Grid({ x: 1000, y: 10 });
        this.canvasView = null;
        this.setCanvasView(canvasView);
        this.grid.addEntity(this.player.units[0]);
        window.addEventListener('keydown', (evt) => {
            const player = this.player.units[0];
            if (evt.key == "d")
                player.move(Direction_1.Direction.Right);
            if (evt.key == "w")
                player.move(Direction_1.Direction.Up);
            if (evt.key == "a")
                player.move(Direction_1.Direction.Left);
            if (evt.key == "s")
                player.move(Direction_1.Direction.Down);
        });
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
        if (!this.canvasView) {
            this.grid.nextFrame(this.deltaTime);
            return;
        }
        const camPos = this.canvasView.getCameraPosition();
        const scaledRenderRadius = this.canvasView.getScaledRenderRadius();
        this.grid.nextFrame(this.deltaTime, {
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

},{"./GameObjects/Direction":16,"./GameObjects/Grid":19,"./Player":34}],13:[function(require,module,exports){
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

},{"./ChainedAnimation":15,"./GroupAnimation":21}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./Animation":14}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
    setCoordinate(value) {
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

},{"./Animated":13}],18:[function(require,module,exports){
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
        // this.currentAnimationIndex = 1
        this.currentAnimationIndex = Math.round(Math.random());
    }
    step(stepper) {
        throw new Error("Method not implemented.");
    }
}
exports.Grass = Grass;

},{"./GroupAnimation":21,"./Tile":26}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Grass_1 = require("./Grass");
const GroupAnimation_1 = require("./GroupAnimation");
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
    nextFrame(deltaTime, renderArea = null, priorityRenders = []) {
        var _a, _b, _c, _d, _e, _f;
        GroupAnimation_1.GroupAnimation.animations.forEach(x => x.nextFrame(deltaTime));
        if (!renderArea) {
            for (let i = 0; i < this.size.y; ++i) {
                for (let j = 0; j < this.size.x; ++j) {
                    (_b = (_a = this.tiles[i]) === null || _a === void 0 ? void 0 : _a.at(j)) === null || _b === void 0 ? void 0 : _b.nextFrame(deltaTime);
                    (_d = (_c = this.entityGrid[i]) === null || _c === void 0 ? void 0 : _c.at(j)) === null || _d === void 0 ? void 0 : _d.nextFrame(deltaTime);
                }
            }
            return;
        }
        const xStart = renderArea.position.x;
        const xEnd = renderArea.position.x + renderArea.size.x;
        const yStart = renderArea.position.y;
        const yEnd = renderArea.position.y + renderArea.size.y;
        for (let i = yStart; i < yEnd; ++i) {
            for (let j = xStart; j < xEnd; ++j) {
                if (j < 0)
                    continue;
                const tile = (_e = this.tiles[i]) === null || _e === void 0 ? void 0 : _e.at(j);
                const entity = (_f = this.entityGrid[i]) === null || _f === void 0 ? void 0 : _f.at(j);
                if (tile && !priorityRenders.includes(tile))
                    tile.nextFrame(deltaTime);
                if (entity && !priorityRenders.includes(entity))
                    entity.nextFrame(deltaTime);
            }
        }
        priorityRenders.forEach(x => {
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

},{"./Grass":18,"./GroupAnimation":21}],20:[function(require,module,exports){
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

},{"./Tile":26}],21:[function(require,module,exports){
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

},{"./Animation":14}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTable = void 0;
class LootTable {
}
exports.LootTable = LootTable;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
const Inventory_1 = require("../Items/Inventory");
const Direction_1 = require("./Direction");
const Entity_1 = require("./Entity");
class PlayerUnit extends Entity_1.Entity {
    constructor(coordinate, moveSpeed = 1, animations = []) {
        super(coordinate, animations);
        this.isMoving = false;
        this.nextCommand = null;
        this.moveSpeed = 1;
        this.lerpProgress = 0;
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
    nextFrame(deltaTime) {
        if (this.isMoving) {
            this.lerpProgress += deltaTime * this.moveSpeed;
            if (this.lerpProgress >= 1) {
                this.lerpProgress = 0;
                this.originalCoordinate = this.coordinate;
                if (!this.nextCommand)
                    this.playAnimation('idle');
                this.isMoving = false;
            }
        }
        super.nextFrame(deltaTime);
        this.nextCommand = null;
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
        this.nextCommand = "move";
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
            this.setCoordinate(nextCoord);
        }
        catch (err) { }
    }
}
exports.PlayerUnit = PlayerUnit;

},{"../Items/Inventory":28,"./Direction":16,"./Entity":17}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
const Entity_1 = require("./Entity");
class Rock extends Entity_1.Entity {
}
exports.Rock = Rock;

},{"./Entity":17}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNTEntity = void 0;
const Entity_1 = require("./Entity");
class TNTEntity extends Entity_1.Entity {
}
exports.TNTEntity = TNTEntity;

},{"./Entity":17}],26:[function(require,module,exports){
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

},{"./Animated":13}],27:[function(require,module,exports){
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

},{"./Animated":13,"./Animation":14,"./Entity":17,"./Grid":19,"./Ground":20,"./LootTable":22,"./PlayerUnit":23,"./Rock":24,"./TNTEntity":25,"./Tile":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
}
exports.Inventory = Inventory;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
}
exports.Item = Item;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickaxe = void 0;
const Item_1 = require("./Item");
class Pickaxe extends Item_1.Item {
}
exports.Pickaxe = Pickaxe;

},{"./Item":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
const Item_1 = require("./Item");
class Shovel extends Item_1.Item {
}
exports.Shovel = Shovel;

},{"./Item":29}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNT = void 0;
const Item_1 = require("./Item");
class TNT extends Item_1.Item {
}
exports.TNT = TNT;

},{"./Item":29}],33:[function(require,module,exports){
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

},{"./Inventory":28,"./Item":29,"./Pickaxe":30,"./Shovel":31,"./TNT":32}],34:[function(require,module,exports){
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

},{"./GameObjects/Animation":14,"./GameObjects/ChainedAnimation":15,"./GameObjects/PlayerUnit":23}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
class Shop {
}
exports.Shop = Shop;

},{}],36:[function(require,module,exports){
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

},{"./CanvasView":1,"./GameManager":12,"./Player":34,"./Shop":35,"./subnamespace":37}],37:[function(require,module,exports){
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

},{"./Console":11,"./GameObjects":27,"./Items":33}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animation_1 = require("./Classes/GameObjects/Animation");
const GroupAnimation_1 = require("./Classes/GameObjects/GroupAnimation");
function init() {
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
exports.default = init;

},{"./Classes/GameObjects/Animation":14,"./Classes/GameObjects/GroupAnimation":21}],39:[function(require,module,exports){
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

},{"./Classes":36,"./assetInit":38}]},{},[39]);
