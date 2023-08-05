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
    private minCanvasScale:number = 0.5
    private maxCanvasSize:number = 1
    private defaultTilesPerCanvas:number = 10
    private cameraPosition:Point = {x:0, y:0}
    private middleMousePressed:boolean = false

    constructor(canvas:HTMLCanvasElement){
        this.setCanvas(canvas)
    }

    public setCanvas(canvas:HTMLCanvasElement):void{
        if(this.canvas) {
            window.onresize = null
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
                this.cameraPosition.x -= (evt.movementX / this.canvasScale) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
                this.cameraPosition.y -= (evt.movementY / this.canvasScale) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
                // this.cameraPosition.x -= evt.movementX / this.canvasScale 
                // this.cameraPosition.y -= evt.movementY / this.canvasScale
            }
        }

        window.onresize = (evt) => {
            console.log('resized')
            const target = this.canvas as HTMLCanvasElement
            if(!target) return
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            this.maxCanvasSize = Math.max(target.width, target.height)

            if(this.context)
            this.context.imageSmoothingEnabled = false
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
        const oneTileSize = (this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize * this.canvasScale
        const oneTileSizeX = oneTileSize / Tile.defaultTileResolution.x
        const oneTileSizeY = oneTileSize / Tile.defaultTileResolution.y
        const xCam = Math.floor(this.cameraPosition.x * oneTileSize - this.canvas.width / 2)
        const yCam = Math.floor(this.cameraPosition.y * oneTileSize - this.canvas.height / 2)
        // const xCam = Math.floor(this.cameraPosition.x * this.canvasScale - this.canvas.width / 2)
        // const yCam = Math.floor(this.cameraPosition.y * this.canvasScale - this.canvas.height / 2)
        for (let i = 0; i < this.grid.size.y; i++) {
            for (let j = 0; j < this.grid.size.x; j++) {
                var tileSprite:SpriteFrame|undefined = this.grid.tiles[i][j]?.currentAnimationFrame()
                var entitySprite:SpriteFrame|undefined = this.grid.entityGrid[i][j]?.currentAnimationFrame()

                if(tileSprite) {
                    const xSize = Math.floor(oneTileSizeX * tileSprite.resolution.x)
                    const ySize = Math.floor(oneTileSizeY * tileSprite.resolution.y)
                    this.context.drawImage(
                        tileSprite.spriteSheet, 
                        tileSprite.position.x, 
                        tileSprite.position.y, 
                        tileSprite.resolution.x,
                        tileSprite.resolution.y,
                        j * xSize - xCam,
                        i * ySize - yCam,
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