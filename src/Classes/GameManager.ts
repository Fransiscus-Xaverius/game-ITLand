import { TerminalView } from "./TerminalView";
import { Grid } from "./GameObjects/Grid";
import { CanvasView } from "./CanvasView";
import { GroupAnimation } from "./GameObjects/GroupAnimation";
import { Player } from "./Player";
import { Direction } from "./GameObjects/Direction";
import { PlayerUnit } from "./GameObjects/PlayerUnit";
import { ShopView } from "./ShopView";
import { API } from "./API";
import { Entity } from "./GameObjects/Entity";
import { InventoryView } from "./InventoryView";
import { Map } from "./Map";
import { Question } from "./Question";
import { QuestionView } from "./QuestionView";
import { Rock } from "./GameObjects/Rock";
import { Shop } from "./Shop";
import { Inventory } from "./Items/Inventory";
import { Point } from "./GameObjects/Type/Point";
import { EquippableItem } from "./Items/Abstract/EquippableItem";
import { Pickaxe } from "./Items/Pickaxe";
import { Sword } from "./Items/Sword";
import { Shovel } from "./Items/Shovel";
import { json } from "stream/consumers";
import { LeaderboardView } from "./LeaderboardView";

export class GameManager {
  public api: API | null = null;
  private lastTimeStamp: number = 0;
  private deltaTime: number = 0;
  private isRunning: Boolean = false;
  private animationFrameId: number = -1;
  private player: Player = new Player(1, 1, 0, 0);
  private terminalView: TerminalView | null = null;
  private grid: Grid = new Grid({ x: 100, y: 100 });
  private canvasView: CanvasView | null = null;
  private activePlayerUnit: PlayerUnit | null = null;
  private shopView: ShopView | null = null;
  private inventoryView: InventoryView | null = null;
  private leaderboardView: LeaderboardView | null = null;
  private questionView: QuestionView | null = null;
  private token: string = "";

  constructor(
    canvasView: CanvasView | null = null,
    terminalView: TerminalView | null = null,
    shopView: ShopView | null,
    inventoryView: InventoryView | null = null,
    questionView: QuestionView | null = null,
    leaderboardView: LeaderboardView | null = null
  ) {
    this.setCanvasView(canvasView);
    this.setTerminalView(terminalView);
    this.setShopView(shopView);
    this.setInventoryView(inventoryView);
    this.api = new API();
    this.setQuestionView(questionView);
    this.setLeaderboardView(leaderboardView);
  }

  // public addToInventory(index: number, amount: number) {
  //     this.inventoryView?.getInventory()?.addItemOwned(index, amount);
  // }

  public setLeaderboardView(leaderboardView: LeaderboardView | null) {
    if (leaderboardView) {
      this.leaderboardView = leaderboardView;
      this.leaderboardView.setPlayer(this.player);
    }
  }

  public setInventory() {
    const tempInventory: any = this.inventoryView?.getInventory();
    this.shopView?.setInventory(tempInventory);
    this.player.setInventory(tempInventory);
    this.player.setGameManager(this);
  }

  public async load(token: string) {
    this.token = token;
    this.shopView?.setPlayer(this.player);
    // alert('await load');
    let map: Map = { tile: [], entity: [] };
    map = await this.api?.gameStart()!; //use non-null assertion operator.
    // alert(map.tile.length);
    let playerdata = await this.api?.initializePlayer(1, 1, 0);
    this.player = new Player(
      Number(playerdata!.x),
      Number(playerdata!.y),
      0,
      Number(playerdata!.energy)
    );
    //redoing load grid because the constructor cannot be an async function.
    this.grid = new Grid({ x: 100, y: 100 });
    this.grid.redo(map.tile, map.entity);
    this.grid.addEntity(this.player.units[0]);
    this.setActivePlayerUnit(this.player.units[0]);
    this.questionView?.setPlayer(this.player);
    await this.questionView?.load();
    this.questionView?.refreshStats();
    this.setInventory();
  }

  public async tick() {
    await this.api?.subtick(
      this.player.getCoordinate().x,
      this.player.getCoordinate().y,
      this.player.getEnergy()
    );
    const curGold = await this.api?.getGold(this.token);
    const jsonString = await curGold!.text();
    const jsonData = JSON.parse(jsonString);
    this.player.setGold(parseInt(jsonData.gold));
    this.questionView?.refreshStats();
  }

  public getQuestionView(): QuestionView | null {
    return this.questionView;
  }

  public setInventoryView(inventoryView: InventoryView | null): void {
    this.inventoryView = inventoryView;
  }

  public getInventoryView(): InventoryView | null {
    return this.inventoryView;
  }

  public async testAPIsoal() {
    const string1 = await this.api?.getQuestion();
    return string1;
  }

  public logActivity(str: string): void {
    const terminal = this.terminalView?.getTextArea();
    if (terminal) {
      terminal.value = `\n${str}`;
    }
  }

  public async removeGridEntity(x: number, y: number) {
    const entName = this.grid.entityGrid[y][x]?.getEntityName();
    const drop = this.grid.entityGrid[y][x]?.entityDrop()!;
    // const transaction = this.api?.updateGold(this.token, drop);
    const transaction = API.updateGold(this.token, drop);
    this.player.addGold(drop);
    this.logActivity(`Destroyed a ${entName} and got ${drop} gold coins!`);
    this.questionView?.refreshStats();
    this.grid.entityGrid[y][x] = null;
    await this.api?.removeEntity(y, x);
  }

