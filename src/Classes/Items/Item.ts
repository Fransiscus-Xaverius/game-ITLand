export abstract class Item {
    private imagePath: string;
    private itemName: string;
    private itemDesc: string;
    constructor(imagePath: string, itemName: string, itemDesc: string) {
        this.imagePath = imagePath;
        this.itemName = itemName;
        this.itemDesc = itemDesc;
    }

    public getImagePath(): string {
        return this.imagePath;
    }

    public setImagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }

    public getItemName(): string {
        return this.itemName;
    }


    public setItemName(itemName: string) {
        this.itemName = itemName;
    }

    public getItemDesc(): string {
        return this.itemDesc;
    }

    public setItemDesc(itemDesc: string) {
        this.itemDesc = itemDesc;
    }

}