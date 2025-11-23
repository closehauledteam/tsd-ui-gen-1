---
screenId: task-finish
title: "Завершение задачи"
version: 1
uiTarget: react-native
featureDir: src/features/task-finish
uiFile: FormUI.tsx
flowFile: taskFinishFlow.ts
screenFile: TaskFinishScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - TaskService.completeTask
transitions:
  - target: veg-dashboard
    label: "Завершить"
---
## UI Structure
- Заголовок задачи и информация о ряде.
- Время работы.
- Ссылка "Посмотреть инструкцию".
- Поля ввода: Стандарт (коробок), Не стандарт (коробок), Дозрев (коробок), Брак (коробок).
- Отображается сумма «Итого коробок».
- Кнопка «Завершить задачу».

## Behavior / Flow
- Пользователь вводит числа; сумма пересчитывается.
- Нажатие «Завершить задачу» вызывает `TaskService.completeTask(taskId, {standard, nonStandard, ripening, defect})`.
- После завершения происходит возврат на `veg-dashboard` и обновление списка задач.
