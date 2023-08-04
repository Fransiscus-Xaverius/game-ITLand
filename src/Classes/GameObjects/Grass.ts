import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Point";

export class Grass extends Tile implements IDestructable{
    
    constructor(coordinate:Point){
        super(coordinate)
        this.addAnimation(new Animation(
            this, 
            "grass", 
            document.querySelector("#itland_ptype_grasstile") as HTMLImageElement, 
            {x:32, y:32}, 
            1, 
            -1, 
            0
        ))
        this.addAnimation(new Animation(
            this, 
            "flower_grass", 
            document.querySelector("#itland_ptype_flowergrasstile") as HTMLImageElement, 
            {x:32, y:32}, 
            2, 
            -1, 
            1
        ))

        this.currentAnimationIndex = Math.round(Math.random())
    }

    public step(stepper: Entity): void {
        throw new Error("Method not implemented.");
    }
}