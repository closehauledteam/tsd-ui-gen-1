## UI Structure
- Информация о задаче.
- Таймер.
- Статус "Работа идёт…".
- Кнопки "Пауза" и "СТОП".

## Behavior / Flow
- Нажатие "Пауза" вызывает `TaskService.pauseTask(taskId)` и переводит экран в `task-paused`.
- Нажатие "СТОП" вызывает `TaskService.stopTask(taskId)` и переводит на экран `task-finish`.