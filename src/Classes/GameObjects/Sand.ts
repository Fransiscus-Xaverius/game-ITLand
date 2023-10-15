import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";
import { GroupAnimation } from "./GroupAnimation";

export class Sand extends Tile implements IDestructable{

    constructor(coordinate:Point){
        super(coordinate, [], "sand", 5, 1, 10, 50)
        this.addAnimation(GroupAnimation.animations[2])
        
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }

}