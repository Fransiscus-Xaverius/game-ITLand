export abstract class Item {
    private imagePath: string;
    private itemName: string;
    constructor(imagePath: string, itemName: string) {
        this.imagePath = imagePath;
        this.itemName = itemName;
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



}