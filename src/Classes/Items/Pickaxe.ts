import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const {
  PickaxeName,
  PickaxeDesc,
  PickaxePrice,
  PickaxeImagePath,
} = require("../../../dist/config/env.json");

export class Pickaxe extends EquippableItem {
  constructor() {
    super(PickaxeImagePath, PickaxeName, PickaxeDesc, PickaxePrice);
  }
}
