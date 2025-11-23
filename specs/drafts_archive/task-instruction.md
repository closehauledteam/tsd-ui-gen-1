---
screenId: task-instruction
title: "Инструкция по выполнению задачи"
version: 1
uiTarget: react-native
featureDir: src/features/task-instruction
uiFile: FormUI.tsx
flowFile: taskInstructionFlow.ts
screenFile: TaskInstructionScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services: []
---
## UI Structure
- Перечень категорий качества (Стандарт, Не стандарт, Дозрев, Брак) с цветовой маркировкой.
- Для каждой категории — блок с примерами (изображениями).
- Кнопка "Понятно" для возврата.

## Behavior / Flow
- Просмотр инструкции не изменяет состояние задач.
- Нажатие "Понятно" возвращает на предыдущий экран.
