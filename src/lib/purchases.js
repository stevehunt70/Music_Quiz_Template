// Mock entitlements for now.
// Later this will come from RevenueCat or Google/Apple billing.
export const entitlements = {
  //free_pack: { isActive: true },
  "1950s_pack": { isActive: false },
  "1960s_pack": { isActive: false },
  "1970s_pack": { isActive: false },
  "1980s_pack": { isActive: true },
  "1990s_pack": { isActive: false },
  "2000s_pack": { isActive: true },
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
export function userHasAnyPaidPack() {
  const owned = Object.keys(entitlements)
    .filter((e) => entitlements[e].isActive && e !== "free_pack");

  return owned.length >= 5 || entitlements["all_decades"]?.isActive;
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
  if (owned.length >= 5 || entitlements["all_decades"]?.isActive) {
    owned.push("all");
  }

  return owned;
}
