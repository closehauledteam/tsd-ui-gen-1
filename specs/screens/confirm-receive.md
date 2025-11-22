---
screenId: confirm-receive
title: "Подтверждение приёма"
version: 1
uiTarget: "react-native"
generated:
  featureDir: "src/features/confirm-receive"
  uiFile: "src/features/confirm-receive/ConfirmReceiveFormUI.tsx"
  flowFile: "src/features/confirm-receive/confirmReceiveFlow.ts"
  screenFile: "src/features/confirm-receive/ConfirmReceiveScreen.tsx"
services:
  - PrintService.printLabel
---

# Экран подтверждения приёма

Экран для финального подтверждения и печати этикетки.

## UI Structure

1.  **Header**: Заголовок "Подтверждение".
2.  **Info**: Отображение принятого товара (ItemId, Qty).
    -   Принимаются через props/params.
3.  **Button**: Кнопка "Печать этикетки" (Print).
4.  **Button**: Кнопка "Завершить" (Finish).

## Behavior / Flow

1.  **On Press "Print"**:
    -   Вызвать `PrintService.printLabel(itemId, qty)`.
    -   Показать Alert/Status: "Этикетка отправлена".
2.  **On Press "Finish"**:
    -   Переход назад или сброс флоу (в данном тесте просто лог "Done").
