import { ItemStack } from "./Type/ItemStack";
import { BookOfEnergyTier1 } from "./BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./BookOfEnergyT3";
import { Book } from "./Abstract/Book";
import { Player } from "../Player";
import { ConsumableItem } from "./Abstract/ConsumableItem";
import { EquippableItem } from "./Abstract/EquippableItem";
import { EquipState, EquipmentStatus } from "./Enum/ItemRelated.enum";
import { API } from "../API";
import { Pickaxe } from "./Pickaxe";
import { Sword } from "./Sword";
import { Shovel } from "./Shovel";
import { Shop } from "../Shop";

const {
  IronSwordImagePath,
  SilverSwordImagePath,
  GoldSwordImagePath,
} = require("../../config/env.json");
const {
  IronShovelImagePath,
  SilverShovelImagePath,
  GoldShovelImagePath,
} = require("../../config/env.json");
const {
  IronPickaxeImagePath,
  SilverPickaxeImagePath,
  GoldPickaxeImagePath,
} = require("../../config/env.json");

export class Inventory {
  private items: ItemStack[];
  private itemEquipState: EquipState[];
  private player: Player | null = null;

  constructor() {
    this.items = [] as Array<ItemStack>;
    this.itemEquipState = [] as Array<EquipState>;
    this.items.push({
      item: new BookOfEnergyTier1(),
      amount: 0,
    });
    this.itemEquipState.push(EquipState.UNEQUIPPED);
    this.items.push({
      item: new BookOfEnergyTier2(),
      amount: 0,
    });
    this.itemEquipState.push(EquipState.UNEQUIPPED);
    this.items.push({
      item: new BookOfEnergyTier3(),
      amount: 0,
    });
    this.itemEquipState.push(EquipState.UNEQUIPPED);
  }

  public setPlayer(player: Player): void {
    this.player = player;
  }

  public addItemInit(player: Player): void {
    const playerEquipments = player?.getAllPlayerEquipment();
    const pickaxe = playerEquipments?.pickaxe;
    const sword = playerEquipments?.sword;
    const shovel = playerEquipments?.shovel;

    if (pickaxe) {
      this.items.push({
        item: pickaxe,
        amount: 1,
      });
      this.itemEquipState.push(EquipState.UNEQUIPPED);
    }
    if (sword) {
      this.items.push({
        item: sword,
        amount: 1,
      });
      this.itemEquipState.push(EquipState.UNEQUIPPED);
    }
    if (shovel) {
      this.items.push({
        item: shovel,
        amount: 1,
      });
      this.itemEquipState.push(EquipState.UNEQUIPPED);
    }
  }

  public addItemOwned(index: number, amount: number): void {
    this.items[index].amount += amount;
  }
  // public decreaseItemOwned(index: number, amount: number): void {
  //   this.items[index].amount -= amount;
  //   const currentQty = document.querySelector(`.item-owned-qty-${index}`);
  //   if (currentQty) {
  //     currentQty.innerHTML = `${this.items[index].amount}`;
  //   }
  // }

  // public refreshInventory

  public saveInventory() {
    const dataToSend = {
      username: this.player?.getPlayerName() as string,
      B1_amount: this.items[0].amount,
      B2_amount: this.items[1].amount,
      B3_amount: this.items[2].amount,
      pickaxeLevel: this.items[3].amount,
      swordLevel: this.items[4].amount,
      shovelLevel: this.items[5].amount,
    };

    API.sendInventory(
      dataToSend.username,
      dataToSend.B1_amount,
      dataToSend.B2_amount,
      dataToSend.B3_amount,
      dataToSend.pickaxeLevel,
      dataToSend.shovelLevel,
      dataToSend.swordLevel
    );
  }
  public async loadInventory() {
    const data = await API.loadInventory(
      this.player?.getPlayerName() as string
    );
    this.items[0].amount = data.B1_amount;
    this.items[1].amount = data.B2_amount;
    this.items[2].amount = data.B3_amount;

    this.items[3].amount = data.pickaxeLevel;
    this.items[4].amount = data.swordLevel;
    switch (data.swordLevel) {
      case 1:
        this.items[4].item.setImagePath(IronSwordImagePath);
        break;
      case 2:
        this.items[4].item.setImagePath(SilverSwordImagePath);
        break;
      case 3:
        this.items[4].item.setImagePath(GoldSwordImagePath);
        break;
    }
    this.items[5].amount = data.shovelLevel;
    this.player?.loadEquipmentLevels(
      this.items[3].amount,
      this.items[4].amount,
      this.items[5].amount
    );

    const tempPickaxe = this.items[3].item as Pickaxe;
    const tempSword = this.items[4].item as Sword;
    const tempShovel = this.items[5].item as Shovel;

    tempPickaxe.setLevel(data.pickaxeLevel);
    tempPickaxe.checkUpdateData();
    tempSword.setLevel(data.swordLevel);
    tempSword.checkUpdateData();
    tempShovel.setLevel(data.shovelLevel);
    tempShovel.checkUpdateData();

    this.items[3].item = tempPickaxe;
    this.items[4].item = tempSword;
    this.items[5].item = tempShovel;
  }

