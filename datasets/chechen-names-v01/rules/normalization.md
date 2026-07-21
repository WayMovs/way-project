# Normalization Rules V01

## Scope

These rules create search keys. They must not alter the original or legal spelling.

## Unicode

1. Normalize to Unicode NFC.
2. Preserve the original byte sequence in `originalInput` when imported.
3. Use Cyrillic palochka `Ӏ` (`U+04C0`) in normalized Chechen display.
4. Treat lowercase palochka `ӏ` (`U+04CF`) as the same search symbol.
5. In a Cyrillic name token, legacy ASCII `1` may be mapped to `Ӏ` for search.
6. Latin `I` may be mapped to `Ӏ` only when adjacent to Cyrillic characters.
7. Record every replacement as a warning.

Examples:

```text
Пет1имат  -> ПетӀимат
ПетIимат  -> ПетӀимат
Жовх1ар   -> ЖовхӀар
Саь1ид    -> СаьӀид
```

## Whitespace and punctuation

For `displayNormalized`:

- trim leading/trailing spaces;
- collapse repeated spaces;
- normalize Unicode hyphen variants to ASCII `-`;
- remove zero-width formatting characters.

For `looseSearchKey` only:

- remove spaces, hyphens, apostrophes, periods and underscores;
- permit Russian `ё`/`е` fallback;
- do not strip Chechen diacritics or letters.

## Distinctions that must be preserved

Never collapse these merely for fuzzy matching:

```text
х / хь / хӀ
к / къ / кх / кӀ
г / гӀ
ч / чӀ
ц / цӀ
а / аь
о / оь
у / уь
```

A fuzzy engine may rank two strings as visually similar, but it must display
`REVIEW_REQUIRED` and must not create a variant relation by itself.

## Matching levels

| Level | Meaning | Allowed action |
|---|---|---|
| `EXACT_ORIGINAL` | identical stored text | show exact hit |
| `EXACT_NORMALIZED` | same conservative search key | show strong suggestion |
| `EXPLICIT_RELATION` | relation exists in curated data | show relation and type |
| `LOOSE_KEY` | differs only by separators/ё | show weaker suggestion |
| `FUZZY_CANDIDATE` | edit/phonetic similarity | review queue only |
| `NO_RELATION` | no evidence | keep separate |

Every level has `personIdentityMergePolicy = NEVER_AUTOMATIC`.

## Search ranking suggestion

```text
100  exact original text
95   exact normalized key
85   explicit ATTESTED_CROSS_LANGUAGE_FORM
75   explicit ATTESTED_VARIANT
55   conventional or etymological cognate
40   loose separator-only key
<=30 fuzzy candidate
```

The score is a UI ranking value, not a probability and not evidence of identity.

## False-positive controls

Use `data/negative_pairs.csv`. A release fails if any negative pair causes an automatic concept or person merge.

## Import behavior

```text
input
-> retain original
-> NFC
-> detect script
-> normalize palochka confusables with warnings
-> create exact and loose search keys
-> query curated relation graph
-> return suggestions
-> require user confirmation before attaching a form to a person
```

## Export behavior

- Export the exact legal/original form first.
- Add normalized and display forms in separate fields.
- Never silently replace the user's name with a canonical recommendation.
