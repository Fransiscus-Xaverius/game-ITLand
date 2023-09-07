import { Shop } from "./Shop";

export class ShopView {
    private shop: Shop | null = null
    private shopButton: HTMLButtonElement | null = null
    private shopHTML: HTMLDivElement | null = null

    constructor(shopButton: HTMLButtonElement, shop: Shop, shopHTML: HTMLDivElement) {
        this.setShop(shop)
        this.setShopButton(shopButton)
        this.setShopHTML(shopHTML)
    }


    private initShopButton(): void {
        if (this.shopButton) {
            this.shopButton?.addEventListener('click', () => {
                if (this.shop) {
                    this.shop.open(this.getShopHTML());
                }
            });
        }
    }

    public setShopHTML(shopHTML: HTMLDivElement | null): void {
        this.shopHTML = shopHTML;
    }

    public getShopHTML(): HTMLDivElement | null {
        return this.shopHTML;
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