export const MENU_CATEGORIES = [
  "Featured",
  "Coffee",
  "Non-Coffee",
  "Cold Drinks",
  "Tea",
  "Pastries",
];

export const MENU_ITEMS = [
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    cafe: "Brew & Bloom",
    category: "Coffee",
    description:
      "Rich espresso balanced with creamy condensed milk and silky steamed milk.",
    price: 165,
    rating: 4.9,
    image: require("../../assets/images/spanish-latte.png"),
    available: true,
    featured: true,
    customizable: true,
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    cafe: "Brew & Bloom",
    category: "Coffee",
    description:
      "Espresso, velvety milk and caramel finished with a delicate sweet drizzle.",
    price: 175,
    rating: 4.8,
    image: require("../../assets/images/caramel-macchiato.png"),
    available: true,
    featured: true,
    customizable: true,
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    cafe: "Northside Roasters",
    category: "Cold Drinks",
    description:
      "Bold espresso poured over chilled water and ice for a clean finish.",
    price: 135,
    rating: 4.7,
    image: require("../../assets/images/iced-americano.png"),
    available: true,
    featured: true,
    customizable: true,
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    cafe: "Green House Coffee",
    category: "Non-Coffee",
    description:
      "Smooth Japanese-style matcha blended with creamy milk.",
    price: 170,
    rating: 4.8,
    image: require("../../assets/images/matcha-latte.png"),
    available: true,
    featured: true,
    customizable: true,
  },
  {
    id: "vanilla-cold-brew",
    name: "Vanilla Cold Brew",
    cafe: "Daily Grind",
    category: "Cold Drinks",
    description:
      "Slow-steeped cold brew with a subtle vanilla sweetness.",
    price: 160,
    rating: 4.9,
    image: require("../../assets/images/vanilla-cold-brew.png"),
    available: true,
    featured: false,
    customizable: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    cafe: "Brew & Bloom",
    category: "Coffee",
    description:
      "Classic espresso topped with silky steamed milk and airy foam.",
    price: 150,
    rating: 4.8,
    image: require("../../assets/images/cappuccino.png"),
    available: true,
    featured: true,
    customizable: true,
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    cafe: "The Daily Cup",
    category: "Tea",
    description:
      "Aromatic black tea blended with warming spices and creamy milk.",
    price: 155,
    rating: 4.7,
    image: require("../../assets/images/chai-latte.png"),
    available: true,
    featured: false,
    customizable: true,
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    cafe: "Baker & Bean",
    category: "Pastries",
    description:
      "Flaky, golden layers baked fresh every morning.",
    price: 110,
    rating: 4.9,
    image: require("../../assets/images/croissant.png"),
    available: true,
    featured: true,
    customizable: false,
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    cafe: "Baker & Bean",
    category: "Pastries",
    description:
      "Soft vanilla muffin packed with juicy blueberries.",
    price: 105,
    rating: 4.6,
    image: require("../../assets/images/blueberry-muffin.png"),
    available: true,
    featured: false,
    customizable: false,
  },
  {
    id: "mocha",
    name: "Dark Chocolate Mocha",
    cafe: "Northside Roasters",
    category: "Coffee",
    description:
      "Espresso and rich dark chocolate finished with creamy steamed milk.",
    price: 180,
    rating: 4.9,
    image: require("../../assets/images/mocha.png"),
    available: false,
    featured: true,
    customizable: true,
  },
];

export const MILK_OPTIONS = [
  { label: "Whole Milk", price: 0 },
  { label: "Low Fat", price: 0 },
  { label: "Oat Milk", price: 20 },
  { label: "Almond Milk", price: 20 },
  { label: "Soy Milk", price: 15 },
];

export const SWEETNESS_OPTIONS = [
  { label: "0%", price: 0 },
  { label: "25%", price: 0 },
  { label: "50%", price: 0 },
  { label: "75%", price: 0 },
  { label: "100%", price: 0 },
];

export const SIZE_OPTIONS = [
  { label: "Small", price: 0 },
  { label: "Medium", price: 20 },
  { label: "Large", price: 40 },
];

export const TEMPERATURE_OPTIONS = [
  { label: "Hot", price: 0 },
  { label: "Iced", price: 10 },
];

export const EXTRA_OPTIONS = [
  { label: "Extra Shot", price: 35 },
  { label: "Vanilla", price: 20 },
  { label: "Caramel", price: 20 },
  { label: "Whipped Cream", price: 25 },
];