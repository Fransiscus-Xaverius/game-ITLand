import { Book } from "./Items/Book";
import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";

export class Shop {
    private item: Item[];
    constructor() {
        this.item =
            [
                new Book("dist/Assets/Prototype/buku1.png", "Book"), new Book("dist/Assets/Prototype/buku1.png", "Book"), new Book("dist/Assets/Prototype/buku1.png", "Book"), new Book("dist/Assets/Prototype/buku1.png", "Book"),
            ];
    }

    public open(shopHTML: HTMLDivElement | null) {
        if (shopHTML) {
            shopHTML.innerHTML = ""
            // console.log(shopHTML)
            shopHTML.style.display = "grid";
            shopHTML.style.gridTemplateColumns = "1fr";
            for (let i = 0; i < this.item.length; i++) {
                // card shop
                let shopTemp = document.createElement('div') as HTMLDivElement;
                shopTemp.className = "card-shop";

                // image shop
                let shopImage = document.createElement("img") as HTMLImageElement;
                shopImage.className = "shop-img";
                shopImage.src = this.item[i].getImagePath();

                // desc shop
                let desc = document.createElement("div") as HTMLDivElement;
                desc.className = "desc";

                let itemName = document.createElement("div") as HTMLDivElement;
                itemName.className = "content item-name";
                itemName.innerHTML = this.item[i].getItemName();

                let mainDesc = document.createElement("div") as HTMLDivElement;
                mainDesc.className = "special-content main-desc";
                mainDesc.innerHTML = this.item[i].getItemDesc();

                let addBox = document.createElement("div") as HTMLDivElement;
                addBox.className = "content add-box";
                let itemQty = document.createElement("div") as HTMLDivElement;
                itemQty.className = "item-qty";
                let totalPrice = document.createElement("div") as HTMLDivElement;
                totalPrice.className = "total-price";
                addBox.appendChild(itemQty);
                addBox.appendChild(totalPrice);

                let buyButton = document.createElement("button") as HTMLButtonElement;
                buyButton.className = "content buy-button";
                buyButton.innerHTML = "Buy";

                desc.appendChild(itemName);
                desc.appendChild(mainDesc);
                desc.appendChild(addBox);
                desc.appendChild(buyButton);

                shopTemp.appendChild(shopImage);
                shopTemp.appendChild(desc);

                shopHTML.appendChild(shopTemp);
            }
            // console.log(shopTemp)
        }
    }
}