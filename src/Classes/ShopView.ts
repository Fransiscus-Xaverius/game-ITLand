import { Shop } from "./Shop";

export class ShopView {
    private shop: Shop | null = null
    private shopButton: HTMLButtonElement | null = null
    private inventoryShopElement: HTMLDivElement | null = null

    constructor(shopButton: HTMLButtonElement, shop: Shop, inventoryShopElement: HTMLDivElement) {
        this.setShop(shop)
        this.setShopButton(shopButton)
        this.setInventoryShopElement(inventoryShopElement)
    }


    private initShopButton(): void {
        if (this.shopButton) {
            this.shopButton?.addEventListener('click', () => {
                if (this.shop) {
                    this.shop.open(this.getInventoryShopElement());
                }
            });
        }
    }

    public setInventoryShopElement(inventoryShopElement: HTMLDivElement | null): void {
        this.inventoryShopElement = inventoryShopElement;
    }

    public getInventoryShopElement(): HTMLDivElement | null {
        return this.inventoryShopElement;
    }

    public setShopButton(shopButton: HTMLButtonElement | null): void {
        this.shopButton = shopButton;
        this.initShopButton();
    }

    public getShopButton(): HTMLButtonElement | null {
        return this.shopButton;
    }

    public setShop(value: Shop | null): void {
        this.shop = value
    }

    public getShop(): Shop | null {
        return this.shop;
    }
}