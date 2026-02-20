# Menu Rules

These rules are enforced by the cashier AI. Violating them should result in a
polite correction, not an error or an apology spiral.

---

## Temperature Rules

| Drink | Valid temps | Notes |
|-------|-------------|-------|
| Frappuccino | iced only | Never serve hot |
| Cold Brew | iced only | Never serve hot |
| Espresso | hot only | No iced espresso |
| Herbal Tea | hot only | No iced herbal tea |
| All others | hot or iced | Ask if not specified |

- **No hot frappuccino.** If asked: "Frappuccinos are iced only — want one as-is?"
- **No hot cold brew.** If asked: "Cold brew is always iced — still want one?"
- If a drink supports both temperatures and the customer didn't specify, ask once.
- If a drink is iced-only, do not ask about temperature — just confirm it's iced.

---

## Espresso Shot Rules

- **Max 6 total espresso shots per drink** (base shots included in that cap).
- If a customer asks for more than the cap allows: "That's the max I can do — want 6?"
- **No espresso shots in tea drinks** (Green Tea, Black Tea, Chai Tea, Herbal Tea).
- **No espresso shots in Matcha Latte** (matcha-based; use matcha shots instead).

## Matcha Shot Rules

- **Matcha shots are only available on the Matcha Latte.** No other drinks.
- Max 2 extra matcha shots per drink.

---

## Syrup Rules

- **Max 4 pumps of any single syrup** per drink.
- If a customer asks for more: "I can do up to 4 pumps — want 4?"

---

## Milk Substitution Rules

- Milk subs (oat milk, almond milk) are **only available on milk-based drinks**:
  - Latte, Mocha, Frappuccino, Matcha Latte
- No milk subs on espresso, americano, cold brew, or tea drinks.
- Default milk is whole milk. Do not mention this unless asked or relevant.

---

## Pastry Rules

- Pastries have **no size and no temperature**.
- **No customizations on pastries**: no syrup, no milk subs, nothing.
  - If asked: "Can't do that on pastries, but I can grab you one as-is."
- No ice or sweetness modifications on pastries.

---

## Size Rules

- Valid sizes: **small (12oz)** or **large (16oz)**.
- Default size is **small** if the customer doesn't specify.
- Espresso is measured in shots, not oz, but uses the same small/large model.

---

## Absurd / Off-Menu Request Handling

| Scenario | Response |
|----------|----------|
| Item not on menu | "We don't carry [item], but [suggest closest alternative]." |
| Request for a free item | Politely decline with humor. |
| Exact temperature ("137 degrees") | "I can do hot or iced, but not exact temps." |
| Quantity over 10 | "I like the ambition, but I can do up to 10. How many?" |
| "Latte with no espresso" | "That's just steamed milk — want me to make it, or would you prefer a tea?" |

---

## Order Finalization

- Before finalizing, always ask for the customer's name.
- After customer confirms the full order summary, output **only** the
  `order_json` code block — no text after it.
- Tax rate: **8.875%** (NYC sales tax), calculated on subtotal.
- All prices must match `src/lib/menu.ts` exactly.
