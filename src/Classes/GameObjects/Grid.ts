import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Point } from "./Point";
import { Grass } from "./Grass";
import { Animated } from "./Animated";
import { GroupAnimation } from "./GroupAnimation";
import { PlayerUnit } from "./PlayerUnit";
import { Sand } from "./Sand";
import { Gravel } from "./Gravel";
import { Rock } from "./Rock";
import { ChainedAnimation } from "./ChainedAnimation";
import { Animation } from "./Animation"
import { API } from "../API";

export class Grid{
    public readonly size:Point
    public entities: Entity[]
    public entityGrid: (Entity|null)[][]
    public tiles: (Tile|null)[][]
    public mapData: any

    constructor(size:Point){
        this.size = size
        this.entities = []
        this.entityGrid = []
        this.tiles = []
        // this.mapData = {
        //     map:[],
        //     entity:[]
        // };
        
        const fetchMapData = () => {
            try {
                return API.apiRequest();
                // alert(JSON.stringify(await API.apiRequest()));
            } catch (error) {
                return error;
            }
        }

        this.mapData = fetchMapData();
        alert(this.mapData);
        alert(JSON.stringify(this.mapData));

        for (let i = 0; i < size.y; i++) {
            this.entityGrid.push([])
            this.tiles.push([])
            for (let j = 0; j < size.x; j++) {
                this.entityGrid[i].push(null)
                if(i==0||j==0){
                    this.tiles[i].push(new Gravel({x:j, y:i}))
                    const rock = new Rock({x:j,y:i});
                        rock.addAnimation(new ChainedAnimation(
                            rock,
                            'rock',
                            Animation.assets['rock'],
                            {x:32,y:32},
                            1,
                            -1,
                            1
                        ))
                    this.addEntity(rock);
                }
                else{
                    if(Math.round(Math.random())){
                        this.tiles[i].push(new Grass({x:j, y:i}))
                    }
                    else{
                        if(Math.round(Math.random())){
                            this.tiles[i].push(new Sand({x:j, y:i}))
                        }
                        else{
                            this.tiles[i].push(new Gravel({x:j, y:i}))
                        }
                    }
                    if(Math.round(Math.random())&&(j!=1&&i!=1)){
                        const rock = new Rock({x:j,y:i});
                        rock.addAnimation(new ChainedAnimation(
                            rock,
                            'rock',
                            Animation.assets['rock'],
                            {x:32,y:32},
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(rock);
                    }
                }
            }
        }
    }

    public update(deltaTime:number, updateArea:{position:Point, size:Point} | null = null, priorityUpdate:Animated[] = []):void{
        GroupAnimation.animations.forEach(x => x.nextFrame(deltaTime))

        if(!updateArea){
            for(let i = 0; i < this.size.y; ++i){
                for(let j = 0; j < this.size.x; ++j){
                    this.tiles[i]?.at(j)?.nextFrame(deltaTime)
                    this.entityGrid[i]?.at(j)?.nextFrame(deltaTime)
                }
            }
            return;
        }

        const xStart = updateArea.position.x
        const xEnd   = updateArea.position.x + updateArea.size.x

        const yStart = updateArea.position.y
        const yEnd   = updateArea.position.y + updateArea.size.y

        for(let i = yStart; i < yEnd; ++i){
            for(let j = xStart; j < xEnd; ++j){
                if(j < 0) continue;
                const tile = this.tiles[i]?.at(j)
                const entity = this.entityGrid[i]?.at(j)
                if(tile && !priorityUpdate.includes(tile))
                    tile.nextFrame(deltaTime)
                if(entity && !priorityUpdate.includes(entity)){
                    if(entity instanceof PlayerUnit) entity.update(deltaTime);
                    entity.nextFrame(deltaTime)
                }
            }
        }

        priorityUpdate.forEach(x => {
            if(x instanceof PlayerUnit) x.update(deltaTime);
            x.nextFrame(deltaTime)
        })

        
    }

    public addEntity(entity:Entity):void{
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