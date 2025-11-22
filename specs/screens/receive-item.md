---
screenId: receive-item
title: "Приём товара"
version: 1
uiTarget: "react-native"
generated:
  featureDir: "src/features/receive-item"
  uiFile: "src/features/receive-item/ReceiveItemFormUI.tsx"
  flowFile: "src/features/receive-item/receiveItemFlow.ts"
  screenFile: "src/features/receive-item/ReceiveItemScreen.tsx"
services:
  - ScanService.parse
  - InventoryService.checkItemAvailable
---

# Экран приёма товара

Экран предназначен для сканирования штрихкода товара и ввода количества.

## UI Structure

1.  **Header**: Заголовок "Приём товара".
2.  **Input**: Поле ввода штрихкода (Barcode).
    -   Label: "Штрихкод"
    -   Placeholder: "Сканируйте или введите"
3.  **Input**: Поле ввода количества (Quantity).
    -   Label: "Количество"
    -   Type: Numeric
    -   Default: "1"
4.  **Button**: Кнопка "Проверить" (Check).
    -   Action: Validate and Check Availability.
5.  **Status**: Текстовое поле для отображения статуса/ошибки.

## Behavior / Flow

1.  **Init**:
    -   Фокус на поле штрихкода.
2.  **On Scan / Enter Barcode**:
    -   Вызвать `ScanService.parse(code)`.
    -   Если ошибка: показать ошибку в Status.
    -   Если ОК: заполнить поле Barcode (если сканировали), перевести фокус на Quantity.
3.  **On Press "Check"**:
    -   Валидация: Barcode не пуст, Quantity > 0.
    -   Вызвать `InventoryService.checkItemAvailable(itemId, qty)`.
    -   Если ОК: Показать "Товар доступен", очистить поля.
    -   Если Ошибка: Показать текст ошибки.
