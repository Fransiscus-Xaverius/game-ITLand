import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Chest extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Chest", 1, 10, 50, 5);
        const animation = new ChainedAnimation(
            this, 
            'chest',
            Animation.assets['chest_normal'],
            {x:32, y:32},
            1,
            -1,
            1
        )
    }

    getLoot = function(min:number, max:number):number{
        return Math.random() * (max - min) + min;
    }

}