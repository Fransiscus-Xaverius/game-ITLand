import { GameObjects, Items, Console } from './subnamespace'
import { Terminal } from './Console/Terminal'
import { Grid } from './GameObjects/Grid'
import { CanvasView } from './CanvasView'

export class GameManager{
    private canvasView:CanvasView|null = null;
    private lastTimeStamp:number = 0
    private deltaTime:number = 0
    private isRunning:Boolean = false
    private animationFrameId:number = -1
    private terminals:Terminal[] = []
    private grid:Grid = new Grid({x:15, y:15})

    constructor(canvasView:CanvasView|null = null){
        this.setCanvasView(canvasView)
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
        this.grid.nextFrame(this.deltaTime)
    }

    private render():void{
        this.canvasView?.render(this.grid)
    }
}