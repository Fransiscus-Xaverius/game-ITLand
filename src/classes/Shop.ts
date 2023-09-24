import { Book } from "./Items/Book";
import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";
import { BookOfEnergyTier1 } from "./Items/BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./Items/BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./Items/BookOfEnergyT3";
import { Player } from "./Player";

export class Shop {
    private item: Item[];
    private player: Player | null = null;
    private inventory: Inventory | null = null;

    constructor() {
        this.item =
            [
                new BookOfEnergyTier1(),
                new BookOfEnergyTier2(),
                new BookOfEnergyTier3(),
            ];
    }

    public setPlayer(player: Player | null) {
        this.player = player;
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
            shopHTML.innerHTML = ""
            // console.log(shopHTML)
            shopHTML.style.display = "grid";
            shopHTML.style.gridTemplateColumns = "1fr";
            for (let i = 0; i < this.item.length; i++) {
                // Card shop
                const shopTemp = document.createElement('div') as HTMLDivElement;
                shopTemp.className = 'card-shop';

                // Image shop
                const shopImage = document.createElement('img') as HTMLImageElement;
                shopImage.className = 'shop-img';
                shopImage.src = this.item[i].getImagePath();

                // Description shop
                const desc = document.createElement('div') as HTMLDivElement;
                desc.className = 'desc';

                const itemName = document.createElement('div') as HTMLDivElement;
                itemName.className = 'content item-name';
                itemName.innerHTML = this.item[i].getItemName();

                const mainDesc = document.createElement('div') as HTMLDivElement;
                mainDesc.className = 'special-content main-desc';
                mainDesc.innerHTML = this.item[i].getItemDesc();

                const addBox: HTMLDivElement = document.createElement('div');
                addBox.classList.add('row');

                const colDiv1: HTMLDivElement = document.createElement('div');
                colDiv1.classList.add('col-sm-2');
                const plusBtn: HTMLDivElement = document.createElement('div');
                plusBtn.classList.add('btn', 'btn-success');
                plusBtn.textContent = '+';
                plusBtn.addEventListener('click', () => {
                    const item: HTMLInputElement | null = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`) as HTMLDivElement;
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`) as HTMLDivElement;
                    if (item) {
                        const currentQty: number = parseInt(item.value) || 0;
                        item.value = `${currentQty + 1}`;
                        const totalPrice: number = parseInt(item.value) * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    } else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                });
                colDiv1.appendChild(plusBtn);

                const colDiv2: HTMLDivElement = document.createElement('div');
                colDiv2.classList.add('col-sm-2');
                const itemQtyDiv: HTMLInputElement = document.createElement('input');
                itemQtyDiv.style.width = '30px';
                itemQtyDiv.type = 'number';
                itemQtyDiv.classList.add('item-qty', `item-${i}`);
                itemQtyDiv.value = '1';
                itemQtyDiv.min = '1';
                itemQtyDiv.addEventListener('change', () => {
                    const item: HTMLInputElement | null = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`) as HTMLDivElement;
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`) as HTMLDivElement;
                    if (item) {
                        const currentQty: number = parseInt(item.value) || 0;
                        const totalPrice: number = currentQty * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    } else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                })
                colDiv2.appendChild(itemQtyDiv);

                const colDiv3: HTMLDivElement = document.createElement('div');
                colDiv3.classList.add('col-sm-2');
                const minusBtn: HTMLDivElement = document.createElement('div');
                minusBtn.classList.add('btn', 'btn-danger');
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () => {
                    const item: HTMLInputElement | null = document.querySelector(`.item-${i}`);
                    const totalPriceContainer = document.querySelector(`.total-price-container-item-${i}`) as HTMLDivElement;
                    const totalPriceDiv = totalPriceContainer.querySelector(`.total-price-item-${i}`) as HTMLDivElement;
                    if (item) {
                        const currentQty = parseInt(item.value) || 0;
                        if (currentQty > 1) {
                            item.value = `${currentQty - 1}`;
                        }
                        const totalPrice: number = parseInt(item.value) * this.item[i].getItemPrice();
                        totalPriceDiv.textContent = `Gold ${totalPrice}`;
                    } else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                });
                colDiv3.appendChild(minusBtn);

                const colDiv4: HTMLDivElement = document.createElement('div');
                colDiv4.classList.add('col-sm-6', `total-price-container-item-${i}`);
                const totalPriceDiv: HTMLDivElement = document.createElement('div');
                totalPriceDiv.classList.add('total-price', `total-price-item-${i}`);
                totalPriceDiv.textContent = `Gold ${parseInt(itemQtyDiv.value) * this.item[i].getItemPrice()}`;
                colDiv4.appendChild(totalPriceDiv);

                addBox.appendChild(colDiv1);
                addBox.appendChild(colDiv2);
                addBox.appendChild(colDiv3);
                addBox.appendChild(colDiv4);

                const buyButton = document.createElement('button') as HTMLButtonElement;
                buyButton.className = 'content buy-button';
                buyButton.innerHTML = 'Buy';
                buyButton.onclick = () => {
                    const currentItem = this.item[i];
                    const totalPriceDiv = document.querySelector(`.total-price-item-${i}`) as HTMLDivElement;
                    const itemAmount: HTMLInputElement | null = document.querySelector(`.item-${i}`);

                    if (itemAmount) {
                        if (totalPriceDiv) {
                            if (this.player) {
                                const playerGold = this.player.getGold() as number;
                                const priceContent = totalPriceDiv.textContent as string;
                                // const price = parseInt(priceContent.split(' ')[1]);
                                const price = 10;
                                if (playerGold >= price) {
                                    const currentQty: number = parseInt(itemAmount.value) || 0;
                                    this.player.useGold(price);
                                    const goldDiv = document.querySelector("#goldAmount") as HTMLDivElement;
                                    if (goldDiv) {
                                        goldDiv!.innerHTML = `Gold: ${this.player?.getGold()}`;
                                    }
                                    this.inventory?.addItemOwned(i,currentQty);
                                } else {
                                    alert('Not enough gold!');
                                }
                            }
                        }
                    }
                    // const item: HTMLInputElement | null = document.querySelector(`.item-${i}`);
                    // if (item) {
                    //     const currentQty: number = parseInt(item.value) || 0;
                    //     const totalPrice = this.totalPrice(i, currentQty);

                    // }
                }

                desc.appendChild(itemName);
                desc.appendChild(mainDesc);
                desc.appendChild(addBox);
                desc.appendChild(buyButton);

                shopTemp.appendChild(shopImage);
                shopTemp.appendChild(desc);
                shopHTML.appendChild(shopTemp);
                shopHTML.style.height = '200px';
                shopHTML.style.overflow = 'auto';
            }
        }
    }
}