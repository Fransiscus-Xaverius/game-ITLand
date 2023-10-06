import { Book } from "./Abstract/Book";
const {
  BookOfEnergyTier1Name,
  BookOfEnergyTier1Desc,
  BookOfEnergyTier1Price,
  BookOfEnergyTier1ImagePath,
  BookOfEnergyTier1EnergyRestored,
} = require("../../../dist/config/env.json");

export class BookOfEnergyTier1 extends Book {
  constructor() {
    super(
      BookOfEnergyTier1ImagePath,
      BookOfEnergyTier1Name,
      BookOfEnergyTier1Desc,
      BookOfEnergyTier1Price,
      BookOfEnergyTier1EnergyRestored
    );
  }
}
