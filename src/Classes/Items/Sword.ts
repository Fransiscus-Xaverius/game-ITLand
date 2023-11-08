import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const {
  IronSwordName,
  IronSwordDesc,
  IronSwordPrice,
  IronSwordImagePath,
  SilverSwordImagePath,
  GoldSwordImagePath,
  SilverSwordName,
  SilverSwordDesc,
  SilverSwordPrice,
  GoldSwordName,
  GoldSwordDesc,
  GoldSwordPrice,
} = require("../../../dist/config/env.json");

export class Sword extends EquippableItem {
  constructor() {
    super(IronSwordImagePath, IronSwordName, IronSwordDesc, IronSwordPrice);
    this.checkUpdateData();
  }
  public upgrade(): void {
    super.upgrade();
    this.checkUpdateData();
  }
  public checkUpdateData() {
    if (this.getLevel() == 1) {
      this.setImagePath(IronSwordImagePath);
      this.setItemName(IronSwordName);
      this.setItemDesc(IronSwordDesc);
      this.setItemPrice(IronSwordPrice);
    } else if (this.getLevel() == 2) {
      this.setImagePath(SilverSwordImagePath);
      this.setItemName(SilverSwordName);
      this.setItemDesc(SilverSwordDesc);
      this.setItemPrice(SilverSwordPrice);
    } else if (this.getLevel() == 3) {
      this.setImagePath(GoldSwordImagePath);
      this.setItemName(GoldSwordName);
      this.setItemDesc(GoldSwordDesc);
      this.setItemPrice(GoldSwordPrice);
    }
  }
}
