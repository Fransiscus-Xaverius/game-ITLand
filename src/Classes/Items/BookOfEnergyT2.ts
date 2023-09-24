import { Book } from "./Book";
const { BookOfEnergyTier2Name, BookOfEnergyTier2Desc, BookOfEnergyTier2Price, BookOfEnergyTier2ImagePath } = require('../../../dist/config/env.json');

export class BookOfEnergyTier2 extends Book {
    constructor() {
        super(BookOfEnergyTier2ImagePath, BookOfEnergyTier2Name, BookOfEnergyTier2Desc, BookOfEnergyTier2Price);
    }
}
