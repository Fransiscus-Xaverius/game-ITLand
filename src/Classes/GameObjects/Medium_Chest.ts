import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class MediumChest extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Medium_Chest", 2, 150, 350, 10);
        const animation = new ChainedAnimation(
            this, 
            'medium_chest',
            Animation.assets['chest_medium'],
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