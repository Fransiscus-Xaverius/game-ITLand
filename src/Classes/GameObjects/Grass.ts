import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";
import { GroupAnimation } from "./GroupAnimation";

export class Grass extends Tile implements IDestructable{
    
    constructor(coordinate:Point){
        super(coordinate, [], "grass", 5, 1, 5, 45)
        this.addAnimation(GroupAnimation.animations[0])
        this.addAnimation(GroupAnimation.animations[1])
        this.currentAnimationIndex = Math.round(Math.random())
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }
}