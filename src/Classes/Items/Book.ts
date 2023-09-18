import { IEquippable } from "./IEquippable";
import { Item } from "./Item";

//book is not equipable, rather a consumeable.

export class Book extends Item implements IEquippable {
    constructor(imagePath: string, itemName: string) {
        super(imagePath, itemName, "book 1",1000);
    }
}