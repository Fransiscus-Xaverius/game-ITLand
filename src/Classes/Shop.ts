import { Book } from "./Items/Abstract/Book";
import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";
import { BookOfEnergyTier1 } from "./Items/BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./Items/BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./Items/BookOfEnergyT3";
import { Player } from "./Player";
import { Sword } from "./Items/Sword";
import { Shovel } from "./Items/Shovel";
import { Pickaxe } from "./Items/Pickaxe";
import { API } from "./API";
import { getAuthToken } from "../utils/authentication";
import { EquippableItem } from "./Items/Abstract/EquippableItem";
import { GameManager } from "./GameManager";

const {
  IronSwordImagePath,
  SilverSwordImagePath,
  GoldSwordImagePath,
} = require("../config/env.json");
const {
  IronShovelImagePath,
  SilverShovelImagePath,
  GoldShovelImagePath,
} = require("../config/env.json");
const {
  IronPickaxeImagePath,
  SilverPickaxeImagePath,
  GoldPickaxeImagePath,
} = require("../config/env.json");
const { GoldImagePath } = require("../config/env.json");

export class Shop {
  private item: Item[];
  private player: Player | null = null;
  private inventory: Inventory | null = null;
  private game: GameManager | null = null;

  constructor() {
    this.item = [
      new BookOfEnergyTier1(),
      new BookOfEnergyTier2(),
      new BookOfEnergyTier3(),
    ];
  }

  public upgradeSword(currentItem: EquippableItem, x: number): void {
    switch (x) {
      case 2:
        currentItem.setImagePath(SilverSwordImagePath);
        break;
      case 3:
        currentItem.setImagePath(GoldSwordImagePath);
        break;
      default:
        currentItem.setImagePath(IronSwordImagePath);
        break;
    }
  }

  public upgradeShovel(currentItem: EquippableItem, x: number): void {
    switch (x) {
      case 2:
        currentItem.setImagePath(SilverShovelImagePath);
        break;
      case 3:
        currentItem.setImagePath(GoldShovelImagePath);
        break;
      default:
        currentItem.setImagePath(IronShovelImagePath);
        break;
    }
  }

  public upgradePickaxe(currentItem: EquippableItem, x: number): void {
    switch (x) {
      case 2:
        currentItem.setImagePath(SilverPickaxeImagePath);
        break;
      case 3:
        currentItem.setImagePath(GoldPickaxeImagePath);
        break;
      default:
        currentItem.setImagePath(IronPickaxeImagePath);
        break;
    }
  }

  public setGame(game: GameManager | null) {
    this.game = game;
  }

