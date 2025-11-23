---
screenId: task-running
title: "Выполнение задачи"
version: 1
uiTarget: react-native
featureDir: src/features/task-running
uiFile: FormUI.tsx
flowFile: taskRunningFlow.ts
screenFile: TaskRunningScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - TaskService.pauseTask
  - TaskService.stopTask
transitions:
  - target: task-paused
    label: "Пауза"
  - target: task-finish
    label: "Стоп"
---
## UI Structure
- Информация о задаче.
- Таймер.
- Статус "Работа идёт…".
- Кнопки "Пауза" и "СТОП".

## Behavior / Flow
- Нажатие "Пауза" вызывает `TaskService.pauseTask(taskId)` и переводит экран в `task-paused`.
- Нажатие "СТОП" вызывает `TaskService.stopTask(taskId)` и переводит на экран `task-finish`.
