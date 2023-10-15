import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";
import { GroupAnimation } from "./GroupAnimation";
import { DiggedGround } from "./digged_ground";

export class Ground extends Tile implements IDestructable {
    constructor(coordinate:Point){
        super(coordinate,[],"ground", 5, 1, 5, 40)
        this.addAnimation(GroupAnimation.animations[4])
        this.addDigForm(new DiggedGround(coordinate))
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }

}