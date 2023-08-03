(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
}
exports.Command = Command;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
class Console {
}
exports.Console = Console;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForCommand = void 0;
const Command_1 = require("./Command");
class ForCommand extends Command_1.Command {
}
exports.ForCommand = ForCommand;

},{"./Command":1}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class GlobalWrapper extends Wrapper_1.Wrapper {
}
exports.GlobalWrapper = GlobalWrapper;

},{"./Wrapper":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfCommand = void 0;
const Command_1 = require("./Command");
class IfCommand extends Command_1.Command {
}
exports.IfCommand = IfCommand;

},{"./Command":1}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWrapper = void 0;
const Wrapper_1 = require("./Wrapper");
class PlayerWrapper extends Wrapper_1.Wrapper {
}
exports.PlayerWrapper = PlayerWrapper;

},{"./Wrapper":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceCommand = void 0;
const Command_1 = require("./Command");
class SequenceCommand extends Command_1.Command {
}
exports.SequenceCommand = SequenceCommand;

},{"./Command":1}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhileCommand = void 0;
const Command_1 = require("./Command");
class WhileCommand extends Command_1.Command {
}
exports.WhileCommand = WhileCommand;

},{"./Command":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
class Wrapper {
}
exports.Wrapper = Wrapper;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Console_1 = require("./Console");
const Command_1 = require("./Command");
const ForCommand_1 = require("./ForCommand");
const IfCommand_1 = require("./IfCommand");
const WhileCommand_1 = require("./WhileCommand");
const SequenceCommand_1 = require("./SequenceCommand");
const Wrapper_1 = require("./Wrapper");
const PlayerWrapper_1 = require("./PlayerWrapper");
const GlobalWrapper_1 = require("./GlobalWrapper");
exports.default = {
    Console: Console_1.Console,
    Command: Command_1.Command,
    ForCommand: ForCommand_1.ForCommand,
    IfCommand: IfCommand_1.IfCommand,
    WhileCommand: WhileCommand_1.WhileCommand,
    SequenceCommand: SequenceCommand_1.SequenceCommand,
    Wrapper: Wrapper_1.Wrapper,
    PlayerWrapper: PlayerWrapper_1.PlayerWrapper,
    GlobalWrapper: GlobalWrapper_1.GlobalWrapper
};

},{"./Command":1,"./Console":2,"./ForCommand":3,"./GlobalWrapper":4,"./IfCommand":5,"./PlayerWrapper":6,"./SequenceCommand":7,"./WhileCommand":8,"./Wrapper":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
}
exports.GameManager = GameManager;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animated = void 0;
class Animated {
}
exports.Animated = Animated;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
class Animation {
}
exports.Animation = Animation;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Animated_1 = require("./Animated");
class Entity extends Animated_1.Animated {
}
exports.Entity = Entity;

},{"./Animated":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
class Grid {
}
exports.Grid = Grid;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ground = void 0;
const Tile_1 = require("./Tile");
class Ground extends Tile_1.Tile {
}
exports.Ground = Ground;

},{"./Tile":21}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTable = void 0;
class LootTable {
}
exports.LootTable = LootTable;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
class PlayerUnit {
}
exports.PlayerUnit = PlayerUnit;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
const Entity_1 = require("./Entity");
class Rock extends Entity_1.Entity {
}
exports.Rock = Rock;

},{"./Entity":14}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNTEntity = void 0;
const Entity_1 = require("./Entity");
class TNTEntity extends Entity_1.Entity {
}
exports.TNTEntity = TNTEntity;

},{"./Entity":14}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
class Tile {
}
exports.Tile = Tile;

},{}],22:[function(require,module,exports){
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

},{"./Animated":12,"./Animation":13,"./Entity":14,"./Grid":15,"./Ground":16,"./LootTable":17,"./PlayerUnit":18,"./Rock":19,"./TNTEntity":20,"./Tile":21}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
}
exports.Inventory = Inventory;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
}
exports.Item = Item;

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickaxe = void 0;
const Item_1 = require("./Item");
class Pickaxe extends Item_1.Item {
}
exports.Pickaxe = Pickaxe;

},{"./Item":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
const Item_1 = require("./Item");
class Shovel extends Item_1.Item {
}
exports.Shovel = Shovel;

},{"./Item":24}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNT = void 0;
const Item_1 = require("./Item");
class TNT extends Item_1.Item {
}
exports.TNT = TNT;

},{"./Item":24}],28:[function(require,module,exports){
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

},{"./Inventory":23,"./Item":24,"./Pickaxe":25,"./Shovel":26,"./TNT":27}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
}
exports.Player = Player;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
class Shop {
}
exports.Shop = Shop;

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subnamespace_1 = require("./subnamespace");
const Player_1 = require("./Player");
const GameManager_1 = require("./GameManager");
const Shop_1 = require("./Shop");
exports.default = {
    GameObjects: subnamespace_1.GameObjects,
    Items: subnamespace_1.Items,
    Console: subnamespace_1.Console,
    Player: Player_1.Player,
    GameManager: GameManager_1.GameManager,
    Shop: Shop_1.Shop
};

},{"./GameManager":11,"./Player":29,"./Shop":30,"./subnamespace":32}],32:[function(require,module,exports){
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

},{"./Console":10,"./GameObjects":22,"./Items":28}],33:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assets_json_1 = __importDefault(require("./assets.json"));
const ptype_path = './Assets/Prototype';
function init() {
    const appendChild = document.body.appendChild;
    assets_json_1.default.forEach(x => {
        var image = new Image();
        image.id = x.name;
        image.src = x.path;
        appendChild(image);
    });
}
exports.default = init;

},{"./assets.json":34}],34:[function(require,module,exports){
module.exports=[
    {
        "name" : "asset",
        "path" : "path"
    }
]
},{}],35:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Classes_1 = __importDefault(require("./Classes"));
const assetInit_1 = __importDefault(require("./assetInit"));
window.onload = () => {
    (0, assetInit_1.default)();
    var game = new Classes_1.default.GameManager();
};

},{"./Classes":31,"./assetInit":33}]},{},[35]);
