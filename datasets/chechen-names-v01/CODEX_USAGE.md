# Codex Usage Contract

Codex может читать этот пакет и предлагать изменения, но обязан соблюдать правила ниже.

## Файлы для загрузки

1. `manifest.json`
2. `README.md`
3. `rules/normalization.md`
4. `rules/multilingual-writing.md`
5. `data/core_names.csv`
6. `data/variant_relations.csv`
7. `data/negative_pairs.csv`
8. `data/review_queue.csv`

`WAY_CHECHEN_NAMES_CODEX_BUNDLE_V01.md` содержит весь компактный корпус в одном файле. Исторические CSV — свидетельства из источника 1987 года, а не автоматически действующая современная норма.

## Обязательное поведение

- Сохранять `originalInput` и `documentSpelling`.
- Никогда не заменять имя человека молча.
- Никогда не объединять записи людей из-за совпадения имён.
- Не выводить национальность, пол, религию, родство, тайп или личность из имени.
- Считать транслитерации только средствами отображения и поиска.
- Возвращать тип отношения для каждого предлагаемого варианта.
- Показывать источник и статус проверки в редакторском интерфейсе.
- Направлять сомнительные формы в очередь ручной проверки.

## Безопасный поиск

```ts
const normalized = normalizeChechenName(userInput);
const exact = findOriginalOrNormalized(normalized);
const related = findExplicitRelations(exact);
const fuzzy = exact.length === 0 ? findFuzzyCandidates(normalized) : [];

return {
  originalInput: userInput,
  normalized,
  suggestions: [...exact, ...related, ...fuzzy].map(item => ({
    ...item,
    personIdentityMergeAllowed: false,
  })),
};
```

## Запрещённое поведение

```ts
// НЕЛЬЗЯ:
personA.id = personB.id because normalizedNameA === normalizedNameB;

// НЕЛЬЗЯ:
profile.legalName = dataset.canonicalName;

// НЕЛЬЗЯ:
profile.ethnicity = "Chechen" because the name exists in this dataset;

// НЕЛЬЗЯ считать документально равными:
"Петимат" === "Фатима";
```

## Добавление записи

Предложение должно содержать стабильный ID, исходную форму, предлагаемую чеченскую форму, языки и письменности, тип связи, статус проверки, источник, решение рецензента и `autoMergePeopleByName = false`.

Сгенерированная английская, немецкая, турецкая или арабская форма не получает статус проверенной без редактора соответствующего языка.

## Изменения

- Все дополнения идут через ветку и draft PR.
- Проверяются уникальность ID, структура, Unicode и негативные пары.
- Современный канонический статус требует минимум двух рецензентов, включая специалиста по чеченскому языку.
- Арабские и турецкие формы требуют соответствующего языкового рецензента.
- Спорные формы сохраняются со статусом `DISPUTED`, а не удаляются молча.
