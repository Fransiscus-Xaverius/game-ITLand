import { IConsumable } from "./IConsumable";
import { Item } from "./Item";

//book is not equipable, rather a consumeable.

export abstract class Book extends Item implements IConsumable {
    constructor(imagePath: string, itemName: string, itemDesc: string, itemPrice: number) {
        super(imagePath, itemName, itemDesc, itemPrice);
    }
}