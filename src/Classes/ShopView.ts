import { Shop } from "./Shop";

export class ShopView {
    private shop: Shop | null;
    private shopButton: HTMLButtonElement | null;
    private inventoryShopElement: HTMLDivElement | null;

    constructor(shopButton: HTMLButtonElement, shop: Shop, inventoryShopElement: HTMLDivElement) {
        this.shop = shop;
        this.inventoryShopElement = inventoryShopElement;
        this.shopButton = shopButton;
        this.initShopButton();
    }

    private initShopButton(): void {
        if (this.shopButton) {
            this.shopButton.addEventListener('click', () => {
                this.openShop();
            });
        }
    }

    private openShop(): void {
        if (this.shop) {
            this.shop.open(this.inventoryShopElement);
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
        this.shop = value;
    }

    public getShop(): Shop | null {
        return this.shop;
    }
}