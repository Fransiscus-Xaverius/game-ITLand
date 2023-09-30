import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Gold_ore extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Gold_ore", 3, 80, 400, 40);
        const animation = new ChainedAnimation(
            this,
            'Gold_ore',
            Animation.assets['gold_ore'],
            {x:32,y:32},
            1,
            -1,
            1
        )
    }
}