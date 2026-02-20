export type DrinkCategory = "coffee" | "tea";
export type Temperature = "hot" | "iced";
export type Size = "small" | "large";

export interface Drink {
  name: string;
  category: DrinkCategory;
  temps: Temperature[];
  prices: { small: number; large: number };
}

export interface Pastry {
  name: string;
  category: "pastry";
  price: number;
}

export interface AddOn {
  name: string;
  price: number;
}

export const COFFEE_DRINKS: Drink[] = [
  {
    name: "Americano",
    category: "coffee",
    temps: ["hot", "iced"],
    prices: { small: 3.0, large: 4.0 },
  },
  {
    name: "Latte",
    category: "coffee",
    temps: ["hot", "iced"],
    prices: { small: 4.0, large: 5.0 },
  },
  {
    name: "Cold Brew",
    category: "coffee",
    temps: ["iced"],
    prices: { small: 4.0, large: 5.0 },
  },
  {
    name: "Mocha",
    category: "coffee",
    temps: ["hot", "iced"],
    prices: { small: 4.5, large: 5.5 },
  },
  {
    name: "Coffee Frappuccino",
    category: "coffee",
    temps: ["iced"],
    prices: { small: 5.5, large: 6.0 },
  },
];

export const TEA_DRINKS: Drink[] = [
  {
    name: "Black Tea",
    category: "tea",
    temps: ["hot", "iced"],
    prices: { small: 3.0, large: 3.75 },
  },
  {
    name: "Jasmine Tea",
    category: "tea",
    temps: ["hot", "iced"],
    prices: { small: 3.0, large: 3.75 },
  },
  {
    name: "Lemon Green Tea",
    category: "tea",
    temps: ["hot", "iced"],
    prices: { small: 3.5, large: 4.25 },
  },
  {
    name: "Matcha Latte",
    category: "tea",
    temps: ["hot", "iced"],
    prices: { small: 4.5, large: 5.25 },
  },
];

export const ALL_DRINKS: Drink[] = [...COFFEE_DRINKS, ...TEA_DRINKS];

export const PASTRIES: Pastry[] = [
  { name: "Plain Croissant", category: "pastry", price: 3.5 },
  { name: "Chocolate Croissant", category: "pastry", price: 4.0 },
  { name: "Chocolate Chip Cookie", category: "pastry", price: 2.5 },
  { name: "Banana Bread", category: "pastry", price: 3.0 },
];

export const MILKS: AddOn[] = [
  { name: "Whole Milk", price: 0.0 },
  { name: "Skim Milk", price: 0.0 },
  { name: "Oat Milk", price: 0.5 },
  { name: "Almond Milk", price: 0.75 },
];

export const ADD_ONS: AddOn[] = [
  { name: "Extra Espresso Shot", price: 1.5 },
  { name: "Extra Matcha Shot", price: 1.5 },
  { name: "Caramel Syrup", price: 0.5 },
  { name: "Hazelnut Syrup", price: 0.5 },
];

export const SWEETNESS_OPTIONS = [
  "No Sugar",
  "Less Sugar",
  "Normal",
  "Extra Sugar",
] as const;

export const ICE_LEVEL_OPTIONS = [
  "No Ice",
  "Less Ice",
  "Regular",
  "Extra Ice",
] as const;

export const NYC_TAX_RATE = 0.08875;

export const MAX_ITEMS_PER_ORDER = 10;
export const MAX_EXTRA_ESPRESSO_SHOTS = 4;
export const MAX_EXTRA_MATCHA_SHOTS = 3;
export const MAX_PUMPS_PER_SYRUP = 4;
export const MAX_TOTAL_SYRUP_PUMPS = 6;

// Drinks that include milk by default
export const DRINKS_WITH_DEFAULT_MILK = [
  "Latte",
  "Mocha",
  "Matcha Latte",
  "Coffee Frappuccino",
];

// Drinks that allow a "splash" of milk (no upcharge for whole/skim)
export const DRINKS_ALLOWING_MILK_SPLASH = ["Americano", "Cold Brew"];

// Drinks that can have espresso shots added
export const ESPRESSO_ELIGIBLE_DRINKS = [
  "Americano",
  "Latte",
  "Mocha",
  "Cold Brew",
  "Coffee Frappuccino",
];
