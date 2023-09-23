import { ItemStack } from "./ItemStack";
import { Book } from "./Book";

export class Inventory {
    private items: ItemStack[];

    constructor() {
        this.items = Array.from({ length: 10 }, () => ({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        }));
    }

    public open(inventoryShopElement: HTMLDivElement | null) {
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

            cardBody.appendChild(nameElement);
            cardBody.appendChild(ownedElement);

            cardElement.appendChild(imageElement);
            cardElement.appendChild(cardBody);

            cardContainer.appendChild(cardElement);
        }
    }
}