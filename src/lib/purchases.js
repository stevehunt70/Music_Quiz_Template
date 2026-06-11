// ---------------------------------------------
// Persistent Entitlements System
// ---------------------------------------------

// Default state for a brand‑new user
const defaultEntitlements = {
  "1950s_pack": true,
  "1960s_pack": true,
  "1970s_pack": true,
  "1980s_pack": true,
  "1990s_pack": true,
  "2000s_pack": true,
  "2010s_pack": true,
  "all_decades": true
};

// Load entitlements from localStorage OR fallback to defaults
export function loadEntitlements() {
  const saved = localStorage.getItem("entitlements");
  if (!saved) return { ...defaultEntitlements };
  try {
    return { ...defaultEntitlements, ...JSON.parse(saved) };
  } catch {
    return { ...defaultEntitlements };
  }
}

// Save entitlements to localStorage
export function saveEntitlements(entitlements) {
  localStorage.setItem("entitlements", JSON.stringify(entitlements));
}

// Global entitlements object (always loaded fresh)
export let entitlements = loadEntitlements();

// ---------------------------------------------
// Unlock a pack (used after purchase)
// ---------------------------------------------
export function unlockPack(decade) {
  const key = `${decade}_pack`;
  entitlements[key] = true;
  saveEntitlements(entitlements);
}

// Unlock All Decades directly
export function unlockAllDecades() {
  entitlements["all_decades"] = true;
  saveEntitlements(entitlements);
}

// ---------------------------------------------
// Restore Purchases (Home.jsx calls this)
// ---------------------------------------------
export function restorePurchases(restoredEntitlements) {
  // Merge restored entitlements with defaults
  entitlements = { ...defaultEntitlements, ...restoredEntitlements };
  saveEntitlements(entitlements);
}

// ---------------------------------------------
// Check if user owns a specific decade
// ---------------------------------------------
export function userHasPack(decade) {
  if (decade === "free") return true;

  // If All Decades is purchased, everything is unlocked
  if (entitlements["all_decades"]) return true;

  return entitlements[`${decade}_pack`] === true;
}

// ---------------------------------------------
// Check if user owns enough packs to unlock All Decades
// ---------------------------------------------
export function userHasAllDecades() {
  if (entitlements["all_decades"]) return true;

  const purchasedDecades = Object.keys(entitlements)
    .filter((key) => key.endsWith("_pack"))
    .filter((key) => entitlements[key] === true);

  return purchasedDecades.length >= 5;
}

// ---------------------------------------------
// Get list of owned decades (for dropdowns)
// ---------------------------------------------
export function getOwnedDecades() {
  const owned = ["free"];

  for (const key in entitlements) {
    if (key.endsWith("_pack") && entitlements[key] === true) {
      owned.push(key.replace("_pack", ""));
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
