import { API } from "./API";
import { GameManager } from "./GameManager";
import { Animation } from "./GameObjects/Animation";
import { ChainedAnimation } from "./GameObjects/ChainedAnimation";
import { PlayerUnit } from "./GameObjects/PlayerUnit";
import { Point } from "./GameObjects/Type/Point";
import { EquippableItem } from "./Items/Abstract/EquippableItem";
import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";
import { Pickaxe } from "./Items/Pickaxe";
import { Shovel } from "./Items/Shovel";
import { Sword } from "./Items/Sword";
const { IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../config/env.json');
const { IronShovelImagePath, SilverShovelImagePath, GoldShovelImagePath } = require('../config/env.json');
const { IronPickaxeImagePath, SilverPickaxeImagePath, GoldPickaxeImagePath } = require('../config/env.json');

export class Player {
  private gold: number = 500;
  public energy: number = 0;
  public units: PlayerUnit[] = [];
  public curEquip: number = 0;

  //item effects
  //each item changes the level depending on the tier
  //Ex: Stone Pick = 1, Iron Pick = 2, Damascus Steel Pick = 3
  //this interacts with entityType and Level.
  private playerName: string | null;
  private sword: Sword = new Sword();
  private shovel: Shovel = new Shovel();
  private pickaxe: Pickaxe = new Pickaxe();
  private inventory: Inventory | null = null;
  private gameManager: GameManager | null = null;
  private currentEquipped: EquippableItem | null = null;
  //this tells which item the player is holding
  //0 = not holding anything
  //1 = sword
  //2 = pickaxe
  //3 = shovel

  constructor(x: number, y: number, gold: number, energy: number) {
    this.playerName = API.getPlayerName();
    const p1 = new PlayerUnit({ x: x, y: y });
    p1.addAnimation(
      new ChainedAnimation(
        p1,
        "idle",
        Animation.assets["player_idle"],
        { x: 32, y: 32 },
        2,
        -1,
        1
      )
    );

    p1.createAnimation(
      "walk_up",
      Animation.assets["player_walk_up"],
      { x: 32, y: 32 },
      4,
      "",
      4
    );

    p1.createAnimation(
      "walk_down",
      Animation.assets["player_walk_down"],
      { x: 32, y: 32 },
      4,
      "",
      4
    );

    p1.createAnimation(
      "walk_left",
      Animation.assets["player_walk_left"],
      { x: 32, y: 32 },
      4,
      "",
      4
    );

    p1.createAnimation(
      "walk_right",
      Animation.assets["player_walk_right"],
      { x: 32, y: 32 },
      4,
      "",
      4
    );

    p1.createAnimation(
      "mine_up",
      Animation.assets["mine_up"],
      { x: 32, y: 32 },
      5,
      "",
      10
    );

    p1.createAnimation(
      "mine_down",
      Animation.assets["mine_down"],
      { x: 32, y: 32 },
      5,
      "",
      10
    );

    p1.createAnimation(
      "mine_left",
      Animation.assets["mine_left"],
      { x: 32, y: 32 },
      5,
      "",
      10
    );

    p1.createAnimation(
      "mine_right",
      Animation.assets["mine_right"],
      { x: 32, y: 32 },
      5,
      "",
      10
    );

    p1.createAnimation(
      "dig",
      Animation.assets["dig"],
      { x: 32, y: 32 },
      8,
      "",
      15
    );

    p1.createAnimation(
      "break_up",
      Animation.assets["break_up"],
      { x: 32, y: 32 },
      5,
      "",
      10
    )

    p1.createAnimation(
      "break_down",
      Animation.assets["break_down"],
      { x: 32, y: 32 },
      5,
      "",
      10
    )

    p1.createAnimation(
      "break_left",
      Animation.assets["break_left"],
      { x: 32, y: 32 },
      5,
      "",
      10
    )

    p1.createAnimation(
      "break_right",
      Animation.assets["break_right"],
      { x: 32, y: 32 },
      5,
      "",
      10
    )

    p1.setMoveSpeed(2);
    this.units.push(p1);
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }
  public getPlayerName(): string | null {
    return this.playerName;
  }

  public getGold() {
    return this.gold;
  }

  public getEnergy() {
    return this.energy;
  }

  public setEnergy(x:number): void{
    this.energy = x;
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

  public getCurrentEquipment(): EquippableItem | null {
    return this.currentEquipped;
  }

  public equip(item: EquippableItem): void {
    this.currentEquipped = item;
    if (this.gameManager) {
      if (item instanceof Pickaxe) {
        this.gameManager.logActivity("Equipped Pickaxe");
      } else if (item instanceof Sword) {
        this.gameManager.logActivity("Equipped Sword");
      } else if (item instanceof Shovel) {
        this.gameManager.logActivity("Equipped Shovel");
      } else {
        this.gameManager.logActivity("Unequipped Tools");
      }
    }
  }

  public setGold(gold: number): void {
    this.gold = gold;
  }

  public setGameManager(gameManager: GameManager): void {
    this.gameManager = gameManager;
  }

  public getEquipmentLevels(): {
    sword: number;
    pickaxe: number;
    shovel: number;
  } {
    const swordLevel: number = this.sword.getLevel();
    const pickaxeLevel: number = this.pickaxe.getLevel();
    const shovelLevel: number = this.shovel.getLevel();
    return { sword: swordLevel, pickaxe: pickaxeLevel, shovel: shovelLevel };
  }

  public getAllPlayerEquipment(): {
    sword: Sword;
    pickaxe: Pickaxe;
    shovel: Shovel;
  } {
    return { sword: this.sword, pickaxe: this.pickaxe, shovel: this.shovel };
  }

  //testing
  public setEquipmentLevels(x: number): void {
    this.sword.setLevel(x);
    this.shovel.setLevel(x);
    this.pickaxe.setLevel(x);
  }
  public loadEquipmentLevels(pickaxeLevel:number,shovelLevel:number,swordLevel:number): void {
    this.sword.setLevel(swordLevel);
    switch(swordLevel){ 
      case 1:
        this.sword.setImagePath(IronSwordImagePath);
        break;
      case 2:
        this.sword.setImagePath(SilverSwordImagePath);
        break;
      case 3:
        this.sword.setImagePath(GoldSwordImagePath);
        break;
    }
    this.shovel.setLevel(shovelLevel);
    switch(shovelLevel){
      case 1:
        this.shovel.setImagePath(IronShovelImagePath);
        break;
      case 2:
        this.shovel.setImagePath(SilverShovelImagePath);
        break;
      case 3:
        this.shovel.setImagePath(GoldShovelImagePath);
        break;
    }
    this.pickaxe.setLevel(pickaxeLevel);
    switch(pickaxeLevel){
      case 1:
        this.pickaxe.setImagePath(IronPickaxeImagePath);
        break;
      case 2:
        this.pickaxe.setImagePath(SilverPickaxeImagePath);
        break;
      case 3:
        this.pickaxe.setImagePath(GoldPickaxeImagePath);
        break;
    }
  }

  public setSword(sword:Sword): void {
    this.sword = sword;
  } 

  public setPickaxe(pickaxe:Pickaxe): void { 
    this.pickaxe = pickaxe;
  }

  public setShovel(shovel:Shovel): void {
    this.shovel = shovel;
  }

  public upgradeSword(): void {
    this.sword.upgrade();
  }

  public upgradePickaxe(): void {
    this.pickaxe.upgrade();
  }
  
  public upgradeShovel(): void {
    this.shovel.upgrade();
  }

  public setInventory(inventory: Inventory): void {
    this.inventory = inventory;
    this.inventory.addItemInit(this);
    this.inventory.setPlayer(this);
  }
}
