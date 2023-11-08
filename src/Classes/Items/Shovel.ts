import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const {
  ShovelName,
  ShovelDesc,
  ShovelPrice,
  IronShovelImagePath,
  IronShovelName,
  IronShovelDesc,
  IronShovelPrice,
  SilverShovelImagePath,
  SilverShovelName,
  SilverShovelDesc,
  SilverShovelPrice,
  GoldShovelImagePath,
  GoldShovelName,
  GoldShovelDesc,
  GoldShovelPrice,
} = require("../../../dist/config/env.json");

export class Shovel extends EquippableItem {
  constructor() {
    super(IronShovelImagePath, IronShovelName, IronShovelDesc, IronShovelPrice);
    this.checkUpdateData();
  }
  public upgrade(): void {
    super.upgrade();
    this.checkUpdateData();
  }
  public checkUpdateData() {
    if (this.getLevel() == 1) {
      this.setImagePath(IronShovelImagePath);
      this.setItemName(IronShovelName);
      this.setItemDesc(IronShovelDesc);
      this.setItemPrice(IronShovelPrice);
    } else if (this.getLevel() == 2) {
      this.setImagePath(SilverShovelImagePath);
      this.setItemName(SilverShovelName);
      this.setItemDesc(SilverShovelDesc);
      this.setItemPrice(SilverShovelPrice);
    } else if (this.getLevel() == 3) {
      this.setImagePath(GoldShovelImagePath);
      this.setItemName(GoldShovelName);
      this.setItemDesc(GoldShovelDesc);
      this.setItemPrice(GoldShovelPrice);
    }
  }
}
