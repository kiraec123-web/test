// NYC Coffee Shop — Menu Data
// This is the single source of truth for all item names and prices.
// The system prompt templates prices from here — do NOT hardcode prices in the prompt.

export const TAX_RATE = 0.08875; // NYC sales tax

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrinkSize = "small" | "large";
export type Temperature = "hot" | "iced";
export type Category = "coffee" | "tea" | "pastry";

export interface DrinkItem {
  name: string;
  category: "coffee" | "tea";
  /** Prices by size. small = 12oz, large = 16oz */
  prices: Record<DrinkSize, number>;
  /** Which temperatures this drink supports */
  temperatures: Temperature[];
  /** Whether this drink uses milk (determines milk sub eligibility) */
  milkBased: boolean;
  /** Whether extra espresso shots can be added */
  allowEspressoShots: boolean;
  /** Whether extra matcha shots can be added (matcha latte only) */
  allowMatchaShots: boolean;
  /** Number of base espresso shots included (0 for cold brew, matcha, teas) */
  baseEspressoShots: number;
}

export interface PastryItem {
  name: string;
  category: "pastry";
  price: number;
}

export type MenuItem = DrinkItem | PastryItem;

export interface AddOnItem {
  name: string;
  price: number;
  /** Max units of this add-on per drink */
  maxPerDrink: number;
}

export interface MilkOption {
  name: string;
  surcharge: number;
  isDefault: boolean;
}

// ─── Coffee Drinks ────────────────────────────────────────────────────────────

export const coffeeDrinks: DrinkItem[] = [
  {
    name: "Espresso",
    category: "coffee",
    prices: { small: 3.0, large: 3.5 },
    temperatures: ["hot"],
    milkBased: false,
    allowEspressoShots: true,
    allowMatchaShots: false,
    baseEspressoShots: 1,
  },
  {
    name: "Americano",
    category: "coffee",
    prices: { small: 3.5, large: 4.5 },
    temperatures: ["hot", "iced"],
    milkBased: false,
    allowEspressoShots: true,
    allowMatchaShots: false,
    baseEspressoShots: 2,
  },
  {
    name: "Latte",
    category: "coffee",
    prices: { small: 4.5, large: 5.5 },
    temperatures: ["hot", "iced"],
    milkBased: true,
    allowEspressoShots: true,
    allowMatchaShots: false,
    baseEspressoShots: 1,
  },
  {
    name: "Mocha",
    category: "coffee",
    prices: { small: 5.0, large: 6.0 },
    temperatures: ["hot", "iced"],
    milkBased: true,
    allowEspressoShots: true,
    allowMatchaShots: false,
    baseEspressoShots: 1,
  },
  {
    name: "Cold Brew",
    category: "coffee",
    prices: { small: 4.0, large: 5.0 },
    temperatures: ["iced"],
    milkBased: false,
    allowEspressoShots: false,
    allowMatchaShots: false,
    baseEspressoShots: 0,
  },
  {
    name: "Frappuccino",
    category: "coffee",
    prices: { small: 5.5, large: 6.5 },
    temperatures: ["iced"],
    milkBased: true,
    allowEspressoShots: true,
    allowMatchaShots: false,
    baseEspressoShots: 1,
  },
  {
    name: "Matcha Latte",
    category: "coffee",
    prices: { small: 5.0, large: 6.0 },
    temperatures: ["hot", "iced"],
    milkBased: true,
    allowEspressoShots: false,
    allowMatchaShots: true,
    baseEspressoShots: 0,
  },
];

// ─── Tea Drinks ───────────────────────────────────────────────────────────────

export const teaDrinks: DrinkItem[] = [
  {
    name: "Green Tea",
    category: "tea",
    prices: { small: 3.0, large: 4.0 },
    temperatures: ["hot", "iced"],
    milkBased: false,
    allowEspressoShots: false,
    allowMatchaShots: false,
    baseEspressoShots: 0,
  },
  {
    name: "Black Tea",
    category: "tea",
    prices: { small: 3.0, large: 4.0 },
    temperatures: ["hot", "iced"],
    milkBased: false,
    allowEspressoShots: false,
    allowMatchaShots: false,
    baseEspressoShots: 0,
  },
  {
    name: "Chai Tea",
    category: "tea",
    prices: { small: 3.5, large: 4.5 },
    temperatures: ["hot", "iced"],
    milkBased: false,
    allowEspressoShots: false,
    allowMatchaShots: false,
    baseEspressoShots: 0,
  },
  {
    name: "Herbal Tea",
    category: "tea",
    prices: { small: 3.0, large: 4.0 },
    temperatures: ["hot"],
    milkBased: false,
    allowEspressoShots: false,
    allowMatchaShots: false,
    baseEspressoShots: 0,
  },
];

// ─── Pastries ─────────────────────────────────────────────────────────────────

export const pastries: PastryItem[] = [
  { name: "Croissant", category: "pastry", price: 3.5 },
  { name: "Blueberry Muffin", category: "pastry", price: 3.25 },
  { name: "Bagel", category: "pastry", price: 2.5 },
  { name: "Chocolate Chip Cookie", category: "pastry", price: 2.75 },
  { name: "Scone", category: "pastry", price: 3.5 },
];

// ─── Milk Options ─────────────────────────────────────────────────────────────

export const milkOptions: MilkOption[] = [
  { name: "Whole milk", surcharge: 0.0, isDefault: true },
  { name: "Oat milk", surcharge: 0.5, isDefault: false },
  { name: "Almond milk", surcharge: 0.75, isDefault: false },
];

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export const extraShot: AddOnItem = {
  name: "Extra espresso shot",
  price: 1.5,
  maxPerDrink: 5, // base + 5 extra = 6 total max
};

export const extraMatchaShot: AddOnItem = {
  name: "Extra matcha shot",
  price: 1.0,
  maxPerDrink: 2,
};

export const syrups: AddOnItem[] = [
  { name: "Vanilla syrup", price: 0.5, maxPerDrink: 4 },
  { name: "Caramel syrup", price: 0.5, maxPerDrink: 4 },
  { name: "Hazelnut syrup", price: 0.5, maxPerDrink: 4 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/** All drinks in one flat array */
export const allDrinks: DrinkItem[] = [...coffeeDrinks, ...teaDrinks];

/** All menu items flat (drinks + pastries) */
export const allItems: MenuItem[] = [...allDrinks, ...pastries];

/** The "most popular" item to recommend (for "what's popular?" handling) */
export const popularItem = allDrinks.find((d) => d.name === "Latte")!;
export const popularMilk = milkOptions.find((m) => m.name === "Oat milk")!;
