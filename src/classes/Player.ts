import { Animation } from "./GameObjects/Animation";
import { ChainedAnimation } from "./GameObjects/ChainedAnimation";
import { PlayerUnit } from "./GameObjects/PlayerUnit";
import { Point } from "./GameObjects/Type/Point";
import { EquippableItem } from "./Items/Abstract/EquippableItem";
import { Inventory } from "./Items/Inventory";
import { Pickaxe } from "./Items/Pickaxe";
import { Shovel } from "./Items/Shovel";
import { Sword } from "./Items/Sword";

export class Player {
    private gold: number = 500;
    private energy: number = 0;
    public units: PlayerUnit[] = [];
    public curEquip: number = 0;

    //item effects
    //each item changes the level depending on the tier
    //Ex: Stone Pick = 1, Iron Pick = 2, Damascus Steel Pick = 3
    //this interacts with entityType and Level.

    private sword: Sword = new Sword();
    private shovel: Shovel = new Shovel();
    private pickaxe: Pickaxe = new Pickaxe();
    private inventory: Inventory | null = null;

    private EquipType: number = 0;
    private currentEquipped: EquippableItem | null = null;
    //this tells which item the player is holding
    //0 = not holding anything
    //1 = sword
    //2 = pickaxe
    //3 = shovel

    constructor() {
        const p1 = new PlayerUnit({ x: 1, y: 1 })
        p1.addAnimation(new ChainedAnimation(
            p1,
            "idle",
            Animation.assets['player_idle'],
            { x: 32, y: 32 },
            2,
            -1,
            1
        ))

        p1.createAnimation(
            "walk",
            Animation.assets['player_walk'],
            { x: 32, y: 32 },
            4,
            "",
            4
        )

        p1.createAnimation(
            "walk_reverse",
            Animation.assets['player_walk_reverse'],
            { x: 32, y: 32 },
            4,
            "",
            4
        )

        p1.setMoveSpeed(2);
        this.units.push(p1);
    }

    public getGold() {
        return this.gold;
    }

    public getEnergy() {
        return this.energy;
    }

    public addEnergy(x: number) {
        this.energy += x;
    }

    public useEnergy(x: number) {
        this.energy -= x;
    }

    public addGold(x: number) {
        this.gold += x;
    }

    public useGold(x: number) {
        this.gold -= x;
    }

    public action(price: number): Boolean {
        return this.energy >= price;
    }

    public getCoordinate(): Point {
        return this.units[0].getCoordinate();
    }

    public getEquipment(): number {
        return this.EquipType;
    }

    public getCurrentEquipment(): EquippableItem | null {
        return this.currentEquipped;
    }

    public setEquipment(x: number): void {
        this.EquipType = x;
    }

    public equip(item: EquippableItem): void {
        this.currentEquipped = item;
    }

    public getEquipmentLevels(): { sword: number, pickaxe: number, shovel: number } {
        // return { sword: this.swordLevel, pickaxe: this.pickaxeLevel, shovel: this.shovelLevel };
        const swordLevel: number = this.sword.getLevel();
        const pickaxeLevel: number = this.pickaxe.getLevel();
        const shovelLevel: number = this.shovel.getLevel();
        return { sword: swordLevel, pickaxe: pickaxeLevel, shovel: shovelLevel };
    }

    public getAllPlayerEquipment(): { sword: Sword, pickaxe: Pickaxe, shovel: Shovel } {
        return { sword: this.sword, pickaxe: this.pickaxe, shovel: this.shovel };
    }

    //testing
    public setEquipmentLevels(x: number): void {
        this.sword.setLevel(x);
        this.shovel.setLevel(x);
        this.pickaxe.setLevel(x);
    }

    public setInventory(inventory: Inventory): void {
        this.inventory = inventory;
        this.inventory.addItemInit(this);
    }

}

