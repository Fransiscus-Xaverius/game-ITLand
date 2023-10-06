import { Book } from "./Abstract/Book";
const {
  BookOfEnergyTier3Name,
  BookOfEnergyTier3Desc,
  BookOfEnergyTier3Price,
  BookOfEnergyTier3ImagePath,
  BookOfEnergyTier3EnergyRestored,
} = require("../../../dist/config/env.json");

export class BookOfEnergyTier3 extends Book {
  constructor() {
    super(
      BookOfEnergyTier3ImagePath,
      BookOfEnergyTier3Name,
      BookOfEnergyTier3Desc,
      BookOfEnergyTier3Price,
      BookOfEnergyTier3EnergyRestored
    );
  }
}
