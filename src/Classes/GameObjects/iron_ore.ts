import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Iron_ore extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Iron_ore", 2, 75, 175, 15);
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