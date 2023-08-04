import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Point } from "./Point";
import { Grass } from "./Grass";

export class Grid{
    public readonly size:Point
    public entities: Entity[]
    public entityGrid: (Entity|null)[][]
    public tiles: (Tile|null)[][]

    constructor(size:Point){
        this.size = size
        this.entities = []
        this.entityGrid = new Array(size.y).fill(new Array(size.x).fill(null))
        this.tiles = []

        for (let i = 0; i < size.y; i++) {
            this.tiles.push([])
            for (let j = 0; j < size.x; j++) {
                this.tiles[i].push(new Grass({x:j, y:i}))
            }
        }
    }

    public nextFrame(deltaTime:number):void{
        this.entities.forEach(x => {
            x.nextFrame(deltaTime)
        })

        this.tiles.forEach(x => {
            x.forEach(y => {
                y?.nextFrame(deltaTime)
            })
        })
    }


}