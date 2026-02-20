export interface MenuItem {
  name: string;
  temps: string[];
  prices:
    | { single: number }
    | { sm: number; lg: number };
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface AddOn {
  name: string;
  price: number;
}

export interface CustomizationLevel {
  label: string;
  options: string[];
}

export interface MenuData {
  sections: MenuSection[];
  addOns: AddOn[];
  customizations: CustomizationLevel[];
}

export const menuData: MenuData = {
  sections: [
    {
      title: "Coffee",
      items: [
        {
          name: "Espresso",
          temps: ["Hot"],
          prices: { sm: 2.5, lg: 3.5 },
        },
        {
          name: "Americano",
          temps: ["Hot", "Iced"],
          prices: { sm: 3.0, lg: 4.0 },
        },
        {
          name: "Latte",
          temps: ["Hot", "Iced"],
          prices: { sm: 4.0, lg: 5.0 },
        },
        {
          name: "Cappuccino",
          temps: ["Hot"],
          prices: { sm: 4.0, lg: 5.0 },
        },
        {
          name: "Mocha",
          temps: ["Hot", "Iced"],
          prices: { sm: 4.5, lg: 5.5 },
        },
        {
          name: "Cold Brew",
          temps: ["Iced"],
          prices: { sm: 3.5, lg: 4.5 },
        },
      ],
    },
    {
      title: "Tea",
      items: [
        {
          name: "Matcha Latte",
          temps: ["Hot", "Iced"],
          prices: { sm: 4.5, lg: 5.5 },
        },
        {
          name: "Chai Latte",
          temps: ["Hot", "Iced"],
          prices: { sm: 4.0, lg: 5.0 },
        },
        {
          name: "Earl Grey",
          temps: ["Hot"],
          prices: { single: 3.0 },
        },
        {
          name: "Jasmine Green",
          temps: ["Hot", "Iced"],
          prices: { single: 3.0 },
        },
        {
          name: "Thai Tea",
          temps: ["Iced"],
          prices: { sm: 4.0, lg: 5.0 },
        },
      ],
    },
    {
      title: "Pastries",
      items: [
        {
          name: "Butter Croissant",
          temps: [],
          prices: { single: 3.5 },
        },
        {
          name: "Almond Croissant",
          temps: [],
          prices: { single: 4.0 },
        },
        {
          name: "Banana Bread",
          temps: [],
          prices: { single: 3.5 },
        },
        {
          name: "Blueberry Muffin",
          temps: [],
          prices: { single: 3.0 },
        },
        {
          name: "Cinnamon Roll",
          temps: [],
          prices: { single: 4.5 },
        },
      ],
    },
  ],
  addOns: [
    { name: "Oat Milk", price: 0.75 },
    { name: "Almond Milk", price: 0.75 },
    { name: "Vanilla Syrup", price: 0.5 },
    { name: "Caramel Syrup", price: 0.5 },
    { name: "Hazelnut Syrup", price: 0.5 },
    { name: "Extra Shot", price: 1.0 },
    { name: "Whipped Cream", price: 0.5 },
    { name: "Coconut Milk", price: 0.75 },
  ],
  customizations: [
    {
      label: "Sweetness",
      options: ["No Sugar", "Less", "Normal", "Extra"],
    },
    {
      label: "Ice",
      options: ["No Ice", "Less Ice", "Normal", "Extra Ice"],
    },
  ],
};

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getItemDisplayTemp(temps: string[]): string {
  if (temps.length === 0) return "";
  if (temps.length === 1) {
    return temps[0] === "Iced" ? "Iced only" : "Hot only";
  }
  return temps.join(" / ");
}

export function getItemDisplayName(item: MenuItem, preferredTemp?: string): string {
  if (item.temps.length === 0) return item.name;
  if (preferredTemp && item.temps.includes(preferredTemp)) {
    return `${preferredTemp} ${item.name}`;
  }
  if (item.temps.includes("Iced") && item.temps.includes("Hot")) {
    return item.name;
  }
  if (item.temps.includes("Iced")) {
    return `Iced ${item.name}`;
  }
  return item.name;
}
