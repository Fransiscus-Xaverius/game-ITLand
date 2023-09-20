import { Entity } from "./Entity";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Iron_ore extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Iron_ore", 2);
        const animation = new ChainedAnimation(
            this,
            'Iron_ore',
            Animation.assets['iron_ore'],
            {x:32,y:32},
            1,
            -1,
            1
        )
    }
}