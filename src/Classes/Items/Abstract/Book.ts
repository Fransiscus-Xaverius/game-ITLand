import { ConsumableItem } from "./ConsumableItem";

//book is not equipable, rather a consumeable.

export abstract class Book extends ConsumableItem {
    constructor(imagePath: string, itemName: string, itemDesc: string, itemPrice: number) {
        super(imagePath, itemName, itemDesc, itemPrice);
    }
}