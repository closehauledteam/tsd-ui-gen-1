---
screenId: task-paused
title: "Пауза задачи"
version: 1
uiTarget: react-native
featureDir: src/features/task-paused
uiFile: FormUI.tsx
flowFile: taskPausedFlow.ts
screenFile: TaskPausedScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - TaskService.resumeTask
  - TaskService.stopTask
transitions:
  - target: task-running
    label: "Продолжить"
  - target: task-finish
    label: "Стоп"
---
## UI Structure
- Информация о задаче и остановленный таймер.
- Статус "Пауза".
- Кнопки "Продолжить" и "СТОП".

## Behavior / Flow
- Нажатие "Продолжить" вызывает `TaskService.resumeTask(taskId)` и возвращает в `task-running`.
- Нажатие "СТОП" переводит на экран `task-finish`.
