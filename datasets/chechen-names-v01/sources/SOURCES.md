# Source Register

Checked: `2026-07-21`

## SRC_SUPERANSKAYA_GUSEV_1987

**Citation:** Справочник личных имен народов РСФСР / под ред.
А. В. Суперанской и Ю. М. Гусева. 3-е изд., испр. Москва: Русский язык, 1987.

- Full digitized/OCR copy:
  https://djvu.online/file/obFjy2A0KrsQg
- Bibliographic record:
  https://books.google.com/books?id=8lJmAAAAMAAJ
- Relevant section: “Имена нахских языков. Чеченские и ингушские имена”,
  printed pages 364–381.

**Use in V01:** historical Russian/Chechen form pairs, documented examples of
native names and meanings, and evidence that Arabic/Persian/Turkic loan names
developed many spelling variants.

**Limitations:**

- 1987 is historical, not a substitute for current orthography.
- Online text is OCR and contains errors such as `1`, `I`, broken columns and
  misplaced characters.
- The source combines Chechen and Ingush discussion, though its tables use
  separate columns.
- Forms require review before being labeled current canonical.

## SRC_CHECHEN_ORTHOGRAPHY_2020

**Citation:** Указ Главы Чеченской Республики от 29.04.2020 № 83
«Об утверждении Свода основных орфографических правил чеченского языка».

- Text:
  https://chechnya-gov.ru/doc/6959
- Mirror/legal database:
  https://base.garant.ru/73971357/

**Use in V01:** authority for current spelling-review workflow and the rule that
historical forms must not be promoted automatically.

**Limitation:** the decree is an orthographic framework, not a complete
authoritative register of personal names.

## SRC_BIBULATOV_1990_CATALOG

**Citation:** Бибулатов Н. С. Чеченские имена. Грозный: Книга, 1990.

- Library catalogue:
  https://lib.memo.ru/book/6981
- Google Books bibliographic record:
  https://books.google.com/books?id=EAagPQAACAAJ

The catalogue describes a specialist work on the origin of Chechen names,
meanings of some Arabic-origin names and names used at the time.

**Use in V01:** evidence that a dedicated specialist source exists and should be
acquired/reviewed for V02.

**Limitation:** the full text was not included or copied into V01.

## SRC_ALDIEVA_2023

**Citation:** З. А. Алдиева. «Лексико-семантическая классификация исконной
антропонимии Чечни». Известия Чеченского государственного университета, 2023.
DOI: `10.36684/12-2023-32-4-89-94`.

- DOI:
  https://doi.org/10.36684/12-2023-32-4-89-94
- Public metadata/abstract:
  https://www.researchgate.net/publication/376715017

**Use in V01:** confirms that native Chechen anthroponymy is an old foundational
layer and can be classified by animals, plants, nature, body terms,
occupations, sacred vocabulary, ethnonyms, teips, toponyms and wish-names.

**Limitation:** the abstract/classification does not by itself validate every
individual spelling in the dataset.

## SRC_CE_TRANSLIT_1_0_1

**Project:** `ce-translit` version 1.0.1, published 2025-05-23.

- Package and documentation:
  https://pypi.org/project/ce-translit/
- Source repository identified by PyPI provenance:
  https://github.com/chechen-language/ce-translit-py

PyPI records an MIT license, package hashes and a trusted-publishing/Sigstore
provenance entry.

**Use in V01:** comparison candidate for future Chechen Cyrillic-to-Latin
search transliteration.

**Limitations:**

- It is an open-source project, not an official state standard.
- WAY V01 does not vendor it or treat its output as a legal spelling.
- Its context-sensitive rules must be independently tested on personal names.

## SRC_WAY_EDITORIAL_V01

Editorial additions made for the WAY research package:

- neutral Latin display forms;
- Turkish conventional cognates;
- Arabic source/cognate forms;
- explicit relation types;
- negative matching examples.

All such additions are marked `CURATED_REVIEW_REQUIRED` or
`GENERATED_REVIEW_REQUIRED`. They are not presented as primary-source facts.

## Candidate sources not imported as authoritative data

Large web name lists may be useful for collecting candidates, but they must not
be promoted directly into the verified core. They can contain duplicates,
folk etymologies, mixed Chechen/Ingush/Dagestani forms and nonstandard use of
Latin `I` or digit `1`.

Required ingestion path:

```text
candidate source
-> source snapshot/hash
-> deduplication
-> spelling review
-> independent source check
-> cultural/editorial review
-> verified release
```