  public loadShop = async () => {
    const data = await API.loadInventory(
      this.player?.getPlayerName() as string
    );

    const tempPickaxe = this.item[3] as Pickaxe;
    const tempSword = this.item[4] as Sword;
    const tempShovel = this.item[5] as Shovel;

    tempPickaxe.setLevel(data.pickaxeLevel+1);
    tempPickaxe.checkUpdateData();
    tempSword.setLevel(data.swordLevel+1);
    tempSword.checkUpdateData();
    tempShovel.setLevel(data.shovelLevel+1);
    tempShovel.checkUpdateData();

    this.item[3] = tempPickaxe;
    this.item[4] = tempSword;
    this.item[5] = tempShovel;
  };

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
        let tempItem = this.item[i];
        let isBuyable = false;
        if (tempItem instanceof EquippableItem) {
          let temp = tempItem as EquippableItem;
          if (temp.getLevel() <= 3) {
            isBuyable = true;
          }
        } else {
          isBuyable = true;
        }
        if (isBuyable) {
          // Card shop
          const shopTemp = document.createElement("div") as HTMLDivElement;
          shopTemp.className =
            "card-shop mb-3 w-full p-3 flex justify-content-between bg-white border border-black border-3 shadow";

          // Image shop
          const shopImage = document.createElement("img") as HTMLImageElement;
          shopImage.className = "shop-img h-100";
          shopImage.src = this.item[i].getImagePath();
          shopImage.draggable = false;

          // Description shop
          const desc = document.createElement("div") as HTMLDivElement;
          desc.className = "desc h-100 position-relative";
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
          if (!(this.item[i] instanceof EquippableItem)) {
            const minusBtn: HTMLDivElement = document.createElement("div");
            minusBtn.classList.add(
              "btn",
              "btn-danger",
              "p-0",
              "rounded-0",
              "border",
              "border-3",
              "border-black"
            );
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

            const itemQtyDiv: HTMLInputElement =
              document.createElement("input");
            itemQtyDiv.style.width = "90px";
            itemQtyDiv.style.height = "30px";
            itemQtyDiv.type = "number";
            itemQtyDiv.classList.add(
              "item-qty",
              `item-${i}`,
              "border",
              "border-3",
              "border-start-0",
              "border-end-0",
              "border-black"
            );
            itemQtyDiv.style.textAlign = "center";
            itemQtyDiv.value = "1";
            itemQtyDiv.min = "1";
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
                const totalPrice: number =
                  currentQty * this.item[i].getItemPrice();
                totalPriceDiv.textContent = `Gold ${totalPrice}`;
              } else {
                console.error(`Element with class .item-${i} not found.`);
              }
            });

            const plusBtn: HTMLDivElement = document.createElement("div");
            plusBtn.classList.add(
              "btn",
              "btn-success",
              "p-0",
              "rounded-0",
              "border",
              "border-3",
              "border-black"
            );
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
            colDiv1.appendChild(itemQtyDiv);
            colDiv1.appendChild(plusBtn);

            const colDiv2: HTMLDivElement = document.createElement("div");
            colDiv2.classList.add(
              "col-sm-6",
              `total-price-container-item-${i}`,
              "d-flex",
              "align-items-center",
              "position-relative"
            );

            const goldIcon: HTMLImageElement = document.createElement("img");
            goldIcon.src = GoldImagePath;
            goldIcon.className = "ms-2 me-2";
            goldIcon.style.width = "30px";
            goldIcon.draggable = false;

            const totalPriceDiv: HTMLDivElement = document.createElement("div");
            totalPriceDiv.classList.add("total-price", `total-price-item-${i}`);
            totalPriceDiv.textContent = `Gold ${
              parseInt(itemQtyDiv.value) * this.item[i].getItemPrice()
            }`;

            colDiv2.appendChild(goldIcon);
            colDiv2.appendChild(totalPriceDiv);

            addBox.appendChild(colDiv1);
            addBox.appendChild(colDiv2);
          } else {
            let equipment = this.item[i] as EquippableItem;
            if (equipment.getLevel() <= 3) {
              const colDiv2: HTMLDivElement = document.createElement("div");
              colDiv2.classList.add(
                "col-sm-6",
                `total-price-container-item-${i}`,
                "position-relative"
              );
              const totalPriceDiv: HTMLDivElement =
                document.createElement("div");
              totalPriceDiv.classList.add(
                "total-price",
                `total-price-item-${i}`
              );
              totalPriceDiv.textContent = `Gold ${this.item[i].getItemPrice()}`;
              colDiv2.appendChild(totalPriceDiv);

              addBox.appendChild(colDiv1);
              addBox.appendChild(colDiv2);
            }
          }
          const buyButton = document.createElement(
            "button"
          ) as HTMLButtonElement;
          buyButton.className =
            "content buy-button btn btn-primary w-100 mt-2 rounded-0 shadow border border-3 border-black position-absolute bottom-0 start-50 translate-middle-x";
          if (this.item[i] instanceof EquippableItem) {
            buyButton.innerHTML = "Upgrade";
            if ((this.item[i] as EquippableItem).getLevel() <= 3) {
              buyButton.onclick = () => {
                const currentItem = this.item[i];
                const totalPriceDiv = document.querySelector(
                  `.total-price-item-${i}`
                ) as HTMLDivElement;
                // const itemAmount: HTMLInputElement | null =
                //   document.querySelector(`.item-${i}`);
                const itemAmount: HTMLInputElement | null =
                  document.createElement("input") as HTMLInputElement;
                itemAmount.value = "1";

                if (itemAmount) {
                  if (totalPriceDiv) {
                    if (this.player) {
                      const goldDiv = document.querySelector(
                        "#goldAmount"
                      ) as HTMLDivElement;
                      let playerGold = 0;
                      if (goldDiv) {
                        playerGold = parseInt(
                          goldDiv.textContent!.split(" ")[1]
                        );
                      }
                      const priceContent = totalPriceDiv.textContent as string;
                      const price = parseInt(priceContent.split(" ")[1]);
                      if (playerGold >= price) {
                        const currentQty: number =
                          parseInt(itemAmount.value) || 0;
                        if (currentQty > 0) {
                          //   this.player.useGold(price);
                          const token: string | null = getAuthToken();
                          if (token) {
                            API.updateGold(token, -price);
                          }
                          if (currentItem instanceof EquippableItem) {
                            //basically what we need to do is to first check if the item is an equippable
                            //then we basically do nothing to said object and just go to the gameManager
                            //and from the gamemanager we do a force upgrade.

                            //TL;DR: this is fucking stupid but my hands and mind have forced me. Forgive me my son -Frans
                            if (currentItem instanceof Sword) {
                              this.game?.upgradeSword();
                              this.upgradeSword(
                                currentItem,
                                currentItem.getLevel() + 1
                              );
                            } else if (currentItem instanceof Pickaxe) {
                              this.game?.upgradePickaxe();
                              this.upgradePickaxe(
                                currentItem,
                                currentItem.getLevel() + 1
                              );
                            } else if (currentItem instanceof Shovel) {
                              this.game?.upgradeShovel();
                              this.upgradeShovel(
                                currentItem,
                                currentItem.getLevel() + 1
                              );
                            }
                            this.inventory?.addItemOwned(i, currentQty);
                            this.inventory?.saveInventory();
                            currentItem.upgrade();
                          } else {
                            this.inventory?.addItemOwned(i, currentQty);
                            this.inventory?.saveInventory();
                          }
                          this.open(shopHTML);
                        } else {
                          itemAmount.value = "1";
                          totalPriceDiv.textContent = `Gold ${
                            1 * this.item[i].getItemPrice()
                          }`;
                        }
                      } else {
                        alert("Not enough gold!");
                      }
                    }
                  }
                }
              };
            }
          } else {
            buyButton.innerHTML = "Buy";
            buyButton.onclick = () => {
              const currentItem = this.item[i];
              const totalPriceDiv = document.querySelector(
                `.total-price-item-${i}`
              ) as HTMLDivElement;
              const itemAmount: HTMLInputElement | null =
                document.querySelector(`.item-${i}`);

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
                      const currentQty: number =
                        parseInt(itemAmount.value) || 0;
                      if (currentQty > 0) {
                        //   this.player.useGold(price);
                        const token: string | null = getAuthToken();
                        if (token) {
                          API.updateGold(token, -price);
                        }
                        this.inventory?.addItemOwned(i, currentQty);
                        this.inventory?.saveInventory();
                      } else {
                        itemAmount.value = "1";
                        totalPriceDiv.textContent = `Gold ${
                          1 * this.item[i].getItemPrice()
                        }`;
                        this.inventory?.saveInventory();
                      }
                    } else {
                      alert("Not enough gold!");
                    }
                  }
                }
              }
            };
          }

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
}
