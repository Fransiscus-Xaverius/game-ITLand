import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { GroupAnimation } from "./GroupAnimation";

export class Grass extends Tile implements IDestructable{
    
    constructor(coordinate:Point){
        super(coordinate)
        this.addAnimation(GroupAnimation.animations[0])
        this.addAnimation(GroupAnimation.animations[1])
        this.currentAnimationIndex = Math.round(Math.random())
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }
}