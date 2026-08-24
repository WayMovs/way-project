# Multilingual Writing Policy V01

## Principle

A personal name is normally transliterated or copied, not translated.

The system stores the spelling used by the person or document as authoritative
for that record. Language-specific forms are metadata and search aids.

## Chechen (`ce-Cyrl`)

- Use Cyrillic palochka `Ӏ`, not digit `1`.
- Preserve Chechen phonemic distinctions.
- The 1987 reference is evidence of historical usage, not automatic proof of
  current orthographic norm.
- A form becomes `VERIFIED_CURRENT_CHECHEN` only after review against the
  current orthographic rules and by qualified Chechen-language reviewers.

## Russian (`ru-Cyrl`)

Store at least:

```text
document_form
common_form
historical_registry_form
```

These may differ. Do not infer a current legal form from a Soviet-era reference.

## English (`en-Latn`)

Priority:

1. exact spelling from the person's Latin-script document;
2. spelling explicitly chosen by the person;
3. attested family spelling;
4. neutral generated transliteration marked `GENERATED_REVIEW_REQUIRED`.

Do not force one universal English spelling. `Aishat`, `Aisha`, `Aysha`,
`Khadizhat`, `Khadija`, `Mohmad`, `Muhammad` and similar strings can express
different relationships.

## German (`de-Latn`)

German UI must also prioritize the document spelling. Do not automatically
Germanize names into `Dsch`, `tsch` or `ch` combinations. A generated German
reading aid may be displayed separately, never as a legal name.

## Turkish (`tr-Latn`)

Turkish often has conventional forms of Arabic names:

```text
Ӏайшат / Айшат -> Ayşe
ПетӀимат / Петимат -> Fatma or Fatıma
Хадижат -> Hatice
Зайнап -> Zeynep
Марем / Марьям -> Meryem
```

These are stored as `ETYMOLOGICAL_OR_CONVENTIONAL_COGNATE`, not as exact
passport aliases. For native Chechen names without an established Turkish form,
use a neutral Latin display and mark it as generated.

## Arabic (`ar-Arab`)

For names of clear Arabic origin, the source/cognate Arabic form may be stored.
Examples include `عائشة`, `فاطمة`, `خديجة`, `زينب`, `مريم`.

This still does not prove that the Arabic string is the same legal name as a
Chechen or Russian form.

For native Chechen names, V01 leaves Arabic blank unless a reviewed,
community-approved Arabic-script convention exists. Arabic script does not
provide a single obvious spelling for every Chechen phoneme; inventing a form
would create false authority.

## Relation types

- `ATTESTED_CROSS_LANGUAGE_FORM`
- `EXACT_ORTHOGRAPHIC_VARIANT`
- `LEGACY_PALOCHKA_ENCODING`
- `DIALECT_OR_PHONOLOGICAL_VARIANT`
- `RUSSIFIED_OR_TRANSCRIPTION_VARIANT`
- `SHORT_FORM`
- `CONVENTIONAL_LATIN_VARIANT`
- `ETYMOLOGICAL_COGNATE`
- `POSSIBLE_VARIANT`
- `DISTINCT_DO_NOT_MERGE`

## UI labels

The user should see why a suggestion appeared:

```text
Айшат
Chechen: Ӏайшат
English display: Aishat
Turkish related form: Ayşe
Arabic source form: عائشة
Status: requires language review
```

Never show all forms under the label “same spelling”.
