import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";
import { GroupAnimation } from "./GroupAnimation";

export class Gravel extends Tile implements IDestructable{

    constructor(coordinate:Point){
        super(coordinate, [], "gravel", 10, 2, 50, 150)
        this.addAnimation(GroupAnimation.animations[3])
        this.currentAnimationIndex = 0;
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }

}