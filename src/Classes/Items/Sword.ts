import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const { SwordName, SwordDesc, SwordPrice, IronSwordImagePath, SilverSwordImagePath, GoldSwordImagePath } = require('../../../dist/config/env.json');

export class Sword extends EquippableItem {
    constructor() {
        super(IronSwordImagePath, SwordName, SwordDesc, SwordPrice);
    }       

}