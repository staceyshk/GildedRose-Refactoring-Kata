import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 1), new Item('foo1', 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[1].name).toBe('foo1');
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(1);
  });

  it('should decrease in quality during sell in date', () => {
    const gildedRose = new GildedRose([new Item('foo', 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  })

  it('should decrease double in quality past sell in date', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  })

  it('item should not have a negative quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  // There are no guardrails here, so the quality can be greater than 50
  // it('item should not have greater than 50 quality', () => {
  //   const gildedRose = new GildedRose([new Item('foo', 1, 52)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(50);
  // })

  it('should decrease increase in quality when the item is Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  })

   // Aged Brie shouold not have a quality greater than 50
  it('item Aged Brie should not have greater than 50 quality', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  it('should increase in quality when the item is Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  })

  it('should stay the double in quality when the item is Aged Brie past the sell by date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  })

  // Sulfuras value should be 80 but no guardrails are set
  it('item Sulfuras should not change in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  })

  it('item Backstage Passes should increase by 1 when there are more than 10 days', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  })

  it('item Backstage Passes should increase by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  })

  it('item Backstage Passes should increase by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  })

  it('item Backstage Passes should have no quality after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  // New feature, conjured items decrease by 2
  it('item Conjured should decrease in quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 2, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  })

  it('item Conjured should decrease in quality twice as fast as normal items after sell in date', () => {
    const gildedRose = new GildedRose([new Item('Conjured', -1, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  })
});
