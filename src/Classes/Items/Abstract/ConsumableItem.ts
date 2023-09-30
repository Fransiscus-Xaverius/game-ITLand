import { Item } from "../Item";
import { IConsumable } from "../Interface/IConsumable";

export abstract class ConsumableItem extends Item implements IConsumable {
    constructor(imagePath: string, itemName: string, itemDesc: string, itemPrice: number) {
        super(imagePath, itemName, itemDesc, itemPrice);
    }
}