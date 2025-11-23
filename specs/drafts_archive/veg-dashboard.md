---
screenId: veg-dashboard
title: "Управление выращиванием овощей"
version: 1
uiTarget: react-native
featureDir: src/features/veg-dashboard
uiFile: FormUI.tsx
flowFile: vegDashboardFlow.ts
screenFile: VegDashboardScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - TaskService.listTasks
transitions:
  - target: task-start
    label: "Начать задачу"
  - target: task-instruction
    label: "Инструкция"
---
## UI Structure
- Панель с показателями: «Доход за сегодня», «Активные задачи», «Высокий приоритет».
- Раздел "Задачи для меня" со списком карточек. Каждая карточка содержит название, приоритет, описание, местоположение, нормативное время, ссылку "Инструкция по выполнению", кнопку "СБОР" или "СТАРТ".

## Behavior / Flow
- Нажатие "Инструкция по выполнению" открывает экран `task-instruction`.
- Нажатие кнопки "СБОР"/"СТАРТ" открывает экран `task-start` для выбранной задачи.
- Получение списка задач через `TaskService.listTasks(userId)`.
