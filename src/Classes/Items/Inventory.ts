import { ItemStack } from "./ItemStack";
import { BookOfEnergyTier1 } from "./BookOfEnergyT1";
import { BookOfEnergyTier2 } from "./BookOfEnergyT2";
import { BookOfEnergyTier3 } from "./BookOfEnergyT3";
import { Book } from "./Book";

export class Inventory {
    private readonly items: ItemStack[];

    constructor() {
        this.items = [
            {
                item: new BookOfEnergyTier1(),
                amount: 0
            },
            {
                item: new BookOfEnergyTier2(),
                amount: 0
            },
            {
                item: new BookOfEnergyTier3(),
                amount: 0
            }
        ];
    }

    public addItemOwned(index: number, amount: number): void {
        this.items[index].amount += amount;
    }

    public open(inventoryShopElement: HTMLDivElement | null): void {
        if (!inventoryShopElement) return;

        inventoryShopElement.innerHTML = "";

        const cardContainer = document.querySelector('.shop-inventory') as HTMLDivElement;
        cardContainer.style.display = "grid";
        cardContainer.style.gridTemplateColumns = "1fr 1fr";
        cardContainer.style.height = "200px";
        cardContainer.style.overflow = "auto";

        for (const { item, amount } of this.items) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            const imageElement = document.createElement('img');
            imageElement.classList.add('inventory-item-image', 'card-img-top');
            imageElement.src = item.getImagePath();
            imageElement.alt = ``

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const nameElement = document.createElement('p');
            nameElement.classList.add('inventory-item-name', 'card-text');
            nameElement.innerText = item.getItemName();

            const ownedElement = document.createElement('h4');
            ownedElement.classList.add('inventory-item-owned', 'card-title');
            ownedElement.innerText = `${amount}`;
            
            const itemUseButton = document.createElement('button');

            if (item instanceof Book) {
                itemUseButton.textContent = "Consume";
                itemUseButton.classList.add('Consume');
            }

            cardBody.appendChild(nameElement);
            cardBody.appendChild(ownedElement);
            cardBody.appendChild(itemUseButton);

            cardElement.appendChild(imageElement);
            cardElement.appendChild(cardBody);

            cardContainer.appendChild(cardElement);
        }
    }
}