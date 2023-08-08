import { GameObjects, Items, Console } from './subnamespace'
import { Terminal } from './Console/Terminal'
import { Grid } from './GameObjects/Grid'
import { CanvasView } from './CanvasView'
import { GroupAnimation } from './GameObjects/GroupAnimation';

export class GameManager{
    private canvasView:CanvasView|null = null;
    private lastTimeStamp:number = 0
    private deltaTime:number = 0
    private isRunning:Boolean = false
    private animationFrameId:number = -1
    private terminals:Terminal[] = []
    private grid:Grid = new Grid({x:1000, y:1000})

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
        if(!this.canvasView) {
            this.grid.nextFrame(this.deltaTime)
            return
        }
        const camPos = this.canvasView.getCameraPosition()
        const scaledRenderRadius = this.canvasView.getRenderRadius()
        this.grid.nextFrame(this.deltaTime, {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius), 
                y: Math.floor(camPos.y - scaledRenderRadius)
            },
            size: {
                x: Math.ceil(scaledRenderRadius*2),
                y: Math.ceil(scaledRenderRadius*2),
            }
        })
    }

    private render():void{
        this.canvasView?.render(this.grid)
        this.canvasView?.getContext()?.fillText("fps : " + (1/this.deltaTime).toFixed(3) , 10, 80)
    }
}