(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
class Console {
}
exports.Console = Console;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Console_1 = require("./Console");
exports.default = {
    Console: Console_1.Console
};

},{"./Console":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
}
exports.GameManager = GameManager;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animated = void 0;
class Animated {
}
exports.Animated = Animated;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
class Animation {
}
exports.Animation = Animation;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
}
exports.Entity = Entity;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
class Grid {
}
exports.Grid = Grid;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ground = void 0;
class Ground {
}
exports.Ground = Ground;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDamaging = void 0;
class IDamaging {
}
exports.IDamaging = IDamaging;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDestructable = void 0;
class IDestructable {
}
exports.IDestructable = IDestructable;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTable = void 0;
class LootTable {
}
exports.LootTable = LootTable;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
class PlayerUnit {
}
exports.PlayerUnit = PlayerUnit;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
class Rock {
}
exports.Rock = Rock;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNTEntity = void 0;
class TNTEntity {
}
exports.TNTEntity = TNTEntity;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
class Tile {
}
exports.Tile = Tile;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animated_1 = require("./Animated");
const Animation_1 = require("./Animation");
const Entity_1 = require("./Entity");
const Grid_1 = require("./Grid");
const Ground_1 = require("./Ground");
const IDamaging_1 = require("./IDamaging");
const IDestructable_1 = require("./IDestructable");
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
    IDamaging: IDamaging_1.IDamaging,
    IDestructable: IDestructable_1.IDestructable,
    LootTable: LootTable_1.LootTable,
    PlayerUnit: PlayerUnit_1.PlayerUnit,
    Rock: Rock_1.Rock,
    Tile: Tile_1.Tile,
    TNTEntity: TNTEntity_1.TNTEntity
};

},{"./Animated":4,"./Animation":5,"./Entity":6,"./Grid":7,"./Ground":8,"./IDamaging":9,"./IDestructable":10,"./LootTable":11,"./PlayerUnit":12,"./Rock":13,"./TNTEntity":14,"./Tile":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IConsumable = void 0;
class IConsumable {
}
exports.IConsumable = IConsumable;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IEquippable = void 0;
class IEquippable {
}
exports.IEquippable = IEquippable;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
}
exports.Inventory = Inventory;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
}
exports.Item = Item;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickaxe = void 0;
class Pickaxe {
}
exports.Pickaxe = Pickaxe;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
class Shovel {
}
exports.Shovel = Shovel;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TNT = void 0;
class TNT {
}
exports.TNT = TNT;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IConsumable_1 = require("./IConsumable");
const IEquippable_1 = require("./IEquippable");
const Inventory_1 = require("./Inventory");
const Item_1 = require("./Item");
const Pickaxe_1 = require("./Pickaxe");
const Shovel_1 = require("./Shovel");
const TNT_1 = require("./TNT");
exports.default = {
    IConsumable: IConsumable_1.IConsumable,
    IEquippable: IEquippable_1.IEquippable,
    Inventory: Inventory_1.Inventory,
    Item: Item_1.Item,
    Pickaxe: Pickaxe_1.Pickaxe,
    Shovel: Shovel_1.Shovel,
    TNT: TNT_1.TNT
};

},{"./IConsumable":17,"./IEquippable":18,"./Inventory":19,"./Item":20,"./Pickaxe":21,"./Shovel":22,"./TNT":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
}
exports.Player = Player;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
class Shop {
}
exports.Shop = Shop;

},{}],27:[function(require,module,exports){
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

},{"./GameManager":3,"./Player":25,"./Shop":26,"./subnamespace":28}],28:[function(require,module,exports){
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

},{"./Console":2,"./GameObjects":16,"./Items":24}],29:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Classes_1 = __importDefault(require("./Classes"));
var game = new Classes_1.default.GameManager();

},{"./Classes":27}]},{},[29]);
