/**
 * WAY Chechen-name normalization V01.
 *
 * Safety property: this function produces SEARCH KEYS only.
 * It must never overwrite the name entered by a person or copied from a document.
 * It deliberately does not collapse Chechen phonemic distinctions such as:
 *   х / хь / хӀ, к / къ / кх / кӀ, г / гӀ.
 */

export type NameNormalizationWarning =
  | "ASCII_ONE_REPLACED_WITH_PALOCHKA"
  | "LATIN_I_REPLACED_WITH_PALOCHKA"
  | "LOWERCASE_PALOCHKA_NORMALIZED"
  | "HYPHEN_NORMALIZED"
  | "ZERO_WIDTH_CHARACTER_REMOVED"
  | "WHITESPACE_COLLAPSED";

export interface NormalizedName {
  original: string;
  nfc: string;
  displayNormalized: string;
  exactSearchKey: string;
  looseSearchKey: string;
  warnings: NameNormalizationWarning[];
}

const CYRILLIC_RE = /[\u0400-\u052F]/u;
const ZERO_WIDTH_RE = /[\u200B-\u200D\u2060\uFEFF]/gu;
const HYPHEN_RE = /[\u2010\u2011\u2012\u2013\u2014\u2212]/gu;
const SPACE_RE = /\s+/gu;

function replaceLatinIInCyrillicContext(value: string): {
  value: string;
  changed: boolean;
} {
  const chars = [...value];
  let changed = false;

  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i] !== "I") continue;
    const previous = chars[i - 1] ?? "";
    const next = chars[i + 1] ?? "";
    if (CYRILLIC_RE.test(previous) || CYRILLIC_RE.test(next)) {
      chars[i] = "Ӏ";
      changed = true;
    }
  }

  return { value: chars.join(""), changed };
}

export function normalizeChechenName(input: string): NormalizedName {
  const warnings: NameNormalizationWarning[] = [];
  const original = input;
  let value = input.normalize("NFC");
  const nfc = value;

  const withoutZeroWidth = value.replace(ZERO_WIDTH_RE, "");
  if (withoutZeroWidth !== value) {
    warnings.push("ZERO_WIDTH_CHARACTER_REMOVED");
    value = withoutZeroWidth;
  }

  const normalizedHyphens = value.replace(HYPHEN_RE, "-");
  if (normalizedHyphens !== value) {
    warnings.push("HYPHEN_NORMALIZED");
    value = normalizedHyphens;
  }

  if (CYRILLIC_RE.test(value) && value.includes("1")) {
    value = value.replaceAll("1", "Ӏ");
    warnings.push("ASCII_ONE_REPLACED_WITH_PALOCHKA");
  }

  const latinIResult = replaceLatinIInCyrillicContext(value);
  if (latinIResult.changed) {
    value = latinIResult.value;
    warnings.push("LATIN_I_REPLACED_WITH_PALOCHKA");
  }

  if (value.includes("ӏ")) {
    value = value.replaceAll("ӏ", "Ӏ");
    warnings.push("LOWERCASE_PALOCHKA_NORMALIZED");
  }

  const collapsed = value.trim().replace(SPACE_RE, " ");
  if (collapsed !== value) {
    warnings.push("WHITESPACE_COLLAPSED");
    value = collapsed;
  }

  // Case-fold approximately with locale-independent Unicode lowercasing,
  // then restore one stable palochka representation.
  const exactSearchKey = value
    .toLocaleLowerCase("und")
    .replaceAll("ӏ", "Ӏ")
    .normalize("NFC");

  // Loose key only removes separators and the Russian ё/е distinction.
  // It does NOT remove Chechen diacritics or merge Chechen consonants.
  const looseSearchKey = exactSearchKey
    .replaceAll("ё", "е")
    .replace(/[\s\-_.'’]+/gu, "");

  return {
    original,
    nfc,
    displayNormalized: value,
    exactSearchKey,
    looseSearchKey,
    warnings: [...new Set(warnings)],
  };
}
