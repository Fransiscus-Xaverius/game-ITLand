import { GameObjects, Items, Console } from './subnamespace'
import { Terminal } from './Console/Terminal'
import { Grid } from './GameObjects/Grid'
import { SpriteFrame } from './GameObjects/SpriteFrame'
import { Tile } from './GameObjects/Tile'
import { Point } from './types'

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
    private maxCanvasScale:number = 2
    private minCanvasScale:number = 0.25
    private maxCanvasSize:number = 1
    private defaultTilesPerCanvas:number = 10
    private cameraPosition:Point = {x:1000, y:500}
    private middleMousePressed:boolean = false

    constructor(canvas:HTMLCanvasElement){
        this.setCanvas(canvas)
    }

    public setCanvas(canvas:HTMLCanvasElement):void{
        if(this.canvas) {
            this.canvas.onwheel = null
            this.canvas.onmousedown = null
            this.canvas.onmouseup = null
            this.canvas.onmousemove = null
            this.canvas.onmouseleave = null
        }
        this.canvas = canvas
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D
        this.context.imageSmoothingEnabled = false
        this.maxCanvasSize = Math.max(this.canvas.width, this.canvas.height)
        this.canvas.onwheel = (evt) => {
            this.setCanvasScale(this.canvasScale * (1-(evt.deltaY * 0.001)))
        }

        this.canvas.onmousedown = (evt) => {
            if(evt.button == 1) {
                this.middleMousePressed = true
                evt.preventDefault();
                return false;
            }
        }

        this.canvas.onmouseup = (evt) => {
            if(evt.button == 1) {
                this.middleMousePressed = false
            }
        }

        this.canvas.onmouseleave = (evt) => {
            this.middleMousePressed = false
        }

        this.canvas.onmousemove = (evt) => {
            if(this.middleMousePressed) {
                this.cameraPosition.x -= evt.movementX / this.canvasScale
                this.cameraPosition.y -= evt.movementY / this.canvasScale
            }
        }

        
    }

    public setCanvasScale(scale:number):void{
        this.canvasScale = Math.min(this.maxCanvasScale, Math.max(this.minCanvasScale, scale))
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
                        j * xSize - Math.floor(this.cameraPosition.x * this.canvasScale - this.canvas.width / 2),
                        i * ySize - Math.floor(this.cameraPosition.y * this.canvasScale - this.canvas.height / 2),
                        xSize,
                        ySize
                    )
                }
            }
            
        }
        
        this.context.fillText( "x : " + this.cameraPosition.x, 10, 20)
        this.context.fillText( "y : " + this.cameraPosition.y, 10, 40)
    }


}