---
screenId: entry-selection
title: "Выбор режима работы"
version: 1
uiTarget: react-native
featureDir: src/features/entry-selection
uiFile: FormUI.tsx
flowFile: entrySelectionFlow.ts
screenFile: EntrySelectionScreen.tsx
module: common
moduleTitle: "Общие"
services: []
transitions:
  - target: auth-login
    label: "Мобильное приложение"
---
## UI Structure
- Логотип и слоган "GrowerTask" и "Система управления сельским хозяйством".
- Блок "Мобильное приложение" с описанием и кнопкой "Открыть мобильное приложение".
- Блок "Web-интерфейс" с описанием и кнопкой "Открыть панель управления".

## Behavior / Flow
- Нажатие "Открыть мобильное приложение" переносит на экран `auth-login`.
- Нажатие "Открыть панель управления" запускает веб‑интерфейс (не реализовано).
