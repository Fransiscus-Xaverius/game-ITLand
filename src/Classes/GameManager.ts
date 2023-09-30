import { TerminalView } from './TerminalView';
import { Grid } from './GameObjects/Grid'
import { CanvasView } from './CanvasView'
import { GroupAnimation } from './GameObjects/GroupAnimation';
import { Player } from './Player';
import { Direction } from './GameObjects/Direction';
import { PlayerUnit } from './GameObjects/PlayerUnit';
import { ShopView } from './ShopView';
import { API } from './API';
import { Entity } from './GameObjects/Entity';
import { InventoryView } from './InventoryView';
import { Map } from './Map';
import { Question } from './Question';
import { QuestionView } from './QuestionView';
import { Rock } from './GameObjects/Rock';
import { Shop } from './Shop';
import { Inventory } from './Items/Inventory';
import { Point } from './GameObjects/Type/Point';

export class GameManager {
    public api: API | null = null;
    private lastTimeStamp: number = 0;
    private deltaTime: number = 0;
    private isRunning: Boolean = false;
    private animationFrameId: number = -1;
    private player: Player = new Player();
    private terminalView: TerminalView | null = null;
    private grid: Grid = new Grid({ x: 100, y: 100 });
    private canvasView: CanvasView | null = null;
    private activePlayerUnit: PlayerUnit | null = null;
    private shopView: ShopView | null = null;
    private inventoryView: InventoryView | null = null;
    private questionView: QuestionView | null = null;

    constructor(canvasView: CanvasView | null = null, terminalView: TerminalView | null = null, shopView: ShopView | null, inventoryView: InventoryView | null = null, questionView: QuestionView | null = null) {
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        this.setShopView(shopView);
        this.setInventoryView(inventoryView);
        this.api = new API();
        this.setQuestionView(questionView);
    }

    // public addToInventory(index: number, amount: number) {
    //     this.inventoryView?.getInventory()?.addItemOwned(index, amount);
    // }

    public setInventory() {
        const tempInventory: any = this.inventoryView?.getInventory();
        this.shopView?.setInventory(tempInventory);
        this.player.setInventory(tempInventory);
    }


    public async load() {
        this.shopView?.setPlayer(this.player);
        alert('await load');
        let map: Map = { tile: [], entity: [] }
        map = await this.api?.gameStart()!; //use non-null assertion operator.
        alert(map.tile.length);
        //redoing load grid because the constructor cannot be an async function.
        this.grid = new Grid({ x: 100, y: 100 });
        this.grid.redo(map.tile, map.entity)
        this.grid.addEntity(this.player.units[0]);
        this.setActivePlayerUnit(this.player.units[0]);
        this.questionView?.setPlayer(this.player);
        await this.questionView?.load();
        this.questionView?.refreshStats();
        this.setInventory();
    }



    public getQuestionView(): QuestionView | null {
        return this.questionView;
    }

    public setInventoryView(inventoryView: InventoryView | null): void {
        this.inventoryView = inventoryView;
    }

    public getInventoryView(): InventoryView | null {
        return this.inventoryView;
    }

    //API testing
    // public async testAPI(){
    //     const string1 = await this.api?.gameStart();
    //     return string1;
    // }

    public async testAPIsoal() {
        const string1 = await this.api?.getQuestion();
        return string1;
    }

    public logActivity(str: string): void {
        const terminal = this.terminalView?.getTextArea();
        if (terminal) {
            terminal.value = `\n${str}`;
        }
    }

    public removeGridEntity(x: number, y: number): void {
        const entName = this.grid.entityGrid[y][x]?.getEntityName();
        const drop = this.grid.entityGrid[y][x]?.entityDrop()!;
        this.player.addGold(drop);
        this.logActivity(`Destroyed a ${entName} and got ${drop} gold coins!`);
        this.questionView?.refreshStats();
        this.grid.entityGrid[y][x] = null;
    }

    public alertEntity(): void {
        console.log(this.grid.entities);
    }

    public setShopView(shopView: ShopView | null) {
        this.shopView = shopView;
    }
    public getShopView(): ShopView | null {
        return this.shopView;
    }

