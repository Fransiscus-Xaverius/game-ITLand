import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Point } from "./Point";
import { Grass } from "./Grass";
import { Animated } from "./Animated";
import { GroupAnimation } from "./GroupAnimation";

export class Grid{
    public readonly size:Point
    public entities: Entity[]
    public entityGrid: (Entity|null)[][]
    public tiles: (Tile|null)[][]

    constructor(size:Point){
        this.size = size
        this.entities = []
        this.entityGrid = []
        this.tiles = []

        for (let i = 0; i < size.y; i++) {
            this.entityGrid.push([])
            this.tiles.push([])
            for (let j = 0; j < size.x; j++) {
                this.entityGrid[i].push(null)
                this.tiles[i].push(new Grass({x:j, y:i}))
            }
        }
    }

    public nextFrame(deltaTime:number, renderArea:{position:Point, size:Point} | null = null, priorityRenders:Animated[] = []):void{
        GroupAnimation.animations.forEach(x => x.nextFrame(deltaTime))

        if(!renderArea){
            for(let i = 0; i < this.size.y; ++i){
                for(let j = 0; j < this.size.x; ++j){
                    this.tiles[i]?.at(j)?.nextFrame(deltaTime)
                    this.entityGrid[i]?.at(j)?.nextFrame(deltaTime)
                }
            }
            return;
        }

        const xStart = renderArea.position.x
        const xEnd   = renderArea.position.x + renderArea.size.x

        const yStart = renderArea.position.y
        const yEnd   = renderArea.position.y + renderArea.size.y

        for(let i = yStart; i < yEnd; ++i){
            for(let j = xStart; j < xEnd; ++j){
                if(j < 0) continue;
                const tile = this.tiles[i]?.at(j)
                const entity = this.entityGrid[i]?.at(j)
                if(tile && !priorityRenders.includes(tile))
                    tile.nextFrame(deltaTime)
                if(entity && !priorityRenders.includes(entity))
                    entity.nextFrame(deltaTime)
            }
        }

        priorityRenders.forEach(x => {
            x.nextFrame(deltaTime)
        })
        
    }

    public addEntity(entity:Entity):void{
        console.log("add");
        const index = this.entities.indexOf(entity)
        if(index != -1) {
            if(entity.getGrid() != this) entity.setGrid(this)
            return
        }
        if(this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] != null){
            throw Error("This coordinate is taken")
        }
        this.entities.push(entity)
        this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = entity
        if(entity.getGrid() != this) entity.setGrid(this)
    }

    public removeEntity(entity:Entity):void{
        const index = this.entities.indexOf(entity)
        if(index != -1){
            this.entities.splice(index, 1)
            this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = null
        }
        if(entity.getGrid() == this){
            entity.setGrid(null)
        }
    }

}