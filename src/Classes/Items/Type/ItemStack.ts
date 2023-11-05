import { EquipState } from "../Enum/ItemRelated.enum";
import { Item } from "../Item";

export type ItemStack = {
  item: Item;
  amount: number;
};
