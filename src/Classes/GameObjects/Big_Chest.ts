import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class BigChest extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Big_Chest", 3, 350, 800, 20);
        const animation = new ChainedAnimation(
            this, 
            'big_chest',
            Animation.assets['chest_large'],
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