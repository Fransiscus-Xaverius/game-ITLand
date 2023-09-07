import { Item } from "./Item";
import { IEquippable } from "./IEquippable";

export class Pickaxe extends Item implements IEquippable{
    private level:number = 1
    private speed:number = 1
    
}