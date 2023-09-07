import { Item } from "./Item";
import { IEquippable } from "./IEquippable";

export class Shovel extends Item implements IEquippable{
    private level:number = 1
    private speed:number = 1
}