// ---------------------------------------------
// Product ID Mapping (Google Play / RevenueCat)
// ---------------------------------------------
export const decadeToProductId = {
  "1950s": "1950sdecade",
  "1960s": "1960sdecade",
  "1970s": "1970sdecade",
  "1980s": "1980sdecade",
  "1990s": "1990sdecade",
  "2000s": "2000sdecade",
  "2010s": "2010sdecade",
  "all": "alldecadesbundle"
};

// ---------------------------------------------
// Default entitlements (set to true for testing)
// ---------------------------------------------
const defaultEntitlements = {
  "1950sdecade": true,
  "1960sdecade": true,
  "1970sdecade": true,
  "1980sdecade": true,
  "1990sdecade": true,
  "2000sdecade": true,
  "2010sdecade": true,
  "alldecadesbundle": true
};

// ---------------------------------------------
// Load & Save
// ---------------------------------------------
export function loadEntitlements() {
  const saved = localStorage.getItem("entitlements");
  if (!saved) return { ...defaultEntitlements };

  try {
    return { ...defaultEntitlements, ...JSON.parse(saved) };
  } catch {
    return { ...defaultEntitlements };
  }
}

export function saveEntitlements(entitlements) {
  localStorage.setItem("entitlements", JSON.stringify(entitlements));
}

// Global entitlements object
export let entitlements = loadEntitlements();

// ---------------------------------------------
// Unlock a single decade (after purchase)
// ---------------------------------------------
export function unlockPack(decade) {
  const productId = decadeToProductId[decade];
  if (!productId) return;

  entitlements[productId] = true;
  saveEntitlements(entitlements);
}

// ---------------------------------------------
// Unlock All Decades (after bundle purchase)
// ---------------------------------------------
export function unlockAllDecades() {
  entitlements["alldecadesbundle"] = true;
  saveEntitlements(entitlements);
}

// ---------------------------------------------
// Restore Purchases (from Google / RevenueCat)
// ---------------------------------------------
export function restorePurchases(restoredEntitlements) {
  entitlements = { ...defaultEntitlements, ...restoredEntitlements };
  saveEntitlements(entitlements);
}

// ---------------------------------------------
// Check if user owns a specific decade
// ---------------------------------------------
export function userHasPack(decade) {
  if (decade === "free") return true;

  // If bundle is owned, everything is unlocked
  if (entitlements["alldecadesbundle"]) return true;

  const productId = decadeToProductId[decade];
  return entitlements[productId] === true;
}

// ---------------------------------------------
// Check if user owns All Decades
// ---------------------------------------------
export function userHasAllDecades() {
  return entitlements["alldecadesbundle"] === true;
}

// ---------------------------------------------
// Get list of owned decades
// ---------------------------------------------
export function getOwnedDecades() {
  const owned = ["free"];

  for (const decade in decadeToProductId) {
    const productId = decadeToProductId[decade];
    if (entitlements[productId]) {
      owned.push(decade);
    }
  }

  return owned;
}

// ---------------------------------------------
// Dropdown decades (include "all" if unlocked)
// ---------------------------------------------
export function getDropdownDecades() {
  const owned = getOwnedDecades();

  if (userHasAllDecades()) {
    owned.push("all");
  }

  return owned;
}
