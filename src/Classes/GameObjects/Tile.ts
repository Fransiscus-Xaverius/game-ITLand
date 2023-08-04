import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";

export abstract class Tile extends Animated{
    public static defaultTileResolution:Point = {x:32, y:32}
    public readonly coordinate:Point;

    constructor(coordinate:Point, animations:Animation[] = []){
        super(animations)
        this.coordinate = coordinate
    }

    public abstract step(stepper:Entity):void
}