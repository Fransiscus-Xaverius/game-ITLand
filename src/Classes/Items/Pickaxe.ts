import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const {
  PickaxeName,
  PickaxeDesc,
  PickaxePrice,
  IronPickaxeImagePath,
  IronPickaxeName,
  IronPickaxeDesc,
  IronPickaxePrice,
  SilverPickaxeImagePath,
  SilverPickaxeName,
  SilverPickaxeDesc,
  SilverPickaxePrice,
  GoldPickaxeImagePath,
  GoldPickaxeName,
  GoldPickaxeDesc,
  GoldPickaxePrice,
} = require("../../../dist/config/env.json");

export class Pickaxe extends EquippableItem {
  constructor() {
    super(
      IronPickaxeImagePath,
      IronPickaxeName,
      IronPickaxeDesc,
      IronPickaxePrice
    );
    this.checkUpdateData();
  }
  public upgrade(): void {
    super.upgrade();
    this.checkUpdateData();
  }
  public checkUpdateData() {
    if (this.getLevel() == 1) {
      this.setImagePath(IronPickaxeImagePath);
      this.setItemName(IronPickaxeName);
      this.setItemDesc(IronPickaxeDesc);
      this.setItemPrice(IronPickaxePrice);
    } else if (this.getLevel() == 2) {
      this.setImagePath(SilverPickaxeImagePath);
      this.setItemName(SilverPickaxeName);
      this.setItemDesc(SilverPickaxeDesc);
      this.setItemPrice(SilverPickaxePrice);
    } else if (this.getLevel() == 3) {
      this.setImagePath(GoldPickaxeImagePath);
      this.setItemName(GoldPickaxeName);
      this.setItemDesc(GoldPickaxeDesc);
      this.setItemPrice(GoldPickaxePrice);
    }
  }
}
