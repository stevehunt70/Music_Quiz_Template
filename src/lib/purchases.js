// Mock entitlements for now.
// Later this will come from RevenueCat or Google/Apple billing.
export const entitlements = {
  //free_pack: { isActive: true },
  "1950s_pack": { isActive: false },
  "1960s_pack": { isActive: true },
  "1970s_pack": { isActive: true },
  "1980s_pack": { isActive: true },
  "1990s_pack": { isActive: true },
  "2000s_pack": { isActive: false },
  "2010s_pack": { isActive: false },
  "all_decades": { isActive: false }
};

// Check if user owns a specific decade
export function userHasPack(decade) {
  if (decade === "free") return true;
  if (entitlements["all_decades"]?.isActive) return true;
  return entitlements[`${decade}_pack`]?.isActive || false;
}

// Check if user owns enough packs to unlock "All Decades"
export function userHasAllDecades() {
  // If purchased directly
  if (entitlements["all_decades"]?.isActive) return true;

  // Count purchased decade packs (excluding free)
  const purchasedDecades = Object.keys(entitlements)
    .filter((key) => key.endsWith("_pack") && key !== "free_pack")
    .filter((key) => entitlements[key].isActive);

  // Unlock automatically if 5 or more decades purchased
  return purchasedDecades.length >= 5;
}

// Returns ALL decades the user owns (including free)
export function getOwnedDecades() {
  const owned = ["free"]; // always include free pack

  for (const key in entitlements) {
    if (entitlements[key].isActive && key.endsWith("_pack")) {
      const decade = key.replace("_pack", "");
      owned.push(decade);
    }
  }

  return owned;
}

// Returns decades that should appear in dropdowns
export function getDropdownDecades() {
  const owned = getOwnedDecades();

  // Add "all" only if user has enough packs
  if (userHasAllDecades()) {
    owned.push("all");
  }

  return owned;
}
