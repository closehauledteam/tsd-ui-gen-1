---
screenId: veg-registration
title: "Регистрация в блоке"
version: 1
uiTarget: react-native
featureDir: src/features/veg-registration
uiFile: FormUI.tsx
flowFile: vegRegistrationFlow.ts
screenFile: VegRegistrationScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - BlocksService.getAvailableBlocks
transitions:
  - target: veg-qr
    label: "Выбрать блок"
---
## UI Structure
- Кнопка "Назад" в навбаре.
- Заголовок "Регистрация в блоке".
- Подзаголовок "Выберите блок для работы сегодня".
- Панель с ФИО сотрудника и ролью.
- Перечень доступных блоков, каждый в виде карточки с названием и подписью "Нажмите для выбора".

## Behavior / Flow
- При загрузке запрашиваются доступные блоки через `BlocksService.getAvailableBlocks`.
- Нажатие на карточку переходит на экран `veg-qr` с выбранным блоком.
