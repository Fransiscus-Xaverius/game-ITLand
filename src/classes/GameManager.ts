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

export class GameManager {
    public api:API | null = null;
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

    public async load(){
        alert('await load');
        let map:Map = {tile:[], entity:[]}
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
    }

    public getQuestionView(): QuestionView |null {
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

    public async testAPIsoal(){
        const string1 = await this.api?.getQuestion();
        return string1;
    }

    public removeGridEntity(x: number, y: number): void {
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
    public changeEquipment(){

    }

    public isGoodEnough(level:number, target:number):boolean{
        return level>=target;
    }

    //commit action

    //actionType:
    //1 = mine
    //2 = break
    //3 = dig
    public Action(direction: Direction, actionType:number){
        const coords = this.player.getCoordinate();
        let temp = null;
        switch(direction){
            case Direction.Up:
                temp = this.grid.getEntity((coords.x), (coords.y-1));
                if(temp){
                    switch(actionType){
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if(entityname == "Rock"|| entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore"){
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if(this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) this.removeGridEntity(coords.x, (coords.y-1));
                                //if equipment is not good enough
                                else alert('equipment is not good enough');
                            }
                            else{
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            switch(temp.getEntityName()){
                                case 'Chest':
                                    alert('this is a chest');
                                    this.removeGridEntity(coords.x, (coords.y-1));
                                    break;
                                default: //wrong equipment to destroy entity
                                    alert('this is the wrong tool!');
                                    break;
                            }
                            break;
                        case 3: //equiping a shovel
                            break;
                        default:
                            break;
                    }
                }
                else{
                    alert('no entity object');
                }
                break;
            case Direction.Down:
                temp = this.grid.getEntity((coords.x), (coords.y+1));
                if(temp){
                    switch(actionType){
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if(entityname == "Rock"|| entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore"){
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if(this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) this.removeGridEntity(coords.x, (coords.y+1));
                                //if equipment is not good enough
                                else alert('equipment is not good enough');
                            }
                            else{
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            break;
                        case 3: //equiping a shovel
                            break;
                        default:
                            break;
                    }
                }
                break;
            case Direction.Left:
                temp = this.grid.getEntity((coords.x-1), (coords.y));
                if(temp){
                    switch(actionType){
                        case 0: //not equipping anything.
                            alert('Equip something');
                            break;
                        case 1: //equiping a pickaxe
                            const entityname = temp.getEntityName();
                            if(entityname == "Rock"|| entityname == "Iron_ore" || entityname == "Silver_ore" || entityname == "Gold_ore"){
                                alert('this is a type of rock');
                                //if equipment is good enough
                                if(this.isGoodEnough(this.player.getEquipmentLevels().pickaxe, temp.getEntityLevel()!)) this.removeGridEntity((coords.x-1), (coords.y));
                                //if equipment is not good enough
                                else alert('equipment is not good enough');
                            }
                            else{
                                alert('this is the wrong tool');
                            }
                            break;
                        case 2: //equipping a sword
                            break;
                        case 3: //equiping a shovel
                            break;
                        default:
                            break;
                    }
                }
                break;
            case Direction.Right:
                
                break;
            default:
                break;
        }
    }

    public setActivePlayerUnit(value: PlayerUnit | null): void {
        this.terminalView?.setTerminal(value?.terminal ?? null)
        this.activePlayerUnit = value
    }

    public setQuestionView(questionView: QuestionView| null): void{
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
}