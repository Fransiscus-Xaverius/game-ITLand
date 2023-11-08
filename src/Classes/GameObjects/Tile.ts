import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";

export abstract class Tile extends Animated{
    public static defaultTileResolution:Point = {x:32, y:32}
    public readonly coordinate:Point;
    public name:String;
    public requiredEnergy:number;
    public level:number;
    protected minValue:number;
    protected maxValue:number;
    private digForm:Tile | null = null;

    constructor(coordinate:Point, animations:Animation[] = [], name:string, requiredEnergy:number, level:number, minValue:number, maxValue:number){
        super(animations)
        this.coordinate = coordinate
        this.name = name;
        this.requiredEnergy = requiredEnergy;
        this.level = level;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    public addDigForm(tile:Tile){
        this.digForm = tile;
    }

    public getDigForm():Tile|null{
        return this.digForm;
    }

    public getRequiredEnergy():number{
        if(this.requiredEnergy!=null) return this.requiredEnergy;
        //if required energy is null then it will return -1
        else return -1;
    }

    public getCoordinate():Point{
        return this.coordinate;
    }

    public getTileName():String{
        if(this.name){
            return this.name;
        }
        return "";
    }

    public tileDrop():number{
        if(this.minValue!=null&&this.maxValue!=null){
            return Math.round(Math.random() * (this.maxValue - this.minValue + 1) + this.minValue)
        }
        else{
            return 0; //if this returns into 0 there's sumting wong
        }
    }

    public abstract step(stepper:Entity):void
}