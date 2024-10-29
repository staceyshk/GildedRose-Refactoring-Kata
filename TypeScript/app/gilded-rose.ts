export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      // Sulfuras never sold, never decreases in quality
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return
      }

      // Decrement first since all items have a sell in date except Sulfuras
      // That's the assumption I made with "never sold" in the requirements
      item.sellIn--

      // Rereading the requirements, I feel like I should have gone with "includes" for better future expansion
      switch(item.name) {
        case 'Aged Brie': {
          item.sellIn >= 0 ? this.increaseQuality(item, 1) : this.increaseQuality(item, 2)
          return
        }
        // This is where checking the string for containing the word backstage would have been better
        case 'Backstage passes to a TAFKAL80ETC concert': {
          if (item.sellIn <= 0) {
            item.quality = 0
            return
          }

          if (item.sellIn < 10 && item.sellIn > 5) {
            this.increaseQuality(item, 2)
          } else if(item.sellIn < 5) {
            this.increaseQuality(item, 3)
          } else {
            this.increaseQuality(item, 1)
          }
          return
        }
        case 'Conjured': {
          item.sellIn >= 0 ? this.decreaseQuality(item, 2) : this.decreaseQuality(item, 4)
          return
        }
        default: {
          // If it's not a special item, decrease the quality
          item.sellIn >= 0 ? this.decreaseQuality(item, 1) : this.decreaseQuality(item, 2)
          return
        }
      }
    });

    return this.items
  }

  // Items never have a quality above 50
  // I could have also done checks at the beginning of the function too
  // ¯\_(ツ)_/¯
  private increaseQuality(item: Item, value: number) {
    item.quality = item.quality + value
    item.quality = item.quality > 50 ? 50 : item.quality
  }

  // Items never go below 0
  private decreaseQuality(item: Item, value: number) {
    item.quality = item.quality - value
    item.quality = item.quality < 0 ? 0 : item.quality
  }
}
