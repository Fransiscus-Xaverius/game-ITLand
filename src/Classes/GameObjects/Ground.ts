import { Tile } from "./Tile";
import { IDestructable } from "./Interface/IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";

export class Ground extends Tile implements IDestructable {


    public step(stepper: Entity): void {
        throw new Error("Method not implemented.");
    }

}