import { ItemStack } from "./ItemStack";
import { Item } from "./Item";

export class Inventory {
    private items: ItemStack[]
    constructor() {
        this.items = []
    }
    public open(inventoryShopElement: HTMLDivElement | null) {
        if (inventoryShopElement) {
            inventoryShopElement.innerHTML = ""
            // Create the card element
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            // Create the image element
            const imageElement = document.createElement('img');
            imageElement.classList.add('inventory-item-image');
            imageElement.src = ''; // Set the image source as needed
            imageElement.alt = ''; // Set the alt text as needed

            // Create the name element
            const nameElement = document.createElement('p');
            nameElement.classList.add('inventory-item-name');

            // Create the owned element
            const ownedElement = document.createElement('h4');
            ownedElement.classList.add('inventory-item-owned');

            // Append the child elements to the card element
            cardElement.appendChild(imageElement);
            cardElement.appendChild(nameElement);
            cardElement.appendChild(ownedElement);

            // You can then append the cardElement to your container element
            const cardContainer = document.getElementById('card-container'); // Assuming you have a container element in your HTML
            if (cardContainer) {
                cardContainer.appendChild(cardElement);
            }
        }
    }
}