import { Tile } from "./GameObjects/Tile"
import { Entity } from "./GameObjects/Entity"
import { SpriteFrame } from "./GameObjects/Type/SpriteFrame"
import { Point } from "./GameObjects/Type/Point"
import { Grid } from "./GameObjects/Grid"
import { PlayerUnit } from "./GameObjects/PlayerUnit"

export class CanvasView{
    private canvas:HTMLCanvasElement|null = null
    private context:CanvasRenderingContext2D|null = null
    private canvasScale:number = 1
    private maxCanvasScale:number = 1.5
    private minCanvasScale:number = 0.5
    private maxCanvasSize:number = 1
    private defaultTilesPerCanvas:number = 10
    private renderRadius:number = 6
    private moveMouseTriggerPressed:boolean = false
    private cameraMoved:boolean = false
    private cameraPosition:Point = {x:0, y:0}

    public onClick?: (gridCoordinate:Point)=>void;

    constructor(canvas:HTMLCanvasElement|null = null){
        this.setCanvas(canvas)
    }

    public setCanvas(canvas:HTMLCanvasElement|null):void{
        if(this.canvas) {
            window.onresize = null
            this.canvas.onwheel = null
            this.canvas.onmousedown = null
            this.canvas.onmouseup = null
            this.canvas.onmousemove = null
            this.canvas.onmouseleave = null
        }
        this.canvas = canvas
        if(this.canvas == null || canvas == null) {
            this.context = null
            return
        }
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.context.imageSmoothingEnabled = false
        this.maxCanvasSize = Math.max(this.canvas.width, this.canvas.height)
        // this.canvas.onwheel = (evt) => {
        //     this.setCanvasScale(this.canvasScale * (1-(evt.deltaY * 0.001)))
        // }

        this.setCanvasScale(0.25);

        this.canvas.onmousedown = (evt) => {
            if(evt.button == 0) {
                this.moveMouseTriggerPressed = true
                evt.preventDefault();
                return false;
            }
        }

        this.canvas.onmouseup = (evt) => {
            
            if(evt.button == 0) {
                if(!this.cameraMoved)console.log('click!')

                this.cameraMoved = false
                this.moveMouseTriggerPressed = false
            }
        }

        this.canvas.onmouseleave = (evt) => {
            this.cameraMoved = false
            this.moveMouseTriggerPressed = false
        }

        // this.canvas.onmousemove = (evt) => {
        //     if(this.moveMouseTriggerPressed) {
        //         this.cameraMoved = true
        //         this.cameraPosition.x -= (evt.movementX) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
        //         this.cameraPosition.y -= (evt.movementY) / ((this.canvasScale / this.defaultTilesPerCanvas) * this.maxCanvasSize)
        //     }
        // }

        window.onresize = (evt) => {
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

    public setCameraPosition(position:Point):void{
        this.cameraPosition = position
    }

    public getCameraPosition():Point{
        return this.cameraPosition
    }

    public getContext():CanvasRenderingContext2D|null{
        return this.context
    }

    public getScaledRenderRadius():number{
        return this.renderRadius / this.canvasScale
    }

    public render(grid:Grid|null):void{
        if(this.context == null || this.canvas == null) return
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if(grid == null) return
        const oneTileSize = this.canvasScale * this.maxCanvasSize/ this.defaultTilesPerCanvas
        const oneTileSizeX = oneTileSize / Tile.defaultTileResolution.x
        const oneTileSizeY = oneTileSize / Tile.defaultTileResolution.y
        const xCam = this.cameraPosition.x * oneTileSize - this.canvas.width / 2
        const yCam = this.cameraPosition.y * oneTileSize - this.canvas.height / 2

        const yPlayerOffset = Math.round(oneTileSize/3)
        const scaledRadius = this.getScaledRenderRadius()

        const iStart = Math.floor(this.cameraPosition.y - scaledRadius) 
        const iEnd   = Math.ceil(this.cameraPosition.y  + scaledRadius) 

        const jStart = Math.floor(this.cameraPosition.x - scaledRadius) 
        const jEnd   = Math.ceil(this.cameraPosition.x  + scaledRadius) 
        for (let i = iStart; i < iEnd; i++) {
            if(i < 0) continue;
            for (let j = jStart; j < jEnd; j++) {
                if(j < 0) continue;
                var tileSprite:SpriteFrame|undefined = grid.tiles[i]?.at(j)?.currentAnimationFrame();
                

                if(tileSprite) {
                    const xSize = oneTileSizeX * tileSprite.resolution.x;
                    const ySize = oneTileSizeY * tileSprite.resolution.y;

                    const xCoord = Math.round(j * xSize - xCam);
                    const yCoord = Math.round(i * ySize - yCam);
    
                    const xSizeScaled = Math.round((j+1) * xSize - xCam) - xCoord;
                    const ySizeScaled = Math.round((i+1) * ySize - yCam) - yCoord;

                    this.context.drawImage(
                        tileSprite.spriteSheet, 
                        tileSprite.position.x,
                        tileSprite.position.y, 
                        tileSprite.resolution.x,
                        tileSprite.resolution.y,
                        xCoord,
                        yCoord,
                        xSizeScaled,
                        ySizeScaled
                    );
                }
            }
        }

        for (let i = iStart; i < iEnd; i++) {
            if(i < 0) continue;
            for (let j = jStart; j < jEnd; j++) {
                if(j < 0) continue;
                var entity:Entity|null|undefined = grid.entityGrid[i]?.at(j);

                if(entity) {
                    const entitySprite = entity.currentAnimationFrame()
                    const xSize = oneTileSizeX * entitySprite.resolution.x;
                    const ySize = oneTileSizeY * entitySprite.resolution.y;

                    const spriteCoord = entity instanceof PlayerUnit ? entity.getSpriteCoordinate() : null;

                    const jPos = spriteCoord ? spriteCoord.x : j;
                    const iPos = spriteCoord ? spriteCoord.y : i;
    
                    const xCoord = jPos * xSize - xCam;
                    const yCoord = iPos * ySize - yCam;
    
                    const xSizeScaled = Math.round((jPos+1) * xSize - xCam) - xCoord;
                    const ySizeScaled = Math.round((iPos+1) * ySize - yCam) - yCoord;

                    this.context.drawImage(
                        entitySprite.spriteSheet, 
                        entitySprite.position.x,
                        entitySprite.position.y, 
                        entitySprite.resolution.x,
                        entitySprite.resolution.y,
                        xCoord,
                        yCoord - (spriteCoord ? yPlayerOffset : 0),
                        xSizeScaled,
                        ySizeScaled
                    );
                }
            }
        }
            
        
        this.context.fillText( "x : " + this.cameraPosition.x, 10, 20)
        this.context.fillText( "y : " + this.cameraPosition.y, 10, 40)
    }
}