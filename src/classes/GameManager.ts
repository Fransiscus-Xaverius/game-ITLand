import { GameObjects, Items, Console } from './subnamespace'
import { Terminal } from './Console/Terminal'
import { Grid } from './GameObjects/Grid'
import { SpriteFrame } from './GameObjects/SpriteFrame'
import { Tile } from './GameObjects/Tile'

export class GameManager{
    private lastTimeStamp:number = 0
    private deltaTime:number = 0
    private canvas:HTMLCanvasElement|null = null
    private context:CanvasRenderingContext2D|null = null
    private isRunning:Boolean = false
    private animationFrameId:number = -1
    private terminals:Terminal[] = []
    private grid:Grid = new Grid({x:15, y:15})
    private canvasScale:number = 1
    private maxCanvasSize:number = 1
    private defaultTilesPerCanvas:number = 10

    constructor(canvas:HTMLCanvasElement){
        this.setCanvas(canvas)
    }

    public setCanvas(canvas:HTMLCanvasElement):void{
        if(this.canvas) this.canvas.onwheel = null
        this.canvas = canvas
        this.canvas.width = this.canvas.parentElement?.clientWidth ?? window.innerWidth
        this.canvas.height = this.canvas.parentElement?.clientHeight ?? window.innerHeight
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D
        this.context.imageSmoothingEnabled = false
        this.maxCanvasSize = Math.max(this.canvas.width, this.canvas.height)
        this.canvas.onwheel = (evt) => {
            this.canvasScale *= 1-(evt.deltaY * 0.001)
        }
    }

    public getDeltatime():number{
        return this.deltaTime
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
        if(this.context == null || this.canvas == null) return
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < this.grid.size.y; i++) {
            for (let j = 0; j < this.grid.size.x; j++) {
                var tileSprite:SpriteFrame|undefined = this.grid.tiles[i][j]?.currentAnimationFrame()
                var entitySprite:SpriteFrame|undefined = this.grid.entityGrid[i][j]?.currentAnimationFrame()
                const oneTileSize = (this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize
                
                if(tileSprite) {
                    const xSize = Math.floor(tileSprite.resolution.x / Tile.defaultTileResolution.x * oneTileSize)
                    const ySize = Math.floor(tileSprite.resolution.y / Tile.defaultTileResolution.y * oneTileSize)
                    this.context.drawImage(
                        tileSprite.spriteSheet, 
                        tileSprite.position.x, 
                        tileSprite.position.y, 
                        tileSprite.resolution.x,
                        tileSprite.resolution.y,
                        j * xSize,
                        i * ySize,
                        xSize,
                        ySize
                    )
                }
            }
        }
    }


}