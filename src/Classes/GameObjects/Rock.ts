import { Entity } from "./Entity";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Point } from "./Type/Point";
import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";

export class Rock extends Entity implements IDestructable{
    constructor(coordinate:Point, animations:Animation[] = []){
        super(coordinate,animations, "Rock", 1, 10, 50, 5);
        const animation = new ChainedAnimation(
            this,
            'rock',
            Animation.assets['rock'],
            {x:32,y:32},
            1,
            -1,
            1
        )
    }
}