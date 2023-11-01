import { Book } from "./Items/Abstract/Book";
import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";
import { BookOfEnergyTier1 } from "./Items/BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./Items/BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./Items/BookOfEnergyT3";
import { Player } from "./Player";
import { Sword } from "./Items/Sword";
import { Pickaxe } from "./Items/Pickaxe";
import { API } from "./API";
import { getAuthToken } from "../utils/authentication";

export class Shop {
  private item: Item[];
  private player: Player | null = null;
  private inventory: Inventory | null = null;

  constructor() {
    this.item = [
      new BookOfEnergyTier1(),
      new BookOfEnergyTier2(),
      new BookOfEnergyTier3(),
    ];
  }

  public setPlayer(player: Player | null) {
    this.player = player;
    const playerEquipments = this.player?.getAllPlayerEquipment();
    const pickaxe = playerEquipments?.pickaxe;
    const sword = playerEquipments?.sword;
    const shovel = playerEquipments?.shovel;
    if (pickaxe) {
      this.item.push(pickaxe);
    }
    if (sword) {
      this.item.push(sword);
    }
    if (shovel) {
      this.item.push(shovel);
    }
  }
  public setInventory(inventory: Inventory | null) {
    this.inventory = inventory;
  }

  public totalPrice(itemIndex: number, qty: number) {
    const currentItem = this.item[itemIndex];
    const currentPrice = currentItem.getItemPrice();
    const totalPrice = currentPrice * qty;
    return totalPrice;
  }
  public open(shopHTML: HTMLDivElement | null) {
    if (shopHTML) {
      shopHTML.innerHTML = "";
      // console.log(shopHTML)
      for (let i = 0; i < this.item.length; i++) {
        // Card shop
        const shopTemp = document.createElement("div") as HTMLDivElement;
        shopTemp.className = "card-shop mb-3 w-full p-3 flex justify-content-between bg-white border border-1 shadow";

        // Image shop
        const shopImage = document.createElement("img") as HTMLImageElement;
        shopImage.className = "shop-img h-100";
        shopImage.src = this.item[i].getImagePath();

        // Description shop
        const desc = document.createElement("div") as HTMLDivElement;
        desc.className = "desc h-100";
        desc.style.width = "60%";

        const itemName = document.createElement("div") as HTMLDivElement;
        itemName.className = " fs-5 w-100";
        itemName.innerHTML = this.item[i].getItemName();

        const mainDesc = document.createElement("div") as HTMLDivElement;
        mainDesc.className = " w-100 mb-3";
        mainDesc.innerHTML = this.item[i].getItemDesc();

        const addBox: HTMLDivElement = document.createElement("div");
        addBox.className = "d-flex w-100";

        const colDiv1: HTMLDivElement = document.createElement("div");
        colDiv1.classList.add("col-sm-6", "d-flex", "align-items-center");
        
        const minusBtn: HTMLDivElement = document.createElement("div");
        minusBtn.classList.add("btn", "btn-danger", "p-0", "rounded-0");
        minusBtn.style.width = "45px";
        minusBtn.style.height = "30px";
        minusBtn.textContent = "-";
        minusBtn.addEventListener("click", () => {
          const item: HTMLInputElement | null = document.querySelector(
            `.item-${i}`
          );
          const totalPriceContainer = document.querySelector(
            `.total-price-container-item-${i}`
          ) as HTMLDivElement;
          const totalPriceDiv = totalPriceContainer.querySelector(
            `.total-price-item-${i}`
          ) as HTMLDivElement;
          if (item) {
            const currentQty = parseInt(item.value) || 0;
            if (currentQty > 1) {
              item.value = `${currentQty - 1}`;
            }
            const totalPrice: number =
              parseInt(item.value) * this.item[i].getItemPrice();
            totalPriceDiv.textContent = `Gold ${totalPrice}`;
          } else {
            console.error(`Element with class .item-${i} not found.`);
          }
        });

        const itemQtyDiv: HTMLInputElement = document.createElement("input");
        itemQtyDiv.style.width = "70px";
        itemQtyDiv.style.height = "30px";
        itemQtyDiv.type = "number";
        itemQtyDiv.classList.add("item-qty", `item-${i}`, "ps-4");
        itemQtyDiv.value = "1";
        itemQtyDiv.min = "1";
        itemQtyDiv.disabled = true;
        itemQtyDiv.addEventListener("change", () => {
          const item: HTMLInputElement | null = document.querySelector(
            `.item-${i}`
          );
          const totalPriceContainer = document.querySelector(
            `.total-price-container-item-${i}`
          ) as HTMLDivElement;
          const totalPriceDiv = totalPriceContainer.querySelector(
            `.total-price-item-${i}`
          ) as HTMLDivElement;
          if (item) {
            const currentQty: number = parseInt(item.value) || 0;
            if (currentQty < 1) {
              item.innerHTML = "1";
            }
            const totalPrice: number = currentQty * this.item[i].getItemPrice();
            totalPriceDiv.textContent = `Gold ${totalPrice}`;
          } else {
            console.error(`Element with class .item-${i} not found.`);
          }
        });

        const plusBtn: HTMLDivElement = document.createElement("div");
        plusBtn.classList.add("btn", "btn-success", "p-0", "rounded-0");
        plusBtn.style.width = "45px";
        plusBtn.style.height = "30px";
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => {
          const item: HTMLInputElement | null = document.querySelector(
            `.item-${i}`
          );
          const totalPriceContainer = document.querySelector(
            `.total-price-container-item-${i}`
          ) as HTMLDivElement;
          const totalPriceDiv = totalPriceContainer.querySelector(
            `.total-price-item-${i}`
          ) as HTMLDivElement;
          if (item) {
            const currentQty: number = parseInt(item.value) || 0;
            item.value = `${currentQty + 1}`;
            const totalPrice: number =
              parseInt(item.value) * this.item[i].getItemPrice();
            totalPriceDiv.textContent = `Gold ${totalPrice}`;
          } else {
            console.error(`Element with class .item-${i} not found.`);
          }
        });

        colDiv1.appendChild(minusBtn);
        colDiv1.appendChild(itemQtyDiv)
        colDiv1.appendChild(plusBtn);

        const colDiv2: HTMLDivElement = document.createElement("div");
        colDiv2.classList.add("col-sm-6", `total-price-container-item-${i}`);
        const totalPriceDiv: HTMLDivElement = document.createElement("div");
        totalPriceDiv.classList.add("total-price", `total-price-item-${i}`);
        totalPriceDiv.textContent = `Gold ${
          parseInt(itemQtyDiv.value) * this.item[i].getItemPrice()
        }`;
        colDiv2.appendChild(totalPriceDiv);

        addBox.appendChild(colDiv1);
        addBox.appendChild(colDiv2);

        const buyButton = document.createElement("button") as HTMLButtonElement;
        buyButton.className = "content buy-button btn btn-primary w-100 mt-2 rounded-0 shadow";
        buyButton.innerHTML = "Buy";
        buyButton.onclick = () => {
          const currentItem = this.item[i];
          const totalPriceDiv = document.querySelector(
            `.total-price-item-${i}`
          ) as HTMLDivElement;
          const itemAmount: HTMLInputElement | null = document.querySelector(
            `.item-${i}`
          );

          if (itemAmount) {
            if (totalPriceDiv) {
              if (this.player) {
                const goldDiv = document.querySelector(
                  "#goldAmount"
                ) as HTMLDivElement;
                let playerGold = 0;
                if (goldDiv) {
                  playerGold = parseInt(goldDiv.textContent!.split(" ")[1]);
                }
                const priceContent = totalPriceDiv.textContent as string;
                const price = parseInt(priceContent.split(" ")[1]);
                if (playerGold >= price) {
                  const currentQty: number = parseInt(itemAmount.value) || 0;
                  if (currentQty > 0) {
                    //   this.player.useGold(price);
                    const token: string | null = getAuthToken();
                    if (token) {
                      API.updateGold(token, -price);
                    }
                    alert(playerGold + " " + price);
                    this.inventory?.addItemOwned(i, currentQty);
                  } else {
                    itemAmount.value = "1";
                    totalPriceDiv.textContent = `Gold ${1 * this.item[i].getItemPrice()}`;
                  }
                } else {
                  alert("Not enough gold!");
                }
              }
            }
          }
        };

        desc.appendChild(itemName);
        desc.appendChild(mainDesc);
        desc.appendChild(addBox);
        desc.appendChild(buyButton);

        shopTemp.appendChild(shopImage);
        shopTemp.appendChild(desc);
        shopHTML.appendChild(shopTemp);
      }
    }
  }
}