  public open(inventoryShopElement: HTMLDivElement | null): void {
    if (!inventoryShopElement) return;

    inventoryShopElement.innerHTML = "";

    const cardContainer = document.querySelector(
      ".shop-inventory"
    ) as HTMLDivElement;
    cardContainer.classList.add("p-3");
    let index = 0;

    for (const { item, amount } of this.items) {
      const cardElement = document.createElement("div");
      cardElement.classList.add(
        "card",
        "float-start",
        "me-3",
        "mb-3",
        "p-3",
        "border",
        "border-3",
        "border-black",
        "rounded-0",
        "shadow",
        "position-relative"
      );
      cardElement.style.width = "46%";

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("w-100", "d-flex", "justify-content-center");

      const imageElement = document.createElement("img");
      imageElement.classList.add("inventory-item-image", "h-100");
      imageElement.src = item.getImagePath();
      imageElement.alt = "";
      imageElement.draggable = false;

      imgDiv.appendChild(imageElement);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const nameElement = document.createElement("h5");
      nameElement.classList.add(
        "inventory-item-name",
        "card-text",
        "text-center"
      );
      nameElement.innerText = item.getItemName();

      const ownedElement = document.createElement("h6");
      ownedElement.classList.add(
        "inventory-item-owned",
        "card-title",
        `item-owned-qty-${index}`,
        "text-center"
      );

      const itemUseButton = document.createElement("button");

      if (item instanceof ConsumableItem) {
        ownedElement.innerText = `Owned: ${amount}`;
        itemUseButton.textContent = "Consume";
        itemUseButton.classList.add(
          "Consume",
          `consume-item-${index}`,
          "btn",
          "btn-success",
          "w-75",
          "rounded-0",
          "shadow",
          "border",
          "border-3",
          "border-black",
          "position-absolute",
          "start-50",
          "translate-middle-x"
        );
        itemUseButton.style.bottom = "15px";

        // Create a function to handle the click event
        const handleItemClick = () => {
          if (amount > 0) {
            if (this.player) {
              if (item instanceof Book) {
                // Access the button's class using the `itemUseButton` reference
                const currIndex: number = parseInt(
                  itemUseButton.className.split(" ")[1].split("-")[2]
                );
                if (this.items[currIndex].amount > 0) {
                  const energyRestored = item.useItem();
                  this.player.addEnergy(energyRestored);
                  this.items[currIndex].amount -= 1;
                  const currentQty = document.querySelector(
                    `.item-owned-qty-${currIndex}`
                  ) as HTMLHeadingElement | null;
                  if (currentQty) {
                    currentQty.innerHTML = `Owned: ${this.items[currIndex].amount}`;
                  }
                  this.saveInventory();
                }
              }
            }
          }
        };

        itemUseButton.addEventListener("click", handleItemClick);
      } else if (item instanceof EquippableItem) {
        ownedElement.innerText = `Level: ${amount}`;
        itemUseButton.textContent =
          itemUseButton.textContent == EquipmentStatus.EQUIPPED
            ? EquipmentStatus.EQUIPPED
            : EquipmentStatus.CAN_BE_EQUIP;
        itemUseButton.classList.add(
          "Equip",
          "btn",
          "btn-primary",
          "w-75",
          "rounded-0",
          "shadow",
          "border",
          "border-3",
          "border-black",
          "position-absolute",
          "start-50",
          "translate-middle-x"
        );
        itemUseButton.style.bottom = "15px";
        itemUseButton.addEventListener("click", () => {
          if (this.player) {
            this.itemEquipState.forEach((e) => {
              e = EquipState.UNEQUIPPED;
            });
            const allItemsOwned: NodeListOf<HTMLHeadingElement> =
              document.querySelectorAll(".Equip");
            // allItemsOwned.forEach((e) => {
            //   e.innerText = EquipmentStatus.CAN_BE_EQUIP;
            // });
            this.saveInventory();
            this.player.equip(item);
            this.itemEquipState[index] = EquipState.EQUIPPED;
            itemUseButton.textContent = EquipmentStatus.EQUIPPED;
          }
        });
      }

      cardBody.appendChild(nameElement);
      cardBody.appendChild(ownedElement);
      cardBody.appendChild(itemUseButton);

      cardElement.appendChild(imgDiv);
      cardElement.appendChild(cardBody);

      cardContainer.appendChild(cardElement);
      index++;
    }
  }
}
