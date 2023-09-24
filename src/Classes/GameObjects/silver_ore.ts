import { Entity } from "./Entity";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Silver_ore extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Silver_ore", 2, 40, 200, 25);
        const animation = new ChainedAnimation(
            this,
            'Silver_ore',
            Animation.assets['silver_ore'],
            {x:32,y:32},
            1,
            -1,
            1
        )
    }
}