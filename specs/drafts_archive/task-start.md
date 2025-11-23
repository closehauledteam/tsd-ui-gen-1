---
screenId: task-start
title: "Начало задачи"
version: 1
uiTarget: react-native
featureDir: src/features/task-start
uiFile: FormUI.tsx
flowFile: taskStartFlow.ts
screenFile: TaskStartScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - TaskService.startTask
transitions:
  - target: task-running
    label: "Старт"
  - target: task-instruction
    label: "Инструкция"
---
## UI Structure
- Заголовок задачи, детали (ряд, блок, норматив).
- Ссылка "Посмотреть инструкцию".
- Таймер (00:00).
- Кнопка "СТАРТ".

## Behavior / Flow
- Нажатие "СТАРТ" вызывает `TaskService.startTask(taskId)`, запускает таймер и переводит экран в `task-running`.
- Нажатие "Посмотреть инструкцию" открывает `task-instruction`.
