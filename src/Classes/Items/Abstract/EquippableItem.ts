import { Item } from "../Item";
import { IEquippable } from "../Interface/IEquippable";

export abstract class EquippableItem extends Item implements IEquippable {
    private level: number = 1;
    private speed: number = 1;

    constructor(imagePath: string, itemName: string, itemDesc: string, itemPrice: number) {
        super(imagePath, itemName, itemDesc, itemPrice);
    }

    public getLevel(): number {
        return this.level;
    }

    public setLevel(level: number): void {
        this.level = level;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }
}