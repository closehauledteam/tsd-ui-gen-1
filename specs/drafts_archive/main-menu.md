---
screenId: main-menu
title: "Выбор раздела"
version: 1
uiTarget: react-native
featureDir: src/features/main-menu
uiFile: FormUI.tsx
flowFile: mainMenuFlow.ts
screenFile: MainMenuScreen.tsx
module: common
moduleTitle: "Общие"
services: []
transitions:
  - target: veg-registration
    label: "Овощевод"
  - target: receive-item
    label: "Товаровед"
  - target: protection-crop-list
    label: "Защита растений"
  - target: task-creation
    label: "Создать задачи"
---
## UI Structure
- Заголовок "Выберите раздел для работы".
- Кнопки: "Создать задачи", "Защита растений", "Фенолог", "Овощевод", "Бригадир", "Контроль качества" (и пустые заглушки).

## Behavior / Flow
- Нажатие "Овощевод" ведёт на экран `veg-registration`.
- Остальные кнопки пока не реализованы или ведут на свои модули.
- Роли и доступ контролируются на уровне Flow (RBAC).
