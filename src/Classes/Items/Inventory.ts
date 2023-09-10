import { ItemStack } from "./ItemStack";
import { Item } from "./Item";
import { Book } from "./Book";

export class Inventory {
    private items: ItemStack[];
    constructor() {
        this.items = []
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
        this.items.push({
            item: new Book("./dist/Assets/Prototype/buku1.png", "Book"),
            amount: 0
        })
    }
    public open(inventoryShopElement: HTMLDivElement | null) {
        if (inventoryShopElement) {
            inventoryShopElement.innerHTML = ""
            for (let i = 0; i < this.items.length; i++) {
                // Create the card element
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                // Create the image element
                const imageElement = document.createElement('img');
                imageElement.classList.add('inventory-item-image');
                imageElement.classList.add('card-img-top');
                imageElement.src = this.items[i].item.getImagePath();
                imageElement.alt = ``

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                // Create the name element
                const nameElement = document.createElement('p');
                nameElement.classList.add('inventory-item-name');
                nameElement.classList.add('card-text');
                nameElement.innerText = this.items[i].item.getItemName()

                // Create the owned element
                const ownedElement = document.createElement('h4');
                ownedElement.classList.add('inventory-item-owned');
                ownedElement.classList.add('card-title');
                ownedElement.innerText = `${this.items[i].amount}`


                // Append the child elements to the card element
                cardBody.appendChild(nameElement);
                cardBody.appendChild(ownedElement);

                cardElement.appendChild(imageElement);
                cardElement.appendChild(cardBody);

                // You can then append the cardElement to your container element
                const cardContainer = document.querySelector('.shop-inventory'); // Assuming you have a container element in your HTML
                if (cardContainer) {
                    cardContainer.appendChild(cardElement);
                }
            }

        }
    }
}