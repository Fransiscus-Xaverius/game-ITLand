export abstract class Item {
    private imagePath: string;
    private itemName: string;
    private itemDesc: string;
    private itemPrice: number;
    constructor(imagePath: string, itemName: string, itemDesc: string, itemPrice: number) {
        this.imagePath = imagePath;
        this.itemName = itemName;
        this.itemDesc = itemDesc;
        this.itemPrice = itemPrice;
    }

    public getItemPrice(): number{
        return this.itemPrice;
    }

    public setItemPrice(itemPrice:number): void{
        this.itemPrice = itemPrice;
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