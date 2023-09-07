import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { GroupAnimation } from "./GroupAnimation";

export class Gravel extends Tile implements IDestructable{

    constructor(coordinate:Point){
        super(coordinate)
        this.addAnimation(GroupAnimation.animations[3])
        this.currentAnimationIndex = 0;
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }

}