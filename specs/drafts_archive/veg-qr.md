---
screenId: veg-qr
title: "QR‑код для регистрации"
version: 1
uiTarget: react-native
featureDir: src/features/veg-qr
uiFile: FormUI.tsx
flowFile: vegQrFlow.ts
screenFile: VegQrScreen.tsx
module: vegetable-grower
moduleTitle: "Овощевод"
services:
  - BlocksService.getRegistrationQRCode
transitions:
  - target: veg-dashboard
    label: "Сканирование"
---
## UI Structure
- Кнопка "Назад" (стрелка).
- Заголовок "QR‑код для регистрации".
- Инструкция "Покажите этот QR‑код бригадиру для регистрации".
- Информация о выбранном блоке и работнике.
- Поле с QR‑кодом.
- Примечания: "QR‑код обновляется ежедневно" и "После сканирования бригадиром вы будете зарегистрированы".

## Behavior / Flow
- При открытии экрана вызывается `BlocksService.getRegistrationQRCode(blockId, userId)`.
- Нажатие демо‑кнопки "Симуляция сканирования" переносит на `veg-dashboard`.
