(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "BookOfEnergyTier1Name": "Book Of Energy Tier 1",
    "BookOfEnergyTier1Desc": "Basic energy guide, +<number> energy.",
    "BookOfEnergyTier1Price": 100,
    "BookOfEnergyTier1ImagePath": "dist/Assets/Prototype/buku1.png",
    "BookOfEnergyTier1EnergyRestored": 10,
    "BookOfEnergyTier2Name": "Book Of Energy Tier 2",
    "BookOfEnergyTier2Desc": "Advanced energy guide, +<number> energy.",
    "BookOfEnergyTier2Price": 200,
    "BookOfEnergyTier2ImagePath": "dist/Assets/Prototype/buku2.png",
    "BookOfEnergyTier2EnergyRestored": 20,
    "BookOfEnergyTier3Name": "Book Of Energy Tier 3",
    "BookOfEnergyTier3Desc": "Mastery energy guide, +<number> energy.",
    "BookOfEnergyTier3Price": 300,
    "BookOfEnergyTier3ImagePath": "dist/Assets/Prototype/buku3.png",
    "BookOfEnergyTier3EnergyRestored": 30,

    "IronSwordName": "Iron Sword",
    "IronSwordDesc": "A Sword made of Iron, used to break chests and slay sea monsters.",
    "IronSwordPrice": 200,
    "IronSwordImagePath": "dist/assets/final/ironsword.png",

    "IronShovelName": "Iron Shovel",
    "IronShovelDesc": "A Shovel made of Iron, used to dig.",
    "IronShovelPrice": 200,
    "IronShovelImagePath": "dist/assets/final/ironshovel.png",

    "IronPickaxeName": "Iron Pickaxe",
    "IronPickaxeDesc": "A Pickaxe made of Iron, used to mine.",
    "IronPickaxePrice": 200,
    "IronPickaxeImagePath": "dist/assets/final/ironpickaxe.png",

    "GoldSwordName": "Gold Sword",
    "GoldSwordDesc": "A Legendary Sword made of Gold, used to break chests and slay sea monsters.",
    "GoldSwordPrice": 500,
    "GoldSwordImagePath": "dist/assets/final/goldsword.png",

    "GoldShovelName": "Gold Shovel",
    "GoldShovelDesc": "A Legendary Shovel made of Gold, used to dig.",
    "GoldShovelPrice": 500,
    "GoldShovelImagePath": "dist/assets/final/goldshovel.png",

    "GoldPickaxeName": "Gold Pickaxe",
    "GoldPickaxeDesc": "A Legendary Pickaxe made of Gold, used to mine.",
    "GoldPickaxePrice": 500,
    "GoldPickaxeImagePath": "dist/assets/final/goldpickaxe.png",

    "SilverSwordName": "Silver Sword",
    "SilverSwordDesc": "A Durable Sword made of Silver, used to break chests and slay sea monsters.",
    "SilverSwordPrice": 350,
    "SilverSwordImagePath": "dist/assets/final/silversword.png",

    "SilverShovelName": "Silver Shovel",
    "SilverShovelDesc": "A Durable Shovel made of Silver, used to dig.",
    "SilverShovelPrice": 350,
    "SilverShovelImagePath": "dist/assets/final/silvershovel.png",

    "SilverPickaxeName": "Silver Pickaxe",
    "SilverPickaxeDesc": "A Durable Pickaxe made of Silver, used to mine.",
    "SilverPickaxePrice": 350,
    "SilverPickaxeImagePath": "dist/assets/final/silverpickaxe.png",

    "SwordName": "Sword Name",
    "SwordDesc": "Sword Description",
    "SwordPrice": 1000,
    "SwordImagePath": "dist/Assets/Prototype/buku3.png",
    "ShovelName": "Shovel Name",
    "ShovelDesc": "Shovel Description",
    "ShovelPrice": 150,
    "ShovelImagePath": "dist/Assets/Prototype/buku3.png",
    "PickaxeName": "Pickaxe Name",
    "PickaxeDesc": "Pickaxe Description",
    "PickaxePrice": 200,
    "PickaxeImagePath": "dist/Assets/Prototype/buku3.png",
    
    "LOCAL_API_URL": "http://localhost:3000",
    "MASTER_API_URL": "http://localhost:8000"
}
},{}],2:[function(require,module,exports){
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
const { LOCAL_API_URL, MASTER_API_URL } = require("../../dist/config/env.json");
class API {
    static getPlayerName() {
        return sessionStorage.getItem("game_itland_player_name");
    }
    sendSaveData() {
        const apiUrl = "https://5591-203-78-117-152.ngrok-free.app/";
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        const request = new Request(apiUrl, {
            method: "POST",
            headers: headers,
            // body: JSON.stringify(user)
        });
        return fetch(request).then((res) => {
            console.log("got response:", res);
        });
    }
    getMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = LOCAL_API_URL + "/map";
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
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
                const apiUrl = LOCAL_API_URL + "/question";
                const response = yield fetch(apiUrl);
                // alert(JSON.stringify(response));
                let question = {
                    id: "",
                    text: "",
                    a: "",
                    b: "",
                    c: "",
                    d: "",
                    answer: "",
                };
                if (!response.ok)
                    throw new Error("Network Response was not ok");
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                question.id = jsonData.id;
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
    getPlayerData() {
        return __awaiter(this, void 0, void 0, function* () {
            let player = {
                x: Number,
                y: Number,
                energy: Number,
            };
            try {
                const apiUrl = LOCAL_API_URL + "/player";
                const request = new Request(apiUrl, {
                    method: "GET",
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
                else {
                    const jsonString = yield response.text();
                    const jsonData = JSON.parse(jsonString);
                    player.x = jsonData.x;
                    player.y = jsonData.y;
                    player.energy = jsonData.energy;
                    return player;
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    initializePlayer(x, y, energy, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let firstTick = yield this.startTick(x, y, energy, username); //initializes player if player is not defined
            let playerdata = yield this.getPlayerData();
            return playerdata;
        });
    }
    static sendInventory(username, B1_amount, B2_amount, B3_amount, pickaxeLevel, shovelLevel, swordLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = `${LOCAL_API_URL}/inventory?username=${username}&B1_amount=${B1_amount}&B2_amount=${B2_amount}&B3_amount=${B3_amount}&pickaxeLevel=${pickaxeLevel}&shovelLevel=${shovelLevel}&swordLevel=${swordLevel}`;
                const request = new Request(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
            }
            catch (error) {
                console.error("There was an error: ", error);
            }
        });
    }
    static loadInventory(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.error(username);
                const apiUrl = `${LOCAL_API_URL}/inventory?username=${username}`;
                const request = new Request(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const response = yield fetch(request);
                const data = yield response.text();
                return JSON.parse(data);
                if (!response.ok)
                    throw new Error("Nestwork Response was not ok");
            }
            catch (error) {
                console.error("There was an error: ", error);
            }
        });
    }
    gameStart() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = LOCAL_API_URL + "/map";
            const apiUrl2 = LOCAL_API_URL + "/entity";
            let map = { tile: [], entity: [] };
            try {
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    alert("error connecting to backend-api");
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                map.tile = jsonData;
            }
            catch (error) {
                alert("error getting tile data");
            }
            try {
                const response = yield fetch(apiUrl2);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                map.entity = jsonData;
            }
            catch (error) {
                alert("error getting entity data");
            }
            return map;
        });
    }
    startTick(x, y, energy, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = `${LOCAL_API_URL}/player?x=${x}&y=${y}&energy=${energy}&username=${username}`;
                const request = new Request(apiUrl, {
                    method: "POST",
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
            }
            catch (error) {
                console.error("hello");
            }
        });
    }
    subtick(x, y, energy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = `${LOCAL_API_URL}/player?x=${x}&y=${y}&energy=${energy}`;
                const request = new Request(apiUrl, {
                    method: "PUT",
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
            }
            catch (error) {
                console.error("hello");
            }
        });
    }
    getEntity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = LOCAL_API_URL + "/map";
                const response = yield fetch(apiUrl);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
                const jsonString = yield response.text();
                const jsonData = JSON.parse(jsonString);
                // alert(JSON.stringify(jsonData));
                return JSON.stringify(jsonData);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getGold(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${LOCAL_API_URL}/gold`;
                const requestHeaders = new Headers();
                requestHeaders.set("Content-Type", "application/json");
                requestHeaders.set("token", token);
                const responseGold = yield fetch(url, {
                    method: "GET",
                    headers: requestHeaders,
                });
                return responseGold;
            }
            catch (error) {
                alert("error getting gold from API. Please contact a nearby admin");
            }
        });
    }
    static updateGold(token, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = LOCAL_API_URL + `/transaction?gold=${amount}`;
                const requestHeaders = new Headers();
                requestHeaders.set("Content-Type", "application/json");
                requestHeaders.set("token", token);
                const responseGold = yield fetch(url, {
                    method: "POST",
                    headers: requestHeaders,
                });
            }
            catch (error) {
                alert("error updating gold from API. Please contact a nearby admin");
            }
        });
    }
    removeEntity(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = `${LOCAL_API_URL}/entity?x=${x}&y=${y}`;
                const request = new Request(apiUrl, {
                    method: "DELETE",
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
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
    digTile(x, y, tile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiURL = `${LOCAL_API_URL}/dig?x=${x}&y=${y}&tile=${tile}`;
                const request = new Request(apiURL, {
                    method: "PUT",
                });
                const response = yield fetch(request);
                if (!response.ok)
                    throw new Error("Network Response was not ok");
            }
            catch (error) {
                console.error("hello");
            }
        });
    }
    static Dynamite(username, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `${LOCAL_API_URL}/attack?username=${username}&gold=-150&sender=${target}`;
            const request = new Request(apiUrl, {
                method: "PUT",
            });
            const response = yield fetch(request);
            if (!response.ok)
                throw new Error("Network Response was not ok");
            const jsonString = yield response.text();
            const jsonData = JSON.parse(jsonString);
            return JSON.stringify(jsonData);
        });
    }
    static CannonBall(username, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `${LOCAL_API_URL}/attack?username=${username}&gold=-300&sender=${target}`;
            const request = new Request(apiUrl, {
                method: "PUT",
            });
            const response = yield fetch(request);
            if (!response.ok)
                throw new Error("Network Response was not ok");
            const jsonString = yield response.text();
            const jsonData = JSON.parse(jsonString);
            return JSON.stringify(jsonData);
        });
    }
    getLastAttack(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiURL = `${LOCAL_API_URL}/last-attack?username=${username}`;
            const request = new Request(apiURL, {
                method: "GET",
            });
            const response = yield fetch(request);
            if (!response.ok)
                throw new Error("Network Response was not ok");
            return response;
        });
    }
    seeAttack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiURL = `${LOCAL_API_URL}/see-attack?id=${id}`;
            const request = new Request(apiURL, {
                method: "PUT",
            });
            const response = yield fetch(request);
            if (!response.ok)
                throw new Error("Network Response was not ok");
            return response;
        });
    }
    static getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `${MASTER_API_URL}/get-all-users`;
            const request = new Request(apiUrl, {
                method: "GET",
            });
            const response = yield fetch(request);
            if (!response.ok)
                throw new Error("Network Response was not ok");
            const jsonString = yield response.text();
            const jsonData = JSON.parse(jsonString);
            return JSON.stringify(jsonData);
        });
    }
}
exports.API = API;

},{"../../dist/config/env.json":1}],3:[function(require,module,exports){
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

},{"./GameObjects/PlayerUnit":34,"./GameObjects/Tile":37}],4:[function(require,module,exports){
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

},{"./Wrapper":17}],5:[function(require,module,exports){
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

},{"./Command":6,"./Expression":8,"./Wrapper":17}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(terminal) {
        this.terminal = terminal;
    }
}
exports.Command = Command;

},{}],7:[function(require,module,exports){
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

},{"./Command":6}],8:[function(require,module,exports){
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

},{"./VoidWrapper":15,"./Wrapper":17}],9:[function(require,module,exports){
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

},{"./BoolWrapper":4,"./StringWrapper":13,"./Wrapper":17}],10:[function(require,module,exports){
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

},{"./WaitWrapper":16,"./Wrapper":17}],11:[function(require,module,exports){
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

},{"./Command":6,"./VoidWrapper":15,"./WaitWrapper":16}],12:[function(require,module,exports){
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

},{"./Command":6,"./EndCommand":7}],13:[function(require,module,exports){
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

},{"./BoolWrapper":4,"./NumberWrapper":9,"./Wrapper":17}],14:[function(require,module,exports){
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

},{"./BoolWrapper":4,"./BranchCommand":5,"./EndCommand":7,"./Expression":8,"./NumberWrapper":9,"./PlayerWrapper":10,"./SingleCommand":11,"./StartCommand":12,"./StringWrapper":13,"./VoidWrapper":15,"./Wrapper":17}],15:[function(require,module,exports){
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

},{"./Wrapper":17}],16:[function(require,module,exports){
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

},{"./VoidWrapper":15}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
const Pickaxe_1 = require("./Items/Pickaxe");
const Sword_1 = require("./Items/Sword");
const Shovel_1 = require("./Items/Shovel");
const digged_sand_1 = require("./GameObjects/digged_sand");
const digged_gravel_1 = require("./GameObjects/digged_gravel");
const digged_ground_1 = require("./GameObjects/digged_ground");
const digged_granite_1 = require("./GameObjects/digged_granite");
class GameManager {
    constructor(canvasView = null, terminalView = null, shopView, inventoryView = null, questionView = null, leaderboardView = null) {
        var _a, _b;
        this.api = null;
        this.lastTimeStamp = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.animationFrameId = -1;
        this.player = new Player_1.Player(1, 1, 0, 0);
        this.terminalView = null;
        this.grid = new Grid_1.Grid({ x: 100, y: 100 });
        this.canvasView = null;
        this.activePlayerUnit = null;
        this.shopView = null;
        this.inventoryView = null;
        this.leaderboardView = null;
        this.questionView = null;
        this.token = "";
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        this.setShopView(shopView);
        this.setInventoryView(inventoryView);
        this.api = new API_1.API();
        this.setQuestionView(questionView);
        this.setLeaderboardView(leaderboardView);
        (_b = (_a = this.shopView) === null || _a === void 0 ? void 0 : _a.getShop()) === null || _b === void 0 ? void 0 : _b.setGame(this);
    }
    // public addToInventory(index: number, amount: number) {
    //     this.inventoryView?.getInventory()?.addItemOwned(index, amount);
    // }
    setLeaderboardView(leaderboardView) {
        var _a;
        if (leaderboardView) {
            this.leaderboardView = leaderboardView;
            (_a = this.leaderboardView) === null || _a === void 0 ? void 0 : _a.setPlayer(this.player);
        }
    }
    setInventory() {
        var _a, _b;
        const tempInventory = (_a = this.inventoryView) === null || _a === void 0 ? void 0 : _a.getInventory();
        (_b = this.shopView) === null || _b === void 0 ? void 0 : _b.setInventory(tempInventory);
        this.player.setInventory(tempInventory);
        this.player.setGameManager(this);
    }
    load(token) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function* () {
            this.token = token;
            (_a = this.shopView) === null || _a === void 0 ? void 0 : _a.setPlayer(this.player);
            // alert('await load');
            let map = { tile: [], entity: [] };
            map = yield ((_b = this.api) === null || _b === void 0 ? void 0 : _b.gameStart()); //use non-null assertion operator.
            // alert(map.tile.length);
            // let playerdata = await this.api?.initializePlayer(1, 1, 0);
            let playerdata = yield ((_c = this.api) === null || _c === void 0 ? void 0 : _c.getPlayerData());
            if (!playerdata) {
                alert(this.player.getPlayerName());
                playerdata = yield ((_d = this.api) === null || _d === void 0 ? void 0 : _d.initializePlayer(1, 1, 0, this.player.getPlayerName()));
            }
            this.player = new Player_1.Player(Number(playerdata === null || playerdata === void 0 ? void 0 : playerdata.x), Number(playerdata === null || playerdata === void 0 ? void 0 : playerdata.y), 0, Number(playerdata === null || playerdata === void 0 ? void 0 : playerdata.energy));
            this.player.energy = Number(playerdata === null || playerdata === void 0 ? void 0 : playerdata.energy); //an example of why typescript is dogshit.
            //redoing load grid because the constructor cannot be an async function.
            this.grid = new Grid_1.Grid({ x: 100, y: 100 });
            (_e = this.leaderboardView) === null || _e === void 0 ? void 0 : _e.setPlayer(this.player);
            this.grid.redo(map.tile, map.entity);
            this.grid.addEntity(this.player.units[0]);
            this.setActivePlayerUnit(this.player.units[0]);
            (_f = this.questionView) === null || _f === void 0 ? void 0 : _f.setPlayer(this.player);
            yield ((_g = this.questionView) === null || _g === void 0 ? void 0 : _g.load());
            (_h = this.questionView) === null || _h === void 0 ? void 0 : _h.refreshStats();
            (_j = this.leaderboardView) === null || _j === void 0 ? void 0 : _j.setQuestionView(this.questionView);
            (_k = this.leaderboardView) === null || _k === void 0 ? void 0 : _k.setGameManager(this);
            this.setInventory();
            (_m = (_l = this.inventoryView) === null || _l === void 0 ? void 0 : _l.getInventory()) === null || _m === void 0 ? void 0 : _m.loadInventory();
            (_p = (_o = this.shopView) === null || _o === void 0 ? void 0 : _o.getShop()) === null || _p === void 0 ? void 0 : _p.loadShop();
        });
    }
    tick() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.subtick(this.player.getCoordinate().x, this.player.getCoordinate().y, this.player.getEnergy()));
            const curGold = yield ((_b = this.api) === null || _b === void 0 ? void 0 : _b.getGold(this.token));
            const jsonString = yield curGold.text();
            const jsonData = JSON.parse(jsonString);
            this.player.setGold(parseInt(jsonData.gold));
            (_c = this.questionView) === null || _c === void 0 ? void 0 : _c.refreshStats();
            this.processAttack();
            yield this.save();
        });
    }
    processAttack() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const lastAttack = yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.getLastAttack(this.player.getPlayerName()));
            const lastAttackString = yield lastAttack.text();
            const lastAttackData = JSON.parse(lastAttackString);
            if (!lastAttackData.seen) {
                (_b = this.api) === null || _b === void 0 ? void 0 : _b.seeAttack(lastAttackData.id);
                alert(`You have been attacked by ${lastAttackData.sender}! You lost ${lastAttackData.gold} gold coin(s)!`);
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
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
    testAPIsoal() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const string1 = yield ((_a = this.api) === null || _a === void 0 ? void 0 : _a.getQuestion());
            return string1;
        });
    }
    cheatItems() {
        this.player.setEquipmentLevels(2);
    }
    upgradePickaxe() {
        this.player.upgradePickaxe();
    }
    upgradeSword() {
        this.player.upgradeSword();
    }
    upgradeShovel() {
        this.player.upgradeShovel();
    }
    logActivity(str) {
        var _a;
        const terminal = (_a = this.terminalView) === null || _a === void 0 ? void 0 : _a.getTextArea();
        if (terminal) {
            terminal.value = `\n${str}`;
        }
    }
    removeGridEntity(x, y) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const entName = (_a = this.grid.entityGrid[y][x]) === null || _a === void 0 ? void 0 : _a.getEntityName();
            const drop = (_b = this.grid.entityGrid[y][x]) === null || _b === void 0 ? void 0 : _b.entityDrop();
            // const transaction = this.api?.updateGold(this.token, drop);
            const transaction = API_1.API.updateGold(this.token, drop);
            this.player.addGold(drop);
            this.logActivity(`Destroyed a ${entName} and got ${drop} gold coins!`);
            (_c = this.questionView) === null || _c === void 0 ? void 0 : _c.refreshStats();
            this.grid.entityGrid[y][x] = null;
            yield ((_d = this.api) === null || _d === void 0 ? void 0 : _d.removeEntity(y, x));
        });
    }
    digTile(x, y) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const name = (_a = this.grid.tiles[y][x]) === null || _a === void 0 ? void 0 : _a.getTileName();
            const drop = (_b = this.grid.tiles[y][x]) === null || _b === void 0 ? void 0 : _b.tileDrop();
            const transaction = API_1.API.updateGold(this.token, drop);
            this.player.addGold(drop);
            this.logActivity(`Excavated a ${name} area and got ${drop} gold coins!`);
            (_c = this.questionView) === null || _c === void 0 ? void 0 : _c.refreshStats();
            let newTile;
            switch (name) {
                case "grass":
                    newTile = new digged_ground_1.DiggedGround({ x: y, y: x });
                    break;
                case "gravel":
                    newTile = new digged_gravel_1.DiggedGravel({ x: y, y: x });
                    break;
                case "granite":
                    newTile = new digged_granite_1.DiggedGranite({ x: y, y: x });
                    break;
                case "sand":
                    newTile = new digged_sand_1.DiggedSand({ x: y, y: x });
                    break;
                default:
                    newTile = new digged_ground_1.DiggedGround({ x: y, y: x });
                    break;
            }
            this.grid.tiles[y][x] = newTile;
            yield ((_d = this.api) === null || _d === void 0 ? void 0 : _d.digTile(y, x, newTile.name.toLowerCase()));
        });
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
    changeEquipment() { }
    isGoodEnough(level, target) {
        return level >= target;
    }
    //commit action
    //actionType:
    //1 = mine
    //2 = break
    //Direction.Under = dig
    Action(direction, tools) {
        var _a;
        if ((_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.isMoving)
            return;
        const coords = this.player.getCoordinate();
        const temp = this.getGridEntity(coords, direction);
        const tile = this.getTile(coords);
        if (!temp && direction != Direction_1.Direction.Under) {
            this.logActivity("No Entity Object!");
            return;
        }
        else if (Direction_1.Direction.Under && !tile) {
            //should not be possible but its here just in case :D
            this.logActivity("Invalid Dig Command");
            return;
        }
        else if (direction != Direction_1.Direction.Down &&
            (temp === null || temp === void 0 ? void 0 : temp.getEntityName()) == "Obsidian") {
            this.logActivity("This is an obsidian block. It is a world border object and thus cannot be destroyed!");
            return;
        }
        if (tools instanceof Pickaxe_1.Pickaxe) {
            this.actionWithPickaxe(temp, direction);
        }
        else if (tools instanceof Sword_1.Sword) {
            this.actionWithSword(temp, direction);
        }
        else if (tools instanceof Shovel_1.Shovel) {
            if (!tile)
                return;
            this.actionWithShovel(tile);
        }
        else {
            this.alertEquipSomething();
        }
    }
    getTile(coords) {
        return this.grid.getTile(coords.x, coords.y);
    }
    getGridEntity(coords, direction) {
        switch (direction) {
            case Direction_1.Direction.Up:
                return this.grid.getEntity(coords.x, coords.y - 1);
            case Direction_1.Direction.Down:
                return this.grid.getEntity(coords.x, coords.y + 1);
            case Direction_1.Direction.Left:
                return this.grid.getEntity(coords.x - 1, coords.y);
            case Direction_1.Direction.Right:
                return this.grid.getEntity(coords.x + 1, coords.y);
            case Direction_1.Direction.Under:
                return null; // TODO: implement shovel action
            default:
                return null;
        }
    }
    alertEquipSomething() {
        alert("Equip something");
    }
    actionWithPickaxe(entity, direction) {
        var _a, _b;
        const entityName = entity.getEntityName();
        if (entityName == "Rock" ||
            entityName == "Iron_ore" ||
            entityName == "Silver_ore" ||
            entityName == "Gold_ore") {
            if (this.isGoodEnough(this.player.getEnergy(), entity.getRequiredEnergy())) {
                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, entity.getEntityLevel())) {
                    this.removeGridEntity(entity.getCoordinate().x, entity.getCoordinate().y);
                    (_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.Mine(direction);
                    this.player.useEnergy(entity.getRequiredEnergy());
                    (_b = this.questionView) === null || _b === void 0 ? void 0 : _b.refreshStats();
                }
                else {
                    alert(this.player.getEquipmentLevels().pickaxe);
                    alert(entity.getEntityLevel());
                    this.logActivity(`Upgrade your pickaxe to destroy this block!`);
                }
            }
            else {
                this.logActivity(`You need more energy to do this action!`);
            }
        }
        else {
            this.logActivity("You cannot use a pickaxe to break this object! (wrong equipment used)");
        }
    }
    actionWithSword(entity, direction) {
        var _a, _b;
        const entityName = entity.getEntityName();
        if (entityName == "Chest" ||
            entityName == "Medium_Chest" ||
            entityName == "Big_Chest") {
            if (this.isGoodEnough(this.player.getEnergy(), entity.getRequiredEnergy())) {
                if (this.isGoodEnough(this.player.getEquipmentLevels().sword, entity.getEntityLevel())) {
                    this.removeGridEntity(entity.getCoordinate().x, entity.getCoordinate().y);
                    (_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.Break(direction);
                    this.player.useEnergy(entity.getRequiredEnergy());
                    (_b = this.questionView) === null || _b === void 0 ? void 0 : _b.refreshStats();
                }
                else {
                    this.logActivity(`Upgrade your sword to destroy this block!`);
                }
            }
            else {
                this.logActivity(`You need more energy to do this action!`);
            }
        }
        else {
            this.logActivity("You cannot use a sword to break this object!");
        }
    }
    actionWithShovel(tile) {
        var _a, _b;
        const isDiggable = !tile.name.includes("digged");
        switch (isDiggable) {
            case true:
                if (this.isGoodEnough(this.player.getEnergy(), tile.getRequiredEnergy())) {
                    if (this.isGoodEnough(this.player.getEquipmentLevels().shovel, tile.level)) {
                        // this.logActivity("Digged this tile, function not implemented")
                        this.digTile(tile.getCoordinate().x, tile.getCoordinate().y);
                        (_a = this.activePlayerUnit) === null || _a === void 0 ? void 0 : _a.Dig();
                        this.player.useEnergy(tile.getRequiredEnergy());
                        (_b = this.questionView) === null || _b === void 0 ? void 0 : _b.refreshStats();
                    }
                    else {
                        this.logActivity("Upgrade your shovel to excavate this area!");
                    }
                }
                else {
                    this.logActivity(`You need more energy to do this action!`);
                }
                break;
            case false:
                this.logActivity("This area has already been excavated! ");
                break;
            default:
                alert("This is the wrong tool!");
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
            },
        }, this.player.units);
    }
    render() {
        var _a, _b, _c;
        (_a = this.canvasView) === null || _a === void 0 ? void 0 : _a.render(this.grid);
        (_c = (_b = this.canvasView) === null || _b === void 0 ? void 0 : _b.getContext()) === null || _c === void 0 ? void 0 : _c.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80);
    }
    buyInit() {
        const shopItem = document.querySelectorAll(".card-shop");
    }
}
exports.GameManager = GameManager;

},{"./API":2,"./GameObjects/Direction":24,"./GameObjects/Grid":29,"./GameObjects/digged_granite":38,"./GameObjects/digged_gravel":39,"./GameObjects/digged_ground":40,"./GameObjects/digged_sand":41,"./Items/Pickaxe":55,"./Items/Shovel":56,"./Items/Sword":57,"./Player":60}],19:[function(require,module,exports){
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

},{"./ChainedAnimation":22,"./GroupAnimation":31}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigChest = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class BigChest extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Big_Chest", 3, 350, 800, 20);
        this.getLoot = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'big_chest', Animation_1.Animation.assets['chest_large'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.BigChest = BigChest;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],22:[function(require,module,exports){
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

},{"./Animation":20}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chest = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Chest extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Chest", 1, 10, 150, 5);
        this.getLoot = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'chest', Animation_1.Animation.assets['chest_normal'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Chest = Chest;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Animated_1 = require("./Animated");
class Entity extends Animated_1.Animated {
    constructor(coordinate, animations = [], entityName, entityLevel, minValue, maxValue, requiredEnergy) {
        super(animations);
        this.grid = null;
        this.entityType = null;
        this.entityLevel = null;
        this.entityName = null;
        this.minValue = null;
        this.maxValue = null;
        this.requiredEnergy = null;
        this.coordinate = coordinate;
        this.entityName = entityName;
        this.entityLevel = entityLevel;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.requiredEnergy = requiredEnergy;
    }
    getRequiredEnergy() {
        if (this.requiredEnergy != null)
            return this.requiredEnergy;
        //if required energy is null then it will return -1
        else
            return -1;
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

},{"./Animated":19}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Granite = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Granite extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "granite", 15, 3, 150, 400);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[3]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Granite = Granite;

},{"./GroupAnimation":31,"./Tile":37}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Grass extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "grass", 5, 1, 10, 50);
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

},{"./GroupAnimation":31,"./Tile":37}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gravel = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Gravel extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "gravel", 10, 2, 50, 150);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[3]);
        this.currentAnimationIndex = 0;
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Gravel = Gravel;

},{"./GroupAnimation":31,"./Tile":37}],29:[function(require,module,exports){
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
const Granite_1 = require("./Granite");
const Ground_1 = require("./Ground");
const Obsidian_1 = require("./Obsidian");
const Medium_Chest_1 = require("./Medium_Chest");
const Big_Chest_1 = require("./Big_Chest");
const digged_sand_1 = require("./digged_sand");
const digged_ground_1 = require("./digged_ground");
const digged_gravel_1 = require("./digged_gravel");
const digged_granite_1 = require("./digged_granite");
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
                    switch (map[j][i]) {
                        case 'grass':
                            this.tiles[i].push(new Grass_1.Grass({ x: j, y: i }));
                            break;
                        case 'sand':
                            this.tiles[i].push(new Sand_1.Sand({ x: j, y: i }));
                            break;
                        case 'gravel':
                            this.tiles[i].push(new Gravel_1.Gravel({ x: j, y: i }));
                            break;
                        case 'granite':
                            this.tiles[i].push(new Granite_1.Granite({ x: j, y: i }));
                            break;
                        case 'cave':
                            this.tiles[i].push(new Ground_1.Ground({ x: j, y: i }));
                            break;
                        case 'digged_ground':
                            this.tiles[i].push(new digged_ground_1.DiggedGround({ x: j, y: i }));
                            break;
                        case 'digged_sand':
                            this.tiles[i].push(new digged_sand_1.DiggedSand({ x: j, y: i }));
                            break;
                        case 'digged_gravel':
                            this.tiles[i].push(new digged_gravel_1.DiggedGravel({ x: j, y: i }));
                            break;
                        case 'digged_granite':
                            this.tiles[i].push(new digged_granite_1.DiggedGranite({ x: j, y: i }));
                            break;
                        case 'digged_cave':
                            this.tiles[i].push(new Ground_1.Ground({ x: j, y: i }));
                            break;
                        default:
                            this.tiles[i].push(new Grass_1.Grass({ x: j, y: i }));
                            break;
                    }
                    switch (entity[j][i]) {
                        case 'obsidian':
                            const obsidian = new Obsidian_1.Obsidian({ x: j, y: i });
                            obsidian.addAnimation(new ChainedAnimation_1.ChainedAnimation(obsidian, 'obsidian', Animation_1.Animation.assets['obsidian'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(obsidian);
                            break;
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
                            // alert('medium')
                            const m_chest = new Medium_Chest_1.MediumChest({ x: j, y: i });
                            m_chest.addAnimation(new ChainedAnimation_1.ChainedAnimation(m_chest, 'medium_chest', Animation_1.Animation.assets['chest_medium'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(m_chest);
                            break;
                        case 'big_chest':
                            // alert('big')
                            const b_chest = new Big_Chest_1.BigChest({ x: j, y: i });
                            b_chest.addAnimation(new ChainedAnimation_1.ChainedAnimation(b_chest, 'big_chest', Animation_1.Animation.assets['chest_large'], { x: 32, y: 32 }, 1, -1, 1));
                            this.addEntity(b_chest);
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
    getTile(x, y) {
        return this.tiles[y][x];
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

},{"./Animation":20,"./Big_Chest":21,"./ChainedAnimation":22,"./Chest":23,"./Granite":26,"./Grass":27,"./Gravel":28,"./Ground":30,"./GroupAnimation":31,"./Medium_Chest":32,"./Obsidian":33,"./PlayerUnit":34,"./Rock":35,"./Sand":36,"./digged_granite":38,"./digged_gravel":39,"./digged_ground":40,"./digged_sand":41,"./gold_ore":42,"./iron_ore":43,"./silver_ore":44}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ground = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
const digged_ground_1 = require("./digged_ground");
class Ground extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "ground", 5, 1, 5, 40);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[4]);
        this.addDigForm(new digged_ground_1.DiggedGround(coordinate));
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Ground = Ground;

},{"./GroupAnimation":31,"./Tile":37,"./digged_ground":40}],31:[function(require,module,exports){
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

},{"./Animation":20}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumChest = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class MediumChest extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Medium_Chest", 2, 150, 350, 10);
        this.getLoot = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'medium_chest', Animation_1.Animation.assets['chest_medium'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.MediumChest = MediumChest;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obsidian = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Obsidian extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Obsidian", 1, 10, 50, 5);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'obsidian', Animation_1.Animation.assets['obdisian'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Obsidian = Obsidian;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUnit = void 0;
const Terminal_1 = require("../Console/Terminal");
const Inventory_1 = require("../Items/Inventory");
const Direction_1 = require("./Direction");
const Entity_1 = require("./Entity");
class PlayerUnit extends Entity_1.Entity {
    constructor(coordinate, moveSpeed = 1, animations = []) {
        super(coordinate, animations, "Player", 99, 99, 99, 10000);
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
        //MOVEMENT WITH SYNTAX! DO NOT ERASE THIS! IMPORTANT DOCUMENTATION
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
            //SYNTAX COMMAND EXECUTION. DO NOT REMOVE THIS BEFORE DOCUMENTATION IS COMPLETE.  
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
        if (this.isMoving)
            return;
        this.isMoving = true;
        this.playAnimation("dig");
    }
    Break(direction) {
        if (this.isMoving)
            return;
        this.isMoving = true;
        switch (direction) {
            case Direction_1.Direction.Down:
                this.playAnimation('break_down');
                break;
            case Direction_1.Direction.Up:
                this.playAnimation('break_up');
                break;
            case Direction_1.Direction.Left:
                this.playAnimation('break_left');
                break;
            case Direction_1.Direction.Right:
                this.playAnimation('break_right');
                break;
            default:
                break;
        }
    }
    Mine(direction) {
        if (this.isMoving)
            return;
        this.isMoving = true;
        switch (direction) {
            case Direction_1.Direction.Down:
                this.playAnimation('mine_down');
                break;
            case Direction_1.Direction.Up:
                this.playAnimation('mine_up');
                break;
            case Direction_1.Direction.Left:
                this.playAnimation('mine_left');
                break;
            case Direction_1.Direction.Right:
                this.playAnimation('mine_right');
                break;
            default:
                break;
        }
    }
    move(direction) {
        if (this.isMoving || direction == Direction_1.Direction.None)
            return;
        this.isMoving = true;
        // this.playAnimation('walk')
        switch (direction) {
            case Direction_1.Direction.Left:
                this.playAnimation('walk_left');
                break;
            case Direction_1.Direction.Right:
                this.playAnimation('walk_right');
                break;
            case Direction_1.Direction.Up:
                this.playAnimation('walk_up');
                break;
            case Direction_1.Direction.Down:
                this.playAnimation('walk_down');
                break;
            default:
                this.playAnimation('walk_up');
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

},{"../Console/Terminal":14,"../Items/Inventory":53,"./Direction":24,"./Entity":25}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Rock extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Rock", 1, 10, 75, 5);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'rock', Animation_1.Animation.assets['rock'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Rock = Rock;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sand = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class Sand extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "sand", 5, 1, 10, 50);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[2]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.Sand = Sand;

},{"./GroupAnimation":31,"./Tile":37}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const Animated_1 = require("./Animated");
class Tile extends Animated_1.Animated {
    constructor(coordinate, animations = [], name, requiredEnergy, level, minValue, maxValue) {
        super(animations);
        this.digForm = null;
        this.coordinate = coordinate;
        this.name = name;
        this.requiredEnergy = requiredEnergy;
        this.level = level;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    addDigForm(tile) {
        this.digForm = tile;
    }
    getDigForm() {
        return this.digForm;
    }
    getRequiredEnergy() {
        if (this.requiredEnergy != null)
            return this.requiredEnergy;
        //if required energy is null then it will return -1
        else
            return -1;
    }
    getCoordinate() {
        return this.coordinate;
    }
    getTileName() {
        if (this.name) {
            return this.name;
        }
        return "";
    }
    tileDrop() {
        if (this.minValue != null && this.maxValue != null) {
            return Math.round(Math.random() * this.maxValue) + this.minValue;
        }
        else {
            return 0; //if this returns into 0 there's sumting wong
        }
    }
}
exports.Tile = Tile;
Tile.defaultTileResolution = { x: 32, y: 32 };

},{"./Animated":19}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiggedGranite = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class DiggedGranite extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "digged_granite", 5, 1, 5, 40);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[10]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.DiggedGranite = DiggedGranite;

},{"./GroupAnimation":31,"./Tile":37}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiggedGravel = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class DiggedGravel extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "digged_gravel", 5, 1, 5, 40);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[9]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.DiggedGravel = DiggedGravel;

},{"./GroupAnimation":31,"./Tile":37}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiggedGround = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class DiggedGround extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "digged_ground", 5, 1, 5, 40);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[6]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.DiggedGround = DiggedGround;

},{"./GroupAnimation":31,"./Tile":37}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiggedSand = void 0;
const Tile_1 = require("./Tile");
const GroupAnimation_1 = require("./GroupAnimation");
class DiggedSand extends Tile_1.Tile {
    constructor(coordinate) {
        super(coordinate, [], "digged_sand", 5, 1, 5, 40);
        this.addAnimation(GroupAnimation_1.GroupAnimation.animations[8]);
    }
    step(stepper) {
        return;
        throw new Error("Method not implemented.");
    }
}
exports.DiggedSand = DiggedSand;

},{"./GroupAnimation":31,"./Tile":37}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gold_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Gold_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Gold_ore", 3, 250, 600, 20);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Gold_ore', Animation_1.Animation.assets['gold_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Gold_ore = Gold_ore;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iron_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Iron_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Iron_ore", 2, 75, 175, 15);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Iron_ore', Animation_1.Animation.assets['iron_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Iron_ore = Iron_ore;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Silver_ore = void 0;
const Entity_1 = require("./Entity");
const Animation_1 = require("./Animation");
const ChainedAnimation_1 = require("./ChainedAnimation");
class Silver_ore extends Entity_1.Entity {
    constructor(coordinate, animations = []) {
        super(coordinate, animations, "Silver_ore", 2, 125, 250, 25);
        const animation = new ChainedAnimation_1.ChainedAnimation(this, 'Silver_ore', Animation_1.Animation.assets['silver_ore'], { x: 32, y: 32 }, 1, -1, 1);
    }
}
exports.Silver_ore = Silver_ore;

},{"./Animation":20,"./ChainedAnimation":22,"./Entity":25}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryView = void 0;
class InventoryView {
    constructor(inventoryButton, inventory, inventoryShopElement) {
        this.inventory = inventory;
        this.inventoryShopElement = inventoryShopElement;
        this.inventoryButton = inventoryButton;
        this.initInventoryButton();
    }
    initInventoryButton() {
        if (this.inventoryButton) {
            this.inventoryButton.addEventListener('click', () => {
                this.openInventory();
            });
        }
    }
    openInventory() {
        if (this.inventory) {
            this.inventory.open(this.inventoryShopElement);
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

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const ConsumableItem_1 = require("./ConsumableItem");
//book is not equipable, rather a consumeable.
class Book extends ConsumableItem_1.ConsumableItem {
    constructor(imagePath, itemName, itemDesc, itemPrice, energyRestored) {
        super(imagePath, itemName, itemDesc, itemPrice);
        this.energyRestored = energyRestored;
    }
    useItem() {
        return this.energyRestored;
    }
}
exports.Book = Book;

},{"./ConsumableItem":47}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumableItem = void 0;
const Item_1 = require("../Item");
class ConsumableItem extends Item_1.Item {
    constructor(imagePath, itemName, itemDesc, itemPrice) {
        super(imagePath, itemName, itemDesc, itemPrice);
    }
}
exports.ConsumableItem = ConsumableItem;

},{"../Item":54}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquippableItem = void 0;
const Item_1 = require("../Item");
class EquippableItem extends Item_1.Item {
    constructor(imagePath, itemName, itemDesc, itemPrice) {
        super(imagePath, itemName, itemDesc, itemPrice);
        this.level = 1;
        this.speed = 1;
    }
    getLevel() {
        return this.level;
    }
    setLevel(level) {
        this.level = level;
    }
    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    upgrade() {
        this.level++;
    }
}
exports.EquippableItem = EquippableItem;

},{"../Item":54}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookOfEnergyTier1 = void 0;
const Book_1 = require("./Abstract/Book");
const { BookOfEnergyTier1Name, BookOfEnergyTier1Desc, BookOfEnergyTier1Price, BookOfEnergyTier1ImagePath, BookOfEnergyTier1EnergyRestored, } = require("../../../dist/config/env.json");
class BookOfEnergyTier1 extends Book_1.Book {
    constructor() {
        super(BookOfEnergyTier1ImagePath, BookOfEnergyTier1Name, BookOfEnergyTier1Desc, BookOfEnergyTier1Price, BookOfEnergyTier1EnergyRestored);
    }
}
exports.BookOfEnergyTier1 = BookOfEnergyTier1;

},{"../../../dist/config/env.json":1,"./Abstract/Book":46}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookOfEnergyTier2 = void 0;
const Book_1 = require("./Abstract/Book");
const { BookOfEnergyTier2Name, BookOfEnergyTier2Desc, BookOfEnergyTier2Price, BookOfEnergyTier2ImagePath, BookOfEnergyTier2EnergyRestored, } = require("../../../dist/config/env.json");
class BookOfEnergyTier2 extends Book_1.Book {
    constructor() {
        super(BookOfEnergyTier2ImagePath, BookOfEnergyTier2Name, BookOfEnergyTier2Desc, BookOfEnergyTier2Price, BookOfEnergyTier2EnergyRestored);
    }
}
exports.BookOfEnergyTier2 = BookOfEnergyTier2;

},{"../../../dist/config/env.json":1,"./Abstract/Book":46}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookOfEnergyTier3 = void 0;
const Book_1 = require("./Abstract/Book");
const { BookOfEnergyTier3Name, BookOfEnergyTier3Desc, BookOfEnergyTier3Price, BookOfEnergyTier3ImagePath, BookOfEnergyTier3EnergyRestored, } = require("../../../dist/config/env.json");
class BookOfEnergyTier3 extends Book_1.Book {
    constructor() {
        super(BookOfEnergyTier3ImagePath, BookOfEnergyTier3Name, BookOfEnergyTier3Desc, BookOfEnergyTier3Price, BookOfEnergyTier3EnergyRestored);
    }
}
exports.BookOfEnergyTier3 = BookOfEnergyTier3;

},{"../../../dist/config/env.json":1,"./Abstract/Book":46}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentStatus = exports.EquipState = void 0;
var EquipState;
(function (EquipState) {
    EquipState[EquipState["EQUIPPED"] = 1] = "EQUIPPED";
    EquipState[EquipState["UNEQUIPPED"] = 0] = "UNEQUIPPED";
})(EquipState || (exports.EquipState = EquipState = {}));
var EquipmentStatus;
(function (EquipmentStatus) {
    EquipmentStatus["EQUIPPED"] = "Equipped";
    EquipmentStatus["CAN_BE_EQUIP"] = "Equip";
    EquipmentStatus["UNEQUIPPED"] = "Unequipped";
})(EquipmentStatus || (exports.EquipmentStatus = EquipmentStatus = {}));

},{}],53:[function(require,module,exports){
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
exports.Inventory = void 0;
const BookOfEnergyT1_1 = require("./BookOfEnergyT1");
const BookOfEnergyT2_1 = require("./BookOfEnergyT2");
const BookOfEnergyT3_1 = require("./BookOfEnergyT3");
const Book_1 = require("./Abstract/Book");
const ConsumableItem_1 = require("./Abstract/ConsumableItem");
const EquippableItem_1 = require("./Abstract/EquippableItem");
const ItemRelated_enum_1 = require("./Enum/ItemRelated.enum");
const API_1 = require("../API");
const { IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../../config/env.json');
const { IronShovelImagePath, SilverShovelImagePath, GoldShovelImagePath } = require('../../config/env.json');
const { IronPickaxeImagePath, SilverPickaxeImagePath, GoldPickaxeImagePath } = require('../../config/env.json');
class Inventory {
    constructor() {
        this.player = null;
        this.items = [];
        this.itemEquipState = [];
        this.items.push({
            item: new BookOfEnergyT1_1.BookOfEnergyTier1(),
            amount: 0,
        });
        this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
        this.items.push({
            item: new BookOfEnergyT2_1.BookOfEnergyTier2(),
            amount: 0,
        });
        this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
        this.items.push({
            item: new BookOfEnergyT3_1.BookOfEnergyTier3(),
            amount: 0,
        });
        this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
    }
    setPlayer(player) {
        this.player = player;
    }
    addItemInit(player) {
        const playerEquipments = player === null || player === void 0 ? void 0 : player.getAllPlayerEquipment();
        const pickaxe = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.pickaxe;
        const sword = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.sword;
        const shovel = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.shovel;
        if (pickaxe) {
            this.items.push({
                item: pickaxe,
                amount: 1,
            });
            this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
        }
        if (sword) {
            this.items.push({
                item: sword,
                amount: 1,
            });
            this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
        }
        if (shovel) {
            this.items.push({
                item: shovel,
                amount: 1,
            });
            this.itemEquipState.push(ItemRelated_enum_1.EquipState.UNEQUIPPED);
        }
    }
    addItemOwned(index, amount) {
        this.items[index].amount += amount;
    }
    // public decreaseItemOwned(index: number, amount: number): void {
    //   this.items[index].amount -= amount;
    //   const currentQty = document.querySelector(`.item-owned-qty-${index}`);
    //   if (currentQty) {
    //     currentQty.innerHTML = `${this.items[index].amount}`;
    //   }
    // }
    // public refreshInventory
    saveInventory() {
        var _a;
        const dataToSend = {
            username: (_a = this.player) === null || _a === void 0 ? void 0 : _a.getPlayerName(),
            B1_amount: this.items[0].amount,
            B2_amount: this.items[1].amount,
            B3_amount: this.items[2].amount,
            pickaxeLevel: this.items[3].amount,
            swordLevel: this.items[4].amount,
            shovelLevel: this.items[5].amount,
        };
        API_1.API.sendInventory(dataToSend.username, dataToSend.B1_amount, dataToSend.B2_amount, dataToSend.B3_amount, dataToSend.pickaxeLevel, dataToSend.shovelLevel, dataToSend.swordLevel);
    }
    loadInventory() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield API_1.API.loadInventory((_a = this.player) === null || _a === void 0 ? void 0 : _a.getPlayerName());
            this.items[0].amount = data.B1_amount;
            this.items[1].amount = data.B2_amount;
            this.items[2].amount = data.B3_amount;
            this.items[3].amount = data.pickaxeLevel;
            this.items[4].amount = data.swordLevel;
            switch (data.swordLevel) {
                case 1:
                    this.items[4].item.setImagePath(IronSwordImagePath);
                    break;
                case 2:
                    this.items[4].item.setImagePath(SilverSwordImagePath);
                    break;
                case 3:
                    this.items[4].item.setImagePath(GoldSwordImagePath);
                    break;
            }
            this.items[5].amount = data.shovelLevel;
            (_b = this.player) === null || _b === void 0 ? void 0 : _b.loadEquipmentLevels(this.items[3].amount, this.items[4].amount, this.items[5].amount);
        });
    }
    open(inventoryShopElement) {
        if (!inventoryShopElement)
            return;
        inventoryShopElement.innerHTML = "";
        const cardContainer = document.querySelector(".shop-inventory");
        cardContainer.classList.add("p-3");
        let index = 0;
        for (const { item, amount } of this.items) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card", "float-start", "me-3", "mb-3", "p-3", "border", "border-3", "border-black", "rounded-0", "shadow", "position-relative");
            cardElement.style.width = "46%";
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("w-100", "d-flex", "justify-content-center");
            const imageElement = document.createElement("img");
            imageElement.classList.add("inventory-item-image", "h-100");
            imageElement.src = item.getImagePath();
            imageElement.alt = "";
            imgDiv.appendChild(imageElement);
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const nameElement = document.createElement("h5");
            nameElement.classList.add("inventory-item-name", "card-text", "text-center");
            nameElement.innerText = item.getItemName();
            const ownedElement = document.createElement("h6");
            ownedElement.classList.add("inventory-item-owned", "card-title", `item-owned-qty-${index}`, "text-center");
            const itemUseButton = document.createElement("button");
            if (item instanceof ConsumableItem_1.ConsumableItem) {
                ownedElement.innerText = `Owned: ${amount}`;
                itemUseButton.textContent = "Consume";
                itemUseButton.classList.add("Consume", `consume-item-${index}`, "btn", "btn-success", "w-75", "rounded-0", "shadow", "border", "border-3", "border-black", "position-absolute", "start-50", "translate-middle-x");
                itemUseButton.style.bottom = "15px";
                // Create a function to handle the click event
                const handleItemClick = () => {
                    if (amount > 0) {
                        if (this.player) {
                            if (item instanceof Book_1.Book) {
                                // Access the button's class using the `itemUseButton` reference
                                const currIndex = parseInt(itemUseButton.className.split(" ")[1].split("-")[2]);
                                if (this.items[currIndex].amount > 0) {
                                    const energyRestored = item.useItem();
                                    this.player.addEnergy(energyRestored);
                                    this.items[currIndex].amount -= 1;
                                    const currentQty = document.querySelector(`.item-owned-qty-${currIndex}`);
                                    if (currentQty) {
                                        currentQty.innerHTML = `Owned: ${this.items[currIndex].amount}`;
                                    }
                                    this.saveInventory();
                                }
                            }
                        }
                    }
                };
                itemUseButton.addEventListener("click", handleItemClick);
            }
            else if (item instanceof EquippableItem_1.EquippableItem) {
                ownedElement.innerText = `Level: ${amount}`;
                itemUseButton.textContent = ItemRelated_enum_1.EquipmentStatus.CAN_BE_EQUIP;
                itemUseButton.classList.add("Equip", "btn", "btn-primary", "w-75", "rounded-0", "shadow", "border", "border-3", "border-black", "position-absolute", "start-50", "translate-middle-x");
                itemUseButton.style.bottom = "15px";
                itemUseButton.addEventListener("click", () => {
                    if (this.player) {
                        this.itemEquipState.forEach((e) => {
                            e = ItemRelated_enum_1.EquipState.UNEQUIPPED;
                        });
                        const allItemsOwned = document.querySelectorAll(".Equip");
                        allItemsOwned.forEach((e) => {
                            e.innerText = ItemRelated_enum_1.EquipmentStatus.CAN_BE_EQUIP;
                        });
                        this.saveInventory();
                        this.player.equip(item);
                        this.itemEquipState[index] = ItemRelated_enum_1.EquipState.EQUIPPED;
                        itemUseButton.textContent = ItemRelated_enum_1.EquipmentStatus.EQUIPPED;
                    }
                });
            }
            cardBody.appendChild(nameElement);
            cardBody.appendChild(ownedElement);
            cardBody.appendChild(itemUseButton);
            cardElement.appendChild(imgDiv);
            cardElement.appendChild(cardBody);
            cardContainer.appendChild(cardElement);
            index++;
        }
    }
}
exports.Inventory = Inventory;

},{"../../config/env.json":65,"../API":2,"./Abstract/Book":46,"./Abstract/ConsumableItem":47,"./Abstract/EquippableItem":48,"./BookOfEnergyT1":49,"./BookOfEnergyT2":50,"./BookOfEnergyT3":51,"./Enum/ItemRelated.enum":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickaxe = void 0;
const EquippableItem_1 = require("./Abstract/EquippableItem");
const { PickaxeName, PickaxeDesc, PickaxePrice, IronPickaxeImagePath, } = require("../../../dist/config/env.json");
class Pickaxe extends EquippableItem_1.EquippableItem {
    constructor() {
        super(IronPickaxeImagePath, PickaxeName, PickaxeDesc, PickaxePrice);
    }
}
exports.Pickaxe = Pickaxe;

},{"../../../dist/config/env.json":1,"./Abstract/EquippableItem":48}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
const EquippableItem_1 = require("./Abstract/EquippableItem");
const { ShovelName, ShovelDesc, ShovelPrice, IronShovelImagePath } = require('../../../dist/config/env.json');
class Shovel extends EquippableItem_1.EquippableItem {
    constructor() {
        super(IronShovelImagePath, ShovelName, ShovelDesc, ShovelPrice);
    }
}
exports.Shovel = Shovel;

},{"../../../dist/config/env.json":1,"./Abstract/EquippableItem":48}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sword = void 0;
const EquippableItem_1 = require("./Abstract/EquippableItem");
const { SwordName, SwordDesc, SwordPrice, IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../../../dist/config/env.json');
class Sword extends EquippableItem_1.EquippableItem {
    constructor() {
        super(IronSwordImagePath, SwordName, SwordDesc, SwordPrice);
    }
}
exports.Sword = Sword;

},{"../../../dist/config/env.json":1,"./Abstract/EquippableItem":48}],58:[function(require,module,exports){
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
exports.Leaderboard = void 0;
const API_1 = require("./API");
const authentication_1 = require("../utils/authentication");
class Leaderboard {
    constructor() {
        this.listUser = [];
        this.player = null;
        this.questionView = null;
        this.gameManager = null;
        this.self = null;
    }
    setPlayer(player) {
        this.player = player;
    }
    setGameManager(gameManager) {
        this.gameManager = gameManager;
    }
    setQuestionView(questionView) {
        this.questionView = questionView;
    }
    DynamiteAttack(username) {
        return __awaiter(this, void 0, void 0, function* () {
            API_1.API.Dynamite;
        });
    }
    open(leaderboardElement) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.self = leaderboardElement;
            const { GoldImagePath, EnergyImagePath, DynamiteImagePath, CannonBallImagePath } = require('../config/env.json');
            const allUserString = JSON.parse(yield API_1.API.getAllUser());
            this.listUser = [];
            for (let i = 0; i < allUserString.length; i++) {
                if (((_a = this.player) === null || _a === void 0 ? void 0 : _a.getPlayerName()) != allUserString[i].username && allUserString[i].total_gold >= 150) {
                    const currentUser = allUserString[i];
                    this.listUser.push(currentUser);
                }
            }
            let showUser = "";
            let leadNumber = 1;
            for (let i = 0; i < this.listUser.length; i++) {
                let currentUser = this.listUser[i];
                // if(currentUser.username != )
                if (currentUser.username != ((_b = this.player) === null || _b === void 0 ? void 0 : _b.getPlayerName()) && currentUser.total_gold > 0) {
                    showUser +=
                        `<div class='d-flex justify-content-between align-items-center mb-3'>
          <div class="d-flex align-items-center">
            <p class='mb-0 me-3' style='font-size: medium;'>${leadNumber}. ${currentUser.username}</p>
            <div class='d-flex align-items-center me-3' >
              <img src='${GoldImagePath}' class='me-1' style='height: 30px' draggable="false">
              <p class='mb-0' style='font-size: medium;'>${currentUser.total_gold}</p>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class='dyn-atk dyn-attack-${i} btn btn-danger d-flex align-items-center me-3 rounded-0 border border-black border-3'>
              <img src='${DynamiteImagePath}' class='me-1' style='height: 30px'>
              <p class='m-0' style='font-size: small;'>Dynamite Attack</p>
            </div>
            <div class='cnn-atk cnn-attack-${i} btn btn-secondary d-flex align-items-center rounded-0 border border-black border-3'>
              <img src='${CannonBallImagePath}' class='me-1' style='height: 30px'>
              <p class='m-0' style='font-size: small;'>Cannon Bomb Attack</p>
            </div>
          </div>
        </div>`;
                    leadNumber++;
                }
                ;
            }
            if (leaderboardElement) {
                leaderboardElement.innerHTML = showUser;
            }
            const allDynButton = document.querySelectorAll(".dyn-atk");
            const allCnnButton = document.querySelectorAll(".cnn-atk");
            for (let i = 0; i < allCnnButton.length; i++) {
                allCnnButton[i].addEventListener("click", () => {
                    var _a, _b;
                    let closeButton = document.querySelector(".close-leaderboard-button");
                    if (this.player.getGold() >= 150 && this.player.getEnergy() >= 20) {
                        this.player.useGold(150);
                        this.player.useEnergy(20);
                        console.error(this.listUser);
                        alert(this.listUser[i].username);
                        API_1.API.CannonBall(this.listUser[i].username, this.player.getPlayerName());
                        const token = (0, authentication_1.getAuthToken)();
                        if (token) {
                            API_1.API.updateGold(token, -150);
                        }
                        if (closeButton) {
                            // alert("close button click")
                            (_a = this.gameManager) === null || _a === void 0 ? void 0 : _a.logActivity("You have attacked " + this.listUser[i].username + " with a Cannonball! they lost 300 gold coins!");
                            closeButton.click();
                        }
                    }
                    else {
                        (_b = this.gameManager) === null || _b === void 0 ? void 0 : _b.logActivity("You don't have enough resources to attack this player! (Gold needed: 150, Energy needed: 20)");
                        closeButton.click();
                    }
                });
                allDynButton[i].addEventListener("click", () => {
                    var _a, _b;
                    let closeButton = document.querySelector(".close-leaderboard-button");
                    if (this.player.getGold() >= 75 && this.player.getEnergy() >= 10) {
                        this.player.useGold(75);
                        this.player.useEnergy(10);
                        API_1.API.Dynamite(this.listUser[i].username, this.player.getPlayerName());
                        const token = (0, authentication_1.getAuthToken)();
                        if (token) {
                            API_1.API.updateGold(token, -75);
                        }
                        if (closeButton) {
                            (_a = this.gameManager) === null || _a === void 0 ? void 0 : _a.logActivity("You have attacked " + this.listUser[i].username + " with a Dynamite! they lost 150 gold coins!");
                            closeButton.click();
                        }
                    }
                    else {
                        (_b = this.gameManager) === null || _b === void 0 ? void 0 : _b.logActivity("You don't have enough resources to attack this player! (Gold needed: 75, Energy needed: 10)");
                        closeButton.click();
                    }
                });
            }
        });
    }
}
exports.Leaderboard = Leaderboard;

},{"../config/env.json":65,"../utils/authentication":68,"./API":2}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardView = void 0;
class LeaderboardView {
    constructor(leaderboardButton, leaderboard, leaderboardElement) {
        this.leaderboard = leaderboard;
        this.leaderboardElement = leaderboardElement;
        this.leaderboardButton = leaderboardButton;
        this.initLeaderboard();
    }
    setGameManager(gameManager) {
        var _a;
        (_a = this.leaderboard) === null || _a === void 0 ? void 0 : _a.setGameManager(gameManager);
    }
    setQuestionView(questionView) {
        var _a;
        (_a = this.leaderboard) === null || _a === void 0 ? void 0 : _a.setQuestionView(questionView);
    }
    setPlayer(player) {
        if (this.leaderboard) {
            this.leaderboard.setPlayer(player);
        }
    }
    initLeaderboard() {
        if (this.leaderboardButton) {
            this.leaderboardButton.addEventListener("click", () => {
                this.openLeaderboard();
            });
        }
    }
    openLeaderboard() {
        if (this.leaderboard) {
            this.leaderboard.open(this.leaderboardElement);
        }
    }
    setLeaderboardElement(leaderboardElement) {
        this.leaderboardElement = leaderboardElement;
    }
    getLeaderboardElement() {
        return this.leaderboardElement;
    }
}
exports.LeaderboardView = LeaderboardView;

},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const API_1 = require("./API");
const Animation_1 = require("./GameObjects/Animation");
const ChainedAnimation_1 = require("./GameObjects/ChainedAnimation");
const PlayerUnit_1 = require("./GameObjects/PlayerUnit");
const Pickaxe_1 = require("./Items/Pickaxe");
const Shovel_1 = require("./Items/Shovel");
const Sword_1 = require("./Items/Sword");
const { IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../config/env.json');
const { IronShovelImagePath, SilverShovelImagePath, GoldShovelImagePath } = require('../config/env.json');
const { IronPickaxeImagePath, SilverPickaxeImagePath, GoldPickaxeImagePath } = require('../config/env.json');
class Player {
    //this tells which item the player is holding
    //0 = not holding anything
    //1 = sword
    //2 = pickaxe
    //3 = shovel
    constructor(x, y, gold, energy) {
        this.gold = 500;
        this.energy = 0;
        this.units = [];
        this.curEquip = 0;
        this.sword = new Sword_1.Sword();
        this.shovel = new Shovel_1.Shovel();
        this.pickaxe = new Pickaxe_1.Pickaxe();
        this.inventory = null;
        this.gameManager = null;
        this.currentEquipped = null;
        this.playerName = API_1.API.getPlayerName();
        const p1 = new PlayerUnit_1.PlayerUnit({ x: x, y: y });
        p1.addAnimation(new ChainedAnimation_1.ChainedAnimation(p1, "idle", Animation_1.Animation.assets["player_idle"], { x: 32, y: 32 }, 2, -1, 1));
        p1.createAnimation("walk_up", Animation_1.Animation.assets["player_walk_up"], { x: 32, y: 32 }, 4, "", 4);
        p1.createAnimation("walk_down", Animation_1.Animation.assets["player_walk_down"], { x: 32, y: 32 }, 4, "", 4);
        p1.createAnimation("walk_left", Animation_1.Animation.assets["player_walk_left"], { x: 32, y: 32 }, 4, "", 4);
        p1.createAnimation("walk_right", Animation_1.Animation.assets["player_walk_right"], { x: 32, y: 32 }, 4, "", 4);
        p1.createAnimation("mine_up", Animation_1.Animation.assets["mine_up"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("mine_down", Animation_1.Animation.assets["mine_down"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("mine_left", Animation_1.Animation.assets["mine_left"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("mine_right", Animation_1.Animation.assets["mine_right"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("dig", Animation_1.Animation.assets["dig"], { x: 32, y: 32 }, 8, "", 15);
        p1.createAnimation("break_up", Animation_1.Animation.assets["break_up"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("break_down", Animation_1.Animation.assets["break_down"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("break_left", Animation_1.Animation.assets["break_left"], { x: 32, y: 32 }, 5, "", 10);
        p1.createAnimation("break_right", Animation_1.Animation.assets["break_right"], { x: 32, y: 32 }, 5, "", 10);
        p1.setMoveSpeed(2);
        this.units.push(p1);
    }
    setPlayerName(playerName) {
        this.playerName = playerName;
    }
    getPlayerName() {
        return this.playerName;
    }
    getGold() {
        return this.gold;
    }
    getEnergy() {
        return this.energy;
    }
    setEnergy(x) {
        this.energy = x;
    }
    addEnergy(x) {
        this.energy += x;
    }
    useEnergy(x) {
        this.energy -= x;
    }
    addGold(x) {
        this.gold += x;
    }
    useGold(x) {
        this.gold -= x;
    }
    action(price) {
        return this.energy >= price;
    }
    getCoordinate() {
        return this.units[0].getCoordinate();
    }
    getCurrentEquipment() {
        return this.currentEquipped;
    }
    equip(item) {
        this.currentEquipped = item;
        if (this.gameManager) {
            if (item instanceof Pickaxe_1.Pickaxe) {
                this.gameManager.logActivity("Equipped Pickaxe");
            }
            else if (item instanceof Sword_1.Sword) {
                this.gameManager.logActivity("Equipped Sword");
            }
            else if (item instanceof Shovel_1.Shovel) {
                this.gameManager.logActivity("Equipped Shovel");
            }
            else {
                this.gameManager.logActivity("Unequipped Tools");
            }
        }
    }
    setGold(gold) {
        this.gold = gold;
    }
    setGameManager(gameManager) {
        this.gameManager = gameManager;
    }
    getEquipmentLevels() {
        const swordLevel = this.sword.getLevel();
        const pickaxeLevel = this.pickaxe.getLevel();
        const shovelLevel = this.shovel.getLevel();
        return { sword: swordLevel, pickaxe: pickaxeLevel, shovel: shovelLevel };
    }
    getAllPlayerEquipment() {
        return { sword: this.sword, pickaxe: this.pickaxe, shovel: this.shovel };
    }
    //testing
    setEquipmentLevels(x) {
        this.sword.setLevel(x);
        this.shovel.setLevel(x);
        this.pickaxe.setLevel(x);
    }
    loadEquipmentLevels(pickaxeLevel, shovelLevel, swordLevel) {
        this.sword.setLevel(swordLevel);
        switch (swordLevel) {
            case 1:
                this.sword.setImagePath(IronSwordImagePath);
                break;
            case 2:
                this.sword.setImagePath(SilverSwordImagePath);
                break;
            case 3:
                this.sword.setImagePath(GoldSwordImagePath);
                break;
        }
        this.shovel.setLevel(shovelLevel);
        switch (shovelLevel) {
            case 1:
                this.shovel.setImagePath(IronShovelImagePath);
                break;
            case 2:
                this.shovel.setImagePath(SilverShovelImagePath);
                break;
            case 3:
                this.shovel.setImagePath(GoldShovelImagePath);
                break;
        }
        this.pickaxe.setLevel(pickaxeLevel);
        switch (pickaxeLevel) {
            case 1:
                this.pickaxe.setImagePath(IronPickaxeImagePath);
                break;
            case 2:
                this.pickaxe.setImagePath(SilverPickaxeImagePath);
                break;
            case 3:
                this.pickaxe.setImagePath(GoldPickaxeImagePath);
                break;
        }
    }
    setSword(sword) {
        this.sword = sword;
    }
    setPickaxe(pickaxe) {
        this.pickaxe = pickaxe;
    }
    setShovel(shovel) {
        this.shovel = shovel;
    }
    upgradeSword() {
        this.sword.upgrade();
    }
    upgradePickaxe() {
        this.pickaxe.upgrade();
    }
    upgradeShovel() {
        this.shovel.upgrade();
    }
    setInventory(inventory) {
        this.inventory = inventory;
        this.inventory.addItemInit(this);
        this.inventory.setPlayer(this);
    }
}
exports.Player = Player;

},{"../config/env.json":65,"./API":2,"./GameObjects/Animation":20,"./GameObjects/ChainedAnimation":22,"./GameObjects/PlayerUnit":34,"./Items/Pickaxe":55,"./Items/Shovel":56,"./Items/Sword":57}],61:[function(require,module,exports){
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
    constructor(QuestionArea, UpdateButton, api, a, b, c, d, energyDiv, goldDiv, questionIDDiv) {
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
        this.questionIDDiv = null;
        this.setQuestionArea(QuestionArea);
        this.setUpdateBtn(UpdateButton);
        this.setAPI(api);
        this.setButtons(a, b, c, d);
        this.setEnergyDiv(energyDiv);
        this.setGoldDiv(goldDiv);
        this.setQuestionIDDiv(questionIDDiv);
    }
    setQuestionIDDiv(questionIDDiv) {
        this.questionIDDiv = questionIDDiv;
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
                return false;
            }
            else {
                (_a = this.player) === null || _a === void 0 ? void 0 : _a.addEnergy(10);
                this.refreshStats();
                yield this.UpdateQuestion();
                return true;
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
            console.error(reqAPI);
            let q = { id: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.id, text: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.text, a: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.a, b: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.b, c: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.c, d: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.d, answer: reqAPI === null || reqAPI === void 0 ? void 0 : reqAPI.answer };
            this.curQuestion = q;
            if (this.QuestionArea != null && this.curQuestion != null && this.AButton && this.BButton && this.CButton && this.DButton) {
                this.questionIDDiv.innerHTML = `Question ID: ${q.id}`;
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

},{}],62:[function(require,module,exports){
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
exports.Shop = void 0;
const BookOfEnergyT1_1 = require("./Items/BookOfEnergyT1");
const BookOfEnergyT2_1 = require("./Items/BookOfEnergyT2");
const BookOfEnergyT3_1 = require("./Items/BookOfEnergyT3");
const Sword_1 = require("./Items/Sword");
const Shovel_1 = require("./Items/Shovel");
const Pickaxe_1 = require("./Items/Pickaxe");
const API_1 = require("./API");
const authentication_1 = require("../utils/authentication");
const EquippableItem_1 = require("./Items/Abstract/EquippableItem");
const { IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../config/env.json');
const { IronShovelImagePath, SilverShovelImagePath, GoldShovelImagePath } = require('../config/env.json');
const { IronPickaxeImagePath, SilverPickaxeImagePath, GoldPickaxeImagePath } = require('../config/env.json');
const { GoldImagePath } = require('../config/env.json');
class Shop {
    constructor() {
        this.player = null;
        this.inventory = null;
        this.game = null;
        this.loadShop = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield API_1.API.loadInventory((_a = this.player) === null || _a === void 0 ? void 0 : _a.getPlayerName());
            const tempPickaxe = this.item[3];
            const tempSword = this.item[4];
            const tempShovel = this.item[5];
            tempPickaxe.setLevel(data.pickaxeLevel);
            tempSword.setLevel(data.swordLevel);
            tempShovel.setLevel(data.shovelLevel);
            this.item[3] = tempPickaxe;
            this.item[4] = tempSword;
            this.item[5] = tempShovel;
        });
        this.item = [
            new BookOfEnergyT1_1.BookOfEnergyTier1(),
            new BookOfEnergyT2_1.BookOfEnergyTier2(),
            new BookOfEnergyT3_1.BookOfEnergyTier3(),
        ];
    }
    upgradeSword(currentItem, x) {
        switch (x) {
            case 2:
                currentItem.setImagePath(SilverSwordImagePath);
                break;
            case 3:
                currentItem.setImagePath(GoldSwordImagePath);
                break;
            default:
                currentItem.setImagePath(IronSwordImagePath);
                break;
        }
    }
    upgradeShovel(currentItem, x) {
        switch (x) {
            case 2:
                currentItem.setImagePath(SilverShovelImagePath);
                break;
            case 3:
                currentItem.setImagePath(GoldShovelImagePath);
                break;
            default:
                currentItem.setImagePath(IronShovelImagePath);
                break;
        }
    }
    upgradePickaxe(currentItem, x) {
        switch (x) {
            case 2:
                currentItem.setImagePath(SilverPickaxeImagePath);
                break;
            case 3:
                currentItem.setImagePath(GoldPickaxeImagePath);
                break;
            default:
                currentItem.setImagePath(IronPickaxeImagePath);
                break;
        }
    }
    setGame(game) {
        this.game = game;
    }
    setPlayer(player) {
        var _a;
        this.player = player;
        const playerEquipments = (_a = this.player) === null || _a === void 0 ? void 0 : _a.getAllPlayerEquipment();
        const pickaxe = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.pickaxe;
        const sword = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.sword;
        const shovel = playerEquipments === null || playerEquipments === void 0 ? void 0 : playerEquipments.shovel;
        if (pickaxe) {
            this.item.push(pickaxe);
        }
        if (sword) {
            this.item.push(sword);
        }
        if (shovel) {
            this.item.push(shovel);
        }
    }
    setInventory(inventory) {
        this.inventory = inventory;
    }
    totalPrice(itemIndex, qty) {
        const currentItem = this.item[itemIndex];
        const currentPrice = currentItem.getItemPrice();
        const totalPrice = currentPrice * qty;
        return totalPrice;
    }
    open(shopHTML) {
        if (shopHTML) {
            shopHTML.innerHTML = "";
            // console.log(shopHTML)
            for (let i = 0; i < this.item.length; i++) {
                let tempItem = this.item[i];
                let isBuyable = false;
                if (tempItem instanceof EquippableItem_1.EquippableItem) {
                    let temp = tempItem;
                    if (temp.getLevel() < 3) {
                        isBuyable = true;
                    }
                }
                else {
                    isBuyable = true;
                }
                if (isBuyable) {
                    // Card shop
                    const shopTemp = document.createElement("div");
                    shopTemp.className =
                        "card-shop mb-3 w-full p-3 flex justify-content-between bg-white border border-black border-3 shadow";
                    // Image shop
                    const shopImage = document.createElement("img");
                    shopImage.className = "shop-img h-100";
                    shopImage.src = this.item[i].getImagePath();
                    // Description shop
                    const desc = document.createElement("div");
                    desc.className = "desc h-100 position-relative";
                    desc.style.width = "60%";
                    const itemName = document.createElement("div");
                    itemName.className = " fs-5 w-100";
                    itemName.innerHTML = this.item[i].getItemName();
                    const mainDesc = document.createElement("div");
                    mainDesc.className = " w-100 mb-3";
                    mainDesc.innerHTML = this.item[i].getItemDesc();
                    const addBox = document.createElement("div");
                    addBox.className = "d-flex w-100";
                    const colDiv1 = document.createElement("div");
                    colDiv1.classList.add("col-sm-6", "d-flex", "align-items-center");
                    if (!(this.item[i] instanceof EquippableItem_1.EquippableItem)) {
                        const minusBtn = document.createElement("div");
                        minusBtn.classList.add("btn", "btn-danger", "p-0", "rounded-0", "border", "border-3", "border-black");
                        minusBtn.style.width = "45px";
                        minusBtn.style.height = "30px";
                        minusBtn.textContent = "-";
                        minusBtn.addEventListener("click", () => {
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
                        const itemQtyDiv = document.createElement("input");
                        itemQtyDiv.style.width = "90px";
                        itemQtyDiv.style.height = "30px";
                        itemQtyDiv.type = "number";
                        itemQtyDiv.classList.add("item-qty", `item-${i}`, "border", "border-3", "border-start-0", "border-end-0", "border-black");
                        itemQtyDiv.style.textAlign = "center";
                        itemQtyDiv.value = "1";
                        itemQtyDiv.min = "1";
                        itemQtyDiv.addEventListener("change", () => {
                            const item = document.querySelector(`.item-${i}`);
                            const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`);
                            const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`);
                            if (item) {
                                const currentQty = parseInt(item.value) || 0;
                                if (currentQty < 1) {
                                    item.innerHTML = "1";
                                }
                                const totalPrice = currentQty * this.item[i].getItemPrice();
                                totalPriceDiv.textContent = `Gold ${totalPrice}`;
                            }
                            else {
                                console.error(`Element with class .item-${i} not found.`);
                            }
                        });
                        const plusBtn = document.createElement("div");
                        plusBtn.classList.add("btn", "btn-success", "p-0", "rounded-0", "border", "border-3", "border-black");
                        plusBtn.style.width = "45px";
                        plusBtn.style.height = "30px";
                        plusBtn.textContent = "+";
                        plusBtn.addEventListener("click", () => {
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
                        colDiv1.appendChild(minusBtn);
                        colDiv1.appendChild(itemQtyDiv);
                        colDiv1.appendChild(plusBtn);
                        const colDiv2 = document.createElement("div");
                        colDiv2.classList.add("col-sm-6", `total-price-container-item-${i}`, "d-flex", "align-items-center", "position-relative");
                        const goldIcon = document.createElement("img");
                        goldIcon.src = GoldImagePath;
                        goldIcon.className = "ms-2 me-2";
                        goldIcon.style.width = "30px";
                        const totalPriceDiv = document.createElement("div");
                        totalPriceDiv.classList.add("total-price", `total-price-item-${i}`);
                        totalPriceDiv.textContent = `Gold ${parseInt(itemQtyDiv.value) * this.item[i].getItemPrice()}`;
                        colDiv2.appendChild(goldIcon);
                        colDiv2.appendChild(totalPriceDiv);
                        addBox.appendChild(colDiv1);
                        addBox.appendChild(colDiv2);
                    }
                    else {
                        let equipment = this.item[i];
                        if (equipment.getLevel() < 3) {
                            const colDiv2 = document.createElement("div");
                            colDiv2.classList.add("col-sm-6", `total-price-container-item-${i}`, "position-relative");
                            const totalPriceDiv = document.createElement("div");
                            totalPriceDiv.classList.add("total-price", `total-price-item-${i}`);
                            totalPriceDiv.textContent = `Gold ${this.item[i].getItemPrice()}`;
                            colDiv2.appendChild(totalPriceDiv);
                            addBox.appendChild(colDiv1);
                            addBox.appendChild(colDiv2);
                        }
                    }
                    const buyButton = document.createElement("button");
                    buyButton.className =
                        "content buy-button btn btn-primary w-100 mt-2 rounded-0 shadow border border-3 border-black position-absolute bottom-0 start-50 translate-middle-x";
                    if (this.item[i] instanceof EquippableItem_1.EquippableItem) {
                        buyButton.innerHTML = "Upgrade";
                        // alert("EquippableItem");
                        if (this.item[i].getLevel() < 3) {
                            // alert("getLevel() < 3");
                            buyButton.onclick = () => {
                                var _a, _b, _c, _d, _e, _f, _g;
                                const currentItem = this.item[i];
                                const totalPriceDiv = document.querySelector(`.total-price-item-${i}`);
                                // const itemAmount: HTMLInputElement | null =
                                //   document.querySelector(`.item-${i}`);
                                const itemAmount = document.createElement("input");
                                itemAmount.value = "1";
                                if (itemAmount) {
                                    if (totalPriceDiv) {
                                        if (this.player) {
                                            const goldDiv = document.querySelector("#goldAmount");
                                            let playerGold = 0;
                                            if (goldDiv) {
                                                playerGold = parseInt(goldDiv.textContent.split(" ")[1]);
                                            }
                                            const priceContent = totalPriceDiv.textContent;
                                            const price = parseInt(priceContent.split(" ")[1]);
                                            if (playerGold >= price) {
                                                const currentQty = parseInt(itemAmount.value) || 0;
                                                if (currentQty > 0) {
                                                    //   this.player.useGold(price);
                                                    const token = (0, authentication_1.getAuthToken)();
                                                    if (token) {
                                                        API_1.API.updateGold(token, -price);
                                                    }
                                                    if (currentItem instanceof EquippableItem_1.EquippableItem) {
                                                        // alert(playerGold + " " + price);
                                                        //basically what we need to do is to first check if the item is an equippable
                                                        //then we basically do nothing to said object and just go to the gameManager
                                                        //and from the gamemanager we do a force upgrade.
                                                        //TL;DR: this is fucking stupid but my hands and mind have forced me. Forgive me my son -Frans
                                                        if (currentItem instanceof Sword_1.Sword) {
                                                            (_a = this.game) === null || _a === void 0 ? void 0 : _a.upgradeSword();
                                                            this.upgradeSword(currentItem, (currentItem.getLevel() + 1));
                                                        }
                                                        else if (currentItem instanceof Pickaxe_1.Pickaxe) {
                                                            (_b = this.game) === null || _b === void 0 ? void 0 : _b.upgradePickaxe();
                                                            this.upgradePickaxe(currentItem, (currentItem.getLevel() + 1));
                                                        }
                                                        else if (currentItem instanceof Shovel_1.Shovel) {
                                                            (_c = this.game) === null || _c === void 0 ? void 0 : _c.upgradeShovel();
                                                            this.upgradeShovel(currentItem, (currentItem.getLevel() + 1));
                                                        }
                                                        (_d = this.inventory) === null || _d === void 0 ? void 0 : _d.addItemOwned(i, currentQty);
                                                        (_e = this.inventory) === null || _e === void 0 ? void 0 : _e.saveInventory();
                                                        currentItem.upgrade();
                                                    }
                                                    else {
                                                        (_f = this.inventory) === null || _f === void 0 ? void 0 : _f.addItemOwned(i, currentQty);
                                                        (_g = this.inventory) === null || _g === void 0 ? void 0 : _g.saveInventory();
                                                    }
                                                    this.open(shopHTML);
                                                }
                                                else {
                                                    itemAmount.value = "1";
                                                    totalPriceDiv.textContent = `Gold ${1 * this.item[i].getItemPrice()}`;
                                                }
                                            }
                                            else {
                                                alert("Not enough gold!");
                                            }
                                        }
                                    }
                                }
                            };
                        }
                    }
                    else {
                        buyButton.innerHTML = "Buy";
                        buyButton.onclick = () => {
                            var _a, _b, _c;
                            const currentItem = this.item[i];
                            const totalPriceDiv = document.querySelector(`.total-price-item-${i}`);
                            const itemAmount = document.querySelector(`.item-${i}`);
                            if (itemAmount) {
                                if (totalPriceDiv) {
                                    if (this.player) {
                                        const goldDiv = document.querySelector("#goldAmount");
                                        let playerGold = 0;
                                        if (goldDiv) {
                                            playerGold = parseInt(goldDiv.textContent.split(" ")[1]);
                                        }
                                        const priceContent = totalPriceDiv.textContent;
                                        const price = parseInt(priceContent.split(" ")[1]);
                                        if (playerGold >= price) {
                                            const currentQty = parseInt(itemAmount.value) || 0;
                                            if (currentQty > 0) {
                                                //   this.player.useGold(price);
                                                const token = (0, authentication_1.getAuthToken)();
                                                if (token) {
                                                    API_1.API.updateGold(token, -price);
                                                }
                                                alert(playerGold + " " + price);
                                                (_a = this.inventory) === null || _a === void 0 ? void 0 : _a.addItemOwned(i, currentQty);
                                                (_b = this.inventory) === null || _b === void 0 ? void 0 : _b.saveInventory();
                                            }
                                            else {
                                                itemAmount.value = "1";
                                                totalPriceDiv.textContent = `Gold ${1 * this.item[i].getItemPrice()}`;
                                                (_c = this.inventory) === null || _c === void 0 ? void 0 : _c.saveInventory();
                                            }
                                        }
                                        else {
                                            alert("Not enough gold!");
                                        }
                                    }
                                }
                            }
                        };
                    }
                    desc.appendChild(itemName);
                    desc.appendChild(mainDesc);
                    desc.appendChild(addBox);
                    desc.appendChild(buyButton);
                    shopTemp.appendChild(shopImage);
                    shopTemp.appendChild(desc);
                    shopHTML.appendChild(shopTemp);
                }
            }
        }
    }
}
exports.Shop = Shop;

},{"../config/env.json":65,"../utils/authentication":68,"./API":2,"./Items/Abstract/EquippableItem":48,"./Items/BookOfEnergyT1":49,"./Items/BookOfEnergyT2":50,"./Items/BookOfEnergyT3":51,"./Items/Pickaxe":55,"./Items/Shovel":56,"./Items/Sword":57}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopView = void 0;
class ShopView {
    constructor(shopButton, shop, inventoryShopElement) {
        this.shop = shop;
        this.inventoryShopElement = inventoryShopElement;
        this.shopButton = shopButton;
        this.initShopButton();
    }
    setPlayer(player) {
        var _a;
        (_a = this.shop) === null || _a === void 0 ? void 0 : _a.setPlayer(player);
    }
    setInventory(inventory) {
        var _a;
        (_a = this.shop) === null || _a === void 0 ? void 0 : _a.setInventory(inventory);
    }
    initShopButton() {
        if (this.shopButton) {
            this.shopButton.addEventListener('click', () => {
                this.openShop();
            });
        }
    }
    openShop() {
        if (this.shop) {
            this.shop.open(this.inventoryShopElement);
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

},{}],64:[function(require,module,exports){
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
    getTerminal() {
        if (this.terminal)
            return this.terminal;
        else
            return null;
    }
    getTextArea() {
        if (this.textArea)
            return this.textArea;
        else
            return null;
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

},{}],65:[function(require,module,exports){
module.exports={
    "BookOfEnergyTier1Name": "Book Of Energy Tier 1",
    "BookOfEnergyTier1Desc": "Basic energy guide, +<number> energy.",
    "BookOfEnergyTier1Price": 100,
    "BookOfEnergyTier1ImagePath": "dist/Assets/Prototype/buku1.png",
    "BookOfEnergyTier1EnergyRestored": 10,
    "BookOfEnergyTier2Name": "Book Of Energy Tier 2",
    "BookOfEnergyTier2Desc": "Advanced energy guide, +<number> energy.",
    "BookOfEnergyTier2Price": 200,
    "BookOfEnergyTier2ImagePath": "dist/Assets/Prototype/buku2.png",
    "BookOfEnergyTier2EnergyRestored": 20,
    "BookOfEnergyTier3Name": "Book Of Energy Tier 3",
    "BookOfEnergyTier3Desc": "Mastery energy guide, +<number> energy.",
    "BookOfEnergyTier3Price": 300,
    "BookOfEnergyTier3ImagePath": "dist/Assets/Prototype/buku3.png",
    "BookOfEnergyTier3EnergyRestored": 30,

    "IronSwordName": "Iron Sword",
    "IronSwordDesc": "A Sword made of Iron, used to break chests and slay sea monsters.",
    "IronSwordPrice": 200,
    "IronSwordImagePath": "dist/assets/final/ironsword.png",

    "IronShovelName": "Iron Shovel",
    "IronShovelDesc": "A Shovel made of Iron, used to dig.",
    "IronShovelPrice": 200,
    "IronShovelImagePath": "dist/assets/final/ironshovel.png",

    "IronPickaxeName": "Iron Pickaxe",
    "IronPickaxeDesc": "A Pickaxe made of Iron, used to mine.",
    "IronPickaxePrice": 200,
    "IronPickaxeImagePath": "dist/assets/final/ironpickaxe.png",

    "GoldSwordName": "Gold Sword",
    "GoldSwordDesc": "A Legendary Sword made of Gold, used to break chests and slay sea monsters.",
    "GoldSwordPrice": 500,
    "GoldSwordImagePath": "dist/assets/final/goldsword.png",

    "GoldShovelName": "Gold Shovel",
    "GoldShovelDesc": "A Legendary Shovel made of Gold, used to dig.",
    "GoldShovelPrice": 500,
    "GoldShovelImagePath": "dist/assets/final/goldshovel.png",

    "GoldPickaxeName": "Gold Pickaxe",
    "GoldPickaxeDesc": "A Legendary Pickaxe made of Gold, used to mine.",
    "GoldPickaxePrice": 500,
    "GoldPickaxeImagePath": "dist/assets/final/goldpickaxe.png",

    "SilverSwordName": "Silver Sword",
    "SilverSwordDesc": "A Durable Sword made of Silver, used to break chests and slay sea monsters.",
    "SilverSwordPrice": 350,
    "SilverSwordImagePath": "dist/assets/final/silversword.png",

    "SilverShovelName": "Silver Shovel",
    "SilverShovelDesc": "A Durable Shovel made of Silver, used to dig.",
    "SilverShovelPrice": 350,
    "SilverShovelImagePath": "dist/assets/final/silvershovel.png",

    "SilverPickaxeName": "Silver Pickaxe",
    "SilverPickaxeDesc": "A Durable Pickaxe made of Silver, used to mine.",
    "SilverPickaxePrice": 350,
    "SilverPickaxeImagePath": "dist/assets/final/silverpickaxe.png",

    "SwordName": "Sword Name",
    "SwordDesc": "Sword Description",
    "SwordPrice": 1000,
    "SwordImagePath": "dist/Assets/Prototype/buku3.png",
    "ShovelName": "Shovel Name",
    "ShovelDesc": "Shovel Description",
    "ShovelPrice": 150,
    "ShovelImagePath": "dist/Assets/Prototype/buku3.png",
    "PickaxeName": "Pickaxe Name",
    "PickaxeDesc": "Pickaxe Description",
    "PickaxePrice": 200,
    "PickaxeImagePath": "dist/Assets/Prototype/buku3.png",

    "GoldImagePath": "dist/assets/final/gold2.png",
    "EnergyImagePath": "dist/assets/final/energy2.png",
    "DynamiteImagePath": "dist/assets/final/dynamite.png",
    "CannonBallImagePath": "dist/assets/final/cannonball bomb.png",

    "TopImagePath": "dist/assets/final/pxl-1.jpeg",
    "BottomImagePath": "dist/assets/final/pxl-2.jpeg",
    
    "LOCAL_API_URL": "http://localhost:3000",
    "MASTER_API_URL": "http://localhost:8000"
}
},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animation_1 = require("./Classes/GameObjects/Animation");
const GroupAnimation_1 = require("./Classes/GameObjects/GroupAnimation");
function loadAsset() {
    //Tile Assets
    const grass = new Image();
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png";
    const flowergrass = new Image();
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png";
    const player_idle = new Image();
    player_idle.src = "./dist/Assets/final/hooman_down_idle.png";
    const sand_tile = new Image();
    sand_tile.src = "./dist/Assets/Prototype/sand.png";
    const gravel_tile = new Image();
    gravel_tile.src = "./dist/Assets/Prototype/gravel.png";
    const granite_tile = new Image();
    granite_tile.src = "./dist/Assets/final/granite.png";
    const cave_tile = new Image();
    cave_tile.src = "./dist/Assets/final/ground(cave).png";
    //Tile Assets (Digged Variation)
    const digged_grass = new Image();
    digged_grass.src = "./dist/Assets/final/digged_ground.png";
    const digged_flowergrass = new Image();
    digged_flowergrass.src = "./dist/Assets/final/digged_ground.png";
    const digged_sand = new Image();
    digged_sand.src = "./dist/Assets/final/digged_sand.png";
    const digged_gravel = new Image();
    digged_gravel.src = "./dist/Assets/final/digged_gravel.png";
    const digged_granite = new Image();
    digged_granite.src = "./dist/Assets/final/digged_granite.png";
    //Player Movement Assets
    const player_walk_down = new Image();
    player_walk_down.src = "./dist/Assets/final/hooman_down_walk.png";
    Animation_1.Animation.assets['player_walk_down'] = player_walk_down;
    const player_walk_up = new Image();
    player_walk_up.src = "./dist/Assets/final/hooman_up_walk.png";
    Animation_1.Animation.assets['player_walk_up'] = player_walk_up;
    const player_walk_left = new Image();
    player_walk_left.src = "./dist/Assets/final/hooman_left_walk.png";
    Animation_1.Animation.assets['player_walk_left'] = player_walk_left;
    const player_walk_right = new Image();
    player_walk_right.src = "./dist/Assets/final/hooman_right_walk.png";
    Animation_1.Animation.assets['player_walk_right'] = player_walk_right;
    //player Mining Animation Assets
    const player_mine_up = new Image();
    player_mine_up.src = './dist/Assets/final/hooman_up_mine.png';
    Animation_1.Animation.assets["mine_up"] = player_mine_up;
    const player_mine_down = new Image();
    player_mine_down.src = './dist/Assets/final/hooman_down_mine.png';
    Animation_1.Animation.assets["mine_down"] = player_mine_down;
    const player_mine_left = new Image();
    player_mine_left.src = './dist/Assets/final/hooman_left_mine.png';
    Animation_1.Animation.assets["mine_left"] = player_mine_left;
    const player_mine_right = new Image();
    player_mine_right.src = './dist/Assets/final/hooman_right_mine.png';
    Animation_1.Animation.assets["mine_right"] = player_mine_right;
    //player dig animation assets
    const player_dig = new Image();
    player_dig.src = "./dist/Assets/final/hooman_down_dig.png";
    Animation_1.Animation.assets["dig"] = player_dig;
    //player sword swing animation assets
    const break_down = new Image();
    break_down.src = "./dist/Assets/final/hooman_down_sword.png";
    Animation_1.Animation.assets["break_down"] = break_down;
    const break_up = new Image();
    break_up.src = "./dist/Assets/final/hooman_up_sword.png";
    Animation_1.Animation.assets["break_up"] = break_up;
    const break_left = new Image();
    break_left.src = "./dist/Assets/final/hooman_left_sword.png";
    Animation_1.Animation.assets["break_left"] = break_left;
    const break_right = new Image();
    break_right.src = "./dist/Assets/final/hooman_right_sword.png";
    Animation_1.Animation.assets["break_right"] = break_right;
    //Other Entities
    const obsidian = new Image();
    obsidian.src = './dist/Assets/final/obsidian.png';
    const rock = new Image();
    rock.src = './dist/Assets/final/rock.png';
    const iron_ore = new Image();
    iron_ore.src = './dist/Assets/final/iron_ore.png';
    const gold_ore = new Image();
    gold_ore.src = './dist/Assets/final/gold_ore.png';
    const silver_ore = new Image();
    silver_ore.src = './dist/Assets/final/silver_ore.png';
    const chest_normal = new Image();
    chest_normal.src = "./dist/Assets/final/chest0.png";
    const chest_medium = new Image();
    chest_medium.src = "./dist/Assets/final/chest1.png";
    const chest_large = new Image();
    chest_large.src = "./dist/Assets/final/chest2.png";
    //Player items assets
    const stone_pickaxe = new Image();
    //Tile
    Animation_1.Animation.assets['grass_tile'] = grass;
    Animation_1.Animation.assets['flowery_grass_tile'] = flowergrass;
    Animation_1.Animation.assets['player_idle'] = player_idle;
    Animation_1.Animation.assets['sand'] = sand_tile;
    //Overworld Blocks
    Animation_1.Animation.assets['rock'] = rock;
    Animation_1.Animation.assets['iron_ore'] = iron_ore;
    Animation_1.Animation.assets['gold_ore'] = gold_ore;
    Animation_1.Animation.assets['silver_ore'] = silver_ore;
    Animation_1.Animation.assets['chest_normal'] = chest_normal;
    Animation_1.Animation.assets['chest_medium'] = chest_medium;
    Animation_1.Animation.assets['chest_large'] = chest_large;
    Animation_1.Animation.assets['obsidian'] = obsidian;
    //Digged Tiles
    Animation_1.Animation.assets['digged_grass'] = digged_grass;
    Animation_1.Animation.assets['digged_flowergrass'] = digged_flowergrass;
    Animation_1.Animation.assets['digged_sand'] = digged_sand;
    Animation_1.Animation.assets['digged_gravel'] = digged_gravel;
    Animation_1.Animation.assets['digged_granite'] = digged_granite;
    GroupAnimation_1.GroupAnimation.animations.push(
    //0
    new GroupAnimation_1.GroupAnimation("grass_tile", grass, { x: 32, y: 32 }, 1, //number of frames
    0 //speed
    ), 
    //1
    new GroupAnimation_1.GroupAnimation("flowery_grass_tile", flowergrass, //
    { x: 32, y: 32 }, 2, //number of frames
    1 //speed
    ), 
    //2
    new GroupAnimation_1.GroupAnimation("sand_tile", sand_tile, { x: 32, y: 32 }, 1, 0), 
    //3
    new GroupAnimation_1.GroupAnimation("gravel_tile", gravel_tile, { x: 32, y: 32 }, 1, 0), 
    //4
    new GroupAnimation_1.GroupAnimation("granite_tile", granite_tile, { x: 32, y: 32 }, 1, 0), 
    //5
    new GroupAnimation_1.GroupAnimation("cave_tile", cave_tile, { x: 32, y: 32 }, 1, 0), 
    //6
    new GroupAnimation_1.GroupAnimation('digged_grass_tile', digged_grass, { x: 32, y: 32 }, 1, 0), 
    //7
    new GroupAnimation_1.GroupAnimation('digged_flowery_grass_tile', digged_flowergrass, { x: 32, y: 32 }, 1, 0), 
    //8
    new GroupAnimation_1.GroupAnimation('digged_sand_tile', digged_sand, { x: 32, y: 32 }, 1, 0), 
    //9
    new GroupAnimation_1.GroupAnimation('digged_gravel_tile', digged_gravel, { x: 32, y: 32 }, 1, 0), 
    //10
    new GroupAnimation_1.GroupAnimation('digged_granite_tile', digged_granite, { x: 32, y: 32 }, 1, 0));
}
exports.default = loadAsset;

},{"./Classes/GameObjects/Animation":20,"./Classes/GameObjects/GroupAnimation":31}],67:[function(require,module,exports){
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
const Leaderboard_1 = require("./Classes/Leaderboard");
const LeaderboardView_1 = require("./Classes/LeaderboardView");
const authentication_1 = require("./utils/authentication");
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    //Main game
    const canvas = document.querySelector("#view");
    const terminal = document.querySelector("#console");
    const executeButton = document.querySelector("#executeButton");
    const stopButton = document.querySelector("#stopButton");
    const shopButton = document.querySelector(".button-shop");
    const inventoryButton = document.querySelector(".button-inventory");
    const leaderboardButton = document.querySelector(".button-leaderboard");
    const inventoryShopElement = document.querySelector(".shop-inventory");
    const leaderboardElement = document.querySelector(".modal-body");
    const QuestionArea = document.querySelector("#question");
    const shop = new Shop_1.Shop();
    const leaderboard = new Leaderboard_1.Leaderboard();
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
    const questionIDDiv = document.querySelector("#questionID");
    (0, loadAsset_1.default)(); //load game asset
    const userToken = (0, authentication_1.getAuthToken)();
    if (!userToken) {
        //not logged in
        alert("Not logged in!");
        window.location.replace("login.html");
    }
    const game = new GameManager_1.GameManager(new CanvasView_1.CanvasView(canvas), new TerminalView_1.TerminalView(terminal, executeButton, stopButton), new ShopView_1.ShopView(shopButton, shop, inventoryShopElement), new InventoryView_1.InventoryView(inventoryButton, inventory, inventoryShopElement), new QuestionView_1.QuestionView(QuestionArea, soalButton, new API_1.API(), AButton, BButton, CButton, DButton, energyDiv, goldDiv, questionIDDiv), new LeaderboardView_1.LeaderboardView(leaderboardButton, leaderboard, leaderboardElement));
    game.start();
    yield game.load(userToken);
    const pUnit = game.getActivePlayerUnit();
    function subtick() {
        // Use await inside the regular function to call the async function
        game
            .tick()
            .then(() => {
            // You can add any post-execution code here
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    setInterval(subtick, 1000);
    soalButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        yield ((_e = game.getQuestionView()) === null || _e === void 0 ? void 0 : _e.UpdateQuestion());
        game.logActivity("Changing Question! (Cooldown: 20s)");
        soalButton.disabled = true;
        setTimeout(function () {
            soalButton.disabled = false;
        }, 20000);
    }));
    AButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        const correct = yield ((_f = game.getQuestionView()) === null || _f === void 0 ? void 0 : _f.checkAnswer(AButton, AButton.value));
        if (!correct) {
            game.logActivity("Wrong Answer! (Wait 20s to answer again)");
            AButton.disabled = true;
            BButton.disabled = true;
            CButton.disabled = true;
            DButton.disabled = true;
            setTimeout(function () {
                AButton.disabled = false;
                BButton.disabled = false;
                CButton.disabled = false;
                DButton.disabled = false;
            }, 20000);
        }
    }));
    BButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        const correct = yield ((_g = game.getQuestionView()) === null || _g === void 0 ? void 0 : _g.checkAnswer(BButton, BButton.value));
        if (!correct) {
            game.logActivity("Wrong Answer! (Wait 20s to answer again)");
            AButton.disabled = true;
            BButton.disabled = true;
            CButton.disabled = true;
            DButton.disabled = true;
            setTimeout(function () {
                AButton.disabled = false;
                BButton.disabled = false;
                CButton.disabled = false;
                DButton.disabled = false;
            }, 20000);
        }
    }));
    CButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        const correct = yield ((_h = game.getQuestionView()) === null || _h === void 0 ? void 0 : _h.checkAnswer(CButton, CButton.value));
        if (!correct) {
            game.logActivity("Wrong Answer! (Wait 20s to answer again)");
            AButton.disabled = true;
            BButton.disabled = true;
            CButton.disabled = true;
            DButton.disabled = true;
            setTimeout(function () {
                AButton.disabled = false;
                BButton.disabled = false;
                CButton.disabled = false;
                DButton.disabled = false;
            }, 20000);
        }
    }));
    DButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        const correct = yield ((_j = game.getQuestionView()) === null || _j === void 0 ? void 0 : _j.checkAnswer(DButton, DButton.value));
        if (!correct) {
            game.logActivity("Wrong Answer! (Wait 20s to answer again)");
            AButton.disabled = true;
            BButton.disabled = true;
            CButton.disabled = true;
            DButton.disabled = true;
            setTimeout(function () {
                AButton.disabled = false;
                BButton.disabled = false;
                CButton.disabled = false;
                DButton.disabled = false;
            }, 20000);
        }
    }));
    document.addEventListener("keydown", (e) => {
        let key = e.key;
        key = key.toLowerCase();
        let price = 5; //energy price for action.
        if (key === "w") {
            switch (pUnit === null || pUnit === void 0 ? void 0 : pUnit.isMoving) {
                case true:
                    return;
                    break;
                case false:
                    pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Up);
                    break;
                default:
                    break;
            }
        }
        if (key === "a") {
            switch (pUnit === null || pUnit === void 0 ? void 0 : pUnit.isMoving) {
                case true:
                    return;
                    break;
                case false:
                    pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Left);
                    break;
                default:
                    break;
            }
        }
        if (key === "s") {
            switch (pUnit === null || pUnit === void 0 ? void 0 : pUnit.isMoving) {
                case true:
                    return;
                    break;
                case false:
                    pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Down);
                    break;
                default:
                    break;
            }
        }
        if (key === "d") {
            switch (pUnit === null || pUnit === void 0 ? void 0 : pUnit.isMoving) {
                case true:
                    return;
                    break;
                case false:
                    pUnit === null || pUnit === void 0 ? void 0 : pUnit.move(Direction_1.Direction.Right);
                    break;
                default:
                    break;
            }
        }
        // if (key === "1") {
        //   game.getPlayer().setEquipmentLevels(1);
        // }
        // if (key === "2") {
        //   game.getPlayer().setEquipmentLevels(2);
        // }
        // if (key === "3") {
        //   game.getPlayer().setEquipmentLevels(3);
        // }
        if (key === "i") {
            //destroy top entity
            //for destroying crates, and stone entities.
            const currentEquipped = game
                .getPlayer()
                .getCurrentEquipment();
            game.Action(Direction_1.Direction.Up, currentEquipped);
        }
        if (key === "j") {
            //destroy left entitiy
            //for destroying crates, and stone entities.
            const currentEquipped = game
                .getPlayer()
                .getCurrentEquipment();
            game.Action(Direction_1.Direction.Left, currentEquipped);
        }
        if (key === "k") {
            //destroy bottom entity
            //for destroying crates, and stone entities.
            const currentEquipped = game
                .getPlayer()
                .getCurrentEquipment();
            game.Action(Direction_1.Direction.Down, currentEquipped);
        }
        if (key === "l") {
            //destroy right entity
            //for destroying crates, and stone entities.
            const currentEquipped = game
                .getPlayer()
                .getCurrentEquipment();
            game.Action(Direction_1.Direction.Right, currentEquipped);
        }
        if (key === " ") {
            const currentEquipped = game
                .getPlayer()
                .getCurrentEquipment();
            game.Action(Direction_1.Direction.Under, currentEquipped);
        }
        // if(key=="["){
        //   alert('cheat');
        //   game.upgradePickaxe();
        // }
        console.clear();
    });
});
function fullscreenHandler() {
    const { TopImagePath, BottomImagePath } = require("./config/env.json");
    const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
    const atas = document.getElementById("atas");
    const bawah = document.getElementById("bawah");
    if (!isFullscreen) {
        atas.style.backgroundColor = "red";
        bawah.style.backgroundColor = "red";
        atas.style.backgroundImage = "";
        bawah.style.backgroundImage = "";
    }
    else {
        atas.style.backgroundColor = "transparent";
        bawah.style.backgroundColor = "transparent";
        atas.style.backgroundImage = `url('${TopImagePath}')`;
        bawah.style.backgroundImage = `url('${BottomImagePath}')`;
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

},{"./Classes/API":2,"./Classes/CanvasView":3,"./Classes/GameManager":18,"./Classes/GameObjects/Direction":24,"./Classes/InventoryView":45,"./Classes/Items/Inventory":53,"./Classes/Leaderboard":58,"./Classes/LeaderboardView":59,"./Classes/QuestionView":61,"./Classes/Shop":62,"./Classes/ShopView":63,"./Classes/TerminalView":64,"./config/env.json":65,"./loadAsset":66,"./utils/authentication":68}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = void 0;
const getAuthToken = () => {
    return sessionStorage.getItem("game_itland");
};
exports.getAuthToken = getAuthToken;

},{}]},{},[67]);
