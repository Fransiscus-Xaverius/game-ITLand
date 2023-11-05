import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const {
  PickaxeName,
  PickaxeDesc,
  PickaxePrice,
  IronPickaxeImagePath,
} = require("../../../dist/config/env.json");

export class Pickaxe extends EquippableItem {
  constructor() {
    super(IronPickaxeImagePath, PickaxeName, PickaxeDesc, PickaxePrice);
  }
}
