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

export class GameManager {
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

    constructor(canvasView: CanvasView | null = null, terminalView: TerminalView | null = null, shopView: ShopView | null) {
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        this.grid.addEntity(this.player.units[0]);
        this.setActivePlayerUnit(this.player.units[0]);
        this.setShopView(shopView);
    }

    public removeGridEntity(){ 
        this.grid.entityGrid[0][1] = null;
    }

    public alertEntity(){
        console.log(this.grid.entities);
    }

    public setShopView(shopView: ShopView | null) {
        this.shopView = shopView;
    }
    public getShopView() {
        return this.shopView;
    }

    public getDeltatime(): number {
        return this.deltaTime
    }

    public setActivePlayerUnit(value: PlayerUnit | null): void {
        this.terminalView?.setTerminal(value?.terminal ?? null)
        this.activePlayerUnit = value
    }

    public getActivePlayerUnit(){
        return this.activePlayerUnit;
    }

    public getPlayer(){
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
        this.canvasView.setCameraPosition(this.activePlayerUnit?.getSpriteCoordinate()||{x:0,y:0});
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