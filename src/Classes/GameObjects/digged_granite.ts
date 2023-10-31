import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";
import { GroupAnimation } from "./GroupAnimation";

export class DiggedGranite extends Tile implements IDestructable {
    constructor(coordinate:Point){
        super(coordinate,[],"digged_granite", 5, 1, 5, 40)
        this.addAnimation(GroupAnimation.animations[10])
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }

}