import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Point } from "./Type/Point";
import { Grass } from "./Grass";
import { Animated } from "./Animated";
import { GroupAnimation } from "./GroupAnimation";
import { PlayerUnit } from "./PlayerUnit";
import { Sand } from "./Sand";
import { Gravel } from "./Gravel";
import { Rock } from "./Rock";
import { Chest } from "./Chest";
import { ChainedAnimation } from "./ChainedAnimation";
import { Animation } from "./Animation"
import { API } from "../API";
import { Gold_ore } from "./gold_ore";
import { Silver_ore } from "./silver_ore";
import { Iron_ore } from "./iron_ore";
import { Granite } from "./Granite";
import { Ground } from "./Ground";

export class Grid {
    public readonly size: Point
    public entities: Entity[]
    public entityGrid: (Entity | null)[][]
    public tiles: (Tile | null)[][]
    public mapData: any

    constructor(size: Point) {
        this.size = size
        this.entities = []
        this.entityGrid = []
        this.tiles = []
    }

    public async redo(map: string[], entity: string[]){
        for (let i = 0; i < this.size.y; i++) {
            this.entityGrid.push([])
            this.tiles.push([])
            for (let j = 0; j < this.size.x; j++) {
                this.entityGrid[i].push(null)
                switch(map[j][i]){
                    case 'grass':
                        this.tiles[i].push(new Grass({x:j,y:i}));
                        break;
                    case 'sand':
                        this.tiles[i].push(new Sand({x:j,y:i}));
                        break;
                    case 'gravel':
                        this.tiles[i].push(new Gravel({x:j, y:i}));
                        break;
                    case 'granite':
                        this.tiles[i].push(new Granite({x:j, y:i}));
                        break;
                    case 'cave':
                        this.tiles[i].push(new Ground({x:j, y:i}));
                        break;
                    default:
                        this.tiles[i].push(new Grass({x:j, y:i}));
                        break;
                }

                switch(entity[j][i]){
                    case 'rock':
                        const rock = new Rock({ x: j, y: i });
                        rock.addAnimation(new ChainedAnimation(
                            rock,
                            'rock',
                            Animation.assets['rock'],
                            { x: 32, y: 32 },
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(rock);
                        break;
                    case 'iron_ore':
                        const iron_ore = new Iron_ore({ x: j, y: i });
                        iron_ore.addAnimation(new ChainedAnimation(
                            iron_ore,
                            'Iron_ore',
                            Animation.assets['iron_ore'],
                            {x:32,y:32},
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(iron_ore);
                        break;
                    case 'silver_ore':
                        const silver_ore = new Silver_ore({ x: j, y: i });
                        silver_ore.addAnimation(new ChainedAnimation(
                            silver_ore,
                            'Silver_ore',
                            Animation.assets['silver_ore'],
                            {x:32,y:32},
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(silver_ore);
                        break;
                    case 'gold_ore':
                        const gold_ore = new Gold_ore({ x: j, y: i });
                        gold_ore.addAnimation(new ChainedAnimation(
                            gold_ore,
                            'Gold_ore',
                            Animation.assets['gold_ore'],
                            {x:32,y:32},
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(gold_ore);
                        break;
                    case 'chest':
                        const chest = new Chest({x:j, y:i});
                        chest.addAnimation(new ChainedAnimation(
                            chest,
                            'chest',
                            Animation.assets['chest_normal'],
                            {x:32, y:32},
                            1,
                            -1,
                            1
                        ))
                        this.addEntity(chest);
                        break;
                    case 'medium_chest':
                        break;
                    case 'big_chest':
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public update(deltaTime: number, updateArea: { position: Point, size: Point } | null = null, priorityUpdate: Animated[] = []): void {
        GroupAnimation.animations.forEach(x => x.nextFrame(deltaTime))

        if (!updateArea) {
            for (let i = 0; i < this.size.y; ++i) {
                for (let j = 0; j < this.size.x; ++j) {
                    this.tiles[i]?.at(j)?.nextFrame(deltaTime)
                    this.entityGrid[i]?.at(j)?.nextFrame(deltaTime)
                    
                }
            }
            return;
        }

        const xStart = updateArea.position.x
        const xEnd = updateArea.position.x + updateArea.size.x

        const yStart = updateArea.position.y
        const yEnd = updateArea.position.y + updateArea.size.y

        for (let i = yStart; i < yEnd; ++i) {
            for (let j = xStart; j < xEnd; ++j) {
                if (j < 0) continue;
                const tile = this.tiles[i]?.at(j)
                const entity = this.entityGrid[i]?.at(j)
                if (tile && !priorityUpdate.includes(tile))
                    tile.nextFrame(deltaTime)
                if (entity && !priorityUpdate.includes(entity)) {
                    if (entity instanceof PlayerUnit) entity.update(deltaTime);
                    entity.nextFrame(deltaTime)
                }
            }
        }

        priorityUpdate.forEach(x => {
            if (x instanceof PlayerUnit) x.update(deltaTime);
            x.nextFrame(deltaTime)
        })


    }

    public addEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity)
        if (index != -1) {
            if (entity.getGrid() != this) entity.setGrid(this)
            return
        }
        if (this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] != null) {
            throw Error("This coordinate is taken")
        }
        this.entities.push(entity)
        this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = entity
        if (entity.getGrid() != this) entity.setGrid(this)
    }

    public getEntity(x:number, y:number){
        return this.entityGrid[y][x];
    }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity)
        if (index != -1) {
            this.entities.splice(index, 1)
            this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = null
        }
        if (entity.getGrid() == this) {
            entity.setGrid(null)
        }
    }
}