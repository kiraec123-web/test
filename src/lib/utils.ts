import { NYC_TAX_RATE } from "./menu";

/**
 * Format a number as USD price with 2 decimal places.
 * Example: formatPrice(4.5) => "$4.50"
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Calculate NYC sales tax (8.875%) rounded to the nearest cent.
 */
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * NYC_TAX_RATE * 100) / 100;
}

/**
 * Calculate order total from subtotal.
 */
export function calculateTotal(subtotal: number): number {
  return subtotal + calculateTax(subtotal);
}

/**
 * Format an ISO timestamp to a short readable time.
 * Example: "2:45 PM"
 */
export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format an ISO timestamp to a short readable date.
 * Example: "Feb 19, 2026"
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format order number with leading zeros.
 * Example: formatOrderNumber(7) => "#007"
 */
export function formatOrderNumber(num: number): string {
  return `#${String(num).padStart(3, "0")}`;
}

/**
 * Get minutes elapsed since an ISO timestamp.
 */
export function minutesAgo(isoString: string): number {
  const diff = Date.now() - new Date(isoString).getTime();
  return Math.floor(diff / 60000);
}

/**
 * Format minutes into a readable wait time string.
 * Example: formatWaitTime(3) => "3 min ago"
 */
export function formatWaitTime(minutes: number): string {
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 min ago";
  return `${minutes} min ago`;
}
