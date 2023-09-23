import { Inventory } from "./Items/Inventory"

export class InventoryView {
    private inventory: Inventory | null;
    private inventoryButton: HTMLButtonElement | null;
    private inventoryShopElement: HTMLDivElement | null;

    constructor(inventoryButton: HTMLButtonElement, inventory: Inventory, inventoryShopElement: HTMLDivElement) {
        this.inventory = inventory;
        this.inventoryShopElement = inventoryShopElement;
        this.inventoryButton = inventoryButton;
        this.initInventoryButton();
    }

    private initInventoryButton(): void {
        if (this.inventoryButton) {
            this.inventoryButton.addEventListener('click', () => {
                this.openInventory();
            });
        }
    }

    private openInventory(): void {
        if (this.inventory) {
            this.inventory.open(this.inventoryShopElement);
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
        this.inventory = value;
    }

    public getInventory(): Inventory | null {
        return this.inventory;
    }
}