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

                // let addBox = document.createElement("div") as HTMLDivElement;
                // addBox.className = "content add-box";
                // let itemQty = document.createElement("div") as HTMLDivElement;
                // itemQty.className = "item-qty";
                // let totalPrice = document.createElement("div") as HTMLDivElement;
                // totalPrice.className = "total-price";
                // addBox.appendChild(itemQty);
                // addBox.appendChild(totalPrice);

                const addBox: HTMLDivElement = document.createElement('div');
                addBox.classList.add('row');

                const colDiv1: HTMLDivElement = document.createElement('div');
                colDiv1.classList.add('col-sm-2');
                const plusBtn: HTMLDivElement = document.createElement('div');
                plusBtn.classList.add('btn', 'btn-success');
                plusBtn.textContent = '+';
                plusBtn.addEventListener("click", () => {
                    const item: HTMLDivElement | null = document.querySelector(`.item-${i}`);
                    if (item) {
                        const currentQty = parseInt(item.innerText) || 0;
                        item.innerText = `${currentQty + 1}`;
                    } else {
                        console.error(`Element with class .item-${i} not found.`);
                    }
                })
                colDiv1.appendChild(plusBtn);

                const colDiv2: HTMLDivElement = document.createElement('div');
                colDiv2.classList.add('col-sm-2');
                const itemQtyDiv: HTMLDivElement = document.createElement('div');
                itemQtyDiv.classList.add('item-qty', `item-${i}`);
                itemQtyDiv.textContent = '10';
                colDiv2.appendChild(itemQtyDiv);

                const colDiv3: HTMLDivElement = document.createElement('div');
                colDiv3.classList.add('col-sm-2');
                const minusBtn: HTMLDivElement = document.createElement('div');
                minusBtn.classList.add('btn', 'btn-danger');
                minusBtn.textContent = '-';
                colDiv3.appendChild(minusBtn);

                const colDiv4: HTMLDivElement = document.createElement('div');
                colDiv4.classList.add('col-sm-6');
                const totalPriceDiv: HTMLDivElement = document.createElement('div');
                totalPriceDiv.classList.add('total-price');
                totalPriceDiv.textContent = 'Gold 10';
                colDiv4.appendChild(totalPriceDiv);

                addBox.appendChild(colDiv1);
                addBox.appendChild(colDiv2);
                addBox.appendChild(colDiv3);
                addBox.appendChild(colDiv4);


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
                shopHTML.style.height = "200px";
                shopHTML.style.overflow = "auto";
            }
            // console.log(shopTemp)
        }
    }
}