    public getDeltatime(): number {
        return this.deltaTime
    }

    //change current equipment
    public changeEquipment() {

    }

    public isGoodEnough(level: number, target: number): boolean {
        return level >= target;
    }

    //commit action

    //actionType:
    //1 = mine
    //2 = break

    //Direction.Under = dig

    public Action(direction: Direction, actionType: number) {
        const coords = this.player.getCoordinate();
        const temp = this.getGridEntity(coords, direction);

        if (!temp) {
            alert('No entity object');
            return;
        }

        switch (actionType) {
            case 0: //not equipping anything.
                this.alertEquipSomething();
                break;
            case 1: //equipping a pickaxe
                this.actionWithPickaxe(temp);
                break;
            case 2: //equipping a sword
                this.actionWithSword(temp);
                break;
            case 3:
                this.actionWithShovel(temp);
            default:
                alert('Invalid action!');
                break;
        }
    }

    private getGridEntity(coords: Point, direction: Direction): Entity | null {
        switch (direction) {
            case Direction.Up:
                return this.grid.getEntity(coords.x, coords.y - 1);
            case Direction.Down:
                return this.grid.getEntity(coords.x, coords.y + 1);
            case Direction.Left:
                return this.grid.getEntity(coords.x - 1, coords.y);
            case Direction.Right:
                return this.grid.getEntity(coords.x + 1, coords.y);
            case Direction.Under:
                return null; // TODO: implement shovel action
            default:
                return null;
        }
    }

    private alertEquipSomething() {
        alert('Equip something');
    }

