import { Item } from "./Item";
import { IEquippable } from "./Interface/IEquippable";
import { EquippableItem } from "./Abstract/EquippableItem";
const { ShovelName, ShovelDesc, ShovelPrice, IronShovelImagePath } = require('../../../dist/config/env.json');


export class Shovel extends EquippableItem {
    constructor() {
        super(IronShovelImagePath, ShovelName, ShovelDesc, ShovelPrice);
    }
}