import { Inventory } from "./Items/Inventory";
import { Item } from "./Items/Item";

export class Shop {
    private item: Item[] = ["hello1", "hello1", "hello1"];
    public open(shopHTML: HTMLDivElement | null) {
        if (shopHTML) {
            shopHTML.innerHTML = ""
            // console.log(shopHTML)
            let shopTemp: HTMLDivElement | null = document.createElement('div');
            shopTemp.className = "shop"
            for (let i = 0; i < this.item.length; i++) {
                let shop1 = document.createElement('div') as HTMLDivElement;
                shop1.className = `${this.item[i]} item-in-shop`;
                shopTemp.appendChild(shop1);
            }
            shopHTML.appendChild(shopTemp)
            // console.log(shopTemp)
        }
    }
}