    private actionWithPickaxe(entity: Entity) {
        const entityName = entity.getEntityName();
        if (entityName == "Rock" || entityName == "Iron_ore" || entityName == "Silver_ore" || entityName == "Gold_ore") {
            if (this.isGoodEnough(this.player.getEnergy(), entity.getRequiredEnergy())) {
                if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, entity.getEntityLevel()!)) {
                    this.removeGridEntity(entity.getCoordinate().x, entity.getCoordinate().y);
                    this.player.useEnergy(entity.getRequiredEnergy());
                    this.questionView?.refreshStats();
                } else {
                    this.logActivity(`Upgrade your pickaxe to destroy this block!`);
                }
            } else {
                this.logActivity(`You need more energy to do this action!`);
            }
        } else {
            this.logActivity('You cannot use a pickaxe to break this object! (wrong equipment used)');
        }
    }

    private actionWithSword(entity: Entity) {
        switch (entity.getEntityName()) {
            case 'Chest':
                alert('This is a chest');
                this.removeGridEntity(entity.getCoordinate().x, entity.getCoordinate().y);
                break;
            default:
                alert('This is the wrong tool!');
                break;
        }
    }

    private actionWithShovel(entity: Entity) {
        // switch (entity.getEntityName()) {
        //     case 'Chest':
        //         alert('This is a chest');
        //         this.removeGridEntity(entity.getCoordinate().x, entity.getCoordinate().y);
        //         break;
        //     default:
        //         alert('This is the wrong tool!');
        //         break;
        // }
    }
    // public Action(direction: Direction, actionType: number) {
    //     const coords = this.player.getCoordinate();
    //     let temp = null;
    //     switch (direction) {
    //         case Direction.Up:
    //             temp = this.grid.getEntity((coords.x), (coords.y - 1));
    //             if (temp) {
    //                 switch (actionType) {
    //                     case 0: //not equipping anything.
    //                         alert('Equip something');
    //                         break;
    //                     case 1: //equiping a pickaxe
    //                         const entityname = temp.getEntityName();
    //                         if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
    //                             alert('this is a type of rock');
    //                             //if energy is enough
    //                             if (this.isGoodEnough(this.player.getEnergy(), temp.getRequiredEnergy())) {
    //                                 // alert('good enough');
    //                                 //if equipment is good enough
    //                                 if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) {
    //                                     this.removeGridEntity(coords.x, (coords.y - 1));
    //                                     this.player.useEnergy(temp.getRequiredEnergy());
    //                                     this.questionView?.refreshStats();
    //                                 }
    //                                 //if equipment is not good enough
    //                                 else this.logActivity(`Upgrade your pickaxe to destroy this block!`);
    //                             }
    //                             else this.logActivity(`You need more energy to do this action!`);
    //                         }
    //                         else {
    //                             this.logActivity('You cannot use a pickaxe to break this object! (wrong equipment used)')
    //                         }
    //                         break;
    //                     case 2: //equipping a sword
    //                         switch (temp.getEntityName()) {
    //                             case 'Chest':
    //                                 alert('this is a chest');
    //                                 this.removeGridEntity(coords.x, (coords.y - 1));
    //                                 break;
    //                             default: //wrong equipment to destroy entity
    //                                 alert('this is the wrong tool!');
    //                                 break;
    //                         }
    //                         break;
    //                     default:
    //                         alert('Invalid action!');
    //                         break;
    //                 }
    //             }
    //             else {
    //                 alert('no entity object');
    //             }
    //             break;
    //         case Direction.Down:
    //             temp = this.grid.getEntity((coords.x), (coords.y + 1));
    //             if (temp) {
    //                 switch (actionType) {
    //                     case 0: //not equipping anything.
    //                         alert('Equip something');
    //                         break;
    //                     case 1: //equiping a pickaxe
    //                         const entityname = temp.getEntityName();
    //                         if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
    //                             if (this.isGoodEnough(this.player.getEnergy(), temp.getRequiredEnergy())) {
    //                                 // alert('good enough');
    //                                 //if equipment is good enough
    //                                 if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) {
    //                                     this.removeGridEntity(coords.x, (coords.y + 1));
    //                                     this.player.useEnergy(temp.getRequiredEnergy());
    //                                     this.questionView?.refreshStats();
    //                                 }
    //                                 //if equipment is not good enough
    //                                 else this.logActivity(`Upgrade your pickaxe to destroy this block!`);
    //                             }
    //                             else this.logActivity(`You need more energy to do this action!`);
    //                         }
    //                         else {
    //                             this.logActivity('You cannot use a pickaxe to break this object! (wrong equipment used)')
    //                         }
    //                         break;
    //                     case 2: //equipping a sword
    //                         switch (temp.getEntityName()) {
    //                             case 'Chest':
    //                                 alert('this is a chest');
    //                                 this.removeGridEntity(coords.x, (coords.y + 1));
    //                                 break;
    //                             default: //wrong equipment to destroy entity
    //                                 alert('this is the wrong tool!');
    //                                 break;
    //                         }
    //                         break;
    //                     default:
    //                         alert('Invalid action!');
    //                         break;
    //                 }
    //             }
    //             break;
    //         case Direction.Left:
    //             temp = this.grid.getEntity((coords.x - 1), (coords.y));
    //             if (temp) {
    //                 switch (actionType) {
    //                     case 0: //not equipping anything.
    //                         alert('Equip something');
    //                         break;
    //                     case 1: //equiping a pickaxe
    //                         const entityname = temp.getEntityName();
    //                         if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
    //                             if (this.isGoodEnough(this.player.getEnergy(), temp.getRequiredEnergy())) {
    //                                 // alert('good enough');
    //                                 //if equipment is good enough
    //                                 if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) {
    //                                     this.removeGridEntity((coords.x - 1), (coords.y));
    //                                     this.player.useEnergy(temp.getRequiredEnergy());
    //                                     this.questionView?.refreshStats();
    //                                 }
    //                                 //if equipment is not good enough
    //                                 else this.logActivity(`Upgrade your pickaxe to destroy this block!`);
    //                             }
    //                             else this.logActivity(`You need more energy to do this action!`);
    //                         }
    //                         else {
    //                             alert('this is the wrong tool');
    //                         }
    //                         break;
    //                     case 2: //equipping a sword
    //                         switch (temp.getEntityName()) {
    //                             case 'Chest':
    //                                 alert('this is a chest');
    //                                 this.removeGridEntity((coords.x - 1), (coords.y));
    //                                 break;
    //                             default: //wrong equipment to destroy entity
    //                                 alert('this is the wrong tool!');
    //                                 break;
    //                         }
    //                         break;
    //                     default:
    //                         alert('Invalid action!');
    //                         break;
    //                 }
    //             }
    //             break;
    //         case Direction.Right:
    //             temp = this.grid.getEntity((coords.x + 1), (coords.y));
    //             if (temp) {
    //                 switch (actionType) {
    //                     case 0: //not equipping anything.
    //                         alert('Equip something');
    //                         break;
    //                     case 1: //equiping a pickaxe
    //                         const entityname = temp.getEntityName();
    //                         if (entityname == "Rock" || entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore") {
    //                             if (this.isGoodEnough(this.player.getEnergy(), temp.getRequiredEnergy())) {
    //                                 // alert('good enough');
    //                                 //if equipment is good enough
    //                                 if (this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) {
    //                                     this.removeGridEntity((coords.x + 1), (coords.y));
    //                                     this.player.useEnergy(temp.getRequiredEnergy());
    //                                     this.questionView?.refreshStats();
    //                                 }
    //                                 //if equipment is not good enough
    //                                 else this.logActivity(`Upgrade your pickaxe to destroy this block!`);
    //                             }
    //                             else this.logActivity(`You need more energy to do this action!`);
    //                         }
    //                         else {
    //                             alert('this is the wrong tool');
    //                         }
    //                         break;
    //                     case 2: //equipping a sword
    //                         switch (temp.getEntityName()) {
    //                             case 'Chest':
    //                                 alert('this is a chest');
    //                                 this.removeGridEntity((coords.x + 1), (coords.y));
    //                                 break;
    //                             default: //wrong equipment to destroy entity
    //                                 alert('this is the wrong tool!');
    //                                 break;
    //                         }
    //                         break;
    //                     default:
    //                         alert('Invalid action!');
    //                         break;
    //                 }
    //             }
    //             break;
    //         case Direction.Under: //shovel
    //             break;
    //         default:
    //             break;
    //     }
    // }

    public setActivePlayerUnit(value: PlayerUnit | null): void {
        this.terminalView?.setTerminal(value?.terminal ?? null)
        this.activePlayerUnit = value
    }

    public setQuestionView(questionView: QuestionView | null): void {
        this.questionView = questionView;
    }

    public getActivePlayerUnit() {
        return this.activePlayerUnit;
    }

    public getPlayer() {
        return this.player;
    }

    public setCanvasView(canvasView: CanvasView | null): void {
        this.canvasView = canvasView
    }

    public setTerminalView(terminalView: TerminalView | null): void {
        terminalView?.setTerminal(this.activePlayerUnit?.terminal ?? null)
        this.terminalView?.setTerminal(null)
        this.terminalView = terminalView
    }

    public start(): void {
        if (this.isRunning) return

        const run = (timestamp: number): void => {
            this.deltaTime = (timestamp - this.lastTimeStamp) / 1000
            this.update()
            this.render()
            this.lastTimeStamp = timestamp
            this.animationFrameId = requestAnimationFrame(run)
        };

        this.animationFrameId = requestAnimationFrame(run)
    }

    public pause(): void {
        if (!this.isRunning) return
        cancelAnimationFrame(this.animationFrameId)
    }

    private update(): void {
        if (!this.canvasView) {
            this.grid.update(this.deltaTime)
            return
        }
        this.canvasView.setCameraPosition(this.activePlayerUnit?.getSpriteCoordinate() || { x: 0, y: 0 });
        const camPos = this.canvasView.getCameraPosition()
        const scaledRenderRadius = this.canvasView.getScaledRenderRadius()
        this.grid.update(this.deltaTime, {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius),
                y: Math.floor(camPos.y - scaledRenderRadius),
            },
            size: {
                x: Math.ceil(scaledRenderRadius * 2),
                y: Math.ceil(scaledRenderRadius * 2),
            }
        }, this.player.units)
    }

    private render(): void {
        this.canvasView?.render(this.grid)
        this.canvasView?.getContext()?.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80)
    }

    public buyInit(): void {
        const shopItem = document.querySelectorAll(".card-shop") as NodeListOf<HTMLDivElement>;
    }
}