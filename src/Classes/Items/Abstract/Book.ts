import { ConsumableItem } from "./ConsumableItem";

//book is not equipable, rather a consumeable.

export abstract class Book extends ConsumableItem {
  private energyRestored: number;

  constructor(
    imagePath: string,
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    energyRestored: number
  ) {
    super(imagePath, itemName, itemDesc, itemPrice);
    this.energyRestored = energyRestored;
  }
  public useItem() {
    return this.energyRestored;
  }
}
