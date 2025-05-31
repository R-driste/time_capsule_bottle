const unlockableItems = [
  {
    name: "Water Glass",
    image: "../images/icon32.png",
    rarity: "default",
    requirement: 0,
  },
  {
    name: "Candle",
    image: "../images/icon128.png",
    rarity: "uncommon",
    requirement: 600,
  },
  {
    name: "Ruler",
    image: "../images/ruler.png",
    rarity: "super rare",
    requirement: 50000000,
  }
];

const item_current = localStorage.getItem('item_current') || 'Water Glass';