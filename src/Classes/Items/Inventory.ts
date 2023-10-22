import { ItemStack } from "./Type/ItemStack";
import { BookOfEnergyTier1 } from "./BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./BookOfEnergyT3";
import { Book } from "./Abstract/Book";
import { Player } from "../Player";
import { ConsumableItem } from "./Abstract/ConsumableItem";
import { EquippableItem } from "./Abstract/EquippableItem";

export class Inventory {
  private items: ItemStack[];
  private player: Player | null = null;

  constructor() {
    this.items = [];
    this.items.push({
      item: new BookOfEnergyTier1(),
      amount: 0,
    });
    this.items.push({
      item: new BookOfEnergyTier2(),
      amount: 0,
    });
    this.items.push({
      item: new BookOfEnergyTier3(),
      amount: 0,
    });
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
      this.items.push({ item: pickaxe, amount: 1 });
    }
    if (sword) {
      this.items.push({ item: shovel, amount: 1 });
    }
    if (shovel) {
      this.items.push({ item: sword, amount: 1 });
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

  public open(inventoryShopElement: HTMLDivElement | null): void {
    if (!inventoryShopElement) return;

    inventoryShopElement.innerHTML = "";

    const cardContainer = document.querySelector(
      ".shop-inventory"
    ) as HTMLDivElement;
    cardContainer.style.display = "grid";
    cardContainer.style.gridTemplateColumns = "1fr 1fr";
    cardContainer.style.height = "200px";
    cardContainer.style.overflow = "auto";
    let index = 0;

    for (const { item, amount } of this.items) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      const imageElement = document.createElement("img");
      imageElement.classList.add("inventory-item-image", "card-img-top");
      imageElement.src = item.getImagePath();
      imageElement.alt = "";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const nameElement = document.createElement("p");
      nameElement.classList.add("inventory-item-name", "card-text");
      nameElement.innerText = item.getItemName();

      const ownedElement = document.createElement("h4");
      ownedElement.classList.add(
        "inventory-item-owned",
        "card-title",
        `item-owned-qty-${index}`
      );
      ownedElement.innerText = `${amount}`;

      const itemUseButton = document.createElement("button");

      if (item instanceof ConsumableItem) {
        itemUseButton.textContent = "Consume";
        itemUseButton.classList.add("Consume", `consume-item-${index}`);

        // Create a function to handle the click event
        const handleItemClick = () => {
          if (amount > 0) {
            if (this.player) {
              if (item instanceof Book) {
                const energyRestored = item.useItem();
                this.player.addEnergy(energyRestored);

                // Access the button's class using the `itemUseButton` reference
                const currIndex: number = parseInt(
                  itemUseButton.className.split(" ")[1].split("-")[2]
                );
                if (this.items[currIndex].amount > 0) {
                  this.items[currIndex].amount -= 1;

                  // Update the quantity displayed
                  const currentQty = document.querySelector(
                    `.item-owned-qty-${currIndex}`
                  ) as HTMLHeadingElement | null;

                  if (currentQty) {
                    currentQty.innerHTML = `${this.items[currIndex].amount}`;
                  }
                }
              }
            }
          }
        };

        itemUseButton.addEventListener("click", handleItemClick);
      } else if (item instanceof EquippableItem) {
        itemUseButton.textContent = "Equip";
        itemUseButton.classList.add("Equip");
        itemUseButton.addEventListener("click", () => {
          if (this.player) {
            this.player.equip(item);
          }
        });
      }

      cardBody.appendChild(nameElement);
      cardBody.appendChild(ownedElement);
      cardBody.appendChild(itemUseButton);

      cardElement.appendChild(imageElement);
      cardElement.appendChild(cardBody);

      cardContainer.appendChild(cardElement);
      index++;
    }
  }
}
