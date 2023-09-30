import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const { SwordName, SwordDesc, SwordPrice, SwordImagePath } = require('../../../dist/config/env.json');

export class Sword extends EquippableItem {
    constructor() {
        super(SwordImagePath, SwordName, SwordDesc, SwordPrice);
    }
}