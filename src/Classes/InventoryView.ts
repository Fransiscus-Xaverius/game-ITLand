import { Inventory } from "./Items/Inventory"

export class InventoryView {
    private inventory: Inventory | null = null
    private inventoryButton: HTMLButtonElement | null = null
    private inventoryShopElement: HTMLDivElement | null = null

    constructor(inventoryButton: HTMLButtonElement, inventory: Inventory, inventoryShopElement: HTMLDivElement) {
        this.setInventory(inventory)
        this.setInventoryButton(inventoryButton)
        this.setInventoryShopElement(inventoryShopElement)
    }


    private initInventoryButton(): void {
        if (this.inventoryButton) {
            this.inventoryButton?.addEventListener('click', () => {
                if (this.inventory) {
                    this.inventory.open(this.getInventoryShopElement());
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

    public setInventoryButton(inventoryButton: HTMLButtonElement | null): void {
        this.inventoryButton = inventoryButton;
        this.initInventoryButton();
    }

    public getInventoryButton(): HTMLButtonElement | null {
        return this.inventoryButton;
    }

    public setInventory(value: Inventory | null): void {
        this.inventory = value
    }

    public getInventory(): Inventory | null {
        return this.inventory;
    }
}