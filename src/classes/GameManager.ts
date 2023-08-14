import { GameObjects, Items, Console } from './subnamespace'
import { Terminal } from './Console/Terminal'
import { Grid } from './GameObjects/Grid'
import { CanvasView } from './CanvasView'
import { GroupAnimation } from './GameObjects/GroupAnimation';
import { Player } from './Player';
import { Direction } from './GameObjects/Direction';

export class GameManager{
    private lastTimeStamp:number = 0
    private deltaTime:number = 0
    private isRunning:Boolean = false
    private animationFrameId:number = -1
    private player:Player = new Player()
    private terminals:Terminal[] = []
    private grid:Grid = new Grid({x:1000, y:10})
    private canvasView:CanvasView|null = null;

    constructor(canvasView:CanvasView|null = null){
        this.setCanvasView(canvasView)
        this.grid.addEntity(this.player.units[0])
        window.addEventListener('keydown', (evt) => {
            const player = this.player.units[0]
            if(evt.key == "d") player.move(Direction.Right)
            if(evt.key == "w") player.move(Direction.Up)
            if(evt.key == "a") player.move(Direction.Left)
            if(evt.key == "s") player.move(Direction.Down)
        })
    }

    public getDeltatime():number{
        return this.deltaTime
    }

    public setCanvasView(canvasView:CanvasView|null):void{
        this.canvasView = canvasView
    }

    public start():void{
        if(this.isRunning) return

        const run = (timestamp:number):void => {
            this.deltaTime = (timestamp - this.lastTimeStamp)/1000
            this.update()
            this.render()
            this.lastTimeStamp = timestamp
            this.animationFrameId = requestAnimationFrame(run)
        };

        this.animationFrameId = requestAnimationFrame(run)
    }

    public pause():void{
        if(!this.isRunning) return
        cancelAnimationFrame(this.animationFrameId)
    }

    private update():void{
        if(!this.canvasView) {
            this.grid.nextFrame(this.deltaTime)
            return
        }
        const camPos = this.canvasView.getCameraPosition()
        const scaledRenderRadius = this.canvasView.getScaledRenderRadius()
        this.grid.nextFrame(this.deltaTime, {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius), 
                y: Math.floor(camPos.y - scaledRenderRadius),
            },
            size: {
                x: Math.ceil(scaledRenderRadius*2),
                y: Math.ceil(scaledRenderRadius*2),
            }
        }, this.player.units)
    }

    private render():void{
        this.canvasView?.render(this.grid)
        this.canvasView?.getContext()?.fillText("fps : " + (1/this.deltaTime).toFixed(3) , 10, 80)
    }
}