  public alertEntity(): void {
    console.log(this.grid.entities);
  }

  public setShopView(shopView: ShopView | null) {
    this.shopView = shopView;
  }
  public getShopView(): ShopView | null {
    return this.shopView;
  }

  public getDeltatime(): number {
    return this.deltaTime;
  }

  //change current equipment
  public changeEquipment() {}

  public isGoodEnough(level: number, target: number): boolean {
    return level >= target;
  }

  //commit action

  //actionType:
  //1 = mine
  //2 = break

  //Direction.Under = dig

  public Action(direction: Direction, tools: EquippableItem) {
    const coords = this.player.getCoordinate();
    const temp = this.getGridEntity(coords, direction);
    if (!temp) {
      alert("No entity object");
      return;
    }
    if (tools instanceof Pickaxe) {
      this.actionWithPickaxe(temp);
    } else if (tools instanceof Sword) {
      this.actionWithSword(temp);
    } else if (tools instanceof Shovel) {
      this.actionWithShovel(temp);
    } else {
      this.alertEquipSomething();
    }
  }

  private getGridEntity(coords: Point, direction: Direction): Entity | null {
    switch (direction) {
      case Direction.Up:
        return this.grid.getEntity(coords.x, coords.y - 1);
      case Direction.Down:
        return this.grid.getEntity(coords.x, coords.y + 1);
      case Direction.Left:
        return this.grid.getEntity(coords.x - 1, coords.y);
      case Direction.Right:
        return this.grid.getEntity(coords.x + 1, coords.y);
      case Direction.Under:
        return null; // TODO: implement shovel action
      default:
        return null;
    }
  }

  private alertEquipSomething() {
    alert("Equip something");
  }

  private actionWithPickaxe(entity: Entity) {
    const entityName = entity.getEntityName();
    if (
      entityName == "Rock" ||
      entityName == "Iron_ore" ||
      entityName == "Silver_ore" ||
      entityName == "Gold_ore"
    ) {
      if (
        this.isGoodEnough(this.player.getEnergy(), entity.getRequiredEnergy())
      ) {
        if (
          this.isGoodEnough(
            this.player.getEquipmentLevels().pickaxe,
            entity.getEntityLevel()!
          )
        ) {
          this.removeGridEntity(
            entity.getCoordinate().x,
            entity.getCoordinate().y
          );
          this.player.useEnergy(entity.getRequiredEnergy());
          this.questionView?.refreshStats();
        } else {
          this.logActivity(`Upgrade your pickaxe to destroy this block!`);
        }
      } else {
        this.logActivity(`You need more energy to do this action!`);
      }
    } else {
      this.logActivity(
        "You cannot use a pickaxe to break this object! (wrong equipment used)"
      );
    }
  }

  private actionWithSword(entity: Entity) {
    switch (entity.getEntityName()) {
      case "Chest":
        alert("This is a chest");
        this.removeGridEntity(
          entity.getCoordinate().x,
          entity.getCoordinate().y
        );
        break;
      default:
        alert("This is the wrong tool!");
        break;
    }
  }

  private actionWithShovel(entity: Entity) {
    switch (entity.getEntityName()) {
      case "":
      default:
        alert("This is the wrong tool!");
        break;
    }
  }

  public setActivePlayerUnit(value: PlayerUnit | null): void {
    this.terminalView?.setTerminal(value?.terminal ?? null);
    this.activePlayerUnit = value;
  }

  public setQuestionView(questionView: QuestionView | null): void {
    this.questionView = questionView;
  }

  public getActivePlayerUnit() {
    return this.activePlayerUnit;
  }

  public getPlayer() {
    return this.player;
  }

  public setCanvasView(canvasView: CanvasView | null): void {
    this.canvasView = canvasView;
  }

  public setTerminalView(terminalView: TerminalView | null): void {
    terminalView?.setTerminal(this.activePlayerUnit?.terminal ?? null);
    this.terminalView?.setTerminal(null);
    this.terminalView = terminalView;
  }

  public start(): void {
    if (this.isRunning) return;
    const run = (timestamp: number): void => {
      this.deltaTime = (timestamp - this.lastTimeStamp) / 1000;
      this.update();
      this.render();
      this.lastTimeStamp = timestamp;
      this.animationFrameId = requestAnimationFrame(run);
    };

    this.animationFrameId = requestAnimationFrame(run);
  }

  public pause(): void {
    if (!this.isRunning) return;
    cancelAnimationFrame(this.animationFrameId);
  }

  private update(): void {
    if (!this.canvasView) {
      this.grid.update(this.deltaTime);
      return;
    }
    this.canvasView.setCameraPosition(
      this.activePlayerUnit?.getSpriteCoordinate() || { x: 0, y: 0 }
    );
    const camPos = this.canvasView.getCameraPosition();
    const scaledRenderRadius = this.canvasView.getScaledRenderRadius();
    this.grid.update(
      this.deltaTime,
      {
        position: {
          x: Math.floor(camPos.x - scaledRenderRadius),
          y: Math.floor(camPos.y - scaledRenderRadius),
        },
        size: {
          x: Math.ceil(scaledRenderRadius * 2),
          y: Math.ceil(scaledRenderRadius * 2),
        },
      },
      this.player.units
    );
  }

  private render(): void {
    this.canvasView?.render(this.grid);
    this.canvasView
      ?.getContext()
      ?.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80);
  }

  public buyInit(): void {
    const shopItem = document.querySelectorAll(
      ".card-shop"
    ) as NodeListOf<HTMLDivElement>;
  }
}
