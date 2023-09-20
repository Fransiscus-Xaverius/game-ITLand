import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Grid } from "./Grid";
import { Point } from "./Point";

export abstract class Entity extends Animated{
    protected coordinate:Point
    protected grid:Grid | null = null
    protected entityType:number | null = null
    protected entityLevel:number | null = null
    protected entityName:string | null = null

    constructor(coordinate:Point, animations:Animation[] = [], entityName:string, entityLevel:number){
        super(animations)
        this.coordinate = coordinate
        this.entityName = entityName
        this.entityLevel = entityLevel
    }

    public getCoordinate():Point{
        return this.coordinate;
    }

    public getEntityName():String{
        if(this.entityName){
            return this.entityName;
        }
        return "";
    }

    public setCoordinate(value:Point, triggerTile?:boolean):void{
        if(this.grid){
            const row = this.grid.entityGrid[value.y]
            if(!row) {
                throw Error('index out of bounds')
            }

            const entity = row[value.x]
            if(entity === undefined) {
                throw Error('index out of bounds')
            }

            if(entity !== null) {
                throw Error('coordinate is not empty')
            }

            this.grid.entityGrid[this.coordinate.y][this.coordinate.x] = null;
            row[value.x] = this;
            this.coordinate = value;
            if(triggerTile) this.grid.tiles[value.y][value.x]?.step(this);
            return;
        }
        this.coordinate = value;
    }

    public getGrid():Grid|null{
        return this.grid
    }

    public setGrid(grid:Grid|null):void{
        if(this.grid == grid && (grid == null || grid?.entities.includes(this))) return
        if(grid != null){
            if(grid.entityGrid.length <= this.coordinate.y || this.coordinate.y < 0) throw Error("This entity's coordinates are out of bounds for the grid")
            if(grid.entityGrid[0].length <= this.coordinate.x || this.coordinate.x < 0) throw Error("This entity's coordinates are out of bounds for the grid")
        }
        if(this.grid != null) {
            this.grid.removeEntity(this)
        }
        this.grid = grid
        this.grid?.addEntity(this)
    }

    public getEntityLevel(){
        return this.entityLevel;
    }

    public setEntityLevel(x:number):void{
        this.entityLevel = x;
